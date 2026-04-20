import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, User, Key, BarChart2, FileText } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { db, type ClientPortal } from "@/lib/useData";

export function RoadmapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { settings } = useAdmin();
  const { login } = useAuth();
  const router = useRouter();
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
      const result = await db.clientPortals.login(authForm.username, authForm.password);
      if (result.error) {
        setError(result.error);
        return;
      }
      const res = result.data;
      if (res) {
        // Kiểm tra nền tảng
        if (res.platform !== authForm.platform) {
          setError(`Tài khoản này thuộc nền tảng ${res.platform.toUpperCase()}, vui lòng chọn đúng nền tảng.`);
          return;
        }

        login({
          name: res.clientName,
          email: res.username,
          phone: res.phone,
          portalId: res.id,
          platform: res.platform,
        });
        onClose();
        router.push("/dashboard");
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

        <div className="p-8 md:p-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-black text-white">Đăng Nhập</h2>
            <p className="mt-2 text-gray-400 text-sm">Vui lòng nhập tài khoản do Bứt Phá Marketing cấp để truy cập hệ thống.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {PLATFORMS_DYNAMIC.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setAuthForm({ ...authForm, platform: p.key })}
                  className={`flex-1 min-w-[100px] rounded-xl border py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                    authForm.platform === p.key
                      ? "border-primary bg-primary/20 text-white"
                      : "border-white/10 bg-white/5 text-gray-500 hover:border-white/20"
                  }`}
                >
                  {p.label}
                </button>
              ))}
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
              {loading ? "ĐANG KIỂM TRA..." : "ĐĂNG NHẬP"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            Chưa có tài khoản? <button onClick={onClose} className="text-primary hover:underline">Liên hệ quản trị viên</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

