"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson, apiRequest } from "@/lib/api";
import { useTheme } from "../../app/theme-context";
import { hexToRgb, getContrastColor, generateColorVariables } from "@/lib/colorUtils";
import { GlowButton, CinematicCard } from "../motion/MotionComponents";

export default function ThemeSettingsView() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { refreshTheme } = useTheme();

  // Helper to convert RGB string "R G B" to Hex "#RRGGBB"
  const rgbToHex = (rgb) => {
    if (!rgb || rgb.startsWith('#')) return rgb;
    const parts = rgb.split(/[ ,]+/).map(Number);
    return "#" + parts.map(x => x.toString(16).padStart(2, '0')).join('');
  };

  // Helper to convert Hex to RGB string for backend compatibility if needed
  const hexToRgbStr = (hex) => hexToRgb(hex);

  // Form State for Custom Forge
  const [newTheme, setNewTheme] = useState({
    name: "",
    colors: {
      primary: "#d4af37",
      secondary: "#ffd700",
      accent: "#1e90ff",
      text: "#eaeaea",
      muted: "#b0b0b0",
      surface: "#141414",
      surfaceStrong: "#1e1e1e"
    },
    backgroundConfig: "cosmic",
    backgroundStyles: {
      baseColor: "#08080c",
      gradient1: "#d4af37",
      gradient2: "#1e90ff",
      gradient1Position: "70% 20%",
      gradient2Position: "30% 80%",
      intensity: 0.15
    }
  });

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const data = await fetchJson("/api/theme");
      setThemes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleActivate = async (id) => {
    try {
      await apiRequest(`/api/theme/activate/${id}`, { method: "PUT" });
      await fetchThemes();
      refreshTheme(); 
    } catch (err) {
      alert("Activation failed: " + err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Convert colors to the format expected by some parts of the system if necessary
      // But ThemeProvider now handles both, so we can send Hex.
      await apiRequest("/api/theme", {
        method: "POST",
        body: JSON.stringify(newTheme)
      });
      setShowAddForm(false);
      await fetchThemes();
      refreshTheme();
    } catch (err) {
      alert("Creation failed: " + err.message);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("This will overwrite existing themes with the library. Continue?")) return;
    try {
      setLoading(true);
      await apiRequest("/api/theme/seed", { method: "POST" });
      await fetchThemes();
      refreshTheme();
    } catch (err) {
      alert("Seeding failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const previewVars = useMemo(() => {
    const vars = {
      ...generateColorVariables('primary', newTheme.colors.primary),
      ...generateColorVariables('secondary', newTheme.colors.secondary),
      ...generateColorVariables('accent', newTheme.colors.accent),
      '--bg-color': hexToRgb(newTheme.backgroundStyles.baseColor),
      '--text-color': hexToRgb(newTheme.colors.text),
      '--surface-color': hexToRgb(newTheme.colors.surface),
    };
    return vars;
  }, [newTheme]);

  const filteredThemes = themes.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && themes.length === 0) return <div className="p-8 text-primary animate-pulse uppercase tracking-[0.3em]">Syncing Theme Library...</div>;

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-primary/10 pb-8">
        <div className="flex-1">
          <h2 className="font-display text-4xl uppercase tracking-widest text-text drop-shadow-glow">Theme Engine</h2>
          <p className="mt-3 text-[10px] text-primary/70 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Advanced Dynamic System Enabled
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-64 group">
               <input 
                  type="text" 
                  placeholder="SEARCH SKINS..." 
                  className="admin-input pr-10 text-[10px]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
               </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
               <button onClick={() => setShowAddForm(!showAddForm)} className="gold-button flex-1 sm:flex-none px-6 text-[10px]">
                 {showAddForm ? 'CLOSE FORGE' : 'FORGE NEW SKIN'}
               </button>
               <button onClick={handleSeed} className="ghost-button flex-1 sm:flex-none px-6 text-[10px]">
                 RESET LIBRARY
               </button>
            </div>
        </div>
      </header>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
               {/* Controls */}
               <form onSubmit={handleCreate} className="glass-card p-8 rounded-3xl border-primary/20 bg-black/40 space-y-6">
                  <div className="space-y-2">
                    <label className="admin-label">Configuration Name</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      placeholder="e.g. Neon Dharma"
                      required
                      value={newTheme.name}
                      onChange={e => setNewTheme({...newTheme, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="admin-label">Style Blueprint</label>
                    <div className="grid grid-cols-3 gap-2">
                       {[
                          { id: 'dark', label: 'Dark Void', p: '#000000', s: '#111111', a: '#333333', bg: '#08080c' },
                          { id: 'water', label: 'Oceanic', p: '#00ccff', s: '#0066ff', a: '#00ffff', bg: '#010a1a' },
                          { id: 'highlight', label: 'Solaris', p: '#ffcc00', s: '#ff6600', a: '#ffffff', bg: '#1a0d01' }
                       ].map(style => (
                          <button 
                             key={style.id}
                             type="button"
                             onClick={() => setNewTheme({
                                ...newTheme,
                                colors: { ...newTheme.colors, primary: style.p, secondary: style.s, accent: style.a },
                                backgroundStyles: { ...newTheme.backgroundStyles, baseColor: style.bg }
                             })}
                             className="px-2 py-2 rounded-lg border border-primary/20 bg-surface/50 text-[8px] uppercase tracking-widest hover:border-primary transition-all"
                          >
                             {style.label}
                          </button>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-muted block">Primary</label>
                        <input 
                           type="color" 
                           value={newTheme.colors.primary}
                           onChange={e => setNewTheme({...newTheme, colors: {...newTheme.colors, primary: e.target.value}})}
                           className="w-full h-10 bg-transparent cursor-pointer rounded overflow-hidden"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-muted block">Secondary</label>
                        <input 
                           type="color" 
                           value={newTheme.colors.secondary}
                           onChange={e => setNewTheme({...newTheme, colors: {...newTheme.colors, secondary: e.target.value}})}
                           className="w-full h-10 bg-transparent cursor-pointer rounded overflow-hidden"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-muted block">Accent</label>
                        <input 
                           type="color" 
                           value={newTheme.colors.accent}
                           onChange={e => setNewTheme({...newTheme, colors: {...newTheme.colors, accent: e.target.value}})}
                           className="w-full h-10 bg-transparent cursor-pointer rounded overflow-hidden"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-muted block">Background</label>
                        <input 
                           type="color" 
                           value={newTheme.backgroundStyles.baseColor}
                           onChange={e => setNewTheme({...newTheme, backgroundStyles: {...newTheme.backgroundStyles, baseColor: e.target.value}})}
                           className="w-full h-10 bg-transparent cursor-pointer rounded overflow-hidden"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-muted block">Text Base</label>
                        <input 
                           type="color" 
                           value={newTheme.colors.text}
                           onChange={e => {
                              setNewTheme({...newTheme, colors: {...newTheme.colors, text: e.target.value}});
                           }}
                           className="w-full h-10 bg-transparent cursor-pointer rounded overflow-hidden"
                        />
                        <button 
                           type="button" 
                           onClick={() => setNewTheme({...newTheme, colors: {...newTheme.colors, text: getContrastColor(newTheme.backgroundStyles.baseColor)}})}
                           className="text-[7px] text-primary uppercase hover:underline"
                        >
                           Auto Contrast
                        </button>
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="admin-label">Background Engine</label>
                    <select 
                       value={newTheme.backgroundConfig}
                       onChange={e => setNewTheme({...newTheme, backgroundConfig: e.target.value})}
                       className="admin-input bg-surface"
                    >
                       <option value="solid">Solid Base</option>
                       <option value="gradient">Linear Flow</option>
                       <option value="cosmic">Cosmic Glow</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-primary/10">
                    <GlowButton type="submit" className="w-full">Forge Configuration</GlowButton>
                  </div>
               </form>

               {/* Preview Panel */}
               <div className="glass-card p-8 rounded-3xl border-primary/20 bg-black/60 relative overflow-hidden flex flex-col justify-center items-center" style={previewVars}>
                  <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 20%, var(--primary-50), transparent 40%), radial-gradient(circle at 30% 80%, var(--accent-50), transparent 40%), rgb(var(--bg-color))` }} />
                  
                  <div className="text-center space-y-6 w-full max-w-sm">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-primary">Live Neural Preview</span>
                     <h4 className="font-display text-4xl uppercase tracking-widest text-text">DMCU</h4>
                     <p className="text-[10px] text-muted uppercase tracking-[0.2em] leading-relaxed">
                        The dynamic color system generates shades and opacities in real-time.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="px-4 py-2 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-widest shadow-glow">Primary</div>
                        <div className="px-4 py-2 rounded-full border border-primary text-primary text-[10px] font-bold uppercase tracking-widest">Outline</div>
                     </div>

                     <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map(i => (
                           <div key={i} className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-primary/20">
                              <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Library Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
        {filteredThemes.map((theme) => {
          const themePrimary = rgbToHex(theme.colors.primary);
          const themeAccent = rgbToHex(theme.colors.accent);
          const themeBase = rgbToHex(theme.backgroundStyles.baseColor);

          return (
            <motion.div
              key={theme._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass-card p-5 border transition-all duration-500 relative overflow-hidden group ${theme.isActive ? 'border-primary/50 shadow-[0_0_30px_rgba(var(--primary-color),0.15)] bg-surface' : 'border-primary/10 hover:border-primary/40 hover:bg-surface/30'}`}
            >
              {theme.isActive && (
                <div className="absolute top-0 right-0 p-1 z-10">
                    <div className="bg-primary text-black text-[7px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter shadow-lg animate-pulse">ACTIVE ENGINE</div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-display text-sm uppercase tracking-widest text-text group-hover:text-primary transition-colors line-clamp-1">{theme.name}</h3>
              </div>

              {/* Background Preview */}
              <div className="w-full h-20 rounded-xl mb-4 relative overflow-hidden border border-white/5 shadow-inner" 
                   style={{ 
                      background: theme.backgroundConfig === 'cosmic' 
                          ? `radial-gradient(circle at ${theme.backgroundStyles.gradient1Position}, rgba(${hexToRgb(rgbToHex(theme.backgroundStyles.gradient1))}, 0.6), transparent 60%), radial-gradient(circle at ${theme.backgroundStyles.gradient2Position}, rgba(${hexToRgb(rgbToHex(theme.backgroundStyles.gradient2))}, 0.6), transparent 60%), rgb(${hexToRgb(themeBase)})` 
                          : theme.backgroundConfig === 'gradient'
                          ? `linear-gradient(135deg, rgb(${hexToRgb(rgbToHex(theme.backgroundStyles.gradient1))}), rgb(${hexToRgb(rgbToHex(theme.backgroundStyles.gradient2))}))`
                          : `rgb(${hexToRgb(themeBase)})`
                   }}>
              </div>

              {/* Swatches */}
              <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex gap-1.5">
                     <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: themePrimary }} />
                     <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: themeAccent }} />
                  </div>
                  <div className="text-[7px] uppercase tracking-widest text-primary/30 group-hover:text-primary/60 transition-colors">
                     {theme.backgroundConfig}
                  </div>
              </div>

              <button
                onClick={() => handleActivate(theme._id)}
                disabled={theme.isActive}
                className={`w-full rounded-lg py-2 text-[9px] uppercase font-bold tracking-[0.2em] transition-all duration-300 ${theme.isActive ? 'bg-primary/10 text-primary/40 border border-primary/20 cursor-default' : 'bg-primary/5 text-primary border border-primary/20 hover:bg-primary hover:text-black shadow-glow'}`}
              >
                {theme.isActive ? 'OPERATIONAL' : 'INITIATE'}
              </button>
            </motion.div>
          );
        })}
      </div>
      
      {filteredThemes.length === 0 && !loading && (
        <div className="py-20 text-center">
           <div className="text-primary/20 text-6xl mb-4 uppercase font-display tracking-tighter">No Matches</div>
           <p className="text-muted text-xs uppercase tracking-widest">Spectral database contains no such skin configuration.</p>
        </div>
      )}
    </div>
  );
}
