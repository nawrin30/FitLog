 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fitblack: "#0D0E10",
        fitpanel: "#151619",
        fitline: "#25272B",
        fitmuted: "#8D9096",
        fitlime: "#C8FF00"
      },
      fontFamily: {
        display: ["Arial Narrow", "Arial", "Helvetica", "sans-serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.065em"
      }
    }
  },
  plugins: []
};
