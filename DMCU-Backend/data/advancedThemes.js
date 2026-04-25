const advancedThemes = [
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
  },
  {
    name: "Oceanic Myth",
    colors: { primary: "#4facfe", secondary: "#00f2fe", accent: "#f093fb", text: "#f0f9ff", muted: "#a5b4fc", surface: "#020617", surfaceStrong: "#0f172a" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#010409", gradient1: "#4facfe", gradient2: "#f093fb", gradient1Position: "40% 30%", gradient2Position: "60% 70%", intensity: 0.18 }
  },
  {
    name: "Forest Spirit",
    colors: { primary: "#4ade80", secondary: "#22c55e", accent: "#fbbf24", text: "#f0fdf4", muted: "#86efac", surface: "#052e16", surfaceStrong: "#064e3b" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#021108", gradient1: "#4ade80", gradient2: "#fbbf24", gradient1Position: "20% 40%", gradient2Position: "80% 60%", intensity: 0.15 }
  },
  {
    name: "Ethereal Mist",
    colors: { primary: "#c084fc", secondary: "#a855f7", accent: "#22d3ee", text: "#faf5ff", muted: "#d8b4fe", surface: "#1e1b4b", surfaceStrong: "#312e81" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#0c0a1f", gradient1: "#c084fc", gradient2: "#22d3ee", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.1 }
  },
  {
    name: "Solar Flare",
    colors: { primary: "#f97316", secondary: "#fb923c", accent: "#ef4444", text: "#fff7ed", muted: "#fdba74", surface: "#431407", surfaceStrong: "#7c2d12" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#1c0702", gradient1: "#f97316", gradient2: "#ef4444", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.25 }
  },
  {
    name: "Midnight Lotus",
    colors: { primary: "#ec4899", secondary: "#f472b6", accent: "#8b5cf6", text: "#fdf2f8", muted: "#f9a8d4", surface: "#170312", surfaceStrong: "#2d0624" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#0a0108", gradient1: "#ec4899", gradient2: "#8b5cf6", gradient1Position: "30% 20%", gradient2Position: "70% 80%", intensity: 0.2 }
  },
  {
    name: "Cyber Punk",
    colors: { primary: "#f0f", secondary: "#0ff", accent: "#ff0", text: "#fff", muted: "#666", surface: "#111", surfaceStrong: "#222" },
    backgroundConfig: "gradient",
    backgroundStyles: { baseColor: "#000", gradient1: "#f0f", gradient2: "#0ff", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 1 }
  },
  {
    name: "Ancient Stone",
    colors: { primary: "#9ca3af", secondary: "#6b7280", accent: "#4b5563", text: "#f3f4f6", muted: "#d1d5db", surface: "#1f2937", surfaceStrong: "#374151" },
    backgroundConfig: "solid",
    backgroundStyles: { baseColor: "#111827", gradient1: "#9ca3af", gradient2: "#4b5563", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0 }
  },
  // Adding more to reach 20+
  {
    name: "Vedic Gold",
    colors: { primary: "#FFD700", secondary: "#FFA500", accent: "#FF4500", text: "#FFF8DC", muted: "#DEB887", surface: "#2B1B17", surfaceStrong: "#3D2B1F" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#1A0F0A", gradient1: "#FFD700", gradient2: "#FF4500", gradient1Position: "50% 10%", gradient2Position: "50% 90%", intensity: 0.2 }
  },
  {
    name: "Shiva's Tandav",
    colors: { primary: "#4B0082", secondary: "#8A2BE2", accent: "#00FFFF", text: "#E6E6FA", muted: "#9370DB", surface: "#191970", surfaceStrong: "#000080" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#000033", gradient1: "#4B0082", gradient2: "#00FFFF", gradient1Position: "20% 20%", gradient2Position: "80% 80%", intensity: 0.15 }
  },
  {
    name: "Durga's Fury",
    colors: { primary: "#B22222", secondary: "#DC143C", accent: "#FFD700", text: "#FFF5EE", muted: "#E9967A", surface: "#3D0C02", surfaceStrong: "#5C1103" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#1F0501", gradient1: "#B22222", gradient2: "#FFD700", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.22 }
  },
  {
    name: "Himalayan Frost",
    colors: { primary: "#F0FFFF", secondary: "#E0FFFF", accent: "#ADD8E6", text: "#2F4F4F", muted: "#778899", surface: "#F5FFFA", surfaceStrong: "#F0F8FF" },
    backgroundConfig: "solid",
    backgroundStyles: { baseColor: "#FFFFFF", gradient1: "#F0FFFF", gradient2: "#ADD8E6", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.05 }
  },
  {
    name: "Ashram Peace",
    colors: { primary: "#F5DEB3", secondary: "#FFE4B5", accent: "#D2B48C", text: "#4B2513", muted: "#8B4513", surface: "#FFFDF5", surfaceStrong: "#F5F5DC" },
    backgroundConfig: "solid",
    backgroundStyles: { baseColor: "#FFFAF0", gradient1: "#F5DEB3", gradient2: "#D2B48C", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0 }
  },
  {
    name: "Plasma Storm",
    colors: { primary: "#FF007F", secondary: "#7F00FF", accent: "#00FF7F", text: "#FFFFFF", muted: "#BCBCBC", surface: "#120024", surfaceStrong: "#1E0036" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#080010", gradient1: "#FF007F", gradient2: "#00FF7F", gradient1Position: "10% 90%", gradient2Position: "90% 10%", intensity: 0.3 }
  },
  {
    name: "Glacier Peak",
    colors: { primary: "#00D2FF", secondary: "#3A7BD5", accent: "#B2FEFA", text: "#FFFFFF", muted: "#E0E0E0", surface: "#001F3F", surfaceStrong: "#003366" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#000B18", gradient1: "#00D2FF", gradient2: "#3A7BD5", gradient1Position: "50% 50%", gradient2Position: "0% 100%", intensity: 0.2 }
  },
  {
    name: "Sandstorm",
    colors: { primary: "#C2B280", secondary: "#E1C16E", accent: "#CD7F32", text: "#4A412A", muted: "#8B7D6B", surface: "#F4EBD0", surfaceStrong: "#EDE0BB" },
    backgroundConfig: "gradient",
    backgroundStyles: { baseColor: "#D2B48C", gradient1: "#C2B280", gradient2: "#CD7F32", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.5 }
  },
  {
    name: "Emerald City",
    colors: { primary: "#50C878", secondary: "#00A86B", accent: "#7FFF00", text: "#ECFFDC", muted: "#98FB98", surface: "#013220", surfaceStrong: "#004225" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#001A11", gradient1: "#50C878", gradient2: "#7FFF00", gradient1Position: "30% 30%", gradient2Position: "70% 70%", intensity: 0.15 }
  },
  {
    name: "Twilight Zone",
    colors: { primary: "#483D8B", secondary: "#6A5ACD", accent: "#FF1493", text: "#F8F8FF", muted: "#E6E6FA", surface: "#191970", surfaceStrong: "#000033" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "#05051F", gradient1: "#483D8B", gradient2: "#FF1493", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.2 }
  }
];

module.exports = advancedThemes;
