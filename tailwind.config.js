/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'red-500': '#f56565',
      'orange-500': '#ed8936',
      'green-500': '#48bb78',
    }
  },
    fontFamily :{
      "TodoFont" : ["TodoFont"],
    },
    fontWeight : {
      small : 500,
      normal : 600,
      medium : 700,
      bold : 900,
    }
  },
  plugins: [],
}

