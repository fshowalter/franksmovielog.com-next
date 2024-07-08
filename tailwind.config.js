const STILL_WIDTH = "960px";
const PROSE_CONTENT_WIDTH = "36rem";
const POSTER_WIDTH = "248px";
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundColor: {
      default: "var(--bg-default)",
      subtle: "var(--bg-subtle)",
      canvas: "var(--bg-canvas)",
      inverse: "var(--bg-inverse)",
      unset: "unset",
    },
    borderColor: {
      default: "var(--border-default)",
    },
    colors: {
      accent: "var(--fg-accent)",
      border: "var(--border-default)",
      "border-accent": "var(--border-accent)",
      default: "var(--fg-default)",
      muted: "var(--fg-muted)",
      inverse: "var(--fg-inverse)",
      subtle: "var(--fg-subtle)",
      inherit: "inherit",
      emphasis: "var(--fg-emphasis)",
    },
    screens: {
      tablet: "510px",
      desktop: "1280px",
      max: "1472px",
    },
    extend: {
      backgroundImage: {
        notcomingsoon: "url('/assets/ripnotcomingsoon.jpg')",
      },
      boxShadow: {
        all: "0 0 0 1px var(--border-default)",
        bottom: "0px 1px var(--border-default)",
      },
      brightness: {
        dark: "0.8",
      },
      contrast: {
        dark: "1.2",
      },
      flexBasis: {
        md: "28rem",
      },
      fontSize: {
        "2.5xl": "1.625rem",
        md: ["1.125rem", "1.5rem"],
      },
      letterSpacing: {
        "0.25px": "0.015625rem",
        "0.3px": "0.01875rem",
        "0.5px": "0.03125rem",
        "0.75px": "0.046875rem",
      },
      margin: {
        gutter: "var(--gutter-width)",
      },
      maxWidth: {
        canvas: `clamp(${STILL_WIDTH}, 95vw, 1472px)`,
        prose: PROSE_CONTENT_WIDTH,
        popout: `calc((var(--gutter-width) * 2) + ${PROSE_CONTENT_WIDTH})`,
        poster: POSTER_WIDTH,
        "1/2": "50%",
        unset: "unset",
      },
      padding: {
        pageMargin: "var(--page-margin-width)",
        gutter: "var(--gutter-width)",
        ch: "1ch",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "spacer-y": (value) => {
            return {
              height: value,
              minHeight: value,
            };
          },
        },
        { values: theme("spacing") },
      );
    }),
  ],
};
