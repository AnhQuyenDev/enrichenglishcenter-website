/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,css}"
  ],
  theme: {
      extend: {
          colors: {
              'custom-orange': '#FFA500',
              'custom-dark': '#212529',
              'custom-light-pink': '#FFF5F5',
              'cam-500': '#F97316', // Màu cam của bạn
              'cam-100': '#FFEDD5', // Màu cam nhạt hơn cho nền
              'slate-850': '#1f2937', // Tùy chỉnh màu slate đậm hơn nếu cần
            },
        }
    },
  plugins: [],
}