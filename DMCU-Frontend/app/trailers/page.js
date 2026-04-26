"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { fetchJson } from "@/lib/api";

export default function TrailersPage() {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const response = await fetchJson("/api/trailers");
        if (response.success) setTrailers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTrailers();
  }, []);

  return (
    <main className="min-h-screen bg-black text-text pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      <Container className="relative z-10">
        <SectionHeading 
          eyebrow="Cinematics"
          title="Multiverse Teasers"
          description="High-definition transmissions from the core of the DMCU sagas."
        />

        {loading ? (
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
             {[1,2].map(i => <div key={i} className="aspect-video bg-white/5 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
             {trailers.map((trailer) => (
               <motion.div 
                 key={trailer._id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="space-y-6 group"
               >
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-all shadow-2xl">
                     <iframe 
                       src={`https://www.youtube.com/embed/${trailer.youtubeId}`} 
                       className="w-full h-full"
                       title={trailer.title}
                       allowFullScreen
                     />
                  </div>
                  <div>
                     <span className="text-primary text-[10px] uppercase tracking-widest font-black">{trailer.tag}</span>
                     <h3 className="text-2xl font-display uppercase tracking-widest mt-2">{trailer.title}</h3>
                     <p className="text-muted text-sm mt-3">{trailer.description}</p>
                  </div>
               </motion.div>
             ))}
          </div>
        )}
      </Container>
    </main>
  );
}
