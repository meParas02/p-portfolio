import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
      },
      // Consumed by Tailwind's preflight, so a bare `border` picks up the token
      // without a universal selector re-declaring it for every element.
      borderColor: {
        DEFAULT: "rgb(var(--border))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      /*
       * Type scale runs ~15% above Tailwind's default: body copy reads at
       * 16-18px instead of 14-16px, and the smallest label size is 14px so
       * nothing on the page drops below comfortable reading size.
       *
       * The top of the ramp is fluid. Editorial layouts live or die on the
       * jump between body and display sizes, and clamp() keeps that ratio
       * intact between a phone and a 27" monitor without breakpoint classes.
       */
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.25rem" }],
        sm: ["1rem", { lineHeight: "1.5rem" }],
        base: ["1.125rem", { lineHeight: "1.75rem" }],
        lg: ["1.25rem", { lineHeight: "1.875rem" }],
        xl: ["1.375rem", { lineHeight: "2rem" }],
        "2xl": ["1.75rem", { lineHeight: "2.25rem" }],
        "3xl": ["2.125rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.625rem", { lineHeight: "2.875rem" }],
        "5xl": ["3.25rem", { lineHeight: "1" }],
        "6xl": ["4rem", { lineHeight: "1" }],
        display: ["clamp(2.5rem, 8.5vw, 6.5rem)", { lineHeight: "0.95" }],
        statement: ["clamp(2.25rem, 6.5vw, 5rem)", { lineHeight: "0.98" }],
        row: ["clamp(1.5rem, 3.4vw, 2.75rem)", { lineHeight: "1.1" }],
      },
      /*
       * Label tracking is kept moderate on purpose. Wide tracking on uppercase
       * mono looks sharp on a desktop rail but pushes long strings — job
       * titles, tech lists — into awkward wraps on a 360px screen.
       */
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        container: "var(--container)",
      },
      transitionDuration: {
        micro: "150ms",
        ui: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
