module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Readex Pro', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms')({
    //   strategy: 'class', // only generate classes
    // }),
  ],
}
