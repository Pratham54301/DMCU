"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CinematicCard, GlowButton } from "@/components/motion/MotionComponents";
import NarrationEngine from "@/components/NarrationEngine";
import { useLanguage } from "@/app/language-context";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { buildMediaUrl, fetchJson } from "@/lib/api";

const CharacterCanvas = dynamic(() => import("./CharacterCanvas"), { ssr: false });

function StatBar({ label, value, t }) {
  const safeValue = value || 0;
  return (
    <div className="mb-4 group/stat">
      <div className="flex justify-between text-[10px] tracking-widest text-primary/60 uppercase mb-1.5 transition-colors group-hover/stat:text-primary">
        <span>{t(label.toLowerCase())}</span>
        <span className="font-bold">{safeValue}/100</span>
      </div>
      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-primary/10 backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${safeValue}%` }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary shadow-[0_0_10px_rgb(var(--primary-color)/0.5)]"
        />
      </div>
    </div>
  );
}

export default function CharacterDetailPage({ characterId }) {
  const [character, setCharacter] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!characterId) {
      setStatus("error");
      setErrorMessage("Character id is missing from the URL.");
      return;
    }

    const loadCharacter = async () => {
      try {
        setStatus("loading");
        const payload = await fetchJson(`/api/characters/${characterId}`);
        setCharacter(payload.data || null);
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.message || "Unable to load this character right now.");
        setStatus("error");
      }
    };

    loadCharacter();
  }, [characterId, reloadKey]);

  const modelUrl = buildMediaUrl(character?.model3d);

  if (status === "loading") {
    return (
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full shadow-[0_0_20px_rgb(var(--primary)/0.2)]"
        />
        <p className="mt-8 text-primary font-display uppercase tracking-[0.4em] text-xs animate-pulse">
          {t("loading")}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl uppercase tracking-widest text-primary mb-4">{t("error")}</h1>
        <p className="text-muted mb-8 max-w-md">{errorMessage}</p>
        <div className="flex gap-4">
          <button onClick={() => setReloadKey(k => k + 1)} className="gold-button px-8">{t("retry")}</button>
          <Link href="/" className="ghost-button px-8">{t("home")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none" style={{ backgroundColor: 'rgb(var(--character-bg-color))' }}>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--primary-color)/0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* 3D Model - Center Focus (Fixed to viewport) */}
      <div className="fixed inset-0 z-0">
        <CharacterCanvas 
          imageUrl={buildMediaUrl(character.image)} 
          modelUrl={modelUrl} 
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* UI OVERLAY */}
      <div className="relative z-10 w-full h-full flex flex-col p-6 lg:p-12 pointer-events-none overflow-hidden">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center pointer-events-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-all group">
              <span className="w-8 h-px bg-primary/20 group-hover:w-12 group-hover:bg-primary transition-all" />
              {t("back")}
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <div className="text-[10px] text-primary/40 uppercase tracking-widest font-display">Archives Node</div>
              <div className="text-[10px] text-primary/80 font-mono tracking-tighter">{character?._id?.slice(-12).toUpperCase()}</div>
            </div>
          </motion.div>
        </div>

        {/* HUD Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 mt-12">
          
          {/* LEFT PANEL - Identity */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-6 pointer-events-auto"
          >
            <div className="space-y-1">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 shadow-[0_0_15px_rgb(var(--primary-color)/0.1)]"
              >
                {character.category?.replace(/_/g, ' ')}
              </motion.div>
              <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tighter text-text leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                {character.name}
              </h1>
              <p className="text-lg lg:text-xl uppercase tracking-[0.4em] text-primary/80 ml-1">
                {character.title}
              </p>
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="h-1 bg-primary/20 rounded-full" 
            />
          </motion.div>

          {/* CENTER - Spacing for 3D model */}
          <div className="lg:col-span-4 h-64 lg:h-full" />

          {/* RIGHT PANEL - Stats */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-6 pointer-events-auto"
          >
            <div className="glass-card p-8 rounded-3xl bg-black/40 backdrop-blur-md border-primary/10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary fill-current">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
                 </svg>
              </div>

              <h3 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-8 flex justify-between items-center border-b border-primary/10 pb-4">
                {t("stats")}
                <span className="text-[10px] text-primary/30 tracking-widest animate-pulse">Scanning...</span>
              </h3>
              
              <div className="space-y-6">
                <StatBar label="Strength" value={character.stats?.strength} t={t} />
                <StatBar label="Intelligence" value={character.stats?.intelligence} t={t} />
                <StatBar label="Energy" value={character.stats?.energy} t={t} />
                <StatBar label="Combat" value={character.stats?.combat} t={t} />
              </div>

              <div className="mt-10 pt-6 border-t border-primary/10">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4">{t("abilities")}</div>
                <div className="flex flex-wrap gap-2">
                  {character.powers?.map((power, i) => (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5 + (i * 0.1) }}
                      key={i} 
                      className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-[10px] uppercase tracking-wider text-text/80 hover:border-primary/40 hover:bg-primary/10 transition-all cursor-default"
                    >
                      {power}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM PANEL - Backstory */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-5xl mx-auto w-full"
        >
          <div className="glass-card p-6 lg:p-8 rounded-t-[2.5rem] bg-gradient-to-t from-black/90 to-black/60 backdrop-blur-2xl border-t border-x border-primary/10 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h4 className="font-display text-sm uppercase tracking-[0.4em] text-primary/80">
                  {t("backstory")}
                </h4>
                <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              
              {/* Narration Engine */}
              <NarrationEngine 
                text={character.backstory?.[language] || character.backstory?.en || character.description} 
                audioUrl={character.voiceUrl}
                label={t("listen")}
              />
            </div>

            <div className="h-32 lg:h-40 overflow-y-auto pr-6 custom-scrollbar">
              <p className="text-base lg:text-xl leading-relaxed text-text/80 font-light">
                {character.backstory?.[language] || character.description || "Classified intelligence."}
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(var(--primary) / 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(var(--primary) / 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(var(--primary) / 0.4);
        }
      `}</style>
    </div>
  );
}
