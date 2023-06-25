/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
        buttonActive: '#193446',
      },
      textColor: {
        headerText: '#2E424D',
        fieldText: '#344054',
        arrow: '#63696E',
        disabledText: '#777D86',
        userNameText: '#3180BA',
        textActive: '#CBE6EC',
      },
      borderRadius: {
        'md': '5px',
      },
      colors: {
        'button' : '#2E424D',
        'buttonActive' : '#193446',
      }
    },
  },
  plugins: [],
};
