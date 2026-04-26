"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson } from "@/lib/api";
import CinematicCard from "./motion/MotionComponents";

export default function UniverseMap() {
  const [lorePoints, setLorePoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const loadLore = async () => {
      try {
        const response = await fetchJson("/api/lore");
        if (response.success) {
          setLorePoints(response.data);
        }
      } catch (err) {
        console.error("Lore fetch failed", err);
      }
    };
    loadLore();
  }, []);

  return (
    <div className="relative aspect-video w-full glass-card border-primary/20 bg-black/40 overflow-hidden group cursor-crosshair">
      {/* Background Grid & Compass */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* SVG Map Layer */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
        {/* Dynamic Map Lines (Connecting related points) */}
        <defs>
          <radialGradient id="pointGradient">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Lore Points */}
        {lorePoints.map((point) => (
          <g 
            key={point._id}
            onClick={() => setSelectedPoint(point)}
            onMouseEnter={() => setHoveredPoint(point)}
            onMouseLeave={() => setHoveredPoint(null)}
            className="cursor-pointer"
          >
            {/* Outer Glow */}
            <motion.circle
              cx={point.coordinates.x}
              cy={point.coordinates.y}
              r={15}
              fill="url(#pointGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: hoveredPoint?._id === point._id ? 2 : 1,
                opacity: hoveredPoint?._id === point._id ? 0.6 : 0.2 
              }}
            />
            {/* Inner Core */}
            <circle
              cx={point.coordinates.x}
              cy={point.coordinates.y}
              r={4}
              className="fill-primary"
            />
            {/* Label (only on hover or selected) */}
            {(hoveredPoint?._id === point._id || selectedPoint?._id === point._id) && (
              <motion.text
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -15 }}
                x={point.coordinates.x}
                y={point.coordinates.y}
                textAnchor="middle"
                className="fill-primary font-display text-[10px] uppercase tracking-widest pointer-events-none"
              >
                {point.name}
              </motion.text>
            )}
          </g>
        ))}
      </svg>

      {/* UI Overlays */}
      <div className="absolute top-8 left-8">
         <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-2">Multiverse Coordinates</h4>
         <p className="text-[9px] text-muted uppercase tracking-widest font-mono">Matrix ID: DMCU-SAG-04</p>
      </div>

      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-0 right-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-xl border-l border-primary/20 p-8 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedPoint(null)}
              className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
            >
              × CLOSE ARCHIVE
            </button>

            <div className="space-y-6 mt-8">
               <span className="text-[10px] uppercase tracking-widest text-primary font-bold px-2 py-1 border border-primary/20 rounded bg-primary/5">{selectedPoint.era}</span>
               <h3 className="font-display text-3xl uppercase tracking-widest leading-none">{selectedPoint.name}</h3>
               <p className="text-[11px] uppercase tracking-widest text-primary/60 font-black">{selectedPoint.type}</p>
               
               <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black">
                  <img src={selectedPoint.image || "/placeholder_location.jpg"} className="w-full h-full object-cover" alt="" />
               </div>

               <div className="space-y-4">
                  <h5 className="text-[9px] uppercase tracking-widest text-muted border-b border-white/10 pb-2">Archival Description</h5>
                  <p className="text-ash text-sm leading-relaxed">{selectedPoint.description}</p>
               </div>

               {selectedPoint.relatedCharacters?.length > 0 && (
                 <div className="space-y-4">
                    <h5 className="text-[9px] uppercase tracking-widest text-muted border-b border-white/10 pb-2">Sync Contacts</h5>
                    <div className="flex flex-wrap gap-2">
                       {selectedPoint.relatedCharacters.map(char => (
                         <span key={char._id} className="text-[9px] uppercase tracking-widest border border-primary/10 px-2 py-1 rounded bg-primary/5 text-primary/80">{char.name}</span>
                       ))}
                    </div>
                 </div>
               )}

               <div className="pt-8 space-y-4">
                  <h5 className="text-[9px] uppercase tracking-widest text-muted border-b border-white/10 pb-2">Significance</h5>
                  <p className="text-ash text-xs italic leading-relaxed">"{selectedPoint.significance}"</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedPoint && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
           <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 animate-pulse">Select Coordinates to Decrypt Lore</p>
        </div>
      )}
    </div>
  );
}
