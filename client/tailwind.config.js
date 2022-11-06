/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundImage: {
      'logo': "url('/public/img/logoBg.svg')",
      'background': "url('/public/img/headerBg.svg')",
    },
    extend: {
      fontFamily: {
        'Sinter-font': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
