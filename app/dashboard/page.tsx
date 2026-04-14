"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, FolderOpen, Clock, BarChart2, Bell, Search, Menu, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth, AuthProvider } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, type ClientPortal, type ProgressArticle } from "@/lib/useData";

const NAV = [
  { id: "projects", label: "Dự án hợp tác", icon: FolderOpen },
  { id: "progress", label: "Tiến độ dự án", icon: Clock },
  { id: "reports", label: "Báo cáo hiệu quả", icon: BarChart2 },
];

function DashboardContent() {
  const { user, isLoaded, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [portal, setPortal] = useState<ClientPortal | null>(null);
  const [progressArticles, setProgressArticles] = useState<ProgressArticle[]>([]);

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

  const projectItems = portal?.weeklyReports.filter((item) => item.category === "Dự án hợp tác") || [];
  const progressItems = portal?.weeklyReports.filter((item) => item.category === "Tiến độ dự án") || [];
  const performanceItems = portal?.weeklyReports.filter((item) => item.category === "Báo cáo hiệu quả") || [];

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
              onClick={() => { setActiveTab(n.id); setSidebarOpen(false); }}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${activeTab === n.id ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              <div className="flex items-center gap-3">
                <n.icon size={18} className={activeTab === n.id ? "text-white" : "group-hover:text-primary transition-colors"} />
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
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Chuyên mục</p>
                <div className="space-y-3">
                  {NAV.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === item.id ? "bg-primary text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                        <p className="text-sm text-gray-400">Quá trình hợp tác</p>
                        <p className="mt-3 text-3xl font-black text-white">{projectItems.length || 0}</p>
                        <p className="mt-2 text-xs text-gray-500">mục lộ trình</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                        <p className="text-sm text-gray-400">Báo cáo hiệu quả</p>
                        <p className="mt-3 text-3xl font-black text-white">{performanceItems.length || 0}</p>
                        <p className="mt-2 text-xs text-gray-500">mục báo cáo</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                        <p className="text-sm text-gray-400">Tiến độ</p>
                        <p className="mt-3 text-3xl font-black text-white">{progressArticles.length || progressItems.length || 0}</p>
                        <p className="mt-2 text-xs text-gray-500">cập nhật mới</p>
                      </div>
                    </div>

                    {projectItems.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-gray-400">
                        Không có dữ liệu mục "Dự án hợp tác". Vui lòng liên hệ quản trị viên để cập nhật.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projectItems.map((item, index) => (
                          <div key={index} className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm text-gray-400">{item.date}</p>
                                <p className="mt-2 text-lg font-bold text-white">{item.title || "Tiêu đề lộ trình"}</p>
                              </div>
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.category}</span>
                            </div>
                            <p className="mt-4 text-sm text-gray-300 whitespace-pre-wrap">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "progress" && (
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                      <h2 className="text-xl font-bold text-white">Cập nhật tiến độ</h2>
                      <p className="mt-2 text-sm text-gray-400">Theo dõi các bước triển khai và nội dung đang thực hiện.</p>
                    </div>

                    {(progressArticles.length === 0 && progressItems.length === 0) ? (
                      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-gray-400">
                        Chưa có cập nhật tiến độ nào.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {progressArticles.map((art) => (
                          <div key={art.id} className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="text-lg font-bold text-white">{art.title}</h3>
                              <span className="text-xs text-gray-500">{new Date(art.createdAt).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-300 whitespace-pre-wrap">{art.content}</p>
                          </div>
                        ))}
                        {progressItems.map((item, index) => (
                          <div key={`item-${index}`} className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="text-lg font-bold text-white">{item.title || "Cập nhật"}</h3>
                              <span className="text-xs text-gray-500">{item.date}</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-300 whitespace-pre-wrap">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "reports" && (
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                      <h2 className="text-xl font-bold text-white">Báo cáo hiệu quả</h2>
                      <p className="mt-2 text-sm text-gray-400">Xem lại hiệu quả chiến dịch và các kết quả đã đạt được.</p>
                    </div>

                    {performanceItems.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-gray-400">
                        Chưa có báo cáo hiệu quả nào. Vui lòng yêu cầu quản trị viên cập nhật.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {performanceItems.map((item, index) => (
                          <div key={index} className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="text-lg font-bold text-white">{item.title || "Báo cáo"}</h3>
                              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-300">{item.category}</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-300 whitespace-pre-wrap">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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

