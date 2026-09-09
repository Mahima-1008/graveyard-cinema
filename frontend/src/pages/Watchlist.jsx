import React, { useState } from 'react';
import { useWatchlist } from '@/store/useWatchlist';
import { PosterCard, LandscapeCard } from '@/components/cards';
import { EmptyState, IconButton } from '@/components/common';
import { Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function Watchlist() {
  const { items } = useWatchlist();
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  return (
    <div className="flex-1 container mx-auto px-6 lg:px-12 py-8 md:py-12 mt-14 md:mt-20 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-surface">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-text-bright drop-shadow-md mb-2">My Watchlist</h1>
          <p className="font-body text-text-muted">{items.length} {items.length === 1 ? 'Nightmare' : 'Nightmares'} saved</p>
        </div>
        
        {items.length > 0 && (
          <div className="flex items-center gap-2 bg-surface/50 rounded-lg p-1 w-max">
            <IconButton 
              icon={Grid} 
              variant="ghost" 
              size="sm" 
              onClick={() => setView('grid')}
              className={clsx(view === 'grid' ? "bg-background text-text-bright shadow" : "text-text-muted")} 
            />
            <IconButton 
              icon={List} 
              variant="ghost" 
              size="sm" 
              onClick={() => setView('list')}
              className={clsx(view === 'list' ? "bg-background text-text-bright shadow" : "text-text-muted")} 
            />
          </div>
        )}
      </header>

      {items.length === 0 ? (
        <EmptyState 
          title="Your watchlist is empty"
          description="Find movies and series to add to your collection."
          actionLabel="Explore Movies"
          onAction={() => navigate('/movies')}
          className="my-16"
        />
      ) : (
        <div className={clsx(
          view === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            : "flex flex-col gap-4 max-w-4xl"
        )}>
          {items.map(item => (
            view === 'grid' ? (
              <PosterCard key={item.id} data={item} />
            ) : (
              <LandscapeCard key={item.id} data={item} />
            )
          ))}
        </div>
      )}
    </div>
  );
}
