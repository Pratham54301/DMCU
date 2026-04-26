"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { fetchJson, buildMediaUrl } from "@/lib/api";
import { SectionWrapper, CinematicCard } from "@/components/motion/MotionComponents";

export default function BlogSection({ content, id }) {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetchJson("/api/blogs");
        if (response.success) {
          setBlogs(response.data.slice(0, 3)); // Show top 3
        }
        setStatus("success");
      } catch (err) {
        console.error("Blog fetch failed", err);
        setStatus("error");
      }
    };
    loadBlogs();
  }, []);

  return (
    <SectionWrapper id={id || "blog"}>
      <Container>
        <div className="text-center mb-16">
          <SectionHeading
            eyebrow="Intel"
            title={content?.title || "DMCU Chronicles"}
            description={content?.description || "Stay updated with the latest sagas, theories, and cinematic breakthroughs."}
            align="center"
          />
        </div>

        {status === "loading" ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-3xl bg-surface/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <CinematicCard className="h-full group overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img 
                        src={buildMediaUrl(blog.image)} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex gap-2 mb-4">
                        {blog.tags?.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest text-primary/60 border border-primary/20 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-widest text-text group-hover:text-primary transition-colors mb-4 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-3 mb-6 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                        Read Entry
                        <span className="w-8 h-px bg-primary/40 group-hover:w-12 transition-all" />
                      </div>
                    </div>
                  </CinematicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
            <Link href="/blog" className="ghost-button px-12">View All Archives</Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
