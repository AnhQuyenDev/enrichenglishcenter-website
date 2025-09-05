// vite.config.js

import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'; // <-- 1. Import plugin

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
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
        thanks: resolve(__dirname, 'thanks.html'),
      },
    },
  },
  plugins: [ // <-- 2. Thêm plugin vào đây
    viteStaticCopy({
      targets: [
        {
          src: 'send-email.php', // <-- Lấy file send-email.php
          dest: '.'             // <-- Dán vào thư mục gốc của dist
        },
        {
          src: 'PHPMailer',      // <-- Lấy toàn bộ thư mục PHPMailer
          dest: '.'             // <-- Dán vào thư mục gốc của dist
        }
      ]
    })
  ]
});