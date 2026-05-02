import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/useData";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLink: string;
  source: string;
  platformColor?: string;
}

export function AuditModal({ isOpen, onClose, initialLink, source, platformColor = "#6B21A8" }: AuditModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    link: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm(prev => ({ ...prev, link: initialLink }));
    }
  }, [isOpen, initialLink]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.leads.add({ 
        type: "audit", 
        name: form.name, 
        phone: form.phone, 
        note: `Nguồn: ${source} | Link cần phân tích: ${form.link}` 
      });
      setStep("success");
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg my-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0a1a] p-8 shadow-2xl"
          style={{ boxShadow: `0 20px 50px -10px ${platformColor}40` }}
        >
          <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-white z-10 transition-colors">
            <X size={24} />
          </button>
          
          {step === "form" ? (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10" style={{ color: platformColor }}>
                  <Search size={32} />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Thông tin kiểm tra</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Sau khi kiểm tra xong chúng tôi sẽ gửi báo cáo cho bạn qua Zalo
                </p>
              </div>
              
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Link cần phân tích</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Link website / Fanpage..." 
                    value={form.link}
                    onChange={e => setForm(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-white/30 transition-all" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Họ và tên *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Nhập họ và tên của bạn" 
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-white/30 transition-all" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Số điện thoại (Zalo) *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="Nhập số điện thoại để nhận báo cáo" 
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-white/30 transition-all" 
                  />
                </div>
                
                <button 
                  disabled={loading}
                  type="submit" 
                  className="mt-4 w-full rounded-xl py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-xl" 
                  style={{ backgroundColor: platformColor }}
                >
                  {loading ? "Đang xử lý..." : "Xác nhận & Nhận báo cáo"}
                </button>
                <p className="text-center text-[10px] text-gray-500 italic opacity-60">Dữ liệu của bạn được mã hóa và bảo mật tuyệt đối.</p>
              </form>
            </>
          ) : (
            <div className="py-10 text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Gửi yêu cầu thành công!</h2>
                <p className="text-gray-400 text-sm leading-relaxed px-6">
                  Chúng tôi đã tiếp nhận yêu cầu phân tích của bạn. Chuyên viên sẽ gửi báo cáo chi tiết qua Zalo trong thời gian sớm nhất.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="mx-auto px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                Đóng cửa sổ
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
