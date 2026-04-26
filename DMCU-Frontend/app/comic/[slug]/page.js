"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { GlowButton } from "@/components/motion/MotionComponents";
import { buildMediaUrl, fetchJson } from "@/lib/api";

export default function ComicDetailPage({ params }) {
  const resolvedParams = use(params);
  const [comic, setComic] = useState(null);
  const [status, setStatus] = useState("loading");
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const loadComic = async () => {
      try {
        const payload = await fetchJson(`/api/comics/${resolvedParams.slug}`);
        if (payload.success) {
          setComic(payload.data);
          setStatus("success");
        }
      } catch (e) {
        setStatus("error");
      }
    };
    loadComic();
  }, [resolvedParams.slug]);

  if (status === "loading") return <div className="min-h-screen bg-black flex items-center justify-center text-primary animate-pulse uppercase tracking-[0.4em]">Deciphering Scroll Matrix...</div>;
  if (status === "error" || !comic) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 uppercase tracking-widest">Chronicle Lost in the Great Deletion.</div>;

  const pdfUrl = buildMediaUrl(comic.pdfFile);

  return (
    <main className="min-h-screen bg-black text-parchment pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      
      {/* Background Ambience - Streaming Style */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-primary/10 to-transparent opacity-30" />
         <img 
            src={buildMediaUrl(comic.coverImage)} 
            className="absolute top-0 right-0 w-full h-full object-cover opacity-10 blur-3xl scale-110" 
            alt=""
         />
      </div>

      <Container className="relative z-10">
        <Link href="/comic" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary/60 hover:text-primary mb-12 transition-all group">
           <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Return to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           {/* Left: Cover Art (Prime Video Style) */}
           <div className="lg:col-span-4 sticky top-32">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(var(--primary-color),0.15)] border border-white/5"
              >
                 <img src={buildMediaUrl(comic.coverImage)} alt={comic.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
              </motion.div>
              
              <div className="mt-8 flex gap-4">
                 <button 
                  onClick={() => setIsWatchlisted(!isWatchlisted)}
                  className={`flex-1 h-14 rounded-xl border flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-black transition-all ${isWatchlisted ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-muted hover:border-primary/40'}`}
                 >
                    <svg className="w-5 h-5" fill={isWatchlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
                 </button>
              </div>
           </div>

           {/* Right: Intel & Actions (Amazon Layout) */}
           <div className="lg:col-span-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                 <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded text-primary text-[10px] uppercase tracking-[0.4em] font-black">Premium Archive</span>
                    <span className="text-muted text-[10px] uppercase tracking-[0.3em] font-bold">Issue #{comic.issueNumber || 1}</span>
                 </div>
                 
                 <h1 className="font-display text-6xl lg:text-8xl uppercase tracking-widest text-text leading-tight">{comic.title}</h1>
                 
                 <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.4em] text-primary/60 font-bold border-y border-white/5 py-6">
                    <div className="flex flex-col gap-1">
                       <span className="text-muted text-[9px] opacity-50">Release Cycle</span>
                       <span>{new Date(comic.createdAt).getFullYear()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-muted text-[9px] opacity-50">Intel Length</span>
                       <span>{comic.pages?.length || 0} Pages</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-muted text-[9px] opacity-50">Category</span>
                       <span>{comic.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-muted text-[9px] opacity-50">Architect</span>
                       <span>{comic.author || "DMCU Core"}</span>
                    </div>
                 </div>
              </motion.div>

              <div className="prose prose-invert max-w-none">
                 <p className="text-ash text-xl leading-relaxed font-light first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                    {comic.description}
                 </p>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xs uppercase tracking-[0.4em] text-primary/40 font-black flex items-center gap-4">
                    Execution Protocols
                    <div className="h-px flex-1 bg-white/5" />
                 </h3>
                 
                 <div className="flex flex-wrap gap-4">
                    {comic.pdfFile ? (
                      <>
                        <a 
                          href={pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-[2]"
                        >
                           <GlowButton className="w-full h-16 text-xs tracking-[0.3em]">
                              INITIALIZE READING
                           </GlowButton>
                        </a>
                        <a 
                          href={pdfUrl} 
                          download={`${comic.title}.pdf`}
                          className="flex-1"
                        >
                           <GlowButton className="w-full h-16 bg-white/5 border-white/10 text-primary text-xs tracking-[0.3em] hover:bg-primary/10">
                              DOWNLOAD PDF
                           </GlowButton>
                        </a>
                      </>
                    ) : (
                      <div className="w-full p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs uppercase tracking-[0.5em] text-center font-bold">
                         Asset Synchronization Pending for this Chronicle.
                      </div>
                    )}
                 </div>
              </div>

              {/* Extras/Metadata Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                 <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-muted">Synchronized Tags</h4>
                    <div className="flex flex-wrap gap-2">
                       {["Mythology", "Sci-Fi", "Cinematic", "Graphic Narrative"].map(tag => (
                         <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-ash">{tag}</span>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-muted">Legal Clearance</h4>
                    <p className="text-[10px] text-muted/60 leading-relaxed uppercase tracking-widest">
                       All rights reserved by DMCU Archives. Decryption of this file is permitted for personal neural link consumption only.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </Container>
    </main>
  );
}
