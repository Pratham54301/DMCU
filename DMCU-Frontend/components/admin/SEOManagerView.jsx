"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function SEOManagerView() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await apiRequest("/api/seo");
      if (res.success) setConfig(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const session = getStoredAdminSession();
      const res = await apiRequest("/api/seo", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${session?.token}` },
        body: JSON.stringify(config)
      });
      if (res.success) {
        setMessage("SEO Core Protocol Updated");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Indexing Metadata Matrix...</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Search Engine Protocol</h3>
            <p className="text-muted text-[8px] uppercase tracking-[0.3em] mt-1">Control how the multiverse is perceived by external crawlers</p>
         </div>
         {message && <span className="text-accent text-[9px] font-bold uppercase tracking-widest animate-bounce">{message}</span>}
      </div>

      <form onSubmit={handleSave} className="glass-card p-10 border-primary/20 bg-black/40 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">Global Site Title</label>
              <input 
                value={config.siteTitle} 
                onChange={e => setConfig({...config, siteTitle: e.target.value})} 
                className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">Canonical URL</label>
              <input 
                value={config.canonicalUrl} 
                onChange={e => setConfig({...config, canonicalUrl: e.target.value})} 
                className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
              />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-[9px] uppercase tracking-widest text-muted">Sitewide Description</label>
           <textarea 
             rows={4}
             value={config.siteDescription} 
             onChange={e => setConfig({...config, siteDescription: e.target.value})} 
             className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none resize-none"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">Twitter Handle</label>
              <input 
                value={config.twitterHandle} 
                onChange={e => setConfig({...config, twitterHandle: e.target.value})} 
                placeholder="@username"
                className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">OpenGraph Image URL</label>
              <input 
                value={config.ogImage} 
                onChange={e => setConfig({...config, ogImage: e.target.value})} 
                className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
              />
           </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
           <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Tracking & Scripts</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[9px] uppercase tracking-widest text-muted">Header Scripts (GTM/Analytics)</label>
                 <textarea 
                   rows={6}
                   value={config.scripts?.header} 
                   onChange={e => setConfig({...config, scripts: {...config.scripts, header: e.target.value}})} 
                   className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-[10px] font-mono focus:border-primary outline-none resize-none"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] uppercase tracking-widest text-muted">Footer Scripts (Pixels/Support)</label>
                 <textarea 
                   rows={6}
                   value={config.scripts?.footer} 
                   onChange={e => setConfig({...config, scripts: {...config.scripts, footer: e.target.value}})} 
                   className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-[10px] font-mono focus:border-primary outline-none resize-none"
                 />
              </div>
           </div>
        </div>

        <div className="pt-8 flex justify-end">
           <GlowButton type="submit" className="px-12 h-14" disabled={isSaving}>
             {isSaving ? "SYNCING CORE..." : "UPDATE SEO PROTOCOL"}
           </GlowButton>
        </div>
      </form>
    </div>
  );
}
