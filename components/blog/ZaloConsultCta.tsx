import { ZALO_CONSULT_PATH, ZALO_CONSULT_URL } from "@/lib/blog-zalo-cta";

export function ZaloConsultCta({ className = "" }: { className?: string }) {
  return (
    <p
      className={`article-zalo-cta rounded-md border border-white/10 bg-[#0e1018] p-4 text-sm leading-relaxed text-white/70 ${className}`}
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
