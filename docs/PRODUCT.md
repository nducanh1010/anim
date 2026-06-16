# Product

## Register

brand

## Users
*   **Đối tượng:** Các lập trình viên khác, nhà tuyển dụng, đối tác tiềm năng, và những người yêu thích sản phẩm công nghệ tinh tế, tối giản.
*   **Bối cảnh sử dụng:** Họ truy cập bằng cả điện thoại và máy tính để đọc các bài blog chia sẻ kinh nghiệm hoặc xem các sản phẩm/dự án nhỏ mà chủ trang web đã xây dựng.
*   **Mục tiêu:** Họ muốn tìm kiếm các bài viết chất lượng cao, các thiết kế giao diện có tính thẩm mỹ tốt, và có cảm giác tin cậy, cảm hứng sau khi rời trang.

## Product Purpose
*   **Mục đích:** Là không gian cá nhân để lưu trữ, trưng bày các dự án nhỏ ("small, considered things") và chia sẻ các bài viết chuyên môn.
*   **Mục tiêu thành công:** Trang web chạy cực nhanh, giao diện tối giản nhưng mang tính cá nhân hóa cao, tạo ấn tượng mạnh mẽ về sự tỉ mỉ, kỹ lưỡng trong từng dòng code và pixel thiết kế.

## Brand Personality
*   **Tông giọng (Voice):** Trầm lặng, sâu sắc, đáng tin cậy và tập trung vào chất lượng hơn số lượng.
*   **3 từ miêu tả tính cách:** 
    1.  *Considered* (Kỹ lưỡng / Chỉn chu)
    2.  *Minimalist* (Tối giản)
    3.  *Typographic* (Chân phương / Nhấn mạnh vào chữ nghệ thuật)
*   **Cảm xúc hướng tới:** Sự bình yên, tĩnh lặng (calm), cảm giác như đang đọc một cuốn sách hoặc tạp chí in cao cấp.

## Anti-references
Những kiểu thiết kế trang web cần **tuyệt đối tránh**:
*   **SaaS-Cream / AI-Slop:** Tránh thiết kế giống các trang SaaS thương mại (dùng thẻ border-left nhấn màu nổi bật, nút bấm đổ bóng lòe loẹt, các khối grid chia ô lặp đi lặp lại vô nghĩa).
*   **Lòe loẹt quá mức:** Không dùng dải màu gradient trên chữ (gradient text), không dùng các hiệu ứng chuyển động nảy (elastic/bounce motion) gây xao nhãng người đọc.
*   **Quá nhiều popup/modal:** Không sử dụng hộp thoại nhảy lên màn hình khi không cần thiết.

## Design Principles
1.  **Chữ là Giao diện (Typography as Interface):** Giao diện phải được định hình bởi kiểu chữ đẹp, khoảng cách dòng hợp lý (`65-75ch`), sự tương phản rõ rệt về kích thước và độ đậm của chữ thay vì các hình trang trí rườm rà.
2.  **Khoảng thở chủ động (Active White Space):** Sử dụng các khoảng trống rộng rãi, bất đối xứng một cách có mục đích để tạo nhịp điệu đọc thoải mái, tránh nhồi nhét thông tin.
3.  **Tĩnh lặng & Mượt mà (Calm Motion):** Các chuyển động (transitions) chỉ dùng để hỗ trợ người dùng định vị luồng đọc, sử dụng đường cong giảm tốc mượt mà (`ease-out-quart`).
4.  **Màu sắc Restrained (Tiết chế):** Nền không dùng màu trắng tinh, chữ không dùng màu đen thuần. Sử dụng màu kem ngà nhẹ pha tông ấm làm chủ đạo, chỉ dùng tối đa 1 màu nhấn (Accent) chiếm không quá 10% bề mặt giao diện.

## Accessibility & Inclusion
*   **Tiêu chuẩn:** Tuân thủ tối thiểu WCAG 2.1 AA về độ tương phản văn bản.
*   **Hỗ trợ:**
    *   Tối ưu hóa hoàn toàn cho phím Tab (có skip-link nổi bật khi focus).
    *   Tự động tắt hoàn toàn hoặc giảm tối đa hiệu ứng chuyển động khi người dùng bật chế độ `prefers-reduced-motion` trên hệ điều hành.
