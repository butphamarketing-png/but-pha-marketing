"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/customer-records";

type CitSummary = {
  year: number;
  quarter: number;
  label: string;
  dueDate: string;
  daysUntilDue: number;
  citRate: number;
  revenueBeforeVat: number;
  operatingExpenses: number;
  contractorPayments: number;
  taxableIncome: number;
  citProvisional: number;
  cashReceiptsTotal: number;
  ytdTaxableIncome: number;
  ytdCitProvisional: number;
  anomalies: string[];
  note: string;
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function CitProvisionalPanel() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [quarter, setQuarter] = useState(Math.ceil((now.getMonth() + 1) / 3));
  const [summary, setSummary] = useState<CitSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/cms/api/tax/cit-summary?year=${year}&quarter=${quarter}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Không tải được TNDN tạm nộp.");
      setSummary(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [year, quarter]);

  useEffect(() => {
    void load();
  }, [load]);

  const exportCsv = () => {
    window.open(`/cms/api/tax/cit-export?year=${year}&quarter=${quarter}`, "_blank");
  };

  if (loading && !summary) {
    return <div className="p-8 text-center text-gray-400">Đang tải TNDN tạm nộp…</div>;
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">TNDN tạm nộp quý</h1>
          <p className="mt-1 text-sm text-gray-400">
            Ước tính thuế TNDN TNHH theo lợi nhuận tạm tính.{" "}
            <Link href="/cms/tax" className="text-violet-300 underline">
              ← GTGT quý
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y} className="bg-[#111827]">
                {y}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            value={quarter}
            onChange={(e) => setQuarter(Number(e.target.value))}
          >
            {[1, 2, 3, 4].map((q) => (
              <option key={q} value={q} className="bg-[#111827]">
                Q{q}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-200"
          >
            Xuất CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {summary && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 lg:col-span-2">
              <p className="text-xs font-bold uppercase text-indigo-200/80">
                TNDN tạm nộp ({summary.label}) · {summary.citRate}%
              </p>
              <p className="mt-2 text-3xl font-bold text-indigo-100">
                {formatVnd(summary.citProvisional)}
              </p>
              <p className="mt-1 text-xs text-indigo-200/70">
                Hạn: {formatDate(summary.dueDate)}
                {summary.daysUntilDue >= 0
                  ? ` · Còn ${summary.daysUntilDue} ngày`
                  : ` · Quá hạn ${Math.abs(summary.daysUntilDue)} ngày`}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-xs font-bold uppercase text-emerald-200/80">Lợi nhuận tạm tính</p>
              <p className="mt-2 text-2xl font-bold text-emerald-100">{formatVnd(summary.taxableIncome)}</p>
            </div>
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
              <p className="text-xs font-bold uppercase text-sky-200/80">Lũy kế TNDN tạm nộp</p>
              <p className="mt-2 text-2xl font-bold text-sky-100">{formatVnd(summary.ytdCitProvisional)}</p>
              <p className="mt-1 text-xs text-sky-200/70">LN lũy kế: {formatVnd(summary.ytdTaxableIncome)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
            <h2 className="text-sm font-bold text-white">Cách tính (tham khảo)</h2>
            <p className="mt-2 text-sm text-gray-400">{summary.note}</p>
            <table className="mt-4 w-full text-sm">
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-gray-300">Doanh thu trước VAT (HĐ issued)</td>
                  <td className="py-2 text-right text-emerald-200">{formatVnd(summary.revenueBeforeVat)}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-gray-300">− Chi phí hoạt động</td>
                  <td className="py-2 text-right text-rose-200">{formatVnd(summary.operatingExpenses)}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-gray-300">− Chi trả CTV (gross)</td>
                  <td className="py-2 text-right text-rose-200">{formatVnd(summary.contractorPayments)}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 font-medium text-white">= Lợi nhuận tạm tính</td>
                  <td className="py-2 text-right font-bold text-white">{formatVnd(summary.taxableIncome)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-300">× Thuế suất {summary.citRate}%</td>
                  <td className="py-2 text-right text-indigo-200">{formatVnd(summary.citProvisional)}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500">
              Phiếu thu tham khảo: {formatVnd(summary.cashReceiptsTotal)} (TNDN không tính theo tiền mặt thu).
            </p>
          </div>

          {summary.anomalies.length > 0 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <p className="text-xs font-bold uppercase text-amber-200">Cần rà soát</p>
              <ul className="mt-2 list-inside list-disc text-sm text-amber-100">
                {summary.anomalies.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
