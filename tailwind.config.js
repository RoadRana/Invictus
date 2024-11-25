/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        'primary': '#3490dc',
        'secondary': '#787FF6',
        'ternary': '#f6993f',
        'pink': '#ff69b4',
        'success': '#38c172',
        'danger': '#e3342f',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif']

      },
      boxShadow: {
        '3xl': '0px 10px 50px 0px rgba (0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}

