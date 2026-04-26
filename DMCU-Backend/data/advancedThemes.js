const baseThemes = [
  {
    name: "Royal Void",
    colors: { primary: "#d4af37", secondary: "#ffd700", accent: "#1e90ff", text: "#eaeaea", muted: "#b0b0b0", surface: "#141414", surfaceStrong: "#1e1e1e" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#08080c", gradient1: "#d4af37", gradient2: "#1e90ff", gradient1Position: "70% 20%", gradient2Position: "30% 80%", intensity: 0.15 }
  },
  {
    name: "Neon Dharma",
    colors: { primary: "#00ffcc", secondary: "#00ccff", accent: "#ff00ff", text: "#ffffff", muted: "#888888", surface: "#0a0a0a", surfaceStrong: "#111111" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#000000", gradient1: "#00ffcc", gradient2: "#ff00ff", gradient1Position: "50% 50%", gradient2Position: "20% 20%", intensity: 0.2 }
  },
  {
    name: "Crimson Sage",
    colors: { primary: "#ff4d4d", secondary: "#ff9999", accent: "#ffcc00", text: "#fff0f0", muted: "#ccaaaa", surface: "#1a0505", surfaceStrong: "#2d0a0a" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#0f0202", gradient1: "#ff4d4d", gradient2: "#ffcc00", gradient1Position: "80% 10%", gradient2Position: "10% 90%", intensity: 0.12 }
  }
];

const generateThemes = () => {
  const themes = [...baseThemes];
  const variations = [
    { name: "Nebula", p: "#8b5cf6", s: "#d946ef", a: "#0ea5e9", bg: "#020617" },
    { name: "Inferno", p: "#ef4444", s: "#f97316", a: "#facc15", bg: "#0c0a09" },
    { name: "Deep Sea", p: "#06b6d4", s: "#3b82f6", a: "#10b981", bg: "#020617" },
    { name: "Forest", p: "#22c55e", s: "#84cc16", a: "#fbbf24", bg: "#052e16" },
    { name: "Cyber", p: "#00ff00", s: "#00ffff", a: "#ff00ff", bg: "#000000" },
    { name: "Golden", p: "#fbbf24", s: "#f59e0b", a: "#ffffff", bg: "#1a1a1a" },
    { name: "Starlight", p: "#fdf2f8", s: "#fce7f3", a: "#e9d5ff", bg: "#000000" },
    { name: "Magma", p: "#dc2626", s: "#991b1b", a: "#fbbf24", bg: "#000000" },
    { name: "Quantum", p: "#3b82f6", s: "#6366f1", a: "#f43f5e", bg: "#030014" },
    { name: "Arcane", p: "#a855f7", s: "#6366f1", a: "#34d399", bg: "#0f172a" }
  ];

  variations.forEach(v => {
    // Basic Cosmic
    themes.push({
      name: `${v.name} Core`,
      colors: { primary: v.p, secondary: v.s, accent: v.a, text: "#ffffff", muted: "#a1a1aa", surface: "#18181b", surfaceStrong: "#27272a" },
      backgroundConfig: "cosmic",
      backgroundStyles: { baseColor: v.bg, gradient1: v.p, gradient2: v.a, gradient1Position: "20% 20%", gradient2Position: "80% 80%", intensity: 0.15 }
    });
    // Gradient variant
    themes.push({
      name: `${v.name} Flow`,
      colors: { primary: v.p, secondary: v.s, accent: v.a, text: "#ffffff", muted: "#a1a1aa", surface: "#18181b", surfaceStrong: "#27272a" },
      backgroundConfig: "gradient",
      backgroundStyles: { baseColor: v.bg, gradient1: v.p, gradient2: v.s, gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 1 }
    });
    // Dark variant
    themes.push({
      name: `Obsidian ${v.name}`,
      colors: { primary: v.p, secondary: "#444", accent: v.a, text: "#fff", muted: "#999", surface: "#050505", surfaceStrong: "#0a0a0a" },
      backgroundConfig: "cosmic",
      backgroundStyles: { baseColor: "#000", gradient1: v.p, gradient2: "#000", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.05 }
    });
    // Light variant (inverse)
    themes.push({
      name: `${v.name} Light`,
      colors: { primary: v.p, secondary: v.s, accent: v.a, text: "#111", muted: "#555", surface: "#fff", surfaceStrong: "#f4f4f4" },
      backgroundConfig: "solid",
      backgroundStyles: { baseColor: "#fcfcfc", gradient1: v.p, gradient2: v.s, gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0 }
    });
    // Glow variant
    themes.push({
      name: `${v.name} Pulsar`,
      colors: { primary: v.p, secondary: v.s, accent: v.a, text: "#fff", muted: "#ccc", surface: "#111", surfaceStrong: "#222" },
      backgroundConfig: "cosmic",
      backgroundStyles: { baseColor: v.bg, gradient1: v.p, gradient2: v.s, gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.3 }
    });
  });

  return themes;
};

module.exports = generateThemes();
