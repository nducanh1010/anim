# Product

## Register

brand

## Users
*   **Đối tượng:** Các creative director, nhà tuyển dụng, kỹ sư frontend và người yêu thích giao diện tương tác cao cấp.
*   **Bối cảnh sử dụng:** Khám phá một không gian làm việc số (Digital Workstation) trực quan trên trình duyệt desktop và tablet/mobile.
*   **Mục tiêu:** Trải nghiệm portfolio dưới dạng hệ điều hành máy tính (Desktop OS), xem các dự án sáng tạo, ghi chú và bài viết kỹ thuật.

## Product Purpose
*   **Mục đích:** Mô phỏng giao diện Apple Mac Desktop tương tác (lấy cảm hứng từ bychudy.com), biến portfolio thành một không gian khám phá sinh động với các cửa sổ kéo thả, desktop icons và Apple Dock.
*   **Mục tiêu thành công:** Giao diện trực quan 60/120fps, typography Sans-Serif sắc nét chuẩn Apple SF Pro, micro-interactions tinh tế và responsive mượt mà.

## Brand Personality
*   **Tông giọng (Voice):** Tinh gọn, chỉn chu, mang phong cách studio sáng tạo hiện đại.
*   **3 từ miêu tả tính cách:** 
    1.  *Tactile* (Giàu cảm giác xúc giác)
    2.  *Fluid* (Chuyển động tự nhiên như vật lý thật)
    3.  *Apple-Crafted* (Chuẩn mực giao diện macOS)

## Anti-references
Những kiểu thiết kế trang web cần **tuyệt đối tránh**:
*   **SaaS-Cream / AI-Slop:** Tránh thiết kế giống các trang SaaS thương mại (dùng card grid lặp đi lặp lại vô nghĩa, nút bấm đổ bóng lòe loẹt).
*   **Mockup 3D rẻ tiền:** Không dùng các mockup thiết bị generic.
*   **Chuyển động giật lag / Over-animation:** Không phóng to thu nhỏ quá đà gây rối mắt người dùng.

## Design Principles
1.  **Apple Sans-Serif Typography:** Sử dụng font hệ thống Apple SF Pro Text & Display, tracking và leading tối ưu theo kích thước.
2.  **Trực quan hóa Desktop:** Giao diện canvas `100dvh` với các file ảnh dự án kéo thả tự do và hệ thống cửa sổ đa nhiệm.
3.  **Vật lý chuyển động mượt mà (Fluid Motion):** Áp dụng lò xo Apple (critically damped spring) và giới hạn biên màn hình.
4.  **Apple Dock tinh tế:** Icon kích thước cố định, không viền rườm rà, hiển thị tooltip kính mờ khi hover.

## Accessibility & Inclusion
*   **Tiêu chuẩn:** Tuân thủ tối thiểu WCAG 2.1 AA về độ tương phản văn bản.
*   **Hỗ trợ:**
    *   Tối ưu hóa hoàn toàn cho phím Tab (có skip-link nổi bật khi focus).
    *   Tự động tắt hoàn toàn hoặc giảm tối đa hiệu ứng chuyển động khi người dùng bật chế độ `prefers-reduced-motion` trên hệ điều hành.
