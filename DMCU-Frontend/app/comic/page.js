"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { fetchJson, buildMediaUrl } from "@/lib/api";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function ComicMarketplacePage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadComics = async () => {
      try {
        const response = await fetchJson("/api/comics");
        if (response.success) setComics(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadComics();
  }, []);

  const categories = ["All", ...new Set(comics.map(c => c.category).filter(Boolean))];
  const filtered = filter === "All" ? comics : comics.filter(c => c.category === filter);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 relative overflow-hidden">
      <CinematicBackdrop />
      
      <Container className="relative z-10">
        <header className="mb-16">
           <SectionHeading 
             eyebrow="Marketplace"
             title="The Archive Library"
             description="Decrypt and explore the visual history of the DMCU multiverse. Premium graphic narratives synchronized in real-time."
           />
           
           {/* Navigation & Filters */}
           <div className="flex flex-wrap gap-4 mt-12 justify-center lg:justify-start">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-xl border transition-all text-[10px] uppercase tracking-widest font-black ${filter === cat ? 'bg-primary text-black border-primary' : 'border-white/10 text-muted hover:border-primary/40'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
             {[1,2,3,4].map(i => <div key={i} className="aspect-[2/3] bg-white/5 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
             <AnimatePresence mode="popLayout">
                {filtered.map((comic, idx) => (
                  <motion.div
                    key={comic._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative"
                  >
                     <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                        <img 
                          src={buildMediaUrl(comic.coverImage)} 
                          alt={comic.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                           <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <p className="text-[10px] uppercase tracking-widest text-primary font-black">{comic.category}</p>
                              <h3 className="text-xl font-display uppercase tracking-widest leading-tight">{comic.title}</h3>
                              <div className="flex gap-4">
                                 <Link href={`/comic/${comic.slug}`} className="flex-1">
                                    <GlowButton className="w-full py-3 text-[9px]">VIEW COMIC</GlowButton>
                                 </Link>
                                 <button className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                 </button>
                              </div>
                           </div>
                        </div>
                        
                        {/* Floating Metadata */}
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-black tracking-widest text-primary">
                           ISSUE #{comic.issueNumber || 1}
                        </div>
                     </div>
                     
                     {/* Bottom Info (Visible on small screens or always) */}
                     <div className="mt-6 space-y-2">
                        <h4 className="text-sm font-display uppercase tracking-widest truncate">{comic.title}</h4>
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-muted font-bold">
                           <span>{comic.author || "DMCU CORE"}</span>
                           <span>{comic.pages?.length || 0} PAGES</span>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-40 border border-dashed border-white/5 rounded-[3rem]">
             <p className="text-muted uppercase tracking-[0.5em] text-xs">No chronicles synchronized for this sector.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
