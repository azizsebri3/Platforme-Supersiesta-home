/** @type {import('tailwindcss').Config} */
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  important: true,
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background": "url('./src/assets/soc.jpeg')",
      },
      animation: {
        bounce1: "bounce 1s infinite ",
        bounce2: "bounce 1s infinite 0.3s",
        bounce3: "bounce 1s infinite 0.5s",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
