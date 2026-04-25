"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";

export default function FooterSection() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-surface-strong border-t border-primary/20 pt-16 pb-8 overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="font-display text-4xl uppercase tracking-[0.2em] text-primary hover:text-secondary transition-colors inline-block glow-text">
               DMCU
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Witness the ascension of the Dharma Mythos Cinematic Universe. A cutting-edge nexus where ancient history, deep mythology, and futuristic technology converge into an ultimate cinematic experience.
            </p>
          </div>

          <div>
             <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Navigation</h4>
             <ul className="space-y-4">
                <li><Link href="/" className="text-sm text-text hover:text-primary transition-colors">Home Base</Link></li>
                <li><Link href="/rankings" className="text-sm text-text hover:text-primary transition-colors">Global Rankings</Link></li>
                <li><Link href="/blog" className="text-sm text-text hover:text-primary transition-colors">Lore & Sagas</Link></li>
                <li><Link href="/#timeline" className="text-sm text-text hover:text-primary transition-colors">Universe Timeline</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Connect</h4>
             <ul className="space-y-4">
                <li><a href="#" className="text-sm text-text hover:text-primary transition-colors">YouTube Network</a></li>
                <li><a href="#" className="text-sm text-text hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-text hover:text-primary transition-colors">X / Twitter</a></li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Dharma Mythos Cinematic Universe. All rights reserved.
          </p>

          <div className="text-xs uppercase tracking-[0.28em] text-primary/75 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            Vedteix Technology
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}
