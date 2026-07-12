import { SITE } from "./seo-wp-structure.mjs";

/** GSC proof — passes numeric + /du-an/ checks in priority-proof audit */
export function wpProofGscBand() {
  return `<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 my-6">
<p><strong>Proof thực chiến:</strong> Dự án <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> ghi nhận <strong>15,4K impressions</strong> và <strong>471 clicks</strong> từ Google Search sau triển khai website + SEO. Xem thêm <a href="${SITE}/du-an/thien-hoang-kim">Thiên Hoàng Kim</a> và <a href="${SITE}/du-an">toàn bộ case study</a>.</p>
</div>`;
}

/** Fanpage proof — for construction / Facebook-adjacent clusters */
export function wpProofFanpageBand() {
  return `<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 my-6">
<p><strong>Proof thực chiến:</strong> <a href="${SITE}/du-an/sao-khue">Kiến Trúc Sao Khuê</a> — Fanpage đạt <strong>83.374 lượt xem</strong> trong 90 ngày và <strong>4.329 lượt xem video</strong> ≥3 giây, bổ sung kênh lead song song website. Xem <a href="${SITE}/du-an">case study</a>.</p>
</div>`;
}

/** Spa / beauty — Phước Lai + Halee Trâm */
export function wpProofSpaBand() {
  return `<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 my-6">
<p><strong>Proof ngành spa/làm đẹp:</strong> <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a> và <a href="${SITE}/du-an/halee-tram">Halee Trâm</a> — website booking + Fanpage đồng bộ, nuôi lead inbox. Tham khảo <a href="${SITE}/du-an">case study</a>.</p>
</div>`;
}

/** Logistics B2B */
export function wpProofLogisticsBand() {
  return `<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 my-6">
<p><strong>Proof ngành logistics:</strong> <a href="${SITE}/du-an/van-toc-express-logistics">Vận Tốc Express</a> — website B2B form báo giá cước, tra cứu vận đơn và silo SEO ngành. Xem <a href="${SITE}/website/nganh/logistics">landing logistics</a> · <a href="${SITE}/du-an">case study</a>.</p>
</div>`;
}

/** Mỹ phẩm D2C */
export function wpProofMyPhamBand() {
  return `<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 my-6">
<p><strong>Proof ngành mỹ phẩm:</strong> <a href="${SITE}/du-an/glow-dew-cosmetics">Glow Dew Beauty</a> — skincare D2C, INCI, checkout mobile và SEO brand. Xem <a href="${SITE}/website/nganh/my-pham">landing mỹ phẩm</a> · <a href="${SITE}/du-an">case study</a>.</p>
</div>`;
}
