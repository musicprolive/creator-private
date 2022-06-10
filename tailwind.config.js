module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.5)',
        'black-new-collection': 'rgba(7, 7, 7, 0.5)',
        'bg-faq': 'rgba(187, 184, 184, 0.705)',
        'about-subtitle': 'rgb(146, 53, 247)'
      },
    },
  },
  plugins: [],
}
