/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0c10',
          card: '#12161f',
          elevated: '#181e2b',
          recessed: '#0e1118',
          gold: '#e6b800',
          amber: '#ff9900',
          emerald: '#10b981',
          crimson: '#ef4444',
          text: '#f3f4f6',
          muted: '#9ca3af'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        magazine: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
