import React from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

export default function IconButton({ 
  icon: Icon, variant = 'primary', size = 'md', 
  loading = false, className, disabled, ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-cinematic shrink-0 min-w-[44px] min-h-[44px] focus-visible:ring-2 focus-visible:ring-crimson';
  
  const variants = {
    primary: 'bg-crimson text-text-bright hover:bg-crimson-bright hover:shadow-glow hover:-translate-y-1',
    secondary: 'bg-surface border border-surface hover:border-crimson text-text-bright hover:shadow-glow',
    ghost: 'bg-transparent text-text-muted hover:text-text-bright hover:bg-surface'
  };
  
  const sizes = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-4'
  };

  const isDisabled = disabled || loading;

  return (
    <button 
      className={clsx(
        baseClasses, variants[variant], sizes[size],
        isDisabled && 'opacity-60 cursor-not-allowed hover:transform-none hover:shadow-none',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : <Icon className="w-full h-full" />}
    </button>
  );
}
