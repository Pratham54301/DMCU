"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import { buildMediaUrl, fetchJson } from "@/lib/api";

export default function BlogDetailPage({ params }) {
  const unwrappedParams = use(params);
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const payload = await fetchJson(`/api/blog/${unwrappedParams.slug}`);
        setBlog(payload.data);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };
    loadBlog();
  }, [unwrappedParams.slug]);

  if (status === "loading") {
    return (
      <main className="relative min-h-screen bg-background">
         <div className="flex h-screen items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
         </div>
      </main>
    );
  }

  if (status === "error" || !blog) {
    return (
      <main className="relative min-h-screen bg-background">
         <div className="flex h-screen items-center justify-center text-center">
             <div>
                <h1 className="text-4xl font-display text-primary tracking-widest uppercase">Archive Not Found</h1>
                <Link href="/blog" className="mt-8 inline-block ghost-button">Return to Archives</Link>
             </div>
         </div>
      </main>
    );
  }

  const imageUrl = buildMediaUrl(blog.image);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
       <CinematicBackdrop />

       <article className="relative z-10 pt-32 pb-24">
          <Container>
             <Reveal>
                <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors uppercase tracking-widest text-xs mb-10">
                   &larr; Back to Lore
                </Link>
             </Reveal>

             <Reveal delay={0.1}>
                 <header className="mb-16 text-center">
                    <div className="mb-6 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-primary/70">
                       <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                       <span>•</span>
                       <span>By {blog.author}</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-text drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] max-w-4xl mx-auto leading-tight">
                       {blog.title}
                    </h1>
                 </header>
             </Reveal>

             {imageUrl && (
                 <Reveal delay={0.2}>
                    <div className="relative w-full h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden mb-16 border border-primary/20 shadow-glow">
                       <img src={imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                 </Reveal>
             )}

             <Reveal delay={0.3}>
                 <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted prose-headings:font-display prose-headings:text-primary prose-headings:uppercase prose-headings:tracking-widest prose-a:text-primary hover:prose-a:text-white transition-colors">
                     {/* For a true production app you would use a markdown parser here like 'react-markdown', but we'll use a pre-formatted structure or generic HTML injection for now pending user's choice */}
                     <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
                 </div>
             </Reveal>

             {blog.tags?.length > 0 && (
                 <Reveal delay={0.4}>
                     <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-primary/20">
                         <h3 className="text-xs uppercase tracking-widest text-primary/70 mb-4">Classified Tags</h3>
                         <div className="flex flex-wrap gap-3">
                             {blog.tags.map(tag => (
                                 <span key={tag} className="px-4 py-2 border border-primary/30 rounded-full text-xs uppercase tracking-widest text-primary bg-primary/5">
                                     {tag}
                                 </span>
                             ))}
                         </div>
                     </div>
                 </Reveal>
             )}
          </Container>
       </article>
    </main>
  );
}
