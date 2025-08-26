import { defineConfig } from 'vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/enrichenglishcenter-website/',
  build: {
    rollupOptions: {
      input: {
        // Liệt kê tất cả các trang HTML của bạn ở đây
        main: resolve(__dirname, 'index.html'),
        aboutus: resolve(__dirname, 'aboutus.html'),
        teachers: resolve(__dirname, 'teachers.html'),
        teacher_profile: resolve(__dirname, 'teacher_profile.html'),
        courses: resolve(__dirname, 'courses.html'),
        course_detail: resolve(__dirname, 'course_detail.html'),
        outstanding_student: resolve(__dirname, 'outstanding_student.html'),
        news: resolve(__dirname, 'news.html'),
        news_detail: resolve(__dirname, 'news_detail.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})