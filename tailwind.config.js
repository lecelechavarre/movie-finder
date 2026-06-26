export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        primary: '#E50914',
        accent: '#FACC15',
        text: '#F8FAFC'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(14, 165, 233, 0.14)'
      }
    }
  },
  plugins: []
};
