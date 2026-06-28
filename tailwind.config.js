/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"SF Pro Text"', '"Helvetica Neue"', 'sans-serif',
        ],
      },
      borderRadius: {
        'card': '18px',
        'pill': '980px',
      },
      colors: {
        'apple-blue': '#007AFF',
        'apple-green': '#34C759',
        'apple-red': '#FF3B30',
        'apple-orange': '#FF9500',
        'apple-bg': 'var(--color-bg)',
        'apple-bg-secondary': 'var(--color-bg-secondary)',
        'apple-text': 'var(--color-text)',
        'apple-text-secondary': 'var(--color-text-secondary)',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
}
