const predefinedThemes = [
  {
    name: "Cosmic Dark",
    colors: { primary: "212 175 55", secondary: "255 215 0", text: "234 234 234", muted: "176 176 176", accent: "30 144 255", surface: "20 20 20", surfaceStrong: "30 30 30" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "8 8 12", gradient1: "212 175 55", gradient2: "30 144 255", gradient1Position: "70% 20%", gradient2Position: "30% 80%", intensity: 0.15 }
  },
  {
    name: "Royal Gold",
    colors: { primary: "255 215 0", secondary: "212 175 55", text: "255 250 230", muted: "200 180 140", accent: "255 255 255", surface: "45 35 15", surfaceStrong: "60 50 20" },
    backgroundConfig: "gradient",
    backgroundStyles: { baseColor: "20 15 5", gradient1: "255 215 0", gradient2: "212 175 55", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.2 }
  },
  {
    name: "Mystic Blue",
    colors: { primary: "100 200 255", secondary: "30 144 255", text: "220 240 255", muted: "130 160 190", accent: "255 215 0", surface: "15 25 45", surfaceStrong: "25 35 60" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "5 10 25", gradient1: "30 144 255", gradient2: "100 200 255", gradient1Position: "80% 80%", gradient2Position: "20% 20%", intensity: 0.2 }
  },
  {
    name: "Fire Red",
    colors: { primary: "255 69 0", secondary: "178 34 34", text: "255 230 230", muted: "180 130 130", accent: "255 215 0", surface: "35 15 15", surfaceStrong: "50 20 20" },
    backgroundConfig: "gradient",
    backgroundStyles: { baseColor: "15 5 5", gradient1: "255 69 0", gradient2: "178 34 34", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.25 }
  },
  {
    name: "Emerald Forest",
    colors: { primary: "50 205 50", secondary: "34 139 34", text: "230 255 230", muted: "130 180 130", accent: "255 215 0", surface: "10 30 10", surfaceStrong: "15 45 15" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "5 15 5", gradient1: "50 205 50", gradient2: "34 139 34", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.15 }
  },
  {
    name: "Void Purple",
    colors: { primary: "150 50 255", secondary: "100 0 200", text: "240 230 255", muted: "160 140 180", accent: "0 255 255", surface: "20 5 30", surfaceStrong: "30 10 45" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "10 5 15", gradient1: "150 50 255", gradient2: "0 255 255", gradient1Position: "50% 10%", gradient2Position: "50% 90%", intensity: 0.2 }
  },
  {
    name: "Solar Flare",
    colors: { primary: "255 140 0", secondary: "255 69 0", text: "255 245 230", muted: "200 160 120", accent: "255 255 0", surface: "30 15 5", surfaceStrong: "45 25 10" },
    backgroundConfig: "gradient",
    backgroundStyles: { baseColor: "15 5 2", gradient1: "255 140 0", gradient2: "255 255 0", gradient1Position: "0% 50%", gradient2Position: "100% 50%", intensity: 0.3 }
  },
  {
    name: "Lunar Silver",
    colors: { primary: "192 192 192", secondary: "128 128 128", text: "240 240 240", muted: "160 160 160", accent: "100 150 255", surface: "25 25 25", surfaceStrong: "35 35 35" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "10 10 15", gradient1: "240 240 240", gradient2: "100 150 255", gradient1Position: "30% 30%", gradient2Position: "70% 70%", intensity: 0.1 }
  },
  {
    name: "Ocean Deep",
    colors: { primary: "0 105 148", secondary: "0 68 102", text: "200 240 255", muted: "100 150 180", accent: "0 255 127", surface: "5 20 35", surfaceStrong: "10 30 50" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "2 5 15", gradient1: "0 105 148", gradient2: "0 255 127", gradient1Position: "50% 50%", gradient2Position: "50% 100%", intensity: 0.2 }
  },
  {
    name: "Cyber Neon",
    colors: { primary: "0 255 255", secondary: "255 0 255", text: "255 255 255", muted: "150 150 150", accent: "255 255 0", surface: "15 15 20", surfaceStrong: "25 25 30" },
    backgroundConfig: "cosmic",
    backgroundStyles: { baseColor: "5 5 8", gradient1: "0 255 255", gradient2: "255 0 255", gradient1Position: "10% 90%", gradient2Position: "90% 10%", intensity: 0.3 }
  },
  { name: "Blood Moon", colors: { primary: "139 0 0", secondary: "255 0 0", text: "255 200 200", muted: "150 50 50", accent: "0 0 0", surface: "25 5 5", surfaceStrong: "40 10 10" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "10 2 2", gradient1: "139 0 0", gradient2: "0 0 0", gradient1Position: "50% 50%", gradient2Position: "50% 0%", intensity: 0.4 } },
  { name: "Frost Bite", colors: { primary: "175 238 238", secondary: "0 206 209", text: "240 255 255", muted: "150 200 200", accent: "255 255 255", surface: "20 40 45", surfaceStrong: "30 55 60" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "10 20 25", gradient1: "175 238 238", gradient2: "255 255 255", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.15 } },
  { name: "Desert Sand", colors: { primary: "237 201 175", secondary: "194 178 128", text: "255 248 220", muted: "180 160 140", accent: "210 105 30", surface: "40 30 20", surfaceStrong: "55 45 35" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "25 20 15", gradient1: "237 201 175", gradient2: "210 105 30", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.1 } },
  { name: "Toxic Waste", colors: { primary: "57 255 20", secondary: "0 255 0", text: "230 255 230", muted: "100 200 100", accent: "255 255 0", surface: "10 25 10", surfaceStrong: "20 40 20" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "5 10 5", gradient1: "57 255 20", gradient2: "255 255 0", gradient1Position: "20% 80%", gradient2Position: "80% 20%", intensity: 0.25 } },
  { name: "Nebula Pink", colors: { primary: "255 20 147", secondary: "199 21 133", text: "255 230 245", muted: "200 150 180", accent: "75 0 130", surface: "35 10 30", surfaceStrong: "50 15 45" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 5 12", gradient1: "255 20 147", gradient2: "75 0 130", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.3 } },
  { name: "Magma Flow", colors: { primary: "255 69 0", secondary: "255 0 0", text: "255 240 240", muted: "200 100 100", accent: "255 215 0", surface: "40 10 10", surfaceStrong: "60 15 15" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "20 5 5", gradient1: "255 0 0", gradient2: "255 165 0", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.4 } },
  { name: "Deep Space", colors: { primary: "25 25 112", secondary: "0 0 128", text: "230 230 250", muted: "150 150 200", accent: "255 255 255", surface: "10 10 30", surfaceStrong: "15 15 45" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "2 2 10", gradient1: "25 25 112", gradient2: "255 255 255", gradient1Position: "50% 50%", gradient2Position: "0% 0%", intensity: 0.1 } },
  { name: "Golden Age", colors: { primary: "218 165 32", secondary: "184 134 11", text: "255 250 205", muted: "180 170 120", accent: "255 255 255", surface: "35 30 10", surfaceStrong: "50 45 15" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 12 5", gradient1: "218 165 32", gradient2: "255 255 255", gradient1Position: "80% 20%", gradient2Position: "20% 80%", intensity: 0.2 } },
  { name: "Shadow Realm", colors: { primary: "40 40 40", secondary: "20 20 20", text: "200 200 200", muted: "100 100 100", accent: "255 0 0", surface: "15 15 15", surfaceStrong: "25 25 25" }, backgroundConfig: "solid", backgroundStyles: { baseColor: "5 5 5", gradient1: "40 40 40", gradient2: "0 0 0", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.1 } },
  { name: "Electric Violet", colors: { primary: "138 43 226", secondary: "148 0 211", text: "245 230 255", muted: "180 150 200", accent: "0 255 255", surface: "30 10 50", surfaceStrong: "45 15 75" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "12 5 20", gradient1: "138 43 226", gradient2: "0 255 255", gradient1Position: "30% 70%", gradient2Position: "70% 30%", intensity: 0.25 } },
  { name: "Sunset Horizon", colors: { primary: "255 127 80", secondary: "255 99 71", text: "255 240 230", muted: "200 150 130", accent: "255 215 0", surface: "40 20 20", surfaceStrong: "60 30 30" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "20 10 10", gradient1: "255 69 0", gradient2: "255 215 0", gradient1Position: "50% 100%", gradient2Position: "50% 0%", intensity: 0.2 } },
  { name: "Ghostly White", colors: { primary: "248 248 255", secondary: "220 220 220", text: "255 255 255", muted: "180 180 180", accent: "100 100 255", surface: "30 30 35", surfaceStrong: "45 45 50" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "10 10 12", gradient1: "248 248 255", gradient2: "100 100 255", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.1 } },
  { name: "Jungle Mist", colors: { primary: "46 139 87", secondary: "60 179 113", text: "230 250 240", muted: "150 180 170", accent: "255 255 0", surface: "20 40 30", surfaceStrong: "30 60 45" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "8 15 12", gradient1: "46 139 87", gradient2: "255 255 0", gradient1Position: "20% 20%", gradient2Position: "80% 80%", intensity: 0.15 } },
  { name: "Crimson Tide", colors: { primary: "220 20 60", secondary: "178 34 34", text: "255 230 235", muted: "200 150 160", accent: "0 0 0", surface: "40 10 15", surfaceStrong: "60 15 25" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "15 5 8", gradient1: "220 20 60", gradient2: "0 0 0", gradient1Position: "0% 50%", gradient2Position: "100% 50%", intensity: 0.3 } },
  { name: "Arctic Sky", colors: { primary: "135 206 235", secondary: "70 130 180", text: "240 250 255", muted: "160 190 210", accent: "255 255 255", surface: "25 40 50", surfaceStrong: "35 55 70" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "10 15 20", gradient1: "135 206 235", gradient2: "255 255 255", gradient1Position: "50% 0%", gradient2Position: "0% 100%", intensity: 0.2 } },
  { name: "Volcanic Ash", colors: { primary: "75 75 75", secondary: "50 50 50", text: "220 220 220", muted: "150 150 150", accent: "255 69 0", surface: "30 30 30", surfaceStrong: "45 45 45" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 15 15", gradient1: "75 75 75", gradient2: "255 69 0", gradient1Position: "90% 90%", gradient2Position: "10% 10%", intensity: 0.15 } },
  { name: "Plasma Pink", colors: { primary: "255 105 180", secondary: "255 20 147", text: "255 240 250", muted: "220 180 200", accent: "0 255 255", surface: "40 15 35", surfaceStrong: "60 25 50" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 5 10", gradient1: "255 105 180", gradient2: "0 255 255", gradient1Position: "40% 40%", gradient2Position: "60% 60%", intensity: 0.3 } },
  { name: "Titanium Blue", colors: { primary: "70 130 180", secondary: "45 82 110", text: "230 240 250", muted: "150 170 190", accent: "192 192 192", surface: "30 40 50", surfaceStrong: "45 55 70" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "10 15 20", gradient1: "70 130 180", gradient2: "192 192 192", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.15 } },
  { name: "Midnight Teal", colors: { primary: "0 128 128", secondary: "0 80 80", text: "220 255 255", muted: "140 180 180", accent: "255 165 0", surface: "10 30 35", surfaceStrong: "20 45 50" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "5 12 15", gradient1: "0 128 128", gradient2: "255 165 0", gradient1Position: "20% 50%", gradient2Position: "80% 50%", intensity: 0.2 } },
  { name: "Amber Void", colors: { primary: "255 191 0", secondary: "255 126 0", text: "255 245 220", muted: "200 180 140", accent: "255 255 255", surface: "35 25 10", surfaceStrong: "50 35 15" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "12 8 5", gradient1: "255 191 0", gradient2: "255 255 255", gradient1Position: "50% 50%", gradient2Position: "100% 0%", intensity: 0.25 } },
  { name: "Orchid Glow", colors: { primary: "218 112 214", secondary: "186 85 211", text: "255 240 255", muted: "200 180 200", accent: "0 255 0", surface: "40 20 45", surfaceStrong: "55 30 65" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 10 20", gradient1: "218 112 214", gradient2: "0 255 0", gradient1Position: "70% 30%", gradient2Position: "30% 70%", intensity: 0.2 } },
  { name: "Steel Grey", colors: { primary: "112 128 144", secondary: "47 79 79", text: "245 245 245", muted: "170 170 170", accent: "255 215 0", surface: "30 35 40", surfaceStrong: "45 50 55" }, backgroundConfig: "solid", backgroundStyles: { baseColor: "15 18 20", gradient1: "112 128 144", gradient2: "47 79 79", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.05 } },
  { name: "Coral Reef", colors: { primary: "255 127 80", secondary: "255 64 64", text: "255 240 240", muted: "220 160 160", accent: "0 191 255", surface: "45 25 25", surfaceStrong: "65 35 35" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "18 10 10", gradient1: "255 127 80", gradient2: "0 191 255", gradient1Position: "10% 90%", gradient2Position: "90% 10%", intensity: 0.2 } },
  { name: "Neon Lime", colors: { primary: "50 205 50", secondary: "0 255 0", text: "240 255 240", muted: "180 220 180", accent: "255 0 255", surface: "20 40 20", surfaceStrong: "30 60 30" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "8 15 8", gradient1: "50 205 50", gradient2: "255 0 255", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.3 } },
  { name: "Icy Blue", colors: { primary: "0 191 255", secondary: "30 144 255", text: "240 248 255", muted: "180 200 220", accent: "255 255 255", surface: "20 40 55", surfaceStrong: "30 55 75" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "8 15 25", gradient1: "0 191 255", gradient2: "255 255 255", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.15 } },
  { name: "Rustic Bronze", colors: { primary: "205 127 50", secondary: "139 69 19", text: "255 245 235", muted: "180 150 130", accent: "212 175 55", surface: "40 30 20", surfaceStrong: "55 40 25" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 10 5", gradient1: "205 127 50", gradient2: "212 175 55", gradient1Position: "40% 40%", gradient2Position: "60% 60%", intensity: 0.2 } },
  { name: "Digital Sky", colors: { primary: "0 123 255", secondary: "0 86 179", text: "240 245 255", muted: "160 180 200", accent: "255 255 0", surface: "15 30 50", surfaceStrong: "25 45 75" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "5 12 20", gradient1: "0 123 255", gradient2: "255 255 0", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.25 } },
  { name: "Plum Mist", colors: { primary: "142 68 173", secondary: "108 52 131", text: "250 240 255", muted: "180 160 190", accent: "241 196 15", surface: "35 20 45", surfaceStrong: "50 30 65" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "12 8 15", gradient1: "142 68 173", gradient2: "241 196 15", gradient1Position: "80% 80%", gradient2Position: "20% 20%", intensity: 0.2 } },
  { name: "Sandstone", colors: { primary: "194 178 128", secondary: "139 128 94", text: "255 252 240", muted: "180 170 150", accent: "160 82 45", surface: "45 40 30", surfaceStrong: "60 55 45" }, backgroundConfig: "solid", backgroundStyles: { baseColor: "25 22 18", gradient1: "194 178 128", gradient2: "160 82 45", gradient1Position: "50% 50%", gradient2Position: "50% 50%", intensity: 0.08 } },
  { name: "Aqua Marine", colors: { primary: "127 255 212", secondary: "64 224 208", text: "240 255 255", muted: "180 220 220", accent: "255 215 0", surface: "20 50 50", surfaceStrong: "30 75 75" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "8 20 20", gradient1: "127 255 212", gradient2: "255 215 0", gradient1Position: "30% 30%", gradient2Position: "70% 70%", intensity: 0.25 } },
  { name: "Rose Quartz", colors: { primary: "247 202 201", secondary: "230 170 170", text: "255 250 250", muted: "220 180 180", accent: "146 168 209", surface: "50 40 45", surfaceStrong: "70 55 60" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "20 15 18", gradient1: "247 202 201", gradient2: "146 168 209", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.15 } },
  { name: "Serenity", colors: { primary: "146 168 209", secondary: "110 130 170", text: "240 245 255", muted: "170 180 200", accent: "247 202 201", surface: "40 45 55", surfaceStrong: "55 60 75" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "15 18 25", gradient1: "146 168 209", gradient2: "247 202 201", gradient1Position: "0% 50%", gradient2Position: "100% 50%", intensity: 0.15 } },
  { name: "Cyberpunk 2077", colors: { primary: "255 242 0", secondary: "0 0 0", text: "255 255 255", muted: "150 150 0", accent: "255 0 60", surface: "20 20 0", surfaceStrong: "30 30 5" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "5 5 0", gradient1: "255 242 0", gradient2: "255 0 60", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.4 } },
  { name: "Deep Maroon", colors: { primary: "128 0 0", secondary: "80 0 0", text: "255 230 230", muted: "160 100 100", accent: "255 215 0", surface: "30 10 10", surfaceStrong: "45 15 15" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "12 5 5", gradient1: "128 0 0", gradient2: "0 0 0", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.3 } },
  { name: "Electric Blue", colors: { primary: "0 255 255", secondary: "0 150 255", text: "230 255 255", muted: "140 180 200", accent: "255 255 255", surface: "10 25 40", surfaceStrong: "20 40 60" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "5 10 15", gradient1: "0 255 255", gradient2: "255 255 255", gradient1Position: "50% 50%", gradient2Position: "100% 100%", intensity: 0.25 } },
  { name: "Slate Teal", colors: { primary: "47 79 79", secondary: "0 128 128", text: "230 245 245", muted: "150 170 170", accent: "255 127 80", surface: "30 40 40", surfaceStrong: "45 55 55" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "12 15 15", gradient1: "47 79 79", gradient2: "255 127 80", gradient1Position: "20% 80%", gradient2Position: "80% 20%", intensity: 0.15 } },
  { name: "Vintage Gold", colors: { primary: "212 175 55", secondary: "184 134 11", text: "255 255 240", muted: "190 180 150", accent: "139 69 19", surface: "40 35 25", surfaceStrong: "55 50 40" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "20 18 12", gradient1: "212 175 55", gradient2: "139 69 19", gradient1Position: "0% 0%", gradient2Position: "100% 100%", intensity: 0.2 } },
  { name: "Orchid Bloom", colors: { primary: "153 50 204", secondary: "148 0 211", text: "250 240 255", muted: "180 150 190", accent: "50 205 50", surface: "35 15 45", surfaceStrong: "50 20 65" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "12 5 15", gradient1: "153 50 204", gradient2: "50 205 50", gradient1Position: "50% 10%", gradient2Position: "50% 90%", intensity: 0.25 } },
  { name: "Pale Mint", colors: { primary: "152 251 152", secondary: "144 238 144", text: "250 255 250", muted: "180 210 180", accent: "255 182 193", surface: "40 50 45", surfaceStrong: "55 65 60" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "18 22 20", gradient1: "152 251 152", gradient2: "255 182 193", gradient1Position: "10% 10%", gradient2Position: "90% 90%", intensity: 0.1 } },
  { name: "Velvet Red", colors: { primary: "128 0 32", secondary: "100 0 25", text: "255 240 245", muted: "180 140 150", accent: "255 215 0", surface: "35 10 15", surfaceStrong: "50 15 25" }, backgroundConfig: "gradient", backgroundStyles: { baseColor: "15 5 8", gradient1: "128 0 32", gradient2: "0 0 0", gradient1Position: "50% 0%", gradient2Position: "50% 100%", intensity: 0.3 } },
  { name: "Skyline", colors: { primary: "0 191 255", secondary: "0 127 255", text: "245 250 255", muted: "170 190 210", accent: "255 165 0", surface: "20 40 55", surfaceStrong: "30 55 75" }, backgroundConfig: "cosmic", backgroundStyles: { baseColor: "8 15 22", gradient1: "0 191 255", gradient2: "255 165 0", gradient1Position: "50% 50%", gradient2Position: "100% 100%", intensity: 0.2 } }
];

module.exports = predefinedThemes;
