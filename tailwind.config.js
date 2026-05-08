/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          bg: '#07111f',
          panel: '#101b2b',
          'panel-soft': '#111d2f',
          border: 'rgba(255, 255, 255, 0.09)',
          text: '#f4f7fb',
          muted: '#9aa7ba',
          green: '#3ee47c',
          'green-dark': '#1fae57',
          line: 'rgba(255, 255, 255, 0.08)',
        },
        github: {
          dark: '#0d1117',
          canvas: '#161b22',
          border: '#30363d',
          'text-primary': '#c9d1d9',
          'text-secondary': '#8b949e',
          blue: '#58a6ff',
          success: '#238636',
          danger: '#da3633',
          attention: '#d29922',
        }
      }
    },
  },
  plugins: [],
}
