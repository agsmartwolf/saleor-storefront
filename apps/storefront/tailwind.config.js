const colors = require('tailwindcss/colors')

const getSpacing = (base /* number */, unit /* "px" | "rem" */, values /* number[] */) =>
  values.reduce((acc, value) => ({ ...acc, [value]: base * value + unit }), {});

const spacing = getSpacing(
  0.4,
  "rem",
  [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 6.5, 7, 8, 10, 11, 12, 14, 16, 15, 18, 19, 21, 22, 28, 85,
    256, 350,
  ]
);

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      container: {
        center: true,
        padding: "1.6rem",
        screens: {
          "2xl": "1348px",
        },
      },
      colors: {
        ...colors,
        action: {
          1: "#5B68E4",
          2: "rgba(91, 104, 228, 0.8)",
          3: "rgba(91, 104, 228, 0.6)",
          4: "rgba(91, 104, 228, 0.4)",
          5: "rgba(91, 104, 228, 0.2)",
        },
        disabled: {
          DEFAULT: "#C2D1E4",
        },
        brand: {
          DEFAULT: "#88f98c",
        },
        main: {
          DEFAULT: "#171717",
          1: "#4F5460",
          2: "#8A919F",
          3: "#B9C1CF",
          4: "rgba(57, 64, 82, 0.15)",
          5: "#EEF1F7",
        },


        'green-100': '#88f98c',
        'green-200': '#71f076',
        'green-300': '#4fe155',
        black: '#171717',
        'black-100': '#171717',
        'black-200': '#171717',
        'black-100': '#0a0a0a',
        white: '#ffffff',
        // gray: '#f5f4f4',
        // 'gray-100': '#ededed',
        // 'gray-200': '#f5f4f4',
        // 'gray-300': '#e7e7e7',
        // 'gray-400': '#9f9d9d',


        armygreen: '#4B5320',
        vibrantorange: '#FF7F00',
        poolblue: '#00A3E0',
        ribbonred: '#E60000',
        orangeade: '#F9A825',
        baltic: '#1E2D3C',
        neonyellow: '#F9F871',
        fuchsia: '#FF00FF',
        royalblue: '#002366',
        grassgreen: '#008000',
        funchsia: '#FF00FF',
        'grey/orange': '#FF7F00',
        'grey/yellow': '#F9F871',
        'grey/neon yellow': '#F9F871',
        'black/orange': '#FF7F00',
        'black/neon yellow': '#F9F871',
        glaciergray: '#E0E0E0',
        brightwhite: '#FFFFFF',
        blueradiance: '#00A3E0',
        calypsocoral: '#FF7F00',
        bluetopaz: '#00A3E0',
        blazingyellow: '#F9F871',
        hotcoral: '#FF7F00',
        blackink: '#000000',
        turquoise: '#00FFFF',
        rosso: '#FF0000',
        carrot: '#FF7F00',
        artic: '#E0E0E0',
        chocolate: '#7F3300',
        gold: '#FFD700',
        steel: '#7F7F7F',
        violet: '#7F00FF',
        wine: '#7F0000',
      },
      spacing: {
        px: "1px",
        ...spacing,
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      fontFamily: {
        sans: [
          'Sora',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        headings: ['Sora, sans-serif'],
        graphity: ['Empires, sans-serif'],
        body: ['Sora, sans-serif']
      },
      fontWeight: {
        normal: 400,
        regular: 500,
        semibold: 600,
        bold: 800,
      },
      fontSize: {
        xs: ["1.1rem", "1.6rem"],
        sm: ["1.2rem", "2.1rem"],
        base: ["1.4rem", "2.1rem"],
        md: ["1.6rem", "1.9rem"],
        lg: ["2.4rem", "3.2rem"],
        xl: ["3.2rem", "4.6rem"],
      },
      borderRadius: {
        DEFAULT: "4px",
        full: "50%",
      },
      boxShadow: {
        "decorative-center": "0 32px 0 -16px #171717",
        decorative: "16px 16px 0 #171717",
        modal: "0px 4px 20px 0px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // eslint-disable-line
    require("@tailwindcss/typography"), // eslint-disable-line
    require("@tailwindcss/aspect-ratio"), // eslint-disable-line
    require("tailwind-scrollbar-hide"), // eslint-disable-line
  ],
  safelist: [
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-black',
    'bg-black-100',
    'bg-black-200',
    'bg-black-100',
    'bg-white',

    'bg-armygreen',
    'bg-vibrantorange',
    'bg-poolblue',
    'bg-ribbonred',
    'bg-orangeade',
    'bg-baltic',
    'bg-neonyellow',
    'bg-fuchsia',
    'bg-royalblue',
    'bg-grassgreen',
    'bg-funchsia',
    'bg-grey/orange',
    'bg-grey/yellow',
    'bg-grey/neon yellow',
    'bg-black/orange',
    'bg-black/neon yellow',
    'bg-glaciergray',
    'bg-brightwhite',
    'bg-blueradiance',
    'bg-calypsocoral',
    'bg-bluetopaz',
    'bg-blazingyellow',
    'bg-hotcoral',
    'bg-blackink',
    'bg-turquoise',
    'bg-rosso',
    'bg-carrot',
    'bg-artic',
    'bg-chocolate',
    'bg-gold',
    'bg-steel',
    'bg-violet',
    'bg-wine',


    'from-yellow-300',
    'via-pink-300',
    'from-blue-400',
    'via-yellow-300',
    'to-red-500',
    'from-gray-400',
    'to-orange-200',
    'from-gray-400',
    'to-yellow-200',
    'from-gray-400',
    'to-yellow-200',
    'from-orange-500',
    'to-black-100',
    'from-black-100',
    'to-yellow-100',
    'from-orange-500',
    'to-black-100',
    'bg-[#808080]',
    'bg-[#F5F5DC]',
    'bg-[#00FF00]',
    'bg-[#008000]',
    'bg-[#DEB887]',
    'bg-[#FF6EFF]',
    'bg-[#808080]',
    'bg-[#6699CC]',
    'bg-[#C0C0C0]',
    'bg-[#86e7f6]'
  ],
};
