"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import SiteHeader from "@/components/SiteHeader";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { fetchJson } from "@/lib/api";

export default function ComicReaderPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComic = async () => {
      try {
        const response = await fetchJson(`/api/comics/${params.slug}`);
        if (response.success) {
          setComic(response.data);
        }
      } catch (err) {
        console.error("Failed to load comic", err);
      } finally {
        setLoading(false);
      }
    };
    loadComic();
  }, [params.slug]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary animate-pulse uppercase tracking-[0.5em]">Syncing Archives...</div>;
  if (!comic) return <div className="min-h-screen bg-background flex items-center justify-center text-red-500 uppercase tracking-[0.5em]">Comic Not Found</div>;

  return (
    <main className="relative min-h-screen bg-black text-text overflow-hidden">
      <CinematicBackdrop />
      <SiteHeader />

      <div className="pt-20 h-screen flex flex-col">
        {/* Header Bar */}
        <div className="bg-surface/80 backdrop-blur-xl border-b border-primary/20 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <Link href="/comic" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 transition-all">
              ←
            </Link>
            <div>
              <span className="text-[8px] uppercase tracking-[0.4em] text-primary block">{comic.category}</span>
              <h1 className="font-display text-lg uppercase tracking-widest text-text truncate max-w-[200px] sm:max-w-md">{comic.title}</h1>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
             <span className="text-[10px] uppercase tracking-widest text-muted italic">Fullscreen PDF Reader Enabled</span>
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div className="flex-1 relative bg-neutral-900 overflow-hidden">
           <iframe 
             src={`${comic.pdfFile}#toolbar=0&navpanes=0&scrollbar=0`}
             className="w-full h-full border-none"
             title={comic.title}
           />
           
           {/* Fallback for when PDF might be blocked or not rendering in iframe */}
           <div className="absolute inset-0 -z-10 flex items-center justify-center flex-col gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] uppercase tracking-widest text-muted">Decoding Sacred Scroll...</p>
           </div>
        </div>
      </div>
    </main>
  );
}
