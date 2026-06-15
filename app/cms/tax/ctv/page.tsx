import Link from "next/link";
import { ContractorPitPanel } from "@/components/cms/ContractorPitPanel";

export const metadata = {
  title: "TNCN CTV | CMS",
  robots: { index: false, follow: false },
};

export default function CmsTaxCtvPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <div className="border-b border-white/10 bg-[#111827]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link
            href="/cms/tax"
            className="text-xs font-semibold text-violet-300 hover:text-violet-200 hover:underline"
          >
            ← Trách nhiệm thuế
          </Link>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-xs font-bold text-white">TNCN khấu trừ CTV</span>
        </div>
      </div>
      <ContractorPitPanel />
    </div>
  );
}
