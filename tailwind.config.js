/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              'custom-orange': '#FFA500',
              'custom-dark': '#212529',
              'custom-light-pink': '#FFF5F5',
          },
          fontFamily: {
              sans: ['Inter', 'sans-serif'],
          }
      }
  },
  plugins: [],
}