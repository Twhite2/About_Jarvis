"use client";

import { useState, ReactNode, MouseEventHandler, useMemo } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Main animated button component
export default function AnimatedButton({
  children,
  onClick,
  href,
  className = "",
  primaryColor = "#61dafb",
  secondaryColor = "#f2056f",
  onMouseEnter,
  onMouseLeave
}: AnimatedButtonProps) {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);

  const transition = {
    type: "spring" as const,
    stiffness: 500,
    damping: 30
  };

  const handleMouseEnter = () => {
    setIsHover(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (onMouseLeave) onMouseLeave();
  };

  // Generate stable positions for background shapes using useMemo
  const shapes = useMemo(() => [
    { 
      id: 1, 
      variant: "circle", 
      size: "20px",
      initialX: -15,
      initialY: -20,
      hoverX: -25,
      hoverY: -30
    },
    { 
      id: 2, 
      variant: "circle", 
      size: "30px",
      initialX: 20,
      initialY: -15,
      hoverX: 30,
      hoverY: -25
    },
    { 
      id: 3, 
      variant: "diamond", 
      size: "25px",
      initialX: -10,
      initialY: 25,
      hoverX: -20,
      hoverY: 35
    },
    { 
      id: 4, 
      variant: "circle", 
      size: "15px",
      initialX: 15,
      initialY: 15,
      hoverX: 25,
      hoverY: 25
    },
  ], []);

  const buttonContent = (
    <motion.button
      ref={ref}
      className={`cyber-button ${className}`}
      initial={false}
      animate={isHover ? "hover" : "rest"}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onClick={onClick}
      transition={transition}
    >
      <motion.div
        className="shapes"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 }
        }}
      >
        {shapes.map((shape, index) => (
          <motion.div
            key={shape.id}
            className={`shape ${shape.variant}`}
            style={{
              width: shape.size,
              height: shape.size,
              background: index % 2 === 0 ? primaryColor : secondaryColor,
              position: "absolute",
              borderRadius: shape.variant === "circle" ? "50%" : "0",
              opacity: 0.8
            }}
            initial={{
              x: shape.initialX,
              y: shape.initialY,
              scale: 0,
              rotate: shape.variant === "diamond" ? 45 : 0
            }}
            animate={isHover ? {
              x: shape.hoverX,
              y: shape.hoverY,
              scale: 1,
              rotate: shape.variant === "diamond" ? 45 : 0,
              transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {
              x: shape.initialX,
              y: shape.initialY,
              scale: 0,
              rotate: shape.variant === "diamond" ? 45 : 0
            }}
          />
        ))}
        
        <div 
          className="pink blush" 
          style={{ background: secondaryColor }}
        />
        <div 
          className="blue blush" 
          style={{ background: primaryColor }}
        />
      </motion.div>
      <motion.div
        className="label"
        variants={{ 
          hover: { scale: 0.97 },
          rest: { scale: 1 }
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );

  return href ? (
    <a href={href} className="animated-button-wrapper">
      {buttonContent}
    </a>
  ) : (
    <div className="animated-button-wrapper">
      {buttonContent}
    </div>
  );
}
