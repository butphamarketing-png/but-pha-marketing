"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/customer-records";

type EInvoiceSummary = {
  year: number;
  quarter: number;
  label: string;
  issuedWithVat: number;
  pendingEInvoice: number;
  registeredEInvoice: number;
  notApplicable: number;
  portalUrl: string;
  defaultSymbol: string | null;
  defaultTemplateCode: string | null;
};

type QueueItem = {
  id: number;
  code: string;
  buyerName: string;
  taxId: string | null;
  buyerAddress: string | null;
  issueDate: string;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  lineDescription: string;
  readiness: { ready: boolean; blockers: string[]; warnings: string[] };
};

type EInvoiceSettings = {
  eInvoiceTemplateCode: string | null;
  eInvoiceSymbol: string | null;
  eInvoicePortalUrl: string | null;
};

const emptyRegister = {
  eInvoiceSymbol: "",
  eInvoiceNumber: "",
  eInvoiceLookupCode: "",
  eInvoiceLookupUrl: "",
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function EInvoicePanel() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [quarter, setQuarter] = useState(Math.ceil((now.getMonth() + 1) / 3));
  const [summary, setSummary] = useState<EInvoiceSummary | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [settings, setSettings] = useState<EInvoiceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [registerId, setRegisterId] = useState<number | null>(null);
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [savingRegister, setSavingRegister] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, queueRes, settingsRes] = await Promise.all([
        fetch(`/cms/api/einvoice/summary?year=${year}&quarter=${quarter}`, { credentials: "include" }),
        fetch(`/cms/api/einvoice/queue?year=${year}&quarter=${quarter}`, { credentials: "include" }),
        fetch("/cms/api/tax/settings", { credentials: "include" }),
      ]);
      if (!summaryRes.ok || !queueRes.ok) {
        throw new Error("Không tải được HĐĐT. Chạy npm run setup:cms-db nếu mới deploy.");
      }
      setSummary(await summaryRes.json());
      const q = await queueRes.json();
      setQueue(Array.isArray(q.data) ? q.data : []);
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        setSettings({
          eInvoiceTemplateCode: s.eInvoiceTemplateCode ?? null,
          eInvoiceSymbol: s.eInvoiceSymbol ?? null,
          eInvoicePortalUrl: s.eInvoicePortalUrl ?? null,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [year, quarter]);

  useEffect(() => {
    void load();
  }, [load]);

  const openRegister = (item: QueueItem) => {
    setRegisterId(item.id);
    setRegisterForm({
      eInvoiceSymbol: summary?.defaultSymbol ?? "",
      eInvoiceNumber: "",
      eInvoiceLookupCode: "",
      eInvoiceLookupUrl: "",
    });
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      const res = await fetch("/cms/api/einvoice/settings", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      const updated = await res.json();
      setSettings({
        eInvoiceTemplateCode: updated.eInvoiceTemplateCode ?? null,
        eInvoiceSymbol: updated.eInvoiceSymbol ?? null,
        eInvoicePortalUrl: updated.eInvoicePortalUrl ?? null,
      });
      setSettingsOpen(false);
      void load();
    } catch {
      setError("Không lưu được cấu hình HĐĐT.");
    } finally {
      setSavingSettings(false);
    }
  };

  const submitRegister = async () => {
    if (!registerId) return;
    setSavingRegister(true);
    setError(null);
    try {
      const res = await fetch(`/cms/api/einvoice/invoices/${registerId}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Ghi nhận thất bại");
      }
      setRegisterId(null);
      void load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không ghi nhận được HĐĐT.");
    } finally {
      setSavingRegister(false);
    }
  };

  const exportCsv = () => {
    window.open(`/cms/api/einvoice/export?year=${year}&quarter=${quarter}`, "_blank");
  };

  if (loading && !summary) {
    return <div className="p-8 text-center text-gray-400">Đang tải HĐĐT…</div>;
  }

  const portalUrl = summary?.portalUrl ?? "https://hoadondientu.gdt.gov.vn";

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Hóa đơn điện tử (HĐĐT)</h1>
          <p className="mt-1 text-sm text-gray-400">
            Ghi nhận HĐĐT sau khi phát hành trên cổng CQT — không tự động nộp.{" "}
            <Link href="/cms/tax" className="text-violet-300 underline">
              ← Trách nhiệm thuế
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
              <option key={y} value={y}>
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
              <option key={q} value={q}>
                Q{q}
              </option>
            ))}
          </select>
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-200"
          >
            Mở cổng HĐĐT ↗
          </a>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200"
          >
            Xuất CSV
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-200"
          >
            Cấu hình mẫu
          </button>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300"
          >
            Làm mới
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
          <h2 className="text-sm font-bold text-white">Mẫu HĐĐT mặc định</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs text-gray-400">
              Mã mẫu (template)
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="VD: 1/001"
                value={settings.eInvoiceTemplateCode ?? ""}
                onChange={(e) => setSettings({ ...settings, eInvoiceTemplateCode: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Ký hiệu HĐ
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="VD: C26TBP"
                value={settings.eInvoiceSymbol ?? ""}
                onChange={(e) => setSettings({ ...settings, eInvoiceSymbol: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400 sm:col-span-2">
              URL cổng tra cứu
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="https://hoadondientu.gdt.gov.vn"
                value={settings.eInvoicePortalUrl ?? ""}
                onChange={(e) => setSettings({ ...settings, eInvoicePortalUrl: e.target.value })}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={savingSettings}
            onClick={() => void saveSettings()}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            {savingSettings ? "Đang lưu…" : "Lưu cấu hình"}
          </button>
        </div>
      )}

      {summary && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
            <p className="text-xs font-bold uppercase text-cyan-200/80">Chờ phát hành HĐĐT</p>
            <p className="mt-2 text-2xl font-bold text-cyan-100">{summary.pendingEInvoice}</p>
            <p className="mt-1 text-xs text-cyan-200/70">{summary.label}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-xs font-bold uppercase text-emerald-200/80">Đã ghi nhận HĐĐT</p>
            <p className="mt-2 text-2xl font-bold text-emerald-100">{summary.registeredEInvoice}</p>
            <p className="mt-1 text-xs text-emerald-200/70">Đã nhập số trên cổng</p>
          </div>
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
            <p className="text-xs font-bold uppercase text-violet-200/80">HĐ có VAT (issued)</p>
            <p className="mt-2 text-2xl font-bold text-violet-100">{summary.issuedWithVat}</p>
            <p className="mt-1 text-xs text-violet-200/70">Trong kỳ quý</p>
          </div>
          <div className="rounded-xl border border-gray-500/30 bg-gray-500/10 p-4">
            <p className="text-xs font-bold uppercase text-gray-300/80">Không áp dụng HĐĐT</p>
            <p className="mt-2 text-2xl font-bold text-gray-100">{summary.notApplicable}</p>
            <p className="mt-1 text-xs text-gray-300/70">HĐ không VAT</p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-bold text-white">Hàng đợi phát hành HĐĐT</h2>
          <p className="mt-0.5 text-xs text-gray-400">
            Xuất hóa đơn nội bộ (issued) có VAT → phát hành trên cổng → ghi nhận số HĐĐT tại đây.
          </p>
        </div>
        {queue.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">Không có hóa đơn chờ HĐĐT trong kỳ.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-gray-400">
                  <th className="px-4 py-2">Mã</th>
                  <th className="px-4 py-2">Ngày</th>
                  <th className="px-4 py-2">Người mua</th>
                  <th className="px-4 py-2">MST</th>
                  <th className="px-4 py-2">Tổng</th>
                  <th className="px-4 py-2">Sẵn sàng</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 text-gray-200">
                    <td className="px-4 py-2 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-2">{formatDate(item.issueDate)}</td>
                    <td className="px-4 py-2">
                      <p>{item.buyerName}</p>
                      {item.lineDescription && (
                        <p className="text-xs text-gray-500">{item.lineDescription}</p>
                      )}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">{item.taxId ?? "—"}</td>
                    <td className="px-4 py-2">{formatVnd(item.totalAmount)}</td>
                    <td className="px-4 py-2">
                      {item.readiness.ready ? (
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-200">
                          Sẵn sàng
                        </span>
                      ) : (
                        <span
                          className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-200"
                          title={item.readiness.blockers.join("; ")}
                        >
                          Thiếu dữ liệu
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        disabled={!item.readiness.ready}
                        onClick={() => openRegister(item)}
                        className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40"
                      >
                        Ghi nhận HĐĐT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {registerId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111827] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Ghi nhận HĐĐT đã phát hành</h3>
            <p className="text-xs text-gray-400">
              Nhập thông tin sau khi phát hành trên{" "}
              <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">
                cổng HĐĐT
              </a>
              .
            </p>
            <label className="block text-xs text-gray-400">
              Ký hiệu
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={registerForm.eInvoiceSymbol}
                onChange={(e) => setRegisterForm({ ...registerForm, eInvoiceSymbol: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Số HĐĐT *
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={registerForm.eInvoiceNumber}
                onChange={(e) => setRegisterForm({ ...registerForm, eInvoiceNumber: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Mã tra cứu
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={registerForm.eInvoiceLookupCode}
                onChange={(e) => setRegisterForm({ ...registerForm, eInvoiceLookupCode: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              URL tra cứu
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={registerForm.eInvoiceLookupUrl}
                onChange={(e) => setRegisterForm({ ...registerForm, eInvoiceLookupUrl: e.target.value })}
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRegisterId(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={savingRegister || !registerForm.eInvoiceNumber.trim()}
                onClick={() => void submitRegister()}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {savingRegister ? "Đang lưu…" : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
