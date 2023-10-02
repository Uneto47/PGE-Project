/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'standard-blue': '#1E3A8A',
        'background-section': '#F4F4F4',
        'dark-green': '#365314',
      }
    },
  },
}