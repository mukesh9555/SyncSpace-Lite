/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        ink: '#0B1120',
        paper: '#F8FAFC',
        mustard: '#E8A33D',
        teal: '#14B8A6',
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(circle at 30% 20%, rgba(79,70,229,0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgba(20,184,166,0.10), transparent 40%)',
      },
      backgroundSize: {
        grid: '36px 36px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)',
        card: '0 1px 2px rgba(15,23,42,0.03), 0 2px 8px rgba(15,23,42,0.04)',
        'card-hover': '0 8px 30px -8px rgba(15,23,42,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
