"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { fetchJson } from "@/lib/api";
import { CinematicCard, GlowButton } from "@/components/motion/MotionComponents";

const SECTION_TYPES = ['hero', 'about', 'lore', 'comic', 'ranking', 'trailer', 'custom'];
const ANIMATION_TYPES = ['fade', 'slide', 'float'];

export default function SectionManagerView() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [message, setMessage] = useState("");

  const loadSections = async () => {
    try {
      const response = await fetchJson("/api/sections");
      if (response.success) {
        setSections(response.data);
      }
    } catch (err) {
      console.error("Failed to load sections", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await fetchJson(`/api/sections/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      loadSections();
    } catch (err) {
      console.error("Failed to toggle section status", err);
    }
  };

  const handleSaveOrder = async (newOrder) => {
    setSections(newOrder);
    try {
      for (let i = 0; i < newOrder.length; i++) {
        await fetchJson(`/api/sections/${newOrder[i]._id}`, {
          method: "PUT",
          body: JSON.stringify({ order: i + 1 }),
        });
      }
      setMessage("Order updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const handleEditContent = (section) => {
    setEditingSection({ ...section });
  };

  const handleUpdateSection = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchJson(`/api/sections/${editingSection._id}`, {
        method: "PUT",
        body: JSON.stringify(editingSection),
      });
      if (response.success) {
        setEditingSection(null);
        loadSections();
        setMessage("Section optimized!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to update section", err);
    }
  };

  if (loading) return <div className="p-8 text-primary animate-pulse uppercase tracking-[0.4em]">Syncing Section Matrix...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-widest text-primary">
            Structural Control
          </h2>
          <p className="text-muted text-xs uppercase tracking-widest mt-2">Manage website layout, logic, and animations</p>
        </div>
        {message && <span className="text-accent animate-fade-in font-bold uppercase tracking-widest text-[10px]">{message}</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8">
        {/* Section List / Reordering */}
        <div className="space-y-4">
          <p className="text-muted text-[10px] uppercase tracking-widest mb-4">Rearrange components in the visual stack</p>
          <Reorder.Group axis="y" values={sections} onReorder={handleSaveOrder} className="space-y-3">
            {sections.map((section) => (
              <Reorder.Item key={section._id} value={section}>
                <div className={`glass-card p-4 flex items-center justify-between cursor-grab active:cursor-grabbing border ${section.isActive ? 'border-primary/20' : 'border-red-500/20 opacity-60'}`}>
                  <div className="flex flex-col">
                    <span className="text-primary/40 font-mono text-[8px] uppercase">#{section.type}</span>
                    <span className="font-display uppercase tracking-widest text-[12px]">{section.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleToggleActive(section._id, section.isActive)}
                      className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-widest border transition-all ${section.isActive ? 'border-green-500/40 text-green-500' : 'border-red-500/40 text-red-500'}`}
                    >
                      {section.isActive ? 'Operational' : 'Offline'}
                    </button>
                    <button 
                      onClick={() => handleEditContent(section)}
                      className="px-3 py-1 rounded-full text-[8px] uppercase tracking-widest border border-primary/40 text-primary hover:bg-primary/10"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* Edit Form */}
        <div className="relative">
          {editingSection ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 border border-primary/40 bg-black/40">
              <h3 className="font-display text-xl uppercase tracking-widest text-primary mb-8 border-b border-primary/10 pb-4">
                Configuring: {editingSection.name}
              </h3>
              <form onSubmit={handleUpdateSection} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Section Type</label>
                    <select 
                      value={editingSection.type}
                      onChange={(e) => setEditingSection({...editingSection, type: e.target.value})}
                      className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none"
                    >
                      {SECTION_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Animation Protocol</label>
                    <select 
                      value={editingSection.animationType}
                      onChange={(e) => setEditingSection({...editingSection, animationType: e.target.value})}
                      className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none"
                    >
                      {ANIMATION_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Display Title</label>
                    <input 
                      type="text"
                      value={editingSection.content.title || ""}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, title: e.target.value }
                      })}
                      className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Description / Body</label>
                    <textarea 
                      rows="6"
                      value={editingSection.content.description || ""}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, description: e.target.value }
                      })}
                      className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <GlowButton type="submit" className="flex-1">Save Configuration</GlowButton>
                    <button 
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="flex-1 px-6 py-3 rounded-full border border-red-500/40 text-red-500 uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all"
                    >
                      Abort
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="glass-card p-20 border border-dashed border-primary/20 flex flex-col items-center justify-center text-muted uppercase tracking-[0.4em] text-xs h-full text-center">
              <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 ⚙️
              </div>
              Select a component to access its visual logic
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
