import React from 'react';
import { ContentRow } from '@/components/sections';
import { PosterCard } from '@/components/cards';
import { Hero } from '@/components/hero';
import { useTrendingMovies, useMovies } from '@/hooks/useMovies';

export default function Home() {
  const { data: trending, isLoading: trendingLoading } = useTrendingMovies();
  const { data: recent, isLoading: recentLoading } = useMovies();

  return (
    <div className="flex-1 flex flex-col min-h-[50vh] pb-12">
      {/* Hero Section */}
      <Hero />

      <ContentRow 
        title="Trending Nightmares" 
        seeAllLink="/trending"
        items={trending}
        isLoading={trendingLoading}
        renderItem={(item, isLoading) => (
          <PosterCard data={item} isLoading={isLoading} />
        )}
      />
      
      <ContentRow 
        title="Recently Added" 
        seeAllLink="/movies"
        items={recent?.slice().reverse() || []}
        isLoading={recentLoading}
        renderItem={(item, isLoading) => (
          <PosterCard data={item} isLoading={isLoading} />
        )}
      />
    </div>
  );
}
