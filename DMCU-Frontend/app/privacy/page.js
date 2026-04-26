"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import CinematicBackdrop from "@/components/CinematicBackdrop";

export default function PrivacyPage() {
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
            <h1 className="font-display text-5xl uppercase tracking-[0.2em] text-primary mb-6">Privacy Protocol</h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-muted font-black">Secure Data Transmission & Storage Policy</p>
          </header>

          <div className="space-y-12 text-sm leading-relaxed text-ash/80 font-medium">
            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">1. Neural Data Collection</h2>
              <p>The DMCU platform collects minimal data necessary for multiverse synchronization. This includes your email identity, display name, and engagement metrics within the digital saga. We do not track external biological data or unauthorized neural links.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">2. Cryptographic Security</h2>
              <p>All user passwords and transmission ciphers are encrypted using advanced industry-standard hashing protocols. Your data is stored in a secured MongoDB nexus with restricted administrative access.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">3. Third-Party Synchronization</h2>
              <p>We do not sell your data to external megacorporations. Limited data may be shared with essential infrastructure providers (like Cloudinary for media storage or Vercel for hosting) to ensure system stability.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-parchment border-l-2 border-primary pl-6">4. Cookie Modules</h2>
              <p>Our system uses essential cookies to maintain your login session and language preferences. You can disable these via your browser interface, though it may disrupt your neural link to the platform.</p>
            </section>
          </div>

          <footer className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-[9px] uppercase tracking-widest text-muted">Last Calibration: April 2026</p>
          </footer>
        </motion.div>
      </Container>
    </main>
  );
}
