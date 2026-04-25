"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import CharacterEditorForm from "@/components/admin/CharacterEditorForm";
import CharacterManagementList from "@/components/admin/CharacterManagementList";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import BlogEditorForm from "@/components/admin/BlogEditorForm";
import BlogManagementList from "@/components/admin/BlogManagementList";
import ThemeSettingsView from "@/components/admin/ThemeSettingsView";
import SectionManagerView from "@/components/admin/SectionManagerView";
import ComicManagerView from "@/components/admin/ComicManagerView";
import { clearStoredAdminSession, getStoredAdminSession } from "@/lib/admin-auth";
import {
  createCharacterRequest,
  deleteCharacterRequest,
  fetchCharactersRequest,
  updateCharacterRequest,
  fetchBlogsRequest,
  createBlogRequest,
  updateBlogRequest,
  deleteBlogRequest
} from "@/lib/admin-api";

const isAuthorizationError = (error) =>
  typeof error?.message === "string" && error.message.toLowerCase().includes("not authorized");

export default function AdminDashboardView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [editorMode, setEditorMode] = useState("create");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [banner, setBanner] = useState(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState("characters"); // "characters" or "blogs"

  // Blog states
  const [blogs, setBlogs] = useState([]);
  const [blogStatus, setBlogStatus] = useState("loading");
  const [blogEditorMode, setBlogEditorMode] = useState("create");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogDeletingId, setBlogDeletingId] = useState("");

  useEffect(() => {
    const storedSession = getStoredAdminSession();

    if (!storedSession?.token) {
      router.replace("/admin/login");
      return;
    }

    setSession(storedSession);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const controller = new AbortController();

    const loadData = async () => {
      try {
        setStatus("loading");
        setBlogStatus("loading");
        setErrorMessage("");

        const [charPayload, blogPayload] = await Promise.all([
          fetchCharactersRequest({ signal: controller.signal }).catch(e => { throw e; }),
          fetchBlogsRequest({ signal: controller.signal }).catch(e => { return { data: [] }; }) // Fail graceful if no blogs route yet
        ]);

        setCharacters(Array.isArray(charPayload.data) ? charPayload.data : []);
        setBlogs(Array.isArray(blogPayload.data) ? blogPayload.data : []);
        
        setStatus("success");
        setBlogStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        setStatus("error");
        setBlogStatus("error");
        setErrorMessage(error.message || "Unable to load the library.");
      }
    };

    loadData();

    return () => controller.abort();
  }, [ready, reloadKey]);

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog._id === selectedBlogId) || null,
    [blogs, selectedBlogId]
  );

  const selectedCharacter = useMemo(
    () => characters.find((character) => character._id === selectedCharacterId) || null,
    [characters, selectedCharacterId]
  );

  const heroCount = useMemo(
    () => characters.filter((character) => character.role === "hero").length,
    [characters]
  );
  const villainCount = useMemo(
    () => characters.filter((character) => character.role === "villain").length,
    [characters]
  );

  const handleSessionExpired = () => {
    clearStoredAdminSession();
    router.replace("/admin/login");
  };

  const handleRefresh = () => {
    setReloadKey((currentValue) => currentValue + 1);
  };

  const handleCreateNew = () => {
    if (activeTab === "characters") {
       setEditorMode("create");
       setSelectedCharacterId(null);
    } else {
       setBlogEditorMode("create");
       setSelectedBlogId(null);
    }
    setBanner(null);
    if (typeof window !== "undefined") window.location.hash = "editor";
  };

  const handleEditCharacter = (character) => {
    setEditorMode("edit");
    setSelectedCharacterId(character._id);
    setBanner(null);

    if (typeof window !== "undefined") {
      window.location.hash = "editor";
    }
  };

  const handleSubmitCharacter = async (formData) => {
    try {
      setSaving(true);
      setBanner(null);

      if (editorMode === "edit" && selectedCharacterId) {
        await updateCharacterRequest(session.token, selectedCharacterId, formData);
        setBanner({ type: "success", message: "Character updated successfully." });
      } else {
        await createCharacterRequest(session.token, formData);
        setBanner({ type: "success", message: "Character created successfully." });
      }

      setEditorMode("create");
      setSelectedCharacterId(null);
      handleRefresh();
    } catch (error) {
      if (isAuthorizationError(error)) handleSessionExpired();
      setBanner({ type: "error", message: error.message || "Unable to save this character." });
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogEditorMode("edit");
    setSelectedBlogId(blog._id);
    setBanner(null);
    if (typeof window !== "undefined") window.location.hash = "editor";
  };

  const handleSubmitBlog = async (formData) => {
    try {
      setBlogSaving(true);
      setBanner(null);

      if (blogEditorMode === "edit" && selectedBlogId) {
        await updateBlogRequest(session.token, selectedBlogId, formData);
        setBanner({ type: "success", message: "Blog updated successfully." });
      } else {
        await createBlogRequest(session.token, formData);
        setBanner({ type: "success", message: "Blog created successfully." });
      }

      setBlogEditorMode("create");
      setSelectedBlogId(null);
      handleRefresh();
    } catch (error) {
      if (isAuthorizationError(error)) handleSessionExpired();
      setBanner({ type: "error", message: error.message || "Unable to save this blog." });
      throw error;
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteCharacter = async (character) => {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${character.name}?`)) return;
    try {
      setDeletingId(character._id);
      setBanner(null);
      await deleteCharacterRequest(session.token, character._id);
      if (selectedCharacterId === character._id) {
        setEditorMode("create");
        setSelectedCharacterId(null);
      }
      setBanner({ type: "success", message: `${character.name} was deleted successfully.` });
      handleRefresh();
    } catch (error) {
      if (isAuthorizationError(error)) handleSessionExpired();
      setBanner({ type: "error", message: error.message || "Unable to delete this character." });
    } finally {
      setDeletingId("");
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${blog.title}?`)) return;
    try {
      setBlogDeletingId(blog._id);
      setBanner(null);
      await deleteBlogRequest(session.token, blog._id);
      if (selectedBlogId === blog._id) {
        setBlogEditorMode("create");
        setSelectedBlogId(null);
      }
      setBanner({ type: "success", message: `${blog.title} deleted.` });
      handleRefresh();
    } catch (error) {
      if (isAuthorizationError(error)) handleSessionExpired();
      setBanner({ type: "error", message: error.message || "Unable to delete this blog." });
    } finally {
      setBlogDeletingId("");
    }
  };

  const handleLogout = () => {
    clearStoredAdminSession();
    router.replace("/admin/login");
  };

  if (!ready || !session?.token) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-obsidian text-parchment">
        <CinematicBackdrop />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="section-panel gold-panel px-8 py-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-100/70">Loading Dashboard</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-parchment">
      <CinematicBackdrop />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[300px,1fr]">
          <AdminSidebar
            admin={session.admin}
            totalCharacters={characters.length}
            heroCount={heroCount}
            villainCount={villainCount}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            onCreateNew={handleCreateNew}
          />

          <div className="space-y-6">
            <section id="overview" className="section-panel gold-panel overflow-hidden p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-primary/20 pb-6 mb-6">
                <div>
                  <span className="eyebrow">Dashboard Core</span>
                  <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.16em] text-parchment sm:text-5xl">
                    Command Console
                  </h1>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/" className="ghost-button">
                    Visit Homepage
                  </Link>
                  <Link href="/blog" className="ghost-button">
                    Visit Lore
                  </Link>
                </div>
              </div>

              {/* TABS CONTAINER */}
               <div className="flex gap-4 border-b border-white/10 mx-[-32px] px-8 pb-0 overflow-x-auto hide-scrollbar">
                   <button onClick={() => setActiveTab("characters")} className={`px-4 py-4 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${activeTab === "characters" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-white"}`}>Character Roster</button>
                   <button onClick={() => setActiveTab("blogs")} className={`px-4 py-4 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${activeTab === "blogs" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-white"}`}>Lore Archives</button>
                   <button onClick={() => setActiveTab("themes")} className={`px-4 py-4 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${activeTab === "themes" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-white"}`}>Theme Engine</button>
                   <button onClick={() => setActiveTab("sections")} className={`px-4 py-4 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${activeTab === "sections" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-white"}`}>Section Manager</button>
                   <button onClick={() => setActiveTab("comics")} className={`px-4 py-4 uppercase tracking-widest text-xs font-bold transition-colors whitespace-nowrap ${activeTab === "comics" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-white"}`}>Comic Manager</button>
               </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-100/60">Roster Status</p>
                  <p className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-parchment">
                    {status === "loading" ? "Syncing" : `${characters.length} Profiles`}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ash">
                    The dashboard reads from `GET /api/characters` and shows the current public roster.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-100/60">Upload Support</p>
                  <p className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-parchment">
                    Images + GLB
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ash">
                    Character image uploads are required for new entries. `.glb` model uploads remain optional.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-100/60">Current Admin</p>
                  <p className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-parchment">
                    {session.admin.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ash">{session.admin.email}</p>
                </div>
              </div>
            </section>

            {banner && (
              <div
                className={`rounded-[1.75rem] border px-6 py-5 text-sm leading-7 ${
                  banner.type === "success"
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                    : "border-red-400/20 bg-red-500/10 text-red-100"
                }`}
              >
                {banner.message}
              </div>
            )}

            {activeTab === "characters" && (
              <>
                <CharacterEditorForm
                  mode={editorMode}
                  character={selectedCharacter}
                  busy={saving}
                  onSubmit={handleSubmitCharacter}
                  onCancel={handleCreateNew}
                />

                <CharacterManagementList
                  characters={characters}
                  status={status}
                  errorMessage={errorMessage}
                  deletingId={deletingId}
                  activeCharacterId={selectedCharacterId}
                  onRefresh={handleRefresh}
                  onEdit={handleEditCharacter}
                  onDelete={handleDeleteCharacter}
                />
              </>
            )}

            {activeTab === "blogs" && (
               <div className="space-y-6">
                 <section id="editor" className="section-panel gold-panel p-6 sm:p-8">
                   <BlogEditorForm 
                     mode={blogEditorMode} 
                     blog={selectedBlog} 
                     busy={blogSaving} 
                     onSubmit={handleSubmitBlog} 
                   />
                 </section>

                 <section id="library" className="section-panel gold-panel p-6 sm:p-8">
                   <BlogManagementList 
                     blogs={blogs} 
                     status={blogStatus} 
                     onEdit={handleEditBlog} 
                     onDelete={handleDeleteBlog} 
                     deletingId={blogDeletingId} 
                   />
                 </section>
               </div>
            )}

             {activeTab === "themes" && (
                <div className="space-y-6">
                  <section className="section-panel gold-panel p-6 sm:p-8">
                     <ThemeSettingsView />
                  </section>
                </div>
             )}

             {activeTab === "sections" && (
                <div className="space-y-6">
                  <section className="section-panel gold-panel p-6 sm:p-8">
                     <SectionManagerView />
                  </section>
                </div>
             )}

             {activeTab === "comics" && (
                <div className="space-y-6">
                  <section className="section-panel gold-panel p-6 sm:p-8">
                     <ComicManagerView />
                  </section>
                </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}
