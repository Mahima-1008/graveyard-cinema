/*
Expected data shape:
{
  id: string | number,
  title: string,
  thumbnailUrl: string,
  views: string,
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';
import { Skeleton } from '../common';
import clsx from 'clsx';

export default function ReelCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("aspect-[9/16] w-full rounded-xl", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group relative block aspect-[9/16] w-full rounded-xl overflow-hidden bg-surface transition-cinematic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson",
        className
      )}
    >
      <img 
        src={data.thumbnailUrl} 
        alt={data.title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={clsx(
          "w-full h-full object-cover transition-cinematic duration-700 brightness-90 group-hover:brightness-75 group-hover:scale-105",
          imageLoaded ? "opacity-100" : "opacity-0 blur-sm"
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110 border border-text-bright/20">
          <Play className="w-5 h-5 text-text-bright ml-1" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
        <div className="flex items-center text-text-bright text-xs font-bold gap-1">
          <Eye className="w-3 h-3" /> {data.views}
        </div>
      </div>
    </Link>
  );
}
