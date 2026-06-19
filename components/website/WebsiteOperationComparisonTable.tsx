"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import {
  WEBSITE_OPERATION_COMPARE_PACKAGES,
  WEBSITE_OPERATION_COMPARE_ROWS,
  type WebsiteOperationCompareCell,
} from "@/lib/website-operation-comparison";
import { WEBSITE_OPERATION_TIER_META } from "@/lib/service-pricing";

function CompareCell({ value }: { value: WebsiteOperationCompareCell }) {
  if (value === "yes") {
    return <Check className="mx-auto h-4 w-4 text-emerald-600" strokeWidth={3} />;
  }
  if (value === "no") {
    return <X className="mx-auto h-4 w-4 text-slate-300" strokeWidth={2.5} />;
  }
  return <span className="text-xs font-semibold leading-snug text-slate-700">{value}</span>;
}

const MOBILE_GROUPS = [
  { key: "yeu" as const, label: "Khởi đầu", indices: [0, 1, 2] },
  { key: "vua" as const, label: "Tăng trưởng", indices: [3, 4, 5] },
  { key: "manh" as const, label: "Doanh nghiệp", indices: [6, 7, 8] },
];

export function WebsiteOperationComparisonTable() {
  const [mobileGroup, setMobileGroup] = useState<(typeof MOBILE_GROUPS)[number]["key"]>("yeu");
  const activeGroup = MOBILE_GROUPS.find((g) => g.key === mobileGroup)!;
  const activeMeta = WEBSITE_OPERATION_TIER_META[mobileGroup];

  return (
    <div className="space-y-4">
      {/* Desktop: full matrix */}
      <div className="brand-card hidden overflow-hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-indigo-100 bg-indigo-50/60">
                <th className="sticky left-0 z-10 min-w-[9rem] bg-indigo-50/95 px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Tiêu chí
                </th>
                {WEBSITE_OPERATION_COMPARE_PACKAGES.map((name) => (
                  <th
                    key={name}
                    className="min-w-[5.5rem] px-2 py-4 text-center text-[11px] font-bold leading-tight text-indigo-950"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEBSITE_OPERATION_COMPARE_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-indigo-50 hover:bg-indigo-50/30">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3.5">
                    <div className="text-sm font-semibold text-indigo-950">{row.label}</div>
                    {row.hint && <div className="mt-0.5 text-[10px] text-slate-400">{row.hint}</div>}
                  </td>
                  {row.values.map((value, idx) => (
                    <td key={`${row.label}-${idx}`} className="px-2 py-3.5 text-center align-middle">
                      <CompareCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: 3 gói / nhóm */}
      <div className="space-y-4 lg:hidden">
        <div className="flex gap-2">
          {MOBILE_GROUPS.map((group) => {
            const meta = WEBSITE_OPERATION_TIER_META[group.key];
            const active = mobileGroup === group.key;
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setMobileGroup(group.key)}
                className="flex-1 rounded-xl border px-2 py-2.5 text-xs font-bold transition"
                style={
                  active
                    ? { borderColor: meta.color, backgroundColor: `${meta.color}12`, color: meta.color }
                    : { borderColor: "rgba(99,102,241,0.15)", color: "#475569" }
                }
              >
                {group.label}
              </button>
            );
          })}
        </div>

        <div className="brand-card overflow-hidden">
          <div
            className="border-b border-indigo-100 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide"
            style={{ color: activeMeta.color }}
          >
            {activeMeta.label}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem]">
              <thead>
                <tr className="border-b border-indigo-100 bg-indigo-50/50">
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500">Tiêu chí</th>
                  {activeGroup.indices.map((idx) => (
                    <th
                      key={WEBSITE_OPERATION_COMPARE_PACKAGES[idx]}
                      className="px-2 py-3 text-center text-[11px] font-bold text-indigo-950"
                    >
                      {WEBSITE_OPERATION_COMPARE_PACKAGES[idx]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEBSITE_OPERATION_COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-indigo-50">
                    <td className="px-4 py-3 text-sm font-semibold text-indigo-950">{row.label}</td>
                    {activeGroup.indices.map((idx) => (
                      <td key={`${row.label}-m-${idx}`} className="px-2 py-3 text-center align-middle">
                        <CompareCell value={row.values[idx]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] leading-relaxed text-slate-400">
        Mức ⭐ thể hiện mức tối ưu theo gói, không cam kết điểm PageSpeed cố định. Thời gian xử lý sự cố là mục tiêu phản hồi ban đầu trong giờ hành chính, trừ gói VIP 24/7.
      </p>
    </div>
  );
}
