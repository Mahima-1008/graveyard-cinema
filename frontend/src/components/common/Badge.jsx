import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-surface border-border text-text-muted',
    crimson: 'bg-crimson/20 border-crimson/50 text-crimson-bright',
    success: 'bg-success/20 border-success/50 text-success',
    warning: 'bg-warning/20 border-warning/50 text-warning',
    new: 'bg-text-bright border-text-bright text-background'
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
