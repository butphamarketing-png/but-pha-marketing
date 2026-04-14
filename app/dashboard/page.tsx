"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, FolderOpen, Clock, BarChart2, Bell, Search, Menu, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth, AuthProvider } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, type ClientPortal, type ProgressArticle } from "@/lib/useData";

const NAV = [
  { id: "projects", label: "Quản lý dự án", icon: FolderOpen },
];

function DashboardContent() {
  const { user, isLoaded, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [portal, setPortal] = useState<ClientPortal | null>(null);
  const [progressArticles, setProgressArticles] = useState<ProgressArticle[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [projectDrafts, setProjectDrafts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!user?.portalId) return;

    const loadPortal = async () => {
      const portals = await db.clientPortals.getAll();
      const found = portals.find((p) => p.id === user.portalId) || null;
      setPortal(found);
      if (found) {
        const articles = await db.progressArticles.getByClient(found.id);
        setProgressArticles(articles);
      }
    };

    loadPortal();
  }, [user?.portalId]);

  useEffect(() => {
    if (isLoaded && user === null) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  const projectList = portal?.weeklyReports?.length
    ? portal.weeklyReports.map((report, index) => ({
        id: index + 1,
        title: report.title || `Dự án ${index + 1}`,
        description: report.content.slice(0, 120),
        progress: portal.progressPercent,
        posts: portal.postsCount,
        remaining: portal.daysRemaining,
      }))
    : Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        title: `Dự án ${i + 1}`,
        description: `Mô tả ngắn dự án ${i + 1}`,
        progress: portal?.progressPercent ?? 0,
        posts: portal?.postsCount ?? 0,
        remaining: portal?.daysRemaining ?? 0,
      }));

  const selectedProject = projectList.find((project) => project.id === selectedProjectId) || projectList[0] || {
    id: 1,
    title: "Dự án 1",
    description: "Mô tả ngắn dự án 1",
    progress: portal?.progressPercent ?? 0,
    posts: portal?.postsCount ?? 0,
    remaining: portal?.daysRemaining ?? 0,
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
    <div className="flex min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30">
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

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-white/5 bg-[#120a1d]/80 backdrop-blur-xl p-6 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
              onClick={() => setSidebarOpen(false)}
              className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 bg-primary shadow-lg shadow-primary/25">
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
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Tìm kiếm dự án, tài liệu..."
                className="w-64 rounded-xl bg-white/5 py-2 pl-10 pr-4 text-xs font-medium text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/20"
              />
            </div>
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
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6 shadow-xl shadow-primary/10">
                <h1 className="text-2xl font-black text-white">Xin chào, {user?.name || "Khách hàng"}</h1>
                <p className="mt-2 text-sm text-gray-400">Dashboard lộ trình dự án được tùy chỉnh theo tài khoản bạn đã đăng nhập.</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                  <p className="text-sm text-gray-400">Tiến độ</p>
                  <p className="mt-3 text-3xl font-black text-white">{portal?.progressPercent ?? "--"}%</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                  <p className="text-sm text-gray-400">Bài đăng</p>
                  <p className="mt-3 text-3xl font-black text-white">{portal?.postsCount ?? "--"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-4">
                  <p className="text-sm text-gray-400">Còn lại</p>
                  <p className="mt-3 text-3xl font-black text-white">{portal?.daysRemaining ?? "--"} ngày</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
              <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Dự án</p>
                <div className="space-y-3">
                  {projectList.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${selectedProjectId === project.id ? "bg-primary text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
                      <p>{project.title}</p>
                      <p className="mt-1 text-[11px] text-gray-500">{project.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white">{selectedProject.title}</h2>
                      <p className="mt-2 text-sm text-gray-400">{selectedProject.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-3xl border border-white/10 bg-[#0f0919]/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Tiến độ</p>
                        <p className="mt-3 text-3xl font-black text-white">{selectedProject.progress}%</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-[#0f0919]/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Bài đăng</p>
                        <p className="mt-3 text-3xl font-black text-white">{selectedProject.posts}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-[#0f0919]/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Còn lại</p>
                        <p className="mt-3 text-3xl font-black text-white">{selectedProject.remaining} ngày</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                  <h3 className="text-lg font-bold text-white">Nội dung bài đăng</h3>
                  <textarea
                    value={projectDrafts[selectedProject.id] || ""}
                    onChange={(e) => setProjectDrafts({ ...projectDrafts, [selectedProject.id]: e.target.value })}
                    placeholder="Nhập nội dung bài đăng của bạn ở đây..."
                    className="mt-4 w-full min-h-[220px] rounded-3xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-400">Nội dung bài đăng sẽ được lưu tạm vào phiên hiện tại.</div>
                    <button
                      onClick={() => {
                        const current = projectDrafts[selectedProject.id] || "";
                        setProjectDrafts({ ...projectDrafts, [selectedProject.id]: current });
                      }}
                      className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
                    >
                      Lưu nội dung
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

