"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import Container from "./Container";
import Link from "next/link";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await apiRequest("/api/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      if (response.success) {
        setStatus("success");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-black pt-32 pb-16 border-t border-primary/20 overflow-hidden z-[40]">
      {/* Cinematic Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          
          {/* Brand & Narrative */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <Link href="/" className="inline-block group">
                <h2 className="font-display text-5xl tracking-[0.3em] text-primary group-hover:text-secondary transition-all duration-500 glow-text">DMCU</h2>
                <p className="text-[10px] uppercase tracking-[0.6em] text-muted mt-2 group-hover:text-primary transition-all">Dharma Mythos Cinematic Universe</p>
              </Link>
            </div>
            
            <p className="text-ash max-w-md leading-relaxed uppercase tracking-widest text-[11px] font-medium opacity-80">
              The definitive digital multiverse hub. Experience a mythological-futuristic entertainment ecosystem powered by divine legacy and technological evolution.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative">
                <input
                  required
                  type="email"
                  placeholder="Synchronize Email Identity"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface/60 border border-white/10 rounded-full py-5 px-10 text-xs focus:border-primary outline-none transition-all placeholder:text-muted/40 backdrop-blur-xl"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                   <button 
                     disabled={loading}
                     className="bg-primary text-black font-black text-[10px] uppercase px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-glow"
                   >
                     {loading ? "LINKING..." : "SYNC NOW"}
                   </button>
                </div>
              </div>
              {status === "success" && <p className="mt-4 text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-black animate-pulse">Neural Link Established</p>}
              {status === "error" && <p className="mt-4 text-red-500 text-[10px] uppercase tracking-[0.3em] font-black">Transmission Interrupted</p>}
            </form>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
             <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-primary font-black border-l-2 border-primary pl-4">The Archives</h4>
                <div className="flex flex-col gap-4">
                   {[
                     { name: "Legendary Roster", link: "/#characters" },
                     { name: "Multiverse Timeline", link: "/#timeline" },
                     { name: "Lore Decryption", link: "/#lore" },
                     { name: "Comic Library", link: "/#comic" }
                   ].map(item => (
                     <Link key={item.name} href={item.link} className="text-muted hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-1 inline-block">{item.name}</Link>
                   ))}
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-primary font-black border-l-2 border-primary pl-4">Protocol</h4>
                <div className="flex flex-col gap-4">
                   {[
                     { name: "Privacy Protocol", link: "/privacy" },
                     { name: "Terms of Sync", link: "/terms" },
                     { name: "Cookie Modules", link: "/cookies" },
                     { name: "User Agreement", link: "/agreement" }
                   ].map(item => (
                     <Link key={item.name} href={item.link} className="text-muted hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-1 inline-block">{item.name}</Link>
                   ))}
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-primary font-black border-l-2 border-primary pl-4">System Core</h4>
                <div className="flex flex-col gap-4">
                   {[
                     { name: "Neural Login", link: "/admin/login" },
                     { name: "Privacy Protocol", link: "/privacy" },
                     { name: "System Status", link: "/status" },
                     { name: "Nexus Documentation", link: "/docs" }
                   ].map(item => (
                     <Link key={item.name} href={item.link} className="text-muted hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-1 inline-block">{item.name}</Link>
                   ))}
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-primary font-black border-l-2 border-primary pl-4">Connect</h4>
                <div className="flex flex-col gap-4">
                   {["X / Twitter", "Instagram Feed", "YouTube Network", "Discord Hub"].map(link => (
                     <a key={link} href="#" className="text-muted hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-all hover:translate-x-1 inline-block">{link}</a>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-col gap-2">
             <p className="text-[9px] uppercase tracking-[0.4em] text-muted font-medium">© 2026 DMCU Multiverse Archives. Synchronized by Vedteix Technology.</p>
             <p className="text-[8px] uppercase tracking-[0.6em] text-primary animate-pulse font-black">Forging Dharma Across Time.</p>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="flex gap-6">
                 {["FB", "X", "IG", "YT"].map(social => (
                   <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">{social}</a>
                 ))}
              </div>
           </div>
        </div>
      </Container>
    </footer>
  );
}
