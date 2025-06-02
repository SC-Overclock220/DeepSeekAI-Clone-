/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      backgroundColor: {

        "sidebar-dark": "#232327",
        "app-dark": "#1e1e1e"
      }
    },
  },
  plugins: [],
}

