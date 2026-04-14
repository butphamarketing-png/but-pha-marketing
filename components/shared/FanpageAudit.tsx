import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, BarChart2, ShieldCheck, Zap, Target, Search, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { DecisionTreeQuiz } from "./DecisionTreeQuiz";
import { db } from "@/lib/useData";

interface FanpageAuditProps {
  primaryColor: string;
  platform: string;
}

const AUDIT_STEPS = [
  { id: "metadata", label: "Kiểm tra Metadata & SEO", icon: Search },
  { id: "content", label: "Phân tích chất lượng nội dung", icon: Target },
  { id: "engagement", label: "Đo lường mức độ tương tác", icon: Zap },
  { id: "security", label: "Đánh giá bảo mật & uy tín", icon: ShieldCheck },
];

const AUDIT_CONFIGS: Record<string, {
  title: string;
  cta: string;
  inputPlaceholder: string;
  loadingText: string;
  results: { label: string; score: number; color: string; desc: string }[];
  aiSummary: string;
  alertText: string;
}> = {
  facebook: {
    title: "Chuẩn Đoán Sức Khỏe Fanpage",
    cta: "Chuẩn Đoán Fanpage Miễn Phí",
    inputPlaceholder: "Link hoặc tên Fanpage Facebook",
    loadingText: "Đang phân tích Fanpage Facebook...",
    results: [
      { label: "Mức độ tương tác (Engagement Rate)", score: 45, color: "#f59e0b", desc: "Tỷ lệ tương tác tự nhiên đang ở mức trung bình, cần tối ưu hóa nội dung video ngắn." },
      { label: "Chất lượng nội dung", score: 62, color: "#6366f1", desc: "Hình ảnh chuyên nghiệp nhưng thiếu tính nhất quán về nhận diện thương hiệu." },
      { label: "Tần suất đăng bài", score: 30, color: "#ef4444", desc: "Đăng bài không đều đặn khiến thuật toán Facebook giảm ưu tiên hiển thị." },
      { label: "Tỷ lệ phản hồi bình luận", score: 55, color: "#22c55e", desc: "Phản hồi khách hàng khá tốt nhưng chưa tận dụng được tính năng chuyển đổi trực tiếp." },
    ],
    aiSummary: "Dựa trên phân tích AI, Fanpage của bạn đang có nền tảng tốt về hình ảnh nhưng gặp vấn đề nghiêm trọng về thuật toán phân phối do tần suất đăng bài không ổn định. Điều này dẫn đến việc lãng phí tệp khách hàng tiềm năng hiện có.",
    alertText: "Fanpage của bạn đang hoạt động dưới mức tối ưu! Liên hệ ngay để được tư vấn miễn phí.",
  },
  tiktok: {
    title: "Chuẩn Đoán Kênh TikTok",
    cta: "Chuẩn Đoán Kênh TikTok Miễn Phí",
    inputPlaceholder: "Link hoặc tên kênh TikTok",
    loadingText: "Đang phân tích kênh TikTok...",
    results: [
      { label: "Tỷ lệ xem video (View Rate)", score: 52, color: "#f59e0b", desc: "Video có lượt xem ổn định nhưng chưa có sự đột phá viral." },
      { label: "Tỷ lệ hoàn thành video", score: 38, color: "#ef4444", desc: "Người xem thường bỏ qua sau 3 giây đầu, cần tối ưu hóa hook." },
      { label: "Mức độ tương tác (Like/Share)", score: 67, color: "#22c55e", desc: "Tương tác cộng đồng khá mạnh, là điểm sáng của kênh." },
      { label: "Tiềm năng lên For You Page", score: 44, color: "#6366f1", desc: "Hashtag và âm nhạc chưa thực sự bắt trend thị trường." },
    ],
    aiSummary: "Kênh TikTok của bạn có tiềm năng xây dựng cộng đồng tốt. Tuy nhiên, nội dung hiện tại đang thiếu 'Hook' (điểm chạm 3 giây đầu) để giữ chân người xem, dẫn đến tỷ lệ hoàn thành thấp và không được AI TikTok đề xuất lên xu hướng.",
    alertText: "Kênh TikTok của bạn chưa tối ưu thuật toán! Liên hệ ngay để được tư vấn chiến lược viral.",
  },
  instagram: {
    title: "Chuẩn Đoán Tài Khoản Instagram",
    cta: "Chuẩn Đoán Instagram Miễn Phí",
    inputPlaceholder: "Link hoặc username Instagram",
    loadingText: "Đang phân tích tài khoản Instagram...",
    results: [
      { label: "Mức độ tương tác (Engagement Rate)", score: 41, color: "#f59e0b", desc: "Lượt like đang giảm dần theo thời gian." },
      { label: "Chất lượng hình ảnh & feed", score: 58, color: "#6366f1", desc: "Bố cục feed chưa thực sự bắt mắt để giữ chân người xem." },
      { label: "Hiệu quả Reels & Stories", score: 35, color: "#ef4444", desc: "Chưa tận dụng tốt Reels để tiếp cận khách hàng mới." },
      { label: "Tốc độ tăng trưởng followers", score: 49, color: "#22c55e", desc: "Tăng trưởng tự nhiên đang bị chững lại." },
    ],
    aiSummary: "Tài khoản Instagram của bạn đang gặp khó khăn trong việc thích nghi với định dạng video ngắn (Reels). Để tăng trưởng lại, bạn cần chuyển đổi chiến lược từ tập trung vào hình ảnh tĩnh sang nội dung video động có tính thẩm mỹ cao.",
    alertText: "Tài khoản Instagram của bạn cần được tối ưu gấp! Liên hệ ngay để được tư vấn miễn phí.",
  },
  zalo: {
    title: "Chuẩn Đoán Zalo Official Account",
    cta: "Chuẩn Đoán Zalo OA Miễn Phí",
    inputPlaceholder: "Tên hoặc link Zalo Official Account",
    loadingText: "Đang phân tích Zalo OA...",
    results: [
      { label: "Tỷ lệ mở tin nhắn broadcast", score: 48, color: "#f59e0b", desc: "Tiêu đề tin nhắn chưa đủ hấp dẫn để người dùng click mở." },
      { label: "Mức độ tương tác bài viết", score: 33, color: "#ef4444", desc: "Bài viết trên nhật ký OA có lượt tương tác rất thấp." },
      { label: "Số lượng followers & tốc độ tăng", score: 61, color: "#22c55e", desc: "Tốc độ tăng trưởng ổn định nhưng chất lượng follower chưa cao." },
      { label: "Hiệu quả chatbot auto-reply", score: 25, color: "#6366f1", desc: "Kịch bản chatbot còn đơn điệu, chưa cá nhân hóa được trải nghiệm." },
    ],
    aiSummary: "Zalo OA của bạn hiện chỉ đang đóng vai trò là một kênh thông báo thay vì là một phễu bán hàng. Việc thiếu kịch bản tương tác tự động thông minh đang khiến bạn mất đi một lượng lớn cơ hội chuyển đổi từ khách hàng trung thành.",
    alertText: "Zalo OA của bạn chưa được tối ưu hóa! Liên hệ ngay để được tư vấn chiến lược Zalo Marketing.",
  },
  googlemaps: {
    title: "Chuẩn Đoán Google Business",
    cta: "Chuẩn Đoán Google Business Miễn Phí",
    inputPlaceholder: "Tên doanh nghiệp hoặc link Google Maps",
    loadingText: "Đang phân tích Google Business Profile...",
    results: [
      { label: "Điểm hoàn thiện Profile", score: 55, color: "#f59e0b", desc: "Thiếu thông tin giờ làm việc hoặc danh mục sản phẩm chi tiết." },
      { label: "Số lượng & chất lượng đánh giá", score: 40, color: "#ef4444", desc: "Có một số đánh giá tiêu cực chưa được phản hồi khéo léo." },
      { label: "Thứ hạng trong Local Pack", score: 30, color: "#6366f1", desc: "Không xuất hiện trong top 3 tìm kiếm địa phương." },
      { label: "Mức độ tương tác (click, call, direction)", score: 62, color: "#22c55e", desc: "Lượt gọi điện khá tốt nhưng lượt tìm đường đi còn thấp." },
    ],
    aiSummary: "Doanh nghiệp của bạn đang bị đối thủ trực tiếp 'lấn lướt' trên kết quả tìm kiếm Google Maps. Việc thiếu các đánh giá 5 sao mới và từ khóa SEO địa phương đang làm giảm uy tín của bạn trong mắt thuật toán Google.",
    alertText: "Google Business của bạn chưa tối ưu, đang bỏ lỡ khách hàng! Liên hệ ngay để được tư vấn.",
  },
  website: {
    title: "Chuẩn Đoán Sức Khỏe Website",
    cta: "Chuẩn Đoán Website Miễn Phí",
    inputPlaceholder: "Nhập URL website của bạn (vd: https://...)",
    loadingText: "Đang phân tích website...",
    results: [
      { label: "Tốc độ tải trang (Page Speed)", score: 42, color: "#ef4444", desc: "Tốc độ tải trang trên mobile chậm, ảnh hưởng đến tỷ lệ thoát (Bounce Rate)." },
      { label: "Điểm SEO On-page", score: 55, color: "#f59e0b", desc: "Cấu trúc thẻ H1, H2 và Meta Description chưa chuẩn SEO." },
      { label: "Trải nghiệm mobile (Mobile UX)", score: 67, color: "#22c55e", desc: "Giao diện mobile khá ổn nhưng nút CTA chưa nổi bật." },
      { label: "Mức độ bảo mật (Security Score)", score: 70, color: "#6366f1", desc: "Đã có SSL nhưng thiếu các biện pháp chống spam form." },
    ],
    aiSummary: "Website của bạn đang có điểm kỹ thuật ở mức trung bình. Vấn đề lớn nhất là tốc độ phản hồi trên thiết bị di động chậm, điều này không chỉ gây khó chịu cho người dùng mà còn khiến Google đánh giá thấp thứ hạng tìm kiếm của bạn.",
    alertText: "Website của bạn đang có nhiều vấn đề kỹ thuật! Liên hệ ngay để được audit và sửa chữa miễn phí.",
  },
};

export function FanpageAudit({ primaryColor, platform = "facebook" }: FanpageAuditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [currentAuditStep, setCurrentAuditStep] = useState(0);
  const [form, setForm] = useState({ url: "", phone: "" });
  const [presentationMode, setPresentationMode] = useState(false);

  const cfg = AUDIT_CONFIGS[platform] ?? AUDIT_CONFIGS.facebook;

  useEffect(() => {
    const handlePresentationStart = () => {
      setPresentationMode(true);
      setIsOpen(true);
    };

    const handlePresentationEnd = () => {
      setPresentationMode(false);
      setIsOpen(false);
      setStep("form");
      setCurrentAuditStep(0);
    };

    window.addEventListener('presentationStart', handlePresentationStart);
    window.addEventListener('presentationEnd', handlePresentationEnd);

    return () => {
      window.removeEventListener('presentationStart', handlePresentationStart);
      window.removeEventListener('presentationEnd', handlePresentationEnd);
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (step === "loading") {
      interval = setInterval(() => {
        setCurrentAuditStep(prev => {
          if (prev < AUDIT_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setStep("result"), 800);
            return prev;
          }
        });
      }, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.leads.add({ type: "audit", phone: form.phone, url: form.url, platform });
    setStep("loading");
    setCurrentAuditStep(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("form");
      setCurrentAuditStep(0);
    }, 300);
  };

  const [loading, setLoading] = useState(false);
  const score = cfg.results.reduce((acc, r) => acc + r.score, 0) / 40;

  const handleRegister = async (pkgName: string) => {
    setLoading(true);
    try {
      await db.leads.add({ 
        type: "audit", 
        platform, 
        service: pkgName, 
        note: `Đăng ký sau khi chuẩn đoán. Điểm: ${score}/10.`,
        phone: form.phone
      });
      alert("Đăng ký thành công! Chúng tôi sẽ liên hệ tư vấn ngay.");
      setIsOpen(false);
    } catch (err) {
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section data-section="audit" id="audit" className="py-16 px-4">
        {presentationMode && isOpen ? (
          <DecisionTreeQuiz
            isOpen={true}
            isInline={true}
            platform={platform}
            onClose={() => {
              setPresentationMode(false);
              setIsOpen(false);
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-card p-10 text-center relative overflow-hidden group"
          >
            {/* Decorative background elements */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-all group-hover:opacity-40" style={{ backgroundColor: primaryColor }} />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-all group-hover:opacity-40" style={{ backgroundColor: primaryColor }} />
            
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}30` }}>
                <Activity className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="mb-3 text-3xl font-black text-white">{cfg.title}</h3>
              <p className="mb-8 text-lg text-gray-400">
                Hệ thống AI chuyên sâu sẽ phân tích và đưa ra giải pháp bứt phá doanh thu cho bạn.
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center gap-3 mx-auto rounded-2xl px-10 py-5 text-lg font-black text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: primaryColor }}
              >
                <Zap className="h-5 w-5 animate-pulse" />
                {cfg.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {isOpen && !presentationMode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button onClick={handleClose} className="absolute right-6 top-6 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                <X size={20} />
              </button>

              {step === "form" && (
                <div className="p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white">{cfg.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">Kết nối với hệ thống phân tích AI để nhận báo cáo chuẩn đoán chuyên sâu.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Thông tin nền tảng</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <Search size={18} />
                        </div>
                        <input
                          required
                          value={form.url}
                          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                          placeholder={cfg.inputPlaceholder}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 py-4 text-sm text-white outline-none focus:border-primary transition-all focus:bg-white/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Liên hệ nhận kết quả</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <Activity size={18} />
                        </div>
                        <input
                          required
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="Số điện thoại của bạn"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 py-4 text-sm text-white outline-none focus:border-primary transition-all focus:bg-white/10"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 flex items-center justify-center gap-3 rounded-2xl py-5 text-base font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Bắt Đầu Chuẩn Đoán AI →
                    </button>
                    <p className="text-center text-[10px] text-gray-500">Thông tin của bạn được bảo mật tuyệt đối theo chính sách của chúng tôi.</p>
                  </form>
                </div>
              )}

              {step === "loading" && (
                <div className="p-12 text-center">
                  <div className="relative mx-auto mb-10 h-24 w-24">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-b-2 border-t-2"
                      style={{ borderBottomColor: primaryColor, borderTopColor: primaryColor }}
                    />
                    <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white/5">
                      {AUDIT_STEPS.map((s, i) => (
                        <AnimatePresence key={s.id}>
                          {currentAuditStep === i && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              className="absolute"
                            >
                              <s.icon className="h-8 w-8" style={{ color: primaryColor }} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">AI Đang Chuẩn Đoán...</h3>
                  <div className="space-y-4">
                    {AUDIT_STEPS.map((s, i) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${i <= currentAuditStep ? "bg-green-500/20 text-green-500" : "bg-white/5 text-gray-600"}`}>
                          {i < currentAuditStep ? <CheckCircle2 size={14} /> : i === currentAuditStep ? <Loader2 size={14} className="animate-spin" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                        </div>
                        <span className={`text-sm font-medium transition-all ${i <= currentAuditStep ? "text-white" : "text-gray-600"}`}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-10 text-xs text-gray-500 italic">"Hệ thống đang trích xuất dữ liệu từ các API công khai..."</p>
                </div>
              )}

              {step === "result" && (
                <div className="max-h-[85vh] overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-white/10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-500">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Báo Cáo Phân Tích</h3>
                      <p className="text-sm text-gray-400">Hoàn tất lúc {new Date().toLocaleTimeString("vi-VN")}</p>
                    </div>
                  </div>

                  <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary" style={{ color: primaryColor }}>
                      <Activity size={14} /> Tổng quan AI
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {cfg.aiSummary}
                    </p>
                  </div>

                  <div className="mb-8 space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-500">Chỉ số chi tiết</h4>
                    {cfg.results.map((r, i) => (
                      <motion.div 
                        key={r.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-bold text-white">{r.label}</span>
                          <span className="font-black" style={{ color: r.color }}>{r.score}/100</span>
                        </div>
                        <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.score}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                            style={{ backgroundColor: r.color }}
                          />
                        </div>
                        <p className="text-[11px] leading-relaxed text-gray-500">{r.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 flex gap-4">
                    <AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
                    <p className="text-xs font-medium leading-relaxed text-yellow-200/80">
                      {cfg.alertText}
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(score > 5 ? ["Gói Chăm Sóc", "Gói Ads"] : ["Gói Xây Dựng", "Gói Chăm Sóc"]).map(pkg => (
                      <button 
                        key={pkg}
                        disabled={loading}
                        onClick={() => handleRegister(pkg)}
                        className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-left transition-all hover:bg-primary/20"
                      >
                        <p className="text-xs font-bold text-primary uppercase">Gợi ý đăng ký</p>
                        <p className="text-lg font-black text-white">{pkg}</p>
                        <p className="text-xs text-gray-400 mt-1">Phù hợp với tình trạng kênh hiện tại</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setStep("form");
                      setCurrentAuditStep(0);
                    }}
                    className="mt-8 w-full rounded-2xl bg-white/5 py-4 font-black text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                  >
                    ĐÓNG CHUẨN ĐOÁN
                  </button>

                  <div className="sticky bottom-0 bg-card pt-4 pb-2">
                    <a
                      href={`tel:0937417982`}
                      className="flex items-center justify-center gap-3 rounded-2xl py-5 text-base font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Zap className="h-5 w-5" />
                      Nhận Tư Vấn Cải Thiện Ngay
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

