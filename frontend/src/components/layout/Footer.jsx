import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { X, Camera, PlaySquare, ThumbsUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-surface mt-20">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div>
            <Link to={ROUTES.HOME} className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded">
              <h3 className="font-display font-bold text-2xl text-text-bright tracking-widest text-shadow-glow mb-4">
                GRAVEYARD<br />CINEMA
              </h3>
            </Link>
            <p className="text-text-muted text-sm max-w-xs mb-6">
              Your premium destination for horror, thrillers, and the macabre. Streaming nightmares 24/7.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Browse</h4>
            <ul className="space-y-3">
              <li><Link to={ROUTES.MOVIES} className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Movies</Link></li>
              <li><Link to={ROUTES.SERIES} className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Series</Link></li>
              <li><Link to={ROUTES.SHORT_FILMS} className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Short Films</Link></li>
              <li><Link to={ROUTES.STORIES} className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Stories</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Account</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Content Warnings</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none focus-visible:text-text-bright">Contact Us</a></li>
            </ul>
          </div>

          {/* Socials Col */}
          <div>
            <h4 className="font-body font-bold text-text-bright mb-4 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="X" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-white hover:bg-[#1DA1F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
                <X className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-white hover:bg-[#E1306C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-white hover:bg-[#FF0000] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
                <PlaySquare className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-white hover:bg-[#4267B2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
                <ThumbsUp className="w-5 h-5" />
              </a>
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
