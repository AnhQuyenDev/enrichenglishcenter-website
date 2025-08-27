// =================================================================
// PHẦN 1: IMPORT CÁC MODULE CẦN THIẾT
// =================================================================
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import List from 'list.js';
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

function initSwiper(selector, navSelectors, options) {
  if (document.querySelector(selector)) {
    return new Swiper(selector, {
      spaceBetween: 30,
      pagination: {
        el: `${selector} .swiper-pagination`,
        clickable: true,
      },
      navigation: {
        nextEl: navSelectors.nextEl,
        prevEl: navSelectors.prevEl,
      },
      ...options,
    });
  }
  return null;
}

const achievementSwiper = initSwiper(".achievementSwiper", { nextEl: ".achievement-swiper-button-next", prevEl: ".achievement-swiper-button-prev" }, {
  slidesPerView: 1,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
  },
});

const coursesSwiper = initSwiper(".popularCoursesSwiper", { nextEl: ".course-swiper-button-next", prevEl: ".course-swiper-button-prev" }, {
  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 30 },
  },
});

const instructorsSwiper = initSwiper(".instructorsSwiper", { nextEl: ".instructor-swiper-button-next", prevEl: ".instructor-swiper-button-prev" }, {
  slidesPerView: 2,
  breakpoints: {
    768: { slidesPerView: 4, spaceBetween: 30 },
  },
});

const newsSwiper = initSwiper(".newsSwiper", { nextEl: ".news-swiper-button-next", prevEl: ".news-swiper-button-prev" }, {
  slidesPerView: 1,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  },
});




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

// =================================================================
// PHẦN 6: CODE CHẠY CHO TRANG KHOÁ HỌC
// =================================================================
/**
 * Hàm gán các danh mục (category) cho mỗi khóa học để phục vụ việc lọc.
 * @param {object} course - Đối tượng khóa học.
 * @returns {object} - Các danh mục đã được gán.
 */
function assignCategories(course) {
    const title = course.title.toLowerCase();
    const who = course.who.join(' ').toLowerCase();

    // Gán danh mục Trình độ (Level)
    let levelCategory = 'other';
    if (title.includes('pre a1') || title.includes('starters') || title.includes('movers') || title.includes('flyers')) levelCategory = 'yle';
    else if (title.includes('giao tiếp') || title.includes('pronunciation')) levelCategory = 'giao-tiep';
    else if (title.includes('ielts')) levelCategory = 'ielts';
    else if (title.includes('grammar')) levelCategory = 'ngu-phap';
    else if (title.includes('học sinh giỏi')) levelCategory = 'hsg';

    // Gán danh mục Đối tượng (Audience)
    let audienceCategory = 'other';
    if (who.includes('3 tuổi') || who.includes('6 tuổi')) audienceCategory = 'mam-non';
    else if (who.includes('tiểu học') || who.includes('6 đến 8') || who.includes('8-11')) audienceCategory = 'tieu-hoc';
    else if (who.includes('thcs') || who.includes('thpt') || who.includes('học sinh giỏi')) audienceCategory = 'thcs-thpt';
    else if (who.includes('sinh viên') || who.includes('người đi làm') || who.includes('người mới bắt đầu')) audienceCategory = 'sinh-vien';
    
    // Gán danh mục Lĩnh vực (Skill)
    let skillCategory = 'other';
    if (title.includes('giao tiếp')) skillCategory = 'giao-tiep';
    else if (title.includes('phát âm')) skillCategory = 'phat-am';
    else if (title.includes('grammar')) skillCategory = 'ngu-phap';
    else if (title.includes('ielts') || title.includes('học sinh giỏi')) skillCategory = 'luyen-thi';

    return { levelCategory, audienceCategory, skillCategory };
}

/**
 * Hàm hiển thị các khóa học ra HTML.
 */
function createCourseCardHTML(course) {
    return `
        <div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <img src="./images/course4.jpg" alt="${course.title}" class="w-full h-48 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="title font-bold text-xl mb-2 text-gray-800">${course.title}</h3> 
                <p class="text-gray-600 text-sm mb-4 flex-grow">${course.shortDescription}</p>
                <div class="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                    <span><i class="far fa-clock mr-2"></i>${course.duration}</span>
                    <a href="course_detail.html?id=${course.id}" class="font-semibold text-orange-500 hover:text-orange-600">Xem chi tiết</a>
                </div>
            </div>
        </div>
    `;
}
/**
 * Hàm chính để hiển thị các khóa học trên trang chủ (slider) và trang khóa học (grid).
 */
function displayCourses() {
    // Lấy ra hai container
    const coursesPageContainer = document.querySelector('#courses-list-wrapper .list');
    const homePageContainer = document.getElementById('courses-wrapper');

    // --- Xử lý cho trang chủ (Slider) ---
    if (homePageContainer) {
        homePageContainer.innerHTML = ''; // Xóa nội dung cũ
        coursesData.forEach(course => {
            // Với Swiper, mỗi card phải được bọc trong một thẻ div.swiper-slide
            const slideWrapper = document.createElement('div');
            slideWrapper.className = 'swiper-slide';
            slideWrapper.innerHTML = createCourseCardHTML(course); // Gọi hàm tạo HTML
            homePageContainer.appendChild(slideWrapper);
        });
    }

    // --- Xử lý cho trang khóa học (Grid) ---
    if (coursesPageContainer) {
        coursesPageContainer.innerHTML = ''; // Xóa nội dung cũ
        coursesData.forEach(course => {
            const categories = assignCategories(course); // Lấy danh mục để lọc
            
            // Với trang grid, mỗi card cần các thuộc tính data-*
            const gridItemWrapper = document.createElement('div');
            gridItemWrapper.setAttribute('data-level', categories.levelCategory);
            gridItemWrapper.setAttribute('data-audience', categories.audienceCategory);
            gridItemWrapper.setAttribute('data-skill', categories.skillCategory);
            gridItemWrapper.innerHTML = createCourseCardHTML(course); // Gọi hàm tạo HTML
            coursesPageContainer.appendChild(gridItemWrapper);
        });
    }
}

// Gọi hàm này khi trang được tải
document.addEventListener('DOMContentLoaded', displayCourses);

// === KHỞI TẠO BỘ LỌC KHI TRANG ĐƯỢC TẢI ===
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('courses-list-wrapper')) return;

    displayCourses();

    const options = {
        valueNames: [
            'title',
            // Chỉ định List.js đọc các thuộc tính data-*
            { data: ['level'] },
            { data: ['audience'] },
            { data: ['skill'] }
        ]
    };

    const courseList = new List('courses-list-wrapper', options);

    // Hàm thực hiện lọc
    function updateFilters() {
        const levelFilter = document.getElementById('level-filter').value;
        const audienceFilter = document.getElementById('audience-filter').value;
        const skillFilter = document.getElementById('skill-filter').value;

        courseList.filter(item => {
            const levelMatch = (levelFilter === 'all') || (item.values().level === levelFilter);
            const audienceMatch = (audienceFilter === 'all') || (item.values().audience === audienceFilter);
            const skillMatch = (skillFilter === 'all') || (item.values().skill === skillFilter);
            
            // Một khóa học chỉ hiển thị khi khớp TẤT CẢ các bộ lọc đang được chọn
            return levelMatch && audienceMatch && skillMatch;
        });
    }

    // Lắng nghe sự kiện thay đổi trên các dropdown lọc
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', updateFilters);
    });

    // Lắng nghe sự kiện thay đổi trên dropdown sắp xếp
    document.getElementById('sort-by').addEventListener('change', (e) => {
        const [sortBy, order] = e.target.value.split('-');
        courseList.sort(sortBy, { order });
    });
});