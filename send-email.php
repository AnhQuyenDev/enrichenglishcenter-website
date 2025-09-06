<?php
// Sử dụng các lớp của PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Yêu cầu các file cần thiết
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Kiểm tra xem form đã được gửi đi chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Lấy dữ liệu từ form
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Khởi tạo PHPMailer
    $mail = new PHPMailer(true);

    try {
        // ===== CẤU HÌNH SERVER SMTP (Không đổi) =====
        $mail->isSMTP();
        $mail->Host       = 'mail.enrichenglishcenter.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@enrichenglishcenter.com';
        $mail->Password   = 'Anhquyen230504@'; // Nhớ điền mật khẩu của bạn
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';
        // ===========================================

        // -----------------------------------------------------------------
        // ## EMAIL 1: GỬI THÔNG BÁO CHO BẠN (ENRICH CENTER)
        // -----------------------------------------------------------------
        $mail->setFrom('contact@enrichenglishcenter.com', 'Website Enrich Center');
        $mail->addAddress('contact@enrichenglishcenter.com', 'Enrich English Center');
        $mail->addReplyTo($email, $name); // QUAN TRỌNG: Giúp bạn nhấn "Reply" để trả lời thẳng cho khách
        $mail->isHTML(true); // Email này dạng text đơn giản là đủ

        $mail->Subject = "Tin nhắn liên hệ mới từ: $name";
        
        // Tạo nội dung email dạng HTML đẹp hơn một chút
        $body_for_admin = "
            <div style='font-family: Arial, sans-serif; font-size: 14px; color: #333;'>
                <h2 style='color: #0056b3;'>Tin nhắn mới từ Website</h2>
                <p>Bạn đã nhận được một tin nhắn mới từ form liên hệ.</p>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr style='border-bottom: 1px solid #ddd;'><td style='padding: 8px; width: 120px;'><strong>Tên người gửi:</strong></td><td style='padding: 8px;'>$name</td></tr>
                    <tr style='border-bottom: 1px solid #ddd;'><td style='padding: 8px;'><strong>Email:</strong></td><td style='padding: 8px;'><a href='mailto:$email'>$email</a></td></tr>";
        if (!empty($phone)) {
            $body_for_admin .= "<tr style='border-bottom: 1px solid #ddd;'><td style='padding: 8px;'><strong>Số điện thoại:</strong></td><td style='padding: 8px;'>$phone</td></tr>";
        }
        $body_for_admin .= "
                    <tr style='border-bottom: 1px solid #ddd;'><td style='padding: 8px; vertical-align: top;'><strong>Nội dung:</strong></td><td style='padding: 8px;'>" . nl2br(htmlspecialchars($message)) . "</td></tr>
                </table>
            </div>";
        $mail->Body = $body_for_admin;

        $mail->send(); // Gửi email cho bạn

        // -----------------------------------------------------------------
        // ## EMAIL 2: GỬI XÁC NHẬN CHO KHÁCH HÀNG
        // -----------------------------------------------------------------
        // Xóa địa chỉ người nhận cũ để chuẩn bị gửi mail mới
        $mail->clearAddresses();
        $mail->clearReplyTos();

        // Thiết lập người nhận là khách hàng
        $mail->addAddress($email, $name);
        $mail->isHTML(true); // Email này nên dùng HTML cho đẹp

        $mail->Subject = "Xác nhận: Enrich đã nhận được tin nhắn của bạn";
        
        // Nội dung email chuyên nghiệp gửi cho khách
        $brandColor = '#005A9E'; // Màu xanh dương đậm của Enrich
        $backgroundColor = '#f4f7f6';
        $containerColor = '#ffffff';
        $textColor = '#333333';
        $logoUrl = 'https://enrichenglishcenter.com/images/logo.png'; // THAY LINK LOGO CỦA BẠN VÀO ĐÂY

        $body_for_customer = "
        <div style='background-color: $backgroundColor; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;'>
            <div style='max-width: 600px; margin: 0 auto; background-color: $containerColor; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;'>
                
                <div style='background-color: $brandColor; padding: 20px; text-align: center;'>
                    <img src='$logoUrl' alt='Enrich English Center Logo' style='max-width: 180px;'>
                </div>
                <div style='padding: 30px; color: $textColor;'>
                    <h2 style='color: $brandColor; margin-top: 0;'>Xác nhận đã nhận được liên hệ của bạn</h2>
                    <p>Chào bạn <strong>$name</strong>,</p>
                    <p>Cảm ơn bạn đã quan tâm và liên hệ với Trung tâm Anh ngữ Enrich. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
                    
                    <div style='background-color: #f9f9f9; border: 1px solid #eee; padding: 20px; margin: 25px 0; border-radius: 5px;'>
                        <h3 style='margin-top: 0; color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px;'>Thông tin bạn đã gửi</h3>
                        <p style='margin: 10px 0;'><strong>Email:</strong> $email</p>
                        <p style='margin: 10px 0;'><strong>Số điện thoại:</strong> " . (!empty($phone) ? $phone : "Không cung cấp") . "</p>
                        <p style='margin: 10px 0;'><strong>Nội dung:</strong></p>
                        <p style='margin: 0; padding-left: 15px; border-left: 3px solid #ccc; color: #555; white-space: pre-wrap;'>" . htmlspecialchars($message) . "</p>
                    </div>

                    <p>Trong thời gian chờ đợi, bạn có thể tham khảo thêm các khóa học của chúng tôi tại website.</p>
                    
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='https://enrichenglishcenter.com/courses' style='background-color: $brandColor; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
                            Khám Phá Các Khóa Học
                        </a>
                    </div>
                    <p>Trân trọng,<br><strong>Đội ngũ Enrich English Center</strong></p>
                </div>
                <div style='background-color: #f1f1f1; color: #777; padding: 20px; text-align: center; font-size: 12px;'>
                    <p style='margin: 0;'>Enrich English Center</p>
                    <p style='margin: 5px 0;'>Email: contact@enrichenglishcenter.com | SĐT: 0933 701 555</p>
                    <p style='margin: 0;'>Đây là email tự động, vui lòng không trả lời trực tiếp.</p>
                </div>
                </div>
        </div>
        ";
        $mail->Body = $body_for_customer;

        $mail->send(); // Gửi email cho khách

        // Chuyển hướng về trang cảm ơn
        header('Location: /thanks.html'); // hoặc cam-on.html
        exit();

    } catch (Exception $e) {
        // Báo lỗi nếu có bất kỳ email nào gửi thất bại
        echo "Tin nhắn không thể gửi đi. Lỗi: {$mail->ErrorInfo}";
    }
} else {
    echo "Đã có lỗi xảy ra, vui lòng thử lại.";
}
?>