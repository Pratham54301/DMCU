"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import LoadingScreen from "@/components/LoadingScreen";
import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/sections/AboutSection";
import CharactersSection from "@/sections/CharactersSection";
import CTASection from "@/sections/CTASection";
import FooterSection from "@/sections/FooterSection";
import HeroSection from "@/sections/HeroSection";
import TimelineSection from "@/sections/TimelineSection";
import TrailerSection from "@/sections/TrailerSection";
import { fetchJson } from "@/lib/api";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchJson("/api/sections");
        if (response.success) {
          setSections(response.data.filter(s => s.isActive).sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        console.error("Failed to load home sections", err);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    loadData();
  }, []);

  const renderSection = (section) => {
    // Map section types to components
    const componentProps = {
      content: section.content,
      animationType: section.animationType,
      id: section.slug
    };

    const sectionKey = section._id;

    switch (section.type) {
      case 'hero':
        return <HeroSection key={sectionKey} {...componentProps} />;
      case 'about':
        return <AboutSection key={sectionKey} {...componentProps} />;
      case 'lore':
        return <TimelineSection key={sectionKey} {...componentProps} />;
      case 'comic':
        return <CTASection key={sectionKey} {...componentProps} />;
      case 'characters':
        return <CharactersSection key={sectionKey} {...componentProps} />;
      case 'trailer':
        return <TrailerSection key={sectionKey} {...componentProps} />;
      case 'ranking':
        return null;
      case 'custom':
        return <AboutSection key={sectionKey} {...componentProps} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
      ) : (
        <main key="main" className="relative min-h-screen overflow-x-hidden bg-background text-text">
          <CinematicBackdrop />
          <SiteHeader />

          <div className="relative z-10">
            {sections.map(section => renderSection(section))}
            <FooterSection />
          </div>
        </main>
      )}
    </AnimatePresence>
  );
}
