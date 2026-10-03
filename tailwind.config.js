const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Purple-tinted blacks used for backgrounds, borders and muted text
        ink: {
          50: '#f5f3fa',
          100: '#ebe7f5',
          200: '#d6cfe8',
          300: '#b4a9cf',
          400: '#9a8fb8',
          500: '#7a6f96',
          600: '#4f4666',
          700: '#372f4b',
          800: '#261f36',
          900: '#170f24',
          950: '#0a0612',
        },
        // UI accent (replaces the old cyan)
        accent: colors.violet,
      },
    },
  },
  plugins: [],
};
