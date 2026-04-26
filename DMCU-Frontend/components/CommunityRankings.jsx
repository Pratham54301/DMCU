"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson, apiRequest } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { CinematicCard } from "@/components/motion/MotionComponents";
import Container from "@/components/Container";

export default function CommunityRankings() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const loadRankings = async () => {
    try {
      const response = await fetchJson("/api/characters/ranking");
      if (response.success) {
        setRankings(response.data);
      }
    } catch (err) {
      console.error("Failed to load rankings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const handleVote = async (characterId, type) => {
    if (!user) {
      alert("Please initialize your identity to vote in the matrix.");
      return;
    }

    try {
      const token = localStorage.getItem("dmcu_user_token");
      const response = await apiRequest(`/api/characters/${characterId}/vote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type })
      });

      if (response.success) {
        loadRankings(); // Reload to show updated order
      }
    } catch (err) {
      console.error("Voting failed", err);
    }
  };

  if (loading) return <div className="py-20 text-center animate-pulse text-primary uppercase tracking-[0.4em]">Synchronizing Rankings...</div>;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {rankings.map((character, index) => (
            <motion.div
              key={character._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CinematicCard className="p-4 md:p-6 border-primary/10 bg-surface/30 backdrop-blur-md flex items-center gap-6 group">
                {/* Rank Number */}
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center font-display text-xl text-primary/60 bg-black/40">
                  {index + 1}
                </div>

                {/* Character Info */}
                <div className="flex-1 flex items-center gap-6">
                   <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/5 bg-black/40 flex-shrink-0">
                      <img src={character.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={character.name} />
                   </div>
                   <div>
                      <h3 className="font-display uppercase tracking-widest text-sm md:text-base">{character.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{character.title}</p>
                   </div>
                </div>

                {/* Voting Matrix */}
                <div className="flex items-center gap-4 md:gap-8">
                   <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-primary font-black">{character.rankPoints}</p>
                      <p className="text-[8px] uppercase tracking-widest text-muted">Influence</p>
                   </div>
                   
                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleVote(character._id, 'upvote')}
                        className="w-10 h-10 rounded border border-primary/20 bg-primary/5 flex items-center justify-center hover:bg-primary/20 transition-all active:scale-90"
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => handleVote(character._id, 'downvote')}
                        className="w-10 h-10 rounded border border-red-500/20 bg-red-500/5 flex items-center justify-center hover:bg-red-500/20 transition-all active:scale-90"
                      >
                        ▼
                      </button>
                   </div>
                </div>
              </CinematicCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center py-8">
         <p className="text-[9px] uppercase tracking-[0.5em] text-muted animate-pulse">Community Power is the Core of the Universe</p>
      </div>
    </div>
  );
}
