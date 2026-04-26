"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NarrationEngine({ text, audioUrl, label = "Narration" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const toggleNarration = () => {
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a deep/premium voice
      const voices = synth.getVoices();
      const premiumVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Microsoft David"));
      if (premiumVoice) utterance.voice = premiumVoice;
      
      utterance.pitch = 0.85; // Lower pitch for cinematic feel
      utterance.rate = 0.9;   // Slower rate
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      synth.speak(utterance);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleNarration}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
        isPlaying ? "bg-primary border-primary text-black shadow-glow" : "bg-black/40 border-primary/20 text-primary/80 hover:border-primary"
      }`}
    >
      <div className="w-3 h-3 flex items-center justify-center">
        {isPlaying ? (
          <div className="flex gap-0.5 items-end h-full">
            {[1,2,3].map(i => (
              <motion.div 
                key={i}
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-0.5 bg-black"
              />
            ))}
          </div>
        ) : (
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] font-black">{isPlaying ? "Active" : label}</span>
    </motion.button>
  );
}
