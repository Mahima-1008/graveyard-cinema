import React from 'react';
import { ContentRow } from '@/components/sections';
import { PosterCard } from '@/components/cards';

export default function Home() {
  // Temporary mock data for testing
  const mockMovies = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Nightmare Example ${i + 1}`,
    posterUrl: `https://picsum.photos/seed/horror${i}/400/600`,
    rating: (Math.random() * 2) + 3, // 3.0 to 5.0
    link: `/movies/${i}`
  }));

  return (
    <div className="flex-1 flex flex-col min-h-[50vh]">
      {/* Temporary Hero Space */}
      <div className="h-[50vh] md:h-[60vh] bg-surface flex items-center justify-center mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/graveyard/1920/1080')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl md:text-7xl text-text-bright tracking-wider drop-shadow-glow mb-4">
            Graveyard Cinema
          </h1>
          <p className="font-body text-text-muted max-w-lg mx-auto">
            Your premier destination for horror, thriller, and the macabre. 
          </p>
        </div>
      </div>

      <ContentRow 
        title="Trending Nightmares" 
        seeAllLink="/trending"
        items={mockMovies}
        renderItem={(item, isLoading) => (
          <PosterCard data={item} isLoading={isLoading} />
        )}
      />
      
      <ContentRow 
        title="Recently Added" 
        seeAllLink="/movies"
        items={mockMovies.slice().reverse()}
        renderItem={(item, isLoading) => (
          <PosterCard data={item} isLoading={isLoading} />
        )}
      />
    </div>
  );
}
