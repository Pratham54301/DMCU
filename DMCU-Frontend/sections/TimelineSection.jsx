"use client";

import { motion } from "framer-motion";
import { SectionWrapper, CinematicCard, FloatingElement } from "@/components/motion/MotionComponents";

export const timelineData = [
  { year: 2026, phase: "Phase 1: The Hidden War Era", movies: ["The Hidden War"] },
  { year: 2027, phase: "", movies: ["Sankat Mochan Hanuman", "Gada Astra: The Rise of Aarav"] },
  { year: 2028, phase: "", movies: ["Aadi: The Beginning of All", "Tridev: The Sacred Trinity"] },
  { year: 2029, phase: "", movies: ["Reborn of the Eternal"] },
  { year: 2030, phase: "Phase 2: Power & Revelation", movies: ["Durga: The Slayer", "Rudra: The Storm"] },
  { year: 2031, phase: "", movies: ["Bhairava: The Protector", "Ganesha: The Remover"] },
  { year: 2032, phase: "", movies: ["Kartikeya: The Commander"] },
  { year: 2033, phase: "Phase 3: Rise of Adharma", movies: ["Rise of Adharma", "Ravana: The Untold King"] },
  { year: 2034, phase: "", movies: ["Kans: The Tyrant", "Mahishasura: The Demon War"] },
  { year: 2035, phase: "Phase 4: Final Era", movies: ["Kalki: The Final Dawn"] },
  { year: 2036, phase: "", movies: ["DMCU: War of Yugas"] },
];

function TimelineBackground() {
  return (
    <>
      {/* Mandala / Ancient Symbols abstraction via rotating circular dashed borders */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-primary/5 rounded-full -z-10 animate-[spin_120s_linear_infinite] pointer-events-none" />
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-primary/10 border-dashed rounded-full -z-10 animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[1px] border-primary/5 rounded-full -z-10 animate-[spin_150s_linear_infinite] pointer-events-none" />
      
      {/* Light rays for depth */}
      <div className="absolute left-0 right-0 top-1/2 h-[500px] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-[100px] -z-10 pointer-events-none" />
    </>
  );
}

export default function TimelineSection({ content }) {
  return (
    <SectionWrapper id="timeline" className="flex flex-col items-center">
      <TimelineBackground />
      
      <div className="text-center mb-24 px-4 z-10">
        <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-[0.2em] text-primary drop-shadow-[0_0_15px_rgba(var(--primary-color),0.5)]">
          {content?.title || "Cinematic Timeline"}
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-muted uppercase tracking-[0.4em]">
          {content?.subtitle || "The 10-Year Master Plan (2026 - 2036)"}
        </p>
      </div>

      <div className="relative flex flex-col gap-24 py-10 px-4 items-center w-full max-w-lg md:max-w-3xl z-10">
        {/* Vertical center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/60 to-transparent shadow-[0_0_20px_rgba(var(--primary-color),0.4)] z-0" />
        
        {timelineData.map((data, index) => (
          <MobileTimelineNode key={data.year} data={data} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function MobileTimelineNode({ data, index }) {
  return (
    <div className="relative z-10 flex flex-col items-center w-full">
      {data.phase && (
        <FloatingElement delay={index * 0.2}>
          <div className="mb-10 relative z-20">
              <div className="px-8 py-3 rounded-full mx-auto border border-primary/40 bg-surface/90 shadow-[0_0_30px_rgba(var(--primary-color),0.15)] backdrop-blur-xl">
                <span className="font-display text-sm uppercase tracking-[0.25em] text-primary">
                  {data.phase}
                </span>
              </div>
          </div>
        </FloatingElement>
      )}

      {/* Node Maker */}
      <div className="w-5 h-5 rounded-full bg-background border-[3px] border-primary shadow-[0_0_15px_rgba(var(--primary-color),0.8)] z-10 mb-6 relative">
          <div className="absolute inset-0 -z-10 rounded-full blur-md bg-primary/40 w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <h3 className="font-display text-3xl font-bold tracking-[0.1em] text-text/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-8">
        {data.year}
      </h3>

      <div className="flex flex-col gap-4 items-center">
        {data.movies.map((movie, i) => (
          <CinematicCard 
            key={movie} 
            className="w-64 md:w-72 border border-primary/20 bg-background/80 p-5 text-center"
          >
              <h4 className="font-display text-sm uppercase tracking-[0.14em] text-text drop-shadow-sm text-balance">
                {movie}
              </h4>
          </CinematicCard>
        ))}
      </div>
    </div>
  );
}
