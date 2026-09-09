import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSeries } from '@/hooks/useSeries';
import { DetailPageLayout } from '@/components/sections';
import { EpisodeCard } from '@/components/cards';
import clsx from 'clsx';

export default function SeriesDetail() {
  const { slug } = useParams();
  
  const { data: series, isLoading: seriesLoading } = useSeries(slug);
  const { data: allSeries, isLoading: allLoading } = useSeries(); // for similar

  const [activeSeason, setActiveSeason] = useState(1);

  // Find similar series
  const similarItems = React.useMemo(() => {
    if (!series || !allSeries) return [];
    return allSeries.filter(s => 
      s.id !== series.id && 
      s.genres?.some(g => series.genres?.includes(g))
    );
  }, [series, allSeries]);

  const currentSeasonData = series?.seasons?.find(s => s.seasonNumber === activeSeason);

  return (
    <DetailPageLayout 
      data={series} 
      isLoading={seriesLoading} 
      similarItems={similarItems} 
      similarLoading={allLoading}
    >
      {/* Series Specific Content: Season Selector & Episodes */}
      {series?.seasons && series.seasons.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-6 border-b border-surface mb-6 overflow-x-auto scrollbar-hide">
            {series.seasons.map(season => (
              <button
                key={season.seasonNumber}
                onClick={() => setActiveSeason(season.seasonNumber)}
                className={clsx(
                  "pb-3 text-lg font-display font-bold whitespace-nowrap transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-t-sm",
                  activeSeason === season.seasonNumber 
                    ? "text-text-bright border-crimson" 
                    : "text-text-muted border-transparent hover:text-text-bright"
                )}
              >
                Season {season.seasonNumber}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {currentSeasonData?.episodes?.map(ep => (
              <EpisodeCard key={ep.id} data={ep} />
            ))}
          </div>
        </div>
      )}
    </DetailPageLayout>
  );
}
