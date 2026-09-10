import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function NightmareTransition({ isActive }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black overflow-hidden"
          >
            <h2 className="font-display font-bold text-6xl md:text-8xl text-text-bright tracking-widest">
              RANDOM NIGHTMARE
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Intense red flash */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: 1 }}
            transition={{ duration: 0.3, times: [0, 0.1, 1] }}
            className="absolute inset-0 bg-crimson mix-blend-overlay"
          />
          
          {/* Static noise overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2, 0.8, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }}
          />

          {/* Glitch text */}
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 0], filter: ['blur(10px)', 'blur(0px)', 'blur(5px)'] }}
            transition={{ duration: 0.4 }}
            className="font-display font-bold text-6xl md:text-8xl text-text-bright tracking-widest text-shadow-glow"
          >
            RANDOM NIGHTMARE
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
