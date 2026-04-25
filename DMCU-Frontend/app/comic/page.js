"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SiteHeader from "@/components/SiteHeader";
import FooterSection from "@/sections/FooterSection";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { CinematicCard, SectionWrapper } from "@/components/motion/MotionComponents";
import { fetchJson } from "@/lib/api";

export default function ComicListingPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComics = async () => {
      try {
        const response = await fetchJson("/api/comics");
        if (response.success) {
          setComics(response.data);
        }
      } catch (err) {
        console.error("Failed to load comics", err);
      } finally {
        setLoading(false);
      }
    };
    loadComics();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-text">
      <CinematicBackdrop />
      <SiteHeader />

      <SectionWrapper id="comics" className="pt-32">
        <Container>
          <SectionHeading
            eyebrow="Comic Nexus"
            title="Illustrated Legends"
            description="Dive into the graphic chronicles of the Dharma Mythos. Experience the battles and prophecies in high-definition illustrated glory."
            align="center"
          />

          {loading ? (
            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card aspect-[3/4] animate-pulse bg-surface/50 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {comics.map((comic) => (
                <Link href={`/comic/${comic.slug}`} key={comic._id}>
                  <CinematicCard className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                      <img 
                        src={comic.coverImage} 
                        alt={comic.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{comic.category}</span>
                      <h3 className="mt-2 font-display text-xl uppercase tracking-widest group-hover:text-primary transition-colors">
                        {comic.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted line-clamp-2">
                        {comic.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/60">
                         <span>{comic.pages.length} Pages</span>
                         <span className="w-1 h-1 rounded-full bg-primary/20" />
                         <span>Read Now →</span>
                      </div>
                    </div>
                  </CinematicCard>
                </Link>
              ))}
              
              {comics.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted uppercase tracking-[0.4em] text-sm">The archive is currently being updated. Check back soon.</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </SectionWrapper>

      <FooterSection />
    </main>
  );
}
