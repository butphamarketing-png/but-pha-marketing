# 🎯 QUICK REFERENCE - But Pha Marketing

## 📍 THAY ĐỔI TRANG CHỦ
- ❌ Xóa Stats Section
- ✅ Thêm nút "Đăng Nhập/Đăng Ký"
- ✅ Thêm nút "Lộ Trình Dự Án"

---

## 👤 HỆ THỐNG XÁC THỰC

### Đăng Nhập/Đăng Ký Modal
```
Form Fields:
- Email/Username
- Password (+ Confirm cho signup)
- Platform Select (6 options)

Platforms: Facebook | Google Ads | TikTok | Instagram | Zalo | Website
```

**Flow:**
1. Signup → Tạo Account
2. Login → Nếu từ "Lộ Trình Dự Án" → Chuyển đến Portal
3. Hỏi Push Notification Permission

---

## 🏠 CLIENT PORTAL (Lộ Trình Dự Án)

**Hiển Thị:**
- Danh sách bài viết tiến độ (do admin quản lý)
- Mỗi bài: Tiêu đề + Nội dung + Hình ảnh + Ngày cập nhật
- Nếu chưa có bài → "Admin đang chuẩn bị..."

**Trigger:**
- Nút "Lộ Trình Dự Án" trên trang chủ
- Hoặc Top Navigation (nếu đã đăng nhập)

---

## 🔍 CHẨN ĐOÁN SỨC KHOẼ (Diagnostic Wizard)

**Trigger**: Nút "Thuyết Trình" trên Chatbot

**5 Bước:**
1. **Intro** - Giới thiệu wizard
2. **Form** - Nhập Tên, Email, Phone, Platform
3. **Quiz** - Câu hỏi về nhu cầu (checkboxes + radio)
4. **Result** - Hiển thị kết quả + gợi ý gói
5. **Redirect** → Khi đóng → Trang Đặt Hàng

**Control Flow:**
- ❌ Không cho back/close/refresh
- ✅ Chỉ "Tiếp Tục" hoặc "Hủy" (confirm)
- ✅ Chatbot disabled khi wizard opened

---

## 📦 TRANG ĐẶT HÀNG

**Fields:**
- Khách hàng info (Tên, Email, Phone, Địa chỉ)
- Gói + Giá (auto-filled từ gợi ý)
- Ghi chú
- Phương thức thanh toán
- Terms agreement

**After Submit:**
- Tạo Order trong DB
- Gửi Email xác nhận
- Ghi vào Admin "Quản Lý Nhận Tin"

---

## ⚙️ ADMIN DASHBOARD (10 Sections)

### 1. 📊 Bảng Điều Khiển (Dashboard)
- 6 nền tảng (Platform cards)
- Bật/Tắt hiển thị, Đổi tên, Đổi màu, Sắp xếp

### 2. 📝 Quản Trị Nội Dung
- **Trang Chủ:** Logo, Tiêu đề, Nội dung, Hotline, Email
- **6 Trang Con:** Vision, Mission, Values, Stats, FAQ

### 3. 🛍️ Quản Lý Dịch Vụ
- Chọn Nền Tảng
- Thêm Tab (vd: "Xây Dựng", "Chăm Sóc", "Quảng Cáo")
- Cho mỗi Tab: Thêm Package (Tên, Giá, Features, Audio)
- Audio: Upload hoặc TTS (Text-to-Speech)

### 4. ⚖️ So Sánh Các Gói
- Chọn Nền Tảng
- Tạo bảng so sánh: Package vs Features
- Tick/Untick tính năng

### 5. 📦 Quản Lý Đơn Hàng
- Xem danh sách đơn
- Chi tiết: Khách hàng, Package, Giá, Trạng thái
- Cập nhật trạng thái
- Gửi email

### 6. 💬 Quản Lý Nhận Tin
- Xem inquiry từ nút "Tư Vấn Ngay" / "Liên Hệ"
- Thông tin: Tên, Phone, Email, Zalo, Content
- Trả lời inquiry
- Đánh dấu đã xử lý

### 7. 🖼️ Quản Lý Hình Ảnh
- Chọn Nền Tảng
- **Slideshow:** URL ảnh + Caption + Link
- **Before-After:** URL trước + URL sau + Mô tả

### 8. 🔍 Quản Lý SEO
- Meta Title, Description, Keywords
- Canonical URL, OG Image
- Robots Index/Follow

### 9. 🗺️ Quản Lý Lộ Trình Dự Án
- Chọn Khách Hàng
- Chọn nền tảng
- Thêm bài viết: Tiêu đề + Nội dung (HTML) + Hình + Status (Draft/Public)

### 10. ⚙️ Thiết Lập Thông Tin
```
- Tiêu đề Website (VI)
- Địa chỉ
- Email
- Hotline
- Zalo
- Website
- Fanpage
- Google Analytics ID
- Google Webmaster
- Head JS
- Body JS
```

---

## 🗄️ KEY DATABASE TABLES

```
users             - Username, Email, Password, Platform
platforms         - 6 nền tảng (Facebook, Google, TikTok, IG, Zalo, Website)
content_home      - Homepage content
content_pages     - Sub page content (Vision, Mission, Values)
stats             - Stats items
faqs              - FAQ items
service_tabs      - Tab groups (Xây dựng, Chăm sóc, Quảng cáo)
service_packages  - Packages (Starter, Premium, Pro) + Audio
orders            - Customer orders
inquiries         - Leads/Contact forms
images            - Slideshow + Before-After
roadmap_articles  - Tiến độ articles cho khách
settings          - Global settings
seo_pages         - SEO metadata
```

---

## 🔗 API ENDPOINTS (examples)

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

User/Dashboard:
GET    /api/user/portal/:userId
GET    /api/user/roadmap/:userId

Services & Packages:
GET    /api/platforms/:platformId/services
GET    /api/packages/:packageId

Orders:
POST   /api/orders
GET    /api/orders/:orderId

Inquiries:
POST   /api/inquiries
GET    /api/admin/inquiries

Admin (Protected):
GET/PUT    /api/admin/platforms
GET/PUT    /api/admin/content/home
GET/PUT    /api/admin/content/:platform
POST/GET   /api/admin/packages
GET/PUT    /api/admin/roadmap/:userId
```

---

## 🎨 UI COMPONENTS NEEDED

**Frontend:**
- [ ] Modal - Login/Signup
- [ ] Portal Dashboard
- [ ] Wizard (Diagnostic)
- [ ] Order Form
- [ ] Chatbot Widget (with "Thuyết Trình" button)

**Admin:**
- [ ] Platform Card (editable)
- [ ] CMS Editor (Rich Text)
- [ ] Tab Management
- [ ] Package Manager
- [ ] Order List + Detail Modal
- [ ] Inquiry List + Reply Modal
- [ ] Image Manager
- [ ] SEO Form
- [ ] Roadmap Editor

---

## 🚀 TECH STACK (Recommended)

**Frontend:**
- Next.js 14+
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui (components)
- TanStack Query (data fetching)
- Zustand (state management)
- Form: React Hook Form + Zod

**Backend:**
- Next.js API Routes (hoặc Node.js + Express)
- Database: PostgreSQL (hoặc MySQL)
- ORM: Prisma (hoặc Drizzle)
- Auth: NextAuth.js (hoặc JWT)
- Email: SendGrid, Mailgun, v.v.
- File Upload: AWS S3, Cloudinary, v.v.
- Push Notification: Firebase, OneSignal, v.v.

**Admin:**
- React Admin (open-source)
- Hoặc custom built with Next.js + Shadcn/ui

---

## 📋 PRIORITY ORDER

### Phase 1 - MVP (Week 1-2)
1. Remove stats from homepage
2. Login/Signup modal
3. Client Portal (basic)
4. Dashboard (Platform management)
5. Order form

### Phase 2 - Core Features (Week 3-4)
1. Content Management (CMS)
2. Services Management
3. Diagnostic Wizard
4. Roadmap Management
5. Inquiries Management

### Phase 3 - Polish (Week 5)
1. Image Management
2. SEO Management
3. Comparison Tables
4. Email notifications
5. Push notifications

---

## 🧪 TESTING CHECKLIST

- [ ] Login/Logout flow
- [ ] Signup validation
- [ ] Platform selection
- [ ] Portal display
- [ ] Diagnostic flow (all steps)
- [ ] Order submission
- [ ] Admin CRUD operations
- [ ] Image upload
- [ ] Email sending
- [ ] Push notifications
- [ ] Mobile responsiveness
- [ ] SEO meta tags
- [ ] Performance (Lighthouse)

---

## 📱 DEPLOYMENT

**Hosting:** Vercel (already setup)

**Steps:**
1. Push code to GitHub
2. Vercel auto-deploys
3. Setup environment variables
4. Database backup strategy
5. CDN for images

---

## 📞 IMPORTANT NOTES

✅ **2 Main Files Created:**
1. `FEATURE_REQUIREMENTS.md` - Detailed feature list
2. `COMPLETE_DEV_PROMPT.md` - Full developer prompt with UI mockups

✅ **Use These Files:**
- Share with developers
- Use as development guide
- Reference for discussions
- Acceptance criteria for testing

✅ **Key Principles:**
- Mobile-first responsive design
- Security (HTTPS, validation, sanitization)
- Performance (optimize images, caching)
- User experience (smooth flows, confirmations)
- Admin experience (intuitive CMS, bulk actions)

---

**Last Updated:** 13/04/2026
**Version:** 1.0
