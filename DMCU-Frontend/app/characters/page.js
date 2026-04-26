"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CharacterCard from "@/components/CharacterCard";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { fetchJson } from "@/lib/api";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetchJson("/api/characters");
        if (response.success) setCharacters(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const filtered = characters.filter(c => filter === "all" || c.category === filter);

  return (
    <main className="min-h-screen bg-black text-parchment pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      <Container className="relative z-10">
        <SectionHeading 
          eyebrow="The Roster"
          title="Digital Legends"
          description="Explore every character in the DMCU. From the avatars of light to the shadows of the void."
        />

        {/* Filters */}
        <div className="mt-12 mb-16 flex flex-wrap gap-4 justify-center">
           {[
             { id: "all", label: "All Archives" },
             { id: "hero", label: "Heroes" },
             { id: "villain", label: "Villains" },
             { id: "myth_character", label: "Mythic" },
             { id: "vishnu_avatar", label: "Avatars" }
           ].map(f => (
             <button 
               key={f.id} 
               onClick={() => setFilter(f.id)}
               className={`px-8 py-3 rounded-xl border transition-all text-[10px] uppercase tracking-widest font-black ${filter === f.id ? 'bg-primary text-black border-primary' : 'border-white/10 text-muted hover:border-primary/40'}`}
             >
               {f.label}
             </button>
           ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => <div key={i} className="glass-card h-96 animate-pulse bg-white/5" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filtered.map((char, idx) => (
               <motion.div 
                 key={char._id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
               >
                  <CharacterCard character={char} />
               </motion.div>
             ))}
          </div>
        )}
      </Container>
    </main>
  );
}
