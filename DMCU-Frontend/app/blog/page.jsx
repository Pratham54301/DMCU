"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import FooterSection from "@/sections/FooterSection";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { buildMediaUrl, fetchJson } from "@/lib/api";

function BlogCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden p-6">
      <div className="h-48 animate-pulse rounded-2xl bg-surface/50" />
      <div className="mt-6 h-6 w-3/4 animate-pulse rounded-full bg-surface/50" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-surface/50" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-surface/50" />
      </div>
      <div className="mt-6 h-10 w-32 animate-pulse rounded-full bg-surface/50" />
    </div>
  );
}

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadBlogs = async () => {
      try {
        setStatus("loading");
        const payload = await fetchJson("/api/blog", { signal: controller.signal });
        setBlogs(payload.data || []);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        setErrorMessage(error.message || "Failed to load the lore archives.");
        setStatus("error");
      }
    };
    loadBlogs();
    return () => controller.abort();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-text">
      <CinematicBackdrop />
      <SiteHeader />

      <div className="relative z-10 pt-32 pb-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Chronicles"
              title="Lore & Mythology"
              description="Delve into the deepest secrets, origins, and epic sagas of the DMCU. Read the sacred texts and discover what shapes the universe."
            />
          </Reveal>

          {status === "loading" && (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => <BlogCardSkeleton key={n} />)}
            </div>
          )}

          {status === "error" && (
            <div className="mt-16 glass-card p-10 text-center">
               <p className="text-xl uppercase tracking-widest text-primary">Archive Corrupted</p>
               <p className="mt-4 text-muted">{errorMessage}</p>
            </div>
          )}

          {status === "success" && blogs.length === 0 && (
             <div className="mt-16 glass-card p-10 text-center">
               <p className="text-xl uppercase tracking-widest text-primary">The Archives are Empty</p>
               <p className="mt-4 text-muted">No lore entries have been deciphered yet.</p>
             </div>
          )}

          {status === "success" && blogs.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {blogs.map((blog, idx) => {
                  const imageUrl = buildMediaUrl(blog.image);
                  return (
                     <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                     >
                        <Link href={`/blog/${blog.slug}`} className="group block h-full">
                           <div className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-glow">
                              {imageUrl ? (
                                 <div className="relative h-48 overflow-hidden rounded-t-[1.5rem]">
                                    <img src={imageUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                 </div>
                              ) : (
                                 <div className="h-48 bg-surface/30 rounded-t-[1.5rem]" />
                              )}
                              <div className="p-6 flex-1 flex flex-col">
                                 <div className="flex justify-between items-center text-xs uppercase tracking-widest text-primary/70 mb-4">
                                     <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                 </div>
                                 <h3 className="text-xl font-display uppercase tracking-wider text-text mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                                 <p className="text-muted text-sm leading-relaxed mb-6 flex-1">{blog.excerpt}</p>
                                 <div className="text-primary text-sm uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                                     Read Saga <span className="group-hover:translate-x-1 transition-transform">→</span>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </motion.div>
                  )
               })}
            </div>
          )}
        </Container>
      </div>

      <FooterSection />
    </main>
  );
}
