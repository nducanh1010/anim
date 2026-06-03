import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        script: ["var(--font-script)", '"DN Cursive"', "cursive"],
      },
      colors: {
        // semantic — every Tailwind color utility reads from the CSS layer
        surface: {
          0: "var(--surface-0)",
          1: "var(--surface-1)",
          2: "var(--surface-2)",
        },
        ink: {
          strong: "var(--ink-strong)",
          DEFAULT: "var(--ink)",
          mute: "var(--ink-mute)",
          faint: "var(--ink-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          ink: "var(--accent-ink)",
        },
        signature: "var(--signature)",
        rule: "var(--rule)",
        ok: "var(--ok)",
        warn: "var(--warn)",
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-7": "var(--space-7)",
        "space-8": "var(--space-8)",
        "space-9": "var(--space-9)",
        gutter: "var(--gutter)",
        measure: "var(--measure)",
      },
      borderRadius: {
        1: "var(--radius-1)",
        2: "var(--radius-2)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
      transitionTimingFunction: {
        "out-quart": "var(--ease-out)",
        "in-quart": "var(--ease-in)",
        "in-out-quart": "var(--ease-in-out)",
      },
      transitionDuration: {
        instant: "80ms",
        fast: "180ms",
        base: "260ms",
        slow: "480ms",
        entrance: "640ms",
      },
      maxWidth: {
        measure: "var(--measure)",
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.4" }],
        sm: ["var(--text-sm)", { lineHeight: "1.5" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-body)" }],
        lead: ["var(--text-lead)", { lineHeight: "1.5" }],
        h3: ["var(--text-h3)", { lineHeight: "1.2" }],
        h2: ["var(--text-h2)", { lineHeight: "1.15" }],
        h1: ["var(--text-h1)", { lineHeight: "1.1" }],
        display: ["var(--text-display)", { lineHeight: "1.05" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
