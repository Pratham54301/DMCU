"use client";

import { motion } from "framer-motion";

export default function MovieCard({ title, description }) {
  return (
    <motion.div
      className="glass-card group relative w-48 shrink-0 overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-4 transition-all duration-300 hover:border-primary/60 hover:shadow-glow"
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="flex h-32 flex-col items-center justify-center text-center">
        <h4 className="font-display text-sm uppercase tracking-[0.14em] text-text text-balance drop-shadow-md">
          {title}
        </h4>
      </div>
      {/* Decorative dot */}
      <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary/40 shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-colors group-hover:bg-primary" />
      
      {/* Tooltip on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-surface/90 p-2 text-[10px] text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-md border-t border-primary/20">
        Epic DMCU installment expanding the divine universe.
      </div>
    </motion.div>
  );
}
