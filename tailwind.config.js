/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        standard: '#D3D3D3',
        'light-yellow': '#f5f5dc',
        purple: '#c39bd3',
      },
    },
  },
  plugins: [],
};
