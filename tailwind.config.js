/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,md,njk,svg,ts,css}", "./.eleventy.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
    },
  },
  plugins: [],
};
