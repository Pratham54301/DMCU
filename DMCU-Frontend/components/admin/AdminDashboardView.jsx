"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar from "@/components/admin/AdminSidebar";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import CharacterEditorForm from "@/components/admin/CharacterEditorForm";
import CharacterManagementList from "@/components/admin/CharacterManagementList";
import BlogEditorForm from "@/components/admin/BlogEditorForm";
import BlogManagementList from "@/components/admin/BlogManagementList";
import ThemeSettingsView from "@/components/admin/ThemeSettingsView";
import SectionManagerView from "@/components/admin/SectionManagerView";
import ComicManagerView from "@/components/admin/ComicManagerView";
import AnalyticsDashboardView from "@/components/admin/AnalyticsDashboardView";
import TrailerManagerView from "@/components/admin/TrailerManagerView";
import SEOManagerView from "@/components/admin/SEOManagerView";
import UserManagerView from "@/components/admin/UserManagerView";
import MotionManagerView from "@/components/admin/MotionManagerView";
import RankingManagerView from "@/components/admin/RankingManagerView";
import NotificationManagerView from "@/components/admin/NotificationManagerView";
import AdminSubmissionViewer from "@/components/admin/AdminSubmissionViewer";
import AdminSettingsView from "@/components/admin/AdminSettingsView";
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

export default function AdminDashboardView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const [reloadKey, setReloadKey] = useState(0);
  const [banner, setBanner] = useState(null);
  const [busy, setBusy] = useState(false);

  // Character States
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);
  
  // Blog States
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const storedSession = getStoredAdminSession();
    if (!storedSession?.token) {
      router.replace("/admin/login");
      return;
    }
    setSession(storedSession);
    setReady(true);
  }, [router]);

  const loadData = useCallback(async () => {
    if (!ready) return;
    try {
      setStatus("loading");
      const [charPayload, blogPayload] = await Promise.all([
        fetchCharactersRequest(),
        fetchBlogsRequest().catch(() => ({ data: [] }))
      ]);
      setCharacters(charPayload.data || []);
      setBlogs(blogPayload.data || []);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setBanner({ type: "error", message: "Failed to synchronize multiverse data." });
    }
  }, [ready]);

  useEffect(() => {
    loadData();
  }, [loadData, reloadKey]);

  const handleLogout = () => {
    clearStoredAdminSession();
    router.replace("/admin/login");
  };

  // Character Actions
  const handleCharacterSubmit = async (formData) => {
    try {
      setBusy(true);
      let res;
      if (editingCharacter) {
        res = await updateCharacterRequest(session.token, editingCharacter._id, formData);
        setBanner({ type: "success", message: `Character ${res.data.name} updated successfully.` });
      } else {
        res = await createCharacterRequest(session.token, formData);
        setBanner({ type: "success", message: `Character ${res.data.name} forged in the archives.` });
      }
      setEditingCharacter(null);
      setReloadKey(k => k + 1);
    } catch (err) {
      throw err;
    } finally {
      setBusy(false);
    }
  };

  const handleCharacterDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this character from existence?")) return;
    try {
      setBusy(true);
      await deleteCharacterRequest(session.token, id);
      setBanner({ type: "success", message: "Character deleted successfully." });
      setReloadKey(k => k + 1);
    } catch (err) {
      setBanner({ type: "error", message: err.message });
    } finally {
      setBusy(false);
    }
  };

  if (!ready || !session?.token) return null;

  return (
    <main className="min-h-screen bg-obsidian text-parchment flex">
      <CinematicBackdrop />
      
      {/* Sidebar - Fixed */}
      <AdminSidebar 
        admin={session.admin} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Main Content - Offset by Sidebar Width */}
      <div className="flex-1 ml-72 p-10 relative z-10 overflow-y-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
             <h2 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-2 animate-in fade-in slide-in-from-left duration-700">System Sector / {activeTab}</h2>
             <h1 className="font-display text-5xl uppercase tracking-widest animate-in fade-in slide-in-from-left duration-1000">
               {activeTab.replace(/([A-Z])/g, ' $1')}
             </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="w-12 h-12 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">🔔</button>
             <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="text-right">
                   <p className="text-[10px] font-bold uppercase tracking-widest">{session.admin.name}</p>
                   <p className="text-[8px] text-primary uppercase tracking-[0.2em]">Master Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent" />
             </div>
          </div>
        </header>

        {banner && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl border ${banner.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' : 'border-red-500/20 bg-red-500/5 text-red-400'} text-[10px] uppercase tracking-widest font-bold flex justify-between items-center`}
          >
            {banner.message}
            <button onClick={() => setBanner(null)}>×</button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {activeTab === "analytics" && <AnalyticsDashboardView />}
            
            {activeTab === "characters" && (
              <div className="space-y-8">
                <CharacterEditorForm 
                  mode={editingCharacter ? "edit" : "create"} 
                  character={editingCharacter}
                  busy={busy} 
                  onSubmit={handleCharacterSubmit} 
                  onCancel={() => setEditingCharacter(null)}
                />
                <CharacterManagementList 
                  characters={characters} 
                  status={status} 
                  onRefresh={() => setReloadKey(k => k+1)} 
                  onEdit={setEditingCharacter}
                  onDelete={handleCharacterDelete}
                />
              </div>
            )}

            {activeTab === "blogs" && (
              <div className="space-y-8">
                <BlogEditorForm mode="create" busy={false} onSubmit={() => setReloadKey(k => k+1)} />
                <BlogManagementList blogs={blogs} status={status} />
              </div>
            )}

            {activeTab === "themes" && <ThemeSettingsView />}
            {activeTab === "sections" && <SectionManagerView />}
            {activeTab === "comics" && <ComicManagerView />}
            {activeTab === "trailers" && <TrailerManagerView />}
            {activeTab === "seo" && <SEOManagerView />}
            {activeTab === "users" && <UserManagerView />}
            {activeTab === "motion" && <MotionManagerView />}
            {activeTab === "rankings" && <RankingManagerView />}
            {activeTab === "notifications" && <NotificationManagerView />}
            {activeTab === "submissions" && <AdminSubmissionViewer />}
            {activeTab === "settings" && <AdminSettingsView />}
            
            {/* Placeholders for new tabs */}
            {['future_module'].includes(activeTab) && (
              <div className="glass-card p-20 border border-dashed border-primary/20 flex flex-col items-center justify-center text-center">
                 <div className="text-6xl mb-6 opacity-20">⚙️</div>
                 <h3 className="font-display text-2xl uppercase tracking-widest text-primary mb-4">{activeTab} Manager</h3>
                 <p className="text-ash text-xs uppercase tracking-[0.3em] max-w-md leading-relaxed">
                   The architecture for this module is being synchronized with the Nexus Core. 
                   Full administrative control will be live in the next protocol update.
                 </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
