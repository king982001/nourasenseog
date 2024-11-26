/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Ledger", "serif"],
      },
      colors: {
        "primary-blue": "#002F88",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
