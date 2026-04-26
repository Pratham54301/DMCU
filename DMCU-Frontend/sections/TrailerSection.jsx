"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SectionWrapper } from "@/components/motion/MotionComponents";

export default function TrailerSection({ content, id }) {
  const trailerUrl = "https://youtu.be/HdRhRODAF-Y?si=3Yg5gF8h0Ujzyd8Za";
  const displayUrl = content?.video ? `https://youtu.be/${content.video}` : trailerUrl;

  return (
    <SectionWrapper id={id || "trailer"}>
      <Container>
        <div className="text-center">
          <SectionHeading
            eyebrow="Teaser"
            title={content?.title || "Experience the scale"}
            description={content?.description || "Step into the vast expanse of the Dharma Mythos. The legends are awakening."}
            align="center"
          />
        </div>

        <div className="mt-16 relative group cursor-pointer">
          <a 
            href={displayUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              className="glass-card overflow-hidden p-3 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="relative aspect-video bg-surface-strong rounded-2xl overflow-hidden shadow-2xl">
                {/* Visual Thumbnail / Backdrop */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${content?.video || "HdRhRODAF-Y"}/hqdefault.jpg)` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
                </div>
                
                {/* Central Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <motion.div
                    className="w-24 h-24 bg-primary/20 backdrop-blur-md rounded-full border border-primary/40 flex items-center justify-center text-primary text-4xl shadow-glow group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="ml-2">▶</span>
                  </motion.div>
                  
                  <motion.span 
                    className="text-xs uppercase tracking-[0.5em] font-bold text-primary group-hover:text-white transition-colors duration-500"
                  >
                    {content?.buttonText || "Watch Official Trailer"}
                  </motion.span>
                </div>

                {/* Animated Borders / Glows */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>
              </div>
            </motion.div>
          </a>

          {/* Decorative floating elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-700"></div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
