/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'portfolio': {
          'bg-primary': '#0f0f12',
          'bg-secondary': '#18181c',
          'bg-tertiary': '#1e1e24',
          'accent': '#6366f1',
          'accent-muted': '#4f46e5',
          'text-primary': '#f4f4f5',
          'text-muted': '#a1a1aa',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
