/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/theme/colors");
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js, jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: colors.light.background,
          dark: colors.dark.background,
        },
        primary: {
          DEFAULT: colors.light.primary,
          dark: colors.dark.primary,
        },
        secondary: {
          DEFAULT: colors.light.background,
          dark: colors.dark.background,
        },
        text: {
          DEFAULT: colors.light.text,
          dark: colors.dark.text,
        },
      },
    },
  },
  plugins: [],
};
