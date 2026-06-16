---
name: Next Anim 
description: Cấu trúc hệ thống giao diện tối giản, chỉ chỉn chu và nhấn mạnh vào nghệ thuật sắp đặt chữ (Typography).
colors:
  surface-0: "#faf7f2"          # Nền sáng chính (oklch(98.5% 0.010 80))
  surface-1: "#f5f1ea"          # Nền phụ / Card (oklch(96% 0.012 80))
  ink-strong: "#22201e"         # Chữ tiêu đề chính (oklch(14% 0.014 80))
  ink: "#35322f"                # Chữ nội dung (oklch(22% 0.014 80))
  accent: "#2c9ea6"             # Màu nhấn chính - Teal (oklch(62% 0.130 195))
  signature: "#dfb059"          # Chữ ký viết tay - Saffron (oklch(78% 0.140 75))
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 2.2rem + 4.5vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.12
  body:
    fontFamily: "ui-serif, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  link-underline:
    textColor: "{colors.accent}"
    padding: "0"
---

# Design System: Next Anim 

## 1. Overview

**Creative North Star: "The Editorial Sanctuary" (Thánh đường Biên tập)**

Hệ thống thiết kế này lấy cảm hứng từ các tạp chí văn học và chuyên trang thiết kế in ấn cổ điển. Nó tôn vinh sự yên lặng (calmness), khoảng thở rộng rãi và độ chính xác tối đa trong sắp đặt chữ (Typography) để tạo cảm giác dễ chịu cho người đọc.

### Key Characteristics:
*   **Neutral Warm Canvas:** Toàn bộ trang web được bao phủ bởi sắc ngà ấm áp, loại bỏ hoàn toàn màu đen/trắng kỹ thuật để giảm mỏi mắt.
*   **Typographic Hierarchy:** Sử dụng sự tương phản mạnh mẽ giữa tiêu đề Sans-serif lớn, hiện đại và phần nội dung chính Serif cổ điển.
*   **Restrained Action:** Sự tối giản trong các đường nét phân chia, chỉ dùng hiệu ứng khi cần thiết.

---

## 2. Colors

Hệ màu của dự án sử dụng không gian màu OKLCH để giữ độ sáng đồng đều giữa các trạng thái giao diện.

### Primary
*   **Teal Accent** (oklch(62% 0.130 195) / `#2c9ea6`): Được sử dụng làm màu nhấn cho các liên kết, trạng thái kích hoạt hoặc các chi tiết hành động chính.

### Neutral
*   **Warm Paper Background** (oklch(98.5% 0.010 80) / `#faf7f2`): Màu nền chính mô phỏng chất liệu giấy in tự nhiên.
*   **Warm Ink** (oklch(22% 0.014 80) / `#35322f`): Màu chữ nội dung chính, tạo độ tương phản dịu nhẹ hơn màu đen thuần.

### Named Rules
**The 10% Accent Rule.** Màu nhấn Teal chỉ được phép chiếm tối đa 10% diện tích màn hình ở bất kỳ giao diện nào. Màu nhấn càng ít xuất hiện thì giá trị định hướng hành động càng cao.

---

## 3. Typography

Dự án sử dụng sự kết hợp giữa Font Sans-serif (cho Tiêu đề) và Font Serif (cho Nội dung bài viết).

### Hierarchy
*   **Display** (600, `clamp(3rem, 2.2rem + 4.5vw, 5.5rem)`, 1.12): Dùng cho các câu tuyên ngôn lớn ở trang chủ.
*   **Headline / H2** (600, `clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem)`, 1.12): Tiêu đề các mục lớn.
*   **Body** (400, `1.0625rem` (17px), 1.6): Nội dung văn bản đọc chính, giới hạn độ rộng dòng tối đa `65ch` (khoảng 65 ký tự trên một dòng).
*   **Label / Mono** (500, `0.8125rem`, tracking 0.08em): Nhãn bài viết, ngày tháng hiển thị dạng chữ in hoa (uppercase).

---

## 4. Elevation

Giao diện ưu tiên thiết kế phẳng (flat), phân tầng độ sâu chủ yếu bằng các sắc độ nền (`surface-0`, `surface-1`) và các đường kẻ mảnh (`--rule`) thay vì đổ bóng đậm.

### Shadow Vocabulary
*   **Subtle Layer** (`0 1px 0 oklch(0% 0 0 / 0.04)`): Sử dụng cho các thành phần cần tách biệt nhẹ so với nền khi ở trạng thái lơ lửng.

---

## 5. Components

### Navigation Links
*   **Shape:** Không có viền đóng khung.
*   **Default:** Chữ màu xám mực nhạt (`--ink-mute`), hiển thị kèm chấm tròn nhỏ định vị bên dưới (`::after`) nếu đang ở trang hiện tại.
*   **Hover:** Chuyển màu sang đen ấm (`--ink-strong`) một cách mượt mà (`180ms ease-out-quart`).

### Article List Items
*   **Layout:** Hiển thị dạng bảng lưới chia 3 cột linh hoạt trên màn hình lớn.
*   **Interactive:** Khi hover vào cả hàng, phần tiêu đề bài viết chuyển màu mượt mà sang màu nhấn Teal (`--accent`).

---

## 6. Do's and Don'ts

### Do:
*   **Do** Giới hạn chiều rộng của tất cả văn bản đọc ở mức tối đa `65ch` đến `75ch` để tối ưu trải nghiệm đọc.
*   **Do** Sử dụng các biến CSS thiết lập sẵn thay vì tự viết các giá trị màu HEX tùy hứng.

### Don't:
*   **Don't** Sử dụng màu đen tuyệt đối `#000000` hoặc màu trắng tuyệt đối `#ffffff`.
*   **Don't** Sử dụng dải màu gradient trên chữ (gradient text) vì nó phá vỡ sự tôn nghiêm của thiết kế in ấn cổ điển.
*   **Don't** Sử dụng các hiệu ứng chuyển động nảy hoặc đàn hồi (bounce) rẻ tiền cho các trạng thái hover.
