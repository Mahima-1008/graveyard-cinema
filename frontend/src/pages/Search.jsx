import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useGlobalSearch from '@/hooks/useGlobalSearch';
import { FilterBar } from '@/components/sections';
import { PosterCard, StoryCard, ReelCard, CreatorCard } from '@/components/cards';
import { Skeleton, EmptyState, Button } from '@/components/common';

const TABS = ['All', 'Movies', 'Series', 'Stories', 'Reels', 'Creators'];

export default function Search() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [localQuery, setLocalQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef(null);

  const { results, isLoading, allData } = useGlobalSearch(queryParam);

  useEffect(() => {
    setLocalQuery(queryParam);
    if (!queryParam && inputRef.current) {
      inputRef.current.focus();
    }
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    } else {
      navigate(`/search`);
    }
  };

  // Base dataset: either search results or everything if no query
  const baseData = queryParam ? results : allData || [];

  // Filter logic (Type Tab + Custom Filters)
  const filteredData = React.useMemo(() => {
    let res = baseData;

    // Type tab
    if (activeTab !== 'All') {
      const typeMap = {
        'Movies': 'Movie',
        'Series': 'Series',
        'Stories': 'Story',
        'Reels': 'Reel',
        'Creators': 'Creator'
      };
      res = res.filter(item => item.searchType === typeMap[activeTab]);
    }

    // Genres
    if (filters.genres && filters.genres.length > 0) {
      res = res.filter(item => 
        item.genres?.some(g => filters.genres.includes(g)) ||
        (item.category && filters.genres.includes(item.category))
      );
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'Newest':
          res.sort((a, b) => (b.year || 0) - (a.year || 0));
          break;
        case 'Highest Rated':
          res.sort((a, b) => (b.imdbStyleRating || b.rating || 0) - (a.imdbStyleRating || a.rating || 0));
          break;
        case 'A-Z':
          res.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          break;
        case 'Popularity':
        default:
          res.sort((a, b) => (b.userRating || 0) - (a.userRating || 0));
          break;
      }
    }

    return res;
  }, [baseData, activeTab, filters]);

  const renderCard = (item) => {
    switch (item.searchType) {
      case 'Movie':
      case 'Series':
      case 'Short Film':
        return <PosterCard key={item.id} data={item} />;
      case 'Story':
        return <StoryCard key={item.id || item.title} data={item} />;
      case 'Reel':
        return <ReelCard key={item.id} data={item} />;
      case 'Creator':
      case 'Actor':
      case 'Director':
        return <CreatorCard key={item.id} data={item} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col container mx-auto px-6 lg:px-12 py-8 mt-20 min-h-screen">
      {/* Large Search Input */}
      <div className="max-w-3xl mx-auto w-full mb-12">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <SearchIcon className="absolute left-6 w-8 h-8 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search for nightmares..."
            className="w-full bg-surface border border-surface rounded-full py-6 pl-20 pr-16 text-xl md:text-3xl font-display text-text-bright focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors placeholder:text-text-muted/50 shadow-glow"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => {
                setLocalQuery('');
                navigate('/search');
                inputRef.current?.focus();
              }}
              className="absolute right-6 p-2 text-text-muted hover:text-text-bright focus-visible:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </form>
      </div>

      {/* Tabs & Filter Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4 mb-8">
        <div className="flex overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide gap-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "pb-2 font-display text-lg font-bold whitespace-nowrap transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-t-sm",
                activeTab === tab ? "text-text-bright" : "text-text-muted hover:text-text-bright"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="searchTabIndicator" className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-crimson shadow-glow" />
              )}
            </button>
          ))}
        </div>
        
        <Button 
          variant="secondary" 
          size="sm" 
          icon={Filter} 
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-crimson/20 border-crimson text-crimson-bright" : ""}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters Area */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <FilterBar filters={filters} setFilters={setFilters} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Header */}
      {!isLoading && queryParam && (
        <div className="mb-6 font-body text-text-muted">
          Found <span className="font-bold text-text-bright">{filteredData.length}</span> results for <span className="text-text-bright italic">"{queryParam}"</span>
          {activeTab !== 'All' && <span> in {activeTab}</span>}
        </div>
      )}

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[2/3] rounded-xl" />
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <EmptyState 
          title="The void stares back"
          description={queryParam ? `No dark secrets found matching "${queryParam}". Try checking for typos or removing filters.` : "Type something terrifying in the search box above to begin."}
          actionLabel="Clear Filters"
          onAction={() => setFilters({})}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredData.map(item => renderCard(item))}
        </div>
      )}
    </div>
  );
}
