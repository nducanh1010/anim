import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        "dn-cursive": ['"DN Cursive"', "sans-serif"], // Custom font family
      },
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  variants: {
    extends: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [],
} satisfies Config;
