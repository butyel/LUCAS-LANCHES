import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E8291E",
          redDark: "#C21F16",
          green: "#2F4A1E",
          greenDark: "#23381A",
          orange: "#F2551C",
          gray: "#E5E5E5",
          ink: "#1A1A1A",
        },
      },
      fontFamily: {
        signature: ["var(--font-signature)", "cursive"],
        block: ["var(--font-block)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(26, 26, 26, 0.08)",
        cardHover: "0 8px 28px rgba(26, 26, 26, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;