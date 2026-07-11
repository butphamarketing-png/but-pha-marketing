export const ZALO_CONSULT_URL = "https://zalo.me/0937417982";
export const ZALO_CONSULT_PATH = "zalo.me/0937417982";

export function hasZaloConsultBlock(html: string): boolean {
  return html.includes("Liên hệ Zalo để được tư vấn online") && html.includes(ZALO_CONSULT_PATH);
}

export function zaloConsultBlockHtml(): string {
  return `<p class="article-zalo-cta my-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-sm leading-relaxed text-slate-800"><strong>Liên hệ Zalo để được tư vấn online:</strong><br /><a href="${ZALO_CONSULT_URL}" rel="noopener noreferrer" target="_blank">${ZALO_CONSULT_PATH}</a></p>`;
}

export function appendZaloConsultBlock(html: string): string {
  if (hasZaloConsultBlock(html)) return html;
  return `${html.trim()}\n${zaloConsultBlockHtml()}`;
}

const OLD_ZALO_PATTERNS = [
  /<p[^>]*>Liên hệ nhanh qua[\s\S]*?<\/p>/gi,
  /<p[^>]*class="article-internal-links"[^>]*>Liên hệ nhanh:[\s\S]*?<\/p>/gi,
  /<p[^>]*>Liên hệ nhanh:[\s\S]*?<\/p>/gi,
];

export function ensureZaloConsultBlock(html: string): string {
  if (hasZaloConsultBlock(html)) return html;
  let body = html;
  for (const pattern of OLD_ZALO_PATTERNS) {
    body = body.replace(pattern, "");
  }
  return appendZaloConsultBlock(body.trim());
}
