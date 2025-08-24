/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        'primary': '#007F73',
        'secondary': '#046488',
        'ternary': '#f6993f',
        'pink': '#ff69b4',
        'success': '#38c172',
        'danger': '#e3342f',
        'primarylight': '#88b3e4',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif']

      },
      boxShadow: {
        '3xl': '0px 10px 50px 0px rgba (0, 0, 0, 0.15)',
      }
      },
      btn: {
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
              background: 'linear-gradient(to right, #3b82f6, #2dd4bf)',
              color: '#fff',
              fontWeight: '600',
              transition: 'background 0.3s, color 0.3s',
              outline: 'none',
              '&:hover': {
                background: 'linear-gradient(to right, #2dd4bf, #3b82f6)',
                color: '#fff',
              },
              '&:focus': {
                outline: 'none',
                boxShadow:
                  '0 0 0 2px #2563eb, 0 10px 20px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
              },
            },
    },
  
  plugins: [],
}

