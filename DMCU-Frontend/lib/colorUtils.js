/**
 * Advanced Color System Utility
 * Handles dynamic generation of shades, opacities, and contrast detection.
 */

// Converts Hex to RGB
export function hexToRgb(hex) {
  if (!hex) return "0 0 0";
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map(s => s + s).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

// Adjusts luminance of a color (0 = black, 1 = white)
export function getLuminance(hex) {
  if (!hex) return 0;
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Returns appropriate text color based on background luminance
export function getContrastColor(hex) {
  const luminance = getLuminance(hex);
  return luminance > 0.5 ? "#080808" : "#ffffff";
}

// Darkens or Lightens a hex color
export function adjustColor(hex, percent) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.floor(r * (1 + percent / 100));
  g = Math.floor(g * (1 + percent / 100));
  b = Math.floor(b * (1 + percent / 100));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  const rr = r.toString(16).padStart(2, "0");
  const gg = g.toString(16).padStart(2, "0");
  const bb = b.toString(16).padStart(2, "0");

  return `#${rr}${gg}${bb}`;
}

// Generates a full range of variables for a single base color
export function generateColorVariables(prefix, hex) {
  const rgb = hexToRgb(hex);
  const vars = {
    [`--${prefix}`]: rgb,
    [`--${prefix}-hex`]: hex,
  };

  // Generate Opacity variants
  for (let i = 1; i <= 9; i++) {
    vars[`--${prefix}-${i}0`] = `rgba(${rgb} / ${i / 10})`;
  }

  // Generate Numeric Shade variants (100-900)
  // 500 is the base. 100-400 are lighter, 600-900 are darker.
  vars[`--${prefix}-100`] = hexToRgb(adjustColor(hex, 80));
  vars[`--${prefix}-200`] = hexToRgb(adjustColor(hex, 60));
  vars[`--${prefix}-300`] = hexToRgb(adjustColor(hex, 40));
  vars[`--${prefix}-400`] = hexToRgb(adjustColor(hex, 20));
  vars[`--${prefix}-500`] = rgb;
  vars[`--${prefix}-600`] = hexToRgb(adjustColor(hex, -20));
  vars[`--${prefix}-700`] = hexToRgb(adjustColor(hex, -40));
  vars[`--${prefix}-800`] = hexToRgb(adjustColor(hex, -60));
  vars[`--${prefix}-900`] = hexToRgb(adjustColor(hex, -80));

  vars[`--${prefix}-light`] = vars[`--${prefix}-300`];
  vars[`--${prefix}-dark`] = vars[`--${prefix}-700`];

  return vars;
}
