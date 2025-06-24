"use client";

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './hero-background.css';

interface HeroBackgroundProps {
  currentTheme: 'dark' | 'light';
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ currentTheme }) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use useState to ensure particles are only generated client-side
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);
  
  // Generate particles only on the client-side to avoid hydration errors
  useEffect(() => {
    // Use fewer particles if reduced motion is preferred
    const count = prefersReducedMotion ? 15 : 30;
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: prefersReducedMotion ? 30 : (Math.random() * 20 + 10)
    }));
    setParticles(newParticles);
  }, [prefersReducedMotion]);

  // Use state for grid lines to avoid hydration errors
  const [gridLines, setGridLines] = useState<{
    horizontal: Array<{ id: string; y: number }>;
    vertical: Array<{ id: string; x: number }>;
  }>({ horizontal: [], vertical: [] });
  
  // Generate grid lines only on client-side
  useEffect(() => {
    // Reduce grid line count for better performance
    const count = prefersReducedMotion ? 5 : 8;
    setGridLines({
      horizontal: Array.from({ length: count }, (_, i) => ({
        id: `h-${i}`,
        y: (i + 1) * (100 / (count + 1))
      })),
      vertical: Array.from({ length: count }, (_, i) => ({
        id: `v-${i}`,
        x: (i + 1) * (100 / (count + 1))
      }))
    });
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Skip effect if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    // Performance optimization with debouncing
    if (!e.currentTarget) return;
    
    // Get values from the event target instead of querying DOM
    const container = e.currentTarget as HTMLElement;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Use CSS variables to create perspective tilt effect
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      container.style.setProperty('--mouse-x', x.toString());
      container.style.setProperty('--mouse-y', y.toString());
    });
  };

  return (
    <div 
      className="hero-background" 
      onMouseMove={handleMouseMove}
      data-theme={currentTheme}
    >
      {/* Glowing gradient background */}
      <div className="gradient-bg"></div>
      
      {/* Grid lines */}
      <div className="grid-container">
        {gridLines.horizontal.map(line => (
          <div 
            key={line.id} 
            className="grid-line horizontal" 
            style={{top: `${line.y}%`}}
          ></div>
        ))}
        {gridLines.vertical.map(line => (
          <div 
            key={line.id} 
            className="grid-line vertical" 
            style={{left: `${line.x}%`}}
          ></div>
        ))}
      </div>
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 0
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x - (Math.random() * 10 - 5)}%`,
              `${particle.x}%`
            ],
            y: [
              `${particle.y}%`,
              `${particle.y - (Math.random() * 10 - 5)}%`,
              `${particle.y + (Math.random() * 10 - 5)}%`,
              `${particle.y}%`
            ],
            scale: [0, 1, 0.8, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}
      
      {/* Digital circuit lines */}
      <svg className="circuit-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M0,20 L30,20 L30,40 L70,40 L70,60 L30,60 L30,80 L100,80" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M0,40 L20,40 L20,70 L60,70 L60,20 L100,20" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default HeroBackground;
