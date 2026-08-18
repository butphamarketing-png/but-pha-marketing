import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle } from "lucide-react";
import { db } from "@/lib/useData";

export function ConsultModal({ isOpen, onClose, platformColor = "#6B21A8" }: { isOpen: boolean; onClose: () => void, platformColor?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    consultTime: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const notifyMascot = (message: string, durationMs = 6000) => {
    window.dispatchEvent(new CustomEvent("mascot-alert", { detail: { message, durationMs } }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      notifyMascot("Bạn chỉ cần để lại số điện thoại — đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn sớm nhất nhé!");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      notifyMascot("Số điện thoại đang bị trống");
      return;
    }
    setLoading(true);
    try {
      const noteParts = [
        form.email.trim() ? `Email: ${form.email.trim()}` : "",
        form.address.trim() ? `Địa chỉ: ${form.address.trim()}` : "",
        form.consultTime.trim() ? `Thời gian: ${form.consultTime.trim()}` : "",
        form.note.trim() ? `Nội dung: ${form.note.trim()}` : "",
      ].filter(Boolean);
      await db.leads.add({
        type: "contact",
        name: form.name.trim() || "Khách liên hệ",
        phone: form.phone.trim(),
        note: noteParts.join(" | "),
      });
      notifyMascot("Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn cho bạn sớm nhất.");
      onClose();
    } catch (err) {
      notifyMascot("Hiện chưa gửi được thông tin. Bạn thử lại giúp mình hoặc gọi trực tiếp cho đội ngũ tư vấn nhé!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="brand-modal-backdrop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="brand-modal-surface"
          style={{ boxShadow: `0 20px 50px -12px ${platformColor}35` }}
        >
          <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full p-1 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-900">
            <X size={20} />
          </button>
          
          <h2 className="mb-6 text-center text-2xl font-bold text-indigo-950">Đăng ký tư vấn trực tiếp</h2>
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Họ và tên" 
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="brand-input text-sm" 
              />
              <input 
                type="tel" 
                placeholder="Số điện thoại *" 
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                className="brand-input text-sm" 
              />
            </div>
            
            <input 
              type="email" 
              placeholder="Gmail (Email)" 
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="brand-input text-sm" 
            />

            <input 
              type="text" 
              placeholder="Địa chỉ tư vấn" 
              value={form.address}
              onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
              className="brand-input text-sm" 
            />

            <div className="space-y-1">
              <label className="ml-1 text-xs font-medium text-slate-500">Thời gian tư vấn mong muốn</label>
              <input 
                type="datetime-local" 
                value={form.consultTime}
                onChange={e => setForm(prev => ({ ...prev, consultTime: e.target.value }))}
                className="brand-input text-sm" 
              />
            </div>

            <textarea 
              placeholder="Nội dung bạn cần tư vấn" 
              value={form.note}
              onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
              rows={3} 
              className="brand-input text-sm" 
            />
            
            <button 
              disabled={loading}
              type="submit" 
              className="mt-2 w-full rounded-2xl py-4 text-sm font-semibold text-white transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50" 
              style={{ backgroundColor: platformColor }}
            >
              {loading ? "Đang xử lý..." : "Gửi yêu cầu tư vấn ngay"}
            </button>
            <p className="text-center text-[10px] text-gray-500 italic">Chúng tôi sẽ bảo mật thông tin của bạn tuyệt đối.</p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

