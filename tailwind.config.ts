import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Primary — coral / soft peach
        coral: {
          50: "#fff5f1",
          100: "#ffe7df",
          200: "#ffd2c7", // primary light (#FFD2C7)
          300: "#ffb39d",
          400: "#ff9374",
          500: "#ff7757", // primary (#FF7757)
          600: "#f15a37",
          700: "#cc4424",
          800: "#a13620",
          900: "#7e2c1c",
        },
        // Secondary — deep brown
        cocoa: {
          50: "#faf3f0",
          100: "#f0e0d8",
          200: "#dcb8a8",
          300: "#c08e76",
          400: "#9a5d44",
          500: "#7a3d27",
          600: "#61291c", // secondary light (#61291C)
          700: "#4a1f15",
          800: "#331811", // secondary dark (#331811)
          900: "#1f0e09",
        },
        // Backwards-compatible "brand" alias points at coral
        brand: {
          50: "#fff5f1",
          100: "#ffe7df",
          200: "#ffd2c7",
          300: "#ffb39d",
          400: "#ff9374",
          500: "#ff7757",
          600: "#f15a37",
          700: "#cc4424",
          800: "#a13620",
          900: "#7e2c1c",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: [
          "var(--font-rubik)",
          "Rubik",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 18px 40px -20px rgba(51, 24, 17, 0.25)",
        card: "0 12px 28px -16px rgba(51, 24, 17, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
