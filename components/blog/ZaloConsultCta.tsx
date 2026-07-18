import { ZALO_CONSULT_PATH, ZALO_CONSULT_URL } from "@/lib/blog-zalo-cta";

export function ZaloConsultCta({ className = "" }: { className?: string }) {
  return (
    <p
      className={`article-zalo-cta rounded-2xl border border-violet-400/25 bg-gradient-to-br from-amber-200/[0.06] to-violet-500/[0.08] p-5 text-sm leading-relaxed text-white/70 ${className}`}
    >
      <strong className="text-white">Liên hệ Zalo để được tư vấn online:</strong>
      <br />
      <a
        href={ZALO_CONSULT_URL}
        rel="noopener noreferrer"
        target="_blank"
        className="font-medium text-violet-300 underline underline-offset-2 hover:text-violet-200"
      >
        {ZALO_CONSULT_PATH}
      </a>
    </p>
  );
}
