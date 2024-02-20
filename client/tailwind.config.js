/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      "primary-color": "#6A0B37",
      transparent: 'transparent',
    },
    fontFamily: {
      Montserrat: ["Montserrat"],
    },
    extend: {},
  },
  plugins: [],
  // corePlugins:{
  //   preflight: false
  // }
};
