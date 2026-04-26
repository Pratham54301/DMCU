"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchJson, buildMediaUrl } from "@/lib/api";

import Container from "@/components/Container";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function RankingsPage() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      try {
        const payload = await fetchJson("/api/characters/ranking", { signal: controller.signal });
        const chars = Array.isArray(payload.data) ? payload.data : [];
        
        // Calculate power rating and sort
        const ranked = chars.map(char => {
           const stats = char.stats || { strength: 0, intelligence: 0, energy: 0, combat: 0 };
           const totalPower = (stats.strength || 0) + (stats.intelligence || 0) + (stats.energy || 0) + (stats.combat || 0);
           return { ...char, totalPower };
        }).sort((a, b) => b.totalPower - a.totalPower);

        setCharacters(ranked);
        setStatus("success");
      } catch (e) {
        if (e.name === "AbortError") return;
        setStatus("error");
      }
    };
    loadData();
    return () => controller.abort();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-text">
       <CinematicBackdrop />

       <div className="relative z-10 pt-32 pb-24">
          <Container>
             <Reveal>
                 <SectionHeading
                    eyebrow="Global Power Database"
                    title="Universal Rankings"
                    description="The supreme leaderboard cataloging the absolute power scales across the Dharma Mythos Cinematic Universe based on cumulative combat metrics."
                 />
             </Reveal>

             {status === "loading" && (
                 <div className="mt-16 flex justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent flex items-center justify-center rounded-full animate-spin" />
                 </div>
             )}

             {status === "success" && (
                 <div className="mt-16 max-w-4xl mx-auto space-y-4">
                    {/* Podium for top 3 */}
                    <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16 h-auto md:h-96">
                       {/* 2nd Place */}
                       {characters[1] && (
                          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="order-2 md:order-1 flex-1 flex flex-col items-center">
                             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#C0C0C0] mb-4">
                                <img src={buildMediaUrl(characters[1].image)} alt={characters[1].name} className="w-full h-full object-cover" />
                             </div>
                             <div className="bg-gradient-to-t from-[#C0C0C0]/20 to-transparent w-full pt-8 pb-4 text-center rounded-t-xl border-t border-[#C0C0C0]/50">
                                <span className="text-3xl font-display text-[#C0C0C0] block">#2</span>
                                <span className="font-bold tracking-widest text-sm uppercase text-text">{characters[1].name}</span>
                                <span className="text-xs text-muted block">PWR: {characters[1].totalPower}</span>
                             </div>
                          </motion.div>
                       )}

                       {/* 1st Place */}
                       {characters[0] && (
                          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="order-1 md:order-2 flex-1 md:flex-[1.2] flex flex-col items-center z-10">
                             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(255,215,0,0.4)] mb-4">
                                <img src={buildMediaUrl(characters[0].image)} alt={characters[0].name} className="w-full h-full object-cover" />
                             </div>
                             <div className="bg-gradient-to-t from-primary/30 to-primary/5 w-full pt-16 pb-6 text-center rounded-t-2xl border-t-2 border-primary shadow-glow">
                                <span className="text-5xl font-display text-primary block drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">#1</span>
                                <span className="font-bold tracking-widest text-base uppercase text-white mt-2 block">{characters[0].name}</span>
                                <span className="text-sm text-primary block mt-1 tracking-widest">PWR: {characters[0].totalPower}</span>
                             </div>
                          </motion.div>
                       )}

                       {/* 3rd Place */}
                       {characters[2] && (
                          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="order-3 md:order-3 flex-1 flex flex-col items-center">
                             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#CD7F32] mb-4">
                                <img src={buildMediaUrl(characters[2].image)} alt={characters[2].name} className="w-full h-full object-cover" />
                             </div>
                             <div className="bg-gradient-to-t from-[#CD7F32]/20 to-transparent w-full pt-6 pb-4 text-center rounded-t-xl border-t border-[#CD7F32]/50">
                                <span className="text-2xl font-display text-[#CD7F32] block">#3</span>
                                <span className="font-bold tracking-widest text-sm uppercase text-text">{characters[2].name}</span>
                                <span className="text-xs text-muted block">PWR: {characters[2].totalPower}</span>
                             </div>
                          </motion.div>
                       )}
                    </div>

                    {/* Rest of the leaderboard */}
                    <div className="glass-card rounded-[2.5rem] p-6 lg:p-10 divide-y divide-primary/10">
                       {characters.slice(3).map((char, index) => (
                          <Reveal key={char._id} delay={index * 0.05}>
                             <Link href={`/character/${char._id}`} className="flex items-center gap-6 py-6 group hover:bg-white/5 transition-colors duration-300 rounded-xl px-4">
                                <div className="text-3xl font-display text-primary/50 w-12 text-center group-hover:text-primary transition-colors">
                                   {index + 4}
                                </div>
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/20">
                                   {char.image ? <img src={buildMediaUrl(char.image)} alt={char.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-surface" />}
                                </div>
                                <div className="flex-1">
                                   <div className="flex items-center gap-3">
                                      <h3 className="font-display text-xl uppercase tracking-widest text-text group-hover:text-primary transition-colors">{char.name}</h3>
                                      <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">{char.category?.replace(/_/g, ' ')}</span>
                                   </div>
                                   <p className="text-sm text-muted uppercase tracking-[0.2em] mt-1">{char.title}</p>
                                </div>
                                <div className="text-right">
                                   <p className="text-xs uppercase tracking-widest text-primary/60 mb-1">Total Power</p>
                                   <p className="text-2xl font-bold font-display text-primary">{char.totalPower}</p>
                                </div>
                             </Link>
                          </Reveal>
                       ))}
                    </div>
                 </div>
             )}
          </Container>
       </div>
    </main>
  );
}
