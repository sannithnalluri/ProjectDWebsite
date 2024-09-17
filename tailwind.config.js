/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          light: '#85d7ff', // Light Blue
          DEFAULT: '#1fb6ff', // Blue
          dark: '#009eeb', // Dark Blue
        },
        secondary: {
          light: '#ff7ce5', // Light Pink
          DEFAULT: '#ff49db', // Pink
          dark: '#ff16d1', // Dark Pink
        },
        neutral: {
          light: '#f5f5f5', // Light Gray
          DEFAULT: '#d4d4d4', // Gray
          dark: '#737373', // Dark Gray
        },
        accent: {
          light: '#fcd34d', // Light Yellow
          DEFAULT: '#fbbf24', // Yellow
          dark: '#f59e0b', // Dark Yellow
        },
        background: {
          light: '#f9fafb', // Light Background
          DEFAULT: '#f3f4f6', // Background
          dark: '#e5e7eb', 
          darklg:"#f8f9fa"// Dark Background
        },
      },
    },
  }
}

