export const ZALO_CONSULT_URL = "https://zalo.me/0937417982";
export const ZALO_CONSULT_PATH = "zalo.me/0937417982";

const OLD_ZALO_PATTERNS = [
  /<p[^>]*>Liên hệ nhanh qua[\s\S]*?<\/p>/gi,
  /<p[^>]*class="article-internal-links"[^>]*>Liên hệ nhanh:[\s\S]*?<\/p>/gi,
  /<p[^>]*>Liên hệ nhanh:[\s\S]*?<\/p>/gi,
];

export function hasZaloConsultBlock(html = "") {
  const body = String(html);
  return body.includes("Liên hệ Zalo để được tư vấn online") && body.includes(ZALO_CONSULT_PATH);
}

export function zaloConsultBlock() {
  return `<p class="article-zalo-cta my-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-sm leading-relaxed text-slate-800"><strong>Liên hệ Zalo để được tư vấn online:</strong><br /><a href="${ZALO_CONSULT_URL}" rel="noopener noreferrer" target="_blank">${ZALO_CONSULT_PATH}</a></p>`;
}

export function appendZaloConsultBlock(html = "") {
  const body = String(html);
  if (hasZaloConsultBlock(body)) return body;
  return `${body.trim()}\n${zaloConsultBlock()}`;
}

export function ensureZaloConsultBlock(html = "") {
  let body = String(html);
  if (hasZaloConsultBlock(body)) return body;
  for (const pattern of OLD_ZALO_PATTERNS) {
    body = body.replace(pattern, "");
  }
  return appendZaloConsultBlock(body.trim());
}
