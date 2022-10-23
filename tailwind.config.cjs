/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f53d2d",
        secondary: "#f63",
        bgPrimary: "#f5f5f5",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
