// tailwind.config.cjs
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#eef9f3',
          100: '#d2f3e0',
          500: '#0f9d58',
          700: '#0c7a44'
        },
        glass: 'rgba(255,255,255,0.06)'
      },
      keyframes: {
        handshakeIn: {
          '0%': { transform: 'translateY(-30px) scale(0.95)', opacity: 0 },
          '60%': { transform: 'translateY(6px) scale(1.02)', opacity: 1 },
          '100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
        },
        slideFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        handshakeIn: 'handshakeIn 1s ease-out forwards',
        slideFromLeft: 'slideFromLeft 0.9s ease-out forwards',
        slideFromRight: 'slideFromRight 0.9s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
