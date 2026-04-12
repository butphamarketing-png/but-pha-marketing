# Hướng Dẫn Chạy Dự Án Bứt Phá Marketing

Dự án này là một hệ thống Monorepo sử dụng **pnpm workspaces**. Dưới đây là các bước để khởi chạy toàn bộ hệ thống trên máy tính của bạn.

## 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 20 hoặc mới hơn.
- **pnpm**: Trình quản lý gói chính của dự án.
- **PostgreSQL**: Nếu bạn muốn chạy thực tế với Database (mặc định Frontend đang dùng localStorage để demo nhanh).

## 2. Cài đặt Dependencies
Mở terminal tại thư mục gốc của dự án và chạy:
```bash
pnpm install
```

## 3. Khởi chạy các thành phần

### Chạy giao diện chính (Frontend)
Ứng dụng Marketing chính với đầy đủ hiệu ứng và 6 nền tảng:
```bash
pnpm --filter @workspace/but-pha-marketing dev
```
Sau khi chạy, mở trình duyệt truy cập: `http://localhost:26244`

### Chạy API Server (Backend)
Máy chủ Express xử lý đơn hàng và leads:
```bash
pnpm --filter @workspace/api-server dev
```

### Chạy Mockup Sandbox
Môi trường thử nghiệm các component:
```bash
pnpm --filter @workspace/mockup-sandbox dev
```

## 4. Các tính năng nổi bật đã tích hợp
- **Trang chủ**: Hiệu ứng Loading, Shimmer buttons, Hotline cố định.
- **6 Trang dịch vụ**: Facebook, TikTok, Instagram, Zalo, Google Maps, Website.
- **Component cao cấp**: 
    - `AudioGuide`: AI đọc tư vấn tiếng Việt.
    - `BeforeAfterSlider`: So sánh ảnh trước/sau.
    - `DecisionTreeQuiz`: Trắc nghiệm chọn gói dịch vụ.
- **Admin Dashboard**: Quản trị CMS, SEO, Media và xem mã nguồn tại `/admin` (Mật khẩu: `admin123`).
- **UX Nâng cao**: Chuột tùy biến, nhạc nền Lo-fi, lời chào thông minh theo thời gian.

## 5. Lưu ý quan trọng
Nếu bạn gặp lỗi liên quan đến **native binding** (như rollup hoặc lightningcss) trên Windows, hãy chạy lệnh sau tại thư mục gốc:
```bash
npm install @rollup/rollup-win32-x64-msvc lightningcss-win32-x64-msvc --legacy-peer-deps
```

Chúc bạn có những trải nghiệm tuyệt vời với dự án **Bứt Phá Marketing**!
