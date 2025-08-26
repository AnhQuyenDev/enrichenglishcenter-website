// =================================================================
// PHẦN 1: IMPORT CÁC MODULE CẦN THIẾT
// =================================================================
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { coursesData } from './course_data.js';
import { teachers_data } from './teacher_data.js';

// =================================================================
// PHẦN 2: CODE CHẠY TRÊN TẤT CẢ CÁC TRANG (MENU)
// =================================================================
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

// =================================================================
// PHẦN 3: CODE CHỈ CHẠY CHO CÁC TRANG CÓ SLIDER
// =================================================================
if (document.querySelector('.heroSwiper')) {
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
}

if (document.querySelector('.achievementSwiper')) {
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
}

if (document.querySelector('.popularCoursesSwiper')) {
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
}

if (document.querySelector('.instructorsSwiper')) {
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
}

if (document.querySelector('.newsSwiper')) {
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
}



// =================================================================
// PHẦN 4: CODE CHỈ CHẠY CHO TRANG CHI TIẾT KHÓA HỌC
// =================================================================
if (document.getElementById('course-title')) {
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Lấy id của khóa học từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));

        // 2. Tìm khóa học tương ứng trong file data.js
        const course = coursesData.find(c => c.id === courseId);

        // 3. Nếu không tìm thấy, thông báo lỗi
        if (!course) {
            document.querySelector('main').innerHTML = '<h1 class="text-center text-2xl font-bold">Không tìm thấy khóa học.</h1>';
            return;
        }

        // 4. Lấy các phần tử HTML bằng id
        const durationEl = document.getElementById('course-duration');
        const levelEl = document.getElementById('course-level');
        const lessonsEl = document.getElementById('course-lessons');
        const titleEl = document.getElementById('course-title');
        const shortDescriptionEl = document.getElementById('course-short-des');
        const longDescriptionEl = document.getElementById('course-long-des');
        const feeEl = document.getElementById('course-fee');
        const datesEl = document.getElementById('course-dates');
        const statusEl = document.getElementById('course-status');

        const whatLearnList = document.getElementById('what-learn-list');
        const whoForList = document.getElementById('who-for-list');
        const syllabusContainer = document.getElementById('syllabus-container');

        // 5. Đổ dữ liệu vào các phần tử HTML
        durationEl.textContent = course.duration;
        levelEl.textContent = course.level;
        lessonsEl.textContent = course.lessons;
        titleEl.textContent = course.title;
        shortDescriptionEl.textContent = course.shortDescription;
        longDescriptionEl.textContent = course.longDescription;
        feeEl.textContent = course.fee;
        datesEl.textContent = course.schedule;
        statusEl.textContent = course.status;

        let whatLearnHtml = ''; // Tạo một chuỗi HTML rỗng
        course.what_learn.forEach(item => {
            // Với mỗi mục trong mảng what_learn, tạo một thẻ li và cộng vào chuỗi
            whatLearnHtml += `
                <li class="flex items-start">
                    <i class="fas fa-check text-orange-500 mr-3 mt-1"></i>
                    <span>${item}</span>
                </li>
            `;
        });
        whatLearnList.innerHTML = whatLearnHtml;

        let whoForHtml = '';
        course.who.forEach(item => {
            whoForHtml += `
                <li class="flex items-start">
                    <i class="fas fa-user-check text-orange-500 mr-3 mt-1"></i>
                    <span>${item}</span>
                </li>
            `;
        });
        whoForList.innerHTML = whoForHtml;

        let syllabusHtml = '';
        course.syllabus.forEach(item => {
            syllabusHtml += `
                <details class="group border-b pb-4">
                    <summary class="cursor-pointer font-semibold text-lg text-gray-800 group-hover:text-orange-500">
                        ${item.title}
                    </summary>
                    <p class="text-gray-600 mt-4 pl-4">${item.description}</p>
                </details>
            `;
        });
        syllabusContainer.innerHTML = syllabusHtml;

        // Cập nhật tiêu đề trang
        document.title = course.title + " - Trung tâm Anh ngữ Enrich";
    });
}

// =================================================================
// PHẦN 5: CODE CHỈ CHẠY CHO TRANG CHI TIẾT GIÁO VIÊN
// =================================================================
if (document.getElementById('teacher-name')) {
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Lấy id của giáo viên từ URL (ví dụ: teacher_detail.html?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const teacherId = parseInt(urlParams.get('id'));

        // 2. Tìm giáo viên tương ứng trong file data
        const teacher = teachers_data.find(t => t.id === teacherId);

        // 3. Nếu không tìm thấy, hiển thị thông báo
        if (!teacher) {
            document.querySelector('main').innerHTML = '<h1 class="text-center text-2xl font-bold py-20">Không tìm thấy thông tin giáo viên.</h1>';
            return;
        }

        // --- RENDER DỮ LIỆU VÀO HTML ---

        // A. Cập nhật thông tin cơ bản
        document.getElementById('teacher-avatar').src = teacher.avatar;
        document.getElementById('teacher-name').textContent = teacher.name;
        document.getElementById('teacher-subject').textContent = teacher.subject;
        document.getElementById('teacher-bio').textContent = teacher.bio;
        document.getElementById('teacher-introduction').textContent = teacher.introduction;
        document.title = teacher.name + " - Trung tâm Anh ngữ Enrich"; // Cập nhật tiêu đề trang

        // B. Render danh sách kinh nghiệm
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = teacher.experience
            .map(item => `<li>${item}</li>`)
            .join('');

        // C. Render danh sách chứng chỉ
        const certificationsList = document.getElementById('certifications-list');
        certificationsList.innerHTML = teacher.certifications
            .map(item => `<li>${item}</li>`)
            .join('');

        // D. Render thông tin liên hệ
        const contactEmail = document.getElementById('contact-email');
        contactEmail.textContent = teacher.contact.email;
        contactEmail.href = `mailto:${teacher.contact.email}`;
        document.getElementById('contact-phone').textContent = teacher.contact.phone;
        
        const socialLinks = document.getElementById('social-links');
        let socialHtml = '';
        if (teacher.contact.facebook) {
            socialHtml += `<a href="https://${teacher.contact.facebook}" target="_blank" class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"><i class="fab fa-facebook-f"></i></a>`;
        }
        if (teacher.contact.instagram) {
            socialHtml += `<a href="https://${teacher.contact.instagram}" target="_blank" class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"><i class="fab fa-instagram"></i></a>`;
        }
        socialLinks.innerHTML = socialHtml;

        // E. Render timeline thành tích (phần phức tạp nhất)
        const achievementsTimeline = document.getElementById('achievements-timeline');
        let timelineHtml = '<div class="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>'; // Thêm lại đường kẻ dọc
        
        teacher.achievements.forEach((item, index) => {
            // Kiểm tra vị trí chẵn/lẻ để xếp timeline so le
            if (index % 2 === 0) { // Item bên trái
                timelineHtml += `
                    <div class="relative mb-8 flex justify-between items-center w-full">
                        <div class="w-5/12">
                            <h3 class="font-bold text-lg">${item.title}</h3>
                        </div>
                        <div class="z-10 bg-orange-500 text-white w-24 text-center py-1 rounded-full font-semibold">${item.year}</div>
                        <div class="w-5/12"></div>
                    </div>
                `;
            } else { // Item bên phải
                timelineHtml += `
                    <div class="relative mb-8 flex justify-between items-center w-full">
                        <div class="w-5/12"></div>
                        <div class="z-10 bg-orange-500 text-white w-24 text-center py-1 rounded-full font-semibold">${item.year}</div>
                        <div class="w-5/12 text-left">
                            <h3 class="font-bold text-lg">${item.title}</h3>
                        </div>
                    </div>
                `;
            }
        });
        achievementsTimeline.innerHTML = timelineHtml;
    });
}