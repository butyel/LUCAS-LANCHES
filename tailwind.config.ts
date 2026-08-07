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
          red: "#E8291B",
          redDark: "#C21F16",
          orange: "#F2551C",
          green: "#2F4A1E",
          greenDark: "#1F3A18",
          ink: "#1B150A",
          cream: "#FFF9F0",
          sand: "#F4E8D8",
          line: "#E9DCD0",
          gray: "#E9E4DE",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        signature: ["var(--font-signature)", "cursive"],
        block: ["var(--font-block)", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.9rem",
        lg: "1.25rem",
        xl: "1.75rem",
        "2xl": "2.25rem",
      },
      boxShadow: {
        card: "0 2px 14px rgba(27, 21, 10, 0.08)",
        cardHover: "0 16px 40px rgba(27, 21, 10, 0.16)",
        header: "0 1px 0 rgba(27, 21, 10, 0.06), 0 8px 28px rgba(27, 21, 10, 0.08)",
        cta: "0 10px 26px rgba(232, 41, 27, 0.34)",
        float: "0 12px 32px rgba(27, 21, 10, 0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "sheet-in": {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(1.7)", opacity: "0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "sheet-in": "sheet-in 0.34s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 28s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pop-in": "pop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;