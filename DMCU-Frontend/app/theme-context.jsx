"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchJson } from '@/lib/api';
import { hexToRgb, generateColorVariables, getContrastColor, getLuminance } from '@/lib/colorUtils';

const ThemeContext = createContext({
  theme: null,
  refreshTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  const applyTheme = useCallback((themeData) => {
    if (!themeData || !themeData.colors) return;

    const root = document.documentElement;
    const { colors, animations, components, backgroundConfig, backgroundStyles } = themeData;

    // Helper to ensure we have hex for the utility
    const toHex = (val) => {
      if (!val) return "#000000";
      if (val.startsWith('#')) return val;
      const parts = val.split(/[ ,]+/).map(Number);
      if (parts.length === 3) {
        return "#" + parts.map(x => (isNaN(x) ? 0 : x).toString(16).padStart(2, '0')).join('');
      }
      return val;
    };

    // Apply primary/secondary/accent systems
    const primaryHex = toHex(colors.primary);
    const secondaryHex = toHex(colors.secondary);
    const accentHex = toHex(colors.accent);

    Object.entries(generateColorVariables('primary', primaryHex)).forEach(([k, v]) => root.style.setProperty(k, v));
    Object.entries(generateColorVariables('secondary', secondaryHex)).forEach(([k, v]) => root.style.setProperty(k, v));
    Object.entries(generateColorVariables('accent', accentHex)).forEach(([k, v]) => root.style.setProperty(k, v));

    // Backward compatibility for existing components
    root.style.setProperty('--primary-color', hexToRgb(primaryHex));
    root.style.setProperty('--secondary-color', hexToRgb(secondaryHex));
    root.style.setProperty('--accent-color', hexToRgb(accentHex));

    // Dynamic Text Contrast
    const bgHex = toHex(themeData.backgroundStyles?.baseColor || "0 0 0");
    const contrastText = getContrastColor(bgHex);
    
    root.style.setProperty('--text-color', colors.text ? hexToRgb(toHex(colors.text)) : hexToRgb(contrastText));
    root.style.setProperty('--muted-color', hexToRgb(toHex(colors.muted || "#a0a0a0")));
    root.style.setProperty('--surface-color', hexToRgb(toHex(colors.surface || "#121212")));
    root.style.setProperty('--surface-strong', hexToRgb(toHex(colors.surfaceStrong || "#1a1a1a")));

    // Apply Background Configuration
    if (backgroundConfig && backgroundStyles) {
       const { baseColor, gradient1, gradient2, gradient1Position, gradient2Position, intensity } = backgroundStyles;
       
       const baseRgb = hexToRgb(toHex(baseColor));
       const g1Rgb = hexToRgb(toHex(gradient1));
       const g2Rgb = hexToRgb(toHex(gradient2));

       root.style.setProperty('--bg-color', baseRgb);
       
       let bgString = "";
       if (backgroundConfig === 'cosmic') {
          bgString = `
            radial-gradient(circle at ${gradient1Position || '50% 50%'}, rgba(${g1Rgb}, ${intensity || 0.1}), transparent 40%),
            radial-gradient(circle at ${gradient2Position || '50% 50%'}, rgba(${g2Rgb}, ${intensity || 0.1}), transparent 40%),
            rgb(${baseRgb})
          `;
       } else if (backgroundConfig === 'gradient') {
          bgString = `linear-gradient(135deg, rgb(${g1Rgb}), rgb(${g2Rgb}))`;
       } else {
          bgString = `rgb(${baseRgb})`;
       }
       document.body.style.background = bgString;
       document.body.style.backgroundAttachment = "fixed";
    }

    // Apply other settings
    root.setAttribute('data-theme-name', themeData.name);
    root.setAttribute('data-button-style', components?.buttonStyle || 'gold');
    root.setAttribute('data-card-style', components?.cardStyle || 'glass-card');
    root.setAttribute('data-glow-intensity', components?.glowIntensity || 'medium');
    
    // Animation speed
    root.style.setProperty('--animation-speed', `${animations?.speed || 0.5}s`);
  }, []);

  const defaultTheme = {
    name: "Default Cosmic",
    colors: {
      primary: "#d4af37",
      secondary: "#ffd700",
      accent: "#1e90ff",
      text: "#eaeaea",
      muted: "#b0b0b0",
      surface: "#141414",
      surfaceStrong: "#1e1e1e"
    },
    backgroundStyles: {
      baseColor: "#08080c"
    },
    animations: { speed: 0.5 },
    components: {
      buttonStyle: "gold",
      cardStyle: "glass-card",
      glowIntensity: "medium"
    }
  };

  const refreshTheme = useCallback(async () => {
    try {
      const activeTheme = await fetchJson('/api/theme/active');
      if (activeTheme && activeTheme.colors) {
        setTheme(activeTheme);
        applyTheme(activeTheme);
      } else {
        setTheme(defaultTheme);
        applyTheme(defaultTheme);
      }
    } catch (error) {
      console.error('Failed to fetch active theme:', error);
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, [applyTheme]);

  useEffect(() => {
    refreshTheme();
  }, [refreshTheme]);

  return (
    <ThemeContext.Provider value={{ theme, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
