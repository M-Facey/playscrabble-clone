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
        "dark-tile": "#383838",
        "tw-tile": "#F00C18",
        "tl-tile": "#5C00B3",
        "dw-tile": "#ED7517",
        "dl-tile": "#8308F8",
      },
    },
  },
  plugins: [],
};
