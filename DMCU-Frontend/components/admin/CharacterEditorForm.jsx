"use client";

import { useEffect, useMemo, useState } from "react";

import { buildMediaUrl } from "@/lib/api";

const createDefaultState = () => ({
  name: "",
  title: "",
  description: "",
  role: "hero",
  category: "hero",
  strength: 50,
  intelligence: 50,
  energy: 50,
  combat: 50,
  quotes: "",
  powers: "",
  backstory_en: "",
  backstory_hi: "",
  backstory_gu: "",
  image: null,
  imageTransparent: null,
  model3d: null,
  removeModel3d: false,
  removeImageTransparent: false
});

const mapCharacterToState = (character) => ({
  name: character?.name || "",
  title: character?.title || "",
  description: character?.description || "",
  role: character?.role || "hero",
  category: character?.category || "hero",
  strength: character?.stats?.strength ?? 50,
  intelligence: character?.stats?.intelligence ?? 50,
  energy: character?.stats?.energy ?? 50,
  combat: character?.stats?.combat ?? 50,
  quotes: Array.isArray(character?.quotes) ? character.quotes.join("|") : "",
  powers: Array.isArray(character?.powers) ? character.powers.join(", ") : "",
  backstory_en: character?.backstory?.en || "",
  backstory_hi: character?.backstory?.hi || "",
  backstory_gu: character?.backstory?.gu || "",
  image: null,
  imageTransparent: null,
  model3d: null,
  removeModel3d: false,
  removeImageTransparent: false
});

const buildCharacterFormData = (values, mode) => {
  const formData = new FormData();

  formData.append("name", values.name.trim());
  formData.append("title", values.title.trim());
  formData.append("description", values.description.trim());
  formData.append("role", values.role);
  formData.append("category", values.category);
  formData.append("stats", JSON.stringify({
      strength: Number(values.strength),
      intelligence: Number(values.intelligence),
      energy: Number(values.energy),
      combat: Number(values.combat)
  }));
  formData.append("quotes", values.quotes);
  formData.append("powers", values.powers);
  formData.append("backstory", JSON.stringify({
      en: values.backstory_en.trim(),
      hi: values.backstory_hi.trim(),
      gu: values.backstory_gu.trim()
  }));

  if (values.image) {
    formData.append("image", values.image);
  }

  if (values.imageTransparent) {
    formData.append("imageTransparent", values.imageTransparent);
  }

  if (values.model3d) {
    formData.append("model3d", values.model3d);
  }

  if (mode === "edit" && values.removeModel3d) {
    formData.append("removeModel3d", "true");
  }

  if (mode === "edit" && values.removeImageTransparent) {
    formData.append("removeImageTransparent", "true");
  }

  return formData;
};

export default function CharacterEditorForm({ mode, character, busy, onSubmit, onCancel }) {
  const [values, setValues] = useState(createDefaultState);
  const [errorMessage, setErrorMessage] = useState("");
  const currentImageUrl = useMemo(() => buildMediaUrl(character?.image), [character?.image]);
  const currentImageTransparentUrl = useMemo(() => buildMediaUrl(character?.imageTransparent), [character?.imageTransparent]);
  const currentModelUrl = useMemo(() => buildMediaUrl(character?.model3d), [character?.model3d]);

  useEffect(() => {
    setValues(mode === "edit" && character ? mapCharacterToState(character) : createDefaultState());
    setErrorMessage("");
  }, [character, mode]);

  const updateValue = (field, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.name.trim() || !values.title.trim() || !values.description.trim()) {
      setErrorMessage("Name, title, and description are required.");
      return;
    }

    if (mode === "create" && !values.image) {
      setErrorMessage("An image is required when creating a character.");
      return;
    }

    try {
      setErrorMessage("");
      await onSubmit(buildCharacterFormData(values, mode));

      if (mode === "create") {
        setValues(createDefaultState());
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to save this character right now.");
    }
  };

  return (
    <section id="editor" className="section-panel gold-panel overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">{mode === "edit" ? "Edit Character" : "Add Character"}</span>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.16em] text-parchment sm:text-4xl">
            {mode === "edit" ? `Update ${character?.name}` : "Forge a new DMCU profile"}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ash sm:text-base">
            Create new characters or revise existing profiles with text, image uploads, and optional `.glb` assets.
          </p>
        </div>

        {mode === "edit" && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel Edit
          </button>
        )}
      </div>

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block">
            <span className="admin-label">Name</span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="admin-input"
              placeholder="Astra Veer"
            />
          </label>

          <label className="block">
            <span className="admin-label">Title</span>
            <input
              type="text"
              value={values.title}
              onChange={(event) => updateValue("title", event.target.value)}
              className="admin-input"
              placeholder="Protector of Neo Delhi"
            />
          </label>
        </div>

        <div className="grid gap-6">
          <label className="block">
            <span className="admin-label">Short Description (Fallback)</span>
            <textarea
              value={values.description}
              onChange={(event) => updateValue("description", event.target.value)}
              className="admin-textarea min-h-[5rem]"
              placeholder="e.g. Master of the mystic arts..."
            />
          </label>

          <div className="glass-card p-4 space-y-4">
             <span className="admin-label text-secondary block border-b border-primary/20 pb-2 mb-4">Multilingual Backstory</span>
             <label className="block">
                <span className="admin-label">English Profile</span>
                <textarea value={values.backstory_en} onChange={(e) => updateValue("backstory_en", e.target.value)} className="admin-textarea min-h-[5rem]" placeholder="The long backstory in English..." />
             </label>
             <label className="block">
                <span className="admin-label">Hindi Profile</span>
                <textarea value={values.backstory_hi} onChange={(e) => updateValue("backstory_hi", e.target.value)} className="admin-textarea min-h-[5rem]" placeholder="The long backstory in Hindi..." dir="auto" />
             </label>
             <label className="block">
                <span className="admin-label">Gujarati Profile</span>
                <textarea value={values.backstory_gu} onChange={(e) => updateValue("backstory_gu", e.target.value)} className="admin-textarea min-h-[5rem]" placeholder="The long backstory in Gujarati..." dir="auto" />
             </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
          <label className="block">
            <span className="admin-label">Role</span>
            <select
              value={values.role}
              onChange={(event) => updateValue("role", event.target.value)}
              className="admin-input"
            >
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
            </select>
          </label>

          <label className="block">
            <span className="admin-label">Detailed Category</span>
            <select
              value={values.category}
              onChange={(event) => updateValue("category", event.target.value)}
              className="admin-input"
            >
              <option value="hero">Hero</option>
              <option value="tech_support">Tech Support</option>
              <option value="villain">Villain</option>
              <option value="villain_followers">Villain Followers</option>
              <option value="grey_character">Grey Character</option>
              <option value="myth_character">Myth Character</option>
              <option value="vishnu_avatar">Vishnu Avatar</option>
              <option value="mother_devtas_avatar">Mother Devtas Avatar</option>
            </select>
          </label>

          <label className="block col-span-1 lg:col-span-2">
            <span className="admin-label">Quotes (Separate with comma ,)</span>
            <input
              type="text"
              value={values.quotes}
              onChange={(event) => updateValue("quotes", event.target.value)}
              className="admin-input"
              placeholder="I am vengeance., Justice never sleeps."
            />
          </label>

          <label className="block col-span-1 lg:col-span-2">
            <span className="admin-label">Powers</span>
            <input
              type="text"
              value={values.powers}
              onChange={(event) => updateValue("powers", event.target.value)}
              className="admin-input"
              placeholder="Flight, Cosmic Armor, Tactical Sight"
            />
          </label>

          <div className="block col-span-1 lg:col-span-2">
             <span className="admin-label mb-2 block">Combat Statistics (0-100)</span>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-white/10 rounded-[1.25rem] bg-surface/30">
               <label className="flex flex-col">
                  <span className="text-xs uppercase text-primary/80 mb-2">Strength: {values.strength}</span>
                  <input type="range" min="0" max="100" value={values.strength} onChange={(e) => updateValue("strength", e.target.value)} className="w-full accent-primary" />
               </label>
               <label className="flex flex-col">
                  <span className="text-xs uppercase text-primary/80 mb-2">Intelligence: {values.intelligence}</span>
                  <input type="range" min="0" max="100" value={values.intelligence} onChange={(e) => updateValue("intelligence", e.target.value)} className="w-full accent-primary" />
               </label>
               <label className="flex flex-col">
                  <span className="text-xs uppercase text-primary/80 mb-2">Energy: {values.energy}</span>
                  <input type="range" min="0" max="100" value={values.energy} onChange={(e) => updateValue("energy", e.target.value)} className="w-full accent-primary" />
               </label>
               <label className="flex flex-col">
                  <span className="text-xs uppercase text-primary/80 mb-2">Combat: {values.combat}</span>
                  <input type="range" min="0" max="100" value={values.combat} onChange={(e) => updateValue("combat", e.target.value)} className="w-full accent-primary" />
               </label>
             </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block">
            <span className="admin-label">Character Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => updateValue("image", event.target.files?.[0] || null)}
              className="admin-file-input"
            />
            {mode === "edit" && currentImageUrl && (
              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                <img src={currentImageUrl} alt={character?.name} className="h-56 w-full object-cover" />
              </div>
            )}
          </label>

          <label className="block">
            <span className="admin-label">Transparent Image (PNG)</span>
            <input
              type="file"
              accept="image/png"
              onChange={(event) => updateValue("imageTransparent", event.target.files?.[0] || null)}
              className="admin-file-input"
            />
            {mode === "edit" && currentImageTransparentUrl && (
              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 relative">
                <img src={currentImageTransparentUrl} alt={character?.name} className="h-56 w-full object-contain mix-blend-screen" />
              </div>
            )}

            {mode === "edit" && character?.imageTransparent && (
              <label className="mt-4 flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-3 text-sm text-ash">
                <input
                  type="checkbox"
                  checked={values.removeImageTransparent}
                  onChange={(event) => updateValue("removeImageTransparent", event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-black/30 text-amber-300 focus:ring-amber-300/30"
                />
                Remove transparent image if no new file is uploaded
              </label>
            )}
          </label>

          <div className="block lg:col-span-2">
            <span className="admin-label">3D Model (.glb, optional)</span>
            <input
              type="file"
              accept=".glb"
              onChange={(event) => updateValue("model3d", event.target.files?.[0] || null)}
              className="admin-file-input"
            />

            {mode === "edit" && currentModelUrl && (
              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-amber-100/60">Current Model</p>
                <a
                  href={currentModelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-amber-100 transition hover:text-parchment"
                >
                  Open uploaded model
                </a>
              </div>
            )}

            {mode === "edit" && character?.model3d && (
              <label className="mt-4 flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-3 text-sm text-ash">
                <input
                  type="checkbox"
                  checked={values.removeModel3d}
                  onChange={(event) => updateValue("removeModel3d", event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-black/30 text-amber-300 focus:ring-amber-300/30"
                />
                Remove the current 3D model if no new file is uploaded
              </label>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-[1.5rem] border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm leading-7 text-red-100">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button 
            type="submit" 
            className="gold-button" 
            disabled={busy || (mode === "create" && (!values.image || !values.imageTransparent || !values.model3d))}
          >
            {busy ? "Saving..." : mode === "edit" ? "Update Character" : "Create Character"}
          </button>

          {mode === "create" && (!values.image || !values.imageTransparent || !values.model3d) && (
            <p className="w-full text-xs text-red-400 uppercase tracking-widest mt-2 animate-pulse">
              Protocol Error: Character Image, Transparent PNG, and 3D Model required for initialization.
            </p>
          )}

          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setValues(mode === "edit" && character ? mapCharacterToState(character) : createDefaultState());
              setErrorMessage("");
            }}
          >
            Reset Form
          </button>
        </div>
      </form>
    </section>
  );
}
