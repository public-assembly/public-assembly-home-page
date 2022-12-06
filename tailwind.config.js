/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./@dao-auction/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}