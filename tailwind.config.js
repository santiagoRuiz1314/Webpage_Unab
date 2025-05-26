/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0fe',
          100: '#e4e4fd',
          200: '#cdcdfc',
          300: '#a8a8f9',
          400: '#7b7bf4',
          500: '#5050ed',
          600: '#3d3dea', // Color principal
          700: '#2e2ec7',
          800: '#2626a1',
          900: '#242482',
        }
      },
      animation: {
        'slide-in-bottom-fast': 'slideInFromBottom 0.2s ease-out',
        'pulse-contact': 'pulse-contact 2s infinite',
      }
    },
  },
  plugins: [],
}