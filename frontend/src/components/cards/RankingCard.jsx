/*
Expected data shape:
{
  id: string | number,
  rank: number,
  title: string,
  posterUrl: string,
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../common';
import clsx from 'clsx';

export default function RankingCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("h-48 w-40", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group relative flex items-center h-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-lg overflow-visible",
        className
      )}
    >
      <div className="absolute left-0 bottom-[-1rem] md:bottom-[-2rem] font-display font-bold text-[8rem] md:text-[10rem] leading-none text-background z-0" 
           style={{ WebkitTextStroke: '2px rgba(196, 30, 58, 0.8)', textShadow: '0 0 15px rgba(196,30,58,0.4)' }}>
        {data.rank}
      </div>
      <div className="relative z-10 aspect-[2/3] h-full ml-16 md:ml-24 rounded-lg overflow-hidden bg-surface transition-cinematic group-hover:scale-105 group-hover:shadow-glow">
        <img 
          src={data.posterUrl} 
          alt={data.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={clsx(
            "w-full h-full object-cover transition-cinematic duration-700",
            imageLoaded ? "opacity-100" : "opacity-0 blur-sm"
          )}
        />
      </div>
    </Link>
  );
}
