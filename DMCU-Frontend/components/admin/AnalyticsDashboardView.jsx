"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";

export default function AnalyticsDashboardView() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const session = getStoredAdminSession();
        if (!session?.token) return;

        const response = await apiRequest("/api/auth/analytics", {
          headers: { Authorization: `Bearer ${session.token}` }
        });
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Aggregating Multiverse Data...</div>;
  if (!stats) return <div className="p-10 text-red-400 uppercase tracking-[0.2em]">Failed to decrypt analytics stream.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard label="Total Synchronized Users" value={stats.counts?.users || 0} icon="👥" />
         <StatCard label="Matrix Transactions" value={stats.counts?.orders || 0} icon="🛒" />
         <StatCard label="Multiverse Revenue" value={`₹${stats.revenue || 0}`} icon="💰" />
         <StatCard label="Lore Artifacts" value={stats.counts?.blogs || 0} icon="📜" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Recent Users */}
         <div className="glass-card border-primary/20 bg-black/40 p-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-8 border-b border-primary/10 pb-4">Recent Neural Syncs</h4>
            <div className="space-y-4">
               {stats.recentUsers?.map(user => (
                 <div key={user._id} className="flex items-center justify-between p-4 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{user.name?.[0] || "?"}</div>
                       <div>
                          <p className="text-xs font-display uppercase tracking-widest">{user.name}</p>
                          <p className="text-[9px] text-muted">{user.email}</p>
                       </div>
                    </div>
                    <span className="text-[8px] text-muted uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* System Performance Heatmap Placeholder */}
         <div className="glass-card border-primary/20 bg-black/40 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center mb-6 animate-spin-slow">
               <div className="w-12 h-12 rounded-full border-t-2 border-primary" />
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-2">Matrix Stability</h4>
            <p className="text-ash text-[10px] leading-relaxed uppercase tracking-widest max-w-xs">AI-driven traffic heatmaps and predictive engagement modeling will appear here in the next update.</p>
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="glass-card border-primary/10 bg-surface/30 p-6 flex items-center justify-between group hover:border-primary/40 transition-all">
       <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-muted mb-2">{label}</p>
          <p className="font-display text-3xl uppercase tracking-widest text-text group-hover:text-primary transition-colors">{value}</p>
       </div>
       <div className="text-3xl opacity-20 group-hover:opacity-100 transition-all duration-500">{icon}</div>
    </div>
  );
}
