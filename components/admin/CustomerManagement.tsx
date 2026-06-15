"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut,
  Plus,
  Save,
  Trash2,
  Copy,
  RefreshCw,
  MessageCircle,
  Bell,
  ExternalLink,
  History,
  Upload,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CUSTOMER_PLATFORMS,
  buildRenewalMessage,
  buildZaloRenewalUrl,
  createEmptyCustomer,
  daysUntilExpiry,
  formatVnd,
  type CustomerRecord,
} from "@/lib/customer-records";
import {
  downloadCustomerBackup,
  formatBackupTime,
  getUsableLocalBackup,
  hasMeaningfulCustomerData,
  isSampleCustomerData,
  loadLocalCustomerBackup,
  parseCustomerBackupFile,
  saveLocalCustomerBackup,
} from "@/lib/customer-backup";
import type { CmsAutoSyncOutcome } from "@/lib/cms-customer-auto-sync";
import type { CustomerErpSyncStatus } from "@/lib/cms-customer-sync-status";
import {
  countCustomersWithContractCode,
  describeCmsSyncOutcome,
  type CmsSyncDisplay,
} from "@/lib/cms-sync-status";

const cellInput =
  "w-full min-w-[120px] rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none focus:border-primary";

const modalFieldInput =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500";

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function CustomerDetailDialog({
  customer,
  rowIndex,
  open,
  onOpenChange,
  onUpdate,
  onDuplicate,
  onDelete,
  onZaloReminder,
}: {
  customer: CustomerRecord | null;
  rowIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (patch: Partial<CustomerRecord>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onZaloReminder: () => void;
}) {
  if (!customer) return null;

  const daysLeft = daysUntilExpiry(customer.expiresAt);
  const platformLabel =
    CUSTOMER_PLATFORMS.find((p) => p.key === customer.platform)?.label || customer.platform;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-white/10 bg-[#111827] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left text-white">Chi tiết khách hàng #{rowIndex + 1}</DialogTitle>
          <DialogDescription className="text-left text-gray-400">
            Chỉnh sửa thông tin theo chiều dọc — thay đổi được lưu tự động.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Họ và tên</span>
            <input
              className={modalFieldInput}
              value={customer.fullName}
              onChange={(e) => onUpdate({ fullName: e.target.value })}
              placeholder="Họ và tên khách hàng"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Ngành nghề</span>
            <input
              className={modalFieldInput}
              value={customer.industry || ""}
              onChange={(e) => onUpdate({ industry: e.target.value })}
              placeholder="VD: Nha khoa, Spa, TMĐT..."
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Tên cơ sở</span>
            <input
              className={modalFieldInput}
              value={customer.establishmentName || ""}
              onChange={(e) => onUpdate({ establishmentName: e.target.value })}
              placeholder="Tên phòng khám, cửa hàng..."
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Số liên hệ</span>
            <input
              className={modalFieldInput}
              value={customer.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="09xx xxx xxx"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Gmail</span>
            <input
              type="email"
              className={modalFieldInput}
              value={customer.email || ""}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="email@gmail.com"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Nền tảng</span>
            <select
              className={modalFieldInput}
              value={customer.platform}
              onChange={(e) => onUpdate({ platform: e.target.value as CustomerRecord["platform"] })}
            >
              {CUSTOMER_PLATFORMS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Dịch vụ đăng ký</span>
            <input
              className={modalFieldInput}
              value={customer.service}
              onChange={(e) => onUpdate({ service: e.target.value })}
              placeholder="VD: Viết bài FB 15 ngày, Xây dựng website..."
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Ngày đăng ký</span>
            <input
              type="date"
              className={modalFieldInput}
              value={customer.registeredAt || ""}
              onChange={(e) => onUpdate({ registeredAt: e.target.value || null })}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Ngày hết hạn</span>
            <input
              type="date"
              className={modalFieldInput}
              value={customer.expiresAt || ""}
              onChange={(e) => onUpdate({ expiresAt: e.target.value || null })}
            />
            <button
              type="button"
              onClick={() => onUpdate({ expiresAt: null })}
              className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                customer.expiresAt
                  ? "border-white/10 text-gray-400 hover:bg-white/5"
                  : "border-violet-500/40 bg-violet-500/20 text-violet-200"
              }`}
            >
              Không có ngày hết hạn
            </button>
            {daysLeft !== null && (
              <p className={`text-xs ${daysLeft <= 3 ? "font-bold text-amber-400" : "text-gray-500"}`}>
                Còn {daysLeft} ngày
              </p>
            )}
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Link nền tảng</span>
            <input
              className={modalFieldInput}
              value={customer.platformLink}
              onChange={(e) => onUpdate({ platformLink: e.target.value })}
              placeholder="https://..."
            />
            {customer.platformLink.trim() && (
              <a
                href={customer.platformLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-violet-300 hover:underline"
              >
                Mở link <ExternalLink size={12} />
              </a>
            )}
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Số tiền</span>
            <input
              type="number"
              min={0}
              className={modalFieldInput}
              value={customer.amountPaid || ""}
              onChange={(e) => onUpdate({ amountPaid: Number(e.target.value) || 0 })}
            />
            <p className="text-sm text-gray-400">{formatVnd(customer.amountPaid)}</p>
          </label>

          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            <input
              type="checkbox"
              checked={customer.renewalReminderEnabled}
              onChange={(e) => onUpdate({ renewalReminderEnabled: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-200">Nhắc gia hạn qua Zalo (trước 3 ngày hết hạn)</span>
          </label>

          <div className="rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-[11px] text-gray-500">
            <p>Nền tảng: {platformLabel}</p>
            {customer.lastRenewalReminderAt && (
              <p className="mt-1">
                Đã nhắc Zalo: {new Date(customer.lastRenewalReminderAt).toLocaleString("vi-VN")}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <button
            type="button"
            onClick={onZaloReminder}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/10 py-2.5 text-sm font-bold text-sky-200 hover:bg-sky-500/20"
          >
            <MessageCircle size={16} /> Nhắc Zalo
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onDuplicate();
                onOpenChange(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 py-2.5 text-sm font-bold text-violet-200"
            >
              <Copy size={16} /> Nhân bản
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete();
                onOpenChange(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 py-2.5 text-sm font-bold text-red-300"
            >
              <Trash2 size={16} /> Xóa
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CustomerManagement() {
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastCmsSync, setLastCmsSync] = useState<CmsAutoSyncOutcome | null>(null);
  const [erpSync, setErpSync] = useState<Record<string, CustomerErpSyncStatus>>({});
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [localBackupAt, setLocalBackupAt] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [restoreBusy, setRestoreBusy] = useState(false);
  const [localBackup, setLocalBackup] = useState<ReturnType<typeof loadLocalCustomerBackup>>(null);
  const [serverBackup, setServerBackup] = useState<{
    count: number;
    savedAt: string;
    preview: { fullName: string; phone: string; service: string }[];
  } | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const dirtyRef = useRef(false);

  const selectedRowIndex = useMemo(
    () => (selectedRowId ? customers.findIndex((row) => row.id === selectedRowId) : -1),
    [customers, selectedRowId],
  );

  const selectedCustomer = useMemo(
    () => (selectedRowId ? customers.find((row) => row.id === selectedRowId) ?? null : null),
    [customers, selectedRowId],
  );

  const dueReminders = useMemo(
    () =>
      customers.filter((c) => {
        const days = daysUntilExpiry(c.expiresAt);
        return c.renewalReminderEnabled && days !== null && days <= 3 && days >= 0;
      }),
    [customers],
  );

  const cmsSyncDisplay = useMemo(
    (): CmsSyncDisplay | null => describeCmsSyncOutcome(lastCmsSync, customers.length),
    [lastCmsSync, customers.length],
  );

  const missingContractCodeCount = useMemo(
    () => customers.length - countCustomersWithContractCode(customers),
    [customers],
  );

  const applyLocalBackup = useCallback((source: "auto" | "manual" = "auto") => {
    const backup = getUsableLocalBackup();
    if (!backup) return false;

    setCustomers(backup.entries);
    setOfflineMode(true);
    setLocalBackupAt(backup.savedAt);
    dirtyRef.current = false;
    setSaveError(null);
    setSaveMessage(
      source === "manual"
        ? `Đã khôi phục ${backup.entries.length} khách từ trình duyệt (${formatBackupTime(backup.savedAt)}).`
        : `Đã tải ${backup.entries.length} khách từ bản sao trình duyệt (${formatBackupTime(backup.savedAt)}). Supabase đang lỗi.`,
    );
    return true;
  }, []);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/customers", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        if (applyLocalBackup("auto")) return;
        setOfflineMode(true);
        setSaveError("Supabase đang lỗi. Bấm Khôi phục dữ liệu hoặc nhập file JSON backup.");
        return;
      }

      const loaded = Array.isArray(data.customers) ? data.customers : [];
      const usableServerData = hasMeaningfulCustomerData(loaded) && !isSampleCustomerData(loaded);

      if (!usableServerData) {
        if (applyLocalBackup("auto")) return;
        setCustomers(loaded);
        setOfflineMode(true);
        setSaveError("Chưa có dữ liệu trên máy chủ. Nhập file JSON hoặc nhập tay rồi bấm Tải backup.");
        dirtyRef.current = false;
        return;
      }

      setCustomers(loaded);
      setErpSync(
        data.erpSync && typeof data.erpSync === "object"
          ? (data.erpSync as Record<string, CustomerErpSyncStatus>)
          : {},
      );
      setOfflineMode(false);
      setLocalBackupAt(null);
      saveLocalCustomerBackup(loaded);
      dirtyRef.current = false;
      setSaveMessage("Đã tải dữ liệu từ máy chủ.");
    } catch {
      if (applyLocalBackup("auto")) return;
      setOfflineMode(true);
      setSaveError("Không kết nối được máy chủ. Thử Khôi phục dữ liệu hoặc nhập file JSON.");
    } finally {
      setIsLoading(false);
    }
  }, [applyLocalBackup]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store", credentials: "include" });
        const data = await res.json().catch(() => null);
        if (mounted && data?.authenticated) {
          setAuthenticated(true);
          await loadCustomers();
        }
      } finally {
        if (mounted) setIsAuthChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [loadCustomers]);

  useEffect(() => {
    const highlight = searchParams.get("highlight");
    if (!highlight || customers.length === 0) return;
    setSelectedRowId(highlight);
    window.setTimeout(() => {
      document.getElementById(`customer-row-${highlight}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 150);
  }, [searchParams, customers.length]);

  const syncAllToErp = useCallback(async () => {
    setIsSyncingAll(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/cms/sync-customers", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setSaveError(data?.error || "Đồng bộ ERP thất bại.");
        return;
      }
      setLastCmsSync({
        status: "ok",
        result: {
          customersCreated: data.customersCreated ?? 0,
          customersUpdated: data.customersUpdated ?? 0,
          contractsCreated: data.contractsCreated ?? 0,
          contractsUpdated: data.contractsUpdated ?? 0,
          periodsCreated: data.periodsCreated ?? 0,
          periodsUpdated: data.periodsUpdated ?? 0,
          receiptsCreated: data.receiptsCreated ?? 0,
          receiptsUpdated: data.receiptsUpdated ?? 0,
          receiptsRemoved: data.receiptsRemoved ?? 0,
          invoicesCreated: data.invoicesCreated ?? 0,
          invoicesUpdated: data.invoicesUpdated ?? 0,
          invoicesIssued: data.invoicesIssued ?? 0,
          invoicesCancelled: data.invoicesCancelled ?? 0,
          invoicesDraft: data.invoicesDraft ?? 0,
          recognitionEntries: data.recognitionEntries ?? 0,
          customersRemoved: data.customersRemoved ?? 0,
          skipped: data.skipped ?? 0,
          errors: Array.isArray(data.errors) ? data.errors : [],
        },
      });
      setSaveMessage(`Đã đồng bộ ${data.synced ?? customers.length} khách lên ERP.`);
      await loadCustomers();
    } catch {
      setSaveError("Không thể đồng bộ ERP.");
    } finally {
      setIsSyncingAll(false);
    }
  }, [customers.length, loadCustomers]);

  const erpStatusLabel = (status?: CustomerErpSyncStatus) => {
    if (!status) return "—";
    switch (status.state) {
      case "synced":
        return "ERP OK";
      case "missing_mshd":
        return "Thiếu MSHĐ";
      case "not_linked":
        return "Chưa sync";
      case "removed":
        return "Đã xóa ERP";
      default:
        return "—";
    }
  };

  const saveLocalOnly = useCallback((rows: CustomerRecord[]) => {
    if (!hasMeaningfulCustomerData(rows)) return;
    saveLocalCustomerBackup(rows);
    const savedAt = new Date().toISOString();
    setLocalBackupAt(savedAt);
    setOfflineMode(true);
    dirtyRef.current = false;
    setSaveError(null);
    setSaveMessage(
      `Đã lưu ${rows.length} khách trên trình duyệt (${formatBackupTime(savedAt)}). Bấm Tải backup để lưu file JSON an toàn.`,
    );
  }, []);

  const saveAll = useCallback(async () => {
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
        saveLocalOnly(customers);
        return;
      }
      const saved = Array.isArray(data.customers) ? data.customers : customers;
      setCustomers(saved);
      if (hasMeaningfulCustomerData(saved) && !isSampleCustomerData(saved)) {
        saveLocalCustomerBackup(saved);
      }
      setOfflineMode(false);
      setLocalBackupAt(null);
      dirtyRef.current = false;
      setSaveMessage("Đã lưu danh sách khách hàng lên máy chủ.");
      setLastCmsSync((data?.cmsSync as CmsAutoSyncOutcome | undefined) ?? null);
    } catch {
      saveLocalOnly(customers);
    } finally {
      setIsSaving(false);
    }
  }, [customers, saveLocalOnly]);

  useEffect(() => {
    if (!authenticated || !dirtyRef.current) return;
    const timer = window.setTimeout(() => {
      void saveAll();
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [customers, authenticated, saveAll]);

  const updateRow = (id: string, patch: Partial<CustomerRecord>) => {
    dirtyRef.current = true;
    setCustomers((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch, updatedAt: new Date().toISOString() } : row)),
    );
  };

  const addRow = () => {
    dirtyRef.current = true;
    setCustomers((prev) => [...prev, createEmptyCustomer()]);
  };

  const duplicateRow = (source: CustomerRecord) => {
    dirtyRef.current = true;
    const now = new Date().toISOString();
    const clone: CustomerRecord = {
      ...source,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      lastRenewalReminderAt: null,
      createdAt: now,
      updatedAt: now,
    };
    setCustomers((prev) => {
      const index = prev.findIndex((row) => row.id === source.id);
      if (index < 0) return [...prev, clone];
      const next = [...prev];
      next.splice(index + 1, 0, clone);
      return next;
    });
  };

  const removeRow = (id: string) => {
    if (!confirm("Xóa dòng khách hàng này?")) return;
    dirtyRef.current = true;
    setCustomers((prev) => prev.filter((row) => row.id !== id));
    if (selectedRowId === id) setSelectedRowId(null);
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
      await loadCustomers();
    } catch {
      setLoginError("Không thể đăng nhập.");
    }
  };

  const openRestoreDialog = async () => {
    setRestoreOpen(true);
    setLocalBackup(loadLocalCustomerBackup());
    setServerBackup(null);
    try {
      const res = await fetch("/api/customers/restore", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok && data.backup) {
        setServerBackup(data.backup);
      }
    } catch {
      // Server backup unavailable
    }
  };

  const applyRestoredCustomers = async (entries: CustomerRecord[], sourceLabel: string) => {
    if (!hasMeaningfulCustomerData(entries) || isSampleCustomerData(entries)) {
      alert("Bản sao lưu không hợp lệ hoặc chỉ chứa dữ liệu mẫu.");
      return;
    }
    if (!confirm(`Khôi phục ${entries.length} khách hàng từ ${sourceLabel}? Dữ liệu hiện tại sẽ bị thay thế.`)) {
      return;
    }

    setRestoreBusy(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ customers: entries }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setCustomers(entries);
        saveLocalOnly(entries);
        setSaveMessage(`Đã khôi phục ${entries.length} khách từ ${sourceLabel} (chỉ trên trình duyệt).`);
      } else {
        const saved = Array.isArray(data.customers) ? data.customers : entries;
        setCustomers(saved);
        saveLocalCustomerBackup(saved);
        setOfflineMode(false);
        setLocalBackupAt(null);
        dirtyRef.current = false;
        setSaveMessage(`Đã khôi phục ${saved.length} khách hàng từ ${sourceLabel}.`);
        setLastCmsSync((data?.cmsSync as CmsAutoSyncOutcome | undefined) ?? null);
      }
      setRestoreOpen(false);
    } catch {
      setCustomers(entries);
      saveLocalOnly(entries);
      setSaveMessage(`Đã khôi phục ${entries.length} khách từ ${sourceLabel} (chỉ trên trình duyệt).`);
      setRestoreOpen(false);
    } finally {
      setRestoreBusy(false);
    }
  };

  const restoreFromLocal = () => {
    const backup = getUsableLocalBackup();
    if (!backup) {
      alert("Không tìm thấy bản sao lưu hợp lệ trên trình duyệt này.");
      return;
    }
    setCustomers(backup.entries);
    saveLocalCustomerBackup(backup.entries);
    setOfflineMode(true);
    setLocalBackupAt(backup.savedAt);
    dirtyRef.current = false;
    setSaveError(null);
    setSaveMessage(`Đã khôi phục ${backup.entries.length} khách từ trình duyệt (${formatBackupTime(backup.savedAt)}).`);
    setRestoreOpen(false);
  };

  const restoreFromServer = async () => {
    setRestoreBusy(true);
    try {
      const res = await fetch("/api/customers/restore", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok || !Array.isArray(data.customers)) {
        alert(data?.error || "Không có bản sao lưu trên máy chủ.");
        return;
      }
      const label = data.restoredAt ? `máy chủ (${formatBackupTime(data.restoredAt)})` : "máy chủ";
      setCustomers(data.customers);
      saveLocalCustomerBackup(data.customers);
      dirtyRef.current = false;
      setSaveMessage(`Đã khôi phục ${data.customers.length} khách hàng từ ${label}.`);
      setRestoreOpen(false);
    } catch {
      alert("Không thể khôi phục từ máy chủ.");
    } finally {
      setRestoreBusy(false);
    }
  };

  const handleImportBackup = async (file: File) => {
    try {
      const raw = JSON.parse(await file.text());
      const backup = parseCustomerBackupFile(raw);
      if (!backup) {
        alert("File JSON không đúng định dạng sao lưu khách hàng.");
        return;
      }
      const label = file.name || `file (${formatBackupTime(backup.savedAt)})`;
      await applyRestoredCustomers(backup.entries, label);
    } catch {
      alert("Không đọc được file JSON.");
    } finally {
      if (importInputRef.current) importInputRef.current.value = "";
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
            <p className="text-xs text-gray-400">
              {offlineMode
                ? "Chế độ offline — dữ liệu lưu trên trình duyệt. Nhớ bấm Tải backup thường xuyên."
                : "Nhập dữ liệu như bảng Excel — bấm dòng để xem chi tiết — tự lưu sau vài giây"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void openRestoreDialog()}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-500/20"
            >
              <History size={14} /> Khôi phục dữ liệu
            </button>
            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/20"
            >
              <Upload size={14} /> Nhập JSON
            </button>
            <button
              type="button"
              onClick={() => downloadCustomerBackup(customers)}
              disabled={customers.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-50"
            >
              <Download size={14} /> Tải backup
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleImportBackup(file);
              }}
            />
            <button
              type="button"
              onClick={() => void loadCustomers()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold hover:bg-white/10"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Làm mới
            </button>
            <button
              type="button"
              onClick={() => void syncAllToErp()}
              disabled={isSyncingAll || customers.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-xs font-bold text-violet-200 hover:bg-violet-500/20 disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSyncingAll ? "animate-spin" : ""} />{" "}
              {isSyncingAll ? "Đang sync ERP..." : "Đồng bộ tất cả ERP"}
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
        {cmsSyncDisplay && (
          <div className="mx-auto max-w-[1600px] px-4 pb-3 sm:px-6">
            <div
              className={`rounded-xl border px-4 py-3 text-xs ${
                cmsSyncDisplay.level === "ok"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                  : cmsSyncDisplay.level === "warn"
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
                    : cmsSyncDisplay.level === "error"
                      ? "border-red-500/40 bg-red-500/10 text-red-100"
                      : "border-slate-500/40 bg-slate-500/10 text-slate-200"
              }`}
            >
              <strong>{cmsSyncDisplay.title}</strong>
              <span className="ml-2 opacity-90">{cmsSyncDisplay.detail}</span>
              {cmsSyncDisplay.level === "ok" && (
                <a
                  href="/cms"
                  className="ml-3 font-semibold underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mở CMS →
                </a>
              )}
            </div>
          </div>
        )}
        {missingContractCodeCount > 0 && (
          <div className="mx-auto max-w-[1600px] px-4 pb-3 sm:px-6">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-100">
              <strong>{missingContractCodeCount}</strong> khách chưa có MSHĐ — ERP sẽ bỏ qua khi đồng bộ.
            </div>
          </div>
        )}
        {offlineMode && (
          <div className="mx-auto max-w-[1600px] px-4 pb-4 sm:px-6">
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-xs text-sky-100">
              <strong>Chế độ offline</strong> — Supabase đang lỗi. Dữ liệu được lưu trên trình duyệt
              {localBackupAt ? ` (lần cuối: ${formatBackupTime(localBackupAt)})` : ""}. Bấm{" "}
              <strong>Tải backup</strong> để tải file JSON, tránh mất khi xóa cache trình duyệt.
            </div>
          </div>
        )}
        {isSampleCustomerData(customers) && (
          <div className="mx-auto max-w-[1600px] px-4 pb-4 sm:px-6">
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-100">
              Danh sách hiện tại là <strong>dữ liệu mẫu</strong> (do lỗi trước đó). Bấm{" "}
              <strong>Khôi phục dữ liệu</strong> để lấy lại bản sao lưu nếu có.
            </div>
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
          <table className="min-w-[1760px] w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="px-2 py-3 w-12 text-center">STT</th>
                <th className="px-2 py-3 min-w-[140px]">Họ và Tên</th>
                <th className="px-2 py-3 min-w-[130px]">Ngành nghề</th>
                <th className="px-2 py-3 min-w-[140px]">Tên cơ sở</th>
                <th className="px-2 py-3 min-w-[120px]">Số liên hệ</th>
                <th className="px-2 py-3 min-w-[160px]">Gmail</th>
                <th className="px-2 py-3 min-w-[220px]">Dịch vụ đăng ký</th>
                <th className="px-2 py-3 min-w-[130px]">Ngày đăng ký</th>
                <th className="px-2 py-3 min-w-[150px]">Ngày hết hạn</th>
                <th className="px-2 py-3 min-w-[160px]">Link nền tảng</th>
                <th className="px-2 py-3 min-w-[110px]">Số tiền</th>
                <th className="px-2 py-3 min-w-[90px] text-center">ERP</th>
                <th className="px-2 py-3 min-w-[100px] text-center">Nhắc gia hạn</th>
                <th className="px-2 py-3 w-28 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={14} className="px-4 py-10 text-center text-gray-500">
                    Chưa có khách hàng. Bấm &quot;Thêm dòng&quot; để bắt đầu nhập.
                  </td>
                </tr>
              ) : (
                customers.map((row, index) => {
                  const daysLeft = daysUntilExpiry(row.expiresAt);
                  const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
                  return (
                    <tr
                      key={row.id}
                      id={`customer-row-${row.id}`}
                      onClick={() => setSelectedRowId(row.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedRowId === row.id
                          ? "bg-violet-500/10"
                          : isUrgent && row.renewalReminderEnabled
                            ? "bg-amber-500/5 hover:bg-amber-500/10"
                            : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <td className="px-2 py-2 text-center font-mono text-gray-400">{index + 1}</td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.fullName}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { fullName: e.target.value })}
                          placeholder="Họ và tên"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.industry || ""}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { industry: e.target.value })}
                          placeholder="VD: Nha khoa, Spa, TMĐT..."
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.establishmentName || ""}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { establishmentName: e.target.value })}
                          placeholder="Tên phòng khám, cửa hàng..."
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          className={cellInput}
                          value={row.phone}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { phone: e.target.value })}
                          placeholder="09xx xxx xxx"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="email"
                          className={cellInput}
                          value={row.email || ""}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { email: e.target.value })}
                          placeholder="email@gmail.com"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1.5">
                          <select
                            className={cellInput}
                            value={row.platform}
                            onClick={stopRowClick}
                            onChange={(e) => updateRow(row.id, { platform: e.target.value as CustomerRecord["platform"] })}
                          >
                            {CUSTOMER_PLATFORMS.map((p) => (
                              <option key={p.key} value={p.key}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                          <input
                            className={cellInput}
                            value={row.service}
                            onClick={stopRowClick}
                            onChange={(e) => updateRow(row.id, { service: e.target.value })}
                            placeholder="VD: Viết bài FB 15 ngày, Xây dựng website..."
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="date"
                          className={cellInput}
                          value={row.registeredAt || ""}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { registeredAt: e.target.value || null })}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-1">
                          <input
                            type="date"
                            className={cellInput}
                            value={row.expiresAt || ""}
                            onClick={stopRowClick}
                            onChange={(e) => updateRow(row.id, { expiresAt: e.target.value || null })}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              stopRowClick(e);
                              updateRow(row.id, { expiresAt: null });
                            }}
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
                            onClick={stopRowClick}
                            onChange={(e) => updateRow(row.id, { platformLink: e.target.value })}
                            placeholder="https://..."
                          />
                          {row.platformLink.trim() && (
                            <a
                              href={row.platformLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={stopRowClick}
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
                          value={row.amountPaid || ""}
                          onClick={stopRowClick}
                          onChange={(e) => updateRow(row.id, { amountPaid: Number(e.target.value) || 0 })}
                          placeholder="0"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">{formatVnd(row.amountPaid)}</p>
                      </td>
                      <td className="px-2 py-2 text-center" onClick={stopRowClick}>
                        {(() => {
                          const sync = erpSync[row.id];
                          const label = erpStatusLabel(sync);
                          const cls =
                            sync?.state === "synced"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                              : sync?.state === "missing_mshd"
                                ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                                : "border-slate-500/40 bg-slate-500/10 text-slate-300";
                          return (
                            <div className="flex flex-col items-center gap-1">
                              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${cls}`}>
                                {label}
                              </span>
                              {sync?.cms360Url && (
                                <a
                                  href={sync.cms360Url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-violet-300 underline"
                                >
                                  360°
                                </a>
                              )}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-2 py-2 text-center" onClick={stopRowClick}>
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
                      <td className="px-2 py-2" onClick={stopRowClick}>
                        <div className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            title="Nhân bản dòng (chèn ngay bên dưới)"
                            onClick={() => duplicateRow(row)}
                            className="rounded-md border border-violet-500/30 bg-violet-500/10 p-1.5 text-violet-300 hover:bg-violet-500/20"
                          >
                            <Copy size={14} />
                          </button>
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
          Bấm vào dòng (không phải ô nhập) để mở popup chi tiết. Cột &quot;Nhắc gia hạn&quot;: cron 8:00 hàng ngày, tự nhắc
          khi còn 3 ngày.
        </p>
      </main>

      <Dialog open={restoreOpen} onOpenChange={setRestoreOpen}>
        <DialogContent className="max-w-md border-white/10 bg-[#111827] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Khôi phục dữ liệu khách hàng</DialogTitle>
            <DialogDescription className="text-gray-400">
              Chọn nguồn sao lưu để thay thế danh sách hiện tại.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-bold text-white">Trình duyệt này</p>
              {localBackup ? (
                <p className="mt-1 text-xs text-gray-400">
                  {localBackup.entries.length} khách — lưu lúc {formatBackupTime(localBackup.savedAt)}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Chưa có bản sao lưu trên trình duyệt này.</p>
              )}
              <button
                type="button"
                disabled={!localBackup || restoreBusy}
                onClick={restoreFromLocal}
                className="mt-3 w-full rounded-lg bg-amber-600 py-2 text-xs font-bold hover:bg-amber-500 disabled:opacity-50"
              >
                Khôi phục từ trình duyệt
              </button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-bold text-white">Máy chủ (Supabase)</p>
              {serverBackup ? (
                <p className="mt-1 text-xs text-gray-400">
                  {serverBackup.count} khách — lưu lúc {formatBackupTime(serverBackup.savedAt)}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Không đọc được bản sao lưu máy chủ (có thể do Supabase vượt quota).
                </p>
              )}
              <button
                type="button"
                disabled={!serverBackup || restoreBusy}
                onClick={() => void restoreFromServer()}
                className="mt-3 w-full rounded-lg border border-violet-500/40 bg-violet-500/10 py-2 text-xs font-bold text-violet-200 hover:bg-violet-500/20 disabled:opacity-50"
              >
                Khôi phục từ máy chủ
              </button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-bold text-white">File JSON</p>
              <p className="mt-1 text-xs text-gray-400">Nhập từ file đã tải bằng nút &quot;Tải backup&quot;.</p>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleImportBackup(file);
                }}
              />
              <button
                type="button"
                disabled={restoreBusy}
                onClick={() => importInputRef.current?.click()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-xs font-bold hover:bg-white/5 disabled:opacity-50"
              >
                <Upload size={14} /> Chọn file backup
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CustomerDetailDialog
        customer={selectedCustomer}
        rowIndex={selectedRowIndex >= 0 ? selectedRowIndex : 0}
        open={!!selectedRowId && !!selectedCustomer}
        onOpenChange={(open) => {
          if (!open) setSelectedRowId(null);
        }}
        onUpdate={(patch) => {
          if (selectedRowId) updateRow(selectedRowId, patch);
        }}
        onDuplicate={() => {
          if (selectedCustomer) duplicateRow(selectedCustomer);
        }}
        onDelete={() => {
          if (selectedRowId) removeRow(selectedRowId);
        }}
        onZaloReminder={() => {
          if (selectedCustomer) openZaloReminder(selectedCustomer);
        }}
      />
    </div>
  );
}
