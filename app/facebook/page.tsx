"use client";

import { useState, useMemo, useEffect } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { Check, Send, ChevronRight, MessageSquare, Target, Rocket, Settings, Sparkles, UserCheck, ShieldCheck, Zap, Search } from "lucide-react";
import { db } from "@/lib/useData";
import { AuditModal } from "@/components/shared/AuditModal";

const config: PlatformConfig = {
  name: "Facebook",
  color: "#1877F2",
  auditPlatform: "facebook",
  heroTitle: "Fanpage không chỉ để đăng bài",
  heroSubtitle: "Mà để tạo ra khách hàng",
  heroDescription: "Tối ưu nội dung – Tăng tương tác – Chuyển đổi tin nhắn",
  vision: "Chúng tôi hướng đến trở thành đối tác chiến lược số 1 về Marketing Facebook tại Việt Nam, giúp hàng nghìn doanh nghiệp xây dựng sự hiện diện mạnh mẽ và bền vững trên nền tảng mạng xã hội lớn nhất thế giới.",
  mission: "Sứ mệnh của chúng tôi là mang lại giải pháp Facebook Marketing toàn diện, từ xây dựng Fanpage chuyên nghiệp đến triển khai chiến dịch quảng cáo hiệu quả, giúp doanh nghiệp tăng trưởng doanh thu bền vững.",
  responsibility: "Chúng tôi cam kết minh bạch trong từng đồng ngân sách, báo cáo kết quả thực tế hàng tuần, và chịu trách nhiệm hoàn toàn với hiệu quả mang lại cho khách hàng.",
  tabs: [],
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  robotFilter: "hue-rotate(190deg) saturate(1.4) brightness(1.1)",
  customSections: [
    { id: "audit", label: "Chuẩn đoán Fanpage" },
    { id: "build", label: "Xây dựng Fanpage" },
    { id: "care", label: "Chăm sóc Fanpage" },
    { id: "ads", label: "Quảng cáo Fanpage" },
  ],
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
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [postsPerMonth, setPostsPerMonth] = useState(30);
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);

  const carePrice = useMemo(() => {
    return postsPerMonth * 150000;
  }, [postsPerMonth]);

  const handleOpenConsult = (pkgName: string, pkgPrice: string, tabLabel: string) => {
    setCheckoutPkg({
      name: pkgName,
      price: pkgPrice,
      color: config.color,
      tabLabel: tabLabel
    });
  };

  return (
    <PlatformPage config={config}>
      <div className="mx-auto max-w-7xl px-4 pb-24 space-y-32">
        
        {/* Audit Section */}
        <section id="audit" className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden group scroll-mt-24">
          <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: config.color }} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Search size={16} className="text-white" style={{ color: config.color }} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chuẩn đoán Fanpage miễn phí</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">Phân tích <span style={{ color: config.color }}>Fanpage</span> và nhận báo cáo chi tiết</h3>
              <p className="text-gray-400 leading-relaxed">
                Nhập Link Fanpage của bạn để chúng tôi phân tích các yếu tố: Tương tác, Nội dung, Tốc độ phản hồi và Khả năng chuyển đổi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <input 
                  placeholder="Nhập Link Fanpage của bạn (VD: facebook.com/yourpage)" 
                  value={auditUrl}
                  onChange={e => setAuditUrl(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30"
                />
                <button 
                  onClick={() => setIsAuditOpen(true)}
                  className="rounded-2xl px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 justify-center"
                  style={{ backgroundColor: config.color }}
                >
                  Phân tích ngay <ChevronRight size={18} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-6 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Tương tác
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Nội dung
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Tốc độ phản hồi
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Chuyển đổi
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block w-1/3">
              <div className="relative p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Nhận báo giá chi tiết qua Zalo</p>
                <ul className="space-y-4">
                  {[
                    "Phân tích điểm mạnh & điểm yếu",
                    "Đề xuất cải thiện cụ thể",
                    "Tư vấn giải pháp phù hợp",
                    "Báo giá chi tiết từng hạng mục"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://zalo.me/0901438703" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                   Nhận báo giá qua Zalo
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* 1. DỊCH VỤ XÂY DỰNG FANPAGE */}
        <section id="build" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Professional Service</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Dịch vụ <span className="text-blue-500">Xây dựng</span> Fanpage
            </h2>
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
              <div key={i} className={`relative group flex flex-col rounded-[2.5rem] border p-8 transition-all hover:scale-[1.02] ${pkg.bestSeller ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                {pkg.bestSeller && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-blue-500/40">
                    <Sparkles size={12} /> BEST SELLER
                  </div>
                )}
                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-center">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${pkg.bestSeller ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'}`}>
                      <pkg.icon size={32} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-black text-white">{pkg.title}</h3>
                    <p className="text-3xl font-black text-blue-400">{pkg.price}</p>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                        <Check size={16} className="text-blue-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-8">
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Xây dựng Fanpage")}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                    >
                      Đăng ký ngay
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Xây dựng Fanpage")}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CHĂM SÓC FANPAGE */}
        <section id="care" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Premium Care</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              <span className="text-blue-500">Chăm sóc</span> Fanpage
            </h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">(Theo số lượng bài viết)</p>
          </div>

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-6 md:p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                  <div className="text-center p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 w-full sm:w-48">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Số bài viết / tháng</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-blue-400">{postsPerMonth}</span>
                      <span className="text-xs font-bold text-gray-500">bài</span>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 w-full sm:flex-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Dự toán ngân sách</p>
                    <p className="text-2xl sm:text-3xl font-black text-white break-words">{new Intl.NumberFormat("vi-VN").format(carePrice)}đ</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed italic border-l-4 border-blue-500 pl-6 text-sm">
                  "Nội dung chất lượng – Đăng bài đều đặn – Tăng tương tác – Tăng khách hàng. Phù hợp cho doanh nghiệp cần duy trì sự hiện diện chuyên nghiệp mỗi ngày."
                </p>
              </div>

              <div className="space-y-12">
                <div className="relative h-12 flex items-center px-2">
                  <div className="absolute -top-8 left-0 right-0 flex justify-between text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">
                    <span>10 bài</span>
                    <span className="absolute left-1/2 -translate-x-1/2">35 bài</span>
                    <span>60 bài</span>
                  </div>
                  <div className="absolute h-3 w-full rounded-full bg-white/5" />
                  <div className="absolute h-3 rounded-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" style={{ width: `${((postsPerMonth - 10) / 50) * 100}%` }} />
                  <input
                    type="range" min="10" max="60" value={postsPerMonth} onChange={(e) => setPostsPerMonth(parseInt(e.target.value))}
                    className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 sm:[&::-webkit-slider-thumb]:h-12 sm:[&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOpenConsult(`Gói chăm sóc ${postsPerMonth} bài`, `${new Intl.NumberFormat("vi-VN").format(carePrice)}đ`, "Chăm sóc Fanpage")}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20"
                  >
                    Đăng ký chăm sóc
                  </button>
                  <button
                    onClick={() => handleOpenConsult(`Tư vấn gói chăm sóc`, `Theo nhu cầu`, "Chăm sóc Fanpage")}
                    className="flex-1 border border-white/10 hover:bg-white/5 text-white py-4 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Tư vấn gói phù hợp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QUẢNG CÁO FANPAGE */}
        <section id="ads" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Advertising</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              <span className="text-blue-500">Quảng cáo</span> Fanpage
            </h2>
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
              <div key={i} className="group flex flex-col rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 hover:bg-white/[0.05] transition-all">
                <div className="flex-1 flex flex-col">
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
                  <ul className="space-y-4 mb-10 flex-1">
                    {ads.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                        <Check size={16} className="text-blue-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                    >
                      Đăng ký quảng cáo
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <AuditModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        initialLink={auditUrl} 
        source="Phân tích Fanpage"
        platformColor={config.color}
      />

      {checkoutPkg && (
        <ConsultationModal 
          pkg={checkoutPkg} 
          platformKey="facebook" 
          onClose={() => setCheckoutPkg(null)} 
        />
      )}
    </PlatformPage>
  );
}


