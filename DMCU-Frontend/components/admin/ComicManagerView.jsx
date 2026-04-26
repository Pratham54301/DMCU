"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchJson, buildMediaUrl } from "@/lib/api";
import { CinematicCard, GlowButton } from "@/components/motion/MotionComponents";

export default function ComicManagerView() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComic, setNewComic] = useState({
    title: "",
    description: "",
    category: "General"
  });
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadComics = async () => {
    try {
      const response = await fetchJson("/api/comics");
      if (response.success) {
        setComics(response.data);
      }
    } catch (err) {
      console.error("Failed to load comics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComics();
  }, []);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleCreateComic = async (e) => {
    e.preventDefault();
    if (!coverImage || !pdfFile) {
        setMessage("Both Cover Image and PDF File are required.");
        return;
    }

    setBusy(true);
    const slug = generateSlug(newComic.title);
    
    const formData = new FormData();
    formData.append("title", newComic.title);
    formData.append("description", newComic.description);
    formData.append("category", newComic.category);
    formData.append("slug", slug);
    formData.append("coverImage", coverImage);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await fetch("/api/comics", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('dmcu-admin-token')}`
        },
        body: formData,
      });
      const result = await response.json();
      
      if (result.success) {
        setShowAddForm(false);
        setNewComic({ title: "", description: "", category: "General" });
        setCoverImage(null);
        setPdfFile(null);
        loadComics();
        setMessage("Comic uploaded successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.message || "Upload failed");
      }
    } catch (err) {
      console.error("Failed to create comic", err);
      setMessage("Upload error");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteComic = async (id) => {
    if (!confirm("Are you sure you want to delete this comic?")) return;
    try {
      await fetchJson(`/api/comics/${id}`, { method: "DELETE" });
      loadComics();
      setMessage("Comic deleted");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete comic", err);
    }
  };

  if (loading) return <div className="p-8 text-primary animate-pulse">Loading comics...</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-widest text-primary">
            Comic Vault (Direct Upload)
          </h2>
          <p className="text-muted text-xs uppercase tracking-widest mt-2">Upload PDFs directly to Cloudinary</p>
        </div>
        <GlowButton onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Upload New PDF Comic"}
        </GlowButton>
      </div>

      {message && <div className="text-accent uppercase tracking-widest text-xs text-center animate-bounce">{message}</div>}

      {showAddForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border border-primary/40">
          <form onSubmit={handleCreateComic} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Comic Title</label>
                <input 
                  type="text" 
                  required
                  value={newComic.title}
                  onChange={(e) => setNewComic({ ...newComic, title: e.target.value })}
                  className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none"
                  placeholder="e.g. The Hidden War: Full Issue"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Category</label>
                <input 
                  type="text" 
                  value={newComic.category}
                  onChange={(e) => setNewComic({ ...newComic, category: e.target.value })}
                  className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Description</label>
                <textarea 
                  rows="4"
                  required
                  value={newComic.description}
                  onChange={(e) => setNewComic({ ...newComic, description: e.target.value })}
                  className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-sm focus:border-primary outline-none resize-none"
                  placeholder="Describe the legend..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">Cover Image Upload</label>
                <input 
                  type="file" 
                  accept="image/*"
                  required
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-xs focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-2">PDF File Upload</label>
                <input 
                  type="file" 
                  accept="application/pdf"
                  required
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full bg-surface/50 border border-primary/20 rounded-lg p-3 text-xs focus:border-primary outline-none"
                />
              </div>

              <div className="pt-6">
                <GlowButton type="submit" className="w-full" disabled={busy}>
                    {busy ? "Uploading to Cloud..." : "Authorize PDF Upload"}
                </GlowButton>
              </div>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {comics.map((comic) => (
          <CinematicCard key={comic._id} className="group overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={buildMediaUrl(comic.coverImage)} alt={comic.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute top-2 right-2">
                <button 
                  onClick={() => handleDeleteComic(comic._id)}
                  className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 border border-red-500/40 flex items-center justify-center hover:bg-red-500 transition-colors hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[10px] text-primary uppercase tracking-widest">{comic.category}</span>
              <h4 className="font-display text-lg uppercase tracking-widest text-text mt-1 truncate">{comic.title}</h4>
              <p className="text-muted text-[10px] mt-2 line-clamp-2">{comic.description}</p>
              <div className="mt-4 text-[10px] text-primary/60 uppercase tracking-widest flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v10h10V2H7zm0 12h10v2H7v-2zm0 4h10v2H7v-2z"/></svg>
                  PDF Cloud-Link
                </span>
                <span>{new Date(comic.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CinematicCard>
        ))}
      </div>
    </div>
  );
}
