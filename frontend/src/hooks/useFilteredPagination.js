import { useState, useMemo, useCallback } from 'react';

const PAGE_SIZE = 12;

export default function useFilteredPagination(rawData = [], filters = {}) {
  const [page, setPage] = useState(1);

  // For testing infinite scroll with small datasets, we'll artificially duplicate data if it's too small
  const extendedData = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];
    if (rawData.length > 20) return rawData;
    // Duplicate data a few times to test infinite scroll
    return [...rawData, ...rawData, ...rawData, ...rawData].map((item, idx) => ({
      ...item,
      id: `${item.id}-dup-${idx}`
    }));
  }, [rawData]);

  const filteredData = useMemo(() => {
    let result = [...extendedData];

    // 1. Genre filter (Multi-select)
    if (filters.genres && filters.genres.length > 0) {
      result = result.filter(item => 
        item.genres?.some(g => filters.genres.includes(g)) ||
        (item.category && filters.genres.includes(item.category))
      );
    }

    // 2. Mood filter
    if (filters.mood) {
      // Fake mood mapping based on scareLevel or fake keywords
      result = result.filter(item => {
        if (filters.mood === 'Jump Scares') return item.contentWarnings?.includes('Jump Scares') || item.scareLevel >= 4;
        if (filters.mood === 'Slow Burn') return item.scareLevel <= 3;
        if (filters.mood === 'Late Night') return item.fearMeter >= 80;
        return true;
      });
    }

    // 3. Sort By
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'Newest':
          result.sort((a, b) => (b.year || 0) - (a.year || 0));
          break;
        case 'Highest Rated':
          result.sort((a, b) => (b.imdbStyleRating || b.rating || 0) - (a.imdbStyleRating || a.rating || 0));
          break;
        case 'A-Z':
          result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          break;
        case 'Popularity':
        default:
          result.sort((a, b) => (b.userRating || 0) - (a.userRating || 0));
          break;
      }
    }

    return result;
  }, [extendedData, filters]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * PAGE_SIZE);
  }, [filteredData, page]);

  const hasMore = paginatedData.length < filteredData.length;

  const loadMore = useCallback(() => {
    if (hasMore) setPage(p => p + 1);
  }, [hasMore]);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    data: paginatedData,
    totalCount: filteredData.length,
    hasMore,
    loadMore,
    resetPagination
  };
}
