const STILL_WIDTH = "960px";
const PROSE_CONTENT_WIDTH = "36rem";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "510px",
      desktop: "1280px",
      max: "1472px",
    },
    backgroundColor: {
      default: "var(--bg-default)",
      subtle: "var(--bg-subtle)",
    },
    colors: {
      accent: "var(--fg-accent)",
      default: "var(--fg-default)",
      muted: "var(--fg-muted)",
    },
    extend: {
      backgroundImage: {
        notcomingsoon: "url('/assets/ripnotcomingsoon.jpg')",
      },
      maxWidth: {
        canvas: `clamp(${STILL_WIDTH}, 95vw, 1472px)`,
        prose: PROSE_CONTENT_WIDTH,
      },
      brightness: {
        dark: "0.8",
      },
      contrast: {
        dark: "1.2",
      },
      padding: {
        pageMargin: "var(--page-margin-width)",
      },
    },
  },
  plugins: [],
};
