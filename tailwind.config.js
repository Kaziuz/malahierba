const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        ...defaultTheme.screens
      },
      fontFamily: {
        'JetBrains': ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        'malahierba-violet': '#0005FF',
        'malahierba-green': '#00ff7e',
        'malahierba-white': '#f5f5f5'
      },
      backgroundImage: {
        'mala': "url('../assets/background.png')"
      },
      backgroundSize: {
        'info': '400px',
        'small': '290px'
      },
      spacing: {
        '315px': '315px',
        '-3.3rem': '-3.3rem'
      },
      lineHeight: {
        '19px': '19px'
      },
      rotate: {
        '-90deg': '-90deg'
      },
      fontSize: {
        'xss': ['.65rem', '1rem']
      },
      height: {
        '800': '800px'
      }
    }
  },
  plugins: []
}
