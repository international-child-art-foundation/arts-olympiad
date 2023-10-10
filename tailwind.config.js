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
    screens:{
      'sm': '320px',
      'md': '481px',
      'lg': '769px',
      'xl': '1025px',
    },
    extend: {
      colors:{
        'secondary-blue': '#98CEFF',
        'main-blue': '#3256D5',
        'new-blue': '#134380',
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
        body: ['Open Sans']
      },
      spacing:{
        '15%': '15%',
      },
      fontSize: {
        "heading-1": ["2.125rem",{
          fontWeight: "700",
          lineHeight: ""
        }],
      }, 
    },
  },
  plugins: [],
};