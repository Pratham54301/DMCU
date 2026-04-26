"use client";

import { useState } from "react";
import { GlowButton } from "@/components/motion/MotionComponents";
import { apiRequest } from "@/lib/api";

export default function NotificationManagerView() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Blog Alert");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      // Placeholder for actual newsletter broadcast API
      await new Promise(r => setTimeout(r, 2000));
      setStatus("Transmission Sent Successfully");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("Broadcast Error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
         <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Notification Center / Global Broadcast</h3>
         <p className="text-muted text-[8px] uppercase tracking-[0.3em] mt-1">Distribute news and alerts to all neural-linked users</p>
      </div>

      <form onSubmit={handleSend} className="glass-card p-10 border-primary/20 bg-black/40 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">Transmission Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-[10px] uppercase tracking-widest outline-none">
                 {['Blog Alert', 'Trailer Announcement', 'Comic Release', 'System Maintenance'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-muted">Subject Header</label>
              <input 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none"
                placeholder="Transmission Topic..."
                required
              />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-[9px] uppercase tracking-widest text-muted">Core Narrative (Message)</label>
           <textarea 
             rows={8}
             value={message} 
             onChange={e => setMessage(e.target.value)} 
             className="w-full bg-surface/40 border border-white/10 rounded-lg p-3 text-xs focus:border-primary outline-none resize-none"
             placeholder="Synchronize the multiverse with your message..."
             required
           />
        </div>

        <div className="pt-8 flex flex-col items-end gap-4">
           <GlowButton type="submit" className="px-12 h-14" disabled={busy}>
             {busy ? "BROADCASTING..." : "INITIATE TRANSMISSION"}
           </GlowButton>
           {status && <p className="text-[10px] uppercase tracking-widest font-black text-accent animate-pulse">{status}</p>}
        </div>
      </form>
    </div>
  );
}
