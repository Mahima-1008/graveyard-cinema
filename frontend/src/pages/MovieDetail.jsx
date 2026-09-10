import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovie, useMovies } from '@/hooks/useMovies';
import { useSeries } from '@/hooks/useSeries';
import { DetailPageLayout } from '@/components/sections';

export default function MovieDetail() {
  const { slug } = useParams();
  
  const { data: movie, isLoading: movieLoading } = useMovie(slug);
  const { data: allMovies, isLoading: allMoviesLoading } = useMovies();
  const { data: allSeries, isLoading: allSeriesLoading } = useSeries();

  const isLoadingAll = allMoviesLoading || allSeriesLoading;

  // Find similar movies (share at least one genre, exclude self)
  const similarItems = React.useMemo(() => {
    if (!movie || !allMovies) return [];
    return allMovies.filter(m => 
      m.id !== movie.id && 
      m.genres?.some(g => movie.genres?.includes(g))
    );
  }, [movie, allMovies]);

  // Find universe items
  const universeItems = React.useMemo(() => {
    if (!movie || !movie.universeId || !allMovies || !allSeries) return [];
    const allContent = [...allMovies, ...allSeries];
    return allContent.filter(item => 
      item.id !== movie.id && item.universeId === movie.universeId
    );
  }, [movie, allMovies, allSeries]);

  return (
    <DetailPageLayout 
      data={movie} 
      isLoading={movieLoading} 
      similarItems={similarItems} 
      similarLoading={allMoviesLoading}
      universeItems={universeItems}
      universeLoading={isLoadingAll}
    />
  );
}
