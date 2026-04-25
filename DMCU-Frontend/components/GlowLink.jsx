"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GlowLink({ href, children, variant = "primary", className = "" }) {
  const baseClass = variant === "primary" ? "gold-button" : "ghost-button";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-block ${className}`}
    >
      <Link href={href} className={`${baseClass} relative overflow-hidden group`}>
        {variant === "primary" && (
           <motion.div
             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
           />
        )}
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </Link>
    </motion.div>
  );
}
