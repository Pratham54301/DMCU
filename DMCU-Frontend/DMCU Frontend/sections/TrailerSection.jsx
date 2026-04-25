"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const trailerId = "aqz-KE-bpKQ";

export default function TrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="trailer" className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionHeading
            eyebrow="Trailer"
            title="Let the world feel the scale"
            description="This section is ready for your official teaser. Replace the placeholder YouTube ID in `sections/TrailerSection.jsx` whenever your real DMCU trailer is ready."
            align="center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 relative"
        >
          <div className="glass-card overflow-hidden p-2">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center text-background text-2xl hover:bg-primary transition-all duration-300 shadow-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶
                  </motion.button>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
                </div>
              ) : (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0`}
                  title="DMCU Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {/* Dark cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
