const teachers_data = [
    {
        id:1,
        avatar: "https://i.pravatar.cc/150?u=evelyn",
        name: "Evelyn Reed",
        subject: "Khoa học dữ liệu",
        bio: "Nhà giáo dục chuyên dụng với hơn 15 năm kinh nghiệm trong phân tích dữ liệu và học máy. Đam mê định hình thế hệ các nhà khoa học dữ liệu tiếp theo.",
        introduction: "Giáo sư Evelyn Reed là một học giả và học viên thành đạt trong lĩnh vực khoa học dữ liệu. Với bằng tiến sĩ trong khoa học máy tính từ Đại học Stanford, nghiên cứu của cô tập trung vào AI đạo đức và học máy có thể hiểu được. Cô đã xuất bản nhiều bài báo trên các tạp chí hàng đầu và được trình bày tại các hội nghị quốc tế. Evelyn tin vào một triết lý giảng dạy pha trộn lý thuyết và ứng dụng trong thế giới thực, đảm bảo sinh viên được chuẩn bị tốt cho ngành công nghiệp.",
        experience: [
            "Giáo sư Khoa học Dữ liệu, Đại học California, Berkeley (2015 - nay)",
            "Nhà khoa học dữ liệu cao cấp, Google (2010 - 2015)",
            "Nhà phân tích dữ liệu, IBM (2005 - 2010)"
        ],
        certifications: [
            "Chứng nhận Khoa học Dữ liệu, Coursera (2018)",
            "Chứng nhận Kỹ sư Học máy, Google (2017)",
            "Chứng nhận Chuyên gia AI, IBM (2016)"
        ],
        achievements: [
            {year: 2020, title: "Giải thưởng Giảng dạy Xuất sắc, Đại học California, Berkeley"},
            {year: 2019, title: "Bài báo được trích dẫn nhiều nhất, Hội nghị Khoa học Dữ liệu Quốc tế"},
            {year: 2018, title: "Thành viên của Hiệp hội Khoa học Dữ liệu"}
        ],
        contact: {
            email: "e.reed@university.edu",
            phone: "(123) 456-7890",
            facebook: "facebook.com/evelyn.reed",
            instagram: "instagram.com/evelyn.reed"
        }
    },
    {
        id:2,
        avatar: "https://i.pravatar.cc/150?u=evelyn",
        name: "Evelyn Reed",
        subject: "Ngôn ngữ Anh",
        bio: "Nhà giáo dục chuyên dụng với hơn 15 năm kinh nghiệm trong phân tích dữ liệu và học máy. Đam mê định hình thế hệ các nhà khoa học dữ liệu tiếp theo.",
        introduction: "Giáo sư Evelyn Reed là một học giả và học viên thành đạt trong lĩnh vực khoa học dữ liệu. Với bằng tiến sĩ trong khoa học máy tính từ Đại học Stanford, nghiên cứu của cô tập trung vào AI đạo đức và học máy có thể hiểu được. Cô đã xuất bản nhiều bài báo trên các tạp chí hàng đầu và được trình bày tại các hội nghị quốc tế. Evelyn tin vào một triết lý giảng dạy pha trộn lý thuyết và ứng dụng trong thế giới thực, đảm bảo sinh viên được chuẩn bị tốt cho ngành công nghiệp.",
        experience: [
            "Giáo sư Khoa học Dữ liệu, Đại học California, Berkeley (2015 - nay)",
            "Nhà khoa học dữ liệu cao cấp, Google (2010 - 2015)",
            "Nhà phân tích dữ liệu, IBM (2005 - 2010)"
        ],
        certifications: [
            "Chứng nhận Khoa học Dữ liệu, Coursera (2018)",
            "Chứng nhận Kỹ sư Học máy, Google (2017)",
            "Chứng nhận Chuyên gia AI, IBM (2016)"
        ],
        achievements: [
            {year: 2020, title: "Giải thưởng Giảng dạy Xuất sắc, Đại học California, Berkeley"},
            {year: 2019, title: "Bài báo được trích dẫn nhiều nhất, Hội nghị Khoa học Dữ liệu Quốc tế"},
            {year: 2018, title: "Thành viên của Hiệp hội Khoa học Dữ liệu"}
        ],
        contact: {
            email: "e.reed@university.edu",
            phone: "(123) 456-7890",
            facebook: "facebook.com/evelyn.reed",
            instagram: "instagram.com/evelyn.reed"
        }
    },
    {
        id:3,
        avatar: "https://i.pravatar.cc/150?u=evelyn",
        name: "Evelyn Reed",
        subject: "Cử nhân Ngôn ngữ Anh",
        bio: "Nhà giáo dục chuyên dụng với hơn 15 năm kinh nghiệm trong phân tích dữ liệu và học máy. Đam mê định hình thế hệ các nhà khoa học dữ liệu tiếp theo.",
        introduction: "Giáo sư Evelyn Reed là một học giả và học viên thành đạt trong lĩnh vực khoa học dữ liệu. Với bằng tiến sĩ trong khoa học máy tính từ Đại học Stanford, nghiên cứu của cô tập trung vào AI đạo đức và học máy có thể hiểu được. Cô đã xuất bản nhiều bài báo trên các tạp chí hàng đầu và được trình bày tại các hội nghị quốc tế. Evelyn tin vào một triết lý giảng dạy pha trộn lý thuyết và ứng dụng trong thế giới thực, đảm bảo sinh viên được chuẩn bị tốt cho ngành công nghiệp.",
        experience: [
            "Giáo sư Khoa học Dữ liệu, Đại học California, Berkeley (2015 - nay)",
            "Nhà khoa học dữ liệu cao cấp, Google (2010 - 2015)",
            "Nhà phân tích dữ liệu, IBM (2005 - 2010)"
        ],
        certifications: [
            "Chứng nhận Khoa học Dữ liệu, Coursera (2018)",
            "Chứng nhận Kỹ sư Học máy, Google (2017)",
            "Chứng nhận Chuyên gia AI, IBM (2016)"
        ],
        achievements: [
            {year: 2020, title: "Giải thưởng Giảng dạy Xuất sắc, Đại học California, Berkeley"},
            {year: 2019, title: "Bài báo được trích dẫn nhiều nhất, Hội nghị Khoa học Dữ liệu Quốc tế"},
            {year: 2018, title: "Thành viên của Hiệp hội Khoa học Dữ liệu"}
        ],
        contact: {
            email: "e.reed@university.edu",
            phone: "(123) 456-7890",
            facebook: "facebook.com/evelyn.reed",
            instagram: "instagram.com/evelyn.reed"
        }
    },
    {
        id:4,
        avatar: "https://i.pravatar.cc/150?u=evelyn",
        name: "Evelyn Reed",
        subject: "Cử nhân Ngôn ngữ Trung",
        bio: "Nhà giáo dục chuyên dụng với hơn 15 năm kinh nghiệm trong phân tích dữ liệu và học máy. Đam mê định hình thế hệ các nhà khoa học dữ liệu tiếp theo.",
        introduction: "Giáo sư Evelyn Reed là một học giả và học viên thành đạt trong lĩnh vực khoa học dữ liệu. Với bằng tiến sĩ trong khoa học máy tính từ Đại học Stanford, nghiên cứu của cô tập trung vào AI đạo đức và học máy có thể hiểu được. Cô đã xuất bản nhiều bài báo trên các tạp chí hàng đầu và được trình bày tại các hội nghị quốc tế. Evelyn tin vào một triết lý giảng dạy pha trộn lý thuyết và ứng dụng trong thế giới thực, đảm bảo sinh viên được chuẩn bị tốt cho ngành công nghiệp.",
        experience: [
            "Giáo sư Khoa học Dữ liệu, Đại học California, Berkeley (2015 - nay)",
            "Nhà khoa học dữ liệu cao cấp, Google (2010 - 2015)",
            "Nhà phân tích dữ liệu, IBM (2005 - 2010)"
        ],
        certifications: [
            "Chứng nhận Khoa học Dữ liệu, Coursera (2018)",
            "Chứng nhận Kỹ sư Học máy, Google (2017)",
            "Chứng nhận Chuyên gia AI, IBM (2016)"
        ],
        achievements: [
            {year: 2020, title: "Giải thưởng Giảng dạy Xuất sắc, Đại học California, Berkeley"},
            {year: 2019, title: "Bài báo được trích dẫn nhiều nhất, Hội nghị Khoa học Dữ liệu Quốc tế"},
            {year: 2018, title: "Thành viên của Hiệp hội Khoa học Dữ liệu"}
        ],
        contact: {
            email: "e.reed@university.edu",
            phone: "(123) 456-7890",
            facebook: "facebook.com/evelyn.reed",
            instagram: "instagram.com/evelyn.reed"
        }
    }
]