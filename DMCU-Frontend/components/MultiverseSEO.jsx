"use client";

import { useEffect } from "react";

export default function MultiverseSEO({ title, description, image, url }) {
  const fullTitle = `${title} | DMCU Multiverse`;
  const fullDesc = description || "Explore the ultimate digital multiverse. Characters, Lore, Comics, and interactive saga mapping.";
  const fullImage = image || "/og-image.jpg";
  const fullUrl = url || "https://dmcu.live";

  useEffect(() => {
    document.title = fullTitle;
    
    // Update Meta Tags
    const updateTag = (selector, attr, content) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };

    updateTag('meta[name="description"]', 'content', fullDesc);
    updateTag('meta[property="og:title"]', 'content', fullTitle);
    updateTag('meta[property="og:description"]', 'content', fullDesc);
    updateTag('meta[property="og:image"]', 'content', fullImage);
    updateTag('meta[property="og:url"]', 'content', fullUrl);
    updateTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateTag('meta[name="twitter:description"]', 'content', fullDesc);
  }, [fullTitle, fullDesc, fullImage, fullUrl]);

  return null; // Side-effect only component
}
