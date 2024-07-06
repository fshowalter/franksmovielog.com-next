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
    borderColor: {
      default: "var(--border-default)",
    },
    colors: {
      accent: "var(--fg-accent)",
      default: "var(--fg-default)",
      muted: "var(--fg-muted)",
      inverse: "var(--fg-inverse)",
      subtle: "var(--fg-subtle)",
      inherit: "inherit",
      emphasis: "var(--fg-emphasis)",
    },
    extend: {
      backgroundImage: {
        notcomingsoon: "url('/assets/ripnotcomingsoon.jpg')",
      },
      fontSize: {
        "2.5xl": "1.625rem",
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
        gutter: "var(--gutter-width)",
      },
      letterSpacing: {
        "0.25px": "0.015625rem",
        "0.3px": "0.3px",
        "0.5px": "0.03125rem",
        "0.75px": "0.046875rem",
      },
      flexBasis: {
        md: "28rem",
      },
    },
  },
  plugins: [],
};
