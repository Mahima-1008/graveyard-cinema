/*
Expected data shape:
{
  id: string | number,
  title: string,
  backdropUrl: string,
  description: string,
  genres: string[],
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Skeleton } from '../common';
import clsx from 'clsx';

export default function FeaturedCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("aspect-[21/9] md:aspect-[3/1] w-full rounded-xl", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group relative block w-full rounded-xl overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
        className
      )}
    >
      <div className="aspect-[21/9] md:aspect-[3/1] w-full relative">
        <img 
          src={data.backdropUrl} 
          alt={data.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={clsx(
            "w-full h-full object-cover transition-cinematic duration-1000",
            imageLoaded ? "opacity-100" : "opacity-0 blur-md",
            "group-hover:scale-105"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
          <div className="flex flex-wrap gap-2 mb-3">
            {data.genres?.map(genre => (
              <Badge key={genre} variant="crimson">{genre}</Badge>
            ))}
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-text-bright mb-2 drop-shadow-lg">{data.title}</h2>
          <p className="font-body text-text-muted line-clamp-2 md:line-clamp-3 max-w-xl text-sm md:text-base drop-shadow-md">
            {data.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
