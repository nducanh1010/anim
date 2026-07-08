# Tài liệu về Framer Motion & Vật lý Lò xo (Spring Physics)

Tài liệu này cung cấp cái nhìn sâu sắc về các thuộc tính Framer Motion được sử dụng trong dự án này—đặc biệt là trong component [magnetic.tsx](file:///c:/Users/admin/OneDrive/Desktop/Personal/next_anim/components/magnetic.tsx)—kèm theo các nguyên lý kỹ thuật thiết kế (design engineering) để tạo ra các hiệu ứng chuyển động chất lượng cao và hiệu năng tốt.

---

## 1. Cấu hình Animation của Magnetic Component

Trong [magnetic.tsx](file:///c:/Users/admin/OneDrive/Desktop/Personal/next_anim/components/magnetic.tsx), hiệu ứng chuyển động được định nghĩa trên một `<motion.div>`:

```tsx
<motion.div
  animate={{ x, y }}
  transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
>
```

### Thuộc tính `animate`
Prop `animate` xác định trạng thái đích của phần tử.
* **`x` và `y`**: Đây là các viết tắt của Framer Motion đại diện cho dịch chuyển ngang và dọc (bên dưới sẽ tự động ánh xạ sang CSS transform `translateX` và `translateY`).
* **Liên kết động (Dynamic Binding)**: Vì `x` và `y` được liên kết với state cục bộ `position` của component (được cập nhật khi di chuột và reset khi rời chuột), Framer Motion sẽ tự động tính toán lại đường đi của chuyển động hướng tới tọa độ mới nhất một cách mượt mà.

---

## 2. Các tham số Vật lý Lò xo (Spring Physics Parameters)

Hiệu ứng chuyển động lò xo không có thời gian chạy (duration) cố định. Thay vào đó, nó tính toán chuyển động bằng cách sử dụng các mô hình vật lý thực tế. Điều này giúp chuyển động có cảm giác tự nhiên và giữ được gia tốc khi bị ngắt quãng giữa chừng.

| Thuộc tính | Mặc định | Mô tả | Ảnh hưởng |
| :--- | :--- | :--- | :--- |
| **`type`** | `"tween"` | Động cơ chuyển động. Đặt là `"spring"` để sử dụng mô phỏng vật lý lò xo. | Kích hoạt quán tính và gia tốc. |
| **`stiffness`** | `100` | Hệ số độ cứng/độ căng của lò xo. | Chỉ số càng cao làm chuyển động càng căng và nhạy (phản hồi/giật về nhanh hơn). |
| **`damping`** | `10` | Hệ số giảm chấn/ma sát của lò xo. | Chỉ số càng thấp thì độ nảy và dao động càng nhiều. Chỉ số cao giúp dập tắt dao động nhanh hơn, đưa phần tử về vị trí đích mà không bị nảy quá đà. |
| **`mass`** | `1` | Khối lượng của vật thể chuyển động. | Khối lượng càng nhỏ (`< 1.0`) làm vật thể có cảm giác nhẹ hơn, tăng tốc và giảm tốc nhanh hơn. |

### Phân tích cấu hình lò xo của Magnetic Component:
```js
{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }
```
* **Stiffness cao (350)** + **Mass nhẹ (0.5)**: Phần tử phản hồi cực kỳ nhanh nhạy theo từng chuyển động di chuột.
* **Damping thấp (5)**: Lực cản ma sát rất nhỏ, cho phép phần tử nảy nhẹ xung quanh vị trí đích (overshoot). Điều này tạo ra một tương tác hover đàn hồi, giống như nam châm hút (playful, magnetic).

---

## 3. Các mô hình cấu hình Lò xo

Framer Motion hỗ trợ hai cách chính để cấu hình chuyển động lò xo:

### Cách 1: Mô hình Vật lý Truyền thống (Khuyên dùng khi cần kiểm soát chính xác)
Sử dụng các thông số khối lượng (mass), độ cứng (stiffness) và giảm chấn (damping) để điều chỉnh hành vi vật lý.
```js
transition={{
  type: "spring",
  mass: 0.5,
  stiffness: 300,
  damping: 15
}}
```

### Cách 2: Mô hình Thời gian & Độ nảy (Khuyên dùng vì dễ hình dung)
Mô hình đơn giản hóa lấy cảm hứng từ các tham số thiết kế của Apple, cho phép bạn xác định thời gian mong muốn và tỷ lệ phần trăm độ nảy.
```js
transition={{
  type: "spring",
  duration: 0.5, // Tổng thời gian để ổn định chuyển động
  bounce: 0.2    // 0 = không nảy, 1 = nảy tối đa
}}
```
> [!TIP]
> Hãy giữ giá trị `bounce` tinh tế (từ `0.1` đến `0.3`) đối với các thành phần UI thông thường. Độ nảy quá lớn có thể gây mất tập trung hoặc tạo cảm giác thiếu chuyên nghiệp.

---

## 4. Ưu điểm cốt lõi: Khả năng ngắt quãng (Interruptibility)

Không giống như các chuyển động dùng CSS keyframe hoặc duration timer (vốn sẽ khởi động lại từ vận tốc bằng 0 khi bị gián đoạn), **chuyển động lò xo hoàn toàn có thể bị ngắt quãng giữa chừng**.
* Khi con trỏ chuột di chuyển nhanh, rời đi hoặc quay lại vùng magnetic, lò xo vẫn giữ nguyên vận tốc và hướng hiện tại, kết hợp mượt mà vector chuyển động cũ vào vector mới.
* Điều này loại bỏ hoàn toàn hiện tượng giật hình (visual jank) hoặc việc chuyển hướng đột ngột khi tương tác của người dùng thay đổi giữa chừng.

---

## 5. Lưu ý về Hiệu năng & Tăng tốc Phần cứng (Hardware Acceleration)

Mặc dù các thuộc tính viết tắt như `x`, `y`, và `scale` rất tiện lợi, chúng đi kèm với một sự đánh đổi về mặt hiệu năng trong Framer Motion.

> [!WARNING]
> Các thuộc tính viết tắt (`x`, `y`, `scale`) của Framer Motion chạy thông qua `requestAnimationFrame` trên luồng chính (main thread). Nếu luồng chính đang bận tải dữ liệu hoặc render các component khác, animation có thể bị rớt khung hình (drop frames).

### Để đạt hiệu năng tối đa (Tăng tốc phần cứng):
Nếu bạn gặp hiện tượng giật khung hình khi tải nặng (ví dụ: trong lúc chuyển trang hoặc fetch dữ liệu lớn), hãy viết chuỗi `transform` đầy đủ để đẩy việc xử lý sang card đồ họa (GPU):

```jsx
// Chạy trên luồng chính (có thể rớt khung hình khi tải nặng)
<motion.div animate={{ x: 100 }} />

// Tăng tốc phần cứng bằng GPU
<motion.div animate={{ transform: "translateX(100px)" }} />
```

---

## 6. Các Nguyên lý Kỹ thuật Thiết kế (Design Engineering) từ Emil Kowalski

Dưới đây là danh sách kiểm tra các tiêu chuẩn chuyên nghiệp khi tối ưu chuyển động:

1. **Chuyển động phải có mục đích**: Tự hỏi xem animation đó có thực sự cần thiết hay không. Nếu người dùng nhìn thấy nó hơn 100 lần/ngày (ví dụ: phím tắt, bật tắt menu nhanh), đừng làm animation. Chỉ dùng animation cho phản hồi tương tác, chuyển đổi trạng thái hoặc làm nổi bật hover tinh tế.
2. **Không bao giờ chuyển động từ `scale(0)`**: Việc để một phần tử xuất hiện bắt đầu từ tỷ lệ 0 trông rất phi tự nhiên. Thay vào đó, hãy bắt đầu từ một tỷ lệ nhẹ như `scale(0.95)` đến `scale(1)` kết hợp cùng mờ tỏ (`opacity: 0` đến `opacity: 1`).
3. **Phản hồi khi nhấn (Active State)**: Thêm hiệu ứng co giãn nhẹ (`scale(0.97)`) khi nhấn chuột (`:active`) vào các nút bấm để giao diện có cảm giác "đang thực sự lắng nghe" người dùng.
4. **Tốc độ bất đối xứng (Asymmetric Easing)**: Trạng thái xuất hiện cần nhanh và nhạy (dùng `ease-out`), trong khi trạng thái biến mất/reset có thể chậm hơn một chút để tạo độ êm ái.
