/**
 * HTML mockup gallery pages 2–5 (dịch vụ / bảng giá / về chúng tôi / liên hệ).
 */
function shell({ cfg, title, activeNavIndex, body }) {
  const nav = cfg.nav
    .map((n, i) => `<a href="#" class="${i === activeNavIndex ? "active" : ""}">${n}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>${cfg.brand} — ${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --p: ${cfg.primary}; --s: ${cfg.secondary}; --soft: ${cfg.soft};
      --ink: #1a2332; --muted: #5b6b7c; --line: #e8edf2; --bg: #f7fafc;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Be Vietnam Pro", system-ui, sans-serif; color: var(--ink); background: #cfd8e3; -webkit-font-smoothing: antialiased; }
    .frame { width: 1200px; margin: 0 auto; background: #fff; box-shadow: 0 20px 60px rgba(0,0,0,.18); }
    .topbar { display:flex; justify-content:space-between; padding:10px 36px; background:var(--p); color:#fff; font-size:12px; }
    .topbar strong { color: var(--s); }
    header { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; border-bottom:1px solid var(--line); }
    .logo { display:flex; align-items:center; gap:10px; }
    .logo-mark { width:40px; height:40px; border-radius:10px; background:linear-gradient(145deg,var(--s),var(--p)); display:grid; place-items:center; color:#fff; font-size:14px; font-weight:800; }
    .logo-text strong { display:block; font-size:15px; color:var(--p); }
    .logo-text small { color:var(--muted); font-size:11px; }
    nav { display:flex; gap:16px; font-size:13px; font-weight:600; }
    nav a { text-decoration:none; color:var(--ink); }
    nav a.active { color:var(--p); }
    .btn { display:inline-flex; align-items:center; justify-content:center; padding:10px 18px; border-radius:8px; font-weight:700; font-size:12px; text-decoration:none; border:none; }
    .btn-primary { background:var(--p); color:#fff; }
    .btn-accent { background:var(--s); color:#1a1505; }
    .page-hero { padding:36px; background:linear-gradient(120deg, ${cfg.heroFrom}, ${cfg.heroTo}); color:#fff; }
    .page-hero h1 { font-size:28px; font-weight:800; margin-bottom:8px; }
    .page-hero p { font-size:14px; opacity:.92; max-width:640px; }
    .crumb { font-size:11px; opacity:.75; margin-bottom:10px; }
    section { padding:40px 36px; }
    .sec-title { font-size:20px; font-weight:800; color:var(--p); margin-bottom:6px; }
    .sec-sub { color:var(--muted); font-size:13px; margin-bottom:22px; }
    .footer { background:var(--p); color:#fff; padding:24px 36px; display:flex; justify-content:space-between; font-size:12px; }
  </style>
</head>
<body>
  <div class="frame" id="page">
    <div class="topbar"><span>Hotline: <strong>${cfg.phone}</strong></span><span>${cfg.tagline}</span></div>
    <header>
      <div class="logo">
        <div class="logo-mark">${cfg.mark}</div>
        <div class="logo-text"><strong>${cfg.brand}</strong><small>Mockup UI · Bứt Phá Marketing</small></div>
      </div>
      <nav>${nav}</nav>
      <a class="btn btn-primary" href="#">${cfg.cta}</a>
    </header>
    ${body}
    <div class="footer">
      <div><strong>${cfg.brand}</strong><br/><span>butphamarketing.com</span></div>
      <span>${cfg.phone}</span>
    </div>
  </div>
</body>
</html>`;
}

/** Page 2 — danh sách dịch vụ chi tiết */
export function buildIndustryServicesHtml(cfg) {
  const rows = cfg.services
    .map(
      (s, i) => `
      <article style="display:grid;grid-template-columns:160px 1fr auto;gap:18px;align-items:center;padding:18px;border:1px solid var(--line);border-radius:14px;margin-bottom:12px;background:#fff">
        <div style="height:100px;border-radius:10px;background:linear-gradient(145deg,${cfg.soft},${cfg.secondary}66)"></div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--s);margin-bottom:4px">DỊCH VỤ 0${i + 1}</div>
          <h3 style="font-size:16px;color:var(--p);margin-bottom:6px">${s.t}</h3>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">${s.d}. Tư vấn miễn phí · Báo giá rõ · Hỗ trợ sau bàn giao.</p>
        </div>
        <a class="btn btn-primary" href="#" style="white-space:nowrap">${cfg.cta}</a>
      </article>`,
    )
    .join("");

  const body = `
    <div class="page-hero">
      <div class="crumb">Trang chủ / Dịch vụ</div>
      <h1>Dịch vụ ${cfg.brand}</h1>
      <p>Danh mục dịch vụ chuẩn ngành — CTA rõ, dễ chạy ads và SEO landing riêng từng hạng mục.</p>
    </div>
    <section>
      <h2 class="sec-title">Tất cả dịch vụ</h2>
      <p class="sec-sub">Layout list + card — phù hợp website ngành chuyên sâu</p>
      ${rows}
    </section>`;

  return shell({ cfg, title: "Dịch vụ", activeNavIndex: 1, body });
}

/** Page 3 — bảng giá */
export function buildIndustryPricingHtml(cfg) {
  const packs = [
    { name: "Cơ bản", price: "6.000.000đ", note: "Landing / giới thiệu", feats: ["5–8 trang", "Mobile + SEO cơ bản", "Form / Zalo"] },
    { name: "Chuyên nghiệp", price: "9.000.000đ", note: "Phổ biến SME", feats: ["UI theo brand", "SEO nâng cao", "CRO + tracking", "Blog silo"], hot: true },
    { name: "Cao cấp", price: "12.000.000đ", note: "Hệ thống / nhiều tính năng", feats: ["Custom feature", "API / CRM", "Ưu tiên hỗ trợ", "Tối ưu ads"] },
  ];

  const cards = packs
    .map(
      (p) => `
      <div style="border:2px solid ${p.hot ? "var(--p)" : "var(--line)"};border-radius:16px;padding:22px;background:${p.hot ? cfg.soft : "#fff"};position:relative">
        ${p.hot ? `<span style="position:absolute;top:-10px;right:16px;background:var(--p);color:#fff;font-size:10px;font-weight:800;padding:4px 10px;border-radius:999px">PHỔ BIẾN</span>` : ""}
        <div style="font-size:12px;font-weight:700;color:var(--muted)">${p.name}</div>
        <div style="font-size:26px;font-weight:800;color:var(--p);margin:8px 0 4px">${p.price}</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:14px">${p.note}</div>
        <ul style="list-style:none;font-size:13px;color:var(--ink);margin-bottom:18px">
          ${p.feats.map((f) => `<li style="padding:6px 0;border-bottom:1px solid var(--line)">✓ ${f}</li>`).join("")}
        </ul>
        <a class="btn ${p.hot ? "btn-primary" : "btn-accent"}" href="#" style="width:100%">Chọn gói</a>
      </div>`,
    )
    .join("");

  const body = `
    <div class="page-hero">
      <div class="crumb">Trang chủ / Bảng giá</div>
      <h1>Bảng giá tham chiếu</h1>
      <p>Giá mẫu hiển thị trên website ngành — đồng bộ gói Bứt Phá (chưa gồm domain/hosting).</p>
    </div>
    <section>
      <h2 class="sec-title">Gói thiết kế website</h2>
      <p class="sec-sub">Minh bạch scope — dễ so sánh với đối thủ</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${cards}</div>
      <p style="margin-top:18px;font-size:12px;color:var(--muted);text-align:center">* Báo giá chính xác sau khảo sát ngành ${cfg.brand}</p>
    </section>`;

  return shell({ cfg, title: "Bảng giá", activeNavIndex: Math.min(2, cfg.nav.length - 1), body });
}

/** Page 4 — về chúng tôi / chứng cứ */
export function buildIndustryAboutHtml(cfg) {
  const stats = cfg.stats
    .map(
      (s) => `
      <div style="text-align:center;padding:20px;background:#fff;border:1px solid var(--line);border-radius:14px">
        <strong style="display:block;font-size:28px;color:var(--p)">${s.n}</strong>
        <span style="font-size:12px;color:var(--muted)">${s.l}</span>
      </div>`,
    )
    .join("");

  const body = `
    <div class="page-hero">
      <div class="crumb">Trang chủ / Giới thiệu</div>
      <h1>Về ${cfg.brand}</h1>
      <p>${cfg.tagline}. Trang giới thiệu xây dựng niềm tin trước khi khách để lại thông tin.</p>
    </div>
    <section>
      <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:28px;align-items:center">
        <div>
          <h2 class="sec-title" style="text-align:left">Câu chuyện thương hiệu</h2>
          <p style="font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:14px">
            ${cfg.brand} phục vụ khách hàng với tiêu chuẩn chuyên môn rõ ràng, quy trình minh bạch và kênh liên hệ nhanh (Zalo / hotline / form).
          </p>
          <ul style="font-size:13px;color:var(--ink);line-height:1.8;padding-left:18px">
            ${cfg.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </div>
        <div style="height:280px;border-radius:16px;background:linear-gradient(160deg,${cfg.soft},${cfg.secondary}55);border:1px solid var(--line)"></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px">${stats}</div>
    </section>
    <section style="background:var(--soft)">
      <h2 class="sec-title">Đội ngũ / chứng nhận</h2>
      <p class="sec-sub">Khối social proof — review, chứng chỉ, đối tác</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        ${["Chứng nhận", "Review khách", "Đối tác"]
          .map(
            (t) => `
          <div style="background:#fff;border-radius:14px;padding:18px;border:1px solid var(--line);min-height:120px">
            <strong style="color:var(--p);font-size:14px">${t}</strong>
            <div style="margin-top:12px;height:64px;border-radius:8px;background:linear-gradient(90deg,#fff,${cfg.soft})"></div>
          </div>`,
          )
          .join("")}
      </div>
    </section>`;

  return shell({ cfg, title: "Giới thiệu", activeNavIndex: Math.min(3, cfg.nav.length - 1), body });
}

/** Page 5 — liên hệ */
export function buildIndustryContactHtml(cfg) {
  const body = `
    <div class="page-hero">
      <div class="crumb">Trang chủ / Liên hệ</div>
      <h1>Liên hệ ${cfg.brand}</h1>
      <p>Form + map + hotline — conversion page chuẩn cho ads và SEO local.</p>
    </div>
    <section>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <div style="border:1px solid var(--line);border-radius:16px;padding:22px;background:#fff">
          <h2 class="sec-title" style="text-align:left;font-size:18px">Gửi yêu cầu</h2>
          <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin:10px 0 4px">Họ tên</label>
          <div style="height:40px;border-radius:8px;border:1px solid var(--line);background:var(--bg)"></div>
          <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin:10px 0 4px">Số điện thoại</label>
          <div style="height:40px;border-radius:8px;border:1px solid var(--line);background:var(--bg)"></div>
          <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin:10px 0 4px">Email</label>
          <div style="height:40px;border-radius:8px;border:1px solid var(--line);background:var(--bg)"></div>
          <label style="display:block;font-size:11px;font-weight:600;color:var(--muted);margin:10px 0 4px">Nhu cầu</label>
          <div style="height:88px;border-radius:8px;border:1px solid var(--line);background:var(--bg)"></div>
          <a class="btn btn-primary" href="#" style="width:100%;margin-top:16px">${cfg.cta}</a>
        </div>
        <div>
          <div style="border:1px solid var(--line);border-radius:16px;padding:18px;margin-bottom:14px;background:var(--soft)">
            <strong style="color:var(--p)">Hotline</strong>
            <div style="font-size:22px;font-weight:800;margin-top:6px">${cfg.phone}</div>
            <div style="font-size:12px;color:var(--muted);margin-top:6px">Zalo / gọi trực tiếp 8h–21h</div>
          </div>
          <div style="height:260px;border-radius:16px;border:1px solid var(--line);background:
            linear-gradient(135deg,${cfg.soft},${cfg.secondary}33),
            repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(0,0,0,.03) 19px),
            repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(0,0,0,.03) 19px);
            display:grid;place-items:center;color:var(--p);font-weight:700;font-size:14px">
            Bản đồ Google Maps (placeholder)
          </div>
        </div>
      </div>
    </section>`;

  return shell({ cfg, title: "Liên hệ", activeNavIndex: cfg.nav.length - 1, body });
}

export const GALLERY_BUILDERS = {
  2: buildIndustryServicesHtml,
  3: buildIndustryPricingHtml,
  4: buildIndustryAboutHtml,
  5: buildIndustryContactHtml,
};
