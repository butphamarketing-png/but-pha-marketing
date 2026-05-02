"use client";

import { useState, useMemo } from "react";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { Check, Send, ChevronRight, MessageSquare, Target, Rocket, Settings, Sparkles, UserCheck, ShieldCheck, Zap } from "lucide-react";
import { db } from "@/lib/useData";

const config: PlatformConfig = {
  name: "Facebook",
  color: "#1877F2",
  auditPlatform: "facebook",
  heroTitle: "Fanpage không chỉ để đăng bài",
  heroSubtitle: "Mà để tạo ra khách hàng",
  heroDescription: "Tối ưu nội dung – Tăng tương tác – Chuyển đổi tin nhắn",
  vision: "Chúng tôi hướng đến trở thành đối tác chiến lược số 1 về Marketing Facebook tại Việt Nam, giúp hàng nghìn doanh nghiệp xây dựng sự hiện diện mạnh mẽ và bền vững trên nền tảng mạng xã hội lớn nhất thế giới.",
  mission: "Sứ mệnh của chúng tôi là mang lại giải pháp Facebook Marketing toàn diện, từ xây dựng Fanpage chuyên nghiệp đến triển khai chiến dịch quảng cáo hiệu quả, giúp doanh nghiệp tăng trưởng doanh thu bền vững.",
  responsibility: "Chúng tôi cam kết minh bạch trong từng đồng ngân sách, báo cáo kết quả thực tế hàng tuần, và chịu trách nhiệm hoàn toàn with hiệu quả mang lại cho khách hàng.",
  tabs: [],
  stats: [{ label: "Khách hàng", value: "500+" }, { label: "Dự án", value: "1.200+" }, { label: "Hài lòng", value: "98%" }, { label: "Năm KN", value: "5+" }],
  process: [
    { step: 1, title: "Tư vấn & Phân tích", desc: "Chúng tôi lắng nghe nhu cầu, phân tích thị trường và đề xuất giải pháp phù hợp nhất cho doanh nghiệp của bạn." },
    { step: 2, title: "Lên kế hoạch", desc: "Xây dựng kế hoạch nội dung chi tiết, chiến lược target khách hàng và lịch triển khai cụ thể." },
    { step: 3, title: "Triển khai", desc: "Thực hiện đúng kế hoạch, đăng bài đúng giờ, quản lý quảng cáo và tương tác với cộng đồng hàng ngày." },
    { step: 4, title: "Theo dõi & Tối ưu", desc: "Theo dõi số liệu thực tế, điều chỉnh chiến lược và tối ưu liên tục để đạt kết quả tốt nhất." },
    { step: 5, title: "Báo cáo & Tăng trưởng", desc: "Báo cáo minh bạch định kỳ, đề xuất hướng phát triển và mở rộng quy mô khi đã có kết quả ổn định." },
  ],
  faqs: [
    { q: "Bao lâu thì thấy kết quả từ Facebook Ads?", a: "Thông thường sau 7-14 ngày chạy Ads, bạn sẽ thấy kết quả ban đầu. Để tối ưu hoàn toàn thường cần 1-2 tháng để thuật toán học và tối ưu." },
    { q: "Fanpage cần bao nhiêu like mới chạy Ads hiệu quả?", a: "Không cần số lượng like tối thiểu. Tuy nhiên Fanpage có từ 1.000 like trở lên thường có độ tin cậy cao hơn và hiệu quả Ads tốt hơn." },
    { q: "Chi phí quảng cáo có được hoàn lại nếu không hiệu quả?", a: "Ngân sách Ads được chi trả trực tiếp cho Facebook. Chúng tôi cam kết tối ưu liên tục và báo cáo minh bạch, nếu không đạt KPI cam kết sẽ làm thêm 1 tháng miễn phí." },
    { q: "Có thể tự chạy Ads song song với gói dịch vụ không?", a: "Được. Chúng tôi sẽ tư vấn để tránh xung đột ngân sách và target, đảm bảo hiệu quả tổng thể tốt nhất." },
    { q: "Báo cáo kết quả như thế nào?", a: "Báo cáo hàng tuần qua Email/Messenger bao gồm: số lượt tiếp cận, tương tác, chuyển đổi, chi phí/kết quả và đề xuất tuần tiếp theo." },
  ],
};

export default function FacebookPage() {
  const [postsPerMonth, setPostsPerMonth] = useState(30);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    platform: "Fanpage",
    time: "",
    note: ""
  });

  const carePrice = useMemo(() => {
    return postsPerMonth * 150000;
  }, [postsPerMonth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    await db.leads.add({
      type: "contact",
      name: formData.name,
      phone: formData.phone,
      service: `Tư vấn ${formData.platform}`,
      note: `Thời gian: ${formData.time}\nGhi chú: ${formData.note}`,
      platform: "facebook"
    });
    setIsSubmitting(false);
    setFormSent(true);
  };

  return (
    <PlatformPage config={config}>
      <div className="mx-auto max-w-7xl px-4 pb-24 space-y-24">
        
        {/* 1. DỊCH VỤ XÂY DỰNG FANPAGE */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white">1. DỊCH VỤ XÂY DỰNG FANPAGE</h2>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                title: "CẢI TẠO FANPAGE", 
                price: "500.000đ", 
                icon: Settings,
                features: ["Thiết kế lại logo", "Thiết kế ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản"] 
              },
              { 
                title: "FANPAGE CƠ BẢN", 
                price: "1.000.000đ", 
                icon: UserCheck,
                features: ["Khởi tạo Fanpage chuyên nghiệp", "Thiết kế logo, ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản", "Hướng dẫn vận hành"] 
              },
              { 
                title: "FANPAGE NÂNG CAO", 
                price: "1.500.000đ", 
                icon: Rocket,
                bestSeller: true,
                features: ["Khởi tạo Fanpage chuyên nghiệp", "Thiết kế logo, ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage chuẩn", "Chat tự động cơ bản", "Chiến lược nội dung ban đầu"] 
              }
            ].map((pkg, i) => (
              <div key={i} className={`relative group rounded-[2.5rem] border p-8 transition-all hover:scale-[1.02] ${pkg.bestSeller ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                {pkg.bestSeller && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-blue-500/40">
                    <Sparkles size={12} /> BEST SELLER
                  </div>
                )}
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${pkg.bestSeller ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'}`}>
                      <pkg.icon size={32} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-black text-white">{pkg.title}</h3>
                    <p className="text-3xl font-black text-blue-400">{pkg.price}</p>
                  </div>
                  <ul className="space-y-4">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                        <Check size={16} className="text-blue-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Đăng ký ngay</button>
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"><MessageSquare size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CHĂM SÓC FANPAGE */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">2. Chăm sóc Fanpage (Theo số lượng bài viết)</h2>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="text-center p-6 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 w-48">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Số bài viết / tháng</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-blue-400">{postsPerMonth}</span>
                      <span className="text-xs font-bold text-gray-500">bài</span>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-[2.5rem] bg-white/5 border border-white/10 flex-1">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Dự toán ngân sách</p>
                    <p className="text-3xl font-black text-white">{new Intl.NumberFormat("vi-VN").format(carePrice)}đ</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                  "Nội dung chất lượng – Đăng bài đều đặn – Tăng tương tác – Tăng khách hàng. Phù hợp cho doanh nghiệp cần duy trì sự hiện diện chuyên nghiệp mỗi ngày."
                </p>
              </div>

              <div className="space-y-12">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span>10 bài</span>
                  <span>30 bài</span>
                  <span>60 bài</span>
                </div>
                <div className="relative h-12 flex items-center px-2">
                  <div className="absolute h-3 w-full rounded-full bg-white/5" />
                  <div className="absolute h-3 rounded-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" style={{ width: `${((postsPerMonth - 10) / 50) * 100}%` }} />
                  <input 
                    type="range" min="10" max="60" value={postsPerMonth} onChange={(e) => setPostsPerMonth(parseInt(e.target.value))}
                    className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20">Đăng ký chăm sóc</button>
                  <button className="flex-1 border border-white/10 hover:bg-white/5 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Tư vấn gói phù hợp</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QUẢNG CÁO FANPAGE */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">3. Quảng cáo Fanpage</h2>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Ngân sách dưới 10.000.000đ",
                icon: Target,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả"],
                price: "1.000.000đ",
                note: "( Chưa bao gồm VAT Facebook )"
              },
              {
                title: "Ngân sách trên 10.000.000đ",
                icon: Zap,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả", "A/B Testing chiến dịch", "Tối ưu hóa chuyển đổi"],
                price: "2.000.000đ",
                note: "( Chưa bao gồm VAT Facebook )"
              }
            ].map((ads, i) => (
              <div key={i} className="group rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 hover:bg-white/[0.05] transition-all">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                    <ads.icon size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-400">{ads.price}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{ads.note}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-6">{ads.title}</h3>
                <ul className="space-y-4 mb-10">
                  {ads.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                      <Check size={16} className="text-blue-500" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Đăng ký quảng cáo</button>
                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"><MessageSquare size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ĐẶT LỊCH TƯ VẤN MIỄN PHÍ */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">4. Đặt lịch tư vấn miễn phí</h2>
            <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                {formSent ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-20 w-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40">
                      <Check size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-white">Đã nhận yêu cầu!</h3>
                    <p className="text-gray-400">Chuyên gia sẽ liên hệ tư vấn giải pháp Fanpage cho bạn trong vòng 30 phút.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Họ và tên</label>
                        <input required placeholder="Nhập họ và tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Số điện thoại</label>
                        <input required placeholder="Nhập số điện thoại" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nền tảng</label>
                        <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30">
                          <option className="bg-neutral-900">Fanpage</option>
                          <option className="bg-neutral-900">Website</option>
                          <option className="bg-neutral-900">Google Maps</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Thời gian tư vấn</label>
                        <input type="datetime-local" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nội dung quan tâm</label>
                      <textarea placeholder="Bạn muốn được tư vấn về vấn đề gì?" rows={4} value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30 resize-none" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3">
                      <Send size={18} /> {isSubmitting ? "Đang gửi..." : "Đặt lịch tư vấn ngay"}
                    </button>
                  </form>
                )}
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-10 bg-blue-500/20 blur-[100px] rounded-full" />
                  <img src="/mascot-home.png" alt="Mascot" className="relative w-full max-w-md mx-auto animate-float" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center space-y-8 shadow-2xl shadow-blue-500/20">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white">Bạn muốn Fanpage ra khách mỗi ngày?</h2>
            <p className="text-blue-100 font-medium">Bứt Phá Marketing đồng hành cùng bạn tăng trưởng bền vững!</p>
          </div>
          <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
            <Rocket size={20} /> Bắt đầu ngay <ChevronRight size={20} />
          </button>
        </section>

      </div>
    </PlatformPage>
  );
}


