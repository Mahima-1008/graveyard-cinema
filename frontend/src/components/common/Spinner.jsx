import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export default function Spinner({ className, size = 'md', ...props }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <Loader2 
      className={clsx('animate-spin text-crimson-bright', sizes[size] || sizes.md, className)} 
      {...props} 
    />
  );
}
