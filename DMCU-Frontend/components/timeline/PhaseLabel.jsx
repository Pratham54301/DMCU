"use client";

import { motion } from "framer-motion";

export default function PhaseLabel({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative px-8 py-3 rounded-full border border-primary/40 bg-surface/80 backdrop-blur-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] select-none"
    >
      <span className="font-display text-sm uppercase tracking-[0.25em] text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
        {text}
      </span>
      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 -translate-x-full w-24 h-[1px] bg-gradient-to-l from-primary/60 to-transparent" />
      <div className="absolute top-1/2 right-0 translate-x-full w-24 h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />
    </motion.div>
  );
}
