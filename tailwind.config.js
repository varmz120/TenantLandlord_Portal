/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      backgroundColor: {
        navbar: '#31556F',
        userNameButton: '#EDFDFF',
        userNameButtonActive: '#193446',
      },
      textColor: {
        userNameText: '#3180BA',
        userNameTextActive: '#CBE6EC',
      },
    },
  },
  plugins: [],
};
