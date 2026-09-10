import React from 'react';
import { Link } from 'react-router-dom';
import { ContentRow } from '@/components/sections';
import { 
  PosterCard, 
  LandscapeCard, 
  RankingCard, 
  FeaturedCard, 
  ReelCard, 
  StoryCard 
} from '@/components/cards';
import { Hero } from '@/components/hero';
import { Badge, IconButton } from '@/components/common';
import { Bell } from 'lucide-react';

// Hooks
import { useMovies, useTrendingMovies } from '@/hooks/useMovies';
import { useSeries } from '@/hooks/useSeries';
import { useShortFilms } from '@/hooks/useShortFilms';
import { useReels } from '@/hooks/useReels';
import { useStories } from '@/hooks/useStories';
import { useGenres } from '@/hooks/useGenres';

export default function Home() {
  // Fetch Data
  const { data: trending, isLoading: trendingLoading } = useTrendingMovies();
  const { data: movies, isLoading: moviesLoading } = useMovies();
  const { data: series, isLoading: seriesLoading } = useSeries();
  const { data: shortFilms, isLoading: shortsLoading } = useShortFilms();
  const { data: reels, isLoading: reelsLoading } = useReels();
  const { data: stories, isLoading: storiesLoading } = useStories();
  const { data: genres, isLoading: genresLoading } = useGenres();

  // Mock progress for "Continue Watching"
  const continueWatching = movies?.slice(0, 4).map((m, i) => ({
    ...m,
    thumbnailUrl: m.backdropUrl,
    progress: (i + 1) * 20
  })) || [];

  return (
    <div className="flex-1 flex flex-col min-h-[50vh] pb-12">
      {/* 1. Hero */}
      <Hero />

      <div className="flex flex-col gap-2 mt-8">
        {/* 2. Continue Watching (Only render if items exist) */}
        {continueWatching.length > 0 && (
          <ContentRow 
            title="Continue Watching" 
            items={continueWatching}
            isLoading={moviesLoading}
            itemWidthClass="w-60 md:w-80"
            renderItem={(item, isLoading) => (
              <LandscapeCard data={item} isLoading={isLoading} />
            )}
          />
        )}

        {/* 3. Trending Now */}
        <ContentRow 
          title="Trending Now" 
          seeAllLink="/trending"
          items={trending}
          isLoading={trendingLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 4. New This Week */}
        <ContentRow 
          title="New This Week" 
          items={series?.slice(0, 8)}
          isLoading={seriesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard 
              data={item} 
              isLoading={isLoading} 
              customBadge={<Badge variant="new">NEW</Badge>} 
            />
          )}
        />

        {/* 5. Top 10 Horror */}
        <ContentRow 
          title="Top 10 Horror" 
          items={movies?.slice(0, 10).map((m, i) => ({ ...m, rank: i + 1 }))}
          isLoading={moviesLoading}
          loadingCount={10}
          renderItem={(item, isLoading) => (
            <RankingCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 6. Graveyard Originals */}
        <ContentRow 
          title="Graveyard Originals" 
          items={movies?.slice(4, 9)}
          isLoading={moviesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard 
              data={item} 
              isLoading={isLoading} 
              customBadge={<Badge variant="crimson">ORIGINAL</Badge>}
            />
          )}
        />

        {/* 7. Because You Watched */}
        <ContentRow 
          title='Because You Watched "The Weeping Shadows"' 
          items={movies?.slice(5, 12)}
          isLoading={moviesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 8. Editor's Picks (Bigger Gap Before) */}
        <div className="mt-8 mb-4">
          <ContentRow 
            title="Editor's Picks" 
            items={series?.slice(2, 5)}
            isLoading={seriesLoading}
            loadingCount={3}
            itemWidthClass="w-72 md:w-full max-w-[800px]"
            renderItem={(item, isLoading) => (
              <FeaturedCard data={item} isLoading={isLoading} />
            )}
          />
        </div>

        {/* 9. Midnight Picks */}
        <div className="py-8 bg-surface/50 border-y border-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </div>
          <div className="relative z-10">
            <ContentRow 
              title="Midnight Picks" 
              items={series?.slice(1, 8)}
              isLoading={seriesLoading}
              renderItem={(item, isLoading) => (
                <PosterCard 
                  data={item} 
                  isLoading={isLoading} 
                  className="brightness-75 hover:brightness-110"
                />
              )}
            />
          </div>
        </div>

        {/* 8. Recently Added */}
        <ContentRow 
          title="Recently Added" 
          items={movies?.slice().reverse()}
          isLoading={moviesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 9. Horror Classics */}
        <ContentRow 
          title="Horror Classics" 
          items={movies?.slice(3, 10)}
          isLoading={moviesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 10. Hidden Gems */}
        <ContentRow 
          title="Hidden Gems" 
          items={series?.slice(4, 10)}
          isLoading={seriesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 11. New Short Films */}
        <ContentRow 
          title="New Short Films" 
          seeAllLink="/shorts"
          items={shortFilms}
          isLoading={shortsLoading}
          renderItem={(item, isLoading) => (
            <PosterCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 12. Trending Reels */}
        <div className="py-4 bg-surface/30">
          <ContentRow 
            title="Trending Reels" 
            seeAllLink="/reels"
            items={reels?.slice(0, 10)}
            isLoading={reelsLoading}
            renderItem={(item, isLoading) => (
              <ReelCard data={item} isLoading={isLoading} />
            )}
          />
        </div>

        {/* 13. Horror Stories of the Week */}
        <ContentRow 
          title="Horror Stories of the Week" 
          seeAllLink="/stories"
          items={stories}
          isLoading={storiesLoading}
          renderItem={(item, isLoading) => (
            <StoryCard data={item} isLoading={isLoading} />
          )}
        />

        {/* 14. Upcoming Releases */}
        <ContentRow 
          title="Upcoming Releases" 
          items={movies?.slice(8, 14)}
          isLoading={moviesLoading}
          renderItem={(item, isLoading) => (
            <PosterCard 
              data={item} 
              isLoading={isLoading}
              customBadge={
                <Badge variant="default" className="bg-background/80 backdrop-blur border-transparent text-[10px]">
                  Coming Oct 31
                </Badge>
              }
              customCta={
                <IconButton 
                  icon={Bell} 
                  size="sm" 
                  variant="secondary"
                  className="bg-background/80 backdrop-blur text-text-bright border-transparent"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Notify me"
                />
              }
            />
          )}
        />

        {/* 15. Browse by Category Grid */}
        <section className="px-6 lg:px-12 py-12 mt-8 border-t border-surface">
          <h2 className="font-display text-2xl text-text-bright font-bold tracking-wide mb-8">Browse by Category</h2>
          
          {genresLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-video bg-surface rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {genres?.map((genre) => (
                <Link 
                  key={genre.id} 
                  to={`/genre/${genre.slug}`}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-surface transition-cinematic hover:scale-105 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson block"
                >
                  <img 
                    src={genre.backgroundImageUrl} 
                    alt={genre.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-cinematic duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
                  <div className="absolute inset-0 p-4 flex items-end">
                    <span className="font-display font-bold text-text-bright text-sm md:text-base drop-shadow-md group-hover:text-crimson-bright transition-colors">
                      {genre.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
