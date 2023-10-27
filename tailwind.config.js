/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        1: '1px'
      },
      fontSize:{
        'full': '2rem'
      },
      screens:{
        xs: "460px"
      },
      maxWidth:{
        form: '408px'
      }
    },
    colors:{
      primary: {
        500: '#E40F0F'
      },
      gray: {
        muted: '#747474',
        100: "rgba(223, 134, 134, 0.04)",
        300: '#D5D5D5',
        700: '#1D1D1D'
      },

      red:{
        100: "#DF8686"
      },
      white: '#fff',
      "off-white": '#EEEEEE',
      dark: '#1D1D1D'
    }
  },
  plugins: [],
}

