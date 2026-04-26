"use client";

import { motion } from "framer-motion";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function Error({ error, reset }) {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <CinematicBackdrop />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500 text-[10px] uppercase tracking-[0.5em] font-black border-l-2 border-red-500 pl-4 mb-8 inline-block">
            System Failure: Portal Disturbance
          </span>
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-widest text-text glow-text-red mb-6">
            Neural Mismatch
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 uppercase tracking-widest font-light">
            A cinematic anomaly has interrupted the stream. The multiverse data packet is corrupted or the link is unstable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <GlowButton onClick={() => reset()} className="px-12 h-14 bg-red-500/20 border-red-500/40 text-red-400">
                Attempt Re-Sync
             </GlowButton>
             <GlowButton onClick={() => window.location.href = '/'} className="px-12 h-14 border-white/10 bg-transparent text-white">
                Emergency Home
             </GlowButton>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .glow-text-red {
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </main>
  );
}
