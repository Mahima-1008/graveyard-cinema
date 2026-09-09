/*
Expected data shape:
{
  id: string | number,
  episodeNumber: number,
  title: string,
  thumbnailUrl: string,
  duration: string,
  synopsis: string,
  progress: number, // 0-100
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../common';
import { PlayCircle } from 'lucide-react';
import clsx from 'clsx';

export default function EpisodeCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className={clsx("flex flex-col sm:flex-row gap-4", className)}>
        <Skeleton className="w-full sm:w-48 aspect-video shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2 py-1">
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-full h-12" />
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group flex flex-col sm:flex-row gap-4 p-2 -mx-2 rounded-lg hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:bg-surface/50",
        className
      )}
    >
      <div className="relative w-full sm:w-48 aspect-video shrink-0 rounded-lg overflow-hidden bg-surface">
        <img 
          src={data.thumbnailUrl} 
          alt={data.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={clsx(
            "w-full h-full object-cover transition-cinematic duration-700",
            imageLoaded ? "opacity-100" : "opacity-0 blur-sm",
            "group-hover:brightness-75"
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="w-10 h-10 text-text-bright drop-shadow-md" />
        </div>
        {typeof data.progress === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/50">
            <div 
              className="h-full bg-crimson" 
              style={{ width: `${Math.max(0, Math.min(100, data.progress))}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex-1 py-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-display font-bold text-text-bright">
            {data.episodeNumber}. {data.title}
          </h4>
          <span className="text-xs text-text-muted font-body shrink-0">{data.duration}</span>
        </div>
        <p className="text-sm text-text-muted font-body line-clamp-2 md:line-clamp-3">
          {data.synopsis}
        </p>
      </div>
    </Link>
  );
}
