"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, User, Key } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/useData";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, user } = useAuth();
  const { settings } = useAdmin();
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await db.clientPortals.login(formData.username, formData.password);
      if (result.error) {
        setError(result.error);
        return;
      }
      const res = result.data;
      if (res) {
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
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, redirect to dashboard
  const handleGoToDashboard = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="absolute right-6 top-6 z-10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {user ? (
              <div className="p-8 md:p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl font-black text-white">Xin chào, {user.name}!</h2>
                <p className="mt-2 text-gray-400 text-sm">Bạn đã đăng nhập. Nhấn để vào trang lộ trình dự án.</p>
                <button
                  onClick={handleGoToDashboard}
                  className="mt-6 w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
                >
                  Xem lộ trình dự án →
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Kiểm tra lộ trình</h2>
                  <p className="mt-2 text-gray-400 text-sm">
                    Nhập tài khoản do {settings?.title || "Bứt Phá Marketing"} cấp để xem tiến độ dự án của bạn.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Tên đăng nhập"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Mật khẩu"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  {error && <p className="text-center text-xs font-bold text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "ĐANG KIỂM TRA..." : "XEM LỘ TRÌNH DỰ ÁN →"}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                  Chưa có tài khoản?{" "}
                  <a href={`tel:${settings?.hotline || "0937417982"}`} className="text-primary hover:underline">
                    Liên hệ {settings?.hotline || "0937 417 982"}
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
