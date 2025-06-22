import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  initialTheme?: 'dark' | 'light';
  onThemeChange?: (theme: 'dark' | 'light') => void;
}

export default function ThemeToggle({ 
  initialTheme = 'dark', 
  onThemeChange 
}: ThemeToggleProps) {
  // Use state with no initial value to prevent hydration mismatch
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  
  // Apply theme change
  const toggleTheme = () => {
    if (!mounted) return;
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
    
    // Set data-theme attribute on document for CSS switching
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Apply transition class to body for smooth transition
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
    
    // Save user preference with a try-catch to handle potential security issues
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Unable to access localStorage:', error);
    }
  };
  
  // Initialize theme from localStorage only after component is mounted
  useEffect(() => {
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (onThemeChange) {
          onThemeChange(savedTheme);
        }
      } else {
        // Check for system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        setTheme(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
        if (onThemeChange) {
          onThemeChange(systemTheme);
        }
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
      setTheme(initialTheme);
    }
  }, [onThemeChange, initialTheme]);
  
  // Don't render anything until after client-side hydration to prevent mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
          className="theme-icon-container"
        >
          {theme === 'dark' ? (
            // Dark Mode (Moon Icon)
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-icon moon-icon">
              <motion.path 
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                fill="var(--cyber-blue)" 
                stroke="var(--cyber-blue)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{ 
                  fill: ["var(--cyber-blue)", "#0af", "var(--cyber-blue)"],
                  filter: ["drop-shadow(0 0 3px var(--cyber-blue))", "drop-shadow(0 0 6px var(--cyber-blue))", "drop-shadow(0 0 3px var(--cyber-blue))"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </svg>
          ) : (
            // Light Mode (Sun Icon)
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-icon sun-icon">
              <motion.g
                animate={{ 
                  filter: ["drop-shadow(0 0 3px var(--cyber-pink))", "drop-shadow(0 0 6px var(--cyber-pink))", "drop-shadow(0 0 3px var(--cyber-pink))"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.circle 
                  cx="12" 
                  cy="12" 
                  r="5" 
                  fill="var(--cyber-pink)" 
                  animate={{ 
                    fill: ["var(--cyber-pink)", "#f50", "var(--cyber-pink)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.path 
                  d="M12 1V3M12 21V23M1 12H3M21 12H23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M18.36 5.64L19.78 4.22M4.22 19.78L5.64 18.36" 
                  stroke="var(--cyber-pink)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  animate={{ 
                    stroke: ["var(--cyber-pink)", "#f50", "var(--cyber-pink)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.g>
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Cyberpunk circuit decoration - subtle background effect */}
      <div className="theme-circuit-decoration">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="circuit-line"
            style={{ 
              left: `${(i * 8) - 10}px`,
              width: '2px',
              rotate: `${(i * 45) + 45}deg`,
              transformOrigin: 'center'
            }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              height: [`${6 + i * 3}px`, `${10 + i * 3}px`, `${6 + i * 3}px`]
            }}
            transition={{ 
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}
