"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, LayoutDashboard, FolderOpen, Bell, Settings, 
  FileText, BarChart2, TrendingUp, CheckCircle2, Clock,
  ChevronRight, Search, Menu, X
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import { useAuth, AuthProvider } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

const DOCS = [
  { name: "Mẫu kịch bản video TikTok", type: "PDF", date: "01/04/2026", size: "2.4 MB" },
  { name: "Báo cáo Ads Facebook tháng 3", type: "Excel", date: "05/04/2026", size: "1.1 MB" },
  { name: "Hướng dẫn tạo content chuẩn SEO", type: "PDF", date: "08/04/2026", size: "4.5 MB" },
  { name: "Bộ ảnh template Zalo OA", type: "ZIP", date: "10/04/2026", size: "12.8 MB" },
];

const NOTIFICATIONS = [
  { id: 1, msg: "Chiến dịch Facebook Ads tháng 4 đã được kích hoạt", time: "2 giờ trước", unread: true, type: "success" },
  { id: 2, msg: "Báo cáo tuần 14 đã sẵn sàng để tải xuống", time: "1 ngày trước", unread: true, type: "info" },
  { id: 3, msg: "Fanpage đạt 500 Like mới trong tuần", time: "3 ngày trước", unread: false, type: "success" },
];

const PROJECTS = [
  { name: "Fanpage Facebook - Chăm sóc nội dung", progress: 60, detail: "Đang lên bài viết ngày 18/30", color: "#1877F2", status: "Đang chạy" },
  { name: "TikTok Ads - Chiến dịch tháng 4", progress: 35, detail: "Giai đoạn: Tối ưu target", color: "#FF0050", status: "Cần tối ưu" },
  { name: "SEO Website - Từ khóa địa phương", progress: 80, detail: "8/10 từ khóa đã vào trang 2", color: "#34A853", status: "Sắp hoàn thành" },
];

const NAV = [
  { id: "overview", label: "Tổng quan", icon: LayoutDashboard },
  { id: "projects", label: "Dự án", icon: FolderOpen },
  { id: "docs", label: "Tài liệu", icon: FileText },
  { id: "notifications", label: "Thông báo", icon: Bell, badge: 2 },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      // router.push("/"); // Uncomment to enforce login
    }
  }, [user]);

  const SIN_DATA = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    views: Math.floor(400 + 200 * Math.sin((i / 24) * 2 * Math.PI) + Math.random() * 80)
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30">
      {/* Mobile Sidebar Overlay */}
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

      {/* Sidebar */}
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
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => { setActiveTab(n.id); setSidebarOpen(false); }}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${activeTab === n.id ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center gap-3">
                <n.icon size={18} className={activeTab === n.id ? "text-white" : "group-hover:text-primary transition-colors"} />
                {n.label}
              </div>
              {n.badge && (
                <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${activeTab === n.id ? "bg-white text-primary" : "bg-primary text-white"}`}>
                  {n.badge}
                </span>
              )}
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
              <p className="truncate text-[10px] text-gray-500">Premium Member</p>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gradient-to-br from-[#0a0510] to-[#120a1d]">
        {/* Header */}
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
            <button className="relative rounded-xl bg-white/5 p-2.5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              <Bell size={18} />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary ring-2 ring-[#0a0510]"></span>
            </button>
            <div className="h-8 w-px bg-white/5 mx-1"></div>
            <div className="flex items-center gap-3">
              <p className="hidden text-right text-[11px] font-bold text-white sm:block">
                {user?.name || "Admin"}
                <span className="block text-[9px] font-medium text-primary uppercase tracking-tighter">Thành viên bạc</span>
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
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {activeTab === "overview" && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Lượt tiếp cận", value: "124.8K", change: "+12.5%", color: "#A855F7", icon: TrendingUp },
                    { label: "Tương tác thực", value: "8,247", change: "+18.2%", color: "#10B981", icon: CheckCircle2 },
                    { label: "Khách hàng tiềm năng", value: "142", change: "+5.4%", color: "#3B82F6", icon: FolderOpen },
                    { label: "Thời gian trung bình", value: "4m 12s", change: "-2.1%", color: "#F43F5E", icon: Clock },
                  ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#160d25]/50 p-6 backdrop-blur-sm"
                    >
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                          <s.icon size={20} style={{ color: s.color }} />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white tracking-tight">{s.value}</p>
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 text-[10px] font-black ${s.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {s.change} <span className="text-gray-600 font-medium">so với tuần trước</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Main Visual Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Sine Wave Chart */}
                  <motion.div variants={itemVariants} className="lg:col-span-2 rounded-3xl border border-white/5 bg-[#160d25]/50 p-8 backdrop-blur-sm">
                    <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-xl font-black text-white tracking-tight">Hiệu quả chiến dịch</h2>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={SIN_DATA}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="time" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#1a0f2e", border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: "16px" }}
                            itemStyle={{ color: "#fff" }}
                          />
                          <Area type="monotone" dataKey="views" stroke="#A855F7" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" animationDuration={2500} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Project Progress */}
                  <motion.div variants={itemVariants} className="rounded-3xl border border-white/5 bg-[#160d25]/50 p-8 backdrop-blur-sm">
                    <h2 className="mb-8 text-xl font-black text-white tracking-tight">Tiến độ công việc</h2>
                    <div className="space-y-8">
                      {PROJECTS.map((p, i) => (
                        <div key={i}>
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-[13px] font-bold text-white">{p.name}</span>
                            <span className="text-xs font-black text-white">{p.progress}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 1.5 }} className="h-full rounded-full" style={{ backgroundColor: p.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </>
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

