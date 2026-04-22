"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, FolderOpen, TrendingUp, FileText, Star, Settings, Menu, X, ChevronRight, Send, Upload, Phone, Mail, MapPin, Globe, Building2, ExternalLink, Bell } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, type ClientPortal } from "@/lib/useData";

const PLATFORM_PATHS: Record<string, string> = {
  facebook: "/facebook",
  tiktok: "/tiktok",
  instagram: "/instagram",
  zalo: "/zalo",
  googlemaps: "/google-maps",
  website: "/website",
};

const NAV = [
  { id: "info", label: "Thông tin dự án", icon: FolderOpen },
  { id: "progress", label: "Tiến độ dự án", icon: TrendingUp },
  { id: "report", label: "Báo cáo dự án", icon: FileText },
  { id: "request", label: "Yêu cầu khách hàng", icon: Send },
  { id: "renew", label: "Gia hạn dự án", icon: Bell },
  { id: "review", label: "Đánh giá", icon: Star },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

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

function normalizeProjects(portal: ClientPortal | null): ClientProject[] {
  if (!portal) return [];
  const raw = (portal.weeklyReports || []) as any[];
  if (raw.length === 0) return [];
  return raw.map((item: any, idx: number) => ({
    id: item.id || String(idx + 1),
    title: item.title || `Dự án ${idx + 1}`,
    registeredAt: item.registeredAt || "",
    deadlineAt: item.deadlineAt || "",
    budgetVnd: Number(item.budgetVnd || 0),
    infoDoc: item.infoDoc || item.progressDoc || "",
    progressDoc: item.progressDoc || "",
    resultDoc: item.resultDoc || "",
  }));
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button" onClick={() => onChange(i + 1)}>
          <Star size={28} className={i < value ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
        </button>
      ))}
    </div>
  );
}

function DashboardContent() {
  const { user, isLoaded, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [portal, setPortal] = useState<ClientPortal | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [projects, setProjects] = useState<ClientProject[]>([]);

  // Request form
  const [reqContent, setReqContent] = useState("");
  const [reqImage, setReqImage] = useState("");
  const [reqSent, setReqSent] = useState(false);

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewLogoUrl, setReviewLogoUrl] = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  useEffect(() => {
    const portalId = user?.portalId;
    if (!portalId) return;
    db.clientPortals.get(portalId).then(r => {
      if (r.data) {
        setPortal(r.data);
        const p = normalizeProjects(r.data);
        setProjects(p);
        setSelectedProjectId(p[0]?.id || "");
      }
    });
  }, [user?.portalId]);

  useEffect(() => {
    if (isLoaded && user === null) router.push("/");
  }, [isLoaded, user, router]);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0] || null;

  const handleSendRequest = async () => {
    if (!reqContent.trim()) return;
    await db.leads.add({
      type: "contact",
      name: user?.name || "",
      phone: user?.phone || "",
      service: "Yêu cầu khách hàng",
      note: reqContent + (reqImage ? `\n[Hình ảnh: ${reqImage}]` : ""),
    });
    setReqSent(true);
    setReqContent("");
    setReqImage("");
  };

  const handleSendReview = async () => {
    if (!reviewContent.trim()) return;
    await db.clientReviews.add({
      clientId: portal?.id || "",
      clientName: user?.name || "",
      logoUrl: reviewLogoUrl || undefined,
      rating: reviewRating,
      content: reviewContent,
    });
    setReviewSent(true);
  };

  const tickerText = portal?.tickerText || "";

  return (
    <div className="flex min-h-screen bg-[#0a0510] text-foreground font-sans">
      {/* Sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-white/5 bg-[#120a1d]/90 backdrop-blur-xl p-6 transition-transform duration-300 md:relative md:flex md:translate-x-0 ${isSidebarOpen ? "flex translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">BPM</div>
            <div>
              <span className="font-black text-white text-sm tracking-tight block">BUT PHA</span>
              <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Marketing</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white md:hidden"><X size={20} /></button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setActiveTab(n.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${activeTab === n.id ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              <n.icon size={18} />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white text-sm">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-bold text-white">{user?.name || "Khách hàng"}</p>
              <p className="truncate text-[10px] text-gray-500">Lộ trình dự án</p>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Ticker */}
        {tickerText && (
          <div className="bg-primary/90 text-white text-xs font-bold py-2 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-[marquee_20s_linear_infinite]">
              {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
            </div>
          </div>
        )}

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#0a0510]/80 px-6 py-4 backdrop-blur-md">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white md:hidden"><Menu size={24} /></button>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-white">{NAV.find(n => n.id === activeTab)?.label}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center text-xs font-black text-white">
              {user?.name?.[0] || "A"}
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">
          {/* Project selector (shown on info/progress/report tabs) */}
          {["info", "progress", "report"].includes(activeTab) && projects.length > 0 && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {projects.map(p => (
                <button key={p.id} onClick={() => setSelectedProjectId(p.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${selectedProjectId === p.id ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}>
                  {p.title}
                </button>
              ))}
            </div>
          )}

          {/* TAB: Thông tin dự án */}
          {activeTab === "info" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-4">Thông tin dự án</h2>
              {selectedProject ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs text-gray-400 mb-1">Tên dự án</p>
                      <p className="font-bold text-white">{selectedProject.title}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs text-gray-400 mb-1">Ngày đăng ký</p>
                      <p className="font-bold text-white">{selectedProject.registeredAt ? new Date(selectedProject.registeredAt).toLocaleDateString("vi-VN") : "--"}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs text-gray-400 mb-1">Deadline</p>
                      <p className="font-bold text-white">{selectedProject.deadlineAt ? new Date(selectedProject.deadlineAt).toLocaleDateString("vi-VN") : "--"}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs text-gray-400 mb-1">Ngân sách</p>
                      <p className="font-bold text-white">{selectedProject.budgetVnd ? selectedProject.budgetVnd.toLocaleString("vi-VN") + "đ" : "--"}</p>
                    </div>
                  </div>
                  {selectedProject.infoDoc && selectedProject.infoDoc !== "<p></p>" && (
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-xs text-gray-400 mb-2">Chi tiết</p>
                      <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedProject.infoDoc }} />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Chưa có thông tin dự án.</p>
              )}
            </div>
          )}

          {/* TAB: Tiến độ dự án */}
          {activeTab === "progress" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-4">Tiến độ dự án</h2>
              {selectedProject?.progressDoc && selectedProject.progressDoc !== "<p></p>" ? (
                <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedProject.progressDoc }} />
              ) : (
                <p className="text-gray-400 text-sm">Chưa có cập nhật tiến độ.</p>
              )}
            </div>
          )}

          {/* TAB: Báo cáo dự án */}
          {activeTab === "report" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-4">Báo cáo dự án</h2>
              {selectedProject?.resultDoc && selectedProject.resultDoc !== "<p></p>" ? (
                <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedProject.resultDoc }} />
              ) : (
                <p className="text-gray-400 text-sm">Chưa có báo cáo.</p>
              )}
            </div>
          )}

          {/* TAB: Yêu cầu khách hàng */}
          {activeTab === "request" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-2">Yêu cầu khách hàng</h2>
              <p className="text-sm text-gray-400 mb-6">Gửi yêu cầu, góp ý hoặc nội dung bạn muốn đăng lên nền tảng.</p>
              {reqSent ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-bold text-white">Đã gửi yêu cầu!</p>
                  <p className="text-sm text-gray-400 mt-1">Đội ngũ sẽ xử lý trong thời gian sớm nhất.</p>
                  <button onClick={() => setReqSent(false)} className="mt-4 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white">Gửi thêm</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={reqContent}
                    onChange={e => setReqContent(e.target.value)}
                    placeholder="Nội dung yêu cầu, góp ý hoặc nội dung bạn muốn đăng..."
                    rows={6}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary resize-none"
                  />
                  <div>
                    <label className="text-xs font-bold text-gray-400 mb-1 block">Link hình ảnh (tùy chọn)</label>
                    <input
                      value={reqImage}
                      onChange={e => setReqImage(e.target.value)}
                      placeholder="https://... hoặc dán link hình ảnh"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                  {reqImage && (
                    <img src={reqImage} alt="preview" className="h-40 w-full object-cover rounded-xl" onError={e => (e.currentTarget.style.display = "none")} />
                  )}
                  <button
                    onClick={handleSendRequest}
                    disabled={!reqContent.trim()}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black text-white disabled:opacity-50 hover:bg-primary/90 transition-colors"
                  >
                    <Send size={16} /> Gửi yêu cầu
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: Gia hạn dự án */}
          {activeTab === "renew" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6 text-center">
              <h2 className="text-xl font-black text-white mb-2">Gia hạn dự án</h2>
              <p className="text-sm text-gray-400 mb-8">Chọn gói dịch vụ phù hợp để gia hạn hoặc nâng cấp dự án của bạn.</p>
              <a
                href={PLATFORM_PATHS[portal?.platform || "facebook"] || "/facebook"}
                className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-black text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
              >
                <Bell size={20} />
                Xem bảng giá dịch vụ
                <ChevronRight size={20} />
              </a>
              <p className="mt-4 text-xs text-gray-500">Bạn sẽ được chuyển đến trang dịch vụ {portal?.platform || ""}.</p>
            </div>
          )}

          {/* TAB: Đánh giá */}
          {activeTab === "review" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-2">Đánh giá dịch vụ</h2>
              <p className="text-sm text-gray-400 mb-6">Cảm nhận của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn.</p>
              {reviewSent ? (
                <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
                  <p className="text-3xl mb-2">⭐</p>
                  <p className="font-bold text-white">Cảm ơn bạn đã đánh giá!</p>
                  <p className="text-sm text-gray-400 mt-1">Đánh giá của bạn đã được ghi nhận.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-400 mb-2 block">Đánh giá sao</label>
                    <StarRating value={reviewRating} onChange={setReviewRating} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 mb-1 block">Link logo / ảnh đại diện (tùy chọn)</label>
                    <input
                      value={reviewLogoUrl}
                      onChange={e => setReviewLogoUrl(e.target.value)}
                      placeholder="https://... link logo công ty bạn"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 mb-1 block">Nội dung đánh giá</label>
                    <textarea
                      value={reviewContent}
                      onChange={e => setReviewContent(e.target.value)}
                      placeholder="Chia sẻ cảm nhận của bạn về dịch vụ..."
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendReview}
                    disabled={!reviewContent.trim()}
                    className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-sm font-black text-white disabled:opacity-50 hover:bg-yellow-400 transition-colors"
                  >
                    <Star size={16} /> Gửi đánh giá
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: Cài đặt */}
          {activeTab === "settings" && (
            <div className="rounded-3xl border border-white/10 bg-[#120a1d]/80 p-6">
              <h2 className="text-xl font-black text-white mb-6">Thông tin tài khoản</h2>
              <div className="space-y-4">
                {[
                  { icon: Building2, label: "Tên khách hàng", value: portal?.clientName },
                  { icon: Phone, label: "Số điện thoại", value: portal?.phone },
                  { icon: Mail, label: "Email", value: portal?.email },
                  { icon: MapPin, label: "Địa chỉ", value: portal?.address },
                  { icon: Building2, label: "Tên doanh nghiệp", value: portal?.businessName },
                  { icon: Globe, label: "Nền tảng đang hỗ trợ", value: portal?.platform },
                  { icon: ExternalLink, label: "Link nền tảng", value: portal?.platformLink },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="font-bold text-white">{item.value || "--"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
