"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LogOut, LayoutDashboard, FolderOpen, Bell, Settings, 
  FileText, BarChart2, TrendingUp 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

const DOCS = [
  { name: "Mẫu kịch bản video TikTok", type: "PDF", date: "01/04/2026" },
  { name: "Báo cáo Ads Facebook tháng 3", type: "Excel", date: "05/04/2026" },
  { name: "Hướng dẫn tạo content chuẩn SEO", type: "PDF", date: "08/04/2026" },
  { name: "Bộ ảnh template Zalo OA", type: "ZIP", date: "10/04/2026" },
];

const NOTIFICATIONS = [
  { msg: "Chiến dịch Facebook Ads tháng 4 đã được kích hoạt", time: "2 giờ trước", unread: true },
  { msg: "Báo cáo tuần 14 đã sẵn sàng để tải xuống", time: "1 ngày trước", unread: true },
  { msg: "Fanpage đạt 500 Like mới trong tuần", time: "3 ngày trước", unread: false },
];

const NAV = [
  { id: "overview", label: "Tổng quan", icon: LayoutDashboard },
  { id: "projects", label: "Dự án", icon: FolderOpen },
  { id: "docs", label: "Tài liệu", icon: FileText },
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const user = { name: "Admin", phone: "0900000000" };

  const SIN_DATA = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    views: Math.floor(300 + 150 * Math.sin((i / 24) * 2 * Math.PI) + Math.random() * 50)
  }));

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-card p-6 md:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">BPM</div>
          <span className="font-bold text-white text-sm">Bứt Phá Marketing</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${activeTab === n.id ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <n.icon size={16} />
              {n.label}
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">
          <LogOut size={16} />
          Đăng xuất
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Xin chào, {user.name}!</h1>
            <p className="text-sm text-gray-400">Chào mừng trở lại trang thành viên</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {user.name[0]}
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Project progress */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                <BarChart2 size={18} className="text-primary" />
                Tiến Độ Dự Án
              </h2>
              {[
                { name: "Fanpage Facebook - Chăm sóc nội dung", progress: 60, detail: "Đang lên bài viết ngày 18/30", color: "#1877F2" },
                { name: "TikTok Ads - Chiến dịch tháng 4", progress: 35, detail: "Giai đoạn: Tối ưu target", color: "#FF0050" },
                { name: "SEO Website - Từ khóa địa phương", progress: 80, detail: "8/10 từ khóa đã vào trang 2", color: "#34A853" },
              ].map((p, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{p.name}</span>
                    <span className="text-xs text-gray-400">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ delay: i * 0.2, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Lượt tiếp cận/tuần", value: "12.4K", change: "+18%" },
                { label: "Tương tác/tuần", value: "847", change: "+24%" },
                { label: "Leads tháng này", value: "32", change: "+11%" },
                { label: "Chi phí/lead", value: "142K", change: "-8%" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-card p-5">
                  <p className="mb-1 text-2xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className={`mt-1 text-xs font-semibold ${s.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{s.change}</p>
                </div>
              ))}
            </div>

            {/* Sine Wave Chart */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <TrendingUp size={18} className="text-primary" />
                    Hiệu Quả Chiến Dịch
                  </h2>
                  <p className="text-xs text-gray-500">Biểu đồ hình sin phân tích lượt tiếp cận (24 giờ)</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SIN_DATA}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }}
                      itemStyle={{ color: "#A855F7" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#A855F7" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorViews)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent docs */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-white">Tài liệu mới nhất</h2>
              <div className="space-y-3">
                {DOCS.slice(0, 3).map((d, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-bold text-primary">{d.type}</div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-white">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.date}</p>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">Tải xuống</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeTab !== "overview") && (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/10 bg-card">
            <p className="text-gray-400">Tính năng đang được phát triển</p>
          </div>
        )}
      </main>
    </div>
  );
}
