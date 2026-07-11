import { ZALO_CONSULT_PATH, ZALO_CONSULT_URL } from "@/lib/blog-zalo-cta";

export function ZaloConsultCta({ className = "" }: { className?: string }) {
  return (
    <p
      className={`article-zalo-cta rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-sm leading-relaxed text-slate-800 ${className}`}
    >
      <strong>Liên hệ Zalo để được tư vấn online:</strong>
      <br />
      <a href={ZALO_CONSULT_URL} rel="noopener noreferrer" target="_blank" className="font-semibold text-violet-700 underline">
        {ZALO_CONSULT_PATH}
      </a>
    </p>
  );
}
