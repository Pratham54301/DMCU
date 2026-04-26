"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function AdminSettingsView() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await apiRequest("/api/settings");
        if (res.success) setSettings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const session = getStoredAdminSession();
      const res = await apiRequest("/api/settings", {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.token}` },
        body: JSON.stringify(settings)
      });
      if (res.success) alert("Multiverse protocols synchronized successfully.");
    } catch (err) {
      alert("Failed to synchronize protocols.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Deciphering Core Protocols...</div>;
  if (!settings) return <div className="p-10 text-red-500 uppercase tracking-widest">Protocol Stream Interrupted.</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Nexus Core / Global Settings</h3>
            <p className="text-muted text-[8px] uppercase tracking-[0.3em] mt-1">Manage the fundamental protocols of the platform</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="glass-card p-10 border-primary/20 bg-black/40 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black border-b border-primary/10 pb-4">General Protocol</h4>
            
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-muted">Platform Name</label>
                  <input 
                    value={settings.siteName} 
                    onChange={e => setSettings({...settings, siteName: e.target.value})} 
                    className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-muted">Contact Interface</label>
                  <input 
                    value={settings.primaryContact} 
                    onChange={e => setSettings({...settings, primaryContact: e.target.value})} 
                    className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none" 
                  />
               </div>
            </div>

            <div className="space-y-6 pt-4">
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <label className="text-[10px] uppercase tracking-widest text-parchment">Maintenance Mode</label>
                  <input 
                    type="checkbox" 
                    checked={settings.maintenanceMode} 
                    onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})} 
                    className="w-5 h-5 accent-primary" 
                  />
               </div>
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <label className="text-[10px] uppercase tracking-widest text-parchment">Public Registration</label>
                  <input 
                    type="checkbox" 
                    checked={settings.registrationOpen} 
                    onChange={e => setSettings({...settings, registrationOpen: e.target.checked})} 
                    className="w-5 h-5 accent-primary" 
                  />
               </div>
            </div>
         </div>

         <div className="glass-card p-10 border-primary/20 bg-black/40 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black border-b border-primary/10 pb-4">Performance & Tracking</h4>
            
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-muted">Google Analytics Stream</label>
                  <input 
                    value={settings.googleAnalyticsId} 
                    onChange={e => setSettings({...settings, googleAnalyticsId: e.target.value})} 
                    className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-muted">Max Media Payload</label>
                  <input 
                    value={settings.maxUploadSize} 
                    onChange={e => setSettings({...settings, maxUploadSize: e.target.value})} 
                    className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none" 
                  />
               </div>
            </div>

            <div className="space-y-6 pt-4">
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <label className="text-[10px] uppercase tracking-widest text-parchment">Neural Cache System</label>
                  <input 
                    type="checkbox" 
                    checked={settings.cacheEnabled} 
                    onChange={e => setSettings({...settings, cacheEnabled: e.target.checked})} 
                    className="w-5 h-5 accent-primary" 
                  />
               </div>
               <GlowButton 
                 onClick={handleSave}
                 disabled={saving}
                 className="w-full h-14 mt-4"
               >
                 {saving ? "SYNCING..." : "SYNC SETTINGS"}
               </GlowButton>
            </div>
         </div>
      </div>
    </div>
  );
}
