"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fetchJson } from "@/lib/api";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function StorySubmissionForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "story",
    contactDetails: {
      email: "",
      discord: "",
      phone: ""
    }
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const token = localStorage.getItem("dmcu_user_token");
      const response = await fetchJson("/api/submissions", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (response.success) {
        setStatus("success");
        setMessage("Your intellectual property has been successfully synchronized with the DMCU Vaults. Our architects will review it shortly.");
        setFormData({ title: "", content: "", type: "story", contactDetails: { email: "", discord: "", phone: "" } });
      }
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Encryption failure during data synchronization.");
    }
  };

  return (
    <div className="glass-card p-8 border border-primary/20">
      <div className="mb-8">
         <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-2">Creative Portal</h3>
         <h2 className="font-display text-3xl uppercase tracking-widest text-text">Forge Your Legend</h2>
         <p className="text-muted text-xs uppercase tracking-widest mt-4 leading-relaxed max-w-xl">
           Share your story ideas, character blueprints, or lore expansions. 
           Approved contributions may be eligible for monetization, revenue-sharing, or exclusive DMCU creative roles.
         </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                  <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Intel Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="admin-input py-4"
                    placeholder="The Siege of Neo-Varanasi"
                  />
               </div>
               <div>
                  <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Submission Class</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="admin-input py-4"
                  >
                     <option value="story">Core Narrative (Story)</option>
                     <option value="character">Character Blueprint</option>
                     <option value="lore">Lore Expansion</option>
                     <option value="collab">Creative Collaboration</option>
                  </select>
               </div>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Contact Link (Discord/Email)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.contactDetails.email}
                    onChange={(e) => setFormData({...formData, contactDetails: { ...formData.contactDetails, email: e.target.value }})}
                    className="admin-input py-4"
                    placeholder="your-id#1234 or email@nexus.com"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Optional Mobile</label>
                    <input 
                      type="text" 
                      value={formData.contactDetails.phone}
                      onChange={(e) => setFormData({...formData, contactDetails: { ...formData.contactDetails, phone: e.target.value }})}
                      className="admin-input py-4 text-xs"
                      placeholder="+91..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Secondary Link</label>
                    <input 
                      type="text" 
                      value={formData.contactDetails.discord}
                      onChange={(e) => setFormData({...formData, contactDetails: { ...formData.contactDetails, discord: e.target.value }})}
                      className="admin-input py-4 text-xs"
                      placeholder="e.g. Portfolio URL"
                    />
                  </div>
               </div>
            </div>
         </div>

         <div>
            <label className="text-[9px] uppercase tracking-widest text-muted block mb-2">Intel Data (Draft / Concept)</label>
            <textarea 
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="admin-textarea p-6 text-sm"
              placeholder="Decrypt your story concept here. Be as detailed as possible regarding plot hooks, character arcs, or mythological integration..."
            />
         </div>

         {status === "success" && (
           <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] uppercase tracking-widest font-black text-center">
             {message}
           </div>
         )}
         
         {status === "error" && (
           <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] uppercase tracking-widest font-black text-center">
             {message}
           </div>
         )}

         <div className="flex justify-center">
            <GlowButton 
              type="submit" 
              disabled={status === "submitting"}
              className="px-20 h-14"
            >
              {status === "submitting" ? "SYNCHRONIZING..." : "EXECUTE SUBMISSION"}
            </GlowButton>
         </div>
      </form>
    </div>
  );
}
