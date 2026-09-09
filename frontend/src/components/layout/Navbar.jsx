import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import { IconButton } from '../common';
import useScrollPosition from '@/hooks/useScrollPosition';
import { ROUTES } from '@/routes/routes';
import clsx from 'clsx';
import NavSearch from './NavSearch';

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 60;

  return (
    <header 
      className={clsx(
        "fixed top-0 w-full z-40 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-glow border-crimson/20 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link to={ROUTES.HOME} className="font-display font-bold text-2xl md:text-3xl tracking-widest text-text-bright drop-shadow-glow flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded">
            GRAVEYARD
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 font-body text-sm font-bold tracking-wide">
            <NavLink to={ROUTES.HOME} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Home</NavLink>
            <NavLink to={ROUTES.MOVIES} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Movies</NavLink>
            <NavLink to={ROUTES.SERIES} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Series</NavLink>
            <NavLink to={ROUTES.SHORT_FILMS} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Shorts</NavLink>
            <NavLink to={ROUTES.STORIES} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Stories</NavLink>
            <NavLink to={ROUTES.REELS} className={({isActive}) => clsx("transition-colors hover:text-text-bright relative", isActive ? "text-text-bright after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-crimson after:shadow-glow" : "text-text-muted")}>Reels</NavLink>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <NavSearch />
          
          <div className="relative">
            <IconButton icon={Bell} variant="ghost" aria-label="Notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-crimson rounded-full shadow-glow"></span>
          </div>

          {/* Profile Dropdown Trigger (Mock) */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer group p-1 rounded hover:bg-surface/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-surface border border-surface/50 flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-text-muted group-hover:text-text-bright" />
            </div>
          </div>

          <div className="lg:hidden">
            <IconButton icon={Menu} variant="ghost" aria-label="Open Menu" />
          </div>
        </div>
      </div>
    </header>
  );
}
