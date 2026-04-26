"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-hidden">
        <main className="relative min-h-screen flex items-center justify-center p-4">
           {/* Static backdrop since layout might be broken */}
           <div className="fixed inset-0 bg-black" />
           <div className="fixed inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)]" />

           <div className="relative z-10 text-center max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary text-[10px] uppercase tracking-[0.6em] font-black border-l-2 border-primary pl-4 mb-8 inline-block">
                  Critical System Failure
                </span>
                <h1 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-text mb-6">
                  Nexus Override
                </h1>
                <p className="text-muted text-sm md:text-base mb-12 uppercase tracking-[0.3em] font-light leading-loose">
                  The core rendering engine encountered a terminal anomaly. The portal connection must be manually re-established.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                   <GlowButton onClick={() => reset()} className="px-12 h-14">
                      RESET CORE
                   </GlowButton>
                   <GlowButton onClick={() => window.location.href = '/'} className="px-12 h-14 border-primary/20 bg-transparent text-primary">
                      EMERGENCY ESCAPE
                   </GlowButton>
                </div>
              </motion.div>
           </div>
        </main>
      </body>
    </html>
  );
}
