"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function TrailerManagerView() {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTrailers();
  }, []);

  const loadTrailers = async () => {
    try {
      const res = await apiRequest("/api/trailers");
      if (res.success) setTrailers(res.data);
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
      const method = editing._id ? "PUT" : "POST";
      const path = editing._id ? `/api/trailers/${editing._id}` : "/api/trailers";
      
      const res = await apiRequest(path, {
        method,
        headers: { "Authorization": `Bearer ${session?.token}` },
        body: JSON.stringify(editing)
      });
      
      if (res.success) {
        setEditing(null);
        loadTrailers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Confirm trailer deletion?")) return;
    try {
      const session = getStoredAdminSession();
      await apiRequest(`/api/trailers/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${session?.token}` }
      });
      loadTrailers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Decrypting Transmission Archive...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Archive / Trailers</h3>
        <GlowButton onClick={() => setEditing({ title: '', youtubeUrl: '', category: 'Trailer' })}>+ Register New Asset</GlowButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
          {trailers.map(t => (
            <div key={t._id} className="glass-card p-6 flex justify-between items-center group hover:border-primary/40 transition-all border-white/5 bg-black/40">
              <div className="flex items-center gap-6">
                 <div className="w-24 h-14 bg-black rounded-lg overflow-hidden border border-white/10 relative group-hover:border-primary/30">
                    {t.youtubeUrl && (
                       <img 
                          src={`https://img.youtube.com/vi/${t.youtubeUrl.split('v=')[1]?.split('&')[0]}/0.jpg`} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                       />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-xs">▶️</div>
                 </div>
                 <div>
                    <h4 className="text-xs font-display uppercase tracking-widest text-parchment">{t.title}</h4>
                    <p className="text-[8px] text-primary uppercase tracking-[0.2em] mt-1">{t.category}</p>
                 </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => setEditing(t)} className="w-8 h-8 rounded bg-white/5 hover:bg-primary/20 flex items-center justify-center text-[10px]">✏️</button>
                 <button onClick={() => handleDelete(t._id)} className="w-8 h-8 rounded bg-red-500/10 hover:bg-red-500/30 flex items-center justify-center text-[10px]">🗑️</button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {editing && (
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSave} 
              className="glass-card p-8 border-primary/20 bg-black/60 space-y-6 sticky top-0"
            >
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black border-b border-primary/10 pb-4 mb-4">Transmission Editor</h4>
              
              <div className="space-y-2">
                 <label className="text-[9px] uppercase tracking-widest text-muted">Asset Title</label>
                 <input 
                   value={editing.title} 
                   onChange={e => setEditing({...editing, title: e.target.value})} 
                   className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
                   required
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[9px] uppercase tracking-widest text-muted">YouTube URL</label>
                 <input 
                   value={editing.youtubeUrl} 
                   onChange={e => setEditing({...editing, youtubeUrl: e.target.value})} 
                   placeholder="https://www.youtube.com/watch?v=..."
                   className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
                   required
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-muted">Category</label>
                    <select 
                      value={editing.category} 
                      onChange={e => setEditing({...editing, category: e.target.value})}
                      className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-[10px] uppercase tracking-widest focus:border-primary outline-none"
                    >
                      <option>Teaser</option>
                      <option>Trailer</option>
                      <option>Featurette</option>
                    </select>
                 </div>
                 <div className="flex items-center gap-3 pt-6">
                    <input 
                      type="checkbox" 
                      checked={editing.isFeatured} 
                      onChange={e => setEditing({...editing, isFeatured: e.target.checked})}
                      className="w-4 h-4 accent-primary"
                    />
                    <label className="text-[9px] uppercase tracking-widest text-muted">Featured</label>
                 </div>
              </div>

              <div className="pt-6 flex gap-4">
                 <GlowButton type="submit" className="flex-1 h-12" disabled={isSaving}>
                   {isSaving ? "SYNCHRONIZING..." : "COMMIT ASSET"}
                 </GlowButton>
                 <button type="button" onClick={() => setEditing(null)} className="px-6 border border-white/10 text-[9px] uppercase tracking-widest hover:bg-white/5">Abort</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
