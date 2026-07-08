/**
 * 500 từ khóa long-tail batch 8 — bảo trì/hosting/analytics, marketing automation, Đông Nam Bộ/ĐBSCL.
 * Export: KEYWORDS_500_BATCH8
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function webIndustryCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `thiet-ke-website-${indSlug}-${citySlug}`,
    keywordsMain: `thiết kế website ${industry} ${city}`,
    h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webIndustry(slug, kw, angle) {
  return {
    slug: `thiet-ke-website-${slug}`,
    keywordsMain: `thiết kế website ${kw}`,
    h1: `Thiết Kế Website ${cap(kw)} Chuyên Nghiệp Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webPricing(indSlug, industry, angle) {
  return {
    slug: `bao-gia-thiet-ke-website-${indSlug}`,
    keywordsMain: `báo giá thiết kế website ${industry}`,
    h1: `Báo Giá Thiết Kế Website ${cap(industry)} 2026`,
    angle,
    niche: "strategy",
  };
}

function webMaintain(slug, kw, angle) {
  return {
    slug: `bao-tri-website-${slug}`,
    keywordsMain: `bảo trì website ${kw}`,
    h1: `Bảo Trì Website ${cap(kw)} — Gói Định Kỳ 2026`,
    angle,
    niche: "strategy",
  };
}

function analytics(slug, kw, angle) {
  return {
    slug: `phan-tich-${slug}`,
    keywordsMain: `phân tích ${kw}`,
    h1: `Phân Tích ${cap(kw)} — Dashboard & KPI`,
    angle,
    niche: "analytics",
  };
}

function automationFlow(slug, kw, angle) {
  return {
    slug: `workflow-${slug}`,
    keywordsMain: `workflow ${kw}`,
    h1: `Workflow ${cap(kw)} — Marketing Automation`,
    angle,
    niche: "strategy",
  };
}

function mapsIndCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `seo-google-maps-${indSlug}-${citySlug}`,
    keywordsMain: `seo google maps ${industry} ${city}`,
    h1: `SEO Google Maps ${cap(industry)} ${city}`,
    angle,
    niche: "seo",
  };
}

function marketingInd(slug, kw, angle) {
  return {
    slug: `marketing-${slug}`,
    keywordsMain: `marketing ${kw}`,
    h1: `Marketing ${cap(kw)} — Chiến Lược Tăng Trưởng`,
    angle,
    niche: "strategy",
  };
}

function compare(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

function pain(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function laGi(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "seo" };
}

/** A — 200: 20 ngành × 10 thành phố Đông Nam Bộ / ĐBSCL */
const INDUSTRIES_B8 = [
  ["xuong-in-lich", "xưởng in lịch", "website xưởng in lịch tết doanh nghiệp"],
  ["phan-phoi-sinh-to", "phân phối sinh tố", "website phân phối sinh tố đóng chai"],
  ["thiet-bi-spa-bathroom", "thiết bị spa bathroom", "website showroom thiết bị spa phòng tắm"],
  ["cho-thue-may-chieu-mini", "cho thuê máy chiếu mini", "website cho thuê máy chiếu sự kiện"],
  ["day-guitar", "dạy guitar", "website trung tâm học guitar"],
  ["tri-can-thi", "trị cận thị", "website phòng khám điều trị cận thị"],
  ["thiet-bi-cau-ca", "thiết bị câu cá", "website cửa hàng đồ câu cá"],
  ["thiet-ke-booth-trien-lam", "thiết kế booth triển lãm", "website thiết kế gian hàng triển lãm"],
  ["phan-phoi-do-an-vat", "phân phối đồ ăn vặt", "website phân phối snack FMCG"],
  ["xuong-bao-bi-nhua", "xưởng bao bì nhựa", "website xưởng bao bì nhựa in offset"],
  ["thiet-bi-bep-smart", "thiết bị bếp smart", "website showroom bếp thông minh"],
  ["lap-may-lanh-tu-dong", "lắp máy lạnh tự động", "website lắp điều hòa công nghiệp"],
  ["day-drums", "dạy drums", "website học trống jazz rock"],
  ["tri-suong-khop", "trị sương khớp", "website phòng khám xương khớp"],
  ["thiet-bi-cau-long", "thiết bị cầu lông", "website bán vợt cầu lông"],
  ["thiet-ke-catalog-sp", "thiết kế catalog sản phẩm", "website thiết kế catalog B2B"],
  ["tu-van-startup", "tư vấn startup", "website tư vấn khởi nghiệp seed"],
  ["day-vocal", "dạy vocal", "website học thanh nhạc vocal"],
  ["tri-da-nam", "trị da nam", "website spa chăm sóc da nam"],
  ["lap-wifi-doanh-nghiep", "lắp wifi doanh nghiệp", "website lắp mạng wifi văn phòng"],
];

const CITIES_B8 = [
  ["sa-dec", "Sa Đéc"],
  ["ca-mau", "Cà Mau"],
  ["dong-thap", "Đồng Tháp"],
  ["tan-chau", "Tân Châu"],
  ["go-cong", "Gò Công"],
  ["ben-cat", "Bến Cát"],
  ["tan-uyen", "Tân Uyên"],
  ["di-linh", "Di Linh"],
  ["bao-loc", "Bảo Lộc"],
  ["da-huai", "Đa Huai"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B8) {
  for (const [citySlug, city] of CITIES_B8) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50: website ngành mở rộng */
const B_EXTRA_WEB = [
  ["cong-ty-hosting", "công ty hosting", "website dịch vụ hosting doanh nghiệp"],
  ["dich-vu-migration-website", "dịch vụ migration website", "website chuyển host an toàn"],
  ["cua-hang-thiet-bi-mang", "cửa hàng thiết bị mạng", "website bán router switch"],
  ["dich-vu-backup-du-lieu", "dịch vụ backup dữ liệu", "website sao lưu cloud backup"],
  ["trung-tam-sua-website", "trung tâm sửa website", "website dịch vụ sửa web khẩn"],
  ["cong-ty-cyber-security", "công ty cyber security", "website bảo mật website doanh nghiệp"],
  ["dich-vu-cdn", "dịch vụ CDN", "website tăng tốc CDN Cloudflare"],
  ["cua-hang-domain", "cửa hàng domain", "website đăng ký tên miền"],
  ["dich-vu-email-doanh-nghiep", "dịch vụ email doanh nghiệp", "website email Google Workspace"],
  ["trung-tam-dao-tao-ga4", "trung tâm đào tạo GA4", "website học Google Analytics 4"],
  ["cong-ty-tu-van-digital", "công ty tư vấn digital", "website agency digital marketing"],
  ["dich-vu-setup-gtm", "dịch vụ setup GTM", "website cài Google Tag Manager"],
  ["cua-hang-server", "cửa hàng server", "website bán VPS dedicated"],
  ["dich-vu-monitor-uptime", "dịch vụ monitor uptime", "website giám sát uptime 24/7"],
  ["trung-tam-hoc-automation", "trung tâm học automation", "website học marketing automation"],
  ["cong-ty-tu-van-crm", "công ty tư vấn CRM", "website triển khai CRM HubSpot"],
  ["dich-vu-audit-website", "dịch vụ audit website", "website audit kỹ thuật SEO"],
  ["cua-hang-ssl-certificate", "cửa hàng SSL certificate", "website bán chứng chỉ SSL"],
  ["dich-vu-wordpress-care", "dịch vụ WordPress care", "website bảo trì WordPress trọn gói"],
  ["trung-tam-hoc-looker-studio", "trung tâm học Looker Studio", "website đào tạo báo cáo dashboard"],
  ["cong-ty-data-analytics", "công ty data analytics", "website phân tích dữ liệu kinh doanh"],
  ["dich-vu-zapier-integration", "dịch vụ Zapier integration", "website tích hợp Zapier Make"],
  ["cua-hang-thiet-bi-nas", "cửa hàng thiết bị NAS", "website bán NAS Synology QNAP"],
  ["dich-vu-pentest-website", "dịch vụ pentest website", "website kiểm thử bảo mật web"],
  ["trung-tam-hoc-hubspot", "trung tâm học HubSpot", "website đào tạo HubSpot CRM"],
  ["cong-ty-tu-van-mar-tech", "công ty tư vấn MarTech", "website stack marketing technology"],
  ["dich-vu-staging-website", "dịch vụ staging website", "website môi trường staging dev"],
  ["cua-hang-firewall", "cửa hàng firewall", "website thiết bị firewall doanh nghiệp"],
  ["dich-vu-malware-removal", "dịch vụ malware removal", "website gỡ mã độc website"],
  ["trung-tam-hoc-activecampaign", "trung tâm học ActiveCampaign", "website học email automation"],
  ["cong-ty-business-intelligence", "công ty business intelligence", "website BI dashboard doanh nghiệp"],
  ["dich-vu-api-integration", "dịch vụ API integration", "website tích hợp API CRM ERP"],
  ["cua-hang-ups", "cửa hàng UPS", "website bán UPS lưu điện server"],
  ["dich-vu-website-retainer", "dịch vụ website retainer", "website gói retainer bảo trì hàng tháng"],
  ["trung-tam-hoc-power-bi", "trung tâm học Power BI", "website đào tạo Power BI marketing"],
  ["cong-ty-tu-van-attribution", "công ty tư vấn attribution", "website đo lường marketing attribution"],
  ["dich-vu-heatmap-setup", "dịch vụ heatmap setup", "website cài Hotjar Clarity"],
  ["cua-hang-thiet-bi-rack", "cửa hàng thiết bị rack", "website tủ rack server IDC"],
  ["dich-vu-website-disaster-recovery", "dịch vụ website disaster recovery", "website khôi phục thảm họa dữ liệu"],
  ["trung-tam-hoc-klaviyo", "trung tâm học Klaviyo", "website đào tạo Klaviyo ecommerce"],
  ["cong-ty-tu-van-cdp", "công ty tư vấn CDP", "website Customer Data Platform"],
  ["dich-vu-conversion-tracking", "dịch vụ conversion tracking", "website setup tracking chuyển đổi"],
  ["cua-hang-thiet-bi-ao-hoa", "cửa hàng thiết bị ảo hóa", "website VMware Proxmox"],
  ["dich-vu-website-sla", "dịch vụ website SLA", "website cam kết SLA uptime"],
  ["trung-tam-hoc-mixpanel", "trung tâm học Mixpanel", "website phân tích hành vi product"],
  ["cong-ty-tu-van-marketing-ops", "công ty tư vấn marketing ops", "website vận hành marketing operations"],
  ["dich-vu-looker-studio-dashboard", "dịch vụ Looker Studio dashboard", "website xây dashboard báo cáo"],
  ["cua-hang-thiet-bi-kvm", "cửa hàng thiết bị KVM", "website switch KVM server"],
  ["dich-vu-website-health-check", "dịch vụ website health check", "website kiểm tra sức khỏe web định kỳ"],
  ["trung-tam-hoc-n8n", "trung tâm học n8n", "website học automation n8n self-host"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40: báo giá website */
const C_PRICING = [
  ["xuong-in-lich", "xưởng in lịch", "giá website xưởng in lịch"],
  ["phan-phoi-sinh-to", "phân phối sinh tố", "giá website phân phối sinh tố"],
  ["thiet-bi-spa-bathroom", "thiết bị spa bathroom", "giá website showroom spa bathroom"],
  ["cho-thue-may-chieu", "cho thuê máy chiếu", "giá website thuê máy chiếu"],
  ["day-guitar", "dạy guitar", "giá website học guitar"],
  ["tri-can-thi", "trị cận thị", "giá website phòng khám cận thị"],
  ["thiet-bi-cau-ca", "thiết bị câu cá", "giá website cửa hàng câu cá"],
  ["booth-trien-lam", "booth triển lãm", "giá website thiết kế booth"],
  ["do-an-vat", "đồ ăn vặt", "giá website phân phối snack"],
  ["bao-bi-nhua", "bao bì nhựa", "giá website xưởng bao bì nhựa"],
  ["bep-smart", "bếp smart", "giá website thiết bị bếp thông minh"],
  ["may-lanh-tu-dong", "máy lạnh tự động", "giá website lắp điều hòa"],
  ["day-drums", "dạy drums", "giá website học trống"],
  ["tri-suong-khop", "trị sương khớp", "giá website phòng khám khớp"],
  ["thiet-bi-cau-long", "thiết bị cầu lông", "giá website bán dụng cụ cầu lông"],
  ["catalog-sp", "catalog sản phẩm", "giá website thiết kế catalog"],
  ["tu-van-startup", "tư vấn startup", "giá website tư vấn khởi nghiệp"],
  ["day-vocal", "dạy vocal", "giá website học vocal"],
  ["tri-da-nam", "trị da nam", "giá website spa da nam"],
  ["lap-wifi", "lắp wifi", "giá website lắp wifi doanh nghiệp"],
  ["hosting-doanh-nghiep", "hosting doanh nghiệp", "giá website dịch vụ hosting"],
  ["migration-website", "migration website", "giá website chuyển host"],
  ["backup-cloud", "backup cloud", "giá website sao lưu cloud"],
  ["sua-website", "sửa website", "giá website dịch vụ sửa web"],
  ["cyber-security", "cyber security", "giá website bảo mật web"],
  ["cdn-tang-toc", "CDN tăng tốc", "giá website dịch vụ CDN"],
  ["email-doanh-nghiep", "email doanh nghiệp", "giá website email công ty"],
  ["setup-ga4", "setup GA4", "giá website cài Google Analytics"],
  ["setup-gtm", "setup GTM", "giá website cài Tag Manager"],
  ["monitor-uptime", "monitor uptime", "giá website giám sát uptime"],
  ["audit-website", "audit website", "giá website audit kỹ thuật"],
  ["wordpress-care", "WordPress care", "giá website bảo trì WordPress"],
  ["looker-dashboard", "Looker dashboard", "giá website dashboard báo cáo"],
  ["data-analytics", "data analytics", "giá website phân tích dữ liệu"],
  ["zapier-integration", "Zapier integration", "giá website tích hợp automation"],
  ["pentest-website", "pentest website", "giá website kiểm thử bảo mật"],
  ["malware-removal", "malware removal", "giá website gỡ mã độc"],
  ["heatmap-setup", "heatmap setup", "giá website cài heatmap"],
  ["conversion-tracking", "conversion tracking", "giá website setup tracking"],
  ["website-retainer", "website retainer", "giá website gói retainer bảo trì"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: bảo trì website */
const D_MAINTAIN = [
  ["wordpress", "WordPress", "bảo trì plugin theme cập nhật"],
  ["woocommerce", "WooCommerce", "bảo trì shop online WooCommerce"],
  ["laravel", "Laravel", "bảo trì web app Laravel"],
  ["nextjs", "Next.js", "bảo trì website Next.js SSR"],
  ["shopify", "Shopify", "bảo trì theme app Shopify"],
  ["hosting-shared", "hosting shared", "bảo trì website trên shared hosting"],
  ["vps-cloud", "VPS cloud", "bảo trì website trên VPS"],
  ["cloudflare", "Cloudflare", "bảo trì CDN WAF Cloudflare"],
  ["ssl-certificate", "SSL certificate", "bảo trì chứng chỉ SSL hết hạn"],
  ["backup-dinh-ky", "backup định kỳ", "bảo trì sao lưu tự động hàng ngày"],
  ["malware-scan", "malware scan", "bảo trì quét mã độc định kỳ"],
  ["cap-nhat-plugin", "cập nhật plugin", "bảo trì cập nhật plugin an toàn"],
  ["security-patch", "security patch", "bảo trì vá lỗ hổng bảo mật"],
  ["uptime-monitor", "uptime monitor", "bảo trì giám sát uptime 24/7"],
  ["domain-renewal", "domain renewal", "bảo trì gia hạn tên miền"],
  ["email-hosting", "email hosting", "bảo trì hộp thư doanh nghiệp"],
  ["database-optimize", "database optimize", "bảo trì tối ưu MySQL database"],
  ["cdn-cache", "CDN cache", "bảo trì cache CDN purge"],
  ["staging-site", "staging site", "bảo trì môi trường staging test"],
  ["migration-host", "migration host", "bảo trì chuyển host zero downtime"],
  ["performance-tuning", "performance tuning", "bảo trì tối ưu tốc độ web"],
  ["core-web-vitals", "Core Web Vitals", "bảo trì CWV LCP INP CLS"],
  ["broken-link", "broken link", "bảo trì sửa link hỏng 404"],
  ["form-spam-block", "form spam block", "bảo trì chặn spam form bot"],
  ["htaccess-config", "htaccess config", "bảo trì cấu hình htaccess redirect"],
  ["php-version", "PHP version", "bảo trì nâng cấp PHP version"],
  ["redis-cache", "Redis cache", "bảo trì cache Redis object"],
  ["image-optimize", "image optimize", "bảo trì nén ảnh WebP AVIF"],
  ["lazy-load", "lazy load", "bảo trì lazy load media"],
  ["mobile-responsive", "mobile responsive", "bảo trì sửa lỗi hiển thị mobile"],
  ["seo-technical", "SEO technical", "bảo trì audit kỹ thuật SEO định kỳ"],
  ["content-update", "content update", "bảo trì cập nhật nội dung hàng tháng"],
  ["log-monitor", "log monitor", "bảo trì giám sát error log server"],
  ["dns-management", "DNS management", "bảo trì quản lý DNS record"],
  ["firewall-waf", "firewall WAF", "bảo trì cấu hình WAF firewall"],
].map(([s, k, a]) => webMaintain(s, k, a));

/** E — 30: phân tích analytics */
const E_ANALYTICS = [
  ["google-analytics-4", "Google Analytics 4", "setup GA4 ecommerce event"],
  ["google-tag-manager", "Google Tag Manager", "GTM container data layer"],
  ["conversion-rate-website", "conversion rate website", "tỷ lệ chuyển đổi landing page"],
  ["bounce-rate-landing", "bounce rate landing", "giảm bounce rate trang đích"],
  ["heatmap-behavior", "heatmap hành vi", "Hotjar Clarity heatmap scroll"],
  ["funnel-checkout", "funnel checkout", "phân tích funnel giỏ hàng"],
  ["ecommerce-tracking", "ecommerce tracking", "tracking purchase revenue GA4"],
  ["lead-form-tracking", "lead form tracking", "đo form submit lead quality"],
  ["event-scroll-depth", "event scroll depth", "tracking scroll engagement"],
  ["cross-domain-tracking", "cross domain tracking", "tracking đa domain subdomain"],
  ["attribution-model", "attribution model", "mô hình gán nguồn chuyển đổi"],
  ["cohort-retention", "cohort retention", "phân tích cohort giữ chân khách"],
  ["user-journey-map", "user journey map", "hành trình khách trên website"],
  ["page-speed-impact", "page speed impact", "tốc độ ảnh hưởng conversion"],
  ["search-console-kpi", "Search Console KPI", "tích hợp GSC vào dashboard"],
  ["looker-studio-marketing", "Looker Studio marketing", "dashboard marketing KPI"],
  ["roas-campaign", "ROAS campaign", "phân tích ROAS quảng cáo"],
  ["cpa-lead-quality", "CPA lead quality", "CPA và chất lượng lead form"],
  ["ltv-customer", "LTV customer", "lifetime value khách hàng online"],
  ["ab-test-result", "A/B test result", "phân tích kết quả thử nghiệm A/B"],
  ["session-recording", "session recording", "xem recording hành vi user"],
  ["exit-page-analysis", "exit page analysis", "trang thoát cao cần tối ưu"],
  ["traffic-source-quality", "traffic source quality", "chất lượng nguồn traffic"],
  ["organic-vs-paid", "organic vs paid", "so sánh organic và paid traffic"],
  ["social-referral", "social referral", "phân tích traffic mạng xã hội"],
  ["direct-traffic-spike", "direct traffic spike", "direct traffic tăng đột biến"],
  ["assisted-conversion", "assisted conversion", "chuyển đổi hỗ trợ multi-touch"],
  ["multi-channel-funnel", "multi channel funnel", "MCF báo cáo đa kênh"],
  ["realtime-dashboard", "realtime dashboard", "dashboard realtime marketing ops"],
  ["kpi-marketing-monthly", "KPI marketing tháng", "báo cáo KPI marketing hàng tháng"],
].map(([s, k, a]) => analytics(s, k, a));

/** F — 25: marketing automation workflow */
const F_WORKFLOW = [
  ["lead-capture-to-crm", "lead capture to CRM", "form web đẩy CRM tự động"],
  ["form-to-email-sequence", "form to email sequence", "form trigger email nurture"],
  ["abandoned-cart-zalo", "abandoned cart Zalo", "ZNS nhắc giỏ hàng bỏ quên"],
  ["welcome-email-series", "welcome email series", "chuỗi email chào thành viên mới"],
  ["review-request-maps", "review request Google Maps", "tự động xin review sau dịch vụ"],
  ["birthday-offer-auto", "birthday offer auto", "email ZNS sinh nhật khách hàng"],
  ["webinar-registration-nurture", "webinar registration nurture", "nuôi lead đăng ký webinar"],
  ["quote-follow-up", "quote follow up", "nhắc báo giá chưa phản hồi"],
  ["appointment-reminder", "appointment reminder", "nhắc lịch hẹn SMS Zalo email"],
  ["re-engagement-inactive", "re-engagement inactive", "kích hoạt khách không tương tác"],
  ["upsell-after-purchase", "upsell after purchase", "upsell sau mua hàng ecommerce"],
  ["cross-sell-recommendation", "cross sell recommendation", "gợi ý sản phẩm liên quan"],
  ["lead-scoring-pipeline", "lead scoring pipeline", "chấm điểm lead vào pipeline"],
  ["facebook-lead-to-crm", "Facebook lead to CRM", "Lead Ads Meta sync CRM"],
  ["google-ads-offline-conversion", "Google Ads offline conversion", "upload conversion offline GAds"],
  ["whatsapp-follow-up", "WhatsApp follow up", "follow up lead qua WhatsApp Business"],
  ["invoice-payment-reminder", "invoice payment reminder", "nhắc thanh toán hóa đơn quá hạn"],
  ["survey-after-service", "survey after service", "khảo sát CSAT sau dịch vụ"],
  ["referral-reward-trigger", "referral reward trigger", "thưởng giới thiệu bạn bè"],
  ["content-publish-to-social", "content publish to social", "đăng blog tự động lên social"],
  ["seo-rank-alert", "SEO rank alert", "cảnh báo tụt hạng từ khóa"],
  ["competitor-mention-alert", "competitor mention alert", "alert đối thủ ra tin mới"],
  ["inventory-low-notification", "inventory low notification", "cảnh báo tồn kho thấp shop"],
  ["vip-customer-tag", "VIP customer tag", "tag VIP trigger ưu đãi riêng"],
  ["churn-prevention-email", "churn prevention email", "email giữ chân khách sắp rời"],
].map(([s, k, a]) => automationFlow(s, k, a));

/** G — 30: SEO Google Maps ngành × thành phố */
const G_MAPS = [
  ["spa", "sa-dec", "spa", "Sa Đéc", "Maps spa Sa Đéc hoa sen"],
  ["nha-hang", "ca-mau", "nhà hàng", "Cà Mau", "Maps nhà hàng Cà Mau"],
  ["khach-san", "dong-thap", "khách sạn", "Đồng Tháp", "Maps khách sạn Đồng Tháp"],
  ["nha-khoa", "tan-chau", "nha khoa", "Tân Châu", "Maps nha khoa Tân Châu"],
  ["gym", "go-cong", "gym", "Gò Công", "Maps gym Gò Công"],
  ["tham-my", "ben-cat", "thẩm mỹ", "Bến Cát", "Maps thẩm mỹ Bến Cát"],
  ["bat-dong-san", "tan-uyen", "bất động sản", "Tân Uyên", "Maps BĐS Tân Uyên"],
  ["noi-that", "di-linh", "nội thất", "Di Linh", "Maps nội thất Di Linh"],
  ["xay-dung", "bao-loc", "xây dựng", "Bảo Lộc", "Maps nhà thầu Bảo Lộc"],
  ["phong-kham", "da-huai", "phòng khám", "Đa Huai", "Maps phòng khám Đa Huai"],
  ["du-lich", "sa-dec", "du lịch", "Sa Đéc", "Maps tour Sa Đéc"],
  ["my-pham", "ca-mau", "mỹ phẩm", "Cà Mau", "Maps shop mỹ phẩm Cà Mau"],
  ["dien-may", "dong-thap", "điện máy", "Đồng Tháp", "Maps điện máy Đồng Tháp"],
  ["o-to", "tan-chau", "ô tô", "Tân Châu", "Maps đại lý xe Tân Châu"],
  ["luat-su", "go-cong", "luật sư", "Gò Công", "Maps văn phòng luật Gò Công"],
  ["ke-toan", "ben-cat", "kế toán", "Bến Cát", "Maps dịch vụ kế toán Bến Cát"],
  ["logistics", "tan-uyen", "logistics", "Tân Uyên", "Maps logistics Tân Uyên"],
  ["anh-ngu", "di-linh", "anh ngữ", "Di Linh", "Maps trung tâm anh ngữ Di Linh"],
  ["mam-non", "bao-loc", "mầm non", "Bảo Lộc", "Maps trường mầm non Bảo Lộc"],
  ["quan-cafe", "da-huai", "quán cafe", "Đa Huai", "Maps cafe Đa Huai"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** H — 30: marketing ngành */
const H_MKT = [
  ["xuong-in-lich", "xưởng in lịch", "marketing xưởng in lịch tết"],
  ["phan-phoi-sinh-to", "phân phối sinh tố", "marketing phân phối đồ uống healthy"],
  ["thiet-bi-spa-bathroom", "thiết bị spa bathroom", "marketing showroom thiết bị spa"],
  ["cho-thue-may-chieu", "cho thuê máy chiếu", "marketing thuê máy chiếu sự kiện"],
  ["day-guitar", "dạy guitar", "marketing trung tâm nhạc cụ"],
  ["tri-can-thi", "trị cận thị", "marketing phòng khám mắt"],
  ["thiet-bi-cau-ca", "thiết bị câu cá", "marketing cửa hàng đồ câu"],
  ["booth-trien-lam", "booth triển lãm", "marketing thiết kế gian hàng"],
  ["do-an-vat", "đồ ăn vặt", "marketing phân phối snack"],
  ["bao-bi-nhua", "bao bì nhựa", "marketing xưởng bao bì B2B"],
  ["hosting-doanh-nghiep", "hosting doanh nghiệp", "marketing dịch vụ hosting VN"],
  ["backup-cloud", "backup cloud", "marketing sao lưu dữ liệu SME"],
  ["wordpress-care", "WordPress care", "marketing gói bảo trì WordPress"],
  ["setup-ga4-gtm", "setup GA4 GTM", "marketing triển khai analytics"],
  ["marketing-automation-sme", "marketing automation SME", "marketing automation cho SME"],
  ["zapier-make-vn", "Zapier Make VN", "marketing no-code automation VN"],
  ["hubspot-crm-vn", "HubSpot CRM VN", "marketing triển khai HubSpot"],
  ["looker-dashboard-mkt", "Looker dashboard marketing", "marketing báo cáo dashboard"],
  ["email-automation-ecom", "email automation ecommerce", "marketing email automation shop"],
  ["zalo-zns-automation", "Zalo ZNS automation", "marketing ZNS tự động hóa"],
  ["conversion-tracking-ads", "conversion tracking ads", "marketing đo lường quảng cáo"],
  ["retainer-website-mkt", "retainer website marketing", "marketing gói retainer web"],
  ["data-driven-marketing", "data driven marketing", "marketing ra quyết định bằng data"],
  ["mar-tech-stack", "MarTech stack", "marketing chọn stack công nghệ"],
  ["lead-nurture-b2b", "lead nurture B2B", "marketing nuôi lead B2B dài hạn"],
  ["customer-journey-auto", "customer journey automation", "marketing tự động hóa hành trình"],
  ["attribution-marketing", "attribution marketing", "marketing đo attribution đa kênh"],
  ["lifecycle-email-mkt", "lifecycle email marketing", "marketing email theo vòng đời"],
  ["crm-pipeline-mkt", "CRM pipeline marketing", "marketing vận hành pipeline CRM"],
  ["website-analytics-mkt", "website analytics marketing", "marketing phân tích web KPI"],
].map(([s, k, a]) => marketingInd(s, k, a));

/** I — 25: so sánh hosting / analytics / automation */
const I_COMPARE = [
  compare("shared-hosting-hay-vps", "shared hosting hay VPS", "Shared Hosting Hay VPS?", "chọn hosting SME", "strategy"),
  compare("cloudflare-hay-aws-cloudfront", "cloudflare hay aws cloudfront", "Cloudflare Hay AWS CloudFront?", "CDN so sánh", "strategy"),
  compare("ga4-hay-plausible-privacy", "GA4 hay plausible privacy", "GA4 Hay Plausible Privacy Analytics?", "web analytics privacy", "analytics"),
  compare("ga4-hay-ua-legacy", "GA4 hay Universal Analytics", "GA4 Hay Universal Analytics?", "migration analytics", "analytics"),
  compare("gtm-hay-gan-truc-tiep", "GTM hay gắn trực tiếp", "GTM Hay Gắn Pixel Trực Tiếp?", "tracking implementation", "analytics"),
  compare("heatmap-hay-session-recording", "heatmap hay session recording", "Heatmap Hay Session Recording?", "heatmap tool free", "analytics"),
  compare("looker-studio-hay-power-bi", "looker studio hay power bi", "Looker Studio Hay Power BI?", "dashboard marketing", "analytics"),
  compare("zapier-hay-make-automation", "zapier hay make automation", "Zapier Hay Make Automation?", "no-code workflow", "strategy"),
  compare("hubspot-hay-activecampaign", "hubspot hay activecampaign", "HubSpot Hay ActiveCampaign?", "marketing automation SME", "strategy"),
  compare("klaviyo-hay-mailchimp-ecom", "klaviyo hay mailchimp ecommerce", "Klaviyo Hay Mailchimp Ecommerce?", "email automation shop", "strategy"),
  compare("managed-wordpress-hay-tu-bao-tri", "managed WordPress hay tự bảo trì", "Managed WordPress Hay Tự Bảo Trì?", "WordPress maintenance", "strategy"),
  compare("retainer-hay-ticket-bao-tri", "retainer hay ticket bảo trì", "Retainer Hay Ticket Bảo Trì?", "mô hình bảo trì web", "strategy"),
  compare("backup-plugin-hay-cloud-backup", "backup plugin hay cloud backup", "Backup Plugin Hay Cloud Backup?", "chiến lược sao lưu", "strategy"),
  compare("staging-subdomain-hay-staging-folder", "staging subdomain hay staging folder", "Staging Subdomain Hay Folder?", "môi trường test web", "strategy"),
  compare("matomo-hay-ga4-self-host", "matomo hay GA4 self host", "Matomo Hay GA4 Self-Host?", "analytics privacy first", "analytics"),
  compare("server-side-tracking-hay-client-side", "server side tracking hay client side", "Server-Side Hay Client-Side Tracking?", "tracking privacy", "analytics"),
  compare("n8n-hay-zapier-self-host", "n8n hay zapier self host", "n8n Hay Zapier Self-Host?", "automation self-hosted", "strategy"),
  compare("crm-marketing-hay-sales-crm", "CRM marketing hay sales CRM", "CRM Marketing Hay Sales CRM?", "chọn CRM phù hợp", "strategy"),
  compare("email-drip-hay-broadcast", "email drip hay broadcast", "Email Drip Hay Broadcast?", "chiến lược email", "strategy"),
  compare("multi-touch-hay-last-click", "multi touch hay last click", "Multi-Touch Hay Last-Click?", "attribution model", "analytics"),
  compare("realtime-report-hay-batch-report", "realtime report hay batch report", "Realtime Hay Batch Report?", "tần suất báo cáo", "analytics"),
  compare("in-house-analytics-hay-agency", "in-house analytics hay agency", "In-House Analytics Hay Agency?", "team phân tích data", "analytics"),
  compare("wordpress-hay-headless-cms", "wordpress hay headless CMS", "WordPress Hay Headless CMS?", "kiến trúc website bảo trì", "strategy"),
  compare("uptime-robot-hay-pingdom", "uptime robot hay pingdom", "UptimeRobot Hay Pingdom?", "monitor uptime tool", "strategy"),
  compare("cloud-hosting-hay-on-premise", "cloud hosting hay on premise", "Cloud Hosting Hay On-Premise?", "hạ tầng web doanh nghiệp", "strategy"),
];

/** J — 25: pain point bảo trì / analytics / automation */
const J_PAIN = [
  pain("website-bi-hack-malware", "website bị hack malware", "Website Bị Hack Malware — Khôi Phục An Toàn", "malware recovery"),
  pain("ssl-het-han-website", "SSL hết hạn website", "SSL Hết Hạn Website — Gia Hạn Khẩn", "SSL expired fix"),
  pain("backup-khong-chay-tu-dong", "backup không chạy tự động", "Backup Không Chạy Tự Động — Sửa Cron", "backup cron fail"),
  pain("website-down-khong-biet", "website down không biết", "Website Down Không Biết — Setup Alert", "downtime alert missing"),
  pain("plugin-conflict-website", "plugin conflict website", "Plugin Conflict Website — Gỡ Xung Đột", "WordPress plugin conflict"),
  pain("ga4-khong-co-data", "GA4 không có data", "GA4 Không Có Data — Debug Tracking", "GA4 no data fix"),
  pain("gtm-preview-khong-fire", "GTM preview không fire", "GTM Preview Không Fire — Sửa Tag", "GTM debug fix"),
  pain("conversion-khong-track-duoc", "conversion không track được", "Conversion Không Track Được — Setup Lại", "conversion tracking broken"),
  pain("bounce-rate-qua-cao", "bounce rate quá cao", "Bounce Rate Quá Cao — Phân Tích Nguyên Nhân", "high bounce rate fix"),
  pain("dashboard-khong-dong-bo", "dashboard không đồng bộ", "Dashboard Không Đồng Bộ — Chuẩn Hóa Data", "dashboard data sync"),
  pain("workflow-automation-loi", "workflow automation lỗi", "Workflow Automation Lỗi — Debug Zapier", "automation workflow error"),
  pain("email-automation-gap", "email automation gap", "Email Automation Gap — Lộ Hổng Chuỗi", "email sequence gap"),
  pain("crm-duplicate-lead", "CRM duplicate lead", "CRM Duplicate Lead — Deduplicate", "CRM duplicate contacts"),
  pain("zalo-zns-template-bi-tu-choi", "Zalo ZNS template bị từ chối", "Zalo ZNS Template Bị Từ Chối — Sửa", "ZNS template rejection"),
  pain("hosting-cham-website", "hosting chậm website", "Hosting Chậm Website — Chuyển Host Nhanh", "slow hosting migration"),
  pain("database-qua-lon", "database quá lớn", "Database Quá Lớn — Tối Ưu Và Dọn", "database bloat fix"),
  pain("404-tang-sau-migration", "404 tăng sau migration", "404 Tăng Sau Migration — Redirect 301", "post migration 404"),
  pain("staging-leak-len-production", "staging leak lên production", "Staging Leak Lên Production — Ngăn Index", "staging noindex leak"),
  pain("cookie-consent-chan-ga4", "cookie consent chặn GA4", "Cookie Consent Chặn GA4 — Consent Mode", "consent mode GA4"),
  pain("cross-domain-tracking-sai", "cross domain tracking sai", "Cross Domain Tracking Sai — Sửa Referral", "cross domain fix"),
  pain("heatmap-khong-du-data", "heatmap không đủ data", "Heatmap Không Đủ Data — Tăng Sample", "heatmap low sample"),
  pain("automation-spam-lead", "automation spam lead", "Automation Spam Lead — Lọc Bot Form", "automation spam filter"),
  pain("retainer-khong-ro-scope", "retainer không rõ scope", "Retainer Không Rõ Scope — Định Nghĩa SLA", "retainer scope unclear"),
  pain("website-khong-co-runbook", "website không có runbook", "Website Không Có Runbook — Viết SOP", "maintenance runbook missing"),
  pain("kpi-marketing-khong-khop-ads", "KPI marketing không khớp ads", "KPI Marketing Không Khớp Ads — Reconcile", "marketing ads data mismatch"),
];

/** K — 20: thuật ngữ hosting / analytics / automation */
const K_LAGI = [
  laGi("uptime-sla-la-gi", "uptime SLA là gì", "Uptime SLA Là Gì? Cam Kết Hosting", "hosting SLA explained"),
  laGi("cdn-la-gi-website", "CDN là gì website", "CDN Là Gì Cho Website?", "content delivery network"),
  laGi("waf-la-gi", "WAF là gì", "WAF Là Gì? Web Application Firewall", "WAF security explained"),
  laGi("ssl-tls-la-gi", "SSL TLS là gì", "SSL TLS Là Gì? Bảo Mật Website", "SSL certificate explained"),
  laGi("ga4-event-la-gi", "GA4 event là gì", "GA4 Event Là Gì? Đo Lường Hành Vi", "GA4 events explained"),
  laGi("data-layer-la-gi", "data layer là gì", "Data Layer Là Gì? GTM", "GTM data layer"),
  laGi("conversion-window-la-gi", "conversion window là gì", "Conversion Window Là Gì?", "attribution window"),
  laGi("looker-studio-la-gi", "Looker Studio là gì", "Looker Studio Là Gì? Báo Cáo Free", "Looker Studio dashboard"),
  laGi("heatmap-la-gi", "heatmap là gì", "Heatmap Là Gì? Phân Tích UX", "heatmap analytics"),
  laGi("session-recording-la-gi", "session recording là gì", "Session Recording Là Gì?", "user session replay"),
  laGi("marketing-automation-funnel-la-gi", "marketing automation funnel là gì", "Marketing Automation Funnel Là Gì?", "automation marketing funnel"),
  laGi("workflow-trigger-la-gi", "workflow trigger là gì", "Workflow Trigger Là Gì?", "automation trigger event"),
  laGi("lead-scoring-la-gi", "lead scoring là gì", "Lead Scoring Là Gì? CRM", "lead score automation"),
  laGi("drip-email-campaign-la-gi", "drip email campaign là gì", "Drip Email Campaign Là Gì? Tự Động Nuôi Lead", "drip email automation"),
  laGi("zapier-zap-la-gi", "Zapier Zap là gì", "Zapier Zap Là Gì? No-Code", "Zapier automation explained"),
  laGi("webhook-la-gi-marketing", "webhook là gì marketing", "Webhook Là Gì Trong Marketing?", "webhook integration"),
  laGi("server-side-tagging-la-gi", "server side tagging là gì", "Server-Side Tagging Là Gì?", "sGTM tracking"),
  laGi("consent-mode-la-gi", "consent mode là gì", "Consent Mode Là Gì? GA4 Cookie", "Google consent mode"),
  laGi("retainer-website-la-gi", "retainer website là gì", "Retainer Website Là Gì?", "website maintenance retainer"),
  laGi("runbook-bao-tri-la-gi", "runbook bảo trì là gì", "Runbook Bảo Trì Là Gì?", "maintenance SOP runbook"),
];

export const KEYWORDS_500_BATCH8 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_MAINTAIN,
  ...E_ANALYTICS,
  ...F_WORKFLOW,
  ...G_MAPS,
  ...H_MKT,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
];

export const KEYWORDS_500_BATCH8_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH8.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH8 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH8.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH8.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH8.length) {
  const dupes = KEYWORDS_500_BATCH8.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH8 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH8.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH8.length) {
  const dupes = KEYWORDS_500_BATCH8.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH8 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
