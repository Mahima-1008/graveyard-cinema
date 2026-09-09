import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, Bookmark, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ROUTES } from '../../routes/routes';
import useScrollPosition from '../../hooks/useScrollPosition';
import { IconButton } from '../common';

const NAV_LINKS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Movies', path: ROUTES.MOVIES },
  { name: 'Series', path: ROUTES.SERIES },
  { name: 'Shorts', path: ROUTES.SHORT_FILMS },
  { name: 'Stories', path: ROUTES.STORIES },
  { name: 'Reels', path: ROUTES.REELS },
  { name: 'Trending', path: ROUTES.TRENDING || '/trending' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 60;
  const navigate = useNavigate();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Handle click outside for profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (isSearchExpanded && searchInputRef.current && !searchInputRef.current.contains(e.target) && searchQuery === '') {
        setIsSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out hidden md:block",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-crimson/30 shadow-[0_4px_30px_rgba(196,30,58,0.15)] py-2" 
          : "bg-transparent border-b border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between gap-8 h-12">
        {/* Logo & Main Links */}
        <div className="flex items-center gap-10">
          <Link to={ROUTES.HOME} className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded">
            <span className="font-display font-bold text-2xl text-text-bright tracking-widest uppercase drop-shadow-lg">
              Graveyard
            </span>
          </Link>

          <nav className="flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => clsx(
                  "relative font-body text-sm font-medium tracking-wide transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded",
                  isActive ? "text-text-bright" : "text-text-muted hover:text-text-bright"
                )}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-crimson shadow-glow rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form 
            ref={searchInputRef}
            onSubmit={handleSearchSubmit} 
            className="relative flex items-center"
          >
            <motion.div
              initial={false}
              animate={{ width: isSearchExpanded ? 240 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex items-center justify-end"
            >
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.input
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    type="text"
                    placeholder="Search movies, series..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="absolute left-0 w-full pl-10 pr-4 py-1.5 bg-surface border border-surface rounded-full text-sm text-text-bright placeholder:text-text-muted focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson"
                  />
                )}
              </AnimatePresence>
              <IconButton 
                icon={Search} 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (!isSearchExpanded) setIsSearchExpanded(true);
                  else if (searchQuery) handleSearchSubmit(new Event('submit'));
                }}
                className={clsx("relative z-10", isSearchExpanded && "text-text-bright absolute left-1")}
                aria-label="Search"
              />
            </motion.div>
          </form>

          {/* Notifications */}
          <div className="relative">
            <IconButton icon={Bell} variant="ghost" size="sm" aria-label="Notifications" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-crimson-bright rounded-full border border-background"></span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-text-bright hover:border-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson overflow-hidden"
              aria-label="User menu"
              aria-expanded={isProfileOpen}
            >
              <User className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-56 bg-surface border border-surface rounded-xl shadow-xl overflow-hidden py-2 z-50 origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-background/50 mb-2">
                    <p className="text-sm font-medium text-text-bright">Guest User</p>
                    <p className="text-xs text-text-muted mt-0.5">guest@graveyard.com</p>
                  </div>
                  
                  <Link to={ROUTES.PROFILE} className="flex items-center gap-3 px-4 py-2 text-sm text-text-muted hover:text-text-bright hover:bg-background/50 transition-colors focus-visible:outline-none focus-visible:bg-background/50">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to={ROUTES.WATCHLIST} className="flex items-center gap-3 px-4 py-2 text-sm text-text-muted hover:text-text-bright hover:bg-background/50 transition-colors focus-visible:outline-none focus-visible:bg-background/50">
                    <Bookmark className="w-4 h-4" /> Watchlist
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-muted hover:text-text-bright hover:bg-background/50 transition-colors focus-visible:outline-none focus-visible:bg-background/50">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <div className="border-t border-background/50 my-2"></div>
                  <Link to={ROUTES.LOGIN} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-crimson hover:text-crimson-bright hover:bg-background/50 transition-colors focus-visible:outline-none focus-visible:bg-background/50">
                    <LogOut className="w-4 h-4" /> Log out
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
