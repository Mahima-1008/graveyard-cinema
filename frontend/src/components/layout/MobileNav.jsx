import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, Search, Film, Bookmark, User, Menu, X, MonitorPlay, Tags, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ROUTES } from '../../routes/routes';
import { IconButton } from '../common';
import useScrollPosition from '../../hooks/useScrollPosition';

const BOTTOM_TABS = [
  { name: 'Home', icon: Home, path: ROUTES.HOME },
  { name: 'Search', icon: Search, path: ROUTES.SEARCH },
  { name: 'Reels', icon: Film, path: ROUTES.REELS },
  { name: 'Watchlist', icon: Bookmark, path: ROUTES.WATCHLIST },
  { name: 'Profile', icon: User, path: ROUTES.PROFILE },
];

const DRAWER_LINKS = [
  { name: 'Stories', icon: Bookmark, path: ROUTES.STORIES },
  { name: 'Trailers', icon: MonitorPlay, path: ROUTES.TRAILERS },
  { name: 'Genres', icon: Tags, path: '/genre/horror' }, // Example generic route
  { name: 'Settings', icon: Settings, path: ROUTES.PROFILE }, // Pointing to profile for now
];

export default function MobileNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isDrawerOpen]);

  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header 
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 transition-all duration-300",
          isScrolled 
            ? "bg-background/90 backdrop-blur-md border-b border-crimson/20" 
            : "bg-gradient-to-b from-background/80 to-transparent"
        )}
      >
        <Link to={ROUTES.HOME} className="flex items-center">
          <span className="font-display font-bold text-xl text-text-bright tracking-widest uppercase">
            Graveyard
          </span>
        </Link>
        <IconButton 
          icon={Menu} 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsDrawerOpen(true)} 
          aria-label="Open menu"
        />
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-surface pb-safe pt-2 px-2 flex justify-around">
        {BOTTOM_TABS.map((tab) => (
          <NavLink 
            key={tab.name} 
            to={tab.path}
            className={({ isActive }) => clsx(
              "flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
              isActive ? "text-crimson-bright" : "text-text-muted hover:text-text-bright"
            )}
          >
            {({ isActive }) => (
              <>
                <tab.icon className={clsx("w-6 h-6 mb-1 transition-transform", isActive && "scale-110")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-body font-medium">{tab.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 z-50 bg-surface border-l border-surface shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-background">
                <span className="font-display text-lg text-text-bright">Menu</span>
                <IconButton icon={X} variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)} aria-label="Close menu" />
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 pb-2 mb-2 border-b border-background/50">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Explore More</p>
                  <div className="flex flex-col gap-1">
                    {DRAWER_LINKS.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) => clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors",
                          isActive ? "bg-crimson/10 text-crimson-bright" : "text-text-muted hover:text-text-bright hover:bg-background/50"
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
