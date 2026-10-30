
# Anh Đào Express – Weight Calculator Internal

**Phiên bản:** V4.1.0  
**Đơn vị:** Anh Đào Express  
**Đối tượng:** Nhân viên nội bộ

## 1. Giới thiệu

Ứng dụng hỗ trợ tính trọng lượng tính cước cho một hoặc nhiều kiện hàng, so sánh hệ số DIM 5000 và DIM 6000, giúp nhân viên kiểm tra trước khi xác nhận trọng lượng chính thức.

## 2. Chức năng chính

- Nhập kích thước, cân nặng thực tế và số lượng kiện.
- So sánh kết quả DIM 5000 và DIM 6000.
- Hiển thị tổng cân nặng thực tế, tổng trọng lượng thể tích và tổng trọng lượng tính cước.
- Cho phép nhân viên chọn và xác nhận hệ số DIM chính thức.
- Sao chép kết quả và lưu lịch sử tính toán trên trình duyệt.

## 3. Quy tắc tính

Trọng lượng thể tích (kg) = Dài × Rộng × Cao (cm) / hệ số DIM.

Trọng lượng tính cước của mỗi kiện = giá trị lớn hơn giữa cân nặng thực tế và trọng lượng thể tích.

Quy tắc làm tròn:
- Đến 20 kg: làm tròn lên bước 0,5 kg.
- Trên 20 kg: làm tròn lên bước 1 kg.
- Trọng lượng tính cước được làm tròn theo kiện, sau đó cộng và làm tròn tổng lô hàng.
- Tổng cân nặng thực tế và tổng thể tích được cộng từ giá trị gốc trước khi làm tròn tổng.

## 4. Hướng dẫn sử dụng

1. Mở ứng dụng nội bộ.
2. Nhập kích thước, cân nặng và số lượng của từng kiện.
3. Xem kết quả DIM 5000 và DIM 6000.
4. Chọn hệ số DIM áp dụng và nhấn xác nhận.
5. Sao chép kết quả khi cần.

**Lưu ý:** Không tự động chọn hệ số DIM theo kết quả thấp hơn.

## 5. Kiểm thử

Yêu cầu cài Node.js. Tại thư mục gốc dự án, chạy:

```bash
node tests/calculator.test.js
node tests/calculator.integration.test.js
```

GitHub Actions được cấu hình để tự động chạy kiểm thử khi có thay đổi phù hợp.

## 6. Phiên bản

- **V4.1.0:** Phiên bản nội bộ đã phát hành; bổ sung kiểm thử nâng cao và hoàn thiện cách tính các dòng tổng.

## 7. Phạm vi sử dụng

Ứng dụng dành cho nhân viên Anh Đào Express. Công cụ dành cho khách hàng được quản lý riêng.
