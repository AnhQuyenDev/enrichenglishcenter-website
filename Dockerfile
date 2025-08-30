# Giai đoạn 1: Xây dựng (Build) dự án
# Sử dụng một image Node.js để cài đặt các gói phụ thuộc và build dự án
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Cài đặt các gói phụ thuộc của dự án
RUN npm install

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# Chạy lệnh build để tạo ra các file tĩnh
RUN npm run build

# Giai đoạn 2: Triển khai (Serve)
# Sử dụng một image Nginx nhẹ để phục vụ các file tĩnh đã được build
FROM nginx:stable-alpine

# Sao chép các file tĩnh từ giai đoạn 'builder' vào thư mục mặc định của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx tùy chỉnh (nếu có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 để cho phép truy cập từ bên ngoài
EXPOSE 80

# Lệnh để khởi chạy Nginx khi container bắt đầu
CMD ["nginx", "-g", "daemon off;"]