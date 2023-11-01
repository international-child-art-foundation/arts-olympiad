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
        'secondary-blue': '#98CEFF',
        'main-blue': '#3256D5',
        'new-blue': '#134380',
        'light-blue': '#CCEBFF',
        'neutral-black': '#1F1F23',
        'neutral-white': '#F9FAF6',
        'main-yellow': '#FCE983',
        'main-gold': '#E7A004',
        'main-silver': '#919191',
        'main-bronze': '#AD8122',
        'main-red': '#FF0000',
        'main-grey':'#6A7682',
      },
      fontFamily:{
        body: ['Nunito']
      },
      spacing:{
        '5%': '5%',
        '10%': '10%',
        '30%': '30%',
      },
      fontSize: {
        "heading-1": ["2.125rem",{
          fontWeight: "700",
          lineHeight: ""
        }],
      }, 
    },
  },
  plugins: [
    function ({ addUtilities, variants }) {
      const newUtilities = {
        '.grid-flow-col': {
          gridAutoFlow: 'column',
        },
        '.grid-flow-row': {
          gridAutoFlow: 'row',
        },
      };
      addUtilities(newUtilities, variants('gridAutoFlow'));
    },
  ],
};