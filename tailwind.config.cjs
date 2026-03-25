/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ignum: {
          black: "#0A0A0A",
          charcoal: "#1C1C1C",
          copper: "#B87333",
          "copper-light": "#D4A574",
          offwhite: "#F5F5F0",
          gray: "#A7A29A",
          success: "#228B22",
        },
      },
      fontFamily: {
        display: ['"JetBrains Mono"', 'monospace'],
        body: ['"Crimson Pro"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
