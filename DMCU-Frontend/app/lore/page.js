"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { fetchJson } from "@/lib/api";

export default function LorePage() {
  const [loreSections, setLoreSections] = useState([]);

  useEffect(() => {
    const loadLore = async () => {
      try {
        const response = await fetchJson("/api/sections");
        if (response.success) {
          setLoreSections(response.data.filter(s => s.type === 'lore' || s.slug.includes('lore')));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadLore();
  }, []);

  return (
    <main className="min-h-screen bg-black text-ash pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      <Container className="relative z-10">
        <SectionHeading 
          eyebrow="Codex"
          title="Universe Lore"
          description="The complete decrypted archives of the Dharma Mythos."
        />

        <div className="mt-20 space-y-24">
           {loreSections.map((section, idx) => (
             <motion.div 
               key={section._id}
               initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="glass-card p-12 md:p-20 border-white/5 bg-black/40"
             >
                <div className="max-w-3xl mx-auto space-y-8">
                   <h2 className="text-3xl font-display uppercase tracking-widest text-primary">{section.name}</h2>
                   <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed text-ash">
                      <p>{section.content?.description}</p>
                      <p className="mt-6">{section.content?.supportingText}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </Container>
    </main>
  );
}
