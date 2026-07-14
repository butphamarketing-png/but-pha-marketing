/**
 * Phase 2: inject “DNA ngành” unique vào money blogs Jaccard cao.
 * Chạy: node scripts/seed-phase2-unique-rewrite.mjs
 *       node scripts/seed-phase2-unique-rewrite.mjs --dry-run
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");
const SITE = "https://www.butphamarketing.com";

/** Unique industry DNA — khác template chung để hạ soft-duplicate */
const DNA = {
  "thiet-ke-website-bao-bi": {
    name: "bao bì / đóng gói",
    modules: [
      "Catalog sản phẩm theo chất liệu (carton, soft pack, tem nhãn) + filter ngành khách",
      "Form báo giá theo quy cách (số lượng, khổ, cán màng, offset/flexo)",
      "Thư viện mockup 3D túi/hộp + case study packing cho FMCG",
      "Blog so sánh vật liệu bao bì và tiêu chuẩn xuất khẩu",
    ],
    pains: [
      "Khách B2B cần bảng giá nhanh theo thông số kỹ thuật",
      "Đối thủ chỉ để album Facebook — thiếu silo SEO ngành bao bì",
      "Lead hay hỏi MOQ / lead time — form phải bắt đúng field",
    ],
    faq: [
      ["Website bao bì cần trang nào?", "Trang chủ, sản phẩm theo chất liệu, báo giá quy cách, nhà máy/năng lực, blog kỹ thuật, liên hệ."],
      ["Có tích hợp báo giá tự động không?", "Có thể form theo thông số; báo giá cuối vẫn do Sale duyệt."],
    ],
  },
  "thiet-ke-website-in-an-quang-cao": {
    name: "in ấn quảng cáo",
    modules: [
      "Bảng dịch vụ POSM: standee, backdrop, decal xe, hộp đèn LED",
      "Upload file thiết kế + checklist prepress (CMYK, bleed, DPI)",
      "Portfolio theo ngành (F&B, sự kiện, bán lẻ) + thời gian gia công",
      "Landing theo sản phẩm hot: namecard NFC, tem chống giả, catalogue",
    ],
    pains: [
      "Khách muốn xem mẫu in thật trước khi đặt",
      "File thiết kế lỗi khiến trễ deadline sự kiện",
      "Cần SEO cho từ khóa sản phẩm in (standee, backdrop…)",
    ],
    faq: [
      ["Website in ấn khác website sản xuất thế nào?", "Nhấn mạnh deadline, prepress, gallery chất liệu và CTA đặt hàng nhanh."],
      ["Có cần shop bán online không?", "Với SME thường form báo giá + Zalo hiệu quả hơn giỏ hàng đầy đủ."],
    ],
  },
  "thiet-ke-website-thiet-bi-ve-sinh": {
    name: "thiết bị vệ sinh",
    modules: [
      "Catalog sen vòi / bồn cầu / lavabo theo thương hiệu + lọc công nghệ",
      "So sánh thông số (áp lực nước, vật liệu, bảo hành)",
      "Hướng dẫn chọn thiết bị theo loại nhà (chung cư, biệt thự, công trình)",
      "Form tư vấn kỹ thuật + đội thi công/ lắp đặt",
    ],
    pains: [
      "Khách so giá Shopee — website phải thắng bằng tư vấn kỹ thuật",
      "Ảnh sản phẩm cần chuẩn để Ads Shopping / feed",
      "Local SEO cho showroom theo quận",
    ],
    faq: [
      ["Website thiết bị vệ sinh có cần bảng giá không?", "Nên có khoảng giá hoặc báo giá theo model để giảm lead ảo."],
      ["Schema nào phù hợp?", "Product + LocalBusiness nếu có showroom."],
    ],
  },
  "thiet-ke-website-gara-o-to": {
    name: "gara / chăm sóc xe",
    modules: [
      "Đặt lịch sửa chữa / đồng sơn / bảo dưỡng theo khung giờ",
      "Bảng giá gói dịch vụ + phụ tùng phổ biến",
      "Gallery trước–sau + xe đang thi công (có ẩn biển số)",
      "Tối ưu Google Maps: dịch vụ, ảnh xưởng, FAQ bảo hành",
    ],
    pains: [
      "Lead đổ về Zalo lẫn lộn — cần form chọn dòng xe / triệu chứng",
      "Khó rank “gara [quận]” nếu NAP không đồng nhất",
      "Cần content theo lỗi xe (máy lạnh, hộp số…) để bắt long-tail",
    ],
    faq: [
      ["Có cần app đặt lịch không?", "Website + form/Zalo đủ cho SME; app khi có chuỗi chi nhánh."],
      ["SEO local quan trọng thế nào?", "Với gara là kênh chính — Maps + landing dịch vụ từng lỗi."],
    ],
  },
  "thiet-ke-website-trung-tam-anh-ngu": {
    name: "trung tâm Anh ngữ",
    modules: [
      "Lộ trình khóa học (IELTS, giao tiếp, thiếu nhi) + lịch khai giảng",
      "Form đăng ký học thử / kiểm tra trình độ",
      "Hồ sơ giáo viên + kết quả đầu ra có minh chứng",
      "Blog bài thi / tips — silo SEO từ khóa luyện thi",
    ],
    pains: [
      "Phụ huynh cần tin cậy (giáo viên, cam kết band)",
      "Cạnh tranhAds cao — landing theo khóa giảm CPA",
      "Cần trang cơ sở / lịch học theo chi nhánh",
    ],
    faq: [
      ["Website Anh ngữ khác website trường học?", "Nhấn mạnh khóa học, chuyển đổi đăng ký thử, không phải nhận sự."],
      ["Có cần thanh toán học phí online?", "Nên có nếu vận hành nhiều khóa; SME có thể chuyển khoản + form."],
    ],
  },
  "thiet-ke-website-truong-mam-non": {
    name: "trường mầm non",
    modules: [
      "Tour cơ sở / phòng học / bếp ăn + video an toàn",
      "Form đăng ký nhập học / tham quan",
      "Nhật ký hoạt động / album phụ huynh (có phân quyền)",
      "FAQ học phí, giờ đón trả, thực đơn",
    ],
    pains: [
      "Phụ huynh quyết định bằng cảm xúc tin cậy — ảnh thật quan trọng",
      "Cần Local SEO theo khu vực trường",
      "Nội dung phải trung thực, tránh claim y tế quá đà",
    ],
    faq: [
      ["Có nên làm cổng phụ huynh?", "Phase 2 sau khi website tuyển sinh ổn; ưu tiên trang tin cậy trước."],
      ["Schema nào dùng?", "School / EducationalOrganization + LocalBusiness."],
    ],
  },
  "thiet-ke-website-noi-that": {
    name: "nội thất",
    modules: [
      "Portfolio theo phong cách (hiện đại, Japandi, luxury) + mét vuông",
      "Quy trình khảo sát — concept — thi công — bảo hành",
      "Config gói / báo giá sơ bộ theo diện tích",
      "Blog vật liệu, xu hướng, bảo trì nội thất",
    ],
    pains: [
      "Ảnh portfolio phải nặng chất lượng nhưng tối ưu tốc độ",
      "Khách so sánh nhiều studio — cần case có số liệu rõ",
      "Landing theo loại công trình (căn hộ, nhà phố, văn phòng)",
    ],
    faq: [
      ["Website nội thất có cần 3D tour?", "Có lợi thế nếu đã có file; không bắt buộc ở giai đoạn SME."],
      ["Có bán sản phẩm ecom không?", "Có thể catalog + form; full checkout khi kho ổn định."],
    ],
  },
  "thiet-ke-website-spa": {
    name: "spa",
    modules: [
      "Đặt lịch liệu trình theo kỹ thuật viên",
      "Menu dịch vụ facial/body + gói liệu trình tháng",
      "Before/after có consent + review",
      "SEO local quận + Google Maps dịch vụ",
    ],
    pains: [
      "Hủy lịch cao — cần reminder Zalo/SMS",
      "Ảnh dịch vụ dễ giống đối thủ — USP bằng quy trình & chứng chỉ",
      "Ads cần landing riêng từng liệu trình",
    ],
    faq: [
      ["Website spa có cần CRM?", "Nên kết nối lịch hẹn; CRM khi có chuỗi hoặc volume cao."],
      ["Giá website spa?", "Thường 6–12 triệu tùy booking và số liệu trình."],
    ],
  },
  "thiet-ke-website-nha-khoa": {
    name: "nha khoa",
    modules: [
      "Trang dịch vụ implant / niềng / tẩy trắng tách silo",
      "Đặt lịch + chọn bác sĩ",
      "Bảng giá tham khảo minh bạch + tư vấn điều trị",
      "Schema MedicalBusiness + Local SEO",
    ],
    pains: [
      "Khách lo sợ — content giáo dục + chứng chỉ bác sĩ",
      "Google Ads Y tế có policy — landing phải rõ",
      "Cần tách trang theo intent (implant vs niềng)",
    ],
    faq: [
      ["Có được đăng giá dịch vụ y tế không?", "Nên tham khảo + disclaimer; giá cuối sau khám."],
      ["Bao lâu có lead SEO?", "Local + content dịch vụ thường 2–4 tháng nếu kỹ thuật sạch."],
    ],
  },
  "thiet-ke-website-tham-my-vien": {
    name: "thẩm mỹ viện",
    modules: [
      "Landing theo dịch vụ (filler, laser, trẻ hóa)",
      "Form tư vấn ẩn danh + chat",
      "Gallery kết quả có kiểm duyệt",
      "Blog kiến thức thẩm mỹ + disclaimer y khoa",
    ],
    pains: [
      "Policy ads nghiêm — website phải chuẩn claim",
      "Khách so sánh giá nhanh — cần tư vấn đúng quy trình",
      "E-E-A-T: bác sĩ / chứng chỉ trên trang",
    ],
    faq: [
      ["Khác website spa?", "Thẩm mỹ nhấn dịch vụ y khoa thẩm mỹ, compliance và proof bác sĩ."],
      ["Có cần blog không?", "Có — giáo dục giảm bounce từ ads và nuôi SEO."],
    ],
  },
  "thiet-ke-website-bat-dong-san": {
    name: "bất động sản",
    modules: [
      "Listing dự án/căn hộ với filter giá – vị trí – loại hình",
      "Form tư vấn vay / đặt lịch xem nhà",
      "Landing theo khu vực + SEO local",
      "Hub pháp lý / chủ đầu tư để tăng E-E-A-T",
    ],
    pains: [
      "Ảnh và mặt bằng nặng — cần tối ưu Core Web Vitals",
      "Lead môi giới trùng — scoring form theo ngân sách",
      "Cannibalization giữa nhiều dự án cùng quận",
    ],
    faq: [
      ["Website BĐS có cần CRM?", "Nên đồng bộ lead về CRM/Facebook Lead Ads."],
      ["Ưu tiên trang nào?", "Dự án đang mở bán + khu vực đang chạy ads."],
    ],
  },
  "thiet-ke-website-nha-hang": {
    name: "nhà hàng",
    modules: [
      "Menu digital / QR order + đặt bàn",
      "Gallery món + không gian + video ngắn",
      "Tích hợp Maps, giờ mở cửa, chi nhánh",
      "Landing tiệc / đặt chỗ sự kiện",
    ],
    pains: [
      "Khách search “nhà hàng gần đây” — Local SEO là then chốt",
      "Menu đổi liên tục — CMS phải dễ cập nhật",
      "Cần CTR cao từ Maps ảnh quán",
    ],
    faq: [
      ["Có cần app order?", "Website + QR đủ cho 1–2 chi nhánh."],
      ["SEO món ăn có hiệu quả?", "Có nếu có trang chuyên đề theo món/local."],
    ],
  },
  "thiet-ke-website-khach-san": {
    name: "khách sạn",
    modules: [
      "Booking engine / calendar phòng",
      "Gallery phòng + tiện ích + tour 360 (nếu có)",
      "Trang ưu đãi / combo theo mùa",
      "Đa ngôn ngữ nếu khách quốc tế",
    ],
    pains: [
      "Phụ thuộc OTA — website phải lấy direct booking",
      "Giá động theo ngày — cần rule rõ",
      "Review và UGC giúp chuyển đổi",
    ],
    faq: [
      ["Tích hợp kênh OTA?", "Có thể channel manager; website vẫn cần CTA booking riêng."],
      ["Mobile quan trọng thế nào?", "Phần lớn book qua mobile — form đặt phòng phải ngắn."],
    ],
  },
  "thiet-ke-website-xay-dung-nha-thau": {
    name: "xây dựng / nhà thầu",
    modules: [
      "Portfolio công trình theo loại (nhà phố, nhà xưởng, cải tạo)",
      "Năng lực – giấy phép – đội ngũ kỹ sư",
      "Form báo giá khảo sát hiện trường",
      "Blog quy trình – vật liệu – pháp lý xây dựng",
    ],
    pains: [
      "Chu kỳ quyết định dài — cần nurture content",
      "Khách B2B cần hồ sơ năng lực PDF/web",
      "Proof dự án thật quan trọng hơn banner đẹp",
    ],
    faq: [
      ["Website xây dựng khác kiến trúc?", "Nhấn thi công – tiến độ – bảo hành hơn concept thuần."],
      ["Có cần landing theo tỉnh?", "Có nếu làm dự án nhiều tỉnh / SEO địa phương."],
    ],
  },
  "thiet-ke-website-logistics-van-tai": {
    name: "logistics / vận tải",
    modules: [
      "Bảng tuyến / dịch vụ vận chuyển",
      "Form báo giá theo khối lượng – tuyến",
      "Tracking (nếu có API) hoặc hướng dẫn tra cứu",
      "Case study lead time / chi phí tối ưu",
    ],
    pains: [
      "Lead hỏi giá rất nhiều — form phải chuẩn field",
      "SEO B2B từ khóa tuyến và loại hàng",
      "Cần chứng chỉ kho / bảo hiểm hàng hóa",
    ],
    faq: [
      ["Có cần portal khách hàng?", "Giai đoạn sau; ưu tiên landing dịch vụ + form trước."],
      ["Local SEO có cần?", "Có nếu có kho/bến xe theo tỉnh."],
    ],
  },
  "thiet-ke-website-pccc": {
    name: "PCCC",
    modules: [
      "Dịch vụ thiết kế – thẩm duyệt – thi công PCCC",
      "Hồ sơ năng lực – giấy phép",
      "Portfolio công trình nhà xưởng / chung cư",
      "Form khảo sát hiện trường",
    ],
    pains: [
      "Khách B2B cần chứng minh năng lực pháp lý",
      "Chu kỳ dự án dài — content kỹ thuật nuôi lead",
      "SEO từ khóa nghiệm thu / thẩm duyệt",
    ],
    faq: [
      ["Website PCCC khác MEP?", "Nhấn chứng chỉ PCCC và quy trình pháp lý riêng."],
      ["Có cần blog không?", "Có — giáo dục giúp xếp hạng từ khóa kỹ thuật."],
    ],
  },
  "thiet-ke-website-co-khi": {
    name: "cơ khí",
    modules: [
      "Catalog máy / gia công CNC theo thông số",
      "Form RFQ kèm file bản vẽ",
      "Năng lực nhà máy – máy móc – QA",
      "Case study gia công cho từng ngành khách",
    ],
    pains: [
      "Lead kỹ thuật cần field RFQ chi tiết",
      "Ảnh máy thật + video gia công tạo tin cậy",
      "SEO tiếng Việt + mã model máy",
    ],
    faq: [
      ["Có bán máy online không?", "Catalog + RFQ thường hơn ecom với B2B cơ khí."],
      ["Ngôn ngữ Anh có cần?", "Có nếu xuất khẩu / khách FDI."],
    ],
  },
  "thiet-ke-website-cong-ty-luat": {
    name: "công ty luật",
    modules: [
      "Trang lĩnh vực (DN, hình sự, đất đai…) tách silo",
      "Hồ sơ luật sư – chứng chỉ",
      "Form tư vấn ẩn danh",
      "Blog án lệ / hướng dẫn pháp lý (E-E-A-T cao)",
    ],
    pains: [
      "Claim phải thận trọng — tránh cam kết kết quả vụ",
      "Khách tìm theo vấn đề cụ thể — cần landing sâu",
      "Trust: hình ảnh văn phòng + luật sư thật",
    ],
    faq: [
      ["Có được đăng phí dịch vụ không?", "Có thể khoảng tham khảo; phí cuối theo vụ."],
      ["SEO local có hiệu quả?", "Có với văn phòng luật theo thành phố."],
    ],
  },
  "thiet-ke-website-phong-kham-da-khoa": {
    name: "phòng khám đa khoa",
    modules: [
      "Đặt lịch theo chuyên khoa",
      "Giới thiệu bác sĩ – lịch khám",
      "Bảng giá dịch vụ tham khảo",
      "Hướng dẫn chuẩn bị trước khám",
    ],
    pains: [
      "Tuân thủ claim y tế trên ads/web",
      "Cần Local + Maps cho “phòng khám gần đây”",
      "Nội dung giáo dục giảm sợ hãi / tăng giữ chân",
    ],
    faq: [
      ["Khác website bệnh viện?", "Gọn hơn, tập trung đặt lịch và chuyên khoa mũi nhọn."],
      ["Có cần app bệnh nhân?", "Sau khi quy trình đặt lịch web ổn định."],
    ],
  },
  "thiet-ke-website-my-pham-lam-dep": {
    name: "mỹ phẩm",
    modules: [
      "Catalog sản phẩm theo dòng (skincare, makeup) + thành phần",
      "Landing theo pain (mụn, nám, dưỡng ẩm) khớp Ads",
      "Review / UGC + chứng nhận nếu có",
      "Blog giáo dục routine để nuôi SEO + email",
    ],
    pains: [
      "Claim công dụng dễ lệch policy — cần disclaimer",
      "Ảnh sản phẩm phải chuẩn feed Ads/Shopping",
      "Cạnh tranh Shopee — website thắng bằng brand + nội dung",
    ],
    faq: [
      ["Website mỹ phẩm cần ecom đầy đủ?", "Có thể catalog + đặt hàng Zalo trước; checkout khi kho ổn."],
      ["SEO có ăn đè sàn không?", "Brand + bài sâu theo vấn đề da thường bền hơn."],
    ],
  },
  "thiet-ke-website-thang-may": {
    name: "thang máy",
    modules: [
      "Catalog tải trọng / loại thang (gia đình, tải hàng, bệnh viện)",
      "Form khảo sát giếng thang + bản vẽ",
      "Portfolio công trình + bảo trì định kỳ",
      "Landing theo khu vực lắp đặt",
    ],
    pains: [
      "Chu kỳ quyết định dài — cần hồ sơ năng lực",
      "Lead kỹ thuật: kích thước giếng, tải trọng",
      "SEO kết hợp thương hiệu + địa phương",
    ],
    faq: [
      ["Có cần trang bảo trì tách?", "Có — intent khác lắp mới, dễ lấy long-tail."],
      ["Local SEO quan trọng?", "Có nếu đội kỹ thuật theo tỉnh/thành."],
    ],
  },
  "thiet-ke-website-tu-dong-hoa": {
    name: "tự động hóa / PLC",
    modules: [
      "Giải pháp theo ngành (thực phẩm, điện tử, logistics)",
      "Form RFQ kèm brief dây chuyền",
      "Case study OEE / giảm nhân công (có số)",
      "Blog kỹ thuật PLC – robot – vision",
    ],
    pains: [
      "Lead B2B cần người kỹ thuật đọc brief",
      "Content phải đủ sâu để vượt đối thủ brochure",
      "Chu kỳ sale dài — nurturing quan trọng",
    ],
    faq: [
      ["Website automation khác cơ khí?", "Nhấn giải pháp hệ thống + ROI hơn catalog máy đơn."],
      ["Có cần đa ngôn ngữ?", "Nên nếu làm dự án FDI / xuất khẩu."],
    ],
  },
  "thiet-ke-website-landing-page-ban-hang": {
    name: "landing page bán hàng",
    modules: [
      "Cấu trúc 1 CTA: hero → pain → offer → proof → form",
      "Message-match với ads (Meta / Google)",
      "A/B khối headline và nút",
      "Tracking pixel + conversion event rõ",
    ],
    pains: [
      "Landing đẹp nhưng không khớp ads → CPL cao",
      "Form dài làm drop — cần tối giản field",
      "Thiếu proof (review, số liệu) giảm trust",
    ],
    faq: [
      ["Landing khác website doanh nghiệp?", "Một mục tiêu chuyển đổi; ít menu phân tán."],
      ["Bao nhiêu landing cho 1 sản phẩm?", "Ít nhất 1 theo kênh ads; có thể tách theo audience."],
    ],
  },
};

function buildDnaSection(slug, dna) {
  const modules = dna.modules.map((m) => `<li>${m}</li>`).join("\n");
  const pains = dna.pains.map((p) => `<li>${p}</li>`).join("\n");
  const faqs = dna.faq
    .map(
      ([q, a]) => `<div class="mt-3"><p class="font-semibold text-indigo-950">${q}</p><p class="text-sm text-slate-600">${a}</p></div>`,
    )
    .join("\n");
  return `
<section id="dna-nganh" class="my-8 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
<h2 class="text-xl font-bold text-indigo-950">Đặc thù website ngành ${dna.name}</h2>
<p class="mt-2 text-sm text-slate-600">Khối nội dung riêng cho <strong>${dna.name}</strong> — khác template chung, phục vụ SEO và chuyển đổi.</p>
<h3 class="mt-4 font-bold text-indigo-900">Module bắt buộc trên site</h3>
<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
${modules}
</ul>
<h3 class="mt-4 font-bold text-indigo-900">Pain point khách ${dna.name} hay gặp</h3>
<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
${pains}
</ul>
<h3 class="mt-4 font-bold text-indigo-900">FAQ ngành</h3>
${faqs}
<p class="mt-4 text-sm">Xem thêm: <a href="${SITE}/banggia">báo giá thiết kế website</a> · <a href="${SITE}/website">dịch vụ website</a> · <a href="${SITE}/blog/thiet-ke-website">pillar thiết kế website</a> · <a href="${SITE}/lien-he">liên hệ tư vấn</a>.</p>
</section>`;
}

function injectDna(content, slug, dna) {
  const block = buildDnaSection(slug, dna);
  if (content.includes('id="dna-nganh"')) {
    return content.replace(/<section id="dna-nganh"[\s\S]*?<\/section>/, block.trim());
  }
  // Prefer after nganh section or before silo / money-funnel
  if (content.includes('id="silo-nganh"')) {
    return content.replace('<section id="silo-nganh"', `${block}\n<section id="silo-nganh"`);
  }
  if (content.includes('id="money-funnel"')) {
    return content.replace('<section id="money-funnel"', `${block}\n<section id="money-funnel"`);
  }
  if (content.includes("</article>")) {
    return content.replace("</article>", `${block}\n</article>`);
  }
  return `${content}\n${block}`;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
const supabase = createClient(url, key);

const slugs = Object.keys(DNA);
console.log(`=== Phase 2 unique DNA rewrite ===`);
console.log(`Targets: ${slugs.length} | dry-run: ${dryRun ? "YES" : "NO"}`);

let ok = 0;
let fail = 0;
for (const slug of slugs) {
  try {
    const { data: row, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,keywords_secondary,description,content")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    if (!row) {
      console.warn(`  skip missing ${slug}`);
      continue;
    }
    const before = row.content?.length || 0;
    const content = injectDna(row.content || "", slug, DNA[slug]);
    if (content === row.content) {
      console.log(`  · ${slug}: unchanged`);
      ok++;
      continue;
    }
    if (dryRun) {
      console.log(`  [dry] ${slug}: ${before} → ${content.length}`);
      ok++;
      continue;
    }
    await seedRewriteArticle(
      {
        slug: row.slug,
        title: row.title,
        keywordsMain: row.keywords_main || row.title,
        keywordsSecondary: row.keywords_secondary || "",
        description: row.description || "",
        metaTitle: row.title,
        metaDescription: row.description || row.title,
        content,
      },
      { log: false, revalidate: false },
    );
    console.log(`  ✓ ${slug}: ${before} → ${content.length}`);
    ok++;
  } catch (e) {
    fail++;
    console.error(`  ✗ ${slug}:`, e.message || e);
  }
}

if (!dryRun && ok) {
  try {
    await revalidateBlogAfterSeed();
  } catch (e) {
    console.warn("Revalidate warn:", e.message || e);
  }
}

console.log(`\nDone ok=${ok} fail=${fail}`);
