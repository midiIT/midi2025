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
      },
      screens: {
        es: '360px', // Extra Small (custom)
        sm: '640px', // Small (default)
        md: '768px', // Medium (default)
        lg: '1024px', // Large (default)
        xl: '1280px', // Extra Large (default)
        '2xl': '1536px', // 2X Extra Large (default)
      },
    },
  },
  plugins: [],
};
