# 📋 Yêu Cầu Tính Năng Mới - But Pha Marketing

## 🏠 TRANG CHỦ (Home Page)

### Thay Đổi:
- **Bỏ đi Stats Section**: Xóa phần hiển thị thống kê trên trang chủ

---

## 👤 HỆ THỐNG ĐĂNG NHẬP & ĐĂNG KÝ

### Mục Đích:
- Khách hàng đăng ký/đăng nhập để nhận thông báo đẩy (push notification) từ website

### Vị Trí & Chức Năng:
- Đặt ngay dưới nút logout (hoặc ở top navigation)
- **Nút "Lộ Trình Dự Án"** nằm ngay dưới nút Đăng Nhập/Đăng Ký

### Quy Trình Đăng Nhập/Đăng Ký:
1. **Hiển thị Modal:**
   - Username/Email
   - Password
   - Platform (Nền Tảng) - dropdown chọn từ 6 nền tảng: Facebook, Google Ads, TikTok, Instagram, Zalo, Website

2. **Quy Trình Cho Khách Hàng Mới:**
   - Điền thông tin đăng ký
   - Tạo tài khoản + mật khẩu
   - Chọn nền tảng:
     - *Nếu tài khoản chưa có dữ liệu* → lưu thông tin + chờ admin cập nhật nội dung tiến độ
     - *Nếu tài khoản đã có nội dung tiến độ* → hiển thị ngay

3. **Quy Trình Cho Khách Hàng Lặp Lại:**
   - Đăng nhập bằng tài khoản + mật khẩu + chọn nền tảng
   - Nếu đã đăng nhập → hiển thị Personal Dashboard của khách

---

## 📍 CLIENT PORTAL - LỘ TRÌNH DỰ ÁN

### Vị Trí:
- Nút "Lộ Trình Dự Án" nằm bên dưới nút Đăng Nhập/Đăng Ký trên trang chủ

### Chức Năng:
1. **Hiển thị Modal Đầu Tiên:**
   - Yêu cầu nhập: Tài Khoản, Mật Khẩu, Nền Tảng

2. **Sau Khi Xác Thực Đúng:**
   - Hiển thị Personal Dashboard của khách hàng
   - Nội dung bao gồm:
     - **Tiêu đề**: Tiến Độ Dự Án & Nền Tảng (được quản lý trong Admin)
     - **Nội Dung**: Các bài viết về tiến độ kế hoạch
     - **Hình Ảnh**: Cho phép admin tải lên khi quản lý tiến độ
     - **Cập Nhật Tự Động**: Admin có thể sửa/thêm nội dung từ "Quản Lý Lộ Trình Dự Án"

3. **Data Source:**
   - Dữ liệu được quản lý hoàn toàn trong Admin → "Quản Lý Lộ Trình Dự Án"

---

## 🚀 CHẨN ĐOÁN SỨC KHOẺ (Health Diagnosis)

### Vị Trí Trigger:
- **Nút "Thuyết Trình"** là một **nút riêng biệt** nằm **ngoài Chatbot Widget** (thường ở bên cạnh chat icon)
- Xuất hiện khi khách vào một trang con (Platform Page)
- Position: Fixed hoặc Floating button ở phía bên phải màn hình

### Quy Trình:
1. **Bước 1 - Quiz/Diagnostic:**
   - Nhập thông tin của khách hàng để chuẩn đoán
   - Hiển thị câu hỏi/form để đánh giá nhu cầu
   - Câu hỏi được quản lý trong Admin

2. **Bước 2 - Kết Quả & Gợi Ý:**
   - Hiển thị kết quả chuẩn đoán
   - Gợi ý gói dịch vụ phù hợp
   - Ghi nhận loại gói được lựa chọn

3. **Bước 3 - Chuyển Hướng:**
   - Khi khách hàng đóng kết quả → Tự động chuyển hướng đến trang đăng ký gói dịch vụ được gợi ý
   - Khách không thể thoát ra khỏi flow này cho đến khi:
     - Hoàn tất đăng ký gói (hoặc hủy có xác nhận)
     - Bấm "Dừng Thuyết Trình" (nếu có)

4. **Kiểm Soát Flow:**
   - Website kiểm soát tất cả hành động của khách trong phase này
   - Không cho phép back/close cho đến khi hoàn tất

---

## ⚙️ ADMIN DASHBOARD - BỘ CÔNG CỤ QUẢN LÝ

### 1️⃣ Bảng Điều Khiển (Dashboard)

**Vị Trí:** Phía dưới phần "Thông Tin Khách Truy Cập"

**Chức Năng - 6 Nền Tảng:**
- Facebook
- Google Ads
- TikTok
- Instagram
- Zalo
- Website

**Quyền Hạn Admin:**
- ✅ Bật/Tắt hiển thị nền tảng trên trang chủ
- ✅ Thay đổi tên nền tảng (vd: "Facebook Marketing" → "Facebook Ads")
- ✅ Thay đổi màu sắc biểu tượng của từng nền tảng
- ✅ Sắp xếp thứ tự hiển thị

---

### 2️⃣ Quản Trị Nội Dung (Content Management)

#### **A. Trang Chủ (Home Page)**

**Quyền Hạn:**
- Chỉnh sửa Logo
- Chỉnh sửa Tiêu đề (Hero Title)
- Chỉnh sửa Nội dung mô tả chính
- Chỉnh sửa Hotline/Số điện thoại liên hệ
- Chỉnh sửa CTA buttons, text

---

#### **B. Trang Con (Sub Pages) - 6 Nền Tảng**

**Ghi chú:** Mỗi nền tảng được cấu hình trong Dashboard sẽ có trang riêng

**Cho mỗi Nền Tảng, Admin có thể chỉnh sửa:**

1. **Giới Thiệu Về Dịch Vụ:**
   - Tầm Nhìn (Vision)
   - Sứ Mệnh (Mission)
   - Trách Nhiệm (Values/Responsibility)

2. **Stats Section:**
   - Thêm/Sửa/Xóa các thống kê
   - Chỉnh sửa con số/metrics
   - Thay đổi nhãn thống kê

3. **Câu Hỏi Thường Gặp (FAQ):**
   - Thêm/Sửa/Xóa câu hỏi
   - Chỉnh sửa câu trả lời

---

### 3️⃣ Quản Lý Dịch Vụ (Services Management)

**Quy Trình:**
1. Admin bấm "Quản Lý Dịch Vụ"
2. Chọn **Nền Tảng** từ 6 lựa chọn (từ Bảng Điều Khiển)
3. Hiển thị **Bảng Quản Lý Chi Tiết** cho nền tảng đó

**Chức Năng cho Mỗi Nền Tảng:**

- **Thêm Tab (Service Categories):**
  - Ví dụ: "Xây Dựng Fanpage", "Chăm Sóc Fanpage", "Quảng Cáo Fanpage"
  - Có thể thêm/sửa/xóa tab

- **Cho Mỗi Tab (Package Management):**
  - **Thêm Bảng Giá (Package):**
    - Tên gói (vd: "Starter", "Premium", "Pro")
    - Giá tiền
    - Mô tả ngắn
    - Các tính năng bao gồm (features list)
  
  - **Sửa/Xóa Bảng Giá:**
    - Cập nhật giá, tên, mô tả, features
  
  - **Nội Dung Audio Tư Vấn:**
    - Nhập **script/nội dung** sẽ được **text-to-speech** hoặc upload âm thanh
    - Nội dung này được gắn với từng **Package (Bảng Giá)**
    - Khi khách bấm nút "Nghe Tư Vấn" trên trang con → phát âm thanh này

---

### 4️⃣ So Sánh Các Gói (Comparison Tables)

**Quy Trình:**
1. Admin bấm "So Sánh Các Gói"
2. Chọn **Nền Tảng** từ 6 lựa chọn
3. Hiển thị **Bảng So Sánh Chi Tiết**

**Chức Năng:**
- **Thêm/Sửa/Xóa Tab (Service Categories):**
  - Ví dụ: "Xây Dựng Fanpage", "Chăm Sóc Fanpage", "Quảng Cáo Fanpage"

- **Cho Mỗi Tab:**
  - So sánh các gói (Starter, Premium, Pro, v.v.)
  - Chỉnh sửa nội dung bảng so sánh
  - Thêm/xóa hàng đặc tính
  - Tick/untick tính năng có sẵn ở mỗi gói

---

### 5️⃣ Quản Lý Đơn Hàng (Orders Management)

**Chức Năng:**
- Xem danh sách đơn hàng khách đã đăng ký
- Lọc theo nền tảng, trạng thái, khách hàng
- Xem chi tiết:
  - Tên khách hàng
  - Nền tảng chọn
  - Gói dịch vụ đã chọn
  - Ngày đăng ký
  - Trạng thái (chờ xử lý, đang thực hiện, hoàn thành)
- Cập nhật trạng thái đơn hàng
- Gửi thông báo cho khách

---

### 6️⃣ Quản Lý Nhận Tin (Leads/Inquiries Management)

**Dữ Liệu Nhận Từ:**
- Nút "Tư Vấn Ngay" (Quick Consultation) trên các trang con
- Nút "Liên Hệ Tư Vấn" (Contact for Consultation) trên trang
- Form liên hệ chung

**Chức Năng:**
- Xem danh sách tin nhắn/inquiry từ khách
- Thông tin bao gồm:
  - Tên khách hàng
  - Phone/Email/Zalo
  - Thông tin nền tảng quan tâm
  - Nội dung yêu cầu
  - Ngày gửi
- Trả lời/xử lý inquiry
- Đánh dấu đã xử lý
- Xuất báo cáo

---

### 7️⃣ Quản Lý Hình Ảnh (Image Management)

**Quy Trình:**
1. Admin bấm "Quản Lý Hình Ảnh"
2. Chọn **Nền Tảng** từ 6 lựa chọn
3. Hiển thị **Bảng Quản Lý Chi Tiết** cho nền tảng

**Chức Năng cho Mỗi Nền Tảng:**

- **Quản Lý Slideshow (Homepage Slider):**
  - Thêm/sửa/xóa slide
  - Nhập URL hình ảnh cho từng slide
  - Chỉnh sửa caption/tiêu đề slide
  - Sắp xếp thứ tự slide

- **Quản Lý Hình Trước/Sau (Before-After Images):**
  - Thêm/sửa/xóa cặp ảnh trước/sau
  - Nhập URL hình ảnh "trước"
  - Nhập URL hình ảnh "sau"
  - Chỉnh sửa mô tả

---

### 8️⃣ Quản Lý SEO (SEO Management)

**Chức Năng:**
- Quản lý Meta Title, Meta Description cho từng trang
- Quản lý Open Graph Image (chia sẻ social media)
- Quản lý Keywords, Canonical URL
- Tối ưu hóa từng trang (Home, mỗi nền tảng, v.v.)

---

### 9️⃣ Quản Lý Lộ Trình Dự Án (Project Roadmap Management)

**Chức Năng:**
1. **Tạo/Cập Nhật Lộ Trình cho Khách Hàng:**
   - Chọn khách hàng (account)
   - Nền tảng của khách
   - Thêm nội dung bài viết (tiến độ dự án)
   - Upload/Chèn hình ảnh vào nội dung
   - Xác định thứ tự hiển thị

2. **Quản Lý Bài Viết Tiến Độ:**
   - Thêm/sửa/xóa bài viết
   - Chỉnh sửa nội dung (text editor)
   - Upload hình ảnh cho từng bài
   - Đặt ngày cập nhật
   - Publish/Draft (nháp/công khai)

3. **Hiển Thị cho Khách:**
   - Khách đăng nhập vào "Lộ Trình Dự Án" sẽ xem những bài viết đã publish
   - Chỉ xem bài viết của nền tảng mà mình đã đăng ký

---

### 🔟 Thiết Lập Thông Tin (Settings)

**Admin có thể nhập/chỉnh sửa:**

- **Tiêu đề Website (VI):** (Tiêu đề bằng Tiếng Việt)
- **Địa Chỉ:** (Địa chỉ công ty)
- **Email:** (Email liên hệ chính)
- **Hotline:** (Số điện thoại tư vấn)
- **Zalo:** (ID/Số Zalo OA)
- **Website:** (Link website chính)
- **Fanpage:** (Link Facebook Fanpage)
- **Google Analytics:** (GA ID hoặc GA4 ID)
- **Google Webmaster Tool:** (Verification code)
- **Head JS:** (Custom JS code chèn vào `<head>`)
- **Body JS:** (Custom JS code chèn vào `<body>`)

---

## 📊 FLOW TỔNG QUAN

### Khách Hàng Lần Đầu:
```
Trang Chủ
  ↓
Bấm "Lộ Trình Dự Án" hoặc "Đăng Ký"
  ↓
Điền Tài Khoản/Mật Khẩu/Nền Tảng
  ↓
Tạo Account (hoặc nếu chưa có nội dung → chờ admin)
  ↓
Nếu có nội dung → Xem Dashboard Tiến Độ
  ↓
Bấm nút "Nghe Tư Vấn" → Chẩn Đoán Sức Khoẻ
  ↓
Nhập thông tin & nhận kết quả gợi ý
  ↓
Tự động chuyển đến trang Đăng Ký Gói Dịch Vụ
  ↓
Hoàn tất → Tạo Đơn Hàng (admin nhận được)
```

### Admin Dashboard:
```
Dashboard (Quản lý 6 nền tảng: bật/tắt, đổi tên, màu)
  ↓
Quản Trị Nội Dung (Trang chủ + 6 trang con)
  ↓
Quản Lý Dịch Vụ → Chọn Nền Tảng → Tab + Giá + Audio
  ↓
So Sánh Gói → Chọn Nền Tảng → Bảng So Sánh
  ↓
Quản Lý Đơn Hàng (Xem đơn đã đăng ký)
  ↓
Quản Lý Nhận Tin (Inquiry từ khách)
  ↓
Quản Lý Hình Ảnh → Chọn Nền Tảng → Slideshow + Before/After
  ↓
Quản Lý SEO (Meta, OG, Keywords)
  ↓
Quản Lý Lộ Trình Dự Án (Nội dung tiến độ cho khách)
  ↓
Thiết Lập Thông Tin (Site info + Analytics + JS)
```

---

## 🎯 TÓMO CHỨC NĂNG CHÍNH

**Frontend - Khách Hàng:**
1. ✅ Trang chủ (bỏ stats section)
2. ✅ Đăng nhập/Đăng ký modal
3. ✅ Lộ Trình Dự Án (Personal Dashboard)
4. ✅ Chẩn Đoán Sức Khoẻ (Diagnostic Flow)
5. ✅ Đặt Hàng (Order Form)

**Backend - Admin:**
1. ✅ Bảng Điều Khiển (Platform Management)
2. ✅ Quản Trị Nội Dung (CMS)
3. ✅ Quản Lý Dịch Vụ (Service Package Management)
4. ✅ So Sánh Gói (Comparison Tables)
5. ✅ Quản Lý Đơn Hàng (Orders)
6. ✅ Quản Lý Nhận Tin (Inquiries)
7. ✅ Quản Lý Hình Ảnh (Image Management)
8. ✅ Quản Lý SEO
9. ✅ Quản Lý Lộ Trình Dự Án (Project Milestones)
10. ✅ Thiết Lập Thông Tin (Settings)

---

## 📝 GHI CHÚ QUAN TRỌNG

- Tất cả dữ liệu 6 nền tảng được quản lý tập trung trong **Dashboard**
- Nếu admin tắt một nền tảng trong Dashboard → nó sẽ disappeared khỏi trang chủ
- Khách hàng bị "kiểm soát flow" trong giai đoạn Chẩn Đoán để đảm bảo tỷ lệ chuyển đổi
- Admin cập nhật tiến độ cho khách → khách sẽ thấy ngay khi đăng nhập lộ trình dự án
- Tất cả thông tin hotline, email, v.v. được tập chung trong "Thiết Lập Thông Tin"
