"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Plus,
  Save,
  Trash2,
  RefreshCw,
  MessageCircle,
  Bell,
  ExternalLink,
} from "lucide-react";
import {
  CUSTOMER_PLATFORMS,
  buildRenewalMessage,
  buildZaloRenewalUrl,
  createEmptyCustomer,
  daysUntilExpiry,
  formatVnd,
  type CustomerRecord,
} from "@/lib/customer-records";

type ServiceOption = { id: number; platform: string; name: string };

const cellInput =
  "w-full min-w-[120px] rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-primary";

export function CustomerManagement() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dirtyRef = useRef(false);

  const dueReminders = useMemo(
    () =>
      customers.filter((c) => {
        const days = daysUntilExpiry(c.expiresAt);
        return c.renewalReminderEnabled && days !== null && days <= 3 && days >= 0;
      }),
    [customers],
  );

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/customers", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setSaveError(data?.error || "Không tải được danh sách khách hàng.");
        return;
      }
      setCustomers(Array.isArray(data.customers) ? data.customers : []);
      dirtyRef.current = false;
    } catch {
      setSaveError("Không thể kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json().catch(() => []);
      const list = Array.isArray(data) ? data : [];
      setServices(
        list.map((item: Record<string, unknown>) => ({
          id: Number(item.id) || 0,
          platform: String(item.platform || ""),
          name: String(item.name || ""),
        })),
      );
    } catch {
      setServices([]);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store", credentials: "include" });
        const data = await res.json().catch(() => null);
        if (mounted && data?.authenticated) {
          setAuthenticated(true);
          await Promise.all([loadCustomers(), loadServices()]);
        }
      } finally {
        if (mounted) setIsAuthChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [loadCustomers, loadServices]);

  const saveAll = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const res = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ customers }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setSaveError(data?.error || "Lưu thất bại.");
        return;
      }
      setCustomers(Array.isArray(data.customers) ? data.customers : customers);
      dirtyRef.current = false;
      setSaveMessage("Đã lưu danh sách khách hàng.");
    } catch {
      setSaveError("Không thể lưu dữ liệu.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!authenticated || !dirtyRef.current) return;
    const timer = window.setTimeout(() => {
      void saveAll();
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [customers, authenticated]);

  const updateRow = (id: string, patch: Partial<CustomerRecord>) => {
    dirtyRef.current = true;
    setCustomers((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch, updatedAt: new Date().toISOString() } : row)),
    );
  };

  const addRow = () => {
    dirtyRef.current = true;
    setCustomers((prev) => [createEmptyCustomer(), ...prev]);
  };

  const removeRow = (id: string) => {
    if (!confirm("Xóa dòng khách hàng này?")) return;
    dirtyRef.current = true;
    setCustomers((prev) => prev.filter((row) => row.id !== id));
  };

  const openZaloReminder = (customer: CustomerRecord) => {
    if (!customer.phone.trim()) {
      alert("Nhập số liên hệ trước khi nhắc Zalo.");
      return;
    }
    const message = buildRenewalMessage(customer);
    window.open(buildZaloRenewalUrl(customer.phone, message), "_blank", "noopener,noreferrer");
    updateRow(customer.id, { lastRenewalReminderAt: new Date().toISOString() });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.authenticated) {
        setLoginError(data?.error || "Mật khẩu không đúng");
        return;
      }
      setAuthenticated(true);
      setPassword("");
      await Promise.all([loadCustomers(), loadServices()]);
    } catch {
      setLoginError("Không thể đăng nhập.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } finally {
      setAuthenticated(false);
      setCustomers([]);
    }
  };

  const serviceOptionsForPlatform = (platform: string) =>
    services.filter((s) => s.platform === platform).map((s) => s.name);

  if (isAuthChecking) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0b0f19]" />;
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827] p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-bold text-white">Quản lý khách hàng</p>
              <p className="text-xs text-gray-400">Đăng nhập bằng mật khẩu admin</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError("");
              }}
              placeholder="Mật khẩu admin"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
            />
            {loginError && <p className="text-xs text-red-400">{loginError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-500"
            >
              Đăng nhập
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f19]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-black sm:text-xl">Quản lý khách hàng</h1>
            <p className="text-xs text-gray-400">Nhập dữ liệu như bảng Excel — tự lưu sau vài giây</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void loadCustomers()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Làm mới
            </button>
            <button
              type="button"
              onClick={() => void saveAll()}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold hover:bg-violet-500 disabled:opacity-60"
            >
              <Save size={14} /> {isSaving ? "Đang lưu..." : "Lưu ngay"}
            </button>
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20"
            >
              <Plus size={14} /> Thêm dòng
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300"
            >
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </div>
        {(saveMessage || saveError) && (
          <div className={`mx-auto max-w-[1600px] px-4 pb-3 text-xs sm:px-6 ${saveError ? "text-red-400" : "text-emerald-400"}`}>
            {saveError || saveMessage}
          </div>
        )}
        {dueReminders.length > 0 && (
          <div className="mx-auto max-w-[1600px] px-4 pb-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
              <Bell size={14} />
              <span>
                <strong>{dueReminders.length}</strong> khách sắp hết hạn (≤ 3 ngày). Hệ thống tự nhắc Zalo lúc còn đúng 3
                ngày (cron hàng ngày).
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]">
          <table className="min-w-[1400px] w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="px-2 py-3 w-12 text-center">STT</th>
                <th className="px-2 py-3 min-w-[140px]">Họ và Tên</th>
                <th className="px-2 py-3 min-w-[120px]">Số liên hệ</th>
                <th className="px-2 py-3 min-w-[220px]">Dịch vụ đăng ký</th>
                <th className="px-2 py-3 min-w-[130px]">Ngày đăng ký</th>
                <th className="px-2 py-3 min-w-[150px]">Ngày hết hạn</th>
                <th className="px-2 py-3 min-w-[160px]">Link nền tảng</th>
                <th className="px-2 py-3 min-w-[110px]">Số tiền</th>
                <th className="px-2 py-3 min-w-[100px] text-center">Nhắc gia hạn</th>
                <th className="px-2 py-3 w-24 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                    Chưa có khách hàng. Bấm &quot;Thêm dòng&quot; để bắt đầu nhập.
                  </td>
                </tr>
              ) : (
                customers.map((row, index) => {
                  const daysLeft = daysUntilExpiry(row.expiresAt);
                  const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
                  const platformServices = serviceOptionsForPlatform(row.platform);

                  return (
                    <tr
                      key={row.id}
                      className={isUrgent && row.renewalReminderEnabled ? "bg-amber-500/5" : "hover:bg-white/[0.02]"}
                    >
                      <td className="px-2 py-2 text-center font-mono text-gray-400">{index + 1}</td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.fullName}
                          onChange={(e) => updateRow(row.id, { fullName: e.target.value })}
                          placeholder="Họ và tên"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.phone}
                          onChange={(e) => updateRow(row.id, { phone: e.target.value })}
                          placeholder="09xx xxx xxx"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1.5">
                          <select
                            className={cellInput}
                            value={row.platform}
                            onChange={(e) => updateRow(row.id, { platform: e.target.value, service: "" })}
                          >
                            {CUSTOMER_PLATFORMS.map((p) => (
                              <option key={p.key} value={p.key}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                          <select
                            className={cellInput}
                            value={platformServices.includes(row.service) ? row.service : ""}
                            onChange={(e) => updateRow(row.id, { service: e.target.value })}
                          >
                            <option value="">— Chọn dịch vụ —</option>
                            {platformServices.map((name) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                          <input
                            className={cellInput}
                            value={row.service}
                            onChange={(e) => updateRow(row.id, { service: e.target.value })}
                            placeholder="Hoặc nhập dịch vụ (VD: Viết bài FB 15 ngày)"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="date"
                          className={cellInput}
                          value={row.registeredAt || ""}
                          onChange={(e) => updateRow(row.id, { registeredAt: e.target.value || null })}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1">
                          <input
                            type="date"
                            className={cellInput}
                            value={row.expiresAt || ""}
                            onChange={(e) => updateRow(row.id, { expiresAt: e.target.value || null })}
                          />
                          <button
                            type="button"
                            onClick={() => updateRow(row.id, { expiresAt: null })}
                            className={`rounded-md border px-2 py-1 text-[10px] font-bold ${
                              row.expiresAt
                                ? "border-white/10 text-gray-400 hover:bg-white/5"
                                : "border-violet-500/40 bg-violet-500/20 text-violet-200"
                            }`}
                          >
                            Không có
                          </button>
                          {daysLeft !== null && (
                            <span
                              className={`text-[10px] ${isUrgent ? "font-bold text-amber-400" : "text-gray-500"}`}
                            >
                              Còn {daysLeft} ngày
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex gap-1">
                          <input
                            className={cellInput}
                            value={row.platformLink}
                            onChange={(e) => updateRow(row.id, { platformLink: e.target.value })}
                            placeholder="https://..."
                          />
                          {row.platformLink.trim() && (
                            <a
                              href={row.platformLink}
                              target="_blank"
                              rel="noreferrer"
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-gray-400 hover:text-white"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min={0}
                          className={cellInput}
                          value={row.amount || ""}
                          onChange={(e) => updateRow(row.id, { amount: Number(e.target.value) || 0 })}
                          placeholder="0"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">{formatVnd(row.amount)}</p>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <label className="inline-flex cursor-pointer flex-col items-center gap-1">
                          <input
                            type="checkbox"
                            checked={row.renewalReminderEnabled}
                            onChange={(e) => updateRow(row.id, { renewalReminderEnabled: e.target.checked })}
                            className="h-4 w-4 rounded border-white/20"
                          />
                          <span className="text-[10px] text-gray-500">T-3 ngày</span>
                        </label>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            title="Nhắc Zalo ngay"
                            onClick={() => openZaloReminder(row)}
                            className="rounded-md border border-sky-500/30 bg-sky-500/10 p-1.5 text-sky-300 hover:bg-sky-500/20"
                          >
                            <MessageCircle size={14} />
                          </button>
                          <button
                            type="button"
                            title="Xóa dòng"
                            onClick={() => removeRow(row.id)}
                            className="rounded-md border border-red-500/30 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11px] text-gray-500">
          Cột &quot;Nhắc gia hạn&quot;: cron chạy mỗi ngày lúc 8:00, tự gửi nhắc khi còn đúng 3 ngày (cần cấu hình Zalo OA
          hoặc webhook). Nút chat mở Zalo với nội dung nhắc sẵn.
        </p>
      </main>
    </div>
  );
}
