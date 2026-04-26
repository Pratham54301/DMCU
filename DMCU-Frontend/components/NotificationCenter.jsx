"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson } from "@/lib/api";
import { useUser } from "@/context/UserContext";

export default function NotificationCenter() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("dmcu_user_token");
      const response = await fetchJson("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.success) {
        setNotifications(response.data);
        setUnreadCount(response.data.filter(n => !n.isRead).length);
      }
    } catch (err) {
      console.error("Failed to sync neural alerts", err);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Refresh every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("dmcu_user_token");
      await fetchJson(`/api/notifications/${id}/read`, { 
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "opportunity": return "🎯";
      case "ranking": return "🏆";
      case "alert": return "⚠️";
      case "update": return "⚙️";
      default: return "📢";
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 text-muted hover:text-primary transition-all bg-white/5 rounded-xl border border-white/5 relative"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[8px] font-black flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 sm:w-96 bg-black/90 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                 <h3 className="text-[10px] uppercase tracking-widest font-black text-primary">Neural Link Alerts</h3>
                 <span className="text-[8px] uppercase tracking-widest text-muted">{unreadCount} UNREAD</span>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                 {notifications.length === 0 ? (
                   <div className="p-10 text-center text-muted text-[10px] uppercase tracking-widest">
                      No incoming data packets.
                   </div>
                 ) : (
                   notifications.map((n) => (
                     <div 
                       key={n._id}
                       onClick={() => markAsRead(n._id)}
                       className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 relative group ${!n.isRead ? 'bg-primary/5' : ''}`}
                     >
                        {!n.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                        <div className="flex gap-4">
                           <div className="text-xl">{getIcon(n.type)}</div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-text mb-1 truncate">{n.title}</p>
                              <p className="text-[10px] text-muted leading-relaxed line-clamp-2">{n.message}</p>
                              <div className="mt-2 flex justify-between items-center">
                                 <span className="text-[8px] text-primary/40 uppercase tracking-widest">
                                   {new Date(n.createdAt).toLocaleTimeString()}
                                 </span>
                                 {n.actionLink && (
                                   <a href={n.actionLink} className="text-[8px] uppercase tracking-widest font-black text-primary group-hover:underline">Execute Action &rarr;</a>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                   ))
                 )}
              </div>
              
              <div className="p-3 bg-white/5 border-t border-white/5 text-center">
                 <button className="text-[8px] uppercase tracking-widest text-muted hover:text-primary transition-all">Clear All History</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
