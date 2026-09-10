import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

const LABELS = ['Mild', 'Creepy', 'Scary', 'Terrifying', 'Extreme'];

export default function FearMeter({ value = 1, label, size = 'md', className }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const normalizedValue = Math.max(1, Math.min(5, value));
  const activeLabel = label || LABELS[normalizedValue - 1];

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimatedValue(normalizedValue);
    } else {
      const timer = setTimeout(() => {
        setAnimatedValue(normalizedValue);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [normalizedValue, shouldReduceMotion]);

  // Generate 5 segments
  const segments = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <div className="flex items-end justify-between">
        <span className={clsx(
          "font-bold uppercase tracking-widest text-crimson drop-shadow-md",
          size === 'sm' ? "text-[8px]" : "text-[10px]"
        )}>
          {activeLabel}
        </span>
      </div>
      
      <div className={clsx("flex gap-0.5", size === 'sm' ? "h-1" : "h-1.5")}>
        {segments.map((segment) => (
          <div 
            key={segment}
            className={clsx(
              "flex-1 bg-surface transition-all overflow-hidden",
              size === 'sm' ? "rounded-sm" : "rounded"
            )}
          >
            <div 
              className={clsx(
                "h-full w-full origin-left bg-gradient-to-r from-crimson/80 to-crimson-bright",
                shouldReduceMotion ? "transition-none" : "transition-transform duration-700 ease-out"
              )}
              style={{
                transform: segment <= animatedValue ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: shouldReduceMotion ? '0ms' : `${segment * 100}ms`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
