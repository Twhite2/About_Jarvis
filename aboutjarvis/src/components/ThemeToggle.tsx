import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <div className="toggle-track">
        <motion.div 
          className="toggle-thumb"
          initial={false}
          animate={{
            x: theme === 'dark' ? '28px' : '2px',
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
        
        <div className="toggle-icons">
          {/* Sun icon */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sun-icon"
            animate={{
              opacity: theme === 'light' ? 1 : 0.3,
              scale: theme === 'light' ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </motion.svg>
          
          {/* Moon icon */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="moon-icon"
            animate={{
              opacity: theme === 'dark' ? 1 : 0.3,
              scale: theme === 'dark' ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </motion.svg>
        </div>
        
        <div className="toggle-decoration">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span 
              key={i}
              className="circuit-line"
              style={{
                left: `${i * 12}px`,
                opacity: 0.3 + (i * 0.1),
                height: 2 + Math.random() * 5,
              }}
              animate={{
                opacity: [0.3 + (i * 0.1), 0.5 + (i * 0.1), 0.3 + (i * 0.1)],
                height: [
                  2 + Math.random() * 5,
                  5 + Math.random() * 7,
                  2 + Math.random() * 5
                ]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2 + i,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.button>
  );
}
