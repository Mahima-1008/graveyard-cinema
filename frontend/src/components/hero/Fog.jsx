import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Fog() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-[0.08] md:opacity-[0.12] z-0 hidden md:block">
      <motion.div
        animate={{ x: ["-10%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute top-[30%] left-0 w-[200%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] blur-[100px]"
      />
      <motion.div
        animate={{ x: ["-50%", "-10%"] }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        className="absolute top-[50%] left-[-50%] w-[200%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(200,200,200,0.3)_0%,transparent_60%)] blur-[80px]"
      />
    </div>
  );
}
