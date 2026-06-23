import { SITE } from "./seo-wp-structure.mjs";

/** Quy tắc nhóm bài cluster theo pillar — filter nhận slug. */
export const PILLAR_CLUSTER_RULES = {
  "seo-la-gi": [
    { label: "SEO website & on-page", filter: (s) => (s.startsWith("seo-") || s.includes("audit-seo")) && !s.includes("local") && !s.includes("google-maps") && !s.endsWith("-la-gi") },
    { label: "SEO local & Maps", filter: (s) => s.startsWith("seo-local") || s.includes("google-maps") || s.startsWith("toi-uu-google") || s.startsWith("dua-") },
    { label: "Chi phí & báo giá SEO", filter: (s) => s.includes("bao-gia-seo") || s.includes("chi-phi-seo") },
  ],
  "marketing-online-la-gi": [
    { label: "Marketing theo ngành", filter: (s) => s.startsWith("marketing-") && !s.endsWith("-la-gi") },
    { label: "Chiến lược & agency", filter: (s) => s.includes("agency") || s.includes("tron-goi") || s.includes("in-house") },
    { label: "Tư vấn & báo giá", filter: (s) => s.includes("tu-van") || s.includes("bao-gia-marketing") || s.includes("chi-phi-agency") },
  ],
  "google-ads-la-gi": [
    { label: "Google Ads & quảng cáo", filter: (s) => s.includes("google-ads") || s.includes("quang-cao-google") },
    { label: "So sánh kênh ads", filter: (s) => s.includes("-hay-") && (s.includes("ads") || s.includes("google")) },
    { label: "Báo giá ads", filter: (s) => s.includes("bao-gia-google") || s.includes("chi-phi") && s.includes("ads") },
  ],
  "seo-google-maps-la-gi": [
    { label: "SEO local theo ngành", filter: (s) => s.startsWith("seo-local-") || s.startsWith("seo-google-maps-") },
    { label: "Tối ưu & đưa lên Maps", filter: (s) => s.startsWith("toi-uu-google") || s.startsWith("dua-") },
    { label: "Maps theo tỉnh/thành", filter: (s) => s.includes("seo-local-") && !s.includes("tiem") && !s.includes("quan") && !s.includes("phong") },
  ],
  "quang-cao-facebook": [
    { label: "Facebook Ads theo ngành", filter: (s) => s.startsWith("quang-cao-facebook-") },
    { label: "Tối ưu & hiệu quả", filter: (s) => s.includes("quang-cao-facebook") && (s.includes("hieu-qua") || s.includes("toi-uu") || s.includes("ban-hang")) },
    { label: "Báo giá Facebook Ads", filter: (s) => s.includes("bao-gia") && s.includes("facebook") },
  ],
  "thiet-ke-fanpage-facebook": [
    { label: "Thiết kế & setup fanpage", filter: (s) => s.includes("fanpage") || s.includes("thiet-ke-fanpage") },
    { label: "Content fanpage", filter: (s) => s.includes("content") && s.includes("fanpage") },
    { label: "Chăm sóc fanpage", filter: (s) => s.startsWith("cham-soc") || s.includes("bao-gia-cham-soc-fanpage") },
  ],
  "cham-soc-fanpage": [
    { label: "Gói chăm sóc & content", filter: (s) => s.includes("cham-soc") || s.includes("content-fanpage") },
    { label: "Quảng cáo từ fanpage", filter: (s) => s.startsWith("quang-cao-facebook") },
    { label: "Báo giá fanpage", filter: (s) => s.includes("bao-gia") && s.includes("fanpage") },
  ],
  "tu-van-marketing-mien-phi": [
    { label: "Tư vấn marketing", filter: (s) => s.includes("tu-van") && s.includes("marketing") },
    { label: "Marketing tổng thể", filter: (s) => s.startsWith("marketing-") && !s.endsWith("-la-gi") },
    { label: "Agency & trọn gói", filter: (s) => s.includes("agency") || s.includes("tron-goi") },
  ],
  "thiet-ke-website": [
    { label: "Thiết kế website theo ngành", filter: (s) => s.startsWith("thiet-ke-website-") && !s.match(/-(tphcm|ha-noi|da-nang|can-tho)$/) },
    { label: "Website theo tỉnh/thành", filter: (s) => s.startsWith("thiet-ke-website-") && s.match(/-(tphcm|ha-noi|da-nang|can-tho|dong-nai|vung-tau|hue|long-an|bac-ninh)$/) },
    { label: "Báo giá & chi phí website", filter: (s) => s.includes("bao-gia") && s.includes("website") },
  ],
  "bao-gia-thiet-ke-website": [
    { label: "Báo giá thiết kế website", filter: (s) => s.startsWith("bao-gia-thiet-ke-website") || s.startsWith("bao-gia-website") },
    { label: "Chi phí làm website", filter: (s) => s.includes("chi-phi") && s.includes("website") },
    { label: "Website theo ngành", filter: (s) => s.startsWith("thiet-ke-website-") },
  ],
};

const MAX_PER_GROUP = 12;

/**
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} pillarSlug
 */
export async function fetchClusterGroupsForPillar(supabase, pillarSlug) {
  const rules = PILLAR_CLUSTER_RULES[pillarSlug];
  if (!rules) return [];

  const { data, error } = await supabase
    .from("news")
    .select("slug,title")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug");

  if (error) throw new Error(error.message);

  const rows = (data || []).filter((r) => r.slug !== pillarSlug);
  const used = new Set();

  return rules
    .map((rule) => {
      const items = rows
        .filter((r) => !used.has(r.slug) && rule.filter(r.slug))
        .slice(0, MAX_PER_GROUP);
      for (const item of items) used.add(item.slug);
      return { label: rule.label, items };
    })
    .filter((g) => g.items.length > 0);
}

export function buildClusterIndexHtml(pillarKeyword, groups) {
  if (!groups?.length) return "";

  const sections = groups
    .map((group) => {
      const lis = group.items
        .map(
          (item) =>
            `<li><a href="${SITE}/blog/${item.slug}">${item.title}</a></li>`,
        )
        .join("\n");
      return `<div class="mb-6 last:mb-0"><h3 class="text-base font-bold text-indigo-950">${group.label}</h3><ul class="mt-2 list-disc space-y-1 pl-5 text-sm">${lis}</ul></div>`;
    })
    .join("\n");

  return `<section id="bai-cluster" class="article-cluster-index my-10 rounded-2xl border border-violet-200 bg-violet-50/30 p-6 md:p-8"><h2>Bài viết chi tiết về ${pillarKeyword}</h2><p class="mt-2 text-slate-700">Các bài dưới đây đi sâu theo ngành, địa phương, báo giá và tình huống thực tế — liên kết về bài pillar <strong>${pillarKeyword}</strong> để nắm nền tảng trước.</p>${sections}</section>`;
}

export function injectBeforeSection(content, html, patterns) {
  for (const pattern of patterns) {
    const match = String(content).match(pattern);
    if (match?.index != null) {
      return `${content.slice(0, match.index)}\n${html}\n${content.slice(match.index)}`;
    }
  }
  return `${String(content).trimEnd()}\n\n${html}`;
}
