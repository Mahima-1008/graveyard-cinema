import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PosterCard } from '@/components/cards';
import { Skeleton } from '@/components/common';
import moviesData from '@/data/movies.json';
import seriesData from '@/data/series.json';
import { Ghost } from 'lucide-react';

export default function Crypt() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching obscure titles
    setTimeout(() => {
      const all = [...moviesData, ...seriesData];
      // Shuffle and pick some "obscure" looking ones (random for now)
      const shuffled = all.sort(() => 0.5 - Math.random()).slice(0, 18);
      setItems(shuffled);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-24 pb-20">
      {/* Dust/Particle Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Deep shadow gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between border-b border-surface/30 pb-6">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-text-muted">
              <Ghost className="w-5 h-5" />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Hidden Archives</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-text-muted font-bold tracking-wider">
              The Crypt
            </h1>
            <p className="text-text-muted/60 mt-2 text-sm max-w-xl">
              Forgotten nightmares, banned releases, and obscure horror gems exhumed from the deepest vaults.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {items.map(item => (
              <div key={item.id} className="relative group">
                <PosterCard 
                  data={item} 
                  className="grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
