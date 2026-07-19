import Link from "next/link";
import { ZaloConsultCta } from "@/components/blog/ZaloConsultCta";

export function ServiceConversionFooter({ title = "Tư vấn & tài liệu liên quan" }: { title?: string }) {
  return (
    <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-white/45">
        Xem thêm hướng dẫn trên{" "}
        <Link href="/blog" className="font-medium text-white/70 underline underline-offset-2 hover:text-white">
          blog
        </Link>
        , case study tại{" "}
        <Link href="/du-an" className="font-medium text-white/70 underline underline-offset-2 hover:text-white">
          dự án tiêu biểu
        </Link>{" "}
        hoặc{" "}
        <Link href="/website" className="font-medium text-white/70 underline underline-offset-2 hover:text-white">
          xem dịch vụ thiết kế website
        </Link>
        .
      </p>
      <div className="mt-4">
        <ZaloConsultCta />
      </div>
    </section>
  );
}
