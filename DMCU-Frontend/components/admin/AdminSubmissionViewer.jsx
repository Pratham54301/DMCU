"use client";

import { useState, useEffect } from "react";
import { fetchJson } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function AdminSubmissionViewer() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  const load = async () => {
    try {
      const session = getStoredAdminSession();
      const res = await fetchJson("/api/submissions/all", {
        headers: { Authorization: `Bearer ${session?.token}` }
      });
      if (res.success) setSubmissions(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const session = getStoredAdminSession();
      const res = await fetchJson(`/api/submissions/${id}/status`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.token}` },
        body: JSON.stringify({ status, adminNotes })
      });
      if (res.success) {
        setSelected(null);
        setAdminNotes("");
        load();
      }
    } catch (err) { alert(err.message); }
  };

  if (loading) return <div className="p-10 animate-pulse text-primary uppercase tracking-[0.4em]">Deciphering Submissions...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
      <div className="space-y-4">
         {submissions.length === 0 ? (
           <div className="glass-card p-20 text-center opacity-40">No intel shared by users yet.</div>
         ) : (
           submissions.map(s => (
             <div 
               key={s._id} 
               onClick={() => setSelected(s)}
               className={`p-6 border rounded-2xl cursor-pointer transition-all ${selected?._id === s._id ? 'bg-primary/10 border-primary' : 'bg-black/40 border-white/5 hover:border-primary/30'}`}
             >
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className="text-[8px] uppercase tracking-widest text-primary font-black px-2 py-0.5 border border-primary/20 rounded-full mb-2 inline-block">{s.type}</span>
                      <h4 className="text-lg font-display uppercase tracking-widest text-parchment">{s.title}</h4>
                      <p className="text-[10px] text-muted uppercase mt-1">From: {s.user?.name} ({s.user?.email})</p>
                   </div>
                   <span className={`text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                      s.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400' :
                      s.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                   }`}>{s.status}</span>
                </div>
                <p className="text-xs text-ash line-clamp-2">{s.content}</p>
             </div>
           ))
         )}
      </div>

      <div className="sticky top-0">
         {selected ? (
           <div className="glass-card p-8 border-primary/20 bg-black/60 space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black border-b border-white/5 pb-4">Intel Analysis</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-[9px] uppercase tracking-widest text-muted block mb-1">Content Draft</label>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs text-ash leading-relaxed max-h-60 overflow-y-auto">
                       {selected.content}
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-[9px] uppercase tracking-widest text-muted block mb-1">Contact Details</label>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-[10px] text-primary uppercase tracking-widest">
                       Email: {selected.contactDetails?.email}<br/>
                       Discord: {selected.contactDetails?.discord}<br/>
                       Phone: {selected.contactDetails?.phone}
                    </div>
                 </div>

                 <div>
                    <label className="text-[9px] uppercase tracking-widest text-muted block mb-1">Admin Response / Opportunity Note</label>
                    <textarea 
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="admin-textarea p-4 text-xs h-32"
                      placeholder="Write feedback or opportunity details..."
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleUpdateStatus(selected._id, 'accepted')} className="py-3 bg-emerald-500 text-black text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-emerald-400 transition-all">Accept Intel</button>
                    <button onClick={() => handleUpdateStatus(selected._id, 'rejected')} className="py-3 bg-red-500 text-white text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-red-400 transition-all">Reject Intel</button>
                 </div>
                 <button onClick={() => handleUpdateStatus(selected._id, 'reviewed')} className="w-full py-3 border border-white/10 text-muted text-[10px] uppercase font-black tracking-widest rounded-xl hover:bg-white/5 transition-all">Mark as Reviewed</button>
              </div>
           </div>
         ) : (
           <div className="glass-card p-20 text-center opacity-20 border-dashed border-white/10 flex flex-col items-center">
              <span className="text-4xl mb-4">📜</span>
              <p className="text-[10px] uppercase tracking-widest">Select an entry to begin decryption</p>
           </div>
         )}
      </div>
    </div>
  );
}
