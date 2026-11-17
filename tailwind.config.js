/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1220",
          900: "#111827",
          800: "#1c2838",
        },
        route: {
          50: "#eef8f4",
          400: "#3dba8b",
          500: "#1f9d73",
          600: "#17815e",
          700: "#14664c",
        },
        sand: "#f4efe6",
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -20px rgba(17, 24, 39, 0.35)",
      },
    },
  },
  plugins: [],
};
