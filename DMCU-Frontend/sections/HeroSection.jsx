"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";
import GlowLink from "@/components/GlowLink";
import { useTheme } from "@/app/theme-context";
import { FloatingElement } from "@/components/motion/MotionComponents";

export default function HeroSection({ content }) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  
  // Parallax Mouse Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform mouse movement into parallax offsets
  const parallaxX = useTransform(springX, [-500, 500], [-30, 30]);
  const parallaxY = useTransform(springY, [-500, 500], [-30, 30]);
  const bgShiftX = useTransform(springX, [-500, 500], [-15, 15]);
  const bgShiftY = useTransform(springY, [-500, 500], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
    >
      {/* LAYER 1: Parallax Accents */}
      <motion.div 
        style={{ x: bgShiftX, y: bgShiftY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </motion.div>

      {/* LAYER 2: Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
                opacity: Math.random() * 0.5, 
                x: Math.random() * 2000 - 1000, 
                y: Math.random() * 2000 - 1000 
            }}
            animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-color),0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* LAYER 3: Floating Shapes */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
         <motion.div
            animate={{ 
                rotate: 360,
                y: [-20, 20, -20]
            }}
            transition={{ 
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[20%] right-[15%] w-64 h-64 border border-primary/10 rounded-full flex items-center justify-center"
         >
            <div className="w-full h-full border border-dashed border-primary/5 rounded-full animate-spin-slow" />
         </motion.div>
      </motion.div>

      {/* LAYER 4: Text Content */}
      <Container className="relative z-30 text-center">
        <FloatingElement>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl md:text-9xl lg:text-[12rem] uppercase tracking-[0.25em] text-text glow-text leading-none"
          >
            {content?.title || "DMCU"}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-primary/80 mt-8 mb-12 uppercase tracking-[0.5em] font-medium max-w-3xl mx-auto"
          >
            {content?.subtitle || "A New Era of Dharma Begins"}
          </motion.p>

          <GlowLink href="/#characters">
            Explore Universe
          </GlowLink>
        </FloatingElement>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
         <span className="text-[10px] uppercase tracking-[0.4em] text-primary/40 font-bold">Scroll Down</span>
         <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
         />
      </motion.div>
    </section>
  );
}
