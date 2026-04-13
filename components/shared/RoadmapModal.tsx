import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2, Clock, ArrowRight, Lock, User, Key, BarChart2, FileText, Send, Image as ImageIcon } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { db, type ClientPortal, type ProgressArticle } from "@/lib/useData";

export function RoadmapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { settings } = useAdmin();
  const [client, setClient] = useState<ClientPortal | null>(null);
  const [articles, setArticles] = useState<ProgressArticle[]>([]);
  const [authForm, setAuthForm] = useState({ username: "", password: "", platform: "facebook" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PLATFORMS_DYNAMIC = [
    { key: "facebook", label: settings.platformNames?.facebook || "Facebook" },
    { key: "tiktok", label: settings.platformNames?.tiktok || "TikTok" },
    { key: "instagram", label: settings.platformNames?.instagram || "Instagram" },
    { key: "zalo", label: settings.platformNames?.zalo || "Zalo" },
    { key: "googlemaps", label: settings.platformNames?.googlemaps || "Google Maps" },
    { key: "website", label: settings.platformNames?.website || "Website" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await db.clientPortals.login(authForm.username, authForm.password);
      if (res) {
        setClient(res);
        const arts = await db.progressArticles.getByClient(res.id);
        setArticles(arts);
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-6 top-6 z-10 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        {!client ? (
          <div className="p-8 md:p-12">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-black text-white">Tra Cứu Lộ Trình</h2>
              <p className="mt-2 text-gray-400 text-sm">Vui lòng nhập tài khoản do Bứt Phá Marketing cấp để xem tiến độ dự án của bạn.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <BarChart2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select
                  required
                  value={authForm.platform}
                  onChange={e => setAuthForm({...authForm, platform: e.target.value})}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary"
                >
                  {PLATFORMS_DYNAMIC.map(p => (
                    <option key={p.key} value={p.key} className="bg-card">{p.label}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  value={authForm.username}
                  onChange={e => setAuthForm({...authForm, username: e.target.value})}
                  placeholder="Tên đăng nhập" 
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary" 
                />
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  type="password"
                  value={authForm.password}
                  onChange={e => setAuthForm({...authForm, password: e.target.value})}
                  placeholder="Mật khẩu" 
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary" 
                />
              </div>
              {error && <p className="text-center text-xs font-bold text-red-400">{error}</p>}
              <button 
                disabled={loading}
                className="w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {loading ? "ĐANG KIỂM TRA..." : "XÁC NHẬN TRUY CẬP"}
              </button>
            </form>
            
            <p className="mt-8 text-center text-xs text-gray-500">
              Chưa có tài khoản? <button onClick={onClose} className="text-primary hover:underline">Liên hệ quản trị viên</button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-[85vh] md:h-auto overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-white">Chào {client.clientName}!</h2>
                <button onClick={() => setClient(null)} className="text-[10px] font-bold text-gray-500 uppercase hover:text-white">Đăng xuất</button>
              </div>
              <p className="text-sm text-gray-400">Dưới đây là tiến độ thực tế của dự án của bạn.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              {/* Articles (Project Progress) */}
              <div className="space-y-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText size={18} className="text-primary" /> Tiến độ dự án
                </h3>
                {articles.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">
                    Chưa có bài cập nhật tiến độ nào.
                  </div>
                ) : (
                  articles.map((art) => (
                    <div key={art.id} className="rounded-2xl border border-white/5 bg-white/5 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">{art.title}</h4>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{new Date(art.createdAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{art.content}</p>
                      {art.image && (
                        <img src={art.image} alt="Progress" className="w-full rounded-xl border border-white/10 object-cover max-h-80" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 text-center">
              <button onClick={onClose} className="text-sm font-bold text-white hover:text-primary transition-colors">QUAY LẠI TRANG CHỦ</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

