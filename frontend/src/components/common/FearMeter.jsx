import React from 'react';
import clsx from 'clsx';

const DEFAULT_LABELS = {
  1: 'Mild',
  2: 'Creepy',
  3: 'Scary',
  4: 'Terrifying',
  5: 'Extreme'
};

const COLORS = {
  1: 'bg-surface-light border-surface-light',
  2: 'bg-warning/50 border-warning/50',
  3: 'bg-warning border-warning',
  4: 'bg-crimson border-crimson',
  5: 'bg-crimson-bright border-crimson-bright shadow-[0_0_8px_rgba(255,80,80,0.8)]'
};

export default function FearMeter({ value = 3, label, className, size = 'md' }) {
  const normalizedValue = Math.max(1, Math.min(5, Math.floor(value)));
  const displayLabel = label || `Scare Lvl: ${DEFAULT_LABELS[normalizedValue]}`;

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={clsx(
              "rounded-sm border transition-colors duration-300",
              size === 'sm' ? "w-2.5 h-1.5" : "w-4 h-2",
              i <= normalizedValue ? COLORS[normalizedValue] : "bg-transparent border-surface/50"
            )}
          />
        ))}
      </div>
      <span className={clsx(
        "font-bold uppercase tracking-widest text-text-muted",
        size === 'sm' ? "text-[8px]" : "text-[10px]"
      )}>
        {displayLabel}
      </span>
    </div>
  );
}
