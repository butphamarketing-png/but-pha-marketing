# Bứt Phá Marketing

Website marketing agency (Next.js + Supabase).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint

## Main routes

- `/` — homepage
- `/blog` — news
- `/cong-cu` — bộ công cụ client-side (Đóng dấu logo + Xóa nền AI)
- `/chienluocmarketing` — marketing strategy tool
- `/cms` — Asset Tracker ERP (quản lý khách hàng, tài sản, báo cáo)
- `/adminbp` — admin panel marketing site
- `/admin` → redirect `/adminbp`

## Cài đặt và chạy

1. Cài dependency:
   - `npm install`
2. Chạy môi trường dev:
   - `npm run dev`
3. Build production:
   - `npm run build`
4. Chạy production local:
   - `npm run start`

## Deploy static (khuyến nghị)

- App đã ưu tiên xử lý ảnh 100% client-side; phù hợp deploy dạng static hosting/CDN.
- Nếu cần xuất static file, có thể dùng hạ tầng hỗ trợ Next.js static output (hoặc Vercel/Netlify tương thích Next.js).
- Đảm bảo cache assets model AI để tối ưu trải nghiệm offline sau lần tải đầu.
