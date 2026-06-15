"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatVnd } from "@/lib/customer-records";
import { computeContractorPit } from "@/lib/contractor-pit";

type Payment = {
  id: number;
  code: string;
  contractorName: string;
  contractorTaxId: string | null;
  serviceDescription: string;
  grossAmount: number;
  pitRate: number;
  pitAmount: number;
  netAmount: number;
  paymentDate: string;
  paymentMethod: string;
  notes: string | null;
};

type PitSummary = {
  year: number;
  quarter: number;
  label: string;
  totalGross: number;
  totalPitWithheld: number;
  totalNetPaid: number;
  paymentCount: number;
  byContractor: {
    contractorName: string;
    contractorTaxId: string | null;
    grossAmount: number;
    pitAmount: number;
    netAmount: number;
    paymentCount: number;
  }[];
};

const emptyForm = {
  contractorName: "",
  contractorTaxId: "",
  serviceDescription: "",
  grossAmount: "",
  pitRate: "10",
  paymentDate: new Date().toISOString().slice(0, 10),
  paymentMethod: "transfer",
  notes: "",
};

export function ContractorPitPanel() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [quarter, setQuarter] = useState(Math.ceil((now.getMonth() + 1) / 3));
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PitSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const preview = useMemo(() => {
    const gross = Number(form.grossAmount) || 0;
    return computeContractorPit({ grossAmount: gross, pitRate: Number(form.pitRate) || 10 });
  }, [form.grossAmount, form.pitRate]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = getQuarterRange(year, quarter);
      const [listRes, sumRes] = await Promise.all([
        fetch(`/cms/api/contractor-payments?fromDate=${q.from}&toDate=${q.to}&limit=100`, {
          credentials: "include",
        }),
        fetch(`/cms/api/tax/pit-summary?year=${year}&quarter=${quarter}`, { credentials: "include" }),
      ]);
      if (!listRes.ok || !sumRes.ok) {
        throw new Error("Không tải được dữ liệu TNCN CTV. Chạy npm run setup:cms-db.");
      }
      const list = await listRes.json();
      setPayments(Array.isArray(list.data) ? list.data : []);
      setSummary(await sumRes.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [year, quarter]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (p: Payment) => {
    setEditId(p.id);
    setForm({
      contractorName: p.contractorName,
      contractorTaxId: p.contractorTaxId ?? "",
      serviceDescription: p.serviceDescription,
      grossAmount: String(p.grossAmount),
      pitRate: String(p.pitRate),
      paymentDate: p.paymentDate,
      paymentMethod: p.paymentMethod,
      notes: p.notes ?? "",
    });
    setFormOpen(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        contractorName: form.contractorName.trim(),
        contractorTaxId: form.contractorTaxId.trim() || undefined,
        serviceDescription: form.serviceDescription.trim(),
        grossAmount: Number(form.grossAmount),
        pitRate: Number(form.pitRate) || 10,
        paymentDate: form.paymentDate,
        paymentMethod: form.paymentMethod,
        notes: form.notes.trim() || undefined,
      };
      const url = editId ? `/cms/api/contractor-payments/${editId}` : "/cms/api/contractor-payments";
      const res = await fetch(url, {
        method: editId ? "PATCH" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      setFormOpen(false);
      await load();
    } catch {
      setError("Không lưu được chi trả CTV.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Xóa chi trả CTV này?")) return;
    await fetch(`/cms/api/contractor-payments/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  };

  const exportCsv = () => {
    window.open(`/cms/api/tax/pit-export?year=${year}&quarter=${quarter}`, "_blank");
  };

  if (loading && !summary) {
    return <div className="p-8 text-center text-gray-400">Đang tải TNCN CTV…</div>;
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">TNCN khấu trừ CTV</h1>
          <p className="mt-1 text-sm text-gray-400">
            Khấu trừ 10% khi chi trả cộng tác viên cá nhân (dịch vụ).{" "}
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
            onClick={openCreate}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white"
          >
            + Chi trả CTV
          </button>
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
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-xs font-bold uppercase text-amber-200/80">TNCN phải nộp ({summary.label})</p>
            <p className="mt-2 text-2xl font-bold text-amber-100">{formatVnd(summary.totalPitWithheld)}</p>
            <p className="mt-1 text-xs text-amber-200/70">{summary.paymentCount} lần chi</p>
          </div>
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
            <p className="text-xs font-bold uppercase text-sky-200/80">Tổng chi trước thuế</p>
            <p className="mt-2 text-2xl font-bold text-sky-100">{formatVnd(summary.totalGross)}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-xs font-bold uppercase text-emerald-200/80">Thực chi CTV</p>
            <p className="mt-2 text-2xl font-bold text-emerald-100">{formatVnd(summary.totalNetPaid)}</p>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4 space-y-3">
          <h2 className="text-sm font-bold text-white">{editId ? "Sửa chi trả" : "Chi trả CTV mới"}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs text-gray-400">
              Tên CTV *
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.contractorName}
                onChange={(e) => setForm({ ...form, contractorName: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              CCCD / MST cá nhân
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.contractorTaxId}
                onChange={(e) => setForm({ ...form, contractorTaxId: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400 sm:col-span-2">
              Mô tả dịch vụ *
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.serviceDescription}
                onChange={(e) => setForm({ ...form, serviceDescription: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Tổng chi (VNĐ) *
              <input
                type="number"
                min={0}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.grossAmount}
                onChange={(e) => setForm({ ...form, grossAmount: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              TNCN %
              <input
                type="number"
                min={0}
                max={100}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.pitRate}
                onChange={(e) => setForm({ ...form, pitRate: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Ngày chi *
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.paymentDate}
                onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
              />
            </label>
            <label className="block text-xs text-gray-400">
              Hình thức
              <select
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              >
                <option value="transfer" className="bg-[#111827]">Chuyển khoản</option>
                <option value="cash" className="bg-[#111827]">Tiền mặt</option>
              </select>
            </label>
            <div className="sm:col-span-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              Khấu trừ: <strong>{formatVnd(preview.pitAmount)}</strong> · Thực chi:{" "}
              <strong>{formatVnd(preview.netAmount)}</strong>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              {saving ? "Đang lưu…" : "Lưu"}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-bold text-white">Chi trả trong {summary?.label ?? `Q${quarter}/${year}`}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase text-gray-400">
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Ngày</th>
              <th className="px-4 py-2">CTV</th>
              <th className="px-4 py-2 text-right">Tổng</th>
              <th className="px-4 py-2 text-right">TNCN</th>
              <th className="px-4 py-2 text-right">Thực chi</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Chưa có chi trả CTV trong quý này.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="px-4 py-2 text-white">{p.code}</td>
                  <td className="px-4 py-2 text-gray-300">{p.paymentDate}</td>
                  <td className="px-4 py-2 text-gray-300">{p.contractorName}</td>
                  <td className="px-4 py-2 text-right text-sky-200">{formatVnd(p.grossAmount)}</td>
                  <td className="px-4 py-2 text-right text-amber-200">{formatVnd(p.pitAmount)}</td>
                  <td className="px-4 py-2 text-right text-emerald-200">{formatVnd(p.netAmount)}</td>
                  <td className="px-4 py-2 text-right">
                    <button type="button" onClick={() => openEdit(p)} className="text-violet-300 text-xs mr-2">
                      Sửa
                    </button>
                    <button type="button" onClick={() => void remove(p.id)} className="text-red-400 text-xs">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {summary && summary.byContractor.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <h2 className="text-sm font-bold text-white">Tổng hợp theo CTV</h2>
          <div className="mt-3 space-y-2">
            {summary.byContractor.map((c) => (
              <div
                key={`${c.contractorName}-${c.contractorTaxId ?? ""}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-white">{c.contractorName}</p>
                  {c.contractorTaxId && <p className="text-xs text-gray-400">{c.contractorTaxId}</p>}
                </div>
                <p className="text-sm text-amber-200">
                  TNCN {formatVnd(c.pitAmount)} · {c.paymentCount} lần
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getQuarterRange(year: number, quarter: number) {
  const months: Record<number, [number, number, number]> = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12],
  };
  const m = months[quarter];
  const from = `${year}-${String(m[0]).padStart(2, "0")}-01`;
  const lastDay = new Date(year, m[2], 0).getDate();
  const to = `${year}-${String(m[2]).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}
