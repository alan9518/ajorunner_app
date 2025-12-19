/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/theme/colors");
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js, jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/shared/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend_400Regular"],
        "lexend-bold": ["Lexend_700Bold"],
      },
      fontSize: {
        xl: 20,
        "2xl": 24,
        "3xl": 30,
      },
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
        foreground: {
          DEFAULT: colors.light.white,
          dark: colors.dark.foreground,
        },
      },
    },
  },
  plugins: [],
};
