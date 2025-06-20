import { useState, ReactNode, MouseEventHandler } from "react";
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

  // Generate positions for background shapes
  const shapes = [
    { id: 1, variant: "circle", size: "20px" },
    { id: 2, variant: "circle", size: "30px" },
    { id: 3, variant: "diamond", size: "25px" },
    { id: 4, variant: "circle", size: "15px" },
  ];

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
              transform: shape.variant === "diamond" ? "rotate(45deg)" : "none",
              opacity: 0.8
            }}
            initial={{
              x: (Math.random() - 0.5) * 60,
              y: (Math.random() - 0.5) * 60,
              scale: 0,
              rotate: shape.variant === "diamond" ? 45 : 0
            }}
            animate={isHover ? {
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              scale: 1,
              transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            } : {
              scale: 0
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
