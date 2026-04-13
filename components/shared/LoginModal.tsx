import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ 
      name: tab === "register" ? formData.name : "Người dùng", 
      phone: formData.phone,
      email: formData.email
    });
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
        >
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          
          <div className="mb-6 flex border-b border-white/10">
            <button 
              className={`flex-1 pb-3 font-medium transition-colors ${tab === "login" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-gray-200"}`}
              onClick={() => setTab("login")}
            >
              Đăng nhập
            </button>
            <button 
              className={`flex-1 pb-3 font-medium transition-colors ${tab === "register" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-gray-200"}`}
              onClick={() => setTab("register")}
            >
              Đăng ký
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "register" && (
              <div>
                <label className="mb-1 block text-sm text-gray-300">Họ và tên</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm text-gray-300">Email hoặc Số điện thoại</label>
              <input 
                required
                type="text" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-300">Mật khẩu</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>
            <button 
              type="submit"
              className="mt-2 w-full rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(107,33,168,0.5)]"
            >
              {tab === "login" ? "Đăng nhập" : "Đăng ký thành viên"}
            </button>
            
            {tab === "login" && (
              <button 
                type="button"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Đăng nhập bằng Google
              </button>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


