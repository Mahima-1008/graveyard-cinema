import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Blurred cinematic background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-30 scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505691938895-1758d7bef511?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-background/40"></div>

      <div className="relative z-10 w-full max-w-md px-6 py-12 flex flex-col items-center">
        <Link to={ROUTES.HOME} className="mb-8 block">
          <span className="font-display font-bold text-3xl text-text-bright tracking-widest uppercase drop-shadow-lg">
            Graveyard
          </span>
        </Link>
        <div className="w-full bg-surface/80 backdrop-blur-md border border-surface rounded-lg p-8 shadow-glow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
