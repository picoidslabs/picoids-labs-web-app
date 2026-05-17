/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        labs: {
          bg: "var(--labs-bg)",
          "bg-elevated": "var(--labs-bg-elevated)",
          "bg-card": "var(--labs-bg-card)",
          fg: "var(--labs-fg)",
          muted: "var(--labs-muted)",
          subtle: "var(--labs-subtle)",
          border: "var(--labs-border)",
          accent: "var(--labs-accent)",
          "accent-hot": "var(--labs-accent-hot)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
