"use client";

import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import PhaseLabel from "./PhaseLabel";

export default function TimelineNode({ data, index }) {
  // Alternate top and bottom based on index
  const isTop = index % 2 === 0;

  return (
    <div className="relative flex flex-col items-center justify-center w-72 shrink-0 min-h-[600px] snap-center">
      {/* Center Line visual connector */}
      <div className="absolute w-full h-[2px] bg-gradient-to-r from-primary/30 via-primary/80 to-primary/30 shadow-[0_0_15px_rgba(255,215,0,0.6)] z-0" />
      
      {/* Node Marker */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div 
          className="w-5 h-5 rounded-full bg-background border-[3px] border-primary shadow-[0_0_15px_rgba(255,215,0,0.8)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,1)] hover:scale-125 cursor-pointer"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        />
        {/* Glow behind node */}
        <div className="absolute inset-0 -z-10 rounded-full blur-xl bg-primary/40 w-16 h-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Year Label */}
      <motion.div 
        className={`absolute z-10 left-1/2 -translate-x-1/2 font-display text-4xl font-bold tracking-[0.1em] text-text/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] ${
          isTop ? "top-1/2 mt-8" : "bottom-1/2 mb-8"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {data.year}
      </motion.div>

      {/* Movies List */}
      <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col gap-6 ${isTop ? "bottom-1/2 mb-16" : "top-1/2 mt-16"}`}>
        {data.movies.map((movie, i) => (
          <motion.div 
            key={movie}
            initial={{ opacity: 0, y: isTop ? 30 : -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <MovieCard title={movie} />
          </motion.div>
        ))}
      </div>

      {/* Phase Label (positioned higher up consistently) */}
      {data.phase && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <PhaseLabel text={data.phase} />
        </div>
      )}
    </div>
  );
}
