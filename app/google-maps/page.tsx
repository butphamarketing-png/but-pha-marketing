"use client";

import { useState, useMemo } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { Check, Search, MessageSquare, Target, Zap, Sparkles, Wrench, Building2, Star, Rocket, ChevronRight } from "lucide-react";

const config: PlatformConfig = {
  name: "Google Maps",
  color: "#9333EA", // Màu tím theo hình ảnh yêu cầu
  auditPlatform: "googlemaps",
  heroTitle: "Không lên Google Maps",
  heroSubtitle: "Bạn đang mất khách mỗi ngày",
  heroDescription: "Đưa doanh nghiệp lên Google – Tăng lượt gọi – Tăng khách đến cửa hàng",
  vision: "Giúp doanh nghiệp của bạn xuất hiện đầu tiên khi khách hàng tìm kiếm trên Google Maps và Google Search — kênh tìm kiếm có ý định mua hàng cao nhất hiện nay.",
  mission: "Tối ưu hóa Google Business Profile, xây dựng đánh giá 5 sao uy tín và triển khai chiến lược Local SEO để doanh nghiệp của bạn thống trị kết quả tìm kiếm địa phương.",
  responsibility: "Cam kết không dùng đánh giá giả mạo, chỉ áp dụng chiến lược White Hat được Google chấp nhận và đảm bảo thứ hạng bền vững lâu dài.",
  tabs: [], // Chúng ta sẽ tự xây dựng các phần pricing trong body
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  robotFilter: "hue-rotate(250deg) brightness(1.2)", // Robot màu tím/xanh lá theo yêu cầu
  customSections: [
    { id: "audit", label: "Kiểm tra vị trí" },
    { id: "gm-pricing", label: "Gói Google Maps" },
    { id: "ads-pricing", label: "Gói Quảng cáo" },
    { id: "benefits", label: "Bạn nhận được gì" },
  ],
  stats: [{ label: "GMB tối ưu", value: "400+" }, { label: "Đánh giá", value: "900+" }, { label: "Đạt 5 sao", value: "99%" }, { label: "Năm KN", value: "4+" }],
  process: [
    { step: 1, title: "Audit hiện trạng", desc: "Kiểm tra Google Business Profile hiện tại, xác định điểm yếu và cơ hội cải thiện thứ hạng." },
    { step: 2, title: "Tối ưu Profile", desc: "Cập nhật thông tin đầy đủ, chính xác và nhất quán trên toàn bộ các directory." },
    { step: 3, title: "Xây dựng nội dung", desc: "Đăng bài viết, ảnh chuyên nghiệp và Q&A hàng tuần để tăng độ hoạt động." },
    { step: 4, title: "Thu thập đánh giá", desc: "Triển khai chiến lược thu thập review từ khách hàng thật và xây dựng phản hồi chuyên nghiệp." },
    { step: 5, title: "Theo dõi & Báo cáo", desc: "Theo dõi thứ hạng hàng tuần và báo cáo kết quả chi tiết hàng tháng." },
  ],
  faqs: [
    { q: "Bao lâu thì xuất hiện trong Local Pack 3?", a: "Tùy mức độ cạnh tranh của ngành và địa bàn. Thường từ 1-3 tháng để vào Local Pack và 3-6 tháng để đạt top 1." },
    { q: "Google có phạt nếu dùng review dịch vụ không?", a: "Chúng tôi chỉ dùng review từ tài khoản thật với nội dung tự nhiên, đảm bảo an toàn theo chính sách Google." },
    { q: "Có cần website mới làm Local SEO không?", a: "Không bắt buộc nhưng có website sẽ tăng hiệu quả SEO Local đáng kể. Chúng tôi có thể làm cả hai song song." },
    { q: "GMB có phù hợp cho kinh doanh online không?", a: "GMB chủ yếu phù hợp cho doanh nghiệp có địa điểm vật lý. Kinh doanh thuần online nên ưu tiên SEO website hoặc Ads." },
    { q: "Kết quả có bền vững không?", a: "Kết quả GMB và Local SEO thường bền vững hơn Ads vì dựa trên độ tin cậy tích lũy. Duy trì review tốt là chìa khóa." },
  ],
};

export default function GoogleMapsPage() {
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);

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
        
        {/* 1. Kiểm tra doanh nghiệp của bạn trên Google Maps (Audit) */}
        <section id="audit" className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden group scroll-mt-24">
          <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: config.color }} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Search size={16} className="text-white" style={{ color: config.color }} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kiểm tra doanh nghiệp của bạn trên Google Maps</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">Nhập tên doanh nghiệp để kiểm tra vị trí, thứ hạng và nhận đề xuất cải thiện</h3>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <input 
                  placeholder="Nhập tên doanh nghiệp của bạn" 
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30"
                />
                <button 
                  className="rounded-2xl px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 justify-center"
                  style={{ backgroundColor: config.color }}
                >
                  Kiểm tra ngay <ChevronRight size={18} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-6 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Vị trí hiện tại
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Thứ hạng từ khóa
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Số lượng đánh giá
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Đề xuất cải thiện
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block w-1/3">
              <div className="relative p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Nhận báo cáo chi tiết qua Zalo</p>
                <ul className="space-y-4">
                  {[
                    "Vị trí hiện tại của bạn",
                    "Thứ hạng từ khóa chính",
                    "Số lượng đánh giá",
                    "Đề xuất cải thiện miễn phí"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                   Nhận báo cáo qua Zalo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. GÓI GOOGLE MAPS */}
        <section id="gm-pricing" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">GÓI GOOGLE MAPS</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Lựa chọn gói phù hợp với nhu cầu của bạn</p>
            <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                title: "CẢI TẠO", 
                price: "300.000đ", 
                icon: Wrench,
                features: ["Tối ưu thông tin", "Sửa danh mục", "Tối ưu hình ảnh cơ bản"] 
              },
              { 
                title: "XÂY DỰNG", 
                price: "600.000đ", 
                icon: Building2,
                features: ["Tạo Google Maps", "Xác minh doanh nghiệp", "Setup đầy đủ thông tin"] 
              },
              { 
                title: "TỐI ƯU", 
                price: "900.000đ", 
                icon: Star,
                bestSeller: true,
                features: ["Tối ưu SEO Maps", "Viết mô tả chuẩn", "Tối ưu hiển thị tìm kiếm"] 
              }
            ].map((pkg, i) => (
              <div key={i} className={`relative group flex flex-col rounded-[2.5rem] border p-8 transition-all hover:scale-[1.02] ${pkg.bestSeller ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                {pkg.bestSeller && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-purple-500/40">
                    <Sparkles size={12} /> BEST CHOICE
                  </div>
                )}
                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-center">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${pkg.bestSeller ? 'bg-purple-600 text-white' : 'bg-white/5 text-purple-400'}`}>
                      <pkg.icon size={32} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-black text-white">{pkg.title}</h3>
                    <p className="text-3xl font-black text-purple-400">{pkg.price}</p>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                        <Check size={16} className="text-purple-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-8">
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Gói Google Maps")}
                      className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20"
                    >
                      Đăng ký ngay
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Gói Google Maps")}
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

        {/* 3. GÓI QUẢNG CÁO GOOGLE MAPS */}
        <section id="ads-pricing" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">GÓI QUẢNG CÁO GOOGLE MAPS</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Lựa chọn gói phù hợp với ngân sách của bạn</p>
            <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "GÓI CƠ BẢN",
                icon: Target,
                bestSeller: true,
                note: "(Ngân sách dưới 10 triệu)",
                features: [
                  "Setup chiến dịch Google Maps",
                  "Tối ưu hiển thị địa điểm trên Google",
                  "Nghiên cứu từ khóa tìm kiếm khách hàng",
                  "Target đúng khu vực (bán kính / thành phố)",
                  "Theo dõi & tối ưu quảng cáo mỗi ngày",
                  "Báo cáo hiệu quả định kỳ"
                ],
                price: "1.000.000đ",
                fee: "/ tháng (chưa bao gồm ngân sách quảng cáo)"
              },
              {
                title: "GÓI NÂNG CAO",
                icon: Zap,
                note: "(Ngân sách từ 10 triệu trở lên)",
                features: [
                  "Setup chiến dịch chuyên sâu Google Maps",
                  "Tối ưu từ khóa + vị trí hiển thị TOP",
                  "Phân tích hành vi khách hàng",
                  "Remarketing (bám đuổi khách hàng)",
                  "Tối ưu chi phí – tăng chuyển đổi",
                  "Theo dõi & tối ưu liên tục",
                  "Báo cáo chi tiết + đề xuất chiến lược"
                ],
                price: "2.000.000đ",
                fee: "/ tháng (chưa bao gồm ngân sách quảng cáo)"
              }
            ].map((ads, i) => (
              <div key={i} className={`relative group flex flex-col rounded-[3rem] border p-10 transition-all hover:bg-white/[0.05] ${ads.bestSeller ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                {ads.bestSeller && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-purple-500/40">
                    <Sparkles size={12} /> BEST SELLER
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                      <ads.icon size={32} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-purple-400">{ads.price}</p>
                      <p className="text-[10px] text-gray-500 font-bold">{ads.fee}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-white">{ads.title}</h3>
                    <p className="text-sm text-purple-400 font-bold">{ads.note}</p>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {ads.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                        <Check size={16} className="text-purple-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Google Maps")}
                      className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20"
                    >
                      Đăng ký quảng cáo
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Google Maps")}
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

        {/* 4. BẠN NHẬN ĐƯỢC GÌ? */}
        <section id="benefits" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">BẠN NHẬN ĐƯỢC GÌ?</h2>
            <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: "Xuất hiện khi khách tìm kiếm gần bạn", desc: "Tăng khả năng tiếp cận khách hàng tiềm năng" },
              { icon: Rocket, title: "Tăng lượt gọi và chỉ đường", desc: "Khách dễ dàng liên hệ và đến cửa hàng của bạn" },
              { icon: Building2, title: "Hiển thị chuyên nghiệp hơn đối thủ", desc: "Thông tin đầy đủ, hình ảnh đẹp, tạo sự tin tưởng" },
              { icon: Star, title: "Dễ dàng được khách tin tưởng", desc: "Nhiều đánh giá tốt giúp nâng cao uy tín thương hiệu" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.03] space-y-4 hover:bg-white/[0.06] transition-all group">
                <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-black text-white leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden text-center space-y-8">
          <div className="absolute top-0 left-0 -z-10 h-full w-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: config.color }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">Bạn đã xuất hiện trên Google Maps chưa?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Kiểm tra ngay vị trí của bạn và đừng để mất khách hàng tiềm năng!</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-5 rounded-2xl bg-purple-600 text-white text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-purple-600/30"
          >
            Kiểm tra ngay
          </button>
        </section>

      </div>

      {checkoutPkg && (
        <ConsultationModal 
          pkg={checkoutPkg} 
          platformKey="googlemaps" 
          onClose={() => setCheckoutPkg(null)} 
        />
      )}
    </PlatformPage>
  );
}
