"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// PRESETS DEFINITION
const presets = {
  fade: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  slide: { initial: { x: -100, opacity: 0 }, whileInView: { x: 0, opacity: 1 } },
  zoom: { initial: { scale: 0.8, opacity: 0 }, whileInView: { scale: 1, opacity: 1 } },
  float: { 
    initial: { y: 20, opacity: 0 }, 
    whileInView: { y: 0, opacity: 1 },
    animate: { y: [-10, 10, -10], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
  },
  antigravity: {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    animate: { 
      y: [-20, 20, -20], 
      rotate: [-1, 1, -1],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
    }
  },
  reveal: {
    initial: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    whileInView: { clipPath: "inset(0% 0 0 0)", opacity: 1 }
  }
};

const hoverEffects = {
  scale: { scale: 1.05 },
  lift: { y: -10, scale: 1.02 },
  glow: { boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.5)", scale: 1.02 },
  tilt: { rotateX: 5, rotateY: 5, scale: 1.05 },
  none: {}
};

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

/**
 * Universal Motion Wrapper
 * Applies dynamic animations based on backend settings
 */
export function DynamicMotionWrapper({ settings = {}, children, className = "" }) {
  const containerRef = useRef(null);
  
  const {
    preset = 'fade',
    duration = 0.8,
    delay = 0,
    stiffness = 100,
    damping = 10,
    hoverEffect = 'none',
    cursorReactive = false
  } = settings;

  const presetConfig = presets[preset] || presets.fade;
  const hoverConfig = hoverEffects[hoverEffect] || {};

  return (
    <motion.div
      id={settings.id}
      ref={containerRef}
      initial={presetConfig.initial}
      whileInView={presetConfig.whileInView}
      animate={presetConfig.animate}
      whileHover={hoverConfig}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: (stiffness !== 100 || damping !== 10) ? "spring" : "tween",
        stiffness,
        damping,
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionWrapper({ children, className = "", motionSettings, id }) {
  return (
    <DynamicMotionWrapper settings={{ ...motionSettings, id }} className={`relative py-24 overflow-hidden ${className}`}>
      {children}
    </DynamicMotionWrapper>
  );
}

export function CinematicCard({ children, className = "", hoverEffect = "lift" }) {
  return (
    <motion.div
      whileHover={hoverEffects[hoverEffect]}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`glass-card transition-all duration-300 ${className}`}
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
