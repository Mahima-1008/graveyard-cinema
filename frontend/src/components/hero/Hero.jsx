import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Plus, Pause, PlayCircle } from 'lucide-react';
import clsx from 'clsx';
import { useFeaturedContent } from '@/hooks/useMovies';
import { Button, IconButton, Badge } from '../common';
import Particles from './Particles';
import Fog from './Fog';

// Preload helper
const preloadImage = (src) => {
  if (!src) return;
  const img = new Image();
  img.src = src;
};

export default function Hero() {
  const { data: slides, isLoading } = useFeaturedContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const timerRef = useRef(null);

  // Preload next image
  useEffect(() => {
    if (slides && slides.length > 0) {
      const nextIndex = (currentIndex + 1) % slides.length;
      preloadImage(slides[nextIndex].backdropUrl);
    }
  }, [currentIndex, slides]);

  // Auto-advance
  useEffect(() => {
    if (isPlaying && !isHovering && slides && slides.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 7000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isHovering, slides]);

  if (isLoading || !slides || slides.length === 0) {
    return (
      <div className="relative w-full h-[100svh] bg-surface flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background/50 animate-pulse"></div>
      </div>
    );
  }

  const slide = slides[currentIndex];
  
  // Stagger variants for title
  const titleContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const titleWord = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else if (swipe > 50) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div 
      className="relative w-full h-[100svh] bg-background overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {/* Backdrop Image with Zoom */}
          <motion.img
            src={slide.backdropUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
            transition={{ duration: 20, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Layers */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,11,0.6)_100%)] pointer-events-none"></div>
      
      {!shouldReduceMotion && <Fog />}
      {!shouldReduceMotion && (
        <div className="hidden md:block">
          <Particles count={25} />
        </div>
      )}
      {!shouldReduceMotion && (
        <div className="block md:hidden">
          <Particles count={10} />
        </div>
      )}

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 container mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 md:pb-32 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
              transition={{ duration: 0.5 }}
            >
              {slide.isOriginal && (
                <div className="mb-4">
                  <Badge variant="crimson" className="text-[10px] md:text-xs">
                    GRAVEYARD ORIGINAL
                  </Badge>
                </div>
              )}
              
              {/* Staggered Title */}
              <motion.h1 
                variants={titleContainer}
                initial="hidden"
                animate="show"
                className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-text-bright drop-shadow-glow leading-none mb-4 tracking-wider uppercase flex flex-wrap"
              >
                {slide.title.split(' ').map((word, i) => (
                  <motion.span key={i} variants={titleWord} className="mr-4 md:mr-6 mb-2">
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 font-body text-xs md:text-sm text-text-muted mb-6 drop-shadow-md">
                {slide.ageRating && (
                  <span className="border border-text-muted/50 px-1.5 py-0.5 rounded text-text-bright font-bold">
                    {slide.ageRating}
                  </span>
                )}
                <span>{slide.year}</span>
                <span>{slide.runtime}</span>
                {slide.scareLevel && (
                  <div className="flex items-center text-crimson-bright font-bold border-l border-surface/50 pl-3 md:pl-4">
                    <span className="mr-1">Scare Level {slide.scareLevel}</span>
                  </div>
                )}
              </div>

              {/* Synopsis */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-body text-sm md:text-base text-text-muted line-clamp-2 md:line-clamp-3 mb-8 drop-shadow-md max-w-2xl"
              >
                {slide.synopsis}
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <Button icon={Play} size="lg" className="shadow-[0_0_20px_rgba(196,30,58,0.4)]">
                  Watch Now
                </Button>
                <Button variant="secondary" icon={Plus} size="lg" className="bg-background/50 backdrop-blur">
                  Watchlist
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 right-6 lg:right-12 z-20 flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-1.5 rounded-full overflow-hidden bg-surface transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
              style={{ width: idx === currentIndex ? '32px' : '16px' }}
            >
              {idx === currentIndex && (
                <motion.div 
                  className="h-full bg-crimson"
                  initial={{ width: isPlaying ? "0%" : "100%" }}
                  animate={{ width: isPlaying ? "100%" : "100%" }}
                  transition={{ duration: isPlaying ? 7 : 0, ease: "linear" }}
                  key={`progress-${idx}-${isPlaying}`}
                />
              )}
            </button>
          ))}
        </div>
        
        <IconButton 
          icon={isPlaying ? Pause : PlayCircle} 
          variant="ghost" 
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          className="text-text-muted hover:text-text-bright"
        />
      </div>
    </div>
  );
}
