"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function RankingManagerView() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await apiRequest("/api/characters");
      if (res.success) {
        setCharacters(res.data.sort((a, b) => (b.votes || 0) - (a.votes || 0)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetVotes = async () => {
    if (!confirm("Wipe all character popularity data? This cannot be undone.")) return;
    // Implementation for reset would go here
  };

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Aggregating Community Consensus...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center">
         <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">System / Popularity Matrix</h3>
         <button onClick={handleResetVotes} className="text-[9px] uppercase tracking-widest text-red-500 border border-red-500/20 px-4 py-2 rounded hover:bg-red-500/10 transition-all">Reset All Votes</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {characters.slice(0, 10).map((char, index) => (
           <div key={char._id} className="glass-card p-6 border-white/5 bg-black/40 flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-8">
                 <div className="text-2xl font-display text-primary/40 group-hover:text-primary transition-colors">#{index + 1}</div>
                 <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                    <img src={char.image} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="text-sm font-display uppercase tracking-widest text-parchment">{char.name}</h4>
                    <p className="text-[9px] text-muted uppercase tracking-[0.2em] mt-1">{char.role} | {char.category}</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-12">
                 <div className="text-right">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Neural Syncs</p>
                    <p className="text-2xl font-display text-primary">{char.votes || 0}</p>
                 </div>
                 <div className="h-10 w-[2px] bg-white/10" />
                 <div className="text-right">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Power Level</p>
                    <p className="text-2xl font-display text-accent">{char.strength || 0}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
