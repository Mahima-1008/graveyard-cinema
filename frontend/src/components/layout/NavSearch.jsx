import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useDebounce from '@/hooks/useDebounce';
import useGlobalSearch from '@/hooks/useGlobalSearch';
import { Badge } from '../common';

export default function NavSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const { results, isLoading } = useGlobalSearch(debouncedQuery);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('gc_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecent = (term) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('gc_recent_searches', JSON.stringify(updated));
  };

  const removeRecent = (term) => {
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem('gc_recent_searches', JSON.stringify(updated));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('gc_recent_searches');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecent(query.trim());
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    saveRecent(item.title);
    setIsOpen(false);
    setQuery('');
    
    // Naive routing based on type
    if (item.searchType === 'Movie') navigate(`/movies/${item.slug}`);
    else if (item.searchType === 'Series') navigate(`/series/${item.slug}`);
    else if (item.searchType === 'Short Film') navigate(`/shorts/${item.slug}`);
    else navigate(`/search?q=${encodeURIComponent(item.title)}`);
  };

  return (
    <div ref={wrapperRef} className="relative z-50 flex items-center">
      <form 
        onSubmit={handleSubmit}
        className={clsx(
          "flex items-center transition-all duration-300 bg-surface rounded-full overflow-hidden border",
          isOpen ? "w-64 border-surface" : "w-10 border-transparent bg-transparent"
        )}
      >
        <button 
          type="button"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          className="w-10 h-10 flex items-center justify-center shrink-0 text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Titles, creators, genres..."
          className={clsx(
            "flex-1 bg-transparent border-none outline-none text-sm text-text-bright placeholder:text-text-muted transition-all",
            isOpen ? "opacity-100 px-2" : "opacity-0 w-0 px-0"
          )}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && query && (
          <button 
            type="button" 
            onClick={() => setQuery('')}
            className="w-8 h-full flex items-center justify-center text-text-muted hover:text-text-bright pr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-4 w-80 bg-surface border border-surface rounded-xl shadow-glow overflow-hidden"
          >
            <div className="max-h-96 overflow-y-auto">
              {!debouncedQuery ? (
                // Recent Searches
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Recent</span>
                    {recentSearches.length > 0 && (
                      <button onClick={clearAllRecent} className="text-xs text-crimson hover:text-crimson-bright">Clear All</button>
                    )}
                  </div>
                  {recentSearches.length === 0 ? (
                    <p className="text-sm text-text-muted italic">No recent searches.</p>
                  ) : (
                    <ul className="space-y-1">
                      {recentSearches.map(term => (
                        <li key={term} className="flex items-center justify-between group">
                          <button 
                            className="flex-1 flex items-center gap-3 text-sm text-text-bright hover:bg-background/50 p-2 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setQuery(term);
                              inputRef.current?.focus();
                            }}
                          >
                            <Clock className="w-4 h-4 text-text-muted" />
                            {term}
                          </button>
                          <button 
                            onClick={() => removeRecent(term)}
                            className="p-2 opacity-0 group-hover:opacity-100 text-text-muted hover:text-crimson transition-all"
                            aria-label={`Remove ${term}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Suggestions
                <div className="p-2">
                  {isLoading ? (
                    <div className="p-4 text-sm text-text-muted text-center animate-pulse">Searching...</div>
                  ) : results.length === 0 ? (
                    <div className="p-4 text-sm text-text-muted text-center">No results for "{debouncedQuery}"</div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {results.slice(0, 5).map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleSuggestionClick(item)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors text-left"
                        >
                          <div className="w-10 h-14 bg-background rounded overflow-hidden shrink-0">
                            <img src={item.posterUrl || item.videoThumbUrl || item.avatarUrl || item.coverUrl || 'https://via.placeholder.com/40x60/151316/F5F5F5?text=?'} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-bold text-text-bright truncate">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="default" className="text-[9px] bg-background border-transparent">{item.searchType}</Badge>
                              {(item.year || item.views || item.author) && (
                                <span className="text-[10px] text-text-muted truncate">{item.year || item.views || item.author}</span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                      <Link 
                        to={`/search?q=${encodeURIComponent(debouncedQuery)}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-3 mt-2 text-sm text-crimson font-bold hover:bg-crimson/10 rounded-lg transition-colors group"
                      >
                        See all results for "{debouncedQuery}"
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
