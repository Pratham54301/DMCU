"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";
import { GlowButton } from "@/components/motion/MotionComponents";
import { apiRequest, fetchJson } from "@/lib/api";
import StorySubmissionForm from "@/components/StorySubmissionForm";

export default function UserDashboardView({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    comicsRead: user.readingProgress?.length || 0,
    votesCast: user.reputation || 0,
    achievements: user.achievements?.length || 0,
    daysActive: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
  });

  const tabs = [
    { id: 'overview', label: 'Neural Status', icon: '🧠' },
    { id: 'favorites', label: 'Saved Artifacts', icon: '⭐' },
    { id: 'history', label: 'Mission Log', icon: '📜' },
    { id: 'achievements', label: 'Milestones', icon: '🏆' },
    { id: 'opportunities', label: 'Nexus Opportunities', icon: '🎯' },
    { id: 'submissions', label: 'Intel Sharing', icon: '📜' },
    { id: 'settings', label: 'Personalization', icon: '⚙️' },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-12 items-start">
        
        {/* Sidebar Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-10 border-primary/20 bg-black/60 sticky top-32"
        >
          <div className="flex flex-col items-center text-center">
             <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000" />
                <div className="relative w-32 h-32 rounded-full border-2 border-primary/30 bg-black p-1">
                   {user.profileImage ? (
                     <img src={user.profileImage} className="w-full h-full object-cover rounded-full" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-primary text-5xl font-black">{user.name[0]}</div>
                   )}
                </div>
                <div className="absolute -bottom-2 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] border-2 border-black">✅</div>
             </div>
             
             <h2 className="font-display text-2xl uppercase tracking-widest text-parchment">{user.name}</h2>
             <p className="text-[10px] uppercase tracking-[0.4em] text-primary mt-2 font-black">Neural ID: {user._id.slice(-8)}</p>
             <p className="text-ash text-[11px] uppercase tracking-widest mt-4 opacity-60 italic">"{user.email}"</p>
             
             <div className="mt-10 w-full space-y-3">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 border ${
                      activeTab === tab.id 
                        ? 'bg-primary/20 border-primary/40 text-primary shadow-glow-sm' 
                        : 'border-white/5 text-muted hover:bg-white/5 hover:text-text'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">{tab.label}</span>
                  </button>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="space-y-10 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {activeTab === 'overview' && (
                <>
                  {/* Status Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     <StatusCard label="Lore Synced" value={stats.comicsRead} icon="📚" color="primary" />
                     <StatusCard label="Neural Rank" value={stats.votesCast} icon="⚡" color="accent" />
                     <StatusCard label="Milestones" value={stats.achievements} icon="💠" color="emerald-400" />
                     <StatusCard label="Sync Cycle" value={`${stats.daysActive}D`} icon="⌛" color="amber-400" />
                  </div>

                  {/* Rank Progression */}
                  <div className="glass-card p-10 border-white/5 bg-white/5">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black">Community Standing</h3>
                        <span className="text-[9px] uppercase tracking-widest text-muted">Tier: Initiate Observer</span>
                     </div>
                     <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '40%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent shadow-glow"
                        />
                     </div>
                     <p className="text-[9px] text-ash mt-4 uppercase tracking-[0.3em]">Sync 60 more lore artifacts to reach <span className="text-primary">Master Chronicler</span> status.</p>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card p-10 border-white/5 bg-white/5">
                     <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-8 pb-4 border-b border-white/5">Recent Transmissions</h3>
                     <div className="space-y-6">
                        {user.readingProgress?.length > 0 ? (
                          user.readingProgress.slice(0, 3).map((p, i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 group hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-6">
                                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-xl">📖</div>
                                   <div>
                                      <p className="text-xs uppercase tracking-widest text-parchment">Lore Synced: {p.comicId?.title || "Classified"}</p>
                                      <p className="text-[9px] text-muted uppercase mt-1">Completion: {p.completed ? "100%" : "Processing..."}</p>
                                   </div>
                                </div>
                                <span className="text-[8px] text-muted uppercase tracking-tighter">{new Date(p.updatedAt).toLocaleDateString()}</span>
                             </div>
                          ))
                        ) : (
                          <div className="text-center py-10 text-muted uppercase tracking-[0.4em] text-[10px]">No activity logs found in the core.</div>
                        )}
                     </div>
                  </div>
                </>
              )}

              {activeTab === 'favorites' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <CategorySection title="Saved Characters" items={user.favorites?.characters} icon="🦸" />
                   <CategorySection title="Stored Sagas" items={user.favorites?.comics} icon="📚" />
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   {user.achievements?.map((ach, i) => (
                     <div key={i} className="glass-card p-8 border-primary/20 bg-primary/5 flex flex-col items-center text-center group hover:bg-primary/10 transition-all">
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-125">🏅</div>
                        <h4 className="text-[10px] uppercase tracking-widest text-parchment font-black">{ach.name || "Vanguard"}</h4>
                        <p className="text-[8px] text-muted mt-2 uppercase tracking-tighter">Awarded: {new Date(ach.date).toLocaleDateString()}</p>
                     </div>
                   ))}
                   <div className="glass-card p-8 border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center text-center opacity-40">
                      <div className="text-4xl mb-4">🔒</div>
                      <h4 className="text-[10px] uppercase tracking-widest">Undiscovered</h4>
                   </div>
                </div>
              )}

              {activeTab === 'opportunities' && (
                <div className="space-y-8">
                   <div className="glass-card p-10 border-primary/20 bg-primary/5">
                      <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-6">Exclusive Neural Invites</h3>
                      <p className="text-muted text-xs uppercase tracking-widest leading-relaxed">
                         Admins have identified your neural patterns as highly valuable. 
                         Check your Notification Center for direct story collaboration invites, earnings offers, and exclusive creative roles.
                      </p>
                   </div>
                   <div className="p-12 border border-dashed border-white/10 rounded-[2rem] text-center">
                      <p className="text-muted uppercase tracking-[0.5em] text-[10px]">No direct opportunities dispatched to your link yet.</p>
                      <p className="text-[8px] text-primary/40 uppercase mt-4 tracking-widest">Increase engagement to unlock platform rewards.</p>
                   </div>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="space-y-12">
                   <StorySubmissionForm />
                   <div className="glass-card p-10 border-white/5 bg-white/5">
                      <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-8 border-b border-white/5 pb-4">Submission Archive</h3>
                      <SubmissionHistory />
                   </div>
                </div>
              )}

              {activeTab === 'settings' && (
                 <div className="glass-card p-12 border-white/5 bg-black/40 space-y-12">
                    <div className="space-y-8">
                       <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black border-b border-white/5 pb-4">Neural Interface Settings</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                             <label className="text-[9px] uppercase tracking-widest text-muted">Core Display Name</label>
                             <input defaultValue={user.name} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs focus:border-primary outline-none transition-all" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] uppercase tracking-widest text-muted">System Language</label>
                             <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[10px] uppercase tracking-widest outline-none">
                                <option>English (Nexus Default)</option>
                                <option>Hindi (Ancient Veda)</option>
                                <option>Gujarati (Merchant Lore)</option>
                             </select>
                          </div>
                       </div>
                    </div>
                    
                    <div className="pt-8 flex justify-between items-center border-t border-white/5">
                       <div className="flex items-center gap-4 text-red-500 hover:text-red-400 cursor-pointer group">
                          <span className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all">⚠️</span>
                          <span className="text-[10px] uppercase tracking-widest font-black">Erase Neural Identity</span>
                       </div>
                       <GlowButton className="px-12 h-14">Save Configurations</GlowButton>
                    </div>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}

function StatusCard({ label, value, icon, color }) {
  return (
    <div className="glass-card p-6 border-white/5 bg-black/40 hover:border-primary/30 transition-all group">
       <div className={`text-2xl mb-4 opacity-40 group-hover:opacity-100 transition-opacity`}>{icon}</div>
       <p className="text-[9px] uppercase tracking-[0.3em] text-muted mb-1">{label}</p>
       <p className={`text-2xl font-display text-${color} tracking-widest`}>{value}</p>
    </div>
  );
}

function CategorySection({ title, items, icon }) {
  return (
    <div className="glass-card p-8 border-white/5 bg-white/5">
       <div className="flex items-center gap-4 mb-8">
          <span className="text-xl">{icon}</span>
          <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black">{title}</h4>
       </div>
       <div className="space-y-4">
          {items?.length > 0 ? items.map((it, i) => (
             <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-center gap-4 hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-xs">💎</div>
                <span className="text-[10px] uppercase tracking-widest">{it.name || it.title || "Archive #"+i}</span>
             </div>
          )) : (
             <p className="text-center py-6 text-[9px] text-muted uppercase tracking-widest">Void Detected</p>
          )}
       </div>
    </div>
  );
}
function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("dmcu_user_token");
        const res = await fetchJson("/api/submissions/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.success) setSubmissions(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="text-center py-10 animate-pulse text-primary text-[10px] uppercase tracking-widest">Accessing Vaults...</div>;

  return (
    <div className="space-y-4">
      {submissions.length === 0 ? (
        <p className="text-center text-muted text-[10px] uppercase tracking-widest py-10">No creative data logs found.</p>
      ) : (
        submissions.map(s => (
          <div key={s._id} className="p-4 border border-white/5 rounded-xl bg-black/20 flex items-center justify-between">
            <div>
               <p className="text-xs font-bold uppercase tracking-widest text-text">{s.title}</p>
               <p className="text-[9px] text-muted uppercase mt-1">Class: {s.type} • {new Date(s.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
              s.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              s.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {s.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
