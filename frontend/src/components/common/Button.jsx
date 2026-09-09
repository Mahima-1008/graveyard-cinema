import React from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

export default function Button({ 
  children, variant = 'primary', size = 'md', 
  loading = false, icon: Icon, className, disabled, ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-display tracking-widest rounded transition-cinematic relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-crimson text-text-bright hover:bg-crimson-bright hover:shadow-glow hover:-translate-y-1',
    secondary: 'bg-transparent border border-crimson text-crimson-bright hover:bg-crimson hover:text-text-bright hover:shadow-glow',
    ghost: 'bg-transparent text-text-muted hover:text-text-bright hover:bg-surface'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
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
      {loading && <Spinner size="sm" className="mr-2" />}
      {!loading && Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className={clsx("relative z-10", loading && 'opacity-80')}>{children}</span>
    </button>
  );
}
