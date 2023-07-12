/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "san-serif"],
        "londrina-solid": ["Londrina Solid", "cursive"],
      },
      colors: {
        tile: "#cf6464",
      },
    },
  },
  plugins: [],
};
