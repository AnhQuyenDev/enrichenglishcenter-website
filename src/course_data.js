const coursesData = [
    {
        id: 1,
        title: "Tiếng Anh Cơ Bản",
        duration: "3 tháng",
        level: "Cơ bản",
        lessons: 18,
        shortDescription: "Khóa học này được thiết kế để giúp bạn nắm vững những kiến thức cơ bản nhất về ngữ pháp, từ vựng và phát âm tiếng Anh. Môi trường học tập thân thiện và hỗ trợ sẽ giúp bạn tự tin hơn trong những bước đầu tiên.",
        longDescription: "Với lộ trình bài bản, bạn sẽ được học về các thì cơ bản, cách đặt câu hỏi, và vốn từ vựng cần thiết cho giao tiếp hàng ngày. Giảng viên sẽ theo sát và sửa lỗi chi tiết cho từng học viên.",
        what_learn:[
            "Nắm vững ngữ pháp cơ bản",
            "Mở rộng vốn từ vựng",
            "Cải thiện kỹ năng phát âm"
        ],
        who:[
            "Người mới bắt đầu học tiếng Anh",
            "Học sinh, sinh viên",
            "Người đi làm cần cải thiện tiếng Anh"
        ],
        syllabus: [
            { title: "Tuần 1: Giới thiệu về ngữ pháp tiếng Anh", description: "Học về các thì cơ bản: Hiện tại đơn, Quá khứ đơn, Tương lai đơn." },
            { title: "Tuần 2: Thực hành phát âm", description: "Luyện tập phát âm qua các bài tập và trò chơi." },
            { title: "Tuần 3: Từ vựng theo chủ đề", description: "Mở rộng từ vựng qua các chủ đề quen thuộc." }
        ],
        fee: "1.500.000 VNĐ",
        schedule: "Thứ 2-4-6, từ 18:00 đến 19:30",
        status: "Đang mở đăng ký"
    },
    {
        id: 2,
        title: "Tiếng Anh Nâng Cao",
        duration: "5 tháng",
        level: "Nâng cao",
        lessons: 38,
        shortDescription: "Khóa học này được thiết kế để giúp bạn nắm vững những kiến thức cơ bản nhất về ngữ pháp, từ vựng và phát âm tiếng Anh. Môi trường học tập thân thiện và hỗ trợ sẽ giúp bạn tự tin hơn trong những bước đầu tiên.",
        longDescription: "Với lộ trình bài bản, bạn sẽ được học về các thì cơ bản, cách đặt câu hỏi, và vốn từ vựng cần thiết cho giao tiếp hàng ngày. Giảng viên sẽ theo sát và sửa lỗi chi tiết cho từng học viên.",
        what_learn:[
            "Nắm vững ngữ pháp nâng cao",
            "Mở rộng vốn từ vựng chuyên sâu",
            "Cải thiện kỹ năng phát âm"
        ],
        who:[
            "Người đã có nền tảng tiếng Anh cơ bản",
            "Học sinh, sinh viên muốn nâng cao trình độ",
            "Người đi làm cần sử dụng tiếng Anh trong công việc"
        ],
        syllabus: [
            { title: "Tuần 1: Giới thiệu về ngữ pháp tiếng Anh", description: "Học về các thì cơ bản: Hiện tại đơn, Quá khứ đơn, Tương lai đơn." },
            { title: "Tuần 2: Thực hành phát âm", description: "Luyện tập phát âm qua các bài tập và trò chơi." },
            { title: "Tuần 3: Từ vựng theo chủ đề", description: "Mở rộng từ vựng qua các chủ đề quen thuộc." }
        ],
        fee: "2.500.000 VNĐ",
        schedule: "Thứ 2-4-6, từ 18:00 đến 19:30",
        status: "Đang mở đăng ký"
    },
];


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