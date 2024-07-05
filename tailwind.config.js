const STILL_WIDTH = "960px";

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
    },
    extend: {
      backgroundImage: {
        "rip-notcomingsoon": "url('/assets/ripnotcomingsoon.jpg')",
      },
      maxWidth: {
        canvas: `clamp(${STILL_WIDTH}, 95vw, 1472px)`,
      },
      brightness: {
        dark: "0.8",
      },
      contrast: {
        dark: "1.2",
      },
    },
  },
  plugins: [],
};
