// =================================================================
// PHẦN 1: IMPORT MODULES & DATA
// =================================================================
//1.1: Thư viện ngoài
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import List from 'list.js';

//1.2: Dữ liệu nội bộ
import { coursesData } from './course_data.js';
import { teachers_data } from './teacher_data.js';
import { newsData } from './news_data.js';
import { students } from './achivement_data.js';



// =================================================================
// PHẦN 2: HELPER FUNCTIONS DÙNG CHUNG
// =================================================================
// 2.1: Chuyển chuỗi ngày tiếng Việt → Date -> để so sánh, sắp xếp
const parseVietnameseDate = (dateString) => {
    const parts = dateString.replace('tháng ', '').replace(',', '').split(' ');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
};

// 2.2: Lấy đoạn văn bản đầu tiên làm mô tả ngắn
const getShortDescription = (sections) => {
    const firstParagraph = sections.find(section => section.type === 'paragraph');
    if (firstParagraph) {
        return firstParagraph.content.length > 120 
            ? firstParagraph.content.substring(0, 120) + '...' 
            : firstParagraph.content;
    }
    return 'Nhấn để xem chi tiết...';
};

// 2.3: Convert sections → HTML (tin tức chi tiết)
function renderSections(sections) {
    if (!sections) return '';
    return sections.map(section => {
        switch (section.type) {
            case 'paragraph':
                return `<p>${section.content}</p>`;
            case 'heading':
                return `<h2 class="font-bold text-2xl text-gray-800">${section.content}</h2>`;
            case 'image':
                return `
                    <figure>
                        <img src="${section.src}" alt="${section.caption || 'Article image'}" class="w-full h-auto rounded-lg shadow-md">
                        <figcaption class="text-center text-sm text-gray-500 mt-2">${section.caption}</figcaption>
                    </figure>
                `;
            case 'quote':
                return `
                    <blockquote>
                        <p class="border-l-4 border-orange-400 pl-4 italic text-gray-600">"${section.content}"</p>
                    </blockquote>
                `;
            default:
                return '';
        }
    }).join('');
}

// 2.4: Gán CSS class theo category tin tức
function getCategoryClasses(type) {
    const classMap = {
        'Sự kiện': 'bg-orange-500',
        'Thông báo': 'bg-purple-600',
        'Hoạt động Cộng đồng': 'bg-sky-500',
        'Tuyển dụng': 'bg-emerald-500',
    };
    const result = classMap[type] || 'bg-gray-500';
    return result;
}


// =================================================================
// PHẦN 3: UI CHUNG CHO MỌI TRANG
// =================================================================

// 3.1. Toggle Mobile Menu
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// 3.2. Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');            
    // Hàm này sẽ được gọi khi một phần tử được quan sát lọt vào màn hình
    const runCounter = (entries) => {
        entries.forEach(entry => {
            // Kiểm tra xem phần tử có đang hiển thị trên màn hình không
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.innerText.slice(-1); // Lấy ký tự cuối (+ hoặc %)
                
                counter.innerText = '0' + (isNaN(suffix) ? suffix : ''); // Reset về 0
                
                let current = 0;
                const increment = target / 100; // Chia nhỏ số lần cập nhật để mượt hơn

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        // Dùng toLocaleString() để tự thêm dấu phẩy cho số hàng nghìn
                        counter.innerText = Math.ceil(current).toLocaleString('en-US') + (isNaN(suffix) ? suffix : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('en-US') + (isNaN(suffix) ? suffix : '');
                    }
                };
                
                updateCounter();
                
                // Sau khi chạy xong, ngừng quan sát phần tử này để không chạy lại
                observer.unobserve(counter);
            }
        });
    };

    // Tạo một "người quan sát"
    const observer = new IntersectionObserver(runCounter, {
        threshold: 1 // Kích hoạt khi 50% phần tử hiện ra
    });

    // Bắt đầu quan sát tất cả các thẻ có class 'counter'
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 3.3. Landbot Chat Widget
let myLandbot;
function initLandbot() {
    if (myLandbot) return;

    const script = document.createElement('script');
    script.type = "module";
    script.async = true;

    script.addEventListener('load', function () {
        myLandbot = new Landbot.Livechat({
            configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3119679-X7X2NJWC6PRKP0RK/index.json',
        });
    });

    script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';

    // Chèn script trước thẻ <script> đầu tiên trong DOM
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
}


// =================================================================
// PHẦN 4: SLIDER INITIALIZATION
// =================================================================
// 4.1: Hàm khởi tạo Swiper chung
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
// 4.2: Hero Swiper (chạy riêng nếu có)
function initHeroSwiper() {
    const heroSwiperEl = document.querySelector('.heroSwiper');
    if (!heroSwiperEl) return; // Không có thì thoát luôn

    new Swiper(".heroSwiper", {
        // Hiệu ứng chuyển slide
        effect: "fade",
        fadeEffect: { crossFade: true },

        // Tự động chạy
        autoplay: {
            delay: 3000,              // 3 giây
            disableOnInteraction: false, // Không dừng khi user tương tác
        },

        loop: true, // Lặp vô tận

        // Điều hướng + phân trang
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true, // Chấm tròn động
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
// 4.3: Các slider khác: Achievement, Courses, Instructors, News
function initAllSliders() {
    // Achievement Swiper
    initSwiper(".achievementSwiper", { 
        nextEl: ".achievement-swiper-button-next", 
        prevEl: ".achievement-swiper-button-prev" 
    }, {
        slidesPerView: 1,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
        },
    });

    // Popular Courses Swiper
    initSwiper(".popularCoursesSwiper", { 
        nextEl: ".course-swiper-button-next", 
        prevEl: ".course-swiper-button-prev" 
    }, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        breakpoints: {
            640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 30 },
        },
    });

    // Instructors Swiper
    initSwiper(".instructorsSwiper", { 
        nextEl: ".instructor-swiper-button-next", 
        prevEl: ".instructor-swiper-button-prev" 
    }, {
        slidesPerView: 2,
        breakpoints: {
            768: { slidesPerView: 4, spaceBetween: 30 },
        },
    });

    // News Swiper
    initSwiper(".newsSwiper", { 
        nextEl: ".news-swiper-button-next", 
        prevEl: ".news-swiper-button-prev" 
    }, {
        slidesPerView: 1,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
        },
    });
}




// =================================================================
// PHẦN 5: TRANG KHÓA HỌC
// =================================================================
// 5.1. Gán category cho course
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

// 5.2. Render course card HTML
function createCourseCardHTML(course) {
    return `
        <div class="bg-white border-2 border-blue-300 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <img src="./images/course4.jpg" alt="${course.title}" class="w-full h-48 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="title font-bold text-xl mb-2 text-gray-800">${course.title}</h3> 
                <p class="text-gray-600 text-sm mb-4 flex-grow">${course.shortDescription}</p>
                <div class="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                    <span><i class="far fa-clock mr-2"></i>${course.duration}</span>
                    <a href="/course/${course.id}" class="font-semibold text-blue-500 hover:text-blue-600">Xem chi tiết</a>
                </div>
            </div>
        </div>
    `;
}

// 5.3. Render & hiển thị courses
function displayCourses() {
    const coursesPageContainer = document.querySelector('#courses-list-wrapper .list');
    const homePageContainer = document.getElementById('courses-wrapper');

    // --- Xử lý cho trang chủ (Slider) ---
    if (homePageContainer) {
        homePageContainer.innerHTML = ''; // Xóa nội dung cũ
        coursesData.forEach((course, index) => {
            // Với Swiper, mỗi card phải được bọc trong một thẻ div.swiper-slide
            const slideWrapper = document.createElement('div');
            slideWrapper.className = 'swiper-slide';
            slideWrapper.setAttribute('data-aos', 'fade-up');
            slideWrapper.setAttribute('data-aos-delay', index * 100);
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

// 5.4. Init filter + sort với List.js
function initCourseFilters() {
    const wrapper = document.getElementById('courses-list-wrapper');
    if (!wrapper) return; // Không có thì thoát luôn

    // Render courses lần đầu
    displayCourses();

    // Cấu hình List.js
    const options = {
        valueNames: [
            'title',
            { data: ['level'] },    // đọc data-level
            { data: ['audience'] }, // đọc data-audience
            { data: ['skill'] }     // đọc data-skill
        ]
    };

    const courseList = new List('courses-list-wrapper', options);

    // Hàm lọc theo dropdown
    function updateFilters() {
        const levelFilter = document.getElementById('level-filter').value;
        const audienceFilter = document.getElementById('audience-filter').value;
        const skillFilter = document.getElementById('skill-filter').value;

        courseList.filter(item => {
            const levelMatch = (levelFilter === 'all') || (item.values().level === levelFilter);
            const audienceMatch = (audienceFilter === 'all') || (item.values().audience === audienceFilter);
            const skillMatch = (skillFilter === 'all') || (item.values().skill === skillFilter);

            // Chỉ hiện khi match TẤT CẢ bộ lọc
            return levelMatch && audienceMatch && skillMatch;
        });
    }

    // Lắng nghe sự kiện thay đổi filter
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', updateFilters);
    });

    // Lắng nghe sự kiện thay đổi sắp xếp
    document.getElementById('sort-by').addEventListener('change', (e) => {
        const [sortBy, order] = e.target.value.split('-');
        courseList.sort(sortBy, { order });
    });
}

// 5.5. Trang chi tiết khóa học
function initCourseDetail() {
    const titleEl = document.getElementById('course-title');
    if (!titleEl) return; // Nếu không có thì không chạy

    // 1. Lấy id của khóa học từ URL
    const urlParts = window.location.pathname.split('/');
    const courseIdString = urlParts.pop() || urlParts.pop();
    const courseId = parseInt(courseIdString, 10);

    // 2. Tìm khóa học trong data
    const course = coursesData.find(c => c.id === courseId);

    // 3. Nếu không có khóa học
    if (!course) {
        document.querySelector('main').innerHTML =
            '<h1 class="text-center text-2xl font-bold">Không tìm thấy khóa học.</h1>';
        return;
    }

    // 4. Các element DOM
    const durationEl = document.getElementById('course-duration');
    const levelEl = document.getElementById('course-level');
    const lessonsEl = document.getElementById('course-lessons');
    const shortDescriptionEl = document.getElementById('course-short-des');
    const longDescriptionEl = document.getElementById('course-long-des');
    const feeEl = document.getElementById('course-fee');
    const datesEl = document.getElementById('course-dates');
    const statusEl = document.getElementById('course-status');
    const whatLearnList = document.getElementById('what-learn-list');
    const whoForList = document.getElementById('who-for-list');
    const syllabusContainer = document.getElementById('syllabus-container');

    // 5. Gán dữ liệu
    durationEl.textContent = course.duration;
    levelEl.textContent = course.level;
    lessonsEl.textContent = course.lessons;
    titleEl.textContent = course.title;
    shortDescriptionEl.textContent = course.shortDescription;
    longDescriptionEl.textContent = course.longDescription;
    feeEl.textContent = course.fee;
    datesEl.textContent = course.schedule;
    statusEl.textContent = course.status;

    // 6. Render What you’ll learn
    whatLearnList.innerHTML = course.what_learn.map(item => `
        <li class="flex items-start">
            <i class="fas fa-check text-orange-500 mr-3 mt-1"></i>
            <span>${item}</span>
        </li>
    `).join('');

    // 7. Render Who this course is for
    whoForList.innerHTML = course.who.map(item => `
        <li class="flex items-start">
            <i class="fas fa-user-check text-orange-500 mr-3 mt-1"></i>
            <span>${item}</span>
        </li>
    `).join('');

    // 8. Render syllabus
    syllabusContainer.innerHTML = course.syllabus.map(item => `
        <details class="group border-b pb-4">
            <summary class="cursor-pointer font-semibold text-lg text-gray-800 group-hover:text-orange-500">
                ${item.title}
            </summary>
            <p class="text-gray-600 mt-4 pl-4">${item.description}</p>
        </details>
    `).join('');

    // 9. Cập nhật title trang
    document.title = `${course.title} - Trung tâm Anh ngữ Enrich`;
}



// =================================================================
// PHẦN 6: TRANG GIÁO VIÊN
// =================================================================
// 6.1. Trang chi tiết giáo viên
function initTeacherDetail() {
    const teacherNameEl = document.getElementById('teacher-name');
    if (!teacherNameEl) return; // Không phải trang teacher detail thì thoát

    // 1. Lấy id của giáo viên từ URL (ví dụ: /teacher/2)
    const pathParts = window.location.pathname.split('/');
    const teacherIdString = pathParts.pop() || pathParts.pop();
    const teacherId = parseInt(teacherIdString, 10);

    // 2. Tìm giáo viên trong data
    const teacher = teachers_data.find(t => t.id === teacherId);

    // 3. Nếu không tìm thấy
    if (!teacher) {
        document.querySelector('main').innerHTML =
            '<h1 class="text-center text-2xl font-bold py-20">Không tìm thấy thông tin giáo viên.</h1>';
        return;
    }

    // --- A. Render thông tin cơ bản ---
    document.getElementById('teacher-avatar').src = teacher.avatar;
    document.getElementById('teacher-name').textContent = teacher.name;
    document.getElementById('teacher-subject').textContent = teacher.subject;
    document.getElementById('teacher-bio').textContent = teacher.bio;
    document.getElementById('teacher-introduction').textContent = teacher.introduction;
    document.title = `${teacher.name} - Trung tâm Anh ngữ Enrich`;

    // --- B. Render kinh nghiệm ---
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = teacher.experience
        .map(item => `<li>${item}</li>`)
        .join('');

    // --- C. Render chứng chỉ ---
    const certificationsList = document.getElementById('certifications-list');
    certificationsList.innerHTML = teacher.certifications
        .map(item => `<li>${item}</li>`)
        .join('');

    // --- D. Render liên hệ ---
    const contactEmail = document.getElementById('contact-email');
    contactEmail.textContent = teacher.contact.email;
    contactEmail.href = `mailto:${teacher.contact.email}`;
    document.getElementById('contact-phone').textContent = teacher.contact.phone;

    // Social links
    const socialLinks = document.getElementById('social-links');
    let socialHtml = '';
    if (teacher.contact.facebook) {
        socialHtml += `
            <a href="${teacher.contact.facebook}" target="_blank" 
               class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 
                      hover:bg-orange-500 hover:text-white transition-colors">
                <i class="fab fa-facebook-f"></i>
            </a>`;
    }
    if (teacher.contact.instagram) {
        socialHtml += `
            <a href="${teacher.contact.instagram}" target="_blank" 
               class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 
                      hover:bg-orange-500 hover:text-white transition-colors">
                <i class="fab fa-instagram"></i>
            </a>`;
    }
    socialLinks.innerHTML = socialHtml;

    // --- E. Render achievements timeline ---
    const achievementsTimeline = document.getElementById('achievements-timeline');
    let timelineHtml = `
        <div class="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
    `;

    teacher.achievements.forEach((item, index) => {
        if (index % 2 === 0) {
            // Item bên trái
            timelineHtml += `
                <div class="relative mb-8 flex justify-between items-center w-full">
                    <div class="w-5/12">
                        <h3 class="font-bold text-lg">${item.title}</h3>
                    </div>
                    <div class="z-10 bg-orange-500 text-white w-24 text-center py-1 rounded-full font-semibold">
                        ${item.year}
                    </div>
                    <div class="w-5/12"></div>
                </div>
            `;
        } else {
            // Item bên phải
            timelineHtml += `
                <div class="relative mb-8 flex justify-between items-center w-full">
                    <div class="w-5/12"></div>
                    <div class="z-10 bg-orange-500 text-white w-24 text-center py-1 rounded-full font-semibold">
                        ${item.year}
                    </div>
                    <div class="w-5/12 text-left">
                        <h3 class="font-bold text-lg">${item.title}</h3>
                    </div>
                </div>
            `;
        }
    });

    achievementsTimeline.innerHTML = timelineHtml;
}

// 6.2. Trang danh sách giáo viên
function initTeachersList() {
    const founderContainer = document.getElementById('founder-container');
    const foreignTeachersContainer = document.getElementById('foreign-teachers-container');
    const vietnameseTeachersContainer = document.getElementById('vietnamese-teachers-container');

    if (!founderContainer || !foreignTeachersContainer || !vietnameseTeachersContainer) {
        return; // Không phải trang danh sách giáo viên
    }

    // 1. Phân loại giáo viên
    const founder = teachers_data.find(t => t.id === 1);
    const foreignTeachers = teachers_data.filter(t => typeof t.type === 'string' && t.type.startsWith('NF'));
    const vietnameseTeachers = teachers_data.filter(t => typeof t.type === 'string' && t.type.startsWith('VN'));

    // 2. Hàm tạo card giáo viên tiêu chuẩn
    const createTeacherCard = (teacher) => {
        const shortBio = teacher.bio.length > 70 ? teacher.bio.substring(0, 70) + '...' : teacher.bio;
        return `
            <div class="bg-amber-50 border-2 border-amber-300 rounded-xl shadow-lg hover:shadow-2xl 
                        transition-all duration-300 ease-in-out text-center overflow-hidden">
                <div class="bg-slate-900 h-28 rounded-t-xl relative">
                    <a href="/teacher/${teacher.id}" class="block">
                        <img src="${teacher.avatar}" alt="${teacher.name}" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md 
                                    mx-auto absolute inset-x-0 -bottom-16 transform hover:scale-105 
                                    transition-transform duration-300 z-10">
                    </a>
                </div>
                <div class="p-6 pt-20">
                    <h4 class="text-xl font-bold text-slate-900">${teacher.name}</h4>
                    <p class="text-sm text-orange-500 font-semibold mb-3">${teacher.subject}</p>
                    <p class="text-slate-600 text-sm mb-4 h-12">${shortBio}</p>
                    <a href="/teacher/${teacher.id}" 
                       class="inline-block w-full bg-orange-500 text-white font-semibold py-2 px-4 
                              rounded-lg hover:bg-orange-600 transition-colors">
                        Xem hồ sơ
                    </a>
                </div>
            </div>
        `;
    };

    // 3. Render founder (card đặc biệt)
    if (founder) {
        founderContainer.innerHTML = `
            <div class="relative w-full max-w-5xl group">
                <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 
                            rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 
                            group-hover:duration-200 animate-tilt"></div>
                
                <div class="relative bg-slate-900/80 backdrop-blur-sm ring-1 ring-white/10 
                            rounded-2xl overflow-hidden md:flex">
                    
                    <div class="md:w-5/12 p-4">
                        <img src="${founder.avatar}" alt="${founder.name}" 
                             class="relative rounded-xl shadow-2xl shadow-black/60 w-full h-full object-cover">
                    </div>

                    <div class="md:w-7/12 p-8 flex flex-col justify-center">
                        <span class="inline-block bg-white/10 text-indigo-300 text-xs font-semibold 
                                     px-3 py-1 rounded-full uppercase tracking-wider w-fit">
                            Nhà Sáng Lập & Giám Đốc
                        </span>
                        
                        <h3 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
                                   bg-gradient-to-r from-slate-200 to-white mt-4 py-4 uppercase leading-tight">
                            ${founder.name}
                        </h3>                        
                        <p class="text-slate-300 mt-4 text-lg leading-relaxed">${founder.bio}</p>
                        
                        <div class="mt-8">
                            <a href="/teacher/${founder.id}" 
                               class="inline-flex items-center gap-2 bg-white text-slate-900 font-bold 
                                      py-3 px-8 rounded-full shadow-lg transform hover:scale-105 
                                      transition-all duration-300">
                                <span>Tìm hiểu thêm</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" 
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" 
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                          clip-rule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. Render foreign teachers
    foreignTeachersContainer.innerHTML = foreignTeachers.map(createTeacherCard).join('');

    // 5. Render vietnamese teachers
    vietnameseTeachersContainer.innerHTML = vietnameseTeachers.map(createTeacherCard).join('');
}

// 6.3. Render slider giáo viên
function initTeachersSlider() {
    const instructorsContainer = document.getElementById('instructors-container');
    if (!instructorsContainer) return; // Không có thì thoát luôn

    // Xóa nội dung mặc định
    instructorsContainer.innerHTML = '';

    // Render từng teacher thành slide
    teachers_data.forEach(teacher => {
        const teacherSlideHTML = `
            <div class="swiper-slide text-center">
                <img src="${teacher.avatar}" alt="${teacher.name}" 
                     class="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg object-cover">
                <h4 class="font-bold text-lg">${teacher.name}</h4>
                <p class="text-gray-500">${teacher.subject}</p>
            </div>
        `;
        instructorsContainer.insertAdjacentHTML('beforeend', teacherSlideHTML);
    });
}


// =================================================================
// PHẦN 7: TRANG TIN TỨC
// =================================================================

// 7.1. Trang chi tiết tin tức
function initNewsDetail() {
    const path = window.location.pathname;
    const detailPageRegex = /^\/news\/[0-9]+$/;

    if (!detailPageRegex.test(path)) return;

    const articleId = parseInt(path.split('/')[2], 10);
    const articleContainer = document.getElementById('article-container');
    const relatedArticlesContainer = document.getElementById('related-articles-container');
    const article = newsData.find(item => item.id === articleId);

    if (article && articleContainer) {
        document.title = `${article.title} - Enrich English Center`;
        const articleContentHTML = renderSections(article.sections);
        articleContainer.innerHTML = `
            <header class="mb-8">
                <h1 class="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">${article.title}</h1>
                <p class="mt-4 text-gray-500">Đăng bởi <span class="font-semibold text-gray-700">${article.author}</span> vào ngày ${article.publishDate}</p>
            </header>
            <figure class="mb-8">
                <img src="${article.mainImage}" alt="${article.title}" class="w-full h-auto rounded-lg shadow-lg">
            </figure>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">${articleContentHTML}</div>
            ${article.authorImage ? `
            <div class="mt-16 bg-gray-50 rounded-lg p-8 flex items-center gap-6">
                <img src="${article.authorImage}" alt="${article.author}" class="w-20 h-20 rounded-full object-cover">
                <div>
                    <h4 class="font-bold text-xl text-gray-800">${article.author}</h4>
                    <p class="text-sm text-gray-500 mb-2">${article.authorTitle || ''}</p>
                </div>
            </div>` : ''}
        `;
    } else if (articleContainer) {
        articleContainer.innerHTML = `
            <h1 class="text-3xl md:text-5xl font-bold text-center text-red-500">404 - Bài viết không tồn tại</h1>
            <p class="text-center mt-4 text-gray-600">
                Vui lòng quay lại <a href="/news" class="text-orange-500 font-semibold hover:underline">trang tin tức</a>.
            </p>`;
    }

    if (relatedArticlesContainer) {
        const relatedArticles = newsData.filter(item => item.id !== articleId).slice(0, 3);
        relatedArticlesContainer.innerHTML = relatedArticles.map(related => `
            <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <a href="/news/${related.id}">
                    <img src="${related.mainImage}" alt="${related.title}" class="w-full h-48 object-cover">
                </a>
                <div class="p-6">
                    <h3 class="font-bold text-lg mb-2 text-gray-800 leading-tight h-14 overflow-hidden">
                        <a href="/news/${related.id}">${related.title}</a>
                    </h3>
                    <a href="/news/${related.id}" class="font-semibold text-orange-500 hover:text-orange-600">Xem chi tiết &rarr;</a>
                </div>
            </div>
        `).join('');
    }
}


// 7.2. Trang danh sách tin tức
function initNewsList() {
    if (window.location.pathname !== "/news") return;

    const sortedNews = newsData.sort((a, b) => parseVietnameseDate(b.publishDate) - parseVietnameseDate(a.publishDate));
    const featuredNewsContainer = document.getElementById('featured-news');
    const latestNewsListContainer = document.getElementById('latest-news-list');
    const popularStoriesListContainer = document.getElementById('popular-stories-list');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const viewMorePopularBtn = document.getElementById('view-more-popular-btn');
    const latestNewsHeading = document.getElementById('latest-news-heading');
    const popularStoriesHeading = document.getElementById('popular-stories-heading');

    // Featured
    if (sortedNews.length > 0 && featuredNewsContainer) {
        const featuredArticle = sortedNews[0];
        featuredNewsContainer.innerHTML = `
            <div class="relative rounded-lg overflow-hidden shadow-lg group">
                <a href="/news/${featuredArticle.id}">
                    <img src="${featuredArticle.mainImage}" alt="${featuredArticle.title}" class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" style="aspect-ratio: 16/9;">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <span class="text-xs font-semibold ${getCategoryClasses(featuredArticle.type)} px-2 py-1 rounded">${featuredArticle.type}</span>
                        <h1 class="text-2xl md:text-3xl font-bold mt-2 leading-tight group-hover:text-orange-300 transition-colors">${featuredArticle.title}</h1>
                        <p class="hidden md:block text-sm mt-2 text-gray-200">${getShortDescription(featuredArticle.sections)}</p>
                    </div>
                </a>
            </div>
        `;
    }

    // Latest
    const INITIAL_LATEST_COUNT = 2;
    let isLatestNewsExpanded = false;

    const renderLatestNews = () => {
        const articlesToRender = isLatestNewsExpanded ?
            sortedNews.slice(1) : sortedNews.slice(1, 1 + INITIAL_LATEST_COUNT);

        latestNewsListContainer.innerHTML = articlesToRender.map(article => `
            <article class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 group">
                <a href="/news/${article.id}" class="w-full sm:w-48 h-36 flex-shrink-0 block">
                    <img src="${article.mainImage}" alt="${article.title}" class="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity">
                </a>
                <div>
                    <span class="text-xs font-semibold ${getCategoryClasses(article.type).replace('bg-', 'text-')}">${article.type}</span>
                    <h3 class="text-lg font-bold text-gray-800 mt-1 leading-tight group-hover:text-orange-500 transition-colors">
                        <a href="/news/${article.id}">${article.title}</a>
                    </h3>
                    <p class="text-sm text-gray-600 mt-2 line-clamp-2">${getShortDescription(article.sections)}</p>
                    <p class="text-xs text-gray-500 mt-3">${article.publishDate}</p>
                </div>
            </article>
        `).join('');

        if (sortedNews.length - 1 > INITIAL_LATEST_COUNT) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = isLatestNewsExpanded ? 'Rút gọn' : 'Xem tất cả';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    };

    renderLatestNews();

    loadMoreBtn.addEventListener('click', () => {
        isLatestNewsExpanded = !isLatestNewsExpanded;
        renderLatestNews();
        if (!isLatestNewsExpanded && latestNewsHeading) {
            latestNewsHeading.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Popular
    const INITIAL_POPULAR_COUNT = 3;
    let isPopularNewsExpanded = false;

    const renderPopularNews = () => {
        const articlesToRender = isPopularNewsExpanded ? sortedNews : sortedNews.slice(0, INITIAL_POPULAR_COUNT);

        popularStoriesListContainer.innerHTML = articlesToRender.map(article => `
            <div class="flex space-x-3 group">
                <a href="/news/${article.id}" class="w-20 h-16 flex-shrink-0 block">
                    <img src="${article.mainImage}" alt="${article.title}" class="w-full h-full object-cover rounded-md group-hover:opacity-80 transition-opacity">
                </a>
                <div>
                    <h3 class="font-semibold text-sm text-gray-800 leading-tight group-hover:text-orange-500 transition-colors">
                        <a href="/news/${article.id}">${article.title}</a>
                    </h3>
                    <p class="text-xs text-gray-500 mt-1">${article.publishDate}</p>
                </div>
            </div>
        `).join('');

        if (sortedNews.length > INITIAL_POPULAR_COUNT) {
            viewMorePopularBtn.style.display = 'block';
            viewMorePopularBtn.innerHTML = isPopularNewsExpanded ? '← Rút gọn' : 'Xem thêm →';
        } else {
            viewMorePopularBtn.style.display = 'none';
        }
    };

    renderPopularNews();

    viewMorePopularBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isPopularNewsExpanded = !isPopularNewsExpanded;
        renderPopularNews();
        if (!isPopularNewsExpanded && popularStoriesHeading) {
            popularStoriesHeading.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// 7.3. News slider trang chủ
function initNewsSlider() {
    const newsSwiperWrapper = document.getElementById('news-swiper-wrapper');
    if (!newsSwiperWrapper) return;

    const sortedNews = newsData.sort((a, b) => parseVietnameseDate(b.publishDate) - parseVietnameseDate(a.publishDate));
    const recentNews = sortedNews.slice(0, 8);

    const newsSlidesHTML = recentNews.map((article, index) => {
        const shortDescription = getShortDescription(article.sections);
        const categoryClasses = getCategoryClasses(article.type);
        return `
            <div class="swiper-slide" data-aos="fade-left" data-aos-delay="${index * 100}">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col group">
                    <a href="/news/${article.id}" class="block overflow-hidden">
                        <img src="${article.mainImage}" alt="${article.title}" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500">
                    </a>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-center text-sm text-gray-500 mb-2">
                            <span class="${categoryClasses} font-semibold rounded-full px-3 py-1 text-xs text-white">${article.type}</span>
                            <time datetime="${new Date(parseVietnameseDate(article.publishDate)).toISOString().split('T')[0]}">${article.publishDate}</time>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800 line-clamp-2 h-14">
                            <a href="/news/${article.id}" class="hover:text-orange-500 transition-colors">${article.title}</a>
                        </h3>
                        <p class="text-gray-600 flex-grow mb-4 line-clamp-3">${shortDescription}</p>
                        <a href="/news/${article.id}" class="text-orange-500 font-semibold self-start hover:underline">Đọc thêm →</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    newsSwiperWrapper.innerHTML = newsSlidesHTML;
}


// =================================================================
// PHẦN 8: STUDENT ACHIEVEMENTS (MODAL)
// =================================================================
function initAchievementModal() {
    const modal = document.getElementById("achievement-modal");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.getElementById("modal-close");

    if (!modal || !modalContent || !modalClose) return; // không có modal thì thoát

    // --- 1. Mở modal khi click vào card ---
    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("click", () => {
            const achievementId = card.getAttribute("data-id");
            const achievement = achievementsData.find(a => a.id == achievementId);

            if (!achievement) return;

            // Render nội dung vào modal
            modalContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${achievement.title}</h2>
                <img src="${achievement.image}" alt="${achievement.title}" class="w-full h-64 object-cover rounded mb-4">
                <p class="text-gray-700 leading-relaxed">${achievement.description}</p>
            `;

            modal.classList.remove("hidden"); // hiện modal
            document.body.classList.add("overflow-hidden"); // khóa scroll
        });
    });

    // --- 2. Đóng modal khi click nút close ---
    modalClose.addEventListener("click", () => {
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    });

    // --- 3. Đóng modal khi click ra ngoài ---
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        }
    });
}

// =================================================================
// PHẦN 9: BOOTSTRAP (CHẠY KHI DOM READY)
// =================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Chạy code chung
    initMobileMenu();
    initCounters();
    initLandbot();

    // Chạy sliders
    initHeroSwiper();
    initAllSliders();
    initNewsSlider();
    initTeachersSlider();

    // Trang cụ thể
    initCourseDetail();
    displayCourses();
    initCourseFilters();

    initTeacherDetail();
    initTeachersList();

    initNewsDetail();
    initNewsList();

    initAchievementModal();
});
