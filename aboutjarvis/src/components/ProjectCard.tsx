"use client";

import React from 'react';
import { motion, Variants, easeOut, easeInOut } from 'framer-motion';
import Image from 'next/image';
import './project-card.css';

interface ProjectCardProps {
  number: number;
  title: string;
  description: string;
  projectLink: string;
  imageSrc: string;
  deviceType?: 'laptop' | 'phone' | 'tablet'; // Type of device mockup
  chineseSymbol: string;
  setCursorVariant: (variant: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  number,
  title,
  description,
  projectLink,
  imageSrc,
  deviceType = 'laptop',
  chineseSymbol,
  setCursorVariant
}) => {
  // Animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  // Chinese symbol animation variants
  const symbolVariants: Variants = {
    animate: {
      opacity: [0.1, 0.2, 0.1],
      scale: [0.95, 1.05, 0.95],
      rotate: [-2, 2, -2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  // Format project number with leading zero
  const formattedNumber = number < 10 ? `0${number}` : `${number}`;
  
  return (
    <motion.div 
      className="project-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      <div className="project-content">
        <motion.div className="project-number" variants={childVariants}>
          {formattedNumber}
        </motion.div>
        
        <motion.h3 className="project-title" variants={childVariants}>
          {title}
        </motion.h3>
        
        <motion.p className="project-description" variants={childVariants}>
          {description}
        </motion.p>
        
        <motion.a 
          href={projectLink}
          className="view-project-btn"
          variants={childVariants}
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <span>
            View project 
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 8L4 15L4 1L12 8Z" 
                fill="currentColor" 
              />
            </svg>
          </span>
        </motion.a>
      </div>
      
      <div className="project-image">
        <motion.div
          className="chinese-symbol"
          animate="animate"
          variants={symbolVariants}
          style={{
            fontSize: '100px',
            bottom: '10px',
            right: '10px'
          }}
        >
          {chineseSymbol}
        </motion.div>
        
        <motion.div 
          className={`device-mockup ${deviceType}`}
          whileHover={{ 
            y: -10,
            rotate: deviceType === 'laptop' ? [-2, 2, 0] : [0, 5, -5, 0],
            transition: { duration: 0.3 }
          }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
        >
          <div className="project-screenshot-container">
            {/* Add error handling for images */}
            <Image 
              src={imageSrc} 
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={number === 1} // Only prioritize the first project image
              loading={number === 1 ? undefined : "lazy"} // Conditionally add lazy loading
              style={{ objectFit: 'cover' }}
              className="project-screenshot"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const imgElement = e.currentTarget as HTMLImageElement;
                imgElement.src = '/projects/placeholder.svg';
              }}
            />
          </div>
          <div className="device-frame" />
          <div className="device-reflection" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
