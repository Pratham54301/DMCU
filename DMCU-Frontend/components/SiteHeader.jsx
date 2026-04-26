"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";
import { useLanguage } from "@/app/language-context";
import { useUser } from "@/context/UserContext";
import { fetchJson } from "@/lib/api";
import GlobalSearchModal from "./GlobalSearchModal";
import AuthModals from "./AuthModals";
import NotificationCenter from "./NotificationCenter";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigation, setNavigation] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  
  const { language, changeLanguage } = useLanguage();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const loadNav = async () => {
      try {
        const response = await fetchJson("/api/sections");
        if (response.success) {
          const activeNav = response.data
            .filter(s => s.isActive)
            .sort((a, b) => a.order - b.order)
            .map(s => {
              let href = `/#${s.slug}`;
              if (s.slug === 'home') href = '/';
              else if (s.type === 'comic') href = '/comic';
              else if (s.type === 'blog') href = '/#blog';
              else if (s.type === 'characters') href = '/#characters';
              else if (s.type === 'timeline') href = '/#timeline';
              else if (s.type === 'ranking') href = '/#ranking';
              else if (s.type === 'trailer') href = '/#trailer';
              return { label: s.name, href };
            });
          setNavigation(activeNav);
        }
      } catch (err) {
        setNavigation([
          { label: "Home", href: "/" },
          { label: "Characters", href: "/characters" },
          { label: "Timeline", href: "/timeline" },
          { label: "Comic", href: "/comic" },
          { label: "Blog", href: "/blog" },
        ]);
      }
    };

    loadNav();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${
        isScrolled ? "bg-black/80 border-b border-primary/20 backdrop-blur-3xl py-3 shadow-2xl" : "bg-transparent py-6"
      }`}>
        <Container className="px-6">
          <div className="flex items-center justify-between gap-8">
            
            {/* Logo */}
            <Link href="/" className="group relative z-10">
              <span className="font-display text-3xl tracking-[0.4em] text-primary transition-all group-hover:text-secondary glow-text">DMCU</span>
              <div className="absolute -inset-2 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-[10px] uppercase tracking-[0.3em] text-ash hover:text-primary transition-all relative group font-bold">
                  {item.label}
                  <span className="absolute bottom-[-6px] left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full shadow-glow" />
                </Link>
              ))}
            </nav>

            {/* Utilities */}
            <div className="flex items-center gap-4 lg:gap-8 relative z-10">
                
                <NotificationCenter />

                {/* Search */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 text-muted hover:text-primary transition-all hover:scale-110 active:scale-90 bg-white/5 rounded-xl border border-white/5"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>

                {/* User / Auth */}
                <div className="flex items-center gap-4">
                  {user ? (
                    <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                       <Link href="/dashboard" className="flex flex-col items-end hidden sm:flex hover:opacity-80 transition-opacity">
                          <span className="text-[8px] uppercase tracking-widest text-primary font-black">Neural Link Active</span>
                          <span className="text-[10px] font-display uppercase tracking-widest text-text truncate max-w-[120px]">{user.name}</span>
                       </Link>
                       <div className="relative group">
                          <button className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 p-0.5 hover:border-primary transition-all overflow-hidden shadow-glow-sm">
                             {user.profileImage ? <img src={user.profileImage} className="w-full h-full object-cover rounded-lg" /> : <div className="w-full h-full flex items-center justify-center text-primary text-sm font-bold">{user.name[0]}</div>}
                          </button>
                          {/* Mini Dropdown */}
                          <div className="absolute top-full right-0 mt-4 w-48 bg-black/90 border border-white/10 backdrop-blur-2xl p-2 rounded-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                             <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-[9px] uppercase tracking-widest text-muted hover:text-primary hover:bg-white/5 transition-all">Profile Dashboard</Link>
                             <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-[9px] uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all border-t border-white/5 mt-1">Disconnect Link</button>
                          </div>
                       </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setAuthModal({ open: true, mode: 'login' })}
                      className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-black text-muted hover:text-primary transition-all py-2.5 px-6 border border-white/10 rounded-xl hover:border-primary/40"
                    >
                      Initialize Link
                    </button>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2.5 text-primary hover:bg-primary/10 rounded-xl transition-all"
                  aria-label="Menu"
                >
                  <div className="w-6 space-y-1.5">
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </button>
            </div>
          </div>
        </Container>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] lg:hidden"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-[80vw] sm:w-[350px] bg-obsidian border-l border-primary/20 z-[80] lg:hidden p-10 flex flex-col"
              >
                <div className="flex justify-between items-center mb-16">
                  <span className="font-display text-2xl tracking-widest text-primary">NEXUS</span>
                  <button onClick={toggleMobileMenu} className="p-2 text-primary hover:bg-primary/10 rounded-full">×</button>
                </div>
                
                <nav className="flex-1 space-y-8">
                  {navigation.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      onClick={toggleMobileMenu}
                      className="block text-lg uppercase tracking-[0.3em] text-ash hover:text-primary transition-all font-display"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-10 border-t border-white/10 space-y-6">
                   <div className="flex gap-4">
                      {["en", "hi", "gu"].map(lang => (
                        <button key={lang} onClick={() => changeLanguage(lang)} className={`flex-1 py-3 rounded-xl border border-white/10 text-[10px] uppercase font-bold ${language === lang ? "bg-primary text-black" : "text-muted"}`}>{lang}</button>
                      ))}
                   </div>
                   {!user && (
                     <button onClick={() => { setAuthModal({ open: true, mode: 'login' }); toggleMobileMenu(); }} className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl shadow-glow">Initialize Neural Link</button>
                   )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Overlays */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModals isOpen={authModal.open} onClose={() => setAuthModal({ ...authModal, open: false })} initialMode={authModal.mode} />
    </>
  );
}
