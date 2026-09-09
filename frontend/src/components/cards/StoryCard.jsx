/*
Expected data shape:
{
  id: string | number,
  title: string,
  author: string,
  coverUrl: string,
  readTime: string,
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Skeleton } from '../common';
import { BookOpen } from 'lucide-react';
import clsx from 'clsx';

export default function StoryCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return <Skeleton className={clsx("aspect-[3/4] w-full rounded-md", className)} />;
  }

  return (
    <Link 
      to={data.link || '#'}
      className={clsx(
        "group relative block aspect-[3/4] w-full rounded-md overflow-hidden bg-surface transition-cinematic hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson shadow-glow",
        className
      )}
    >
      <img 
        src={data.coverUrl} 
        alt={data.title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={clsx(
          "w-full h-full object-cover transition-cinematic duration-700 brightness-50 group-hover:brightness-40",
          imageLoaded ? "opacity-100" : "opacity-0 blur-sm"
        )}
      />
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center">
        <h3 className="font-display text-xl text-text-bright mb-2 font-bold drop-shadow-md border-y border-crimson/50 py-2 w-4/5">{data.title}</h3>
        <p className="font-body text-xs text-text-muted italic">By {data.author}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <Badge variant="default" className="bg-background/80 backdrop-blur flex items-center gap-1 border-transparent">
          <BookOpen className="w-3 h-3" /> {data.readTime}
        </Badge>
      </div>
    </Link>
  );
}
