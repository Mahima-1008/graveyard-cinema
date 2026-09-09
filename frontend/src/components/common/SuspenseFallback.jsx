import React from 'react';

export default function SuspenseFallback() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="relative">
        <h1 className="font-display text-3xl md:text-5xl text-crimson-bright tracking-widest uppercase animate-pulse">
          Graveyard Cinema
        </h1>
        {/* Subtle glow behind the text */}
        <div className="absolute inset-0 blur-xl bg-crimson opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}
