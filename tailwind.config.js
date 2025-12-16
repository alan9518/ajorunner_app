/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js, jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFF7ED", // light
          dark: "#18181B", // dark
        },
        primary: {
          DEFAULT: "#FB923C",
          dark: "#EA580C",
        },
        secondary: {
          DEFAULT: "#F5F5F7",
          dark: "#27272A",
        },
        text: {
          DEFAULT: "#18181B",
          dark: "#E5E5E7",
        },
      },
    },
  },
  plugins: [],
};
