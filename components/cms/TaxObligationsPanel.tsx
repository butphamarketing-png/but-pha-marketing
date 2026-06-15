"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/customer-records";

type TaxSettings = {
  entityType: string;
  companyName: string | null;
  companyTaxId: string | null;
  companyAddress: string | null;
  vatFilingPeriod: string;
  vatDefaultRate: number;
  citRate: number;
  quarterlyVatDueDay: number;
};

type VatSummary = {
  year: number;
  quarter: number;
  label: string;
  fromDate: string;
  toDate: string;
  dueDate: string;
  daysUntilDue: number;
  outputVat: number;
  revenueBeforeVat: number;
  invoiceTotalAmount: number;
  issuedInvoiceCount: number;
  draftInvoiceCount: number;
  cashReceiptsTotal: number;
  receiptCount: number;
  inputVat: number;
  vatPayable: number;
  byMonth: {
    month: number;
    label: string;
    outputVat: number;
    revenueBeforeVat: number;
    cashReceiptsTotal: number;
  }[];
  anomalies: string[];
};

type Deadline = {
  type: string;
  year: number;
  quarter: number;
  label: string;
  dueDate: string;
  daysUntil: number;
  status: string;
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function deadlineBadge(status: string, daysUntil: number) {
  if (status === "overdue") return { text: `Quá hạn ${Math.abs(daysUntil)} ngày`, cls: "bg-red-500/20 text-red-200 border-red-500/40" };
  if (status === "due_soon") return { text: `Còn ${daysUntil} ngày`, cls: "bg-amber-500/20 text-amber-100 border-amber-500/40" };
  return { text: `Còn ${daysUntil} ngày`, cls: "bg-emerald-500/20 text-emerald-100 border-emerald-500/40" };
}

export function TaxObligationsPanel() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [quarter, setQuarter] = useState(Math.ceil((now.getMonth() + 1) / 3));
  const [settings, setSettings] = useState<TaxSettings | null>(null);
  const [summary, setSummary] = useState<VatSummary | null>(null);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [settingsRes, summaryRes, deadlinesRes] = await Promise.all([
        fetch("/cms/api/tax/settings", { credentials: "include" }),
        fetch(`/cms/api/tax/vat-summary?year=${year}&quarter=${quarter}`, { credentials: "include" }),
        fetch(`/cms/api/tax/deadlines?year=${year}`, { credentials: "include" }),
      ]);
      if (!settingsRes.ok || !summaryRes.ok || !deadlinesRes.ok) {
        throw new Error("Không tải được dữ liệu thuế. Chạy npm run setup:cms-db nếu mới deploy.");
      }
      setSettings(await settingsRes.json());
      setSummary(await summaryRes.json());
      const dl = await deadlinesRes.json();
      setDeadlines(Array.isArray(dl.items) ? dl.items : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu thuế.");
    } finally {
      setLoading(false);
    }
  }, [year, quarter]);

  useEffect(() => {
    void load();
  }, [load]);

  const currentDeadline = useMemo(
    () => deadlines.find((d) => d.quarter === quarter && d.year === year) ?? null,
    [deadlines, quarter, year],
  );

  const saveSettings = async (patch: Partial<TaxSettings>) => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      const res = await fetch("/cms/api/tax/settings", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, ...patch }),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setSettings(await res.json());
    } catch {
      setError("Không lưu được cấu hình thuế.");
    } finally {
      setSavingSettings(false);
    }
  };

  const exportCsv = () => {
    window.open(`/cms/api/tax/vat-export?year=${year}&quarter=${quarter}`, "_blank");
  };

  if (loading && !summary) {
    return <div className="p-8 text-center text-gray-400">Đang tải trách nhiệm thuế…</div>;
  }

  const badge = currentDeadline
    ? deadlineBadge(currentDeadline.status, currentDeadline.daysUntil)
    : null;

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Trách nhiệm thuế</h1>
          <p className="mt-1 text-sm text-gray-400">
            TNHH · GTGT theo quý · Số liệu tham khảo trước khi nộp trên{" "}
            <a
              href="https://thuedientu.gdt.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-300 underline"
            >
              thuedientu.gdt.gov.vn
            </a>
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
            onClick={() => void load()}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/5"
          >
            Làm mới
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-200"
          >
            Cấu hình
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {settingsOpen && settings && (
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4 space-y-3">
          <h2 className="text-sm font-bold text-white">Thông tin công ty (But Pha TNHH)</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs text-gray-400">
              Tên công ty
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={settings.companyName ?? ""}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              MST công ty
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={settings.companyTaxId ?? ""}
                onChange={(e) => setSettings({ ...settings, companyTaxId: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400 sm:col-span-2">
              Địa chỉ
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={settings.companyAddress ?? ""}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={savingSettings}
            onClick={() => void saveSettings(settings)}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            {savingSettings ? "Đang lưu…" : "Lưu cấu hình"}
          </button>
        </div>
      )}

      {summary && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-xs font-bold uppercase text-orange-200/80">GTGT phải nộp (Q{summary.quarter})</p>
              <p className="mt-2 text-2xl font-bold text-orange-100">{formatVnd(summary.vatPayable)}</p>
              <p className="mt-1 text-xs text-orange-200/70">Đầu ra − đầu vào (P2: đầu vào)</p>
            </div>
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
              <p className="text-xs font-bold uppercase text-violet-200/80">VAT đầu ra</p>
              <p className="mt-2 text-2xl font-bold text-violet-100">{formatVnd(summary.outputVat)}</p>
              <p className="mt-1 text-xs text-violet-200/70">{summary.issuedInvoiceCount} HĐ đã xuất</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-xs font-bold uppercase text-emerald-200/80">Doanh thu trước VAT</p>
              <p className="mt-2 text-2xl font-bold text-emerald-100">{formatVnd(summary.revenueBeforeVat)}</p>
              <p className="mt-1 text-xs text-emerald-200/70">Từ HĐ issued</p>
            </div>
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
              <p className="text-xs font-bold uppercase text-sky-200/80">Thu tiền mặt (phiếu thu)</p>
              <p className="mt-2 text-2xl font-bold text-sky-100">{formatVnd(summary.cashReceiptsTotal)}</p>
              <p className="mt-1 text-xs text-sky-200/70">{summary.receiptCount} phiếu thu</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">
                Hạn nộp GTGT {summary.label}: {formatDate(summary.dueDate)}
              </p>
              {badge && (
                <span className={`mt-1 inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${badge.cls}`}>
                  {badge.text}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-200"
            >
              Xuất sổ HĐ bán ra (CSV)
            </button>
          </div>

          {summary.anomalies.length > 0 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <p className="text-xs font-bold uppercase text-amber-200">Cần rà soát trước khi chốt quý</p>
              <ul className="mt-2 list-inside list-disc text-sm text-amber-100">
                {summary.anomalies.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden">
            <div className="border-b border-white/10 px-4 py-3">
              <h2 className="text-sm font-bold text-white">Chi tiết theo tháng — {summary.label}</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase text-gray-400">
                  <th className="px-4 py-2">Tháng</th>
                  <th className="px-4 py-2 text-right">VAT đầu ra</th>
                  <th className="px-4 py-2 text-right">Trước VAT</th>
                  <th className="px-4 py-2 text-right">Phiếu thu</th>
                </tr>
              </thead>
              <tbody>
                {summary.byMonth.map((row) => (
                  <tr key={row.month} className="border-b border-white/5">
                    <td className="px-4 py-2 text-white">{row.label}</td>
                    <td className="px-4 py-2 text-right text-violet-200">{formatVnd(row.outputVat)}</td>
                    <td className="px-4 py-2 text-right text-emerald-200">{formatVnd(row.revenueBeforeVat)}</td>
                    <td className="px-4 py-2 text-right text-sky-200">{formatVnd(row.cashReceiptsTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
            <h2 className="text-sm font-bold text-white">Lịch hạn nộp {year}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {deadlines.map((d) => {
                const b = deadlineBadge(d.status, d.daysUntil);
                return (
                  <div
                    key={`${d.type}-${d.quarter}`}
                    className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{d.label}</p>
                      <p className="text-xs text-gray-400">Hạn: {formatDate(d.dueDate)}</p>
                    </div>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${b.cls}`}>{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <p className="text-xs text-gray-500">
        Giai đoạn 1: VAT đầu ra + phiếu thu. Giai đoạn 2 sẽ thêm VAT đầu vào (phiếu chi).{" "}
        <Link href="/cms/khachhang" className="text-violet-300 underline">
          Quản lý KH
        </Link>{" "}
        ·{" "}
        <Link href="/cms" className="text-violet-300 underline">
          CMS Dashboard
        </Link>
      </p>
    </div>
  );
}
