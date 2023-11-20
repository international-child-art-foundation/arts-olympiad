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
        "new-blue": "#134380",
        "dark-blue": "#134380",
        "light-blue": "#CCEBFF",
        "baby-blue": "#E4F1F9",
        "light-pink": "#F9E4EE",
        "light-green": "#E4F9EA",
        "neutral-black": "#1F1F23",
        "neutral-white": "#F9FAF6",
        "main-yellow": "#FCE983",
        "main-orange": "#FBB22E",
        "main-gold": "#E7A004",
        "main-silver": "#919191",
        "main-bronze": "#AD8122",
        "main-red": "#FF0000",
        "main-grey":"#6A7682",
      },
      fontFamily:{
        body: ["Nunito"]
      },
      spacing:{
        "5%": "5%",
        "10%": "10%",
        "30%": "30%",
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
        "xsm": "410px",
        "mxl": "1380px"
      },
      height: {
        "accordion-wide": "43rem",
        "accordion-narrow": "46rem",
      },
      maxHeight: {
        "accordion-wide-max": "43rem",
        "accordion-narrow-max": "46rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities, variants }) {
      const newUtilities = {
        ".grid-flow-col": {
          gridAutoFlow: "column",
        },
        ".grid-flow-row": {
          gridAutoFlow: "row",
        },
      };
      addUtilities(newUtilities, variants("gridAutoFlow"));
    },
  ],
};