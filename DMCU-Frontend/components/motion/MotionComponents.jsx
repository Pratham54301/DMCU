"use client";

import { motion } from "framer-motion";

export function SectionWrapper({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-24 overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function FloatingElement({ children, delay = 0, duration = 5 }) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`glass-card transition-all duration-300 hover:shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GlowButton({ children, className = "", onClick, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative gold-button px-8 py-3 overflow-hidden group ${className}`}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
      />
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </motion.button>
  );
}
