/**
 * Inject silo block (hub, money, landing, case study) vào HTML bài blog.
 */
const SITE = "https://www.butphamarketing.com";

/** @typedef {{ slug: string, hub: string, money: string, landing: string, caseStudy?: string | null, kind?: "checklist" | "template" }} SiloConfig */

/** @type {SiloConfig[]} */
export const SILO_FIXES = [
  {
    slug: "checklist-website-nha-khoa-2026",
    hub: "/blog/nganh/nha-khoa",
    caseStudy: "/du-an/nha-khoa-dang-khoa",
    money: "/blog/thiet-ke-website-nha-khoa",
    landing: "/website/nganh/nha-khoa",
    kind: "checklist",
  },
  {
    slug: "checklist-website-tham-my-vien-2026",
    hub: "/blog/nganh/tham-my",
    caseStudy: "/du-an/thien-hoang-kim",
    money: "/blog/thiet-ke-website-tham-my-vien",
    landing: "/website/nganh/tham-my",
    kind: "checklist",
  },
  {
    slug: "checklist-website-phong-kham-2026",
    hub: "/blog/nganh/phong-kham",
    caseStudy: "/du-an/nha-khoa-dang-khoa",
    money: "/blog/thiet-ke-website-phong-kham-da-khoa",
    landing: "/website/nganh/phong-kham",
    kind: "checklist",
  },
  {
    slug: "checklist-website-logistics-2026",
    hub: "/blog/nganh/logistics",
    caseStudy: "/du-an/van-toc-express-logistics",
    money: "/blog/thiet-ke-website-logistics-van-tai",
    landing: "/website/nganh/logistics",
    kind: "checklist",
  },
  {
    slug: "checklist-website-my-pham-2026",
    hub: "/blog/nganh/my-pham",
    caseStudy: "/du-an/glow-dew-cosmetics",
    money: "/blog/thiet-ke-website-my-pham-lam-dep",
    landing: "/website/nganh/my-pham",
    kind: "checklist",
  },
  {
    slug: "checklist-website-co-khi-2026",
    hub: "/blog/nganh/co-khi",
    caseStudy: "/du-an/kien-truc-sao-khue",
    money: "/blog/thiet-ke-website-co-khi",
    landing: "/website/nganh/co-khi",
    kind: "checklist",
  },
  {
    slug: "checklist-website-pccc-2026",
    hub: "/blog/nganh/pccc",
    caseStudy: "/du-an/pccc-bao-an-fire",
    money: "/blog/thiet-ke-website-pccc",
    landing: "/website/nganh/pccc",
    kind: "checklist",
  },
  {
    slug: "template-website-nha-khoa-2026",
    hub: "/blog/nganh/nha-khoa",
    caseStudy: "/du-an/nha-khoa-dang-khoa",
    money: "/blog/thiet-ke-website-nha-khoa",
    landing: "/website/nganh/nha-khoa",
    kind: "template",
  },
  {
    slug: "case-study-thiet-ke-website-van-toc-express-logistics",
    hub: "/blog/nganh/logistics",
    caseStudy: "/du-an/van-toc-express-logistics",
    money: "/blog/thiet-ke-website-logistics-van-tai",
    landing: "/website/nganh/logistics",
    kind: "case-study",
  },
  {
    slug: "case-study-thiet-ke-website-glow-dew-cosmetics",
    hub: "/blog/nganh/my-pham",
    caseStudy: "/du-an/glow-dew-cosmetics",
    money: "/blog/thiet-ke-website-my-pham-lam-dep",
    landing: "/website/nganh/my-pham",
    kind: "case-study",
  },
  {
    slug: "thiet-ke-website-noi-that",
    hub: "/blog/nganh/noi-that",
    caseStudy: "/du-an/kien-truc-sao-khue",
    money: "/blog/thiet-ke-website-noi-that",
    landing: "/website/nganh/noi-that",
    kind: "industry",
  },
  {
    slug: "thiet-ke-website-go-noi-that",
    hub: "/blog/nganh/noi-that",
    caseStudy: "/du-an/kien-truc-sao-khue",
    money: "/blog/thiet-ke-website-noi-that",
    landing: "/website/nganh/noi-that",
    kind: "industry",
  },
  {
    slug: "thiet-ke-website-noi-that-van-phong",
    hub: "/blog/nganh/noi-that",
    caseStudy: "/du-an/kien-truc-sao-khue",
    money: "/blog/thiet-ke-website-noi-that",
    landing: "/website/nganh/noi-that",
    kind: "industry",
  },
  {
    slug: "thiet-ke-website-vat-lieu-xay-dung",
    hub: "/blog/nganh/xay-dung",
    caseStudy: "/du-an/kien-truc-sao-khue",
    money: "/blog/thiet-ke-website-xay-dung-nha-thau",
    landing: "/website/nganh/xay-dung",
    kind: "industry",
  },
];

export const SILO_FIX_BY_SLUG = Object.fromEntries(SILO_FIXES.map((c) => [c.slug, c]));

/** @param {SiloConfig} cfg */
function siloBlock(cfg) {
  const labels = {
    template: "template silo ngành",
    checklist: "checklist silo ngành",
    "case-study": "case study blog silo",
    industry: "money page ngành",
  };
  const label = labels[cfg.kind] || "silo ngành";
  const caseStudyLi = cfg.caseStudy
    ? `  <li><a href="${SITE}${cfg.caseStudy}"><strong>Case study</strong></a> — proof triển khai thực tế</li>\n`
    : "";
  return `
<section id="silo-nganh" class="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
<h2 class="text-lg font-bold text-indigo-950">Liên kết silo ngành</h2>
<p class="mt-2 text-sm text-slate-600">Bài ${label} — liên kết hub, money page, landing dịch vụ và portfolio proof.</p>
<ul class="mt-3 space-y-2 text-sm">
  <li><a href="${SITE}${cfg.hub}"><strong>Hub ngành</strong></a> — cluster SEO</li>
  <li><a href="${SITE}${cfg.money}"><strong>Money page</strong></a> — hướng dẫn thiết kế website</li>
  <li><a href="${SITE}${cfg.landing}"><strong>Landing dịch vụ</strong></a> — trang chuyển đổi</li>
${caseStudyLi}  <li><a href="${SITE}/blog/thiet-ke-website"><strong>Pillar thiết kế website</strong></a> — kiến thức A–Z</li>
  <li><a href="${SITE}/banggia"><strong>Báo giá thiết kế website</strong></a> — bảng giá tham khảo</li>
  <li><a href="${SITE}/du-an"><strong>Tất cả dự án</strong></a> — portfolio</li>
  <li><a href="${SITE}/website"><strong>Dịch vụ website</strong></a> — tư vấn &amp; triển khai</li>
  <li><a href="${SITE}/lien-he"><strong>Liên hệ</strong></a> — nhận tư vấn miễn phí</li>
</ul>
</section>`;
}

/** @param {string} content @param {SiloConfig} cfg */
export function injectSiloLinks(content, cfg) {
  const block = siloBlock(cfg);
  if (content.includes('id="silo-nganh"')) {
    return content.replace(
      /<section id="silo-nganh"[\s\S]*?<\/section>/,
      block.trim(),
    );
  }
  if (content.includes("</article>")) {
    return content.replace("</article>", `${block}\n</article>`);
  }
  return `${content}\n${block}`;
}

export function getSiloConfigForSlug(slug) {
  return SILO_FIX_BY_SLUG[slug] ?? null;
}
