module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        error: '#e63946',
        white: '#f1faee',
        mediumBlue: '#457b9d',
        darkBlue: '#1d3557',
        gray: '#8d99ae',
        blue: '#1d3557',
        red: '#e63946',
        green: '#2b9348',
        yellow: '#fdca40',
        purple: '#4a0a77',
        black: '#080708',
        orange: '#eb5e28',
      },
      borderRadius: {
        custom: '8px',
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
