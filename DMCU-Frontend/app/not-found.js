"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <CinematicBackdrop />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-black border-l-2 border-primary pl-4 mb-8 inline-block">
            Error 404: Void Detected
          </span>
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-widest text-text glow-text mb-6">
            Archive Lost
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 uppercase tracking-widest font-light">
            The neural link to this sector has been severed or does not exist in the current multiverse timeline.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link href="/">
                <GlowButton className="px-12 h-14">Return to Core</GlowButton>
             </Link>
             <Link href="/characters">
                <GlowButton className="px-12 h-14 border-primary/20 bg-transparent text-primary">Roster Archives</GlowButton>
             </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-primary blur-[2px] animate-pulse" />
         <div className="absolute top-1/2 right-1/4 w-px h-1/4 bg-primary blur-[2px] animate-pulse delay-700" />
      </div>
    </main>
  );
}
