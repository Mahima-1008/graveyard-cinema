/*
Expected data shape:
{
  id: string | number,
  title: string,
  thumbnailUrl: string,
  progress: number, // 0-100
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../common';
import clsx from 'clsx';
import { PlayCircle } from 'lucide-react';

export default function LandscapeCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("aspect-video w-full", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group block relative w-full rounded-lg overflow-hidden bg-surface transition-cinematic hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
        className
      )}
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={data.thumbnailUrl} 
          alt={data.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={clsx(
            "w-full h-full object-cover transition-cinematic duration-700",
            imageLoaded ? "opacity-100" : "opacity-0 blur-sm",
            "group-hover:scale-105 group-hover:brightness-75"
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-12 h-12 text-text-bright drop-shadow-lg" />
        </div>
        
        {typeof data.progress === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-background/50">
            <div 
              className="h-full bg-crimson shadow-[0_0_8px_rgba(196,30,58,0.8)]" 
              style={{ width: `${Math.max(0, Math.min(100, data.progress))}%` }}
            />
          </div>
        )}
      </div>
      <div className="py-2 px-1">
        <h4 className="font-body text-sm font-medium text-text-bright truncate">{data.title}</h4>
      </div>
    </Link>
  );
}
