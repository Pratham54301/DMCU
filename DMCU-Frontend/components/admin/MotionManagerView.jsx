"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function MotionManagerView() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await apiRequest("/api/motion");
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
      const res = await apiRequest("/api/motion", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${session?.token}` },
        body: JSON.stringify(config)
      });
      if (res.success) {
        setMessage("Motion Protocol Synchronized");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Calibrating Kinematics...</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Motion Engine / Global Physics</h3>
            <p className="text-muted text-[8px] uppercase tracking-[0.3em] mt-1">Fine-tune the multiverse's interactive behavior</p>
         </div>
         {message && <span className="text-accent text-[9px] font-bold uppercase tracking-widest animate-bounce">{message}</span>}
      </div>

      <form onSubmit={handleSave} className="glass-card p-10 border-primary/20 bg-black/40 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black border-b border-primary/10 pb-4">Timing & Easing</h4>
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] uppercase tracking-widest text-muted">
                    <span>Global Transition Speed</span>
                    <span className="text-primary">{config.globalSpeed}s</span>
                 </div>
                 <input type="range" min="0.1" max="2" step="0.1" value={config.globalSpeed} onChange={e => setConfig({...config, globalSpeed: parseFloat(e.target.value)})} className="w-full accent-primary" />
                 
                 <div className="space-y-2 pt-4">
                    <label className="text-[9px] uppercase tracking-widest text-muted">Default Preset</label>
                    <select value={config.defaultPreset} onChange={e => setConfig({...config, defaultPreset: e.target.value})} className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-[10px] uppercase tracking-widest outline-none">
                       {['fade', 'slide', 'zoom', 'blur', 'float'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black border-b border-primary/10 pb-4">Interactive Systems</h4>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <label className="text-[10px] uppercase tracking-widest text-parchment">Cursor Reactive Lighting</label>
                    <input type="checkbox" checked={config.cursorReactive} onChange={e => setConfig({...config, cursorReactive: e.target.checked})} className="w-5 h-5 accent-primary" />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <label className="text-[10px] uppercase tracking-widest text-parchment">Parallax Depth Perception</label>
                    <input type="checkbox" checked={config.parallaxEnabled} onChange={e => setConfig({...config, parallaxEnabled: e.target.checked})} className="w-5 h-5 accent-primary" />
                 </div>
                 <div className="space-y-4 pt-2">
                    <div className="flex justify-between text-[9px] uppercase tracking-widest text-muted">
                       <span>Antigravity Intensity</span>
                       <span className="text-primary">{config.antigravityIntensity}%</span>
                    </div>
                    <input type="range" min="0" max="50" step="1" value={config.antigravityIntensity} onChange={e => setConfig({...config, antigravityIntensity: parseInt(e.target.value)})} className="w-full accent-primary" />
                 </div>
              </div>
           </div>
        </div>

        <div className="pt-8 flex justify-end">
           <GlowButton type="submit" className="px-12 h-14" disabled={isSaving}>
             {isSaving ? "STABILIZING..." : "CALIBRATE PHYSICS"}
           </GlowButton>
        </div>
      </form>
    </div>
  );
}
