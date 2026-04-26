"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminSidebar({ 
  admin, 
  activeTab, 
  setActiveTab, 
  onLogout 
}) {
  const menuItems = [
    { id: 'analytics', label: 'Dashboard Overview', icon: '📊' },
    { id: 'characters', label: 'Character Manager', icon: '🦸' },
    { id: 'sections', label: 'Section Manager', icon: '📐' },
    { id: 'themes', label: 'Theme Engine', icon: '🎨' },
    { id: 'motion', label: 'Motion & Animation', icon: '🎬' },
    { id: 'comics', label: 'Comic Manager', icon: '📚' },
    { id: 'blogs', label: 'Blog Manager', icon: '📰' },
    { id: 'trailers', label: 'Trailer Manager', icon: '📽️' },
    { id: 'rankings', label: 'Ranking Manager', icon: '🏆' },
    { id: 'users', label: 'User Manager', icon: '👤' },
    { id: 'submissions', label: 'User Submissions', icon: '📜' },
    { id: 'seo', label: 'SEO Manager', icon: '🔎' },
    { id: 'notifications', label: 'Notification Center', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-black/80 backdrop-blur-2xl border-r border-white/5 z-50 flex flex-col transition-all duration-500">
      {/* Brand Header */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black text-xl shadow-glow">D</div>
          <div>
            <h1 className="font-display text-lg uppercase tracking-[0.2em] text-parchment leading-none">Nexus CMS</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-primary mt-1 animate-pulse">Multiverse Core</p>
          </div>
        </div>
      </div>

      {/* Admin Profile Mini */}
      <div className="p-6 mx-4 my-6 rounded-2xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">{admin?.name?.[0]}</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-parchment truncate">{admin?.name || "Admin"}</p>
            <p className="text-[8px] text-muted truncate uppercase tracking-tighter">System Overseer</p>
          </div>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 py-4 scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
              activeTab === item.id 
                ? 'bg-primary text-black shadow-glow font-bold' 
                : 'text-ash hover:bg-white/5 hover:text-parchment'
            }`}
          >
            <span className={`text-lg transition-transform duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-125'}`}>{item.icon}</span>
            <span className="text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill" 
                className="absolute inset-0 bg-white/10 mix-blend-overlay"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="p-6 border-t border-white/5 space-y-3">
        <Link href="/" target="_blank" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-[9px] uppercase tracking-[0.2em] text-muted hover:border-primary/40 hover:text-parchment transition-all">
          <span>🌐</span> Launch Public Site
        </Link>
        <button 
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-500 text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/0 hover:shadow-red-500/20"
        >
          <span>🚪</span> Terminate Session
        </button>
      </div>
    </aside>
  );
}
