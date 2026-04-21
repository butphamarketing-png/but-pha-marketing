"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Copy,
  FolderKanban,
  Plus,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { db, type ClientPortal } from "@/lib/useData";

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

export function PortalStudioPage() {
  const { settings } = useAdmin();
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [clientPortals, setClientPortals] = useState<ClientPortal[]>([]);
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
  const selectedProject = selectedProjects.find((project) => project.id === selectedProjectId) || selectedProjects[0] || null;

  useEffect(() => {
    if (!selectedProjects.length) {
      setSelectedProjectId("");
      return;
    }

    if (!selectedProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(selectedProjects[0].id);
    }
  }, [selectedProjectId, selectedProjects]);

  const refreshPortals = async (preferredId?: number) => {
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

  useEffect(() => {
    if (!authenticated) return;
    void refreshPortals();
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
      return { ...prev, weeklyReports: nextProjects as any };
    });
  };

  const addProject = () => {
    setSelectedClient((prev) => {
      if (!prev) return prev;
      const nextProjects = [...normalizeProjects(prev), createEmptyProject(normalizeProjects(prev).length + 1)];
      setSelectedProjectId(nextProjects[nextProjects.length - 1].id);
      return { ...prev, weeklyReports: nextProjects as any };
    });
  };

  const removeProject = (projectId: string) => {
    setSelectedClient((prev) => {
      if (!prev) return prev;
      const nextProjects = normalizeProjects(prev).filter((project) => project.id !== projectId);
      const safeProjects = nextProjects.length > 0 ? nextProjects : [createEmptyProject(1)];
      setSelectedProjectId(safeProjects[0].id);
      return { ...prev, weeklyReports: safeProjects as any };
    });
  };

  const saveAccount = async () => {
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
    });

    setIsBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage("Da luu thong tin tai khoan khach hang.");
    await refreshPortals(selectedClient.id);
  };

  const saveProjects = async () => {
    if (!selectedClient) return;
    setIsBusy(true);
    setMessage(null);
    setError(null);

    const result = await db.clientPortals.update(String(selectedClient.id), {
      weeklyReports: selectedProjects as any,
    });

    setIsBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage("Da luu thong tin du an.");
    await refreshPortals(selectedClient.id);
  };

  const createPortal = async () => {
    setMessage(null);
    setError(null);

    if (!newPortal.clientName || !newPortal.username || !portalPassword) {
      setError("Vui long nhap day du ten khach hang, tai khoan va mat khau.");
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
      weeklyReports: [createEmptyProject(1)] as any,
    } as any);
    setIsBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage("Da tao tai khoan khach hang thanh cong.");
    setPortalPassword("");
    setNewPortal({
      username: "",
      clientName: "",
      phone: "",
      platform: "facebook",
      daysRemaining: 30,
      postsCount: 0,
      progressPercent: 0,
      weeklyReports: [],
    });
    await refreshPortals(result.data?.id);
  };

  const deleteSelectedClient = async () => {
    if (!selectedClient) return;
    const shouldDelete = window.confirm(`Xoa tai khoan ${selectedClient.clientName}?`);
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
    setMessage("Da xoa tai khoan khach hang.");
    await refreshPortals();
  };

  if (isAuthChecking) {
    return <main className="min-h-screen bg-[#0a0510]" />;
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#0a0510] px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black">Quan ly cong khach hang</h1>
          <p className="mt-3 text-sm text-gray-300">Trang nay can dang nhap admin truoc khi truy cap.</p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white"
          >
            <ArrowLeft size={16} />
            Ve trang admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0510] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Admin</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-black">
              <FolderKanban className="text-primary" size={28} />
              Quan ly cong khach hang
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-300">
              Tao tai khoan, quan ly thong tin doanh nghiep va cap nhat toan bo noi dung lo trinh du an cho tung khach hang.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <ArrowLeft size={16} />
              Quay lai admin
            </Link>
            {selectedClient && (
              <button
                type="button"
                onClick={async () => {
                  const loginText = `Tai khoan: ${selectedClient.username}\nMat khau: ${selectedClient.password || ""}`;
                  await navigator.clipboard.writeText(loginText);
                  setMessage("Da copy thong tin dang nhap.");
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Copy size={16} />
                Copy login
              </button>
            )}
          </div>
        </div>

        {(message || error) && (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${error ? "border-red-500/30 bg-red-500/10 text-red-100" : "border-green-500/30 bg-green-500/10 text-green-100"}`}>
            {error || message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-lg font-bold text-white">Tao tai khoan moi</h2>
              <div className="space-y-3">
                <input value={newPortal.clientName || ""} onChange={(e) => setNewPortal({ ...newPortal, clientName: e.target.value })} placeholder="Ten khach hang" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                <input value={newPortal.username || ""} onChange={(e) => setNewPortal({ ...newPortal, username: e.target.value })} placeholder="Tai khoan dang nhap" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                <input value={portalPassword} onChange={(e) => setPortalPassword(e.target.value)} type="text" placeholder="Mat khau" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                <input value={newPortal.phone || ""} onChange={(e) => setNewPortal({ ...newPortal, phone: e.target.value })} placeholder="So dien thoai" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                <select value={newPortal.platform || "facebook"} onChange={(e) => setNewPortal({ ...newPortal, platform: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white">
                  {platforms.map((platform) => (
                    <option key={platform.key} value={platform.key} className="bg-[#120a1d]">
                      {platform.label}
                    </option>
                  ))}
                </select>
                <button onClick={createPortal} disabled={isBusy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                  <Plus size={16} />
                  Tao tai khoan
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Danh sach khach hang</h2>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{clientPortals.length} tai khoan</span>
              </div>
              <div className="space-y-2">
                {clientPortals.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setSelectedClient(client)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${selectedClient?.id === client.id ? "border-primary bg-primary/10" : "border-white/10 bg-black/20 hover:bg-white/5"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-white">{client.clientName}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wide text-gray-500">{client.username}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold text-gray-300">
                        {platforms.find((platform) => platform.key === client.platform)?.label || client.platform}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {!selectedClient ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 text-center text-gray-400">
                Chon mot khach hang ben trai de quan ly tai khoan va lo trinh du an.
              </div>
            ) : (
              <>
                <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-white">Thong tin tai khoan</h2>
                      <p className="mt-1 text-sm text-gray-400">Cap nhat thong tin dang nhap va ho so doanh nghiep cho cong khach hang.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveAccount} disabled={isBusy} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
                        <Save size={16} />
                        Luu tai khoan
                      </button>
                      <button onClick={deleteSelectedClient} disabled={isBusy} className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 disabled:opacity-60">
                        <Trash2 size={16} />
                        Xoa
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input value={selectedClient.clientName} onChange={(e) => updateSelectedClientLocal({ clientName: e.target.value })} placeholder="Ten khach hang" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.phone || ""} onChange={(e) => updateSelectedClientLocal({ phone: e.target.value })} placeholder="So dien thoai" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.username} readOnly className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-400" />
                    <select value={selectedClient.platform} onChange={(e) => updateSelectedClientLocal({ platform: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white">
                      {platforms.map((platform) => (
                        <option key={platform.key} value={platform.key} className="bg-[#120a1d]">
                          {platform.label}
                        </option>
                      ))}
                    </select>
                    <input value={selectedClient.password || ""} onChange={(e) => updateSelectedClientLocal({ password: e.target.value })} placeholder="Mat khau" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.email || ""} onChange={(e) => updateSelectedClientLocal({ email: e.target.value })} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.businessName || ""} onChange={(e) => updateSelectedClientLocal({ businessName: e.target.value })} placeholder="Ten doanh nghiep" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.platformLink || ""} onChange={(e) => updateSelectedClientLocal({ platformLink: e.target.value })} placeholder="Link nen tang" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    <input value={selectedClient.address || ""} onChange={(e) => updateSelectedClientLocal({ address: e.target.value })} placeholder="Dia chi" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white md:col-span-2" />
                    <input value={selectedClient.tickerText || ""} onChange={(e) => updateSelectedClientLocal({ tickerText: e.target.value })} placeholder="Thong bao chay ngang cho dashboard khach hang" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white md:col-span-2" />
                    <div className="grid grid-cols-3 gap-3 md:col-span-2">
                      <input value={selectedClient.daysRemaining || 0} onChange={(e) => updateSelectedClientLocal({ daysRemaining: Number(e.target.value || 0) })} placeholder="So ngay con lai" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <input value={selectedClient.postsCount || 0} onChange={(e) => updateSelectedClientLocal({ postsCount: Number(e.target.value || 0) })} placeholder="So bai dang" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <input value={selectedClient.progressPercent || 0} onChange={(e) => updateSelectedClientLocal({ progressPercent: Number(e.target.value || 0) })} placeholder="Tien do %" className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-white">Lo trinh du an</h2>
                      <p className="mt-1 text-sm text-gray-400">Moi khach hang co the co nhieu du an, moi du an gom thong tin, tien do va bao cao rieng.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={addProject} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                        <Plus size={16} />
                        Them du an
                      </button>
                      <button onClick={saveProjects} disabled={isBusy} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
                        <Save size={16} />
                        Luu du an
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedProjects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedProject?.id === project.id ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                      >
                        {project.title}
                      </button>
                    ))}
                  </div>

                  {selectedProject && (
                    <div className="space-y-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <input value={selectedProject.title} onChange={(e) => updateSelectedProject(selectedProject.id, { title: e.target.value })} placeholder="Ten du an" className="flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        <button onClick={() => removeProject(selectedProject.id)} className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100">
                          <Trash2 size={14} />
                          Xoa du an
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-gray-400">Ngay dang ky</label>
                          <input type="datetime-local" value={toDateTimeLocalValue(selectedProject.registeredAt)} onChange={(e) => updateSelectedProject(selectedProject.id, { registeredAt: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-gray-400">Deadline</label>
                          <input type="datetime-local" value={toDateTimeLocalValue(selectedProject.deadlineAt)} onChange={(e) => updateSelectedProject(selectedProject.id, { deadlineAt: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-gray-400">Ngan sach (VND)</label>
                          <input value={selectedProject.budgetVnd} onChange={(e) => updateSelectedProject(selectedProject.id, { budgetVnd: Number((e.target.value || "0").replace(/\D/g, "")) })} className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300">Thong tin du an</label>
                        <RichTextEditor value={selectedProject.infoDoc || "<p></p>"} onChange={(html) => updateSelectedProject(selectedProject.id, { infoDoc: html })} minHeight={180} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300">Tien do du an</label>
                        <RichTextEditor value={selectedProject.progressDoc || "<p></p>"} onChange={(html) => updateSelectedProject(selectedProject.id, { progressDoc: html })} minHeight={180} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300">Bao cao du an</label>
                        <RichTextEditor value={selectedProject.resultDoc || "<p></p>"} onChange={(html) => updateSelectedProject(selectedProject.id, { resultDoc: html })} minHeight={180} />
                      </div>
                    </div>
                  )}
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <UserRound size={18} />
                      <span className="text-sm font-semibold">Tai khoan</span>
                    </div>
                    <p className="text-2xl font-black text-white">{selectedClient.username}</p>
                    <p className="mt-1 text-xs text-gray-400">Tai khoan dang nhap khach hang</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <CalendarDays size={18} />
                      <span className="text-sm font-semibold">So du an</span>
                    </div>
                    <p className="text-2xl font-black text-white">{selectedProjects.length}</p>
                    <p className="mt-1 text-xs text-gray-400">Du an dang quan ly cho khach nay</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <FolderKanban size={18} />
                      <span className="text-sm font-semibold">Nen tang</span>
                    </div>
                    <p className="text-2xl font-black text-white">
                      {platforms.find((platform) => platform.key === selectedClient.platform)?.label || selectedClient.platform}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Nen tang chinh cua khach hang</p>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
