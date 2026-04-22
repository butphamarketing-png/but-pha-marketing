"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BellRing,
  Building2,
  CalendarClock,
  Copy,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Plus,
  Save,
  Send,
  Settings,
  Sparkles,
  Star,
  Trash2,
  UserRound,
} from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { db, type ClientPortal, type ClientReview } from "@/lib/useData";

type StudioTab =
  | "overview"
  | "create-account"
  | "manage-account"
  | "project-info"
  | "project-progress"
  | "project-report"
  | "reviews";

type ClientProject = {
  id: string;
  title: string;
  registeredAt: string;
  deadlineAt: string;
  budgetVnd: number;
  infoDoc: string;
  progressDoc: string;
  resultDoc: string;
};

const STUDIO_ACCENT = "#f97316";

function createEmptyProject(index: number): ClientProject {
  const now = new Date();
  const deadline = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    id: `${Date.now()}-${index}`,
    title: `Du an ${index}`,
    registeredAt: now.toISOString(),
    deadlineAt: deadline.toISOString(),
    budgetVnd: 0,
    infoDoc: "<p></p>",
    progressDoc: "<p></p>",
    resultDoc: "<p></p>",
  };
}

function toDateTimeLocalValue(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const tzOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

function normalizeProjects(portal: ClientPortal | null): ClientProject[] {
  if (!portal) return [];
  const raw = ((portal.weeklyReports || []) as unknown[]) as Array<Record<string, unknown>>;
  if (raw.length === 0) return [createEmptyProject(1)];

  return raw.map((item, index) => {
    const legacyContent = typeof item.content === "string" ? item.content : "";
    return {
      id: typeof item.id === "string" ? item.id : `${portal.id}-${index + 1}`,
      title: typeof item.title === "string" && item.title.trim() ? item.title : `Du an ${index + 1}`,
      registeredAt: typeof item.registeredAt === "string" ? item.registeredAt : new Date().toISOString(),
      deadlineAt:
        typeof item.deadlineAt === "string"
          ? item.deadlineAt
          : new Date(Date.now() + (portal.daysRemaining || 30) * 24 * 60 * 60 * 1000).toISOString(),
      budgetVnd: typeof item.budgetVnd === "number" ? item.budgetVnd : 0,
      infoDoc:
        typeof item.infoDoc === "string"
          ? item.infoDoc
          : legacyContent
            ? `<p>${legacyContent}</p>`
            : "<p></p>",
      progressDoc:
        typeof item.progressDoc === "string"
          ? item.progressDoc
          : legacyContent
            ? `<p>${legacyContent}</p>`
            : "<p></p>",
      resultDoc: typeof item.resultDoc === "string" ? item.resultDoc : "<p></p>",
    };
  });
}

function formatCompactDate(value?: string) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("vi-VN");
}

export function PortalStudioPage() {
  const { settings } = useAdmin();
  const studioLogo = settings.logo || settings.favicon || "";
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<StudioTab>("overview");
  const [clientPortals, setClientPortals] = useState<ClientPortal[]>([]);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientPortal | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPortal, setNewPortal] = useState<Partial<ClientPortal>>({
    username: "",
    clientName: "",
    phone: "",
    platform: "facebook",
    daysRemaining: 30,
    postsCount: 0,
    progressPercent: 0,
    email: "",
    address: "",
    businessName: "",
    platformLink: "",
    tickerText: "",
    weeklyReports: [],
  });
  const [portalPassword, setPortalPassword] = useState("");

  const platforms = [
    { key: "facebook", label: settings.platformNames?.facebook || "Facebook" },
    { key: "tiktok", label: settings.platformNames?.tiktok || "TikTok" },
    { key: "instagram", label: settings.platformNames?.instagram || "Instagram" },
    { key: "zalo", label: settings.platformNames?.zalo || "Zalo" },
    { key: "googlemaps", label: settings.platformNames?.googlemaps || "Google Maps" },
    { key: "website", label: settings.platformNames?.website || "Website" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      setAuthenticated(auth === "1");
      setIsAuthChecking(false);
    }
  }, []);

  const selectedProjects = useMemo(() => normalizeProjects(selectedClient), [selectedClient]);
  const selectedProject =
    selectedProjects.find((project) => project.id === selectedProjectId) || selectedProjects[0] || null;
  const selectedClientReviews = useMemo(
    () => clientReviews.filter((review) => review.clientId === selectedClient?.id),
    [clientReviews, selectedClient?.id],
  );

  useEffect(() => {
    if (!selectedProjects.length) {
      setSelectedProjectId("");
      return;
    }

    if (!selectedProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(selectedProjects[0].id);
    }
  }, [selectedProjectId, selectedProjects]);

  const refreshPortals = async (preferredId?: string) => {
    const result = await db.clientPortals.getAll();
    if (result.error) {
      setError(result.error);
      return;
    }

    const nextPortals = result.data || [];
    setClientPortals(nextPortals);

    const targetId = preferredId ?? selectedClient?.id;
    if (!targetId) return;
    const fresh = nextPortals.find((portal) => portal.id === targetId) || null;
    setSelectedClient(fresh);
  };

  const refreshReviews = async () => {
    const result = await db.clientReviews.getAll();
    if (result.error) {
      setError(result.error);
      return;
    }
    setClientReviews(result.data || []);
  };

  useEffect(() => {
    if (!authenticated) return;
    void Promise.all([refreshPortals(), refreshReviews()]);
  }, [authenticated]);

  const updateSelectedClientLocal = (patch: Partial<ClientPortal>) => {
    setSelectedClient((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const updateSelectedProject = (projectId: string, patch: Partial<ClientProject>) => {
    setSelectedClient((prev) => {
      if (!prev) return prev;
      const nextProjects = normalizeProjects(prev).map((project) =>
        project.id === projectId ? { ...project, ...patch } : project,
      );
      return { ...prev, weeklyReports: nextProjects as never };
    });
  };

  const addProject = () => {
    setSelectedClient((prev) => {
      if (!prev) return prev;
      const current = normalizeProjects(prev);
      const nextProjects = [...current, createEmptyProject(current.length + 1)];
      setSelectedProjectId(nextProjects[nextProjects.length - 1].id);
      return { ...prev, weeklyReports: nextProjects as never };
    });
  };

  const removeProject = (projectId: string) => {
    setSelectedClient((prev) => {
      if (!prev) return prev;
      const nextProjects = normalizeProjects(prev).filter((project) => project.id !== projectId);
      const safeProjects = nextProjects.length > 0 ? nextProjects : [createEmptyProject(1)];
      setSelectedProjectId(safeProjects[0].id);
      return { ...prev, weeklyReports: safeProjects as never };
    });
  };

  const saveSelectedClient = async (successMessage = "Đã lưu thông tin tài khoản khách hàng.") => {
    if (!selectedClient) return;
    setIsBusy(true);
    setMessage(null);
    setError(null);

    const result = await db.clientPortals.update(String(selectedClient.id), {
      clientName: selectedClient.clientName,
      phone: selectedClient.phone,
      platform: selectedClient.platform,
      password: selectedClient.password,
      email: selectedClient.email,
      address: selectedClient.address,
      businessName: selectedClient.businessName,
      platformLink: selectedClient.platformLink,
      tickerText: selectedClient.tickerText,
      daysRemaining: selectedClient.daysRemaining,
      postsCount: selectedClient.postsCount,
      progressPercent: selectedClient.progressPercent,
      weeklyReports: selectedProjects as never,
    });

    setIsBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage(successMessage);
    await refreshPortals(selectedClient.id);
  };

  const createPortal = async () => {
    setMessage(null);
    setError(null);

    if (!newPortal.clientName || !newPortal.username || !portalPassword) {
      setError("Vui lòng nhập đầy đủ tên khách hàng, tài khoản và mật khẩu.");
      return;
    }

    setIsBusy(true);
    const result = await db.clientPortals.add({
      username: newPortal.username,
      password: portalPassword,
      clientName: newPortal.clientName,
      phone: newPortal.phone || "",
      platform: newPortal.platform || "facebook",
      daysRemaining: newPortal.daysRemaining || 30,
      postsCount: newPortal.postsCount || 0,
      progressPercent: newPortal.progressPercent || 0,
      email: newPortal.email || "",
      address: newPortal.address || "",
      businessName: newPortal.businessName || "",
      platformLink: newPortal.platformLink || "",
      tickerText: newPortal.tickerText || "",
      weeklyReports: [createEmptyProject(1)] as never,
    } as never);
    setIsBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage("Đã tạo tài khoản khách hàng thành công.");
    setPortalPassword("");
    setNewPortal({
      username: "",
      clientName: "",
      phone: "",
      platform: "facebook",
      daysRemaining: 30,
      postsCount: 0,
      progressPercent: 0,
      email: "",
      address: "",
      businessName: "",
      platformLink: "",
      tickerText: "",
      weeklyReports: [],
    });
    setActiveTab("manage-account");
    await refreshPortals(result.data?.id);
  };

  const deleteSelectedClient = async () => {
    if (!selectedClient) return;
    const shouldDelete = window.confirm(`Xóa tài khoản ${selectedClient.clientName}?`);
    if (!shouldDelete) return;

    setIsBusy(true);
    setMessage(null);
    setError(null);
    const result = await db.clientPortals.delete(String(selectedClient.id));
    setIsBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSelectedClient(null);
    setSelectedProjectId("");
    setMessage("Đã xóa tài khoản khách hàng.");
    await refreshPortals();
  };

  const announceReport = async () => {
    if (!selectedClient || !selectedProject) return;
    const announceText = `Thông báo mới: Báo cáo dự án ${selectedProject.title} đã được cập nhật vào ${new Date().toLocaleDateString("vi-VN")}.`;
    updateSelectedClientLocal({ tickerText: announceText });
    await saveSelectedClient("Đã lưu báo cáo và cập nhật thông báo cho khách hàng.");
  };

  const deleteReview = async (reviewId: string) => {
    const shouldDelete = window.confirm("Xóa đánh giá này khỏi trang chủ và dashboard?");
    if (!shouldDelete) return;
    setIsBusy(true);
    setMessage(null);
    setError(null);
    const result = await db.clientReviews.delete(reviewId);
    setIsBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage("Đã xóa đánh giá khách hàng.");
    await refreshReviews();
  };

  const sidebarItems: Array<{
    id: StudioTab;
    label: string;
    hint: string;
    icon: typeof LayoutDashboard;
  }> = [
    { id: "overview", label: "Tổng quan", hint: "Nhiều tài khoản, nhiều dự án", icon: LayoutDashboard },
    { id: "create-account", label: "Thêm tài khoản", hint: "Tạo tài khoản đăng nhập", icon: Plus },
    { id: "manage-account", label: "Quản lý tài khoản", hint: "Sửa thông tin khách hàng", icon: UserRound },
    { id: "project-info", label: "Thông tin dự án", hint: "Nội dung giới thiệu từng dự án", icon: FolderKanban },
    { id: "project-progress", label: "Tiến độ dự án", hint: "Cập nhật tiến độ thực hiện", icon: CalendarClock },
    { id: "project-report", label: "Báo cáo dự án", hint: "Báo cáo và thông báo", icon: FileText },
    { id: "reviews", label: "Đánh giá & thông báo", hint: "Review và chữ chạy ngang", icon: MessageSquareQuote },
  ];

  if (isAuthChecking) {
    return <main className="min-h-screen bg-[#f3f6fb]" />;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f3f6fb] px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: STUDIO_ACCENT }}>
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black">Quản lý lộ trình dự án</h1>
          <p className="mt-3 text-sm text-slate-500">Trang này cần đăng nhập admin trước khi truy cập.</p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: STUDIO_ACCENT }}
          >
            <ArrowLeft size={16} />
            Về trang admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <div className="mx-auto flex max-w-[1650px] gap-6 px-4 py-6 lg:px-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-[295px] shrink-0 overflow-hidden rounded-[30px] bg-[#161d31] text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              {studioLogo ? (
                <img
                  src={studioLogo}
                  alt={settings.title || "Logo"}
                  className="h-12 w-12 rounded-2xl border border-white/10 bg-white object-cover shadow-lg"
                />
              ) : (
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 55%, #ea580c 100%)" }}
                >
                  <FolderKanban size={20} />
                </div>
              )}
              <div>
                <p className="font-black text-white">Project Studio</p>
                <p className="text-xs text-slate-400">Quản lý lộ trình dự án</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeTab === item.id ? "text-white shadow-lg" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
                style={activeTab === item.id ? { backgroundColor: "#f97316" } : undefined}
              >
                <item.icon size={18} />
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-[11px] opacity-80">{item.hint}</p>
                </div>
              </button>
            ))}
          </nav>

          <div className="mx-4 mb-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-black text-white"
                style={{ background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)" }}
              >
                AD
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">Admin</p>
                <p className="truncate text-[11px] text-slate-400">Không gian quản lý lộ trình dự án</p>
              </div>
              <Link href="/admin" className="text-slate-400 transition hover:text-white">
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                  <Sparkles size={14} />
                  Admin Studio
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                  Quản lý lộ trình dự án
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 md:text-base">
                  Một workspace riêng để tạo tài khoản, quản lý dự án 1 - dự án 2, cập nhật tiến độ, báo cáo,
                  thông báo chạy ngang và đánh giá khách hàng cho từng cổng.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ArrowLeft size={16} />
                  Quay lại admin
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveTab("create-account")}
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:brightness-110"
                  style={{ backgroundColor: STUDIO_ACCENT }}
                >
                  <Plus size={16} />
                  Thêm tài khoản
                </button>
              </div>
            </div>
          </section>

          {(message || error) && (
            <div
              className={`rounded-[24px] border px-5 py-4 text-sm ${
                error
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {error || message}
            </div>
          )}

          {!selectedClient && activeTab !== "create-account" && (
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
              Chọn một khách hàng ở cột bên trái trong danh sách tài khoản để cập nhật lộ trình dự án và nội dung nội bộ.
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
            <section className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-950">Danh sách tài khoản</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    {clientPortals.length} tài khoản
                  </span>
                </div>

                <div className="space-y-3">
                  {clientPortals.map((client) => {
                    const isActive = selectedClient?.id === client.id;
                    const projectCount = normalizeProjects(client).length;

                    return (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => {
                          setSelectedClient(client);
                          if (activeTab === "overview") setActiveTab("manage-account");
                        }}
                        className={`w-full rounded-[24px] border p-4 text-left transition ${
                          isActive
                            ? "border-orange-200 bg-orange-50"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-900">{client.clientName}</p>
                            <p className="mt-1 truncate text-[11px] uppercase tracking-[0.2em] text-slate-400">
                              {client.username}
                            </p>
                          </div>
                          <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                            style={{ backgroundColor: STUDIO_ACCENT }}
                          >
                            {platforms.find((platform) => platform.key === client.platform)?.label || client.platform}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                          <span>{projectCount} dự án</span>
                          <span>{clientReviews.filter((review) => review.clientId === client.id).length} review</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="space-y-6">
              {activeTab === "overview" && (
                <>
                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                        <UserRound size={20} />
                      </div>
                      <p className="text-3xl font-black text-slate-950">{clientPortals.length}</p>
                      <p className="mt-2 text-sm text-slate-500">Tổng tài khoản khách hàng đang được quản lý.</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                        <FolderKanban size={20} />
                      </div>
                      <p className="text-3xl font-black text-slate-950">
                        {clientPortals.reduce((sum, portal) => sum + normalizeProjects(portal).length, 0)}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">Tổng số dự án đang mở trong hệ thống.</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                        <Star size={20} />
                      </div>
                      <p className="text-3xl font-black text-slate-950">{clientReviews.length}</p>
                      <p className="mt-2 text-sm text-slate-500">Đánh giá sẽ được đẩy lên trang chủ sau khi khách gửi.</p>
                    </div>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-black text-slate-950">Mô tả luồng khách hàng</h2>
                          <p className="mt-1 text-sm text-slate-500">
                            Admin nhập dữ liệu trong studio này và dashboard khách hàng sẽ đọc lại theo từng tài khoản.
                          </p>
                        </div>
                        <div className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                          Dong bo
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          "1. Thêm tài khoản đăng nhập cho khách hàng",
                          "2. Chọn khách hàng để quản lý nhiều dự án",
                          "3. Nhập thông tin dự án, tiến độ và báo cáo bằng rich text",
                          "4. Cập nhật thông báo chạy ngang cho dashboard khách",
                          "5. Nhận review từ dashboard và được phép xóa trong admin",
                          "6. Nút gia hạn trên dashboard đưa khách về đúng nền tảng",
                        ].map((item) => (
                          <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <h2 className="text-xl font-black text-slate-950">Khách hàng đang chọn</h2>
                      {selectedClient ? (
                        <div className="mt-5 space-y-4">
                          <div className="rounded-[24px] bg-slate-50 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ho so</p>
                            <p className="mt-2 text-2xl font-black text-slate-950">{selectedClient.clientName}</p>
                            <p className="mt-1 text-sm text-slate-500">{selectedClient.username}</p>
                          </div>
                          <div className="grid gap-3">
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                              <strong className="text-slate-950">Nen tang:</strong>{" "}
                              {platforms.find((platform) => platform.key === selectedClient.platform)?.label || selectedClient.platform}
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                              <strong className="text-slate-950">Số dự án:</strong> {selectedProjects.length}
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                              <strong className="text-slate-950">Thông báo:</strong>{" "}
                              {selectedClient.tickerText?.trim() ? "Đã cấu hình" : "Chưa cấu hình"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                          Chọn một khách hàng để xem nhanh lộ trình và thông tin tài khoản.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "create-account" && (
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] md:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Step 01</p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">Thêm tài khoản khách hàng</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Tạo tài khoản đăng nhập, cài đặt hồ sơ doanh nghiệp và khởi tạo dự án đầu tiên.
                      </p>
                    </div>
                    <div className="hidden rounded-[24px] bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 md:block">
                      Nội dung này sẽ đổ vào dashboard khách hàng sau khi login.
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={newPortal.clientName || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, clientName: e.target.value })}
                      placeholder="Tên khách hàng"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.businessName || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, businessName: e.target.value })}
                      placeholder="Ten doanh nghiep"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.username || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, username: e.target.value })}
                      placeholder="Tài khoản đăng nhập"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={portalPassword}
                      onChange={(e) => setPortalPassword(e.target.value)}
                      placeholder="Mat khau dang nhap"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.phone || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, phone: e.target.value })}
                      placeholder="So dien thoai"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.email || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, email: e.target.value })}
                      placeholder="Email"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.address || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, address: e.target.value })}
                      placeholder="Dia chi"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 md:col-span-2"
                    />
                    <select
                      value={newPortal.platform || "facebook"}
                      onChange={(e) => setNewPortal({ ...newPortal, platform: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    >
                      {platforms.map((platform) => (
                        <option key={platform.key} value={platform.key}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                    <input
                      value={newPortal.platformLink || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, platformLink: e.target.value })}
                      placeholder="Link nen tang dang ho tro"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.tickerText || ""}
                      onChange={(e) => setNewPortal({ ...newPortal, tickerText: e.target.value })}
                      placeholder="Dòng thông báo chạy ngang cho dashboard khách"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 md:col-span-2"
                    />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <input
                      value={newPortal.daysRemaining || 0}
                      onChange={(e) => setNewPortal({ ...newPortal, daysRemaining: Number(e.target.value || 0) })}
                      placeholder="So ngay con lai"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.postsCount || 0}
                      onChange={(e) => setNewPortal({ ...newPortal, postsCount: Number(e.target.value || 0) })}
                      placeholder="So bai dang"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                    <input
                      value={newPortal.progressPercent || 0}
                      onChange={(e) => setNewPortal({ ...newPortal, progressPercent: Number(e.target.value || 0) })}
                      placeholder="Tiến độ %"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={createPortal}
                      disabled={isBusy}
                      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:brightness-110 disabled:opacity-60"
                      style={{ backgroundColor: STUDIO_ACCENT }}
                    >
                      <Plus size={16} />
                      Tạo tài khoản
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewPortal({
                          username: "",
                          clientName: "",
                          phone: "",
                          platform: "facebook",
                          daysRemaining: 30,
                          postsCount: 0,
                          progressPercent: 0,
                          email: "",
                          address: "",
                          businessName: "",
                          platformLink: "",
                          tickerText: "",
                          weeklyReports: [],
                        });
                        setPortalPassword("");
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Lam moi
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "manage-account" && (
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] md:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Step 02</p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">Quản lý tài khoản</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Sửa hồ sơ công ty, thông tin liên hệ, nội dung ticker và giá trị tổng quan hiện trong dashboard.
                      </p>
                    </div>

                    {selectedClient && (
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            const loginText = `Tài khoản: ${selectedClient.username}\nMật khẩu: ${selectedClient.password || ""}`;
                            await navigator.clipboard.writeText(loginText);
                            setMessage("Đã copy thông tin đăng nhập.");
                          }}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                          <Copy size={16} />
                          Copy login
                        </button>
                        <button
                          type="button"
                          onClick={() => void saveSelectedClient()}
                          disabled={!selectedClient || isBusy}
                          className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                          style={{ backgroundColor: STUDIO_ACCENT }}
                        >
                          <Save size={16} />
                          Lưu tài khoản
                        </button>
                        <button
                          type="button"
                          onClick={deleteSelectedClient}
                          disabled={!selectedClient || isBusy}
                          className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                          Xóa tài khoản
                        </button>
                      </div>
                    )}
                  </div>

                  {!selectedClient ? (
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-sm text-slate-500">
                      Chọn một khách hàng bên trái để sửa thông tin tài khoản.
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          value={selectedClient.clientName}
                          onChange={(e) => updateSelectedClientLocal({ clientName: e.target.value })}
                          placeholder="Tên khách hàng"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.businessName || ""}
                          onChange={(e) => updateSelectedClientLocal({ businessName: e.target.value })}
                          placeholder="Ten doanh nghiep"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.username}
                          readOnly
                          className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
                        />
                        <input
                          value={selectedClient.password || ""}
                          onChange={(e) => updateSelectedClientLocal({ password: e.target.value })}
                          placeholder="Mat khau dang nhap"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.phone || ""}
                          onChange={(e) => updateSelectedClientLocal({ phone: e.target.value })}
                          placeholder="So dien thoai"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.email || ""}
                          onChange={(e) => updateSelectedClientLocal({ email: e.target.value })}
                          placeholder="Email"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <select
                          value={selectedClient.platform}
                          onChange={(e) => updateSelectedClientLocal({ platform: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        >
                          {platforms.map((platform) => (
                            <option key={platform.key} value={platform.key}>
                              {platform.label}
                            </option>
                          ))}
                        </select>
                        <input
                          value={selectedClient.platformLink || ""}
                          onChange={(e) => updateSelectedClientLocal({ platformLink: e.target.value })}
                          placeholder="Link nen tang ho tro"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.address || ""}
                          onChange={(e) => updateSelectedClientLocal({ address: e.target.value })}
                          placeholder="Dia chi"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 md:col-span-2"
                        />
                        <input
                          value={selectedClient.tickerText || ""}
                          onChange={(e) => updateSelectedClientLocal({ tickerText: e.target.value })}
                          placeholder="Thông báo chạy ngang từ trái sang phải"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 md:col-span-2"
                        />
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <input
                          value={selectedClient.daysRemaining || 0}
                          onChange={(e) => updateSelectedClientLocal({ daysRemaining: Number(e.target.value || 0) })}
                          placeholder="So ngay con lai"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.postsCount || 0}
                          onChange={(e) => updateSelectedClientLocal({ postsCount: Number(e.target.value || 0) })}
                          placeholder="So bai dang"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                        <input
                          value={selectedClient.progressPercent || 0}
                          onChange={(e) => updateSelectedClientLocal({ progressPercent: Number(e.target.value || 0) })}
                          placeholder="Tiến độ tổng %"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {["project-info", "project-progress", "project-report"].includes(activeTab) && (
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] md:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                        {activeTab === "project-info"
                          ? "Step 03"
                          : activeTab === "project-progress"
                            ? "Step 04"
                            : "Step 05"}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">
                        {activeTab === "project-info"
                          ? "Thông tin dự án"
                          : activeTab === "project-progress"
                            ? "Tiến độ dự án"
                            : "Báo cáo dự án"}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Mỗi khách có nhiều dự án. Admin có thể thêm, sửa, xóa và cập nhật nội dung theo từng tab.
                      </p>
                    </div>

                    {selectedClient && (
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={addProject}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                          <Plus size={16} />
                          Thêm dự án
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void saveSelectedClient(
                              activeTab === "project-info"
                                ? "Đã lưu thông tin dự án."
                                : activeTab === "project-progress"
                                  ? "Đã lưu tiến độ dự án."
                                  : "Đã lưu báo cáo dự án.",
                            )
                          }
                          disabled={!selectedClient || isBusy}
                          className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                          style={{ backgroundColor: STUDIO_ACCENT }}
                        >
                          <Save size={16} />
                          Lưu nội dung
                        </button>
                        {activeTab === "project-report" && (
                          <button
                            type="button"
                            onClick={() => void announceReport()}
                            disabled={!selectedClient || !selectedProject || isBusy}
                            className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 disabled:opacity-60"
                          >
                            <BellRing size={16} />
                            Lưu và thông báo
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {!selectedClient ? (
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-sm text-slate-500">
                      Chọn một khách hàng bên trái để bắt đầu quản lý danh sách dự án.
                    </div>
                  ) : (
                    <>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {selectedProjects.map((project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                              selectedProject?.id === project.id
                                ? "text-white shadow-lg shadow-orange-100"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                            style={selectedProject?.id === project.id ? { backgroundColor: STUDIO_ACCENT } : undefined}
                          >
                            {project.title}
                          </button>
                        ))}
                      </div>

                      {selectedProject && (
                        <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                          <div className="flex flex-wrap items-center gap-3">
                            <input
                              value={selectedProject.title}
                              onChange={(e) => updateSelectedProject(selectedProject.id, { title: e.target.value })}
                              placeholder="Tên dự án"
                              className="min-w-[240px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                            />
                            <button
                              type="button"
                              onClick={() => removeProject(selectedProject.id)}
                              className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                            >
                              <Trash2 size={14} />
                              Xóa dự án
                            </button>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Ngay dang ky
                              </label>
                              <input
                                type="datetime-local"
                                value={toDateTimeLocalValue(selectedProject.registeredAt)}
                                onChange={(e) =>
                                  updateSelectedProject(selectedProject.id, { registeredAt: e.target.value })
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Deadline
                              </label>
                              <input
                                type="datetime-local"
                                value={toDateTimeLocalValue(selectedProject.deadlineAt)}
                                onChange={(e) =>
                                  updateSelectedProject(selectedProject.id, { deadlineAt: e.target.value })
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Ngân sách (VND)
                              </label>
                              <input
                                value={selectedProject.budgetVnd}
                                onChange={(e) =>
                                  updateSelectedProject(selectedProject.id, {
                                    budgetVnd: Number((e.target.value || "0").replace(/\D/g, "")),
                                  })
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                              />
                            </div>
                          </div>

                          {activeTab === "project-info" && (
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Nội dung thông tin dự án
                              </label>
                              <RichTextEditor
                                value={selectedProject.infoDoc || "<p></p>"}
                                onChange={(html) => updateSelectedProject(selectedProject.id, { infoDoc: html })}
                                minHeight={320}
                              />
                            </div>
                          )}

                          {activeTab === "project-progress" && (
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Nội dung tiến độ dự án
                              </label>
                              <RichTextEditor
                                value={selectedProject.progressDoc || "<p></p>"}
                                onChange={(html) => updateSelectedProject(selectedProject.id, { progressDoc: html })}
                                minHeight={320}
                              />
                            </div>
                          )}

                          {activeTab === "project-report" && (
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Nội dung báo cáo dự án
                              </label>
                              <RichTextEditor
                                value={selectedProject.resultDoc || "<p></p>"}
                                onChange={(html) => updateSelectedProject(selectedProject.id, { resultDoc: html })}
                                minHeight={320}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] md:p-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Step 06</p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">Đánh giá và thông báo</h2>
                        <p className="mt-2 text-sm text-slate-500">
                          Quản lý chữ chạy ngang ở dashboard, xóa review khách hàng và theo dõi nội dung sẽ hiện trên trang chủ.
                        </p>
                      </div>

                      {selectedClient && (
                        <button
                          type="button"
                          onClick={() => void saveSelectedClient("Đã lưu thông báo chạy ngang cho khách hàng.")}
                          disabled={!selectedClient || isBusy}
                          className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                          style={{ backgroundColor: STUDIO_ACCENT }}
                        >
                          <Save size={16} />
                          Lưu thông báo
                        </button>
                      )}
                    </div>

                    {!selectedClient ? (
                      <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-sm text-slate-500">
                        Chọn một khách hàng để cài đặt ticker text và xem review của họ.
                      </div>
                    ) : (
                      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-[24px] bg-slate-50 p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                              <Send size={18} />
                            </div>
                            <div>
                              <h3 className="font-black text-slate-950">Chữ thông báo chạy ngang</h3>
                              <p className="text-sm text-slate-500">Nội dung này sẽ hiện ở đầu dashboard của khách hàng.</p>
                            </div>
                          </div>
                          <textarea
                            value={selectedClient.tickerText || ""}
                            onChange={(e) => updateSelectedClientLocal({ tickerText: e.target.value })}
                            rows={6}
                            placeholder="Nhập thông báo chạy ngang..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400"
                          />
                          <div className="mt-4 rounded-2xl bg-[#161d31] px-4 py-3 text-sm font-bold text-white">
                            Xem trước: {selectedClient.tickerText?.trim() || "Chưa có thông báo"}
                          </div>
                        </div>

                        <div className="rounded-[24px] bg-slate-50 p-5">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                              <Star size={18} />
                            </div>
                            <div>
                              <h3 className="font-black text-slate-950">Review của khách hàng</h3>
                              <p className="text-sm text-slate-500">
                                Các review khách gửi từ dashboard sẽ hiện ở đây và có thể xóa bất kỳ lúc nào.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {selectedClientReviews.length === 0 ? (
                              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
                                Khách hàng này chưa gửi review nào.
                              </div>
                            ) : (
                              selectedClientReviews.map((review) => (
                                <div key={review.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="font-black text-slate-950">{review.clientName}</p>
                                      <p className="mt-1 text-xs text-slate-400">{formatCompactDate(review.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                                        {review.rating}/5 sao
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => void deleteReview(review.id)}
                                        className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="mt-3 text-sm leading-6 text-slate-600">{review.content}</p>
                                  {review.logoUrl ? (
                                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                      <Building2 size={14} />
                                      Logo khach da gui kem.
                                    </div>
                                  ) : null}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-950">Tất cả review trong hệ thống</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        {clientReviews.length} review
                      </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {clientReviews.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500 md:col-span-2">
                          Chưa có review nào được gửi từ dashboard.
                        </div>
                      ) : (
                        clientReviews.map((review) => (
                          <div key={review.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-black text-slate-950">{review.clientName}</p>
                                <p className="mt-1 text-xs text-slate-400">{formatCompactDate(review.createdAt)}</p>
                              </div>
                              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                                {review.rating}/5
                              </span>
                            </div>
                            <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{review.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
