/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontWeight: {
      thin: '200',
      medium: '500',
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      backgroundColor: {
        content: '#ECEDED',
        form: '#FCFBFB',
        disabledField: '#E6E5E5',
        navbar: '#31556F',
        userNameButton: '#EDFDFF',
        userNameButtonActive: '#193446',
      },
      textColor: {
        headerText: '#2E424D',
        fieldText: '#344054',
        arrow: '#63696E',
        userNameText: '#3180BA',
        userNameTextActive: '#CBE6EC',
      },
    },
  },
  plugins: [],
};
