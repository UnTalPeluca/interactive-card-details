/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-violet": "#21092F",
        "purplish-grey": "#8F8694",
        "light-grey": "#DFDEE0",
        "light-red": "#FF5050",
        "gra-light-blue": "#6348FE",
        "gra-violet": "#610595",
      },
      fontSize: {
        "3xs": "0.56rem",
        "3xl": "1.75rem",
      },
      spacing: {
        22: "5.625rem",
        112: "28rem",
      },
      maxWidth: {
        483: "483px",
      },
      boxShadow: {
        card: "0px 40px 60px 0px rgba(0,0,0, 0.15)",
      },
      borderRadius: {
        xl: "10px"
      }
    },
  },
  plugins: [],
};
