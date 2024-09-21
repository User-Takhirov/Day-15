/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        screens: {
          lg: "1315px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
