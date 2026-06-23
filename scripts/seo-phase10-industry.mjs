/**
 * Pha 10 — 20 ngành ưu tiên + helper phân biệt nội dung theo ngành.
 */

/** 20 slug volume + chuyển đổi cao — có file rewrite chuyên sâu. */
export const PHASE10_PRIORITY_SLUGS = [
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-hang",
  "thiet-ke-website-bat-dong-san",
  "thiet-ke-website-thuong-mai-dien-tu",
  "thiet-ke-website-nha-khoa",
  "thiet-ke-website-tham-my-vien",
  "thiet-ke-website-khach-san",
  "thiet-ke-website-tphcm",
  "thiet-ke-website-ha-noi",
  "thiet-ke-website-wordpress",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-cong-ty",
  "thiet-ke-website-nha-hang-menu",
  "thiet-ke-website-bat-dong-san-du-an",
  "thiet-ke-website-my-pham-lam-dep",
  "thiet-ke-website-du-lich-tour",
  "thiet-ke-website-y-te-dat-kham",
  "thiet-ke-website-kien-truc-noi-that",
  "thiet-ke-website-cong-ty-xay-dung",
  "thiet-ke-website-chuan-seo",
];

export const TEMPLATE_INTRO_MARK = "Khác template rẻ tái sử dụng";

export function buildIndustryIntroParagraphs(entry, keyword, angle) {
  const niche = entry.niche || angle;
  const industry = entry.industry || keyword.replace(/^thiết kế website\s*/i, "");
  const f1 = entry.features?.[0] || "form thu lead và CTA rõ trên mobile";
  const f2 = entry.features?.[1] || "SEO on-page và Google Maps";

  return [
    `${keyword} là quy trình xây dựng website chuyên cho ${niche} — tập trung ${f1.charAt(0).toLowerCase() + f1.slice(1)} và ${f2.charAt(0).toLowerCase() + f2.slice(1)}. Khác Fanpage hay template dùng chung, ${keyword} custom giúp bạn sở hữu kênh chuyển đổi 24/7, trình bày đúng nhu cầu khách ngành ${industry} và tích lũy traffic SEO bền vững.`,
    `Bài viết dành cho chủ doanh nghiệp, quản lý và marketer ngành ${industry} đang tìm ${keyword}: cấu trúc trang gợi ý, checklist tính năng, quy trình 7 bước, bảng giá 2026 theo ngành và FAQ thực chiến tại Việt Nam.`,
  ];
}

export function buildIndustryTakeaways(entry, keyword) {
  const industry = entry.industry || "doanh nghiệp";
  return [
    `${industry}: ưu tiên mobile — khách tìm dịch vụ trên điện thoại trước khi gọi.`,
    entry.features?.[0] || `${keyword} cần CTA đặt lịch/liên hệ rõ.`,
    entry.features?.[1] || "Gallery và social proof tăng tỷ lệ chuyển đổi.",
    `SEO: từ khóa "${industry} + quận" và schema phù hợp ngành.`,
    "Bứt Phá Marketing: gói 3–12 triệu, tư vấn miễn phí.",
  ];
}

export function buildIndustryMistakes(entry, keyword) {
  const industry = entry.industry || "ngành";
  return [
    `Dùng template ngành khác — ${entry.niche} cần UX và nội dung riêng.`,
    `Web đẹp nhưng thiếu bảng giá/minh bạch dịch vụ — khách ${industry} hay so sánh 3–5 đơn vị.`,
    `Chỉ đầu tư Fanpage, không có website — mất dữ liệu lead và SEO.`,
    `Ảnh nặng, tốc độ chậm — bounce rate cao trên mobile.`,
    `Bỏ qua Google Business Profile và SEO địa phương cho ${industry}.`,
  ];
}

export function buildIndustryContextSection(entry, keyword) {
  const industry = entry.industry || "";
  const faq0 = entry.faq?.[0];
  const featureList = (entry.features || []).slice(0, 3).join("; ") || "tính năng chuyên ngành";

  return `
<h2 id="nganh">Đặc thù ${keyword} cho ngành ${industry}</h2>
<p>Khách hàng ngành <strong>${industry}</strong> thường tìm kiếm online trước khi liên hệ — ${faq0 ? faq0.a : "website cần trả lời đúng câu hỏi về dịch vụ, giá và uy tín."}</p>
<p>So với website corporate chung, <strong>${keyword}</strong> cần nhấn mạnh: ${featureList}.</p>
`;
}

export function industryPricingNote(entry) {
  const industry = entry.industry || "";
  if (!industry) return "";
  return `<p class="text-sm text-slate-600"><em>Lưu ý ngành ${industry}:</em> Giá website thường cao hơn landing 3 trang khi cần gallery lớn, form đặt lịch hoặc tích hợp chuyên sâu — scope càng rõ, báo giá càng chính xác.</p>`;
}

export function buildIndustryFaqExtras(entry, keyword) {
  const industry = entry.industry || "ngành";
  return [
    {
      q: `Website ${industry} khác website thông thường thế nào?`,
      a: `Cần nội dung, tính năng và CTA phù hợp ${entry.niche || industry} — không copy layout shop hay corporate khô khan.`,
    },
    {
      q: `${keyword} bao lâu thì có lead từ Google?`,
      a: "On-page chuẩn có thể index trong 1–2 tuần; traffic organic ổn định thường 2–4 tháng kèm Maps và content địa phương.",
    },
  ];
}
