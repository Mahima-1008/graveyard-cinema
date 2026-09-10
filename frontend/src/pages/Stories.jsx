import React, { useState } from 'react';
import { FilterBar, ContentRow } from '@/components/sections';
import { StoryCard, FeaturedCard } from '@/components/cards';
import { Skeleton, EmptyState } from '@/components/common';
import useFilteredPagination from '@/hooks/useFilteredPagination';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useStories } from '@/hooks/useStories';

const STORY_COLLECTIONS = [
  { id: 'c1', title: 'Campfire Classics', synopsis: 'Timeless tales of terror to read in the dark.', posterUrl: 'https://picsum.photos/seed/camp/800/600', link: '/stories' },
  { id: 'c2', title: 'Deep Woods Secrets', synopsis: 'Don\'t stray from the path.', posterUrl: 'https://picsum.photos/seed/woods/800/600', link: '/stories' },
  { id: 'c3', title: 'Urban Legends', synopsis: 'They said it was just a myth. They were wrong.', posterUrl: 'https://picsum.photos/seed/urban/800/600', link: '/stories' }
];

export default function Stories() {
  const [filters, setFilters] = useState({});
  const { data: rawData, isLoading } = useStories();

  const { 
    data: visibleData, 
    totalCount, 
    hasMore, 
    loadMore 
  } = useFilteredPagination(rawData, filters);

  const bottomRef = useInfiniteScroll(loadMore, hasMore && !isLoading);

  return (
    <div className="flex-1 flex flex-col container mx-auto px-6 lg:px-12 py-8 md:py-12 mt-14 md:mt-20">
      <header className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl text-text-bright drop-shadow-md mb-2">Horror Stories</h1>
        <p className="font-body text-text-muted max-w-2xl">Immerse yourself in original tales of terror. Read, listen, or shape the outcome yourself.</p>
        {!isLoading && <p className="text-sm font-body text-text-muted mt-4">{totalCount} Tales</p>}
      </header>

      {/* Curated Collections */}
      <div className="mb-12">
        <ContentRow 
          title="Story Collections" 
          items={STORY_COLLECTIONS}
          itemWidthClass="w-72 md:w-96 lg:w-[600px]"
          renderItem={(item) => (
            <FeaturedCard data={item} />
          )}
        />
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-lg" />
          ))}
        </div>
      ) : visibleData.length === 0 ? (
        <EmptyState 
          title="No stories found" 
          description="The pages are blank. Try adjusting your filters."
          actionLabel="Clear Filters"
          onAction={() => setFilters({})}
          className="my-12"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {visibleData.map((item, index) => (
              <StoryCard key={item.id || index} data={item} />
            ))}
          </div>
          
          <div ref={bottomRef} className="h-16 w-full flex items-center justify-center mt-8">
            {hasMore && (
              <div className="w-6 h-6 border-2 border-crimson border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
