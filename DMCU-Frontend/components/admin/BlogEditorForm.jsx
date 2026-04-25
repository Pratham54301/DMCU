"use client";

import { useEffect, useMemo, useState } from "react";
import { buildMediaUrl } from "@/lib/api";

const createDefaultState = () => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  author: "DMCU Sentinel",
  image: null
});

const mapBlogToState = (blog) => ({
  title: blog?.title || "",
  slug: blog?.slug || "",
  excerpt: blog?.excerpt || "",
  content: blog?.content || "",
  tags: Array.isArray(blog?.tags) ? blog.tags.join(", ") : "",
  author: blog?.author || "DMCU Sentinel",
  image: null
});

const buildBlogFormData = (values, mode) => {
  const formData = new FormData();
  formData.append("title", values.title.trim());
  formData.append("slug", values.slug.trim());
  formData.append("excerpt", values.excerpt.trim());
  formData.append("content", values.content.trim());
  formData.append("tags", values.tags.trim());
  formData.append("author", values.author.trim());
  if (values.image) {
    formData.append("image", values.image);
  }
  return formData;
};

export default function BlogEditorForm({ mode, blog, busy, onSubmit, onCancel }) {
  const [values, setValues] = useState(createDefaultState);
  const [errorMessage, setErrorMessage] = useState("");
  const currentImageUrl = useMemo(() => buildMediaUrl(blog?.image), [blog?.image]);

  useEffect(() => {
    setValues(mode === "edit" && blog ? mapBlogToState(blog) : createDefaultState());
    setErrorMessage("");
  }, [blog, mode]);

  const updateValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.title.trim() || !values.excerpt.trim() || !values.content.trim()) {
      setErrorMessage("Title, excerpt, and content are required.");
      return;
    }
    if (mode === "create" && !values.image) {
      setErrorMessage("A cover image is required.");
      return;
    }

    try {
      setErrorMessage("");
      await onSubmit(buildBlogFormData(values, mode));
      if (mode === "create") setValues(createDefaultState());
    } catch (e) {
      setErrorMessage(e.message || "Failed to save the blog.");
    }
  };

  return (
    <section id="editor" className="section-panel glass-card overflow-hidden p-6 sm:p-8">
       <div className="flex flex-col gap-4 border-b border-primary/20 pb-6 sm:flex-row sm:items-center sm:justify-between">
           <div>
               <span className="eyebrow">{mode === "edit" ? "Edit Chronicle" : "Scribe a New Legend"}</span>
               <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.16em] text-primary sm:text-4xl">
                   {mode === "edit" ? `Archiving: ${blog?.title}` : "Open a New Chapter"}
               </h2>
           </div>
           {mode === "edit" && (
               <button type="button" className="ghost-button" onClick={onCancel}>Cancel Revision</button>
           )}
       </div>

       <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
           <div className="grid gap-6 lg:grid-cols-2">
               <label className="block">
                   <span className="admin-label">Title</span>
                   <input type="text" value={values.title} onChange={(e) => updateValue("title", e.target.value)} className="admin-input" placeholder="The Fall of Neo Delhi" />
               </label>
               <label className="block">
                   <span className="admin-label">Slug (Optional)</span>
                   <input type="text" value={values.slug} onChange={(e) => updateValue("slug", e.target.value)} className="admin-input" placeholder="fall-of-neo-delhi" />
               </label>
           </div>
           
           <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
               <label className="block">
                   <span className="admin-label">Author</span>
                   <input type="text" value={values.author} onChange={(e) => updateValue("author", e.target.value)} className="admin-input" />
               </label>
               <label className="block">
                   <span className="admin-label">Tags (comma separated)</span>
                   <input type="text" value={values.tags} onChange={(e) => updateValue("tags", e.target.value)} className="admin-input" placeholder="Lore, Origins, Technology" />
               </label>
           </div>

           <label className="block">
               <span className="admin-label">Excerpt</span>
               <textarea value={values.excerpt} onChange={(e) => updateValue("excerpt", e.target.value)} className="admin-textarea" rows="3" placeholder="A short hook summarizing this entry..." />
           </label>

           <label className="block">
               <span className="admin-label">Full Content (HTML / Markdown supported)</span>
               <textarea value={values.content} onChange={(e) => updateValue("content", e.target.value)} className="admin-textarea" rows="10" placeholder="Once upon a time in the Dharma Mythos..." />
           </label>

           <label className="block lg:w-1/2">
               <span className="admin-label">Cover Image</span>
               <input type="file" accept="image/*" onChange={(e) => updateValue("image", e.target.files?.[0] || null)} className="admin-file-input" />
               {mode === "edit" && currentImageUrl && (
                   <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-primary/20 bg-black/30">
                       <img src={currentImageUrl} alt={blog?.title} className="h-56 w-full object-cover" />
                   </div>
               )}
           </label>

           {errorMessage && <div className="rounded-[1.5rem] border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm leading-7 text-red-100">{errorMessage}</div>}

           <div className="flex flex-wrap gap-4 pt-4 border-t border-primary/20">
               <button type="submit" className="gold-button" disabled={busy}>
                   {busy ? "Scribing..." : mode === "edit" ? "Update Chronicle" : "Publish to Archives"}
               </button>
               <button type="button" className="ghost-button" onClick={() => {
                   setValues(mode === "edit" && blog ? mapBlogToState(blog) : createDefaultState());
                   setErrorMessage("");
               }}>Clear Form</button>
           </div>
       </form>
    </section>
  );
}
