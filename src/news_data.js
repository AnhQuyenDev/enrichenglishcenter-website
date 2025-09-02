const newsData = [
  // Bài viết mới 1: Khai trương cơ sở
  {
    id: 1,
    title: "Tưng Bừng Khai Trương Cơ Sở 1 - Chào Đón Hành Trình Mới!",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "15 tháng 7, 2025",
    type: "Sự kiện",
    mainImage: "/images/khai-truong-co-so1.jpg", // Ảnh chụp toàn cảnh buổi khai trương
    sections: [
      {
        type: "paragraph",
        content: "Hòa chung không khí hân hoan, Enrich English Center vui mừng thông báo chính thức khai trương cơ sở đầu tiên tại địa chỉ [Địa chỉ cơ sở]. Sự kiện này đánh dấu một cột mốc quan trọng trong hành trình mang đến một môi trường học tiếng Anh chuyên nghiệp, hiện đại và đầy cảm hứng cho tất cả mọi người."
      },
      {
        type: "heading",
        content: "Không Gian Học Tập Hiện Đại"
      },
      {
        type: "paragraph",
        content: "Cơ sở mới của chúng tôi được thiết kế với không gian mở, trang thiết bị dạy và học tiên tiến, cùng thư viện sách phong phú. Mỗi phòng học đều được trang bị máy chiếu, bảng tương tác và hệ thống âm thanh chất lượng cao, nhằm tạo điều kiện tốt nhất cho việc tiếp thu kiến thức."
      },
      {
        type: "image",
        src: "/images/room-1.jpg", // Ảnh một phòng học mẫu
        caption: "Phòng học được trang bị đầy đủ tiện nghi."
      },
      {
        type: "heading",
        content: "Ưu Đãi Đặc Biệt Mừng Khai Trương"
      },
      {
        type: "paragraph",
        content: "Nhân dịp đặc biệt này, Enrich English Center gửi tặng quý phụ huynh và các bạn học viên những ưu đãi hấp dẫn: Giảm ngay 20% học phí cho 50 học viên đăng ký đầu tiên, cùng nhiều phần quà giá trị khác. Đừng bỏ lỡ cơ hội vàng để bắt đầu hành trình chinh phục tiếng Anh của bạn!"
      },
      {
        type: "quote",
        content: "Sự khởi đầu mới, cơ hội mới, và thành công mới đang chờ đón bạn tại Enrich English Center."
      }
    ]
  },
  // Bài viết mới 2: Lịch nghỉ bão
  {
    id: 2,
    title: "Thông Báo Khẩn: Tạm Hoãn Lịch Học Do Ảnh Hưởng Của Bão",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "24 tháng 8, 2025",
    type: "Thông báo",
    mainImage: "/images/Bao-So-5-01.png", // Ảnh liên quan đến thời tiết, cảnh báo
    sections: [
      {
        type: "paragraph",
        content: "Kính gửi Quý phụ huynh và các em học viên, do ảnh hưởng của cơn bão số 5 đang tiến vào đất liền, để đảm bảo an toàn tuyệt đối cho học viên và cán bộ nhân viên, Enrich English Center xin trân trọng thông báo tạm hoãn toàn bộ lịch học trong chiều ngày 24/08/2025 và ngày 25/08/2025."
      },
      {
        type: "heading",
        content: "Lịch Học Bù Dự Kiến"
      },
      {
        type: "paragraph",
        content: "Trung tâm sẽ sắp xếp lịch học bù trong thời gian sớm nhất và sẽ thông báo cụ thể đến từng lớp qua email và ứng dụng của trung tâm. Chúng tôi rất mong nhận được sự thông cảm từ quý vị."
      },
      {
        type: "heading",
        content: "Lưu Ý An Toàn"
      },
      {
        type: "paragraph",
        content: "Trong thời gian bão, đề nghị mọi người hạn chế ra ngoài, kiểm tra và gia cố nhà cửa, cập nhật thông tin thời tiết thường xuyên. Mọi thắc mắc vui lòng liên hệ hotline [Số điện thoại] để được hỗ trợ. Chúc tất cả mọi người an toàn!"
      }
    ]
  },
  // Bài viết mới 3: Lễ Quốc Khánh 2/9
  {
    id: 3,
    title: "Thông Báo Lịch Nghỉ Lễ Quốc Khánh 2/9",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "31 tháng 8, 2025",
    type: "Thông báo",
    mainImage: "/images/quockhanh.png", // Ảnh cờ đỏ sao vàng hoặc hình ảnh liên quan đến ngày lễ
    sections: [
      {
        type: "paragraph",
        content: "Nhân dịp kỷ niệm ngày Quốc Khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (2/9), Enrich English Center xin trân trọng thông báo đến toàn thể Quý phụ huynh, học viên và nhân viên lịch nghỉ lễ như sau:"
      },
      {
        type: "heading",
        content: "Thời Gian Nghỉ Lễ"
      },
      {
        type: "paragraph",
        content: "Trung tâm sẽ nghỉ lễ từ Thứ Hai, ngày 01/09/2025 đến hết ngày 02/09/2025. Mọi hoạt động giảng dạy và tư vấn sẽ trở lại bình thường vào Thứ Tư, ngày 03/09/2025."
      },
      {
        type: "image",
        src: "/images/lich-nghi-le.png", // Ảnh lịch đánh dấu ngày nghỉ
        caption: "Lịch nghỉ lễ chính thức từ trung tâm."
      },
      {
        type: "paragraph",
        content: "Kính chúc toàn thể mọi người có một kỳ nghỉ lễ vui vẻ, ấm áp và ý nghĩa bên gia đình và người thân. Trân trọng thông báo!"
      }
    ]
  },
  {
    id: 4,
    title: "Chúc Mừng Khai Trương Cơ Sở 5 và 6 - Nhân Đôi Niềm Vui!",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "31 tháng 8, 2025",
    type: "Sự kiện",
    mainImage: "/images/khai-truong-co-so-5-6.jpg", // Ảnh chụp sự kiện khai trương 2 cơ sở
    sections: [
      {
        type: "paragraph",
        content: "Chạy cho kịp cúng khai trương 2 cơ sở cùng 1 buổi; cuối cùng cũng kịp như mong đợi! Hai anh em sinh đôi (cơ sở 5 và 6) tuy xa tít chân trời nhưng cùng ngày khởi công và cùng ngày cúng lễ."
      },
      {
        type: "heading",
        content: "Nỗ Lực Vượt Bậc - Chào Đón Tương Lai"
      },
      {
        type: "paragraph",
        content: "Tuy chưa hoàn thiện phần trang trí vì thời gian khá gấp rút, nhưng chúng tôi xin gửi lời cảm ơn chân thành đến 2 đội thi công cơ sở 5 (Hưng Lộc) và cơ sở 6 (Mỹ Thượng) của trung tâm đã dựng lên một cơ sở giáo dục chắc chắn và tạo sự thiện cảm ban đầu cho học sinh và quý phụ huynh."
      },
      {
        type: "image",
        src: "/images/co-so-moi-1.jpg", // Ảnh cơ sở vật chất mới
        caption: "Không gian ban đầu tại cơ sở Hưng Lộc."
      },
      {
        type: "image",
        src: "/images/khai-truong-co-so-5-6.jpg", // Ảnh cơ sở vật chất mới
        caption: "Cơ sở Mỹ Thượng trong ngày đầu ra mắt."
      },
      {
        type: "heading",
        content: "Chung Một Mái Nhà ENRICH"
      },
      {
        type: "paragraph",
        content: "Hi vọng đây sẽ là một môi trường học tập thật thân thiện cho các em học sinh tại Hưng Lộc và Mỹ Thượng. Bốn người anh cả của ENRICH là Phú Vinh, Phú Vang, Thuận An, Vinh Lộc sẽ cùng dìu dắt 2 em út 5 và 6 chung đôi trên chặng đường sắp tới!"
      },
      {
        type: "quote",
        content: "Niềm vui nho nhỏ khi ngày cúng khai trương nhận được nhiều sự ủng hộ từ tình cảm đặc biệt của Phụ huynh Hưng Lộc và Mỹ Thượng. Đây chính là động lực để chúng tôi cố gắng hơn nữa."
      }
    ]
  },
  // Bài viết mới 5: Tin tuyển dụng
  {
    id: 5,
    title: "Tuyển Dụng: Enrich English Center",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Nhân sự",
    authorImage: "/images/cohaoavatar.jpg", // Có thể thay bằng avatar chung của trung tâm
    publishDate: "01 tháng 9, 2025",
    type: "Tuyển dụng",
    mainImage: "/images/tuyendung.jpg", // Đường dẫn tới hình ảnh bạn đã cung cấp
    sections: [
      {
        type: "paragraph",
        content: "Với mục tiêu mở rộng và nâng cao chất lượng giảng dạy, Enrich English Center đang tìm kiếm những ứng viên tài năng và tâm huyết cho vị trí Giáo viên và Trợ giảng tiếng Anh. Hãy gia nhập đội ngũ của chúng tôi để cùng nhau tạo nên một môi trường học tập đầy cảm hứng!"
      },
      {
        type: "heading",
        content: "Thông Tin Tuyển Dụng Chi Tiết"
      },
      {
        type: "paragraph",
        content: "Số lượng: 05 Giáo viên & Trợ giảng."
      },
      {
        type: "paragraph",
        content: "Địa điểm làm việc (tại 1 trong các cơ sở): Phú Vinh, Phú Vang, Hưng Lộc, Vinh Lộc, Thuận An, Mỹ Thượng."
      },
      {
        type: "heading",
        content: "Yêu Cầu Ứng Viên"
      },
      {
        type: "paragraph",
        content: "Tốt nghiệp Đại học chuyên ngành Sư phạm Anh hoặc Ngôn ngữ Anh. Có đam mê với công việc giảng dạy, năng động và có tinh thần trách nhiệm cao."
      },
      {
        type: "heading",
        content: "Quyền Lợi"
      },
      {
        type: "image",
        src: "/images/moitruonglamviec.jpg",
        caption: "Môi trường làm việc thân thiện"
      },
      {
        type: "paragraph",
        content: "Mức lương hấp dẫn: 12 - 15 triệu đồng/tháng. Môi trường làm việc chuyên nghiệp, thân thiện và có cơ hội phát triển bản thân."
      },
      {
        type: "quote",
        content: "Ứng viên quan tâm vui lòng liên hệ trực tiếp qua số điện thoại: 0933 701 555 hoặc qua email: contact@enrichenglishcenter.com để biết thêm chi tiết và sắp xếp lịch phỏng vấn. Enrich English Center rất mong được chào đón bạn!"
      }
    ]
  },
  // Bài viết mới 6: Hoạt động cộng đồng
  {
    id: 6,
    title: "Chung Tay Yêu Thương: ENRICH Đồng Hành Cùng Gia Đình Học Viên Có Hoàn Cảnh Khó Khăn",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "17 tháng 8, 2025",
    type: "Hoạt động Cộng đồng",
    mainImage: "/images/hoat-dong-thien-nguyen.jpg", // Đường dẫn tới hình ảnh chính bạn đã cung cấp
    sections: [
      {
        type: "paragraph",
        content: "Sáng ngày 17/8, Trung tâm ngoại ngữ ENRICH đã tổ chức một chuyến thăm hỏi và động viên gia đình anh Quý tại thôn 2, Vĩnh Thanh, xã Phú Vinh. Gia đình anh vừa không may gặp phải tai nạn lao động nguy kịch, đẩy hoàn cảnh vốn đã khó khăn càng thêm éo le. Chuyến đi là lời kêu gọi cộng đồng cùng chung tay giúp đỡ gia đình và lan tỏa tình yêu thương."
      },
      {
        type: "heading",
        content: "Hành Trình Gieo Mầm Yêu Thương"
      },
      {
        type: "paragraph",
        content: "Với phương châm 'Lá lành đùm bọc lá rách', trong suốt một năm qua, ENRICH luôn là một trong những đơn vị tích cực trong các hoạt động vì cộng đồng. Trung tâm đã và đang hỗ trợ nhiều gia đình có hoàn cảnh đặc biệt, như trường hợp của chị Huỳnh Hồng - một người mẹ đơn thân nuôi con nhỏ bị bệnh hiểm nghèo."
      },
      {
        type: "paragraph",
        content: "Bên cạnh đó, trung tâm thường xuyên trao tặng các suất học bổng, miễn 100% học phí cho các học sinh nghèo có thành tích học tập xuất sắc, và hỗ trợ các em có hoàn cảnh khó khăn được tiếp tục con đường học vấn. Các hoạt động này được duy trì nhờ sự ủng hộ của quý phụ huynh và sự điều phối tận tâm từ Giám đốc trung tâm - cô Nguyễn Bích Hảo."
      },
      {
        type: "image",
        src: "/images/hoat-dong-trao-qua.jpg",
        caption: "Đại diện trung tâm thăm hỏi và trao quà."
      },
      {
        type: "quote",
        content: "Để hôm nay ENRICH mang một dấu ấn ấm đẹp và trong trẻo trong đôi mắt mọi người! ENRICH CỐ LÊN! Tất cả mọi người cố lên!"
      }
    ]
  },
  // Bài viết mới 7: Cập nhật lịch học
  {
    id: 7,
    title: "Thông Báo Cập Nhật Thời Khóa Biểu Năm Học Mới, Áp Dụng Từ 25/08/2025",
    author: "CEO Nguyễn Bích Hảo",
    authorTitle: "Ban Giám Đốc",
    authorImage: "/images/cohaoavatar.jpg",
    publishDate: "20 tháng 8, 2025",
    type: "Thông báo",
    mainImage: "/images/thong-bao-lich-hoc.jpg", // Đường dẫn tới hình ảnh bạn đã cung cấp
    sections: [
      {
        type: "paragraph",
        content: "Năm học mới sắp đến, Trung tâm ngoại ngữ ENRICH xin trân trọng thông báo về việc thay đổi và cập nhật thời khóa biểu cho tất cả các lớp học. Lịch học mới sẽ chính thức được áp dụng bắt đầu từ tuần sau, ngày 25/08/2025."
      },
      {
        type: "heading",
        content: "Lịch Trình Linh Hoạt, Đồng Hành Cùng Học Viên"
      },
      {
        type: "paragraph",
        content: "Đặc biệt, đối với các lớp Trung học phổ thông (Luyện Pre-IELTS và Luyện IELTS), lịch học đã được điều chỉnh linh động để phù hợp với lịch học chính khóa của các em tại trường sau ngày khai giảng. Trung tâm đã nỗ lực sắp xếp thời gian biểu một cách khoa học nhất để đảm bảo các em có thể cân bằng việc học ở trường và tại trung tâm."
      },
      {
        type: "image",
        src: "/images/lich-hoc-phu-vinh-9.jpg",
        caption: "Thời khóa biểu Cơ sở Phú Vinh"
      },
      {
        type: "image",
        src: "/images/lich-hoc-phu-vang-9.jpg",
        caption: "Thời khóa biểu Cơ sở Phú Vang"
      },
      {
        type: "image",
        src: "/images/lich-hoc-my-thuong-9.jpg",
        caption: "Thời khóa biểu Cơ sở Mỹ Thượng"
      },
      {
        type: "image",
        src: "/images/lich-hoc-hung-loc-9.jpg",
        caption: "Thời khóa biểu Cơ sở Hưng Lộc"
      },
      {
        type: "image",
        src: "/images/lich-hoc-thuan-an-9.jpg",
        caption: "Thời khóa biểu Cơ sở Thuận An"
      },
      {
        type: "image",
        src: "/images/lich-hoc-vinh-loc-9.jpg",
        caption: "Thời khóa biểu Cơ sở Vinh Lộc"
      },
      {
        type: "heading",
        content: "Lời Nhắn Gửi Yêu Thương"
      },
      {
        type: "paragraph",
        content: "Nhìn lại một mùa hè sôi động đã qua, chúng tôi vô cùng tự hào về sự nỗ lực và tiến bộ của tất cả các em học viên. Cảm ơn Quý Phụ huynh đã luôn tin tưởng và đồng hành. Sự phối hợp chặt chẽ giữa gia đình, thầy cô và trung tâm chính là nền tảng vững chắc nhất cho tương lai của các em."
      },
      {
        type: "quote",
        content: "Năm học mới sắp đến, mến chúc các bạn học sinh luôn chăm ngoan, gặt hái nhiều thành công; và luôn là niềm vui, niềm tự hào của Ba Mẹ. Chúc các con có một năm học mới thật nhiều năng lượng và hiệu quả!"
      }
    ]
  }
];

export { newsData };