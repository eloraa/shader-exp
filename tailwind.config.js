/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}', './shaders/**/*.{html,js}', './index.html', './404.html', './about.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': "'AlphaLyrae', sans-serif"
      }
    },
  },
  plugins: [],
};
