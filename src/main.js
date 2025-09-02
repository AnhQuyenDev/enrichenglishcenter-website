// =================================================================
// PHẦN 1: IMPORT CÁC MODULE CẦN THIẾT
// =================================================================
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import List from 'list.js';
import { coursesData } from './course_data.js';
import { teachers_data } from './teacher_data.js';
import { newsData } from './news_data.js';


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
        const urlParams = window.location.pathname.split('/');
        const courseIdString = urlParams.pop() || urlParams.pop();
        const courseId = parseInt(courseIdString, 10);

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
        const pathParts = window.location.pathname.split('/');
        const teacherIdString = pathParts.pop() || pathParts.pop();
        const teacherId = parseInt(teacherIdString, 10);

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
            socialHtml += `<a href="${teacher.contact.facebook}" target="_blank" class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"><i class="fab fa-facebook-f"></i></a>`;
        }
        if (teacher.contact.instagram) {
            socialHtml += `<a href="${teacher.contact.instagram}" target="_blank" class="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"><i class="fab fa-instagram"></i></a>`;
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
                    <a href="/course/${course.id}" class="font-semibold text-orange-500 hover:text-orange-600">Xem chi tiết</a>
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

// =================================================================
// =================================================================
// ===== 1. CÁC HÀM HỖ TRỢ CHUNG (DÙNG CHO CẢ 2 TRANG) ==========
// =================================================================

// Chuyển đổi chuỗi ngày tháng tiếng Việt sang đối tượng Date để sắp xếp
const parseVietnameseDate = (dateString) => {
    const parts = dateString.replace('tháng ', '').replace(',', '').split(' ');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
};

// Lấy đoạn văn bản đầu tiên làm mô tả ngắn
const getShortDescription = (sections) => {
    const firstParagraph = sections.find(section => section.type === 'paragraph');
    if (firstParagraph) {
        return firstParagraph.content.length > 120 
            ? firstParagraph.content.substring(0, 120) + '...' 
            : firstParagraph.content;
    }
    return 'Nhấn để xem chi tiết...';
};

// Chuyển đổi mảng sections của bài viết thành HTML (dùng cho trang chi tiết)
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


// =================================================================
// ===== 2. KIỂM TRA URL ĐỂ CHẠY CODE TƯƠNG ỨNG ===================
// =================================================================

const path = window.location.pathname;
// **THAY ĐỔI 1**: Dùng biểu thức chính quy để nhận diện trang chi tiết /news/{id}
const detailPageRegex = /^\/news\/[0-9]+$/;

// ------ A. NẾU LÀ TRANG CHI TIẾT TIN TỨC (/news/{id}) ------
if (detailPageRegex.test(path)) {
    // **THAY ĐỔI 2**: Lấy ID từ chính đường dẫn URL, không dùng query param nữa
    // Ví dụ: "/news/3" -> split('/') -> ["", "news", "3"]. Lấy phần tử thứ 2.
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
        articleContainer.innerHTML = `<h1 class="text-3xl md:text-5xl font-bold text-center text-red-500">404 - Bài viết không tồn tại</h1><p class="text-center mt-4 text-gray-600">Vui lòng quay lại <a href="/news" class="text-orange-500 font-semibold hover:underline">trang tin tức</a>.</p>`;
    }

    if (relatedArticlesContainer) {
        const relatedArticles = newsData.filter(item => item.id !== articleId).slice(0, 3);
        relatedArticlesContainer.innerHTML = relatedArticles.map(related => `
            <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <a href="/news/${related.id}"><img src="${related.mainImage}" alt="${related.title}" class="w-full h-48 object-cover"></a>
                <div class="p-6">
                    <h3 class="font-bold text-lg mb-2 text-gray-800 leading-tight h-14 overflow-hidden"><a href="/news/${related.id}">${related.title}</a></h3>
                    <a href="/news/${related.id}" class="font-semibold text-orange-500 hover:text-orange-600">Xem chi tiết &rarr;</a>
                </div>
            </div>
        `).join('');
    }
} 
// ------ B. NẾU LÀ TRANG DANH SÁCH TIN TỨC (/news) ------
else if (path.includes('/news')) {
    // --- KHAI BÁO CÁC BIẾN VÀ ELEMENT ---
    const sortedNews = newsData.sort((a, b) => parseVietnameseDate(b.publishDate) - parseVietnameseDate(a.publishDate));
    const featuredNewsContainer = document.getElementById('featured-news');
    const latestNewsListContainer = document.getElementById('latest-news-list');
    const popularStoriesListContainer = document.getElementById('popular-stories-list');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const viewMorePopularBtn = document.getElementById('view-more-popular-btn');
    const latestNewsHeading = document.getElementById('latest-news-heading');
    const popularStoriesHeading = document.getElementById('popular-stories-heading'); // Thêm element heading

    // --- PHẦN TIN NỔI BẬT (Không thay đổi) ---
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

    // --- LOGIC CHO PHẦN TIN MỚI NHẤT (XEM THÊM & RÚT GỌN) ---
    const INITIAL_LATEST_COUNT = 2;
    let isLatestNewsExpanded = false;

    const renderLatestNews = () => {
        const articlesToRender = isLatestNewsExpanded ?
            sortedNews.slice(1) :
            sortedNews.slice(1, 1 + INITIAL_LATEST_COUNT);

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

    // --- LOGIC MỚI CHO PHẦN TIN PHỔ BIẾN (XEM THÊM & RÚT GỌN) ---
    const INITIAL_POPULAR_COUNT = 3;
    let isPopularNewsExpanded = false;

    const renderPopularNews = () => {
        // Tin phổ biến được lấy từ đầu danh sách đã sắp xếp
        const articlesToRender = isPopularNewsExpanded ?
            sortedNews : // Hiển thị tất cả
            sortedNews.slice(0, INITIAL_POPULAR_COUNT); // Hiển thị số lượng ban đầu

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
        
        // Cập nhật nút
        if (sortedNews.length > INITIAL_POPULAR_COUNT) {
            viewMorePopularBtn.style.display = 'block';
            viewMorePopularBtn.innerHTML = isPopularNewsExpanded ? '← Rút gọn' : 'Xem thêm →';
        } else {
            viewMorePopularBtn.style.display = 'none';
        }
    };

    // Render lần đầu cho tin phổ biến
    renderPopularNews();

    // Thêm sự kiện click cho nút "Xem thêm ->"
    viewMorePopularBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        isPopularNewsExpanded = !isPopularNewsExpanded; // Đảo ngược trạng thái
        renderPopularNews(); // Render lại
        if (!isPopularNewsExpanded && popularStoriesHeading) {
            // Nếu vừa rút gọn, cuộn lên đầu mục
            popularStoriesHeading.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
// Hàm để lấy lớp CSS cho nhãn (badge) dựa trên loại tin
function getCategoryClasses(type) {
    console.log("Hàm được gọi với type:", type); // Thêm dòng này
    const classMap = {
        'Sự kiện': 'bg-orange-500',
        'Thông báo': 'bg-purple-600',
        'Hoạt động Cộng đồng': 'bg-sky-500',
        'Tuyển dụng': 'bg-emerald-500',
    };
    const result = classMap[type] || 'bg-gray-500';
    console.log("Kết quả trả về:", result); // Thêm dòng này
    return result;
}

// Giả sử đoạn mã này nằm trong file main.js của bạn
// và bạn đã import newsData ở đầu file.
// import { newsData } from './data/newsData.js';
// import Swiper from 'swiper'; // Hoặc import từ CDN

// --- BẮT ĐẦU PHẦN CODE CHO NEWS SLIDER TRÊN TRANG CHỦ ---

// Lấy các element cần thiết
const newsSwiperWrapper = document.getElementById('news-swiper-wrapper');

// Kiểm tra xem element có tồn tại không (để tránh lỗi khi ở trang khác)
if (newsSwiperWrapper) {
    // 1. Sắp xếp tin tức và chỉ lấy 8 bài mới nhất để hiển thị
    const sortedNews = newsData.sort((a, b) => parseVietnameseDate(b.publishDate) - parseVietnameseDate(a.publishDate));
    const recentNews = sortedNews.slice(0, 8);

    // 2. Tạo chuỗi HTML cho các slide
    const newsSlidesHTML = recentNews.map(article => {
        const shortDescription = getShortDescription(article.sections);
        const categoryClasses = getCategoryClasses(article.type);

        return `
            <div class="swiper-slide">
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

    // 3. Chèn HTML vào wrapper của swiper
    newsSwiperWrapper.innerHTML = newsSlidesHTML;
}
// --- KẾT THÚC PHẦN CODE CHO NEWS SLIDER ---

// Lưu ý: Các hàm helper như parseVietnameseDate, getShortDescription, getCategoryClasses
// cần phải có sẵn trong file này hoặc được import từ file khác.

// --- BẮT ĐẦU PHẦN CODE ĐỔ DỮ LIỆU GIÁO VIÊN ---

// 1. Lấy element container
const teacherListContainer = document.getElementById('teacher-list-container');

// 2. Kiểm tra xem container có tồn tại trên trang không
if (teacherListContainer) {
    
    // 3. Dùng hàm map để tạo chuỗi HTML cho mỗi giáo viên
    const teachersHTML = teachers_data.map(teacher => {
        // Cắt ngắn phần bio để hiển thị trên card
        const shortBio = teacher.bio.length > 70 ? teacher.bio.substring(0, 70) + '...' : teacher.bio;

        return `
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm text-center group overflow-hidden">
                <a href="/teacher/${teacher.id}" class="block">
                    <img src="${teacher.avatar}" alt="${teacher.name}" class="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300">
                </a>
                <div class="p-4">
                    <h4 class="font-bold text-lg text-gray-800">${teacher.name}</h4>
                    <p class="text-sm text-gray-500 mb-2">${teacher.subject}</p>
                    <p class="text-gray-600 text-sm mb-4 h-12">${shortBio}</p>
                    <div class="flex justify-center gap-2">
                        <a href="/teacher/${teacher.id}" class="w-full text-sm bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">Xem hồ sơ</a>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // Nối tất cả các chuỗi HTML lại với nhau

    // 4. Chèn chuỗi HTML đã tạo vào container
    teacherListContainer.innerHTML = teachersHTML;
}
// --- KẾT THÚC PHẦN CODE ĐỔ DỮ LIỆU GIÁO VIÊN ---
// Chờ cho toàn bộ nội dung trang được tải xong
document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Lấy phần tử container
    const instructorsContainer = document.getElementById('instructors-container');
    
    // Xóa nội dung mặc định (nếu có) để đảm bảo container rỗng
    instructorsContainer.innerHTML = ' ';

    // 2. Lặp qua mảng teachers_data và tạo HTML
    teachers_data.forEach(teacher => {
        // 3. Tạo chuỗi HTML cho mỗi giáo viên
        const teacherSlideHTML = `
            <div class="swiper-slide text-center">
                <img src="${teacher.avatar}" alt="${teacher.name}" class="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg object-cover">
                <h4 class="font-bold text-lg">${teacher.name}</h4>
                <p class="text-gray-500">${teacher.subject}</p>
            </div>
        `;
        
        // 4. Thêm HTML vừa tạo vào container
        instructorsContainer.insertAdjacentHTML('beforeend', teacherSlideHTML);
    });
});
// Chờ trang tải xong rồi mới chạy script
document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Lấy phần tử container bằng ID mới
    const teamContainer = document.getElementById('team-container');

    // Kiểm tra xem container có tồn tại không để tránh lỗi
    if (teamContainer) {
        // Xóa nội dung HTML cũ bên trong
        teamContainer.innerHTML = '';

        // 2. Lặp qua mảng dữ liệu
        teachers_data.forEach(member => {
            // 3. Tạo chuỗi HTML khớp với cấu trúc mới
            const memberHTML = `
                <div class="team-member">
                    <img src="${member.avatar}" alt="${member.name}" class="w-32 h-32 mx-auto rounded-full shadow-lg mb-4 object-cover">
                    <h3 class="text-lg font-semibold text-gray-800">${member.name}</h3>
                    <p class="text-gray-500">${member.subject}</p>
                </div>
            `;

            // 4. Chèn HTML vừa tạo vào cuối container
            teamContainer.insertAdjacentHTML('beforeend', memberHTML);
        });
    }
});