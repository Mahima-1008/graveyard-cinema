import React from 'react';
import { AlertCircle } from 'lucide-react';
import EmptyState from './EmptyState';

export default function ErrorState({ 
  title = "A Curse Has Fallen", 
  description = "Something went terribly wrong while summoning the spirits.", 
  onRetry,
  className
}) {
  return (
    <EmptyState 
      icon={AlertCircle}
      title={title}
      description={description}
      actionLabel={onRetry ? "Attempt Resurrection (Retry)" : null}
      onAction={onRetry}
      className={className}
    />
  );
}
