/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1612',
          50:  '#faf7f2',
          100: '#f0ebe1',
          200: '#d9d1c0',
          300: '#b8ac95',
          400: '#8c7e63',
          500: '#5e5240',
          600: '#3d3527',
          700: '#2a2418',
          800: '#1a1612',
          900: '#0d0b08',
        },
        clay: {
          DEFAULT: '#b8492e',
          50:  '#fdf2ec',
          100: '#fae0d2',
          200: '#f0c5b3',
          300: '#e09680',
          400: '#cd6a4d',
          500: '#b8492e',
          600: '#963820',
          700: '#732b18',
          800: '#5a2114',
        },
        sage: {
          DEFAULT: '#5a6e5a',
          100: '#e6ebe3',
          200: '#c4d0bd',
          300: '#9aac92',
          400: '#788872',
          500: '#5a6e5a',
          600: '#445744',
          700: '#324132',
        },
        bone:  '#faf7f2',
        cream: '#f8f3e8',
        paper: '#f4efe4',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
      },
    },
  },
  plugins: [],
};
