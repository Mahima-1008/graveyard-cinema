import React from 'react';
import clsx from 'clsx';
import { Skull } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ 
  icon: Icon = Skull, 
  title = "The Graveyard is Empty...", 
  description = "There are no souls wandering here at the moment.", 
  actionLabel, 
  onAction,
  className 
}) {
  return (
    <div className={clsx("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 shadow-glow">
        <Icon className="w-10 h-10 text-crimson-bright opacity-80" />
      </div>
      <h3 className="font-display text-2xl text-text-bright mb-2">{title}</h3>
      <p className="font-body text-text-muted max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
