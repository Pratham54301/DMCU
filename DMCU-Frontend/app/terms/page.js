"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import CinematicBackdrop from "@/components/CinematicBackdrop";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-ash pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      
      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto glass-card p-12 md:p-20 border-primary/20 bg-black/60 backdrop-blur-3xl"
        >
          <header className="mb-16 text-center">
            <h1 className="font-display text-5xl uppercase tracking-[0.2em] text-primary mb-6">Terms of Synchronization</h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-muted font-black">Platform Usage & User Agreement</p>
          </header>

          <div className="space-y-12 text-sm leading-relaxed text-ash/80 font-medium">
            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">1. Acceptance of Protocol</h2>
              <p>By initializing a neural link (account) with the DMCU, you agree to abide by these terms. This is a binding agreement between you and the DMCU Multiverse Archives.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">2. Permitted Exploitation</h2>
              <p>Users are granted a limited, non-exclusive license to view comics, trailers, and lore for personal entertainment. Redistribution, reverse engineering, or unauthorized extraction of multiverse assets is strictly prohibited.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">3. Identity Termination</h2>
              <p>The DMCU administration reserves the right to suspend or terminate any neural link that violates community rankings, promotes toxicity, or attempts to disrupt system stability.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">4. Evolutionary Updates</h2>
              <p>Terms may be updated as the multiverse evolves. Continued usage after updates constitutes acceptance of the new protocol.</p>
            </section>
          </div>

          <footer className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-[9px] uppercase tracking-widest text-muted">Authorized by DMCU Council - 2026</p>
          </footer>
        </motion.div>
      </Container>
    </main>
  );
}
