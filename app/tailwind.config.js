/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./public/index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "playfair-display": ["Playfair Display", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "warm-yellow": "hsl(var(--warm-yellow))",
        "bright-yellow": "hsl(var(--bright-yellow))",
        "chrome-blue": "hsl(var(--chrome-blue))",
        "light-blue": "hsl(var(--light-blue))",
        "green-blue": "hsl(var(--green-blue))",
        "dark-green-blue": "hsl(var(--dark-green-blue))",
        green: "hsl(var(--green))",
        brown: "hsl(var(--brown))",
        outline: "hsl(var(--outline))",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
