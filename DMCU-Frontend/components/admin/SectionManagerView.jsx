"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { fetchJson, apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { CinematicCard, GlowButton } from "@/components/motion/MotionComponents";

const SECTION_TYPES = ['hero', 'about', 'timeline', 'characters', 'comic', 'ranking', 'trailer', 'blog', 'cta', 'custom'];
const LAYOUTS = ['centered', 'split-left', 'split-right', 'grid-3', 'grid-4', 'horizontal-scroll'];
const MOTION_PRESETS = ['fade', 'slide', 'zoom', 'float', 'parallax', 'antigravity', 'reveal', 'interactive', 'none'];
const HOVER_EFFECTS = ['scale', 'glow', 'lift', 'tilt', 'none'];

export default function SectionManagerView() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [activeTab, setActiveTab] = useState("identity"); // identity, design, content, motion, elements, language
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      const session = getStoredAdminSession();
      if (!session?.token) throw new Error("Session expired.");

      await apiRequest(`/api/sections/${id}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${session.token}` },
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
      const session = getStoredAdminSession();
      if (!session?.token) throw new Error("Session expired.");

      for (let i = 0; i < newOrder.length; i++) {
        await apiRequest(`/api/sections/${newOrder[i]._id}`, {
          method: "PUT",
          headers: { 'Authorization': `Bearer ${session.token}` },
          body: JSON.stringify({ order: i + 1 }),
        });
      }
      setMessage("Matrix Order Synchronized");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update order", err);
    }
  };

  const handleEditSection = (section) => {
    const initializedSection = {
      ...section,
      design: section.design || { layout: 'centered', backgroundColor: 'transparent', overlayOpacity: 0.5, spacing: 'default' },
      motion: section.motion || { preset: 'fade', duration: 0.8, delay: 0, stiffness: 100, damping: 10, hoverEffect: 'none', cursorReactive: false, parallaxIntensity: 0 },
      content: section.content || { title: '', subtitle: '', description: '', items: [], buttons: [] },
      translations: section.translations || {
        hi: { title: '', subtitle: '', description: '', items: [], buttons: [] },
        gu: { title: '', subtitle: '', description: '', items: [], buttons: [] }
      }
    };
    setEditingSection(initializedSection);
    setActiveTab("identity");
  };

  const handleUpdateSection = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const session = getStoredAdminSession();
      if (!session?.token) throw new Error("Session expired. Please log in again.");

      const formData = new FormData();
      formData.append("name", editingSection.name);
      formData.append("type", editingSection.type);
      formData.append("isActive", editingSection.isActive);
      formData.append("order", editingSection.order);
      formData.append("design", JSON.stringify(editingSection.design));
      formData.append("motion", JSON.stringify(editingSection.motion));
      formData.append("content", JSON.stringify(editingSection.content));
      formData.append("translations", JSON.stringify(editingSection.translations));

      if (editingSection.bgFile) formData.append("backgroundImage", editingSection.bgFile);
      if (editingSection.mediaFile) formData.append("mainMedia", editingSection.mediaFile);
      
      editingSection.content.items.forEach((item, index) => {
        if (item.newImageFile) formData.append(`item_image_${index}`, item.newImageFile);
      });

      const response = await apiRequest(`/api/sections/${editingSection._id}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${session.token}` },
        body: formData,
      });
      
      if (response.success) {
        setEditingSection(null);
        loadSections();
        setMessage("Section Architected Successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to architect section", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...editingSection.content.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingSection({ ...editingSection, content: { ...editingSection.content, items: newItems } });
  };

  const handleAddItem = () => {
    const newItem = { title: 'New Item', subtitle: '', description: '', link: '', order: editingSection.content.items.length };
    setEditingSection({ ...editingSection, content: { ...editingSection.content, items: [...editingSection.content.items, newItem] } });
  };

  const handleRemoveItem = (index) => {
    const newItems = editingSection.content.items.filter((_, i) => i !== index);
    setEditingSection({ ...editingSection, content: { ...editingSection.content, items: newItems } });
  };

  if (loading) return <div className="p-8 text-primary animate-pulse uppercase tracking-[0.4em]">Initializing Architect Interface...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-[0.2em] text-primary">Section Architect</h2>
          <p className="text-muted text-[10px] uppercase tracking-[0.5em] mt-2">Complete A-to-Z control of the DMCU matrix</p>
        </div>
        {message && <span className="text-accent animate-bounce font-bold uppercase tracking-widest text-[10px]">{message}</span>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[350px,1fr] gap-8">
        {/* Left Navigator */}
        <div className="space-y-4">
          <div className="glass-card p-6 border-primary/10">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-muted mb-6">Component Stack</h4>
            <Reorder.Group axis="y" values={sections} onReorder={handleSaveOrder} className="space-y-3">
              {sections.map((section) => (
                <Reorder.Item key={section._id} value={section}>
                  <div 
                    onClick={() => handleEditSection(section)}
                    className={`p-4 flex items-center justify-between cursor-pointer border transition-all hover:bg-primary/5 ${editingSection?._id === section._id ? 'border-primary bg-primary/10' : 'border-white/5 bg-black/20'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-primary/60 font-mono text-[8px] uppercase">{section.type}</span>
                      <span className="font-display uppercase tracking-widest text-[11px] truncate w-40">{section.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${section.isActive ? 'bg-green-500 shadow-[0_0_10px_green]' : 'bg-red-500 shadow-[0_0_10px_red]'}`} />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>

        {/* Right Editor */}
        <div className="relative min-h-[700px]">
          <AnimatePresence mode="wait">
            {editingSection ? (
              <motion.div 
                key={editingSection._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card border-primary/20 bg-black/60 overflow-hidden flex flex-col h-full"
              >
                {/* Tabs */}
                <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto">
                  {["identity", "design", "content", "motion", "elements", "language"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted hover:text-text'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleUpdateSection} className="p-8 flex-1 overflow-y-auto space-y-8 max-h-[70vh]">
                  {/* Identity Tab */}
                  {activeTab === "identity" && (
                    <div className="grid grid-cols-2 gap-8">
                       <Field label="Section Name" value={editingSection.name} onChange={(v) => setEditingSection({...editingSection, name: v})} />
                       <Field label="URL Slug" value={editingSection.slug} onChange={(v) => setEditingSection({...editingSection, slug: v})} />
                       <Select label="Module Type" value={editingSection.type} options={SECTION_TYPES} onChange={(v) => setEditingSection({...editingSection, type: v})} />
                       <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-lg h-[64px] mt-auto">
                          <label className="text-[10px] uppercase tracking-widest text-muted">Visibility</label>
                          <input type="checkbox" checked={editingSection.isActive} onChange={(e) => setEditingSection({...editingSection, isActive: e.target.checked})} className="w-5 h-5 accent-primary" />
                       </div>
                    </div>
                  )}

                  {/* Design Tab */}
                  {activeTab === "design" && (
                    <div className="grid grid-cols-2 gap-8">
                       <Select label="Layout Architecture" value={editingSection.design.layout} options={LAYOUTS} onChange={(v) => setEditingSection({...editingSection, design: {...editingSection.design, layout: v}})} />
                       <Field label="Background Hex" value={editingSection.design.backgroundColor} onChange={(v) => setEditingSection({...editingSection, design: {...editingSection.design, backgroundColor: v}})} />
                       <FileField label="Background Image" current={editingSection.design.backgroundImage} onChange={(f) => setEditingSection({...editingSection, bgFile: f})} />
                       <div className="space-y-6">
                         <label className="text-[10px] uppercase tracking-widest text-muted block">Overlay Opacity ({editingSection.design.overlayOpacity})</label>
                         <input type="range" min="0" max="1" step="0.1" value={editingSection.design.overlayOpacity} onChange={(e) => setEditingSection({...editingSection, design: {...editingSection.design, overlayOpacity: parseFloat(e.target.value)}})} className="w-full accent-primary" />
                         <Select label="Container Spacing" value={editingSection.design.spacing} options={['none', 'compact', 'default', 'spacious']} onChange={(v) => setEditingSection({...editingSection, design: {...editingSection.design, spacing: v}})} />
                       </div>
                    </div>
                  )}

                  {/* Motion Tab (NEW) */}
                  {activeTab === "motion" && (
                    <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4">
                       <div className="space-y-6">
                          <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Entrance Protocol</h4>
                          <Select label="Animation Preset" value={editingSection.motion.preset} options={MOTION_PRESETS} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, preset: v}})} />
                          <div className="grid grid-cols-2 gap-4">
                             <Field label="Duration (sec)" type="number" value={editingSection.motion.duration} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, duration: parseFloat(v)}})} compact />
                             <Field label="Delay (sec)" type="number" value={editingSection.motion.delay} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, delay: parseFloat(v)}})} compact />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <Field label="Stiffness (Phys)" type="number" value={editingSection.motion.stiffness} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, stiffness: parseInt(v)}})} compact />
                             <Field label="Damping (Phys)" type="number" value={editingSection.motion.damping} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, damping: parseInt(v)}})} compact />
                          </div>
                       </div>
                       <div className="space-y-6">
                          <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Interactive Logic</h4>
                          <Select label="Hover Effect" value={editingSection.motion.hoverEffect} options={HOVER_EFFECTS} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, hoverEffect: v}})} />
                          <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-lg h-[64px]">
                            <label className="text-[10px] uppercase tracking-widest text-muted">Cursor Reactive</label>
                            <input type="checkbox" checked={editingSection.motion.cursorReactive} onChange={(e) => setEditingSection({...editingSection, motion: {...editingSection.motion, cursorReactive: e.target.checked}})} className="w-5 h-5 accent-primary" />
                          </div>
                          <Field label="Parallax Intensity" type="number" value={editingSection.motion.parallaxIntensity} onChange={(v) => setEditingSection({...editingSection, motion: {...editingSection.motion, parallaxIntensity: parseFloat(v)}})} />
                       </div>
                    </div>
                  )}

                  {/* Content Tab */}
                  {activeTab === "content" && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-8">
                          <Field label="Primary Title" value={editingSection.content.title} onChange={(v) => setEditingSection({...editingSection, content: {...editingSection.content, title: v}})} />
                          <Field label="Support Subtitle" value={editingSection.content.subtitle} onChange={(v) => setEditingSection({...editingSection, content: {...editingSection.content, subtitle: v}})} />
                       </div>
                       <TextArea label="Narrative" value={editingSection.content.description} onChange={(v) => setEditingSection({...editingSection, content: {...editingSection.content, description: v}})} />
                       <div className="grid grid-cols-2 gap-8">
                          <FileField label="Main Media Asset" current={editingSection.content.mainMedia} onChange={(f) => setEditingSection({...editingSection, mediaFile: f})} />
                          <Select label="Media Type" value={editingSection.content.mediaType} options={['image', 'video', '3d']} onChange={(v) => setEditingSection({...editingSection, content: {...editingSection.content, mediaType: v}})} />
                       </div>
                    </div>
                  )}

                  {/* Elements Tab */}
                  {activeTab === "elements" && (
                    <div className="space-y-8">
                       <div className="flex justify-between items-center">
                          <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Component Elements</h4>
                          <button type="button" onClick={handleAddItem} className="text-[8px] uppercase tracking-widest border border-primary/40 px-3 py-1 rounded hover:bg-primary/10">+ New Element</button>
                       </div>
                       {editingSection.content.items.map((item, idx) => (
                         <div key={idx} className="p-6 border border-white/5 bg-white/5 rounded-xl grid grid-cols-[150px,1fr,auto] gap-6 items-start">
                            <FileField label="Item Media" current={item.image} onChange={(f) => handleUpdateItem(idx, 'newImageFile', f)} compact />
                            <div className="grid grid-cols-2 gap-4">
                               <Field label="Title" value={item.title} onChange={(v) => handleUpdateItem(idx, 'title', v)} compact />
                               <Field label="Subtitle" value={item.subtitle} onChange={(v) => handleUpdateItem(idx, 'subtitle', v)} compact />
                               <div className="col-span-2">
                                  <TextArea label="Description" value={item.description} onChange={(v) => handleUpdateItem(idx, 'description', v)} compact rows={2} />
                               </div>
                            </div>
                            <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-400 mt-6">×</button>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Language Tab */}
                  {activeTab === "language" && (
                    <div className="grid grid-cols-2 gap-8">
                       <TranslationBox label="Hindi" data={editingSection.translations.hi} onChange={(d) => setEditingSection({...editingSection, translations: {...editingSection.translations, hi: d}})} />
                       <TranslationBox label="Gujarati" data={editingSection.translations.gu} onChange={(d) => setEditingSection({...editingSection, translations: {...editingSection.translations, gu: d}})} />
                    </div>
                  )}
                </form>

                <div className="p-6 border-t border-white/10 bg-white/5 flex gap-4">
                   <GlowButton type="button" onClick={handleUpdateSection} className="flex-1 h-14" disabled={isSaving}>{isSaving ? "SYNCING MATRIX..." : "ARCHITECT SECTION"}</GlowButton>
                   <button type="button" onClick={() => setEditingSection(null)} className="px-8 h-14 border border-red-500/20 text-red-500 uppercase tracking-widest text-[10px] hover:bg-red-500/5 transition-all">ABORT</button>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card p-20 border border-dashed border-primary/10 flex flex-col items-center justify-center text-muted uppercase tracking-[0.4em] text-xs h-full text-center">
                <div className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center mb-8 animate-pulse text-2xl">💠</div>
                Initiate component selection to begin architecture
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", compact = false }) {
  return (
    <div>
      <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">{label}</label>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} className={`w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none transition-all ${compact ? 'py-2 px-3 text-xs' : ''}`} />
    </div>
  );
}

function TextArea({ label, value, onChange, compact = false, rows = 4 }) {
  return (
    <div>
      <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">{label}</label>
      <textarea rows={rows} value={value || ""} onChange={(e) => onChange(e.target.value)} className={`w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none resize-none transition-all ${compact ? 'py-2 px-3 text-xs' : ''}`} />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs uppercase tracking-widest focus:border-primary outline-none cursor-pointer">
        {options.map(opt => <option key={opt} value={opt} className="bg-surface text-text">{opt.toUpperCase()}</option>)}
      </select>
    </div>
  );
}

function FileField({ label, current, onChange, compact = false }) {
  const [preview, setPreview] = useState(current);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) { setPreview(URL.createObjectURL(file)); onChange(file); }
  };
  return (
    <div className="space-y-3">
      <label className="text-[9px] uppercase tracking-widest text-muted block">{label}</label>
      <div className={`relative border border-dashed border-white/10 rounded-xl overflow-hidden bg-black/40 ${compact ? 'h-32' : 'h-48'}`}>
        {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-muted uppercase tracking-widest">No Asset</div>}
        <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[8px] uppercase text-primary border border-primary/20">Replace</div>
      </div>
    </div>
  );
}

function TranslationBox({ label, data, onChange }) {
  return (
    <div className="space-y-6 p-6 border border-white/5 bg-white/5 rounded-xl">
       <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold border-b border-primary/10 pb-4 mb-4">{label}</h4>
       <Field label="Title" value={data?.title} onChange={(v) => onChange({...data, title: v})} compact />
       <TextArea label="Description" value={data?.description} onChange={(v) => onChange({...data, description: v})} compact rows={6} />
    </div>
  );
}
