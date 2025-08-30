# Giai đoạn 1: Build dự án với Node.js
FROM node:22-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file quản lý package và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép TOÀN BỘ mã nguồn (bao gồm cả thư mục 'public')
COPY . .

# Chạy lệnh build của Vite
RUN npm run build

# Giai đoạn 2: Serve ứng dụng với Nginx
FROM nginx:stable-alpine

# Sao chép các file tĩnh đã được build từ giai đoạn trước vào Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]