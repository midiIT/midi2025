/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        standard: '#3B82F6',
        'light-yellow': '#f5f5dc',
        purple: '#c39bd3',
        'midi-blue': '#0175B4',
        partner: '#10B981',
      },
      screens: {
        es: '360px', // Extra Small (custom)
        sm: '640px', // Small (default)
        md: '768px', // Medium (default)
        lg: '1024px', // Large (default)
        xl: '1280px', // Extra Large (default)
        '2xl': '1536px', // 2X Extra Large (default)
      },
      keyframes: {
        'fade-in-scale': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in-scale': 'fade-in-scale 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
