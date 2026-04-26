"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson } from "@/lib/api";
import Container from "@/components/Container";

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetchJson(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.success) {
          setResults(response.data);
        }
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 backdrop-blur-2xl bg-black/60"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          className="w-full max-w-3xl glass-card border-primary/20 bg-surface/40 p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative mb-8">
            <input
              autoFocus
              type="text"
              placeholder="Search characters, comics, lore..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/20 border-b-2 border-primary/40 focus:border-primary p-4 text-xl md:text-2xl outline-none font-display uppercase tracking-widest placeholder:text-muted/40 transition-all"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {results ? (
              <div className="space-y-8 pb-4">
                {/* Result Categories */}
                <SearchCategory title="Characters" items={results.characters} type="character" />
                <SearchCategory title="Comics" items={results.comics} type="comic" />
                <SearchCategory title="Lore & Blogs" items={results.blogs} type="blog" />
                <SearchCategory title="Universe Sections" items={results.sections} type="section" />
                
                {Object.values(results).every(arr => arr.length === 0) && (
                  <p className="text-center text-muted uppercase tracking-[0.2em] py-10">No matches found in the matrix</p>
                )}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <p className="text-primary/40 uppercase tracking-[0.4em] text-xs">Awaiting Input Query</p>
                <div className="flex justify-center gap-2">
                  {["Hanuman", "Kalki", "War of Yugas"].map(tag => (
                    <button key={tag} onClick={() => setQuery(tag)} className="text-[10px] uppercase border border-white/5 bg-white/5 px-3 py-1 rounded hover:bg-primary/10 transition-colors">#{tag}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SearchCategory({ title, items, type }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-bold border-b border-primary/10 pb-2">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <a
            key={item._id}
            href={getLink(item, type)}
            className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded bg-black/40 overflow-hidden flex-shrink-0">
               <img 
                 src={item.image || item.coverImage || item.thumbnail || item.content?.mainMedia || "/placeholder.jpg"} 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                 alt="" 
               />
            </div>
            <div className="overflow-hidden">
               <h5 className="font-display uppercase tracking-widest text-xs truncate">{item.name || item.title}</h5>
               <p className="text-[9px] text-muted truncate">{item.subtitle || item.phase || "Module Result"}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function getLink(item, type) {
  switch (type) {
    case 'character': return `/characters/${item._id}`;
    case 'comic': return `/comic/${item.slug}`;
    case 'blog': return `/blog/${item.slug}`;
    case 'section': return `/#${item.slug}`;
    default: return '/';
  }
}
