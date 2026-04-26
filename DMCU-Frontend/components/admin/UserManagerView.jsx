"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { getStoredAdminSession } from "@/lib/admin-auth";
import { GlowButton } from "@/components/motion/MotionComponents";

export default function UserManagerView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const session = getStoredAdminSession();
      const res = await apiRequest("/api/users", {
        headers: { Authorization: `Bearer ${session?.token}` }
      });
      if (res.success) setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, data) => {
    try {
      const session = getStoredAdminSession();
      const res = await apiRequest(`/api/users/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.token}` },
        body: JSON.stringify(data)
      });
      if (res.success) {
        setUsers(users.map(u => u._id === userId ? res.data : u));
        setIsEditing(false);
        setSelectedUser(null);
      }
    } catch (err) {
      alert("Failed to update user identity.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to erase this identity from the multiverse?")) return;
    try {
      const session = getStoredAdminSession();
      const res = await apiRequest(`/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.token}` }
      });
      if (res.success) setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
       console.error(err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u._id.includes(search)
  );

  if (loading) return <div className="p-10 text-primary animate-pulse uppercase tracking-[0.4em]">Decrypting Neural Identities...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-2">Neural Network / Registered Users</h3>
            <div className="text-[9px] uppercase tracking-widest text-muted">Total Identities: {users.length} | Active Sessions: {users.filter(u => u.status === 'active').length}</div>
         </div>
         
         <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search by name, email, or nexus id..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs uppercase tracking-widest outline-none focus:border-primary/50 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-xs">🔍</div>
         </div>
      </div>

      {/* Main Table */}
      <div className="glass-card border-white/5 bg-black/40 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                     <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-primary font-black">Identity</th>
                     <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-primary font-black">Subscription</th>
                     <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-primary font-black">Metrics</th>
                     <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-primary font-black">Status</th>
                     <th className="p-6 text-[9px] uppercase tracking-[0.3em] text-primary font-black text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredUsers.map(user => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                       <td className="p-6">
                          <div className="flex items-center gap-4">
                             <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-black transition-all shadow-glow-sm">
                                   {user.name?.[0]}
                                </div>
                                {user.role === 'admin' && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black rounded-full flex items-center justify-center text-[8px] font-black border-2 border-black">A</div>
                                )}
                             </div>
                             <div>
                                <p className="text-sm font-display uppercase tracking-widest text-parchment">{user.name}</p>
                                <p className="text-[9px] text-muted">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          <div className="space-y-1">
                             <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-black border ${
                                user.subscription?.plan === 'vanguard' ? 'border-primary text-primary bg-primary/10' : 
                                user.subscription?.plan === 'premium' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 
                                'border-white/20 text-muted bg-white/5'
                             }`}>
                                {user.subscription?.plan || 'Free Tier'}
                             </span>
                             <p className="text-[8px] text-muted uppercase tracking-widest mt-1">Status: {user.subscription?.status || 'Active'}</p>
                          </div>
                       </td>
                       <td className="p-6">
                          <div className="flex gap-4">
                             <div className="text-center">
                                <p className="text-[8px] text-muted uppercase tracking-widest">Read</p>
                                <p className="text-xs font-bold text-parchment">{user.readingProgress?.length || 0}</p>
                             </div>
                             <div className="text-center">
                                <p className="text-[8px] text-muted uppercase tracking-widest">Points</p>
                                <p className="text-xs font-bold text-primary">{user.rewards?.points || 0}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-black border ${
                             user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                             user.status === 'suspended' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                             'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          }`}>
                            {user.status}
                          </span>
                       </td>
                       <td className="p-6 text-right space-x-3">
                          <button 
                            onClick={() => { setSelectedUser(user); setIsEditing(true); }}
                            className="text-[9px] uppercase tracking-widest text-primary hover:text-white transition-all bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20"
                          >
                             Control
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-[9px] uppercase tracking-widest text-muted hover:text-red-500 transition-all"
                          >
                             Erase
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* User Editor Modal */}
      <AnimatePresence>
        {isEditing && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="w-full max-w-4xl glass-card border-primary/20 bg-surface/40 overflow-hidden"
             >
                <div className="flex justify-between items-center p-8 border-b border-white/10 bg-white/5">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl text-primary font-black shadow-glow">
                         {selectedUser.name?.[0]}
                      </div>
                      <div>
                         <h4 className="text-2xl font-display uppercase tracking-widest text-parchment">{selectedUser.name}</h4>
                         <p className="text-[10px] text-muted uppercase tracking-[0.4em]">{selectedUser._id}</p>
                      </div>
                   </div>
                   <button onClick={() => setIsEditing(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-muted transition-all">✕</button>
                </div>

                <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   {/* Personal Details */}
                   <div className="space-y-6">
                      <h5 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-6">Nexus Profile Settings</h5>
                      
                      <div className="space-y-4">
                         <div>
                            <label className="text-[9px] uppercase tracking-widest text-muted mb-2 block">Display Name</label>
                            <input 
                               type="text" 
                               defaultValue={selectedUser.name} 
                               onBlur={(e) => handleUpdateUser(selectedUser._id, { name: e.target.value })}
                               className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-xs outline-none focus:border-primary/40 transition-all"
                            />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="text-[9px] uppercase tracking-widest text-muted mb-2 block">Access Role</label>
                               <select 
                                 defaultValue={selectedUser.role}
                                 onChange={(e) => handleUpdateUser(selectedUser._id, { role: e.target.value })}
                                 className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-xs outline-none focus:border-primary/40 transition-all uppercase tracking-widest"
                               >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                               </select>
                            </div>
                            <div>
                               <label className="text-[9px] uppercase tracking-widest text-muted mb-2 block">Account Status</label>
                               <select 
                                 defaultValue={selectedUser.status}
                                 onChange={(e) => handleUpdateUser(selectedUser._id, { status: e.target.value })}
                                 className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-xs outline-none focus:border-primary/40 transition-all uppercase tracking-widest"
                               >
                                  <option value="active">Active</option>
                                  <option value="suspended">Suspended</option>
                                  <option value="shadowbanned">Shadowbanned</option>
                               </select>
                            </div>
                         </div>
                      </div>

                      <div className="pt-8 space-y-4">
                         <h5 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-6">Synchronized Plan</h5>
                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => handleUpdateUser(selectedUser._id, { 'subscription.plan': 'vanguard' })}
                              className={`p-4 border rounded-xl text-center transition-all ${selectedUser.subscription?.plan === 'vanguard' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 opacity-50 hover:opacity-100'}`}
                            >
                               <p className="text-[10px] font-black uppercase tracking-widest text-primary">Vanguard</p>
                               <p className="text-[8px] text-muted uppercase tracking-widest mt-1">Unlimited Access</p>
                            </button>
                            <button 
                              onClick={() => handleUpdateUser(selectedUser._id, { 'subscription.plan': 'premium' })}
                              className={`p-4 border rounded-xl text-center transition-all ${selectedUser.subscription?.plan === 'premium' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-white/5 opacity-50 hover:opacity-100'}`}
                            >
                               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Premium</p>
                               <p className="text-[8px] text-muted uppercase tracking-widest mt-1">Advanced Sagas</p>
                            </button>
                         </div>
                      </div>
                   </div>

                   {/* Rewards & Discounts */}
                   <div className="space-y-8">
                      <div className="glass-card bg-primary/5 border-primary/20 p-8">
                         <h5 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-6">Multiverse Rewards</h5>
                         <div className="flex items-center justify-between mb-8">
                            <div>
                               <p className="text-[9px] text-muted uppercase tracking-widest">Neural Points</p>
                               <p className="text-3xl font-display text-primary">{selectedUser.rewards?.points || 0}</p>
                            </div>
                            <button 
                              onClick={() => handleUpdateUser(selectedUser._id, { 'rewards.points': (selectedUser.rewards?.points || 0) + 100 })}
                              className="px-4 py-2 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-lg"
                            >
                               Grant +100
                            </button>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h5 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black">Active Coupons & Discounts</h5>
                         <div className="space-y-3">
                            {(selectedUser.rewards?.coupons || []).map((coupon, i) => (
                              <div key={i} className="flex justify-between items-center p-3 border border-white/5 bg-white/5 rounded-lg">
                                 <div>
                                    <p className="text-[10px] font-bold text-parchment uppercase tracking-widest">{coupon.code}</p>
                                    <p className="text-[8px] text-muted uppercase tracking-widest">{coupon.discount}% Off • {coupon.used ? 'Used' : 'Active'}</p>
                                 </div>
                                 {!coupon.used && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
                              </div>
                            ))}
                            <button 
                              onClick={() => {
                                 const newCoupons = [...(selectedUser.rewards?.coupons || []), { code: `DMCU-SYNC-${Math.floor(Math.random()*1000)}`, discount: 25, type: 'percentage', expiresAt: new Date(Date.now() + 30*24*60*60*1000) }];
                                 handleUpdateUser(selectedUser._id, { 'rewards.coupons': newCoupons });
                              }}
                              className="w-full py-3 border border-dashed border-primary/40 text-primary text-[9px] uppercase tracking-[0.3em] font-black hover:bg-primary/10 transition-all"
                            >
                               Generate Promo Code
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-8 border-t border-white/10 bg-white/5 flex justify-between">
                    <div className="space-y-6 mb-8">
                       <h5 className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-4">Dispatch Opportunity / Neural Alert</h5>
                       <div className="glass-card p-6 border-white/10 bg-black/40 space-y-4">
                          <input 
                            id="oppTitle"
                            type="text" 
                            placeholder="Opportunity Title (e.g. Story Collab Invite)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] outline-none focus:border-primary/40 transition-all"
                          />
                          <textarea 
                            id="oppMsg"
                            placeholder="Message Detail (e.g. We invite you to join the creative council...)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[10px] h-24 outline-none focus:border-primary/40 transition-all resize-none"
                          />
                          <div className="flex gap-4">
                             <select id="oppType" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[8px] uppercase tracking-widest outline-none">
                                <option value="opportunity">Opportunity</option>
                                <option value="announcement">Announcement</option>
                                <option value="ranking">Ranking Alert</option>
                             </select>
                             <button 
                               onClick={async () => {
                                  const title = document.getElementById('oppTitle').value;
                                  const message = document.getElementById('oppMsg').value;
                                  const type = document.getElementById('oppType').value;
                                  if(!title || !message) return alert("Data required for dispatch.");
                                  try {
                                     const session = getStoredAdminSession();
                                     await fetchJson("/api/notifications", {
                                        method: "POST",
                                        headers: { 
                                           'Content-Type': 'application/json',
                                           'Authorization': `Bearer ${session?.token}` 
                                        },
                                        body: JSON.stringify({ userId: selectedUser._id, title, message, type })
                                     });
                                     alert("Opportunity dispatched across the neural link.");
                                     document.getElementById('oppTitle').value = "";
                                     document.getElementById('oppMsg').value = "";
                                  } catch(e) { alert(e.message); }
                               }}
                               className="flex-1 py-3 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:shadow-glow transition-all"
                             >
                                Dispatch Intel
                             </button>
                          </div>
                       </div>
                    </div>
<button onClick={() => handleDeleteUser(selectedUser._id)} className="text-red-500 text-[10px] uppercase tracking-[0.4em] font-black hover:underline">Terminate Identity</button>
                   <GlowButton onClick={() => setIsEditing(false)} className="px-10 h-12 text-[10px]">Close Archive</GlowButton>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
