/*
Expected data shape:
{
  id: string | number,
  title: string,
  posterUrl: string,
  rating: number,
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Star } from 'lucide-react';
import { Skeleton, IconButton, FearMeter } from '../common';
import clsx from 'clsx';

export default function PosterCard({ data, isLoading, className, customBadge, customCta }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("aspect-[2/3] w-full", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group relative block aspect-[2/3] w-full rounded-lg overflow-hidden bg-surface transition-cinematic md:hover:scale-105 md:hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
        className
      )}
      aria-label={data.title}
    >
      <img 
        src={data.posterUrl} 
        alt={data.title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={clsx(
          "w-full h-full object-cover transition-cinematic duration-700",
          imageLoaded ? "opacity-100" : "opacity-0 blur-sm",
          "md:group-hover:brightness-110"
        )}
      />

      {customBadge && (
        <div className="absolute top-2 left-2 z-10">
          {customBadge}
        </div>
      )}
      
      {/* Desktop Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-display text-lg text-text-bright line-clamp-2">{data.title}</h3>
        <div className="flex items-center justify-between mt-2">
          {!customBadge && (
            data.fearMeter ? (
              <FearMeter value={Math.ceil((data.fearMeter / 100) * 5)} size="sm" />
            ) : (
              <div className="flex items-center text-warning text-sm font-bold">
                <Star className="w-4 h-4 fill-warning mr-1" />
                {data.rating?.toFixed(1)}
              </div>
            )
          )}
        </div>
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
        {customCta ? customCta : (
          <IconButton 
            icon={Bookmark} 
            size="sm" 
            variant="secondary"
            className="bg-background/80 backdrop-blur text-text-bright border-transparent"
            onClick={(e) => {
              e.preventDefault();
              // Handle watchlist
            }}
            aria-label="Add to watchlist"
          />
        )}
      </div>
    </Link>
  );
}
