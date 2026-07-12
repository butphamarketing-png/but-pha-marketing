# Bing Webmaster Tools + IndexNow Checklist

- Generated: 2026-07-12T06:36:31.319Z
- Site: `https://www.butphamarketing.com`
- IndexNow key file: `https://www.butphamarketing.com/butpha-indexnow-202607.txt`

## 1. Verify site trên Bing WMT
- [ ] Mở [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] **Add a site** → `https://www.butphamarketing.com`
- [ ] Chọn verify bằng **HTML file** hoặc **DNS** (khuyến nghị DNS nếu có quyền domain)
- [ ] Nếu dùng IndexNow key: file đã live tại `https://www.butphamarketing.com/butpha-indexnow-202607.txt` (nội dung: `butpha-indexnow-202607`)
- [ ] Confirm status **Verified** trong dashboard

## 2. Submit sitemap
- [ ] Bing WMT → **Sitemaps** → Submit `https://www.butphamarketing.com/sitemap.xml`
- [ ] Kiểm tra không có lỗi crawl blocking

## 3. Ping IndexNow
```bash
npm run ping:indexnow              # 30 URL core GSC
npm run export:indexnow-blog-hot   # export ~6k hot blog
npm run ping:indexnow:blog-hot     # ping batch 100 URL/lần
```
- [ ] Core 30 URL → HTTP **202** (không phải 403)
- [ ] Blog hot batch → report tại `tmp-programmatic/indexnow-ping-report.md`

## 4. Nếu vẫn 403 UserForbiddedToAccessSite
- [ ] Đợi 24h sau verify Bing WMT rồi ping lại
- [ ] Key file không có BOM, không có space/dòng thừa
- [ ] Host trong payload = `www.butphamarketing.com` (khớp property verified)
- [ ] Thử verify cả `https://butphamarketing.com` nếu redirect www

## 5. Theo dõi
- [ ] Bing WMT → **URL Inspection** — spot check 5 URL blog hot
- [ ] Bing WMT → **Index Explorer** — indexed count tăng sau 7–14 ngày