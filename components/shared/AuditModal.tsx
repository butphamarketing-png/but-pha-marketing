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
      <div className="brand-modal-backdrop">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="brand-modal-surface max-w-lg"
          style={{ boxShadow: `0 20px 50px -12px ${platformColor}35` }}
        >
          <button onClick={onClose} className="absolute right-6 top-6 z-10 rounded-full p-1 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-900">
            <X size={24} />
          </button>
          
          {step === "form" ? (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50" style={{ color: platformColor }}>
                  <Search size={32} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-indigo-950">Thông tin kiểm tra</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Sau khi kiểm tra xong chúng tôi sẽ gửi báo cáo cho bạn qua Zalo
                </p>
              </div>
              
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-medium text-slate-500">Link cần phân tích</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Link website / Fanpage..." 
                    value={form.link}
                    onChange={e => setForm(prev => ({ ...prev, link: e.target.value }))}
                    className="brand-input text-sm" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-medium text-slate-500">Họ và tên *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Nhập họ và tên của bạn" 
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="brand-input text-sm" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-medium text-slate-500">Số điện thoại (Zalo) *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="Nhập số điện thoại để nhận báo cáo" 
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="brand-input text-sm" 
                  />
                </div>
                
                <button 
                  disabled={loading}
                  type="submit" 
                  className="mt-4 w-full rounded-2xl py-5 text-sm font-semibold text-white transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 shadow-lg" 
                  style={{ backgroundColor: platformColor }}
                >
                  {loading ? "Đang xử lý..." : "Xác nhận & Nhận báo cáo"}
                </button>
                <p className="text-center text-[10px] italic text-slate-500">Dữ liệu của bạn được mã hóa và bảo mật tuyệt đối.</p>
              </form>
            </>
          ) : (
            <div className="space-y-6 py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-indigo-950">Gửi yêu cầu thành công!</h2>
                <p className="px-6 text-sm leading-relaxed text-slate-600">
                  Chúng tôi đã tiếp nhận yêu cầu phân tích của bạn. Chuyên viên sẽ gửi báo cáo chi tiết qua Zalo trong thời gian sớm nhất.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="brand-btn-secondary mx-auto"
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
