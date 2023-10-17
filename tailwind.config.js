/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "secondary-blue": "#98CEFF",
        "main-blue": "#3256D5",
        "dark-blue": "#134380",
        "neutral-black": "#1F1F23",
        "neutral-white": "#F9FAF6",
        "main-yellow": "#FCE983",
        "main-gold": "#E7A004",
        "main-silver": "#919191",
        "main-bronze": "#AD8122",
      },
      fontSize: {
        "heading-1": ["2.125rem",{
          fontWeight: "700",
          lineHeight: ""
        }],
      },
      borderWidth: {
        "0.5": "0.5px",
        "1": "1px",
      },
      screens: {
        "mxl": "1380px"
      }
    },
  },
  plugins: [],
};