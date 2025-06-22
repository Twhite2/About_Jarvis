import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/mobile-nav.css';

interface MobileNavProps {
  activeSection: string;
  setCursorVariant: (variant: string) => void;
}

export default function MobileNav({ activeSection, setCursorVariant }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.09,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Hamburger Button with Cyberpunk Design */}
      <motion.button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="hamburger-container">
          <div className={`hamburger-lines ${isOpen ? 'active' : ''}`}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div className="circuit-decoration">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="circuit-line"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: isOpen ? ['8px', '12px', '8px'] : ['5px', '8px', '5px']
                }}
                transition={{
                  duration: 1.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ top: `${(i * 10) + 3}px`, right: '-8px' }}
              />
            ))}
          </div>
        </div>
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="mobile-nav-backdrop" onClick={closeMenu} />
            <motion.div className="mobile-nav-content">
              <div className="mobile-nav-links">
                <motion.a
                  href="#hero"
                  className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                  variants={itemVariants}
                  onClick={closeMenu}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="nav-text">Home</span>
                  <div className="nav-line"></div>
                </motion.a>
                <motion.a
                  href="#projects"
                  className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  variants={itemVariants}
                  onClick={closeMenu}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="nav-text">Projects</span>
                  <div className="nav-line"></div>
                </motion.a>
                <motion.a
                  href="#about"
                  className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  variants={itemVariants}
                  onClick={closeMenu}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="nav-text">About</span>
                  <div className="nav-line"></div>
                </motion.a>
                <motion.a
                  href="#contact"
                  className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  variants={itemVariants}
                  onClick={closeMenu}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <span className="nav-text">Contact</span>
                  <div className="nav-line"></div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
