/*
Expected data shape:
{
  id: string | number,
  name: string,
  avatarUrl: string,
  followers: string,
  isFollowing: boolean,
  link: string
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Skeleton } from '../common';
import clsx from 'clsx';

export default function CreatorCard({ data, isLoading, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className={clsx("flex flex-col items-center gap-3 p-4", className)}>
        <Skeleton variant="circle" className="w-24 h-24 shrink-0" />
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-16 h-3" />
        <Skeleton variant="rect" className="w-24 h-8 mt-2 rounded-full" />
      </div>
    );
  }

  return (
    <div className={clsx("flex flex-col items-center gap-2 p-4", className)}>
      <Link 
        to={data.link || '#'}
        className="group relative block w-24 h-24 rounded-full overflow-hidden bg-surface ring-2 ring-transparent hover:ring-crimson transition-cinematic focus-visible:outline-none focus-visible:ring-crimson"
      >
        <img 
          src={data.avatarUrl} 
          alt={data.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={clsx(
            "w-full h-full object-cover transition-cinematic duration-700",
            imageLoaded ? "opacity-100" : "opacity-0 blur-sm"
          )}
        />
      </Link>
      <Link to={data.link || '#'} className="font-display font-bold text-text-bright hover:text-crimson transition-colors focus-visible:outline-none mt-2">
        {data.name}
      </Link>
      <p className="text-xs text-text-muted font-body mb-2">{data.followers} followers</p>
      <Button 
        variant={data.isFollowing ? 'secondary' : 'primary'} 
        size="sm" 
        className="rounded-full w-full max-w-[120px]"
      >
        {data.isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
}
