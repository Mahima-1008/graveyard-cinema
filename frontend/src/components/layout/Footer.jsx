import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export default function Footer() {
  return (
    <footer className="border-t border-surface bg-background mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-text-muted tracking-widest uppercase">
            Graveyard Cinema
          </span>
        </div>
        <p className="text-xs text-text-muted font-body">
          &copy; {new Date().getFullYear()} Graveyard Cinema. All nightmares reserved.
        </p>
        <div className="flex gap-4">
          <Link to={ROUTES.HOME} className="text-xs text-text-muted hover:text-crimson transition-fast">Terms</Link>
          <Link to={ROUTES.HOME} className="text-xs text-text-muted hover:text-crimson transition-fast">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
