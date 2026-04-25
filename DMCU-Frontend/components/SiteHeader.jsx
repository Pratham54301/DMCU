"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import GlowLink from "@/components/GlowLink";
import { useLanguage } from "@/app/language-context";
import { fetchJson } from "@/lib/api";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigation, setNavigation] = useState([]);
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const loadNav = async () => {
      try {
        const response = await fetchJson("/api/sections");
        if (response.success) {
          // Filter only active sections and sort by order
          const activeNav = response.data
            .filter(s => s.isActive)
            .sort((a, b) => a.order - b.order)
            .map(s => {
              let href = `/${s.slug}`;
              if (s.slug === 'home') href = '/';
              else if (['about', 'characters', 'timeline', 'trailer', 'lore', 'ranking'].includes(s.type)) href = `/#${s.slug}`;
              
              return {
                label: s.name,
                href: href
              };
            });
          setNavigation(activeNav);
        }
      } catch (err) {
        console.error("Nav fetch failed", err);
        // Fallback
        setNavigation([
          { label: "Home", href: "/" },
          { label: "Lore & Sagas", href: "/blog" },
          { label: "Trailer", href: "/#trailer" },
        ]);
      }
    };

    loadNav();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-surface/90 border-b border-primary/10 backdrop-blur-xl shadow-panel" : "bg-transparent"
    }`}>
      <Container className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="font-display text-xl tracking-[0.4em] text-primary transition hover:text-secondary">
            DMCU
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="navbar-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center rounded-full border border-primary/20 bg-surface/50 p-1">
                 <button onClick={() => changeLanguage("en")} className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full transition-colors ${language === "en" ? "bg-primary text-black" : "text-muted hover:text-white"}`}>EN</button>
                 <button onClick={() => changeLanguage("hi")} className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full transition-colors ${language === "hi" ? "bg-primary text-black" : "text-muted hover:text-white"}`}>HI</button>
                 <button onClick={() => changeLanguage("gu")} className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full transition-colors ${language === "gu" ? "bg-primary text-black" : "text-muted hover:text-white"}`}>GU</button>
              </div>

              <GlowLink href="/#trailer" variant="secondary" className="hidden sm:inline-flex">
                Watch Trailer
              </GlowLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
