import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-text-bright tracking-widest uppercase">
            Graveyard
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to={ROUTES.MOVIES} className="text-sm font-body text-text-muted hover:text-crimson-bright transition-fast">Movies</Link>
          <Link to={ROUTES.SERIES} className="text-sm font-body text-text-muted hover:text-crimson-bright transition-fast">Series</Link>
          <Link to={ROUTES.STORIES} className="text-sm font-body text-text-muted hover:text-crimson-bright transition-fast">Stories</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to={ROUTES.LOGIN} className="text-sm font-body text-text-muted hover:text-text-bright transition-fast">Login</Link>
        </div>
      </div>
    </header>
  );
}
