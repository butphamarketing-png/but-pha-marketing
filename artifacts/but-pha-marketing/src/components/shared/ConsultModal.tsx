import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle } from "lucide-react";
import { SiZalo } from "react-icons/si";
import { db } from "@/lib/useData";

export function ConsultModal({ isOpen, onClose, platformColor = "#6B21A8" }: { isOpen: boolean; onClose: () => void, platformColor?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.leads.add({ type: "contact", name, phone, note });
      alert("Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ sớm nhất.");
      onClose();
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
          style={{ boxShadow: `0 10px 40px -10px ${platformColor}40` }}
        >
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Nhận Tư Vấn Miễn Phí</h2>
          
          <div className="mb-6 grid grid-cols-3 gap-3">
            <a href="https://zalo.me/0937417982" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 transition-colors hover:bg-green-500/20 hover:text-green-400">
              <SiZalo className="mb-2 text-3xl text-green-500" />
              <span className="text-xs font-medium">Chat Zalo</span>
            </a>
            <a href="tel:0937417982" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 transition-colors hover:bg-blue-500/20 hover:text-blue-400">
              <Phone className="mb-2 text-3xl text-blue-500" />
              <span className="text-xs font-medium">Gọi điện</span>
            </a>
            <a href="https://m.me/" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 transition-colors hover:bg-blue-600/20 hover:text-blue-500">
              <MessageCircle className="mb-2 text-3xl text-blue-600" />
              <span className="text-xs font-medium">Messenger</span>
            </a>
          </div>
          
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative bg-card px-4 text-sm text-gray-400">Hoặc để lại thông tin</span>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input 
              required 
              type="text" 
              placeholder="Họ và tên" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            />
            <input 
              required 
              type="tel" 
              placeholder="Số điện thoại" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            />
            <textarea 
              placeholder="Ghi chú (Không bắt buộc)" 
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3} 
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
            />
            <button 
              disabled={loading}
              type="submit" 
              className="mt-2 w-full rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-50" 
              style={{ backgroundColor: platformColor }}
            >
              {loading ? "Đang gửi..." : "Gửi Yêu Cầu Tư Vấn"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
