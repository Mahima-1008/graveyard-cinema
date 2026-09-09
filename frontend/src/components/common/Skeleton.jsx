import React from 'react';
import clsx from 'clsx';

export default function Skeleton({ variant = 'rect', className, ...props }) {
  const variants = {
    rect: 'rounded',
    circle: 'rounded-full',
    text: 'rounded h-4 w-full'
  };

  return (
    <div 
      className={clsx(
        'bg-surface relative overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/20 to-transparent animate-[shimmer_2s_infinite]"></div>
    </div>
  );
}
