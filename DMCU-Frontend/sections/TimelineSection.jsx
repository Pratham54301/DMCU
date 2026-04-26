"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CinematicCard } from "@/components/motion/MotionComponents";
import Container from "@/components/Container";

export const timelineData = [
  { year: 2026, phase: "Phase 1: The Hidden War Era", movies: ["The Hidden War"] },
  { year: 2027, phase: "", movies: ["Sankat Mochan Hanuman", "Gada Astra: The Rise of Aarav"] },
  { year: 2028, phase: "", movies: ["Aadi: The Beginning of All", "Tridev: The Sacred Trinity"] },
  { year: 2029, phase: "", movies: ["Reborn of the Eternal"] },
  { year: 2030, phase: "Phase 2: Power & Revelation", movies: ["Durga: The Slayer", "Rudra: The Storm"] },
  { year: 2031, phase: "", movies: ["Bhairava: The Protector", "Ganesha: The Remover"] },
  { year: 2032, phase: "", movies: ["Kartikeya: The Commander"] },
  { year: 2033, phase: "Phase 3: Rise of Adharma", movies: ["Rise of Adharma", "Ravana: The Untold King"] },
  { year: 2034, phase: "", movies: ["Kans: The Tyrant", "Mahishasura: The Demon War"] },
  { year: 2035, phase: "Phase 4: Final Dawn", movies: ["Kalki: The Final Dawn"] },
  { year: 2036, phase: "", movies: ["DMCU: War of Yugas"] },
];

export default function TimelineSection({ content, id }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Speed Optimization: Set to 1.05 for near 1:1 speed, making it feel much faster and responsive
  const SPEED_FACTOR = 1.05; 

  useLayoutEffect(() => {
    const calculateDimensions = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const range = trackWidth - windowWidth;
        setScrollRange(range);
        setViewportHeight(windowHeight);
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    const timer = setTimeout(calculateDimensions, 500);
    const observer = new ResizeObserver(calculateDimensions);
    if (trackRef.current) observer.observe(trackRef.current);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Snappier physics for less delay/latency
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Increased from 50 for faster response
    damping: 30,    // Adjusted for snap without bounce
    mass: 0.5,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  
  // Adjusted Fades: Higher opacity and less blur for clearer visibility
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.5, 1, 1, 0.5]);
  const blur = useTransform(smoothProgress, [0, 0.05, 0.95, 1], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);

  return (
    <section 
      id={id || "timeline"} 
      ref={sectionRef} 
      className="relative bg-black"
      style={{ height: scrollRange ? `${(scrollRange * SPEED_FACTOR) + viewportHeight}px` : "400vh" }}
    >
      <motion.div 
        style={{ opacity, filter: blur }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden"
      >
        
        {/* Cinematic Backdrop Layer - Lowered Opacities for clarity */}
        <div className="absolute inset-0 z-0">
           {/* Thinned gradient - Higher transparency */}
           <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40 z-10" />
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-primary/2 blur-[100px] rounded-full pointer-events-none opacity-20" />
        </div>

        {/* Header Content - High Z-index */}
        <Container className="relative z-40 mb-12 px-4">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-7xl uppercase tracking-[0.2em] text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]">
              {content?.title || "Timeline"}
            </h2>
            <p className="mt-4 text-[10px] uppercase tracking-[0.6em] text-primary/50 font-bold">
              {content?.subtitle || "The Dharma Mythos Blueprint"}
            </p>
          </div>
        </Container>

        {/* Horizontal Scroll Track - High Z-index */}
        <div className="relative z-40">
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            // Increased gap to prevent overlap
            className="flex gap-32 md:gap-60 px-[20vw] items-center"
          >
            {timelineData.map((item) => (
              <div 
                key={item.year} 
                className="flex flex-col items-center flex-shrink-0 w-[320px] md:w-[500px] relative"
              >
                {/* Year Bubble */}
                <div className="relative mb-16 group">
                   <div className="text-8xl md:text-[10rem] font-display font-black text-white/[0.01] tracking-tighter transition-all duration-700">
                     {item.year}
                   </div>
                   
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl md:text-8xl font-display font-bold text-primary glow-text drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                        {item.year}
                      </span>
                      {item.phase && (
                        <div className="mt-4 px-5 py-1 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-black whitespace-nowrap">{item.phase}</span>
                        </div>
                      )}
                   </div>

                   {/* Node Marker */}
                   <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      <div className="w-4 h-4 rounded-full bg-black border border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] z-30" />
                   </div>
                </div>

                {/* Cards Container */}
                <div className="w-full space-y-4">
                  {item.movies.map((movie) => (
                    <CinematicCard key={movie} className="p-8 text-center border-primary/10 bg-surface/40 backdrop-blur-3xl hover:border-primary/40 transition-all duration-500 relative z-50">
                        <h4 className="font-display text-xs md:text-base uppercase tracking-[0.2em] text-text/90 leading-relaxed">
                          {movie}
                        </h4>
                    </CinematicCard>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex flex-col items-center justify-center flex-shrink-0 w-[40vw]">
               <h3 className="font-display text-3xl uppercase tracking-[0.4em] text-primary/10">Evolution</h3>
            </div>
          </motion.div>
        </div>

        {/* Global Progress Interface - Bottom Layered */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl z-40">
          <div className="flex justify-between items-end mb-4">
             <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-primary/40 font-black">Archive Tracking</span>
                <span className="text-[10px] font-display text-text/40 tracking-widest uppercase">Chronos Link</span>
             </div>
             <motion.div className="font-display text-lg text-primary/60">
                {useTransform(smoothProgress, [0, 1], ["0%", "100%"])}
             </motion.div>
          </div>
          <div className="h-[2px] w-full bg-white/[0.03] rounded-full overflow-hidden relative">
            <motion.div 
              style={{ scaleX: smoothProgress }} 
              className="h-full bg-primary/60 shadow-glow origin-left" 
            />
          </div>
        </div>

        {/* Side Fades - Lower Opacity */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/60 to-transparent z-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/60 to-transparent z-40 pointer-events-none" />
      </motion.div>
    </section>
  );
}
