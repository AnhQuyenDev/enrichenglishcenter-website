/** @type {import('tailwindcss').Config} */
module.exports = {
  // Cấu hình đã được sửa lại cho chính xác và hiệu quả
  content: [
    "./*.html", // Quét TẤT CẢ các file .html ở thư mục gốc
    "./src/**/*.{js,css}" // Quét các file .js và .css bên trong thư mục 'src'
  ],
  theme: {
      extend: {
          colors: {
              'custom-orange': '#FFA500',
              'custom-dark': '#212529',
              'custom-light-pink': '#FFF5F5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    },
  plugins: [],
}