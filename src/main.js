document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần thiết từ DOM
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    // Thêm sự kiện 'click' cho nút menu
    mobileMenuButton.addEventListener('click', function () {
        // Toggle (bật/tắt) class 'hidden' trên menu dropdown
        mobileMenu.classList.toggle('hidden');
        
        // Toggle class 'hidden' để đổi icon giữa 'bars' và 'times' (X)
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
});


// Import Swiper từ CDN phiên bản module (.mjs)
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

// Đoạn code khởi tạo Swiper không thay đổi
const swiper = new Swiper(".achievementSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
});

const coursesSwiper = new Swiper(".popularCoursesSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // khi màn hình >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // khi màn hình >= 768px
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

const instructorsSwiper = new Swiper(".instructorsSwiper", {
    // Thiết lập số slide hiển thị
    slidesPerView: 2, // Hiển thị 2 giảng viên trên màn hình nhỏ
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // khi màn hình >= 768px (md)
        768: {
            slidesPerView: 4, // Hiển thị 4 giảng viên
            spaceBetween: 30,
        },
    },
});

const newsSwiper = new Swiper(".newsSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // khi màn hình >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // khi màn hình >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

const heroSwiper = new Swiper(".heroSwiper", {
    // Tùy chọn cho hiệu ứng
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    
    // Tự động chạy
    autoplay: {
        delay: 3000, // 3 giây
        disableOnInteraction: false, // Không dừng khi người dùng tương tác
    },

    loop: true, // Lặp vô tận

    // Các nút điều khiển
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true, // Hiệu ứng cho các chấm tròn
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});