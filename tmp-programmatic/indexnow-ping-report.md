# IndexNow Ping Report

- Generated at: 2026-07-14T18:12:23.046Z
- Host: `www.butphamarketing.com`
- Key location: `https://www.butphamarketing.com/butpha-indexnow-202607.txt`
- Total URLs: **61**
- Mode: **live**

## Results
- **FAIL** batch 1: HTTP 403 — 61 URLs
  - Response: `{"errorCode":"UserForbiddedToAccessSite","message":"User is unauthorized to access the site. Please verify the site using the key and try again","details":null}`

⚠️ Một số batch thất bại — kiểm tra key file đã deploy chưa.

### 403 UserForbiddedToAccessSite
- Key file phải live tại `KEY_LOCATION` (nội dung = key, không có BOM/space thừa)
- Thêm site vào [Bing Webmaster Tools](https://www.bing.com/webmasters) và verify (DNS/HTML/key file)
- Sau verify, chạy lại: `npm run ping:indexnow`