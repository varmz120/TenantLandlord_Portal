/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        banner: 'repeat(3, 1fr)',
      },
      screens: {
        '3xl': '1920px',
      },
      backgroundColor: {
        content: '#ECEDED',
        form: '#FCFBFB',
        disabledField: '#ECEAEA',
        inputField: '#D9D9D9',
        activeField: '#3180BA',
        navbar: '#31556F',
        userNameButton: '#EDFDFF',
        buttonActive: '#193446',
        tableHover: '#BEDBEB',
      },
      backgroundImage: {
        imageUploadIcons: "#ECEAEA url('./images/upload_icon.svg')",
      },
      textColor: {
        headerText: '#2E424D',
        fieldText: '#344054',
        arrow: '#63696E',
        disabledText: '#777D86',
        userNameText: '#3180BA',
        textActive: '#CBE6EC',
        placeholderText: '#9DA3AE',
        starActive: '#EFCC41',
      },
      textSize: {
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      borderRadius: {
        md: '5px',
      },
      colors: {
        button: '#2E424D',
        buttonActive: '#193446',
      },
      height: {
        'icon_button' : ' 3.5rem',
        '128': '32rem',
        '144': '36rem',
        '656': '41rem',
      },
      width: {
        'icon_button' : ' 3.5rem',
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '656': '41rem',
        '1320': '82.5rem',
      },
    },
  },
  plugins: [],
};
