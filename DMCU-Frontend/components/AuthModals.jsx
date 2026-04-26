"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function AuthModals({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // login, register
  const { login, register } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!legalAccepted) {
      setError("Compliance required: Please accept the neural protocols.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await login(values.email, values.password, legalAccepted);
      } else {
        await register(values.name, values.email, values.password, legalAccepted);
      }
      onClose();
    } catch (err) {
      if (err.message === "USER_NOT_FOUND") {
        setMode("register");
        setError("Neural link not found. Please construct a new identity.");
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-3xl bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-md glass-card border-primary/30 bg-surface/40 p-10 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full" />

          <div className="text-center mb-10">
            <h2 className="font-display text-3xl uppercase tracking-[0.2em] text-primary mb-2">
              {mode === "login" ? "System Access" : "Create Identity"}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted font-bold">
              {mode === "login" ? "Synchronize with the DMCU Matrix" : "Register your core in the multiverse"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <div>
                <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  value={values.name}
                  onChange={(e) => setValues({...values, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none transition-all"
                />
              </div>
            )}
            <div>
              <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Email Identity</label>
              <input
                required
                type="email"
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Secure Cipher</label>
              <input
                required
                type="password"
                value={values.password}
                onChange={(e) => setValues({...values, password: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Legal Consent Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
               <input 
                 type="checkbox" 
                 required
                 id="legal-consent"
                 checked={legalAccepted}
                 onChange={(e) => setLegalAccepted(e.target.checked)}
                 className="mt-1 w-4 h-4 accent-primary"
               />
               <label htmlFor="legal-consent" className="text-[9px] text-ash/80 leading-relaxed uppercase tracking-widest">
                 I have decrypted and I accept the <a href="/terms" className="text-primary hover:underline">Terms of Sync</a>, <a href="/privacy" className="text-primary hover:underline">Privacy Protocol</a>, and Platform Rules.
               </label>
            </div>

            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center animate-shake">{error}</p>}

            <GlowButton type="submit" className="w-full h-14" disabled={loading}>
              {loading ? "PROCESSING..." : mode === "login" ? "INITIALIZE LOGIN" : "CONSTRUCT ACCOUNT"}
            </GlowButton>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-[10px] uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors font-bold"
            >
              {mode === "login" ? "Deploy New Identity" : "Already Synchronized? Login"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
