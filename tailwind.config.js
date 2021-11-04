module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif"],
      },
      colors: {
        turquoise: "#40e0d0",
        yellow: {
          200: "#feca1d",
          400: "#e1ad01",
          700: "#b48a01",
        },
      },
    },
  },
  variants: {
    extend: {
      cursor: ["hover"],
      disabled: ["hover"],
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
};
