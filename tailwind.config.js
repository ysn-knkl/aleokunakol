/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        // brand
        brand: {
          700: "#047b8c", // ana
          300: "#8fcdd0", // açık
        },
        accent: {
          500: "#f68b85",
          300: "#f6ada9",
        },
        // yüzeyler (açık tema)
        surface: {
          50:  "#fffefd",
          75:  "#fffefc",
          100: "#fff4ef",
        },
        // metin
        text: {
          primary: "#1f2a2e",
          secondary: "#4b5c64",
          muted: "#7a8b92",
        },
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { soft: "0 8px 30px rgba(4,123,140,0.10)" },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
