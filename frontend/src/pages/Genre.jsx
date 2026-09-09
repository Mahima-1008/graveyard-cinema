import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FilterBar } from '@/components/sections';
import { PosterCard } from '@/components/cards';
import { Skeleton, EmptyState } from '@/components/common';
import useFilteredPagination from '@/hooks/useFilteredPagination';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGenres } from '@/hooks/useGenres';
import { useMovies } from '@/hooks/useMovies';

export default function Genre() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { data: genres, isLoading: genresLoading } = useGenres();
  const { data: allMovies, isLoading: moviesLoading } = useMovies();
  
  const [filters, setFilters] = useState({});

  // Ensure the genre filter always includes this genre slug/name
  const genre = genres?.find(g => g.slug === slug);

  // In a real app, you would pass `slug` to the backend to get genre-specific movies.
  // Here, we filter the mock dataset.
  const rawData = allMovies?.filter(m => m.genres?.includes(genre?.name)) || [];

  const { 
    data: visibleData, 
    totalCount, 
    hasMore, 
    loadMore 
  } = useFilteredPagination(rawData, filters);

  const bottomRef = useInfiniteScroll(loadMore, hasMore && !moviesLoading);

  useEffect(() => {
    if (!genresLoading && !genre) {
      // If genre not found, go to 404
      // navigate('/404', { replace: true });
    }
  }, [genre, genresLoading, navigate]);

  const isLoading = genresLoading || moviesLoading;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Cinematic Genre Banner */}
      <div className="h-[30vh] md:h-[40vh] relative bg-surface mt-14 md:mt-0 flex items-end">
        {isLoading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : genre ? (
          <>
            <img 
              src={genre.backgroundImageUrl} 
              alt={genre.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
            <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-8">
              <h1 className="font-display text-5xl md:text-7xl text-text-bright drop-shadow-glow">{genre.name}</h1>
              <p className="font-body text-text-muted mt-2">Explore the darkest corners of {genre.name.toLowerCase()}.</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-8">
        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="mb-6">
          {!isLoading && <p className="text-sm font-body text-text-muted">{totalCount} Results</p>}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
            ))}
          </div>
        ) : visibleData.length === 0 ? (
          <EmptyState 
            title="No souls found here" 
            description={`We couldn't find any content matching your filters in ${genre?.name}.`}
            actionLabel="Clear Filters"
            onAction={() => setFilters({})}
            className="my-12"
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {visibleData.map((item, index) => (
                <PosterCard key={item.id || index} data={item} />
              ))}
            </div>
            
            {/* Infinite Scroll Trigger */}
            <div ref={bottomRef} className="h-16 w-full flex items-center justify-center mt-8">
              {hasMore && (
                <div className="w-6 h-6 border-2 border-crimson border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
