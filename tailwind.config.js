/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007F73',
        secondary: '#046488',
        ternary: '#f6993f',
        pink: '#ff69b4',
        success: '#38c172',
        danger: '#e3342f',
        primarylight: '#88b3e4',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        subtler: 'var(--subtler)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
        'soft-lg': '0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.10)',
        '3xl': '0px 10px 50px 0px rgba(0,0,0,0.15)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
