/**
 * Checklist verify Bing Webmaster Tools + IndexNow.
 * Chạy: npm run build:bing-wmt-checklist
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "tmp-programmatic", "bing-wmt-checklist.md");

const KEY = "butpha-indexnow-202607";
const SITE = "https://www.butphamarketing.com";
const KEY_URL = `${SITE}/${KEY}.txt`;

const lines = [];
lines.push("# Bing Webmaster Tools + IndexNow Checklist");
lines.push("");
lines.push(`- Generated: ${new Date().toISOString()}`);
lines.push(`- Site: \`${SITE}\``);
lines.push(`- IndexNow key file: \`${KEY_URL}\``);
lines.push("");
lines.push("## 1. Verify site trên Bing WMT");
lines.push("- [ ] Mở [Bing Webmaster Tools](https://www.bing.com/webmasters)");
lines.push("- [ ] **Add a site** → `https://www.butphamarketing.com`");
lines.push("- [ ] Chọn verify bằng **HTML file** hoặc **DNS** (khuyến nghị DNS nếu có quyền domain)");
lines.push(`- [ ] Nếu dùng IndexNow key: file đã live tại \`${KEY_URL}\` (nội dung: \`${KEY}\`)`);
lines.push("- [ ] Confirm status **Verified** trong dashboard");
lines.push("");
lines.push("## 2. Submit sitemap");
lines.push("- [ ] Bing WMT → **Sitemaps** → Submit `https://www.butphamarketing.com/sitemap.xml`");
lines.push("- [ ] Kiểm tra không có lỗi crawl blocking");
lines.push("");
lines.push("## 3. Ping IndexNow");
lines.push("```bash");
lines.push("npm run ping:indexnow              # 30 URL core GSC");
lines.push("npm run export:indexnow-blog-hot   # export ~6k hot blog");
lines.push("npm run ping:indexnow:blog-hot     # ping batch 100 URL/lần");
lines.push("```");
lines.push("- [ ] Core 30 URL → HTTP **202** (không phải 403)");
lines.push("- [ ] Blog hot batch → report tại `tmp-programmatic/indexnow-ping-report.md`");
lines.push("");
lines.push("## 4. Nếu vẫn 403 UserForbiddedToAccessSite");
lines.push("- [ ] Đợi 24h sau verify Bing WMT rồi ping lại");
lines.push("- [ ] Key file không có BOM, không có space/dòng thừa");
lines.push("- [ ] Host trong payload = `www.butphamarketing.com` (khớp property verified)");
lines.push("- [ ] Thử verify cả `https://butphamarketing.com` nếu redirect www");
lines.push("");
lines.push("## 5. Theo dõi");
lines.push("- [ ] Bing WMT → **URL Inspection** — spot check 5 URL blog hot");
lines.push("- [ ] Bing WMT → **Index Explorer** — indexed count tăng sau 7–14 ngày");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== Bing WMT checklist ===");
console.log(`Report: ${outPath}`);
