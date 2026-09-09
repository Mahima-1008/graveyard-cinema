import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button, IconButton, Badge } from '../common';
import clsx from 'clsx';
import { useGenres } from '@/hooks/useGenres';

const SORT_OPTIONS = ['Popularity', 'Newest', 'Highest Rated', 'A-Z'];
const MOOD_OPTIONS = ['Late Night', 'Slow Burn', 'Jump Scares', 'True Story'];

export default function FilterBar({ filters, setFilters }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: genres } = useGenres();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleGenre = (genreName) => {
    setFilters(prev => {
      const current = prev.genres || [];
      const newGenres = current.includes(genreName) 
        ? current.filter(g => g !== genreName)
        : [...current, genreName];
      return { ...prev, genres: newGenres };
    });
  };

  const removeFilter = (key, valueToRemove) => {
    if (key === 'genres') {
      toggleGenre(valueToRemove);
    } else {
      setFilters(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Active Chips
  const activeChips = [];
  if (filters.genres) filters.genres.forEach(g => activeChips.push({ key: 'genres', value: g, label: g }));
  if (filters.mood) activeChips.push({ key: 'mood', value: filters.mood, label: filters.mood });
  if (filters.sortBy && filters.sortBy !== 'Popularity') activeChips.push({ key: 'sortBy', value: filters.sortBy, label: `Sort: ${filters.sortBy}` });

  const FilterContent = () => (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
      {/* Sort By */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Sort By</label>
        <div className="relative">
          <select 
            value={filters.sortBy || 'Popularity'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full md:w-auto appearance-none bg-surface border border-surface text-text-bright text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>
      </div>

      {/* Genres (Multi-select) - Simplified as a scrollable chip row on desktop for ease, or a native multi-select */}
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Genres</label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {genres?.map(g => {
            const isSelected = filters.genres?.includes(g.name);
            return (
              <button
                key={g.id}
                onClick={() => toggleGenre(g.name)}
                className={clsx(
                  "snap-start shrink-0 px-4 py-1.5 rounded-full text-sm font-body border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
                  isSelected 
                    ? "bg-crimson/20 border-crimson text-crimson-bright" 
                    : "bg-surface border-surface text-text-muted hover:border-crimson/50"
                )}
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Quick Filters */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Mood</label>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map(mood => {
            const isSelected = filters.mood === mood;
            return (
              <button
                key={mood}
                onClick={() => handleFilterChange('mood', isSelected ? null : mood)}
                className={clsx(
                  "shrink-0 px-3 py-1.5 rounded-lg text-sm font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
                  isSelected 
                    ? "bg-text-bright text-background font-bold" 
                    : "bg-surface text-text-muted hover:text-text-bright"
                )}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-end">
        <Button 
          variant="secondary" 
          icon={Filter} 
          onClick={() => setIsMobileOpen(true)}
          className="bg-surface/50"
        >
          Filters {activeChips.length > 0 && `(${activeChips.length})`}
        </Button>
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden md:block bg-background/50 border-y border-surface py-6">
        <FilterContent />
      </div>

      {/* Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-surface rounded-t-3xl p-6 md:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-text-bright">Filters</h3>
                <IconButton icon={X} variant="ghost" size="sm" onClick={() => setIsMobileOpen(false)} />
              </div>
              <FilterContent />
              <Button className="w-full mt-8" onClick={() => setIsMobileOpen(false)}>Show Results</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Active Filter Chips Row */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted mr-2">Active:</span>
          <AnimatePresence>
            {activeChips.map(chip => (
              <motion.div
                key={`${chip.key}-${chip.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 bg-surface border border-surface px-3 py-1 rounded-full text-xs font-bold text-text-bright"
              >
                {chip.label}
                <button 
                  onClick={() => removeFilter(chip.key, chip.value)}
                  className="ml-1 text-text-muted hover:text-crimson transition-colors focus-visible:outline-none"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button 
            onClick={() => setFilters({})}
            className="text-xs text-crimson hover:text-crimson-bright ml-2 focus-visible:outline-none focus-visible:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
