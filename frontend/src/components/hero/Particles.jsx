import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function Particles({ count = 30 }) {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() * -1) - 0.2, // Always drift up
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Fire/ember look
        ctx.fillStyle = \`rgba(255, 80, 80, \${p.alpha})\`; 
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(196, 30, 58, 1)";
        ctx.fill();
        
        p.x += p.dx;
        p.y += p.dy;
        
        // Loop back to bottom
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 z-10"
      aria-hidden="true"
    />
  );
}
