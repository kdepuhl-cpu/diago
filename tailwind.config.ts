import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New CI (Redesign Marz 2026)
        "neon-green": "#28D200",
        "forest-green": "#144B23",
        "off-white": "#FAFAFA",
        "off-black": "#1F1F1F",
        "mint": "#D0FDDA",
        // Legacy aliases — keep for backwards compat during migration
        "electric-orange": "#28D200", // mapped to neon-green now
        "orange": "#28D200",          // mapped to neon-green now
        // Club colors
        "hertha-blue": "#005CA9",
        "union-red": "#ED1C24",
        "union-iron": "#1D1D1B",
      },
      fontFamily: {
        headline: ['"Soehne Schmal"', '"Inter Tight"', "system-ui", "sans-serif"],
        sans: ['"Soehne"', "Inter", "system-ui", "sans-serif"],
        mono: ['"Soehne Mono"', '"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
