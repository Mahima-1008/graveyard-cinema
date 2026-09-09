import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-surface pt-16 pb-8 md:pb-12 mt-auto">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Intro */}
          <div className="md:col-span-1">
            <Link to={ROUTES.HOME} className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded">
              <span className="font-display font-bold text-2xl text-text-bright tracking-widest uppercase">
                Graveyard
              </span>
            </Link>
            <p className="text-sm font-body text-text-muted leading-relaxed">
              Your premier destination for horror, thriller, and the macabre. 
              Stream nightmares on demand.
            </p>
          </div>

          {/* Links - Explore */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.MOVIES} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Movies</Link></li>
              <li><Link to={ROUTES.SERIES} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Series</Link></li>
              <li><Link to={ROUTES.STORIES} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Stories</Link></li>
              <li><Link to={ROUTES.REELS} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Reels</Link></li>
            </ul>
          </div>

          {/* Links - Company */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.HOME} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">About Us</Link></li>
              <li><Link to={ROUTES.HOME} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Careers</Link></li>
              <li><Link to={ROUTES.HOME} className="text-sm text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="YouTube" className="text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright"><Youtube className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-body">
            &copy; {new Date().getFullYear()} Graveyard Cinema. All nightmares reserved.
          </p>
          <div className="flex gap-6">
            <Link to={ROUTES.HOME} className="text-xs text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Terms of Service</Link>
            <Link to={ROUTES.HOME} className="text-xs text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Privacy Policy</Link>
            <Link to={ROUTES.HOME} className="text-xs text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:text-crimson-bright">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
