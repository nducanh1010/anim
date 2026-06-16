# Hướng dẫn Sử dụng Kỹ năng Thiết kế Impeccable

Tài liệu này hướng dẫn cách sử dụng công cụ và bộ nguyên tắc **Impeccable** để thiết kế, rà soát (audit) và nâng cấp giao diện người dùng (frontend UI/UX) trong dự án của bạn.

---

## 1. Giới thiệu chung về Impeccable

**Impeccable** là một bộ kỹ năng thiết kế giao diện chuẩn chuyên nghiệp được tích hợp sẵn cho AI trợ lý. Khi được kích hoạt, nó giúp:
*   **Thiết kế & Tinh chỉnh UI**: Tạo ra các giao diện tinh tế, hiện đại, sử dụng hệ màu OKLCH, Typography chuẩn mực và chuyển động (motion) tự nhiên.
*   **Tránh "AI Slop"**: Loại bỏ các lỗi thiết kế rập khuôn của AI (như các khối thẻ giống hệt nhau, dải màu gradient trên chữ khó đọc, hoặc lạm dụng hộp thoại cảnh báo - modal).
*   **Tối ưu kỹ thuật**: Đảm bảo giao diện có tính phản hồi cao (responsive), dễ tiếp cận (Accessibility - A11y) và đạt hiệu suất tải trang tối ưu.

---

## 2. Các Bước Thiết lập Ban đầu

Để Impeccable hiểu rõ nhất về định vị sản phẩm và ngôn ngữ thiết kế của dự án, bạn nên có hai file cấu hình sau trong thư mục dự án (hoặc thư mục `.agents/context/` hoặc `docs/`):

1.  **`PRODUCT.md`** (Bắt buộc): Định nghĩa về tệp khách hàng, tông giọng thương hiệu (brand tone), các nguyên tắc cốt lõi và loại hình giao diện (**brand** - trang giới thiệu/marketing hoặc **product** - trang quản trị/dashboard).
2.  **`DESIGN.md`** (Khuyến khích): Định nghĩa bảng màu (palette), quy tắc căn lề (spacing) và kiểu chữ (typography).

### Cách khởi tạo tự động:
Bạn chỉ cần yêu cầu trợ lý AI chạy các lệnh sau:
*   **Khởi tạo `PRODUCT.md`**: Yêu cầu chạy `impeccable teach`. Trợ lý sẽ đặt các câu hỏi ngắn để tự động tạo file.
*   **Khởi tạo `DESIGN.md`**: Yêu cầu chạy `impeccable document`. Trợ lý sẽ tự quét mã nguồn hiện tại của bạn để trích xuất các token thiết kế sẵn có.

---

## 3. Danh sách các Lệnh & Cách yêu cầu AI thực hiện

Bạn chỉ cần đưa yêu cầu cho trợ lý AI kèm theo từ khóa lệnh dưới đây:

| Lệnh | Phân loại | Mô tả tác vụ | Ví dụ câu lệnh yêu cầu trợ lý |
|---|---|---|---|
| **`shape`** | Lên kế hoạch | Thiết kế khung sườn UX, luồng dữ liệu trước khi code | *"Hãy chạy `impeccable shape` cho tính năng thanh toán"* |
| **`craft`** | Xây dựng | Phát triển tính năng giao diện hoàn chỉnh từ phác thảo đến viết code | *"Hãy `craft` một trang danh sách sản phẩm mới"* |
| **`critique`** | Đánh giá | Rà soát trải nghiệm người dùng, phân tích bố cục & chấm điểm thiết kế | *"Hãy `critique` file [Button.tsx](file:///c:/Users/admin/OneDrive/Desktop/Personal/next_anim/components/Button.tsx)"* |
| **`audit`** | Đánh giá | Kiểm tra tính dễ tiếp cận (A11y), responsive và hiệu năng | *"Hãy chạy `audit` cho trang chủ"* |
| **`polish`** | Tinh chỉnh | Chăm chút các chi tiết nhỏ trước khi deploy (micro-interactions, căn lề) | *"Hãy chạy `polish` cho menu header"* |
| **`bolder`** | Tinh chỉnh | Nâng tông, giúp giao diện trông nổi bật và ấn tượng hơn | *"Giao diện nút này hơi đơn điệu, hãy làm nó `bolder`"* |
| **`quieter`** | Tinh chỉnh | Tiết chế lại các thành phần quá lòe loẹt hoặc gây nhiễu | *"Trang này đang bị rối mắt, hãy dùng `quieter` để tiết chế"* |
| **`distill`** | Tinh chỉnh | Lược bỏ các thành phần rườm rà, đưa giao diện về mức tối giản | *"Hãy `distill` form đăng ký này"* |
| **`harden`** | Tinh chỉnh | Thiết kế thêm các trạng thái biên (loading, báo lỗi, trang trống) | *"Dùng `harden` để bổ sung xử lý lỗi cho trang này"* |
| **`live`** | Trực quan | Bắt đầu phiên chỉnh sửa trực tiếp trên trình duyệt | *"Khởi động session `live` cho tôi"* |

---

## 4. Các Nguyên tắc Thiết kế Chia sẻ (Shared Design Laws)

Khi làm việc với Impeccable, các quy tắc sau luôn được thực thi ngầm để đảm bảo tính thẩm mỹ cao nhất:

*   **Màu sắc:** Sử dụng hệ màu OKLCH thay vì RGB/HEX để có độ sáng đồng đều. Tuyệt đối không dùng màu đen thuần `#000` hoặc trắng thuần `#fff` (luôn pha nhẹ một chút tông màu chủ đạo của thương hiệu).
*   **Typography:** Giới hạn chiều rộng của các đoạn văn bản trong khoảng `65–75ch` để người dùng không bị mỏi mắt khi đọc.
*   **Layout:** Tránh lạm dụng các khung viền thẻ (cards) lặp đi lặp lại hoặc các đường viền nhấn một bên (`border-left` dày màu nổi bật) vốn là phong cách thiết kế rập khuôn cũ kỹ.
*   **Hiệu ứng chuyển động (Motion):** Sử dụng các đường cong giảm tốc tự nhiên (như `ease-out-expo` hoặc `ease-out-quart`). Tuyệt đối không dùng hiệu ứng đàn hồi nảy (elastic/bounce) trừ khi có mục đích đặc biệt.
