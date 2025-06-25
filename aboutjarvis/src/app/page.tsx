"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBackground from "../components/HeroBackground";
import { TypeAnimation } from "react-type-animation";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import AnimatedButton from "../components/AnimatedButton";
import ThemeToggle from "../components/ThemeToggle";
import MobileNav from '../components/MobileNav';
import ProjectCard from '@/components/ProjectCard';
import '@/components/project-card.css';

// 3D Model components for projects
const PyramidModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} rotation={[0, Math.PI / 4, 0]} scale={[1.5, 1.5, 1.5]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} wireframe />
    </mesh>
  );
};

const CubeModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.2;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f56565" wireframe />
    </mesh>
  );
};

const SphereModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#805ad5" wireframe />
    </mesh>
  );
};

const TorusModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} scale={1.1}>
      <torusGeometry args={[0.7, 0.3, 16, 32]} />
      <meshStandardMaterial color="#38a169" wireframe />
    </mesh>
  );
};

// Utility functions for animations

// Chinese character animation related config
const chineseChars = [
  "弗兰克", // Frank
  "奥皮戈", // Opigo
  "伊曼纽尔" // Emmanuel
];

// Chinese symbols for projects
const projectSymbols = {
  payment: "支付", // Payment
  interface: "界面", // Interface
  recognition: "识别", // Recognition
  crypto: "加密", // Crypto
  ai: "人工智能", // AI
  web: "网络" // Web
};

const finalName = "Frank-Opigo A. Emmanuel";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({x: -100, y: -100});
  const [cursorVariant, setCursorVariant] = useState("default");
  const [nameState, setNameState] = useState("chinese");
  const [nameText, setNameText] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  
  // Handle theme change
  const handleThemeChange = (theme: 'dark' | 'light') => {
    setCurrentTheme(theme);
    
    // Apply transition class to body
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
  };
  
  // Chinese character animation effect with cyberpunk styling
  useEffect(() => {
    if (nameState === "chinese") {
      setNameText(chineseChars.join(" "));
      const timer = setTimeout(() => {
        setNameState("transition");
      }, 2000);  // Show Chinese characters for 2 seconds
      return () => clearTimeout(timer);
    } 
    else if (nameState === "transition") {
      // Gradually transition characters
      let currentIndex = 0;
      const finalNameChars = finalName.split("");
      const mixedName = chineseChars.join(" ").split("");
      
      const interval = setInterval(() => {
        if (currentIndex >= finalNameChars.length) {
          clearInterval(interval);
          setNameState("english");
          setNameText(finalName);
          return;
        }
        
        // Replace one character at a time
        mixedName[currentIndex] = finalNameChars[currentIndex];
        setNameText(mixedName.join(""));
        currentIndex++;
      }, 100); // Change one character every 100ms
      
      return () => clearInterval(interval);
    }
  }, [nameState]);
  
  // Handle scroll to update active section with improved accuracy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Better offset for earlier highlighting
      
      // Get all sections
      const sections = [
        document.getElementById('hero'),
        document.getElementById('projects'), 
        document.getElementById('about'),
        document.getElementById('contact')
      ];
      
      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    // Initial call to set the correct active section on page load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Optimize cursor animation with debounced/throttled updates
  useEffect(() => {
    let lastUpdate = 0;
    const updateThreshold = 10; // ms between updates (throttling)
    
    const mouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate < updateThreshold) return;
      
      lastUpdate = now;
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      background: "var(--accent)",
      mixBlendMode: "difference"
    }
  };
  
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle initialTheme={currentTheme} onThemeChange={handleThemeChange} />
      
      {/* Mobile Navigation */}
      <MobileNav activeSection={activeSection} setCursorVariant={setCursorVariant} />
      
      <motion.div 
        className="cursor-follower"
        variants={variants}
        animate={cursorVariant}
        initial={false}
        transition={{ 
          type: "tween", 
          ease: "linear", 
          duration: 0,
          x: { duration: 0, delay: 0 },
          y: { duration: 0, delay: 0 }
        }}
      />
      
      {/* Vertical Navbar - Desktop Only */}
      <nav className="vertical-nav">
        <ul className="flex flex-col h-full justify-center space-y-16">
          <li>
            <a 
              href="#hero" 
              className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <main className="main-content px-6 sm:px-12 md:px-20 py-20">
        {/* Hero Section with Chinese Character Animation */}
        <section id="hero" className="min-h-[60vh] flex flex-col justify-center relative">
          <HeroBackground currentTheme={currentTheme} />
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl mb-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="cyber-name">
              {nameText || chineseChars.join(" ")}
            </span>
          </motion.h1>
          <div className="text-xl sm:text-2xl md:text-3xl mb-10">
            <span 
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              I'm a <TypeAnimation
                sequence={[
                  'Software Developer',
                  2000,
                  'Frontend Developer',
                  2000,
                  'Desktop Developer',
                  2000,
                  'Smart Contract Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-primary typing-animation"
                repeat={Infinity}
              />
            </span>
          </div>
          
          <div className="flex gap-6 items-center flex-col sm:flex-row mt-8">
            <AnimatedButton
              href="#projects"
              primaryColor="var(--cyber-blue)"
              secondaryColor="var(--cyber-pink)"
            >
              View Projects
            </AnimatedButton>
            <AnimatedButton
              href="#contact"
              primaryColor="var(--cyber-pink)"
              secondaryColor="var(--cyber-blue)"
            >
              Contact Me
            </AnimatedButton>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl mb-16 cyber-heading">Featured Projects</h2>
          
          {/* Project 1 - Global Payment Solution */}
          <ProjectCard
            number={1}
            title="A Global Payment Solution"
            description="Joined a team of engineers in building a cryptocurrency payment platform. Implemented secure wallet integration, multi-currency support, and real-time transaction monitoring with low latency across global markets."
            projectLink="https://github.com/Twhite2"
            imageSrc="/images/retailchain.jpg"
            deviceType="laptop"
            chineseSymbol={projectSymbols.payment}
            setCursorVariant={setCursorVariant}
          />
          
          {/* Project 2 - 3D Interface */}
          <ProjectCard
            number={2}
            title="Interactive 3D Interface"
            description="An interactive 3D interface built with Trame and VTK using Python, allowing users to import, visualize and explore complex geometries or simulation data directly in the browser with intuitive controls."
            projectLink="https://github.com/Twhite2"
            imageSrc="/images/3dinterface.png"
            deviceType="laptop"
            chineseSymbol={projectSymbols.interface}
            setCursorVariant={setCursorVariant}
          />
          

          
          {/* Project 4 - Blockchain Token */}
          <ProjectCard
            number={4}
            title="Blockchain Token Development"
            description="Created and deployed an ERC-20 compliant token on Ethereum with smart contracts written in Solidity. The project includes built-in mechanisms for voting, staking, and deflationary tokenomics."
            projectLink="https://github.com/Twhite2"
            imageSrc="/images/projects/project1.svg"
            deviceType="laptop"
            chineseSymbol={projectSymbols.crypto}
            setCursorVariant={setCursorVariant}
          />
          
          {/* Project 5 */}
          <ProjectCard
            number={5}
            title="MERN Chat Application"
            description="A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) with messaging functionality. Features include user authentication, group chats, and message encryption."
            projectLink="https://github.com/Twhite2"
            imageSrc="/images/mernchat.png"
            deviceType="laptop"
            chineseSymbol={projectSymbols.web}
            setCursorVariant={setCursorVariant}
          />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20 relative overflow-hidden bg-black text-white">
          <div className="absolute top-10 right-10 opacity-10 text-8xl font-bold z-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              className="relative"
              transition={{ duration: 0.5 }}
            >
              <span className="block text-gray-500">关于</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl mt-2 font-normal text-gray-500"
            >
              ABOUT ME
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 max-w-6xl mx-auto px-4">
            <div className="about-content">
              <motion.h2 
                className="text-3xl sm:text-5xl font-bold mb-6 flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[var(--cyber-pink)]">//</span> <span>
                  <span className="text-[var(--cyber-pink)]">{nameState === "chinese" ? "你" : "你"}</span>
                  {nameState === "chinese" ? "" : "HI THERE"}
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                I&apos;m Samuel Tuinperi, I live in Lagos - Nigeria where
                I currently work as a React Developer at 
                <a href="#" className="text-[var(--cyber-blue)] hover:text-[var(--cyber-pink)] transition-colors">EverFinance</a>.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                My projects include React-js and Next-js with a growing knowledge in Vue-js and
                Nuxt-js. Being comfortable with code allows me to rapidly prototype and validate experiences. If
                you&apos;re interested in the tools and software I use, check out my <a href="#" className="text-[var(--cyber-blue)] hover:text-[var(--cyber-pink)] transition-colors">uses page</a>.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                In my spare time I like to read book summaries on 
                <a href="#" className="text-[var(--cyber-blue)] hover:text-[var(--cyber-pink)] transition-colors">Blinkist</a>, watch Sci-Fi and time traveling TV Shows.
                I&apos;m always down for hearing about new projects, so feel free to drop me a line.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center text-[var(--cyber-blue)] hover:text-[var(--cyber-pink)] transition-colors">
                  <motion.span 
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mr-2 inline-block"
                  >
                    ▶
                  </motion.span>
                  <a href="#contact">Send me a message</a>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h3 className="font-bold text-xl mb-4 text-[var(--cyber-blue)]">
                  <span className="cyber-glitch-1">Skills</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">JavaScript/TypeScript</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">React, Next.js</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">Vue.js, Nuxt.js</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">Python, Flask</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">C++</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">SQL (MySQL/MongoDB)</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">PHP</div>
                  <div className="bg-[var(--subtle-bg)] px-3 py-2 rounded-md text-sm border border-[var(--cyber-blue)] hover:border-[var(--cyber-pink)] transition-colors">Rust</div>
                </div>
              </motion.div>
            </div>
            
            <div className="flex items-center justify-center relative">
              <div className="about-image-container">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100,
                    duration: 0.8,
                    delay: 0.2
                  }}
                  className="about-image"
                >
                  <Image
                    src="/images/jarvis.jpeg"
                    alt="Samuel Tuinperi"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className="about-corner-top-right"></div>
                  <div className="about-corner-bottom-left"></div>
                </motion.div>
                <div className="absolute right-0 bottom-0 z-20 opacity-10 text-9xl text-gray-500" style={{ writingMode: 'vertical-rl' }}>
                  关于
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-lg mb-6">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-col space-y-4">
                <a 
                  href="mailto:emmanuelopigo2@gmail.com" 
                  className="flex items-center text-lg hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  emmanuelopigo2@gmail.com
                </a>
                <a 
                  href="https://github.com/Twhite2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-lg hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub (Twhite2)
                </a>
                <a 
                  href="tel:+2347050322778" 
                  className="flex items-center text-lg hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +2347050322778
                </a>
                <div 
                  className="flex items-center text-lg"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Lagos, Nigeria
                </div>
              </div>
            </div>
            <div className="bg-[var(--subtle-bg)] rounded-lg p-6">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-colors w-full"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[var(--subtle-bg)] py-10">
        <div className="container mx-auto px-6 sm:px-12 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-xl">Frank-Opigo (Jarvis)</h3>
              <p className="text-[var(--secondary)] mt-2">Software Developer</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/Twhite2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="tel:+2347050322778" 
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a 
                href="mailto:emmanuelopigo2@gmail.com"
                className="hover:text-primary transition-colors"
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--secondary)]">
            <p>&copy; {new Date().getFullYear()} Frank-Opigo A. Emmanuel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
