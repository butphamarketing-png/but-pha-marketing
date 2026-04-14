"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, LogOut, Menu, Send, User, X } from "lucide-react";
import { useAuth, AuthProvider } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, type ClientPortal, type ClientProject } from "@/lib/useData";

const NAV = [
  { id: "profile", label: "Thông tin tài khoản", icon: User },
  { id: "projects", label: "Quản lý dự án", icon: Menu },
  { id: "results", label: "Kết quả dự án", icon: Copy },
  { id: "request", label: "Gửi yêu cầu", icon: Send },
];

function DashboardContent() {
  const { user, isLoaded, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("profile");
  const [portal, setPortal] = useState<ClientPortal | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [themeColor, setThemeColor] = useState("#7C3AED");
  const [profilePhone, setProfilePhone] = useState("");

  useEffect(() => {
    if (!user?.portalId) return;

    const loadPortal = async () => {
      const portals = await db.clientPortals.getAll();
      const found = portals.find((p) => p.id === user.portalId) || null;
      setPortal(found);
      setProfilePhone(found?.phone || "");
    };

    loadPortal();
  }, [user?.portalId]);

  useEffect(() => {
    if (isLoaded && user === null) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const savedColor = localStorage.getItem("client_theme_color");
    if (savedColor) setThemeColor(savedColor);
  }, []);

  const projects: ClientProject[] = (portal?.weeklyReports || []) as any[];
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id || "");
    }
  }, [projects, selectedProjectId]);

  const selectedProject = projects.find(project => project.id === selectedProjectId) || projects[0] || null;

  const getCountdownText = (deadlineAt?: string) => {
    if (!deadlineAt) return "--";
    const now = new Date();
    const end = new Date(deadlineAt);
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Đã hết hạn";
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days} ngày ${hours} giờ`;
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value || "");
    alert("Đã copy");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30" style={{ ["--client-color" as any]: themeColor }}>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-white/5 bg-[#120a1d]/80 backdrop-blur-xl p-6 transition-transform duration-300 md:relative md:flex md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">BPM</div>
            <div className="flex flex-col">
              <span className="font-black text-white text-sm tracking-tight">BỨT PHÁ</span>
              <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Marketing</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <p className="px-4 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Menu chính</p>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => { setActiveNav(n.id); setSidebarOpen(false); }}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${activeNav === n.id ? "text-white shadow-lg" : "text-gray-300 hover:bg-white/5"}`}
              style={activeNav === n.id ? { backgroundColor: themeColor } : {}}
            >
              <div className="flex items-center gap-3">
                <n.icon size={18} className="text-white" />
                {n.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white text-sm">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex flex-1 flex-col min-w-0">
              <p className="truncate text-xs font-bold text-white">{user?.name || "Khách hàng"}</p>
              <p className="truncate text-[10px] text-gray-500">Tài khoản lộ trình</p>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gradient-to-br from-[#0a0510] to-[#120a1d]">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#0a0510]/60 px-6 py-4 backdrop-blur-md md:px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white md:hidden">
              <Menu size={24} />
            </button>
            <p className="text-sm font-semibold text-white">Cổng quản lý dự án khách hàng</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-white/5 mx-1"></div>
            <div className="flex items-center gap-3">
              <p className="hidden text-right text-[11px] font-bold text-white sm:block">
                {user?.name || "Khách hàng"}
                <span className="block text-[9px] font-medium text-primary uppercase tracking-tighter">Tài khoản lộ trình</span>
              </p>
              <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 p-0.5">
                <div className="h-full w-full rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-black text-white">
                  {user?.name?.[0] || "A"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
            {activeNav === "profile" && (
              <div className="space-y-6 rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                <h2 className="text-2xl font-black text-white">Thông tin tài khoản</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input value={portal?.clientName || ""} readOnly className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300" />
                  <input value={portal?.username || ""} readOnly className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300" />
                  <input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white" placeholder="Số điện thoại liên hệ" />
                  <select value={themeColor} onChange={e => setThemeColor(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                    <option value="#7C3AED">Tím</option>
                    <option value="#2563EB">Xanh dương</option>
                    <option value="#059669">Xanh lá</option>
                    <option value="#DC2626">Đỏ</option>
                  </select>
                </div>
                <button
                  onClick={async () => {
                    if (!portal) return;
                    await db.clientPortals.update(portal.id.toString(), { phone: profilePhone });
                    localStorage.setItem("client_theme_color", themeColor);
                    alert("Đã lưu thông tin cá nhân");
                  }}
                  className="rounded-xl px-5 py-2 text-sm font-bold text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  Lưu thông tin
                </button>
              </div>
            )}

            {(activeNav === "projects" || activeNav === "results") && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-5">
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-500">Dự án</p>
                  <div className="space-y-2">
                    {projects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProjectId(project.id)}
                        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${selectedProject?.id === project.id ? "text-white" : "text-gray-300 hover:bg-white/5"}`}
                        style={selectedProject?.id === project.id ? { backgroundColor: themeColor } : {}}
                      >
                        {project.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Ngày đăng ký</p>
                      <p className="mt-2 text-sm font-bold text-white">{selectedProject?.registeredAt ? new Date(selectedProject.registeredAt).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) : "--"}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Tiến độ còn lại</p>
                      <p className="mt-2 text-sm font-bold text-white">{getCountdownText(selectedProject?.deadlineAt)}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Chi phí</p>
                      <p className="mt-2 text-sm font-bold text-white">{Number(selectedProject?.budgetVnd || 0).toLocaleString("vi-VN")}đ</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{activeNav === "projects" ? "Quản lý dự án" : "Kết quả dự án"}</h3>
                      <button
                        onClick={() => copyText((activeNav === "projects" ? selectedProject?.progressDoc : selectedProject?.resultDoc) || "")}
                        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Copy nội dung
                      </button>
                    </div>
                    <div
                      className="min-h-[280px] rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white [&_img]:max-w-full [&_img]:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: activeNav === "projects" ? (selectedProject?.progressDoc || "<p>Chưa có nội dung</p>") : (selectedProject?.resultDoc || "<p>Chưa có nội dung</p>") }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeNav === "request" && (
              <div className="space-y-4 rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                <h3 className="text-lg font-bold text-white">Gửi yêu cầu cho quản trị viên</h3>
                <textarea
                  value={requestMessage}
                  onChange={e => setRequestMessage(e.target.value)}
                  placeholder="Nhập yêu cầu của bạn..."
                  className="min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                />
                <button
                  onClick={async () => {
                    if (!requestMessage.trim()) return;
                    await db.leads.add({
                      type: "request",
                      name: portal?.clientName || user?.name || "Khách hàng",
                      phone: portal?.phone || user?.phone || "",
                      platform: portal?.platform,
                      note: requestMessage,
                    });
                    setRequestMessage("");
                    alert("Đã gửi yêu cầu");
                  }}
                  className="rounded-xl px-5 py-2 text-sm font-bold text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  Gửi yêu cầu
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

