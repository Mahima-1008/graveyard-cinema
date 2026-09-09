import React, { useState } from 'react';
import { FilterBar } from '@/components/sections';
import { PosterCard } from '@/components/cards';
import { Skeleton, EmptyState, Button } from '@/components/common';
import useFilteredPagination from '@/hooks/useFilteredPagination';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function ContentGridPage({ title, description, rawData, isLoading }) {
  const [filters, setFilters] = useState({});
  
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
        <h1 className="font-display text-4xl md:text-5xl text-text-bright drop-shadow-md mb-2">{title}</h1>
        {description && <p className="font-body text-text-muted max-w-2xl">{description}</p>}
        {!isLoading && <p className="text-sm font-body text-text-muted mt-4">{totalCount} Results</p>}
      </header>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
          ))}
        </div>
      ) : visibleData.length === 0 ? (
        <EmptyState 
          title="No results found" 
          description="Try adjusting your filters or removing them completely."
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
  );
}
