"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function CinematicBackdrop() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax for stars/particles
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    // Generate particles on client only
    const newParticles = [...Array(50)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 5
    }));
    setParticles(newParticles);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {/* Dynamic Mouse-Reactive Light */}
      <motion.div 
        animate={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute w-[80vw] h-[80vh] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[150px] rounded-full mix-blend-screen opacity-40"
      />

      {/* Layer 1: Moving Nebula */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,#1a1a2e_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#16213e_0%,transparent_50%)]" />
      </motion.div>

      {/* Layer 2: Interactive Particles */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 z-10"
      >
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: p.x, 
              y: p.y,
              opacity: p.opacity,
              scale: p.scale
            }}
            animate={{
              y: ["0%", "-10%", "0%"],
              opacity: [p.opacity, p.opacity + 0.2, p.opacity]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
          />
        ))}
      </motion.div>

      {/* Global Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] opacity-80" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
    </div>
  );
}
