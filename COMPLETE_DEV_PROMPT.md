# 🚀 PROMPT TRIỂN KHAI - But Pha Marketing Platform

## 🎯 MỤC TIÊU DỰ ÁN

Xây dựng nền tảng marketing toàn diện với:
- ✅ Hệ thống đăng nhập/đăng ký cho khách hàng
- ✅ Dashboard cá nhân cho khách xem tiến độ dự án
- ✅ Flow chẩn đoán sức khỏe dịch vụ (diagnostic wizard)
- ✅ Admin panel quản lý 10+ tính năng quan lý
- ✅ Quản lý 6 nền tảng marketing khác nhau

---

## 📋 YÊUK CẦU CHÍNH

### **PHẦN I: FRONTEND - KHÁCH HÀNG**

#### 1. TRANG CHỦ (Home Page)
**Thay Đổi:**
- ❌ **Xóa Stats Section** khỏi trang chủ
- ✅ Giữ nguyên các phần khác
- ✅ Thêm 2 nút mới dưới hero section:
  - Nút "Đăng Nhập / Đăng Ký" → Mở modal đăng nhập
  - Nút "Lộ Trình Dự Án" (hoặc "Xem Tiến Độ") → Mở modal lộ trình

---

#### 2. MODAL ĐĂNG NHẬP / ĐĂNG KÝ
**Vị Trí:** Tất cả các trang có thể trigger modal này

**Thiết Kế Form:**
```
┌─────────────────────────────┐
│   ĐĂNG NHẬP / ĐĂNG KÝ       │
├─────────────────────────────┤
│                             │
│  [ Đăng Nhập ] [ Đăng Ký ]  │ (2 tabs hoặc toggle)
│                             │
│  TAB ĐĂNG NHẬP:             │
│  ├─ Email/Username: [___]   │
│  ├─ Mật Khẩu:     [___]     │
│  ├─ Nền Tảng:     [SELECT]  │ (6 lựa chọn)
│  │  • Facebook               │
│  │  • Google Ads            │
│  │  • TikTok               │
│  │  • Instagram            │
│  │  • Zalo                 │
│  │  • Website              │
│  └─ [Đăng Nhập] [Hủy]      │
│                             │
│  TAB ĐĂNG KÝ:               │
│  ├─ Email:      [___]       │
│  ├─ Tên Khách:  [___]       │
│  ├─ Mật Khẩu:   [___]       │
│  ├─ Nhập Lại:   [___]       │
│  ├─ Nền Tảng:   [SELECT]    │
│  └─ [Đăng Ký] [Hủy]        │
│                             │
│  ☐ Tôi đồng ý điều khoản    │
│                             │
└─────────────────────────────┘
```

**Xử Lý Logic:**
- **Đăng Nhập Thành Công:**
  - Lưu session + token
  - Lưu nền tảng đã chọn
  - Nếu bấm từ "Lộ Trình Dự Án" → redirect đến Client Portal
  - Nếu bấm từ "Chẩn Đoán" → đóng modal, tiếp tục diagnostic

- **Đăng Ký Thành Công:**
  - Tạo account trong database
  - Tự động đăng nhập
  - Chuyển đến trang định hướng tiếp theo

- **Lỗi:**
  - Email/username đã tồn tại
  - Mật khẩu không khớp
  - Nền tảng không hợp lệ

**Push Notification:**
- Sau khi đăng ký thành công → hỏi quyền push notification
- Lưu subscription ID để gửi notification sau

---

#### 3. CLIENT PORTAL - LỘ TRÌNH DỰ ÁN

**Trigger:**
- Nút "Lộ Trình Dự Án" trên trang chủ
- Nếu chưa đăng nhập → hiện modal đăng nhập
- Nếu đã đăng nhập → mở portal ngay

**Giao Diện Portal:**
```
┌────────────────────────────────────────────┐
│  LỘ TRÌNH DỰ ÁN - [Nền Tảng Đã Chọn]      │
├────────────────────────────────────────────┤
│                                            │
│  Xin chào, [Tên Khách]!                   │
│  Nền Tảng: [Platform Name]                │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ TIẾN ĐỘ DỰ ÁN CỦA BẠN              │  │
│  ├─────────────────────────────────────┤  │
│  │                                     │  │
│  │  📰 [Bài viết 1] - Cập nhật hôm nay│  │
│  │     [Nội dung + Hình ảnh]           │  │
│  │                                     │  │
│  │  📰 [Bài viết 2] - Cập nhật 3 ngày │  │
│  │     [Nội dung + Hình ảnh]           │  │
│  │                                     │  │
│  │  (Không có bài viết nào)            │  │
│  │  → Màn hình said: "Admin đang       │  │
│  │     chuẩn bị thông tin cho bạn..."  │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                            │
│                                    [Đóng] │
└────────────────────────────────────────────┘
```

**Chức Năng:**
- Hiển thị tất cả bài viết tiến độ của khách (dựa trên nền tảng đã chọn)
- Mỗi bài viết gồm:
  - Tiêu đề
  - Nội dung (HTML hoặc markdown)
  - Hình ảnh (nếu có)
  - Ngày cập nhật
- Sắp xếp: **Mới nhất trước**
- Nút "Đóng" để thoát

---

#### 4. CHẨN ĐOÁN SỨC KHOẼ (Health Diagnostic Wizard)

**Vị Trí:**
- Nút "Thuyết Trình" là một **nút riêng biệt** nằm **ngoài chat widget** (thường ở bên cạnh)
- Chỉ hiển thị khi khách vào một trang con (Platform Page)
- Position: Fixed hoặc Floating button ở phía bên phải màn hình

**Giao Diện & Quy Trình:**

**Bước 1 - Intro:**
```
┌─────────────────────────────────┐
│   TƯ VẤN NGÀNH (THUYẾT TRÌNH)   │
├─────────────────────────────────┤
│                                 │
│  Tôi sẽ chuẩn đoán nhu cầu      │
│  của bạn và gợi ý gói phù hợp   │
│                                 │
│  Hãy trả lời các câu hỏi bên    │
│  dưới để tôi hiểu rõ hơn:      │
│                                 │
│              [Tiếp Tục]        │
│                                 │
└─────────────────────────────────┘
```

**Bước 2 - Form Nhập Thông Tin:**
```
┌─────────────────────────────────────┐
│   THÔNG TIN CỦA BẠN (1/3)           │
├─────────────────────────────────────┤
│                                     │
│  Tên:              [_____________]  │
│  Email:            [_____________]  │
│  Phone:            [_____________]  │
│  Nền tảng quan tâm: [SELECT - Fb, GG, TikTok, ...] │
│                                     │
│           [Trước] [Tiếp Tục]       │
│                                     │
│  Progress: ████░░░ 66%             │
└─────────────────────────────────────┘
```

**Bước 3 - Câu Hỏi Quiz:**
```
┌──────────────────────────────────────┐
│   CÂU HỎI (2/3)                      │
├──────────────────────────────────────┤
│                                      │
│  "Bạn hiện đang sử dụng kênh nào?"  │
│                                      │
│  ☐ Facebook Ads                     │
│  ☐ Google Search Ads               │
│  ☐ TikTok Ads                      │
│  ☐ Instagram Ads                   │
│  ☐ Zalo Ads                        │
│  ☐ Chưa quảng cáo                  │
│                                      │
│  "Mục tiêu chính của bạn?"          │
│                                      │
│  ○ Tăng traffic website            │
│  ○ Tăng leads                      │
│  ○ Tăng doanh số                   │
│  ○ Xây dựng thương hiệu            │
│                                      │
│           [Trước] [Tiếp Tục]       │
│                                      │
│  Progress: ████████░ 66%            │
└──────────────────────────────────────┘
```

**Bước 4 - Kết Quả & Gợi Ý:**
```
┌──────────────────────────────────┐
│   KẾT QUẢ CHUẨN ĐOÁN (3/3)        │
├──────────────────────────────────┤
│                                  │
│  🎯 NHƯ CẦU CỦA BẠN:             │
│                                  │
│  ✓ Xây dựng chiến lược toàn diện │
│  ✓ Quảng cáo trên Google Ads     │
│  ✓ Tối ưu conversion             │
│                                  │
│  💡 GỢI Ý GÓI DỊCH VỤ:           │
│                                  │
│  ⭐ GÓI PREMIUM                   │
│     • Tư vấn chiến lược (5h)      │
│     • Quản lý Google Ads (30 ngày)│
│     • Report hàng tuần            │
│     Giá: 9.999.000 VNĐ           │
│                                  │
│  [Đăng Ký Gói Này] [Hủy]        │
│                                  │
└──────────────────────────────────┘
```

**Logic Flow Chi Tiết:**

1. **Khách Bấm "Thuyết Trình":**
   - Hiển thị step 1 (intro)
   - Chatbot được disable
   - Nút back/close bị vô hiệu hóa

2. **Khách Điền Form (Step 2):**
   - Validate: email, phone format
   - Lưu vào session/cache

3. **Khách Trả Lời Quiz (Step 3):**
   - Ghi nhận câu trả lời
   - Dựa vào câu trả lời → matching gói dịch vụ

4. **Hiển Thị Kết Quả (Step 4):**
   - Hiển thị gói được gợi ý
   - Nút "Đăng Ký Gói Này" → chuyển đến trang đặt hàng
   - Nút "Hủy" → có dialog xác nhận → sau khi xác nhận thì đóng wizard

5. **Sau Khi Đóng Wizard:**
   - Chatbot được enable lại
   - Khách có thể tiếp tục dùng website

**Kiểm Soát Flow:**
- ❌ Không cho back page (disable browser back button)
- ❌ Không cho close/refresh
- ✅ Chỉ có thể "Tiếp Tục" hoặc "Hủy" (với xác nhận)

---

#### 5. TRANG ĐẶT HÀNG (Order Form)

**Trigger:**
- Từ kết quả diagnostic → "Đăng Ký Gói Này"
- Trực tiếp từ trang con (Platform Page)

**Giao Diện:**
```
┌────────────────────────────────┐
│   ĐẶT HÀNG - [Tên Gói]         │
├────────────────────────────────┤
│                                │
│  Gói:     [Premium]            │
│  Giá:     9.999.000 VNĐ        │
│  Kỳ hạn:  30 ngày              │
│                                │
│  ─────────────────────────────│
│  THÔNG TIN KHÁCH HÀNG:         │
│                                │
│  Tên:       [_____________]    │
│  Email:     [_____________]    │
│  Phone:     [_____________]    │
│  Địa chỉ:   [_____________]    │
│  Ghi chú:   [_____________ ] │
│                                │
│  ─────────────────────────────│
│  PHƯƠNG THỨC THANH TOÁN:       │
│                                │
│  ○ Chuyển khoản ngân hàng      │
│  ○ Thanh toán qua Stripe       │
│  ○ Thanh toán qua PayPal       │
│                                │
│  ☐ Tôi đồng ý điều khoản       │
│                                │
│      [Đặt Hàng] [Hủy]         │
│                                │
└────────────────────────────────┘
```

**Xử Lý:**
- Nhận thông tin từ form
- Tạo Order record
- Gửi email xác nhận cho khách
- Ghi nhận inquiry trong admin ("Quản Lý Nhận Tin")

---

### **PHẦN II: BACKEND & ADMIN DASHBOARD**

#### 6. ADMIN PANEL - OVERVIEW

**Navigation Menu (Sidebar):**
```
📊 ADMIN DASHBOARD
├─ 📍 Bảng Điều Khiển (Dashboard)
├─ 📝 Quản Trị Nội Dung (Content Management)
├─ 🛍️  Quản Lý Dịch Vụ (Services Management)
├─ ⚖️  So Sánh Các Gói (Comparison Tables)
├─ 📦 Quản Lý Đơn Hàng (Orders)
├─ 💬 Quản Lý Nhận Tin (Inquiries)
├─ 🖼️  Quản Lý Hình Ảnh (Image Management)
├─ 🔍 Quản Lý SEO (SEO Management)
├─ 🗺️  Quản Lý Lộ Trình Dự Án (Roadmap Management)
└─ ⚙️  Thiết Lập Thông Tin (Settings)
```

---

#### 7. BẢNG ĐIỀU KHIỂN (Dashboard)

**Vị Trí:** Phía trên của admin (hoặc section riêng)

**UI Layout:**
```
┌──────────────────────────────────────────┐
│        QUẢN LÝ 6 NỀN TẢNG               │
├──────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐ ┌──────────────┐     │
│  │ 🔵 Facebook  │ │ 🔴 Google    │     │
│  │              │ │              │     │
│  │ [✓ Hiển Thị] │ │ [✓ Hiển Thị] │     │
│  │ Tên: Facebook│ │ Tên: Google  │     │
│  │ Màu: #003087 │ │ Màu: #4285F4 │     │
│  │ [Sửa] [Xóa] │ │ [Sửa] [Xóa] │     │
│  └──────────────┘ └──────────────┘     │
│                                          │
│  ┌──────────────┐ ┌──────────────┐     │
│  │ 🟪 TikTok    │ │ 🟣 Instagram │     │
│  │              │ │              │     │
│  │ [✓ Hiển Thị] │ │ [✗ Ẩn]       │     │
│  │ Tên: TikTok  │ │ Tên: IG      │     │
│  │ Màu: #000000 │ │ Màu: #E1306C │     │
│  │ [Sửa] [Xóa] │ │ [Sửa] [Xóa] │     │
│  └──────────────┘ └──────────────┘     │
│                                          │
│  ┌──────────────┐ ┌──────────────┐     │
│  │ 🟢 Zalo      │ │ 🟤 Website   │     │
│  │              │ │              │     │
│  │ [✓ Hiển Thị] │ │ [✓ Hiển Thị] │     │
│  │ Tên: Zalo    │ │ Tên: Website │     │
│  │ Màu: #0084FF │ │ Màu: #1F2937 │     │
│  │ [Sửa] [Xóa] │ │ [Sửa] [Xóa] │     │
│  └──────────────┘ └──────────────┘     │
│                                          │
│  [+ Thêm Nền Tảng]                     │
│                                          │
└──────────────────────────────────────────┘
```

**Chức Năng Chi Tiết:**

**Mỗi Card Nền Tảng:**
- **Checkbox "Hiển Thị":** Bật/Tắt hiển thị trên trang chủ
- **Tên:** Có thể edit tên (vd: "Facebook" → "Facebook Marketing")
- **Màu:** Chọn màu (color picker)
- **Nút [Sửa]:** Mở modal edit
- **Nút [Xóa]:** Xóa nền tảng (confirm trước)

**Modal Edit Nền Tảng:**
```
┌─────────────────────────────────┐
│   SỬA NỀN TẢNG                  │
├─────────────────────────────────┤
│                                 │
│  Tên Nền Tảng:  [Facebook     ] │
│  Biểu Tượng:    [Chọn hình ☑️]  │
│  Màu:           [#003087]       │
│                 [Color Picker]  │
│  Hiển Thị:      ☑️ Bật         │
│  Thứ Tự:        [1 ← → 8]      │
│                                 │
│  [Lưu] [Hủy]                   │
│                                 │
└─────────────────────────────────┘
```

---

#### 8. QUẢN TRỊ NỘI DUNG (Content Management)

**Menu Phụ:**
```
✏️ QUẢN TRỊ NỘI DUNG
├─ 🏠 Trang Chủ (Homepage)
├─ 📱 Facebook (Nền Tảng 1)
├─ 🔍 Google Ads (Nền Tảng 2)
├─ 🪀 TikTok (Nền Tảng 3)
├─ 📸 Instagram (Nền Tảng 4)
├─ 💬 Zalo (Nền Tảng 5)
└─ 🌐 Website (Nền Tảng 6)
```

**A. Trang Chủ - Editor:**
```
┌────────────────────────────────────┐
│    QUẢN TRỊ TRANG CHỦ              │
├────────────────────────────────────┤
│                                    │
│  Logo:       [▢ Upload/URL Choose] │
│  Tiêu Đề:    [Bút Pha Marketing...] │
│              [Rich Text Editor]    │
│                                    │
│  Nội Dung:   [              ]     │
│              [Long Text Editor]    │
│              [+ Thêm Ảnh] [+Video] │
│                                    │
│  Hotline:    [093 XXX XXXX]       │
│  Email:      [admin@butpha.com]   │
│                                    │
│  CTA Text:   [Liên Hệ Ngay]       │
│  CTA Link:   [/contact]           │
│                                    │
│  [Lưu Nháp] [Xuất Bản] [Xem Trước]│
│                                    │
└────────────────────────────────────┘
```

**B. Trang Con (Nền Tảng) - Editor:**
```
┌─────────────────────────────────────┐
│    QUẢN TRỊ TRANG: [Facebook]       │
├─────────────────────────────────────┤
│                                     │
│  === PHẦN 1: GIỚI THIỆU DỊCH VỤ === │
│                                     │
│  Tầm Nhìn (Vision):                 │
│  [              ]                   │
│  [Rich Text Editor]                 │
│                                     │
│  Sứ Mệnh (Mission):                 │
│  [              ]                   │
│  [Rich Text Editor]                 │
│                                     │
│  Trách Nhiệm (Values):              │
│  [              ]                   │
│  [Rich Text Editor]                 │
│                                     │
│  === PHẦN 2: STATS SECTION ===      │
│                                     │
│  Tiêu Đề Stats: [Đã Phục Vụ 500+...] │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ STATS #1                    │   │
│  ├─────────────────────────────┤   │
│  │ Số Liệu:  [100]             │   │
│  │ Đơn Vị:   [+]               │   │
│  │ Mô Tả:    [Khách hàng]      │   │
│  │  [Sửa] [Xóa]               │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ STATS #2                    │   │
│  ├─────────────────────────────┤   │
│  │ Số Liệu:  [50]              │   │
│  │ Đơn Vị:   [%]               │   │
│  │ Mô Tả:    [ROI]             │   │
│  │  [Sửa] [Xóa]               │   │
│  └─────────────────────────────┘   │
│                                     │
│  [+ Thêm Stats]                    │
│                                     │
│  === PHẦN 3: FAQ ===               │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ CÂU HỎI #1                  │   │
│  ├─────────────────────────────┤   │
│  │ Q: Làm sao để tăng followers?│   │
│  │ A: [                    ]    │   │
│  │    [Rich Text Editor]       │   │
│  │  [Sửa] [Xóa]               │   │
│  └─────────────────────────────┘   │
│                                     │
│  [+ Thêm FAQ]                      │
│                                     │
│  [Lưu Nháp] [Xuất Bản] [Xem Trước] │
│                                     │
└─────────────────────────────────────┘
```

---

#### 9. QUẢN LÝ DỊCH VỤ (Services Management)

**Step 1 - Chọn Nền Tảng:**
```
┌─────────────────────────────────┐
│   QUẢN LÝ DỊCH VỤ               │
├─────────────────────────────────┤
│                                 │
│  Chọn Nền Tảng:                 │
│                                 │
│  [Facebook] [GoogleAds] [TikTok] │
│  [Instagram] [Zalo] [Website]    │
│                                 │
└─────────────────────────────────┘
```

**Step 2 - Quản Lý Tab của Nền Tảng:**
```
┌────────────────────────────────────┐
│    QUẢN LÝ DỊCH VỤ - [Facebook]    │
├────────────────────────────────────┤
│                                    │
│  TAB DANH SÁCH:                    │
│  ┌─ [✎ Xây Dựng Fanpage]           │
│  │  ├─ [Sửa] [Xóa] [↑↓ Move]      │
│  │  └─ ┌──────────────────────┐   │
│  │     │ DANH MỤC 1           │   │
│  │     ├──────────────────────┤   │
│  │     │ Tên Gói: Starter     │   │
│  │     │ Giá: 2.999.000 VNĐ   │   │
│  │     │ Mô Tả: [        ]    │   │
│  │     │ Features:            │   │
│  │     │ - Tư vấn chiến lược  │   │
│  │     │ - Report hàng tuần   │   │
│  │     │ [Sửa] [Xóa]        │   │
│  │     │ Audio (Text-to-Speech): │   │
│  │     │ [Upload] hoặc        │   │
│  │     │ [Script]: Chúng tôi... │   │
│  │     │ [Lưu]                │   │
│  │     └──────────────────────┘   │
│  │                                 │
│  │  ├─ ┌──────────────────────┐   │
│  │     │ DANH MỤC 2           │   │
│  │     ├──────────────────────┤   │
│  │     │ ... same as above    │   │
│  │     └──────────────────────┘   │
│  │                                 │
│  │  [+ Thêm Gói] [+ Thêm...][Xóa Tab] │
│  │                                 │
│  ├─ [✎ Chăm Sóc Fanpage]          │
│  │  └─ [DANH MỤC...]              │
│  │                                 │
│  ├─ [✎ Quảng Cáo Fanpage]         │
│  │  └─ [DANH MỤC...]              │
│  │                                 │
│  [+ Thêm Tab] [Lưu]               │
│                                    │
└────────────────────────────────────┘
```

**Thiết Kế Modal Sửa Gói:**
```
┌──────────────────────────────┐
│   SỬA GÓI DỊCH VỤ            │
├──────────────────────────────┤
│                              │
│ Tên Gói:      [Starter]      │
│ Giá (VNĐ):    [2.999.000]    │
│ Kỳ Hạn:       [30] ngày      │
│                              │
│ Mô Tả:                       │
│ [                      ]     │
│ [Rich Text Editor]           │
│                              │
│ Tính Năng (Features):        │
│ ☑️ Tư vấn chiến lược         │
│ ☑️ Report hàng tuần          │
│ ☐ Quảng cáo (Ads)            │
│ [+ Thêm Tính Năng]           │
│                              │
│ Nội Dung Audio Tư Vấn:      │
│ ☐ Upload Audio File          │
│ ☑️ Sử dụng TTS (Text-to-Speech)│
│                              │
│ Script/Nội Dung:             │
│ [                      ]     │
│ [Text Area]                  │
│                              │
│ [Lưu] [Hủy]                 │
│                              │
└──────────────────────────────┘
```

---

#### 10. SO SÁNH CÁC GÓI (Comparison Tables)

**Step 1 - Chọn Nền Tảng:** (Giống Services Management)

**Step 2 - Bảng So Sánh:**
```
┌──────────────────────────────────────────────────┐
│   SO SÁNH GÓI - [Facebook]                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  TAB HIỆN TẠI: [Xây Dựng Fanpage] ▼             │
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │                 Starter │ Standard │ Pro  │  │
│  ├──────────────────────────────────────────┤  │
│  │ Tư vấn         [✓]       [✓]       [✓]   │  │
│  │ Report         [✗]       [✓]       [✓]   │  │
│  │ Quảng cáo      [✗]       [✗]       [✓]   │  │
│  │ Hỗ trợ 24/7    [✗]       [✗]       [✓]   │  │
│  │                          ...              │  │
│  │ [+ Thêm Hàng]                            │  │
│  │                                           │  │
│  │  [Sửa] [Xem Trước]  [Lưu]               │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
│  [+ Thêm Tab] [Lưu Toàn Bộ]                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Chức Năng:**
- Chỉnh sửa bảng so sánh
- Thêm/xóa hàng (feature)
- Tick/untick tính năng
- Preview bảng

---

#### 11. QUẢN LÝ ĐƠN HÀNG (Orders Management)

**Giao Diện Chính:**
```
┌──────────────────────────────────────────────┐
│   QUẢN LÝ ĐƠN HÀNG                           │
├──────────────────────────────────────────────┤
│                                              │
│ 📊 Tổng Đơn Hàng: 47 | Đang Xử Lý: 12      │
│                                              │
│ Lọc: [Tất Cả ▼] [Nền Tảng ▼] [Trạng Thái ▼] │
│ Tìm Kiếm: [_________________________]        │
│                                              │
│ ┌──────────────────────────────────────────┐│
│ │ ID │ Khách │ Nền Tảng│ Gói│ Giá │ Trạng│ ││
│ ├──────────────────────────────────────────┤│
│ │ #1 │ An    │Facebook │Pro │9.9M │🔄 Ch│ ││
│ │ #2 │ Bảo   │GoogleAds│Std │4.9M │✓  Đ│ ││
│ │ #3 │ Công   │TikTok  │Start│2.9M │⏳ NX│ ││
│ │                                          │ │
│ │ [Chi Tiết] (click để xem order #1)     │ │
│ └──────────────────────────────────────────┘│
│                                              │
│ Pagination: [< 1 2 3 4 >]                  │
│                                              │
└──────────────────────────────────────────────┘
```

**Modal Chi Tiết Đơn Hàng:**
```
┌──────────────────────────────────┐
│  CHI TIẾT ĐƠN HÀNG #1            │
├──────────────────────────────────┤
│                                  │
│ 📋 THÔNG TIN ĐƠN HÀNG:           │
│ ├─ ID Đơn: #1                    │
│ ├─ Ngày Đặt: 13/04/2026          │
│ ├─ Trạng Thái: [Đang Xử Lý]      │
│ │  [Chờ Xử Lý][Đang Thực Hiện]   │
│ │  [Hoàn Thành][Hủy]             │
│ └─ Ghi Chú: [           ]        │
│                                  │
│ 👤 THÔNG TIN KHÁCH:              │
│ ├─ Tên: An                       │
│ ├─ Email: an@gmail.com           │
│ ├─ Phone: 09111111               │
│ ├─ Địa Chỉ: 123 Đ. ,Q1, HCM     │
│ └─ Nền Tảng: Facebook            │
│                                  │
│ 📦 THÔNG TIN ĐƠN HÀNG:           │
│ ├─ Gói: Pro                      │
│ ├─ Giá: 9.999.000 VNĐ            │
│ ├─ Kỳ Hạn: 30 ngày               │
│ └─ Tổng: 9.999.000 VNĐ           │
│                                  │
│ [Gửi Email] [Xóa] [Lưu]        │
│                                  │
└──────────────────────────────────┘
```

---

#### 12. QUẢN LÝ NHẬN TIN (Inquiries/Leads Management)

**Giao Diện Chính:**
```
┌─────────────────────────────────────────┐
│   QUẢN LÝ NHẬN TIN                       │
├─────────────────────────────────────────┤
│                                         │
│ 📬 Tổng Tin: 156 | Chưa Trả Lời: 23   │
│                                         │
│ Lọc: [Tất Cả ▼] [Nền Tảng ▼]           │
│ Tìm Kiếm: [_____________________]      │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ ID │ Tên    │ Phone │ Nền Tảng│ Tin  ││
│ ├─────────────────────────────────────┤│
│ │ #1 │ Khách1 │09111  │Facebook│ Tư vấn││
│ │ #2 │ Khách2 │09222  │GoogleAds│Liên H││
│ │ #3 │ Khách3 │09333  │TikTok │ Tư vấn││
│ │                                     │ │
│ │ [Chi Tiết]                         │ │
│ └─────────────────────────────────────┘│
│                                         │
│ Pagination: [< 1 2 3 4 >]              │
│                                         │
└─────────────────────────────────────────┘
```

**Modal Chi Tiết:**
```
┌──────────────────────────────────┐
│  CHI TIẾT TIN #1                 │
├──────────────────────────────────┤
│                                  │
│ 👤 THÔNG TIN TƯ VẤN:             │
│ ├─ Tên: Khách1                   │
│ ├─ Email: khach1@gmail.com       │
│ ├─ Phone: 0911111111             │
│ ├─ Zalo: (nếu có)                │
│ └─ Nền Tảng: Facebook            │
│                                  │
│ 💬 NỘI DUNG:                     │
│ [Tôi muốn tư vấn về xây dựng...] │
│                                  │
│ 📅 Ngày Gửi: 13/04/2026 14:30    │
│ 📍 Từ: Nút "Tư Vấn Ngay"         │
│                                  │
│ 🔔 Trạng Thái:                   │
│ ☐ Đã Đọc   ☐ Đã Liên Hệ         │
│                                  │
│ 💬 PHẢN HỒI CỦA ADMIN:           │
│ [                          ]     │
│ [Text Area - Reply Text]         │
│                                  │
│ [Gửi Email Phản Hồi] [Đóng]    │
│                                  │
└──────────────────────────────────┘
```

---

#### 13. QUẢN LÝ HÌNH ẢNH (Image Management)

**Step 1 - Chọn Nền Tảng:** (Giống Services Management)

**Step 2 - Quản Lý Hình Ảnh:**
```
┌───────────────────────────────────────────┐
│   QUẢN LÝ HÌNH ẢNH - [Facebook]           │
├───────────────────────────────────────────┤
│                                           │
│  === SLIDESHOW (HOMEPAGE) ===             │
│                                           │
│  Slide #1                                 │
│  ├─ URL Hình: [https://cdn...]           │
│  │  [Chọn Hình] [Upload] [Xóa]           │
│  ├─ Caption: [Xây Dựng Fanpage...]       │
│  ├─ Link: [/facebook]                    │
│  └─ [Sửa] [Xóa] [↑↓ Move]               │
│                                           │
│  Slide #2                                 │
│  ... same as above                        │
│                                           │
│  [+ Thêm Slide] [Xem Trước]              │
│                                           │
│  === BEFORE-AFTER IMAGES ===              │
│                                           │
│  Pair #1                                  │
│  ├─ Ảnh Trước:  [https://cdn/.../before] │
│  │  [Chọn] [Upload] [Xóa]                │
│  ├─ Ảnh Sau:    [https://cdn/.../after]  │
│  │  [Chọn] [Upload] [Xóa]                │
│  ├─ Mô Tả: [Tăng 300% engagement...]    │
│  └─ [Sửa] [Xóa] [Move]                  │
│                                           │
│  Pair #2                                  │
│  ... same as above                        │
│                                           │
│  [+ Thêm Pair] [Xem Trước]                │
│                                           │
│  [Lưu Toàn Bộ]                           │
│                                           │
└───────────────────────────────────────────┘
```

---

#### 14. QUẢN LÝ SEO (SEO Management)

**Giao Diện:**
```
┌──────────────────────────────────────┐
│   QUẢN LÝ SEO                         │
├──────────────────────────────────────┤
│                                      │
│ Chọn Trang:                          │
│ [Trang Chủ ▼]                        │
│ [Facebook] [GoogleAds] [TikTok]...   │
│                                      │
│ ┌──────────────────────────────────┐│
│ │ META TITLE:                       ││
│ │ [But Pha Marketing - Digital ...] ││
│ │ (Max 60 ký tự)                    ││
│ │                                   ││
│ │ META DESCRIPTION:                 ││
│ │ [Xây dựng chiến lược marketing... ││
│ │  (Max 160 ký tự)                  ││
│ │                                   ││
│ │ KEYWORDS:                         ││
│ │ [marketing, facebook, tiktok...] ││
│ │                                   ││
│ │ CANONICAL URL:                    ││
│ │ [https://butpha.com/facebook]    ││
│ │                                   ││
│ │ OPEN GRAPH IMAGE:                 ││
│ │ [https://cdn.../og-image.jpg]    ││
│ │ [Chọn] [Upload]                  ││
│ │                                   ││
│ │ ROBOTS:                           ││
│ │ ☑️ Index ☑️ Follow               ││
│ │                                   ││
│ └──────────────────────────────────┘│
│                                      │
│ [Xem Trước] [Lưu]                  │
│                                      │
└──────────────────────────────────────┘
```

---

#### 15. QUẢN LÝ LỘ TRÌNH DỰ ÁN (Project Roadmap Management)

**Step 1 - Chọn Khách Hàng:**
```
┌─────────────────────────────────┐
│   QUẢN LÝ LỘ TRÌNH DỰ ÁN        │
├─────────────────────────────────┤
│                                 │
│ Chọn Khách Hàng:                │
│ [Tìm Kiếm...] [_______ ▼]       │
│                                 │
│ ┌─────────────────────────────┐│
│ │ ID │ Tên    │ Nền Tảng     │││
│ ├─────────────────────────────┤│
│ │ #1 │ An     │ Facebook     │││
│ │ #2 │ Bảo    │ GoogleAds   │││
│ │ #3 │ Công    │ TikTok       │││
│ │                             │ │
│ │ [Quản Lý Tiến Độ]          │ │
│ └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Step 2 - Quản Lý Nội Dung Tiến Độ:**
```
┌──────────────────────────────────────────┐
│   QUẢN LÝ TIẾN ĐỘ - [An] / [Facebook]   │
├──────────────────────────────────────────┤
│                                          │
│ [+ Thêm Bài Viết]                       │
│                                          │
│ 📰 BÀI VIẾT #1                           │
│ ├─ Tiêu Đề: Hoàn Thành Audit Fanpage   │
│ ├─ Trạng Thái: [Public ▼] [Draft]      │
│ ├─ Nội Dung:                            │
│ │  [Chúng tôi đã hoàn thành...]        │
│ │  [Rich HTML Editor]                  │
│ ├─ Hình Ảnh:                            │
│ │  [URL: https://...]                  │
│ │  [Chọn] [Upload] [Xóa]               │
│ ├─ Ngày Tạo: 13/04/2026                 │
│ └─ [Sửa] [Xóa] [Xem Trước]             │
│                                          │
│ 📰 BÀI VIẾT #2                           │
│ ... same structure ...                   │
│                                          │
│ [Lưu]                                   │
│                                          │
└──────────────────────────────────────────┘
```

**Modal Thêm/Sửa Bài Viết:**
```
┌──────────────────────────────────┐
│   THÊM BÀI VIẾT TIẾN ĐỘ          │
├──────────────────────────────────┤
│                                  │
│ Tiêu Đề:                         │
│ [Hoàn Thành Audit Fanpage...]   │
│                                  │
│ Trạng Thái:                      │
│ ○ Draft (Nháp)                   │
│ ○ Public (Công Khai)             │
│                                  │
│ Nội Dung:                        │
│ [                            ]   │
│ [Rich HTML Text Editor]          │
│ [+ Thêm Ảnh] [+ Video]           │
│                                  │
│ Hình Ảnh Thumbnail:              │
│ [https://...]                    │
│ [Chọn] [Upload]                  │
│                                  │
│ SEO:                             │
│ Meta Desc: [           ]         │
│ Keywords: [           ]          │
│                                  │
│ [Lưu Nháp] [Xuất Bản] [Hủy]    │
│                                  │
└──────────────────────────────────┘
```

---

#### 16. THIẾT LẬP THÔNG TIN (Settings)

**Giao Diện:**
```
┌──────────────────────────────────────┐
│   THIẾT LẬP THÔNG TIN                 │
├──────────────────────────────────────┤
│                                      │
│ === THÔNG TIN CÔNG TY ===             │
│                                      │
│ Tiêu Đề Website (VI):                │
│ [But Pha Marketing - Chuyên Gia...] │
│                                      │
│ Địa Chỉ:                             │
│ [123 Đường Sương Nguyệt Ánh, Q1...] │
│                                      │
│ Email:                               │
│ [admin@butpha.com]                  │
│                                      │
│ Hotline:                             │
│ [0932 123 456]                       │
│                                      │
│ Zalo OA:                             │
│ [093XXXX] (ID hoặc link)            │
│                                      │
│ Website:                             │
│ [https://butpha.com]               │
│                                      │
│ Fanpage:                             │
│ [https://facebook.com/butpha]       │
│                                      │
│ === ANALYTICS & TRACKING ===         │
│                                      │
│ Google Analytics ID:                 │
│ [G-XXXXXXXXXXXXX]                    │
│                                      │
│ Google Webmaster Tools:              │
│ [abc123xyz...]                       │
│                                      │
│ === CUSTOM CODE ===                  │
│                                      │
│ Head JavaScript:                     │
│ [                            ]       │
│ [Code Editor - <script>...</script>] │
│                                      │
│ Body JavaScript:                     │
│ [                            ]       │
│ [Code Editor]                        │
│                                      │
│ [Lưu]                               │
│                                      │
└──────────────────────────────────────┘
```

---

## 🗄️ DATABASE SCHEMA (Khuyến Nghị)

### Bảng: `users`
```
- id (PK)
- email (UNIQUE)
- password (hashed)
- name
- phone
- platform_id (FK)
- created_at
- updated_at
```

### Bảng: `platforms`
```
- id (PK)
- name
- slug
- color
- is_active
- order
- created_at
- updated_at
```

### Bảng: `content_home`
```
- id (PK)
- logo_url
- title
- description
- hotline
- email
- cta_text
- cta_link
- updated_at
```

### Bảng: `content_pages`
```
- id (PK)
- platform_id (FK)
- vision
- mission
- values
- stats_title
- updated_at
```

### Bảng: `stats`
```
- id (PK)
- page_id (FK)
- number
- unit
- description
- order
```

### Bảng: `faqs`
```
- id (PK)
- page_id (FK)
- question
- answer
- order
```

### Bảng: `service_tabs`
```
- id (PK)
- platform_id (FK)
- name
- order
```

### Bảng: `service_packages`
```
- id (PK)
- tab_id (FK)
- name
- price
- description
- features (JSON)
- audio_type (upload/tts)
- audio_url (nếu upload)
- audio_script
```

### Bảng: `comparison_tables`
```
- id (PK)
- platform_id (FK)
- tab_id (FK)
- features (JSON array)
- packages (JSON array)
```

### Bảng: `orders`
```
- id (PK)
- user_id (FK)
- package_id (FK)
- platform_id (FK)
- customer_name
- customer_email
- customer_phone
- customer_address
- total_price
- status (pending/processing/completed/cancelled)
- payment_method
- created_at
```

### Bảng: `inquiries`
```
- id (PK)
- name
- email
- phone
- zalo
- platform_id (FK)
- content
- source (consultation_button/contact_button/inquiry_form)
- is_read
- is_contacted
- response
- created_at
```

### Bảng: `images`
```
- id (PK)
- platform_id (FK)
- type (slideshow/before_after)
- url_before (nếu before_after)
- url_after (nếu before_after)
- url (slideshow)
- caption
- link
- order
```

### Bảng: `seo_pages`
```
- id (PK)
- page_slug
- meta_title
- meta_description
- keywords
- canonical_url
- og_image
- robots_index
- robots_follow
```

### Bảng: `roadmap_articles`
```
- id (PK)
- user_id (FK)
- title
- content (HTML)
- image_url
- status (draft/published)
- created_at
- updated_at
```

### Bảng: `settings`
```
- id (PK)
- key (title, address, email, hotline, ...)
- value
- type (string, text, json)
- updated_at
```

---

## 🔐 SECURITY & AUTHENTICATION

- ✅ Hash password (bcrypt)
- ✅ JWT token cho session
- ✅ CSRF protection
- ✅ Rate limiting (login attempts)
- ✅ HTTPS only
- ✅ Role-based access (admin/customer)
- ✅ Input validation & sanitization
- ✅ XSS protection

---

## 📱 RESPONSIVE DESIGN

- ✅ Mobile-first approach
- ✅ Responsive for all modals
- ✅ Touch-friendly buttons
- ✅ Optimized images

---

## 📊 NOTIFICATIONS

- ✅ Push notifications (qua service worker)
- ✅ Email notifications (khi có order/inquiry)
- ✅ Notification UI in dashboard

---

## ⚡ PERFORMANCE

- ✅ Image optimization
- ✅ Lazy loading for images
- ✅ Caching strategy
- ✅ CDN for static files

---

## ✅ CHECKLIST TRIỂN KHAI

### Frontend
- [ ] Xóa stats section từ trang chủ
- [ ] Thêm nút "Đăng Nhập/Đăng Ký" và "Lộ Trình Dự Án"
- [ ] Build modal đăng nhập/đăng ký
- [ ] Build client portal (Personal Dashboard)
- [ ] Build diagnostic wizard (5 steps)
- [ ] Build order form
- [ ] Thêm nút "Thuyết Trình" (riêng biệt, ngoài chatbot widget)

### Backend
- [ ] Setup database + migrations
- [ ] API endpoints cho authentication
- [ ] API endpoints cho user data
- [ ] API endpoints cho roadmap articles
- [ ] Push notification service
- [ ] Email service
- [ ] Image upload handler
- [ ] File validation

### Admin Panel
- [ ] Dashboard (Platform Management)
- [ ] Content Management (CMS)
- [ ] Services Management
- [ ] Comparison Tables
- [ ] Orders Management
- [ ] Inquiries Management
- [ ] Image Management
- [ ] SEO Management
- [ ] Roadmap Management
- [ ] Settings

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Security tests

### Deployment
- [ ] Environment configuration
- [ ] Database setup (production)
- [ ] CDN configuration
- [ ] Analytics setup
- [ ] Monitoring setup
- [ ] Backup strategy

---

## 📞 SUPPORT & MAINTENANCE

- [ ] Create documentation
- [ ] Setup error tracking
- [ ] Setup performance monitoring
- [ ] Create admin user guide
- [ ] Create customer FAQ

---

**Version:** 1.0  
**Date:** 13/04/2026  
**Status:** Ready for Development
