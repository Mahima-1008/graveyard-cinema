import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import { IconButton } from '../common';
import useScrollPosition from '@/hooks/useScrollPosition';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes/routes';
import clsx from 'clsx';
import NavSearch from './NavSearch';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
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
          
          {isAuthenticated ? (
            <>
              <div className="relative">
                <IconButton icon={Bell} variant="ghost" aria-label="Notifications" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-crimson rounded-full shadow-glow"></span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative group">
                <Link to={ROUTES.PROFILE} className="hidden md:flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
                  <div className="w-8 h-8 rounded-full bg-surface border border-surface/50 overflow-hidden flex items-center justify-center">
                    {user?.name ? (
                      <span className="text-xs font-bold text-text-bright">{user.name.charAt(0).toUpperCase()}</span>
                    ) : (
                      <User className="w-4 h-4 text-text-muted" />
                    )}
                  </div>
                </Link>

                {/* Dropdown Menu (Hover) */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-48 bg-surface border border-surface rounded-xl shadow-glow overflow-hidden py-2 flex flex-col">
                    <div className="px-4 py-2 border-b border-surface mb-2">
                      <p className="text-xs font-bold text-text-bright truncate">{user?.name}</p>
                      <p className="text-[10px] text-text-muted truncate">{user?.email}</p>
                    </div>
                    <Link to={ROUTES.PROFILE} className="px-4 py-2 text-sm text-text-muted hover:text-text-bright hover:bg-background/50 transition-colors">Profile & Settings</Link>
                    <Link to={ROUTES.WATCHLIST} className="px-4 py-2 text-sm text-text-muted hover:text-text-bright hover:bg-background/50 transition-colors">Watchlist</Link>
                    <button onClick={logout} className="px-4 py-2 text-sm text-text-muted hover:text-crimson-bright hover:bg-background/50 transition-colors text-left w-full">Log out</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} className="hidden md:block px-4 py-2 bg-surface text-sm font-bold text-text-bright rounded-full hover:bg-surface/80 transition-colors border border-surface/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
              Sign In
            </Link>
          )}

          <div className="lg:hidden">
            <IconButton icon={Menu} variant="ghost" aria-label="Open Menu" />
          </div>
        </div>
      </div>
    </header>
  );
}
