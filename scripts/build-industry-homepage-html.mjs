/**
 * Generate HTML mockup trang chủ theo config ngành.
 */
export function buildIndustryHomepageHtml(cfg) {
  const services = cfg.services
    .map(
      (s, i) => `
      <article class="svc">
        <div class="svc-img" style="background:linear-gradient(145deg,${cfg.soft},${cfg.secondary}55)"></div>
        <div class="svc-body">
          <div class="svc-ico">${i + 1}</div>
          <h4>${s.t}</h4>
          <p>${s.d}</p>
          <span class="more">Chi tiết →</span>
        </div>
      </article>`,
    )
    .join("");

  const stats = cfg.stats
    .map((s) => `<div><strong>${s.n}</strong><span>${s.l}</span></div>`)
    .join("");

  const nav = cfg.nav
    .map((n, i) => `<a href="#" class="${i === 0 ? "active" : ""}">${n}</a>`)
    .join("");

  const bullets = cfg.bullets.map((b) => `<li>${b}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${cfg.brand} — Mockup trang chủ</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --p: ${cfg.primary};
      --s: ${cfg.secondary};
      --soft: ${cfg.soft};
      --ink: #1a2332;
      --muted: #5b6b7c;
      --line: #e8edf2;
      --bg: #f7fafc;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Be Vietnam Pro", system-ui, sans-serif;
      color: var(--ink);
      background: #cfd8e3;
      -webkit-font-smoothing: antialiased;
    }
    .frame {
      width: 1200px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    }
    .topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 36px; background: var(--p); color: #fff; font-size: 12px;
    }
    .topbar strong { color: var(--s); }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 36px; border-bottom: 1px solid var(--line); background: #fff;
    }
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-mark {
      width: 40px; height: 40px; border-radius: 10px;
      background: linear-gradient(145deg, var(--s), var(--p));
      display: grid; place-items: center; color: #fff; font-size: 14px; font-weight: 800;
    }
    .logo-text strong { display: block; font-size: 15px; color: var(--p); }
    .logo-text small { color: var(--muted); font-size: 11px; }
    nav { display: flex; gap: 16px; font-size: 13px; font-weight: 600; }
    nav a { text-decoration: none; color: var(--ink); }
    nav a.active { color: var(--p); }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 12px;
      text-decoration: none; border: none;
    }
    .btn-primary { background: var(--p); color: #fff; }
    .btn-accent { background: var(--s); color: #1a1505; }
    .btn-outline { background: #fff; color: var(--p); border: 1.5px solid var(--p); }
    .hero {
      position: relative; height: 400px; overflow: hidden;
      background: var(--hero-from, ${cfg.heroFrom});
    }
    .hero-bg {
      position: absolute; inset: 0;
      background:
        linear-gradient(110deg, ${cfg.heroFrom}ee 0%, ${cfg.heroFrom}99 42%, ${cfg.heroTo}66 100%),
        repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.03) 49px),
        radial-gradient(ellipse at 75% 40%, ${cfg.secondary}55, transparent 55%);
    }
    .hero-content {
      position: relative; z-index: 1; max-width: 560px;
      padding: 64px 36px 0; color: #fff;
    }
    .hero-content .eyebrow {
      display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; opacity: 0.85; margin-bottom: 10px;
      padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.12);
    }
    .hero-content h1 {
      font-size: 32px; line-height: 1.25; font-weight: 800; margin-bottom: 14px;
    }
    .hero-content ul { list-style: none; margin-bottom: 20px; }
    .hero-content li {
      font-size: 14px; margin: 7px 0; padding-left: 22px; position: relative; opacity: 0.95;
    }
    .hero-content li::before {
      content: "✓"; position: absolute; left: 0; color: var(--s); font-weight: 800;
    }
    .hero-actions { display: flex; gap: 12px; }
    .stats {
      position: absolute; left: 36px; right: 36px; bottom: 20px; z-index: 2;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
      background: #fff; border-radius: 14px; padding: 16px 10px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }
    .stats div { text-align: center; }
    .stats strong { display: block; font-size: 20px; color: var(--p); font-weight: 800; }
    .stats span { font-size: 11px; color: var(--muted); font-weight: 500; }
    section { padding: 44px 36px; }
    .sec-title {
      text-align: center; font-size: 20px; font-weight: 800; color: var(--p);
      text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px;
    }
    .sec-sub {
      text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 26px;
    }
    .svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .svc {
      border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: #fff;
      box-shadow: 0 4px 14px rgba(0,0,0,0.04);
    }
    .svc-img { height: 100px; }
    .svc-body { padding: 12px 12px 14px; }
    .svc-ico {
      width: 28px; height: 28px; border-radius: 50%; background: var(--p);
      color: #fff; display: grid; place-items: center; font-size: 12px; margin-bottom: 8px; font-weight: 800;
    }
    .svc h4 { font-size: 13px; color: var(--p); margin-bottom: 4px; }
    .svc p { font-size: 11px; color: var(--muted); line-height: 1.45; margin-bottom: 8px; }
    .svc .more { font-size: 11px; font-weight: 700; color: var(--p); }
    .band {
      background: var(--soft); display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: center;
    }
    .band h3 { font-size: 22px; color: var(--p); margin-bottom: 10px; }
    .band p { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
    .band-card {
      background: #fff; border-radius: 16px; padding: 22px; border: 1px solid var(--line);
      box-shadow: 0 10px 28px rgba(0,0,0,0.06);
    }
    .band-card label { display: block; font-size: 11px; font-weight: 600; color: var(--muted); margin: 8px 0 4px; }
    .band-card .field {
      height: 36px; border-radius: 8px; border: 1px solid var(--line); background: var(--bg);
    }
    .footer {
      background: var(--p); color: #fff; padding: 28px 36px;
      display: flex; justify-content: space-between; align-items: center; font-size: 12px;
    }
    .footer strong { font-size: 14px; }
    .footer span { opacity: 0.8; }
  </style>
</head>
<body>
  <div class="frame" id="page">
    <div class="topbar">
      <span>Hotline: <strong>${cfg.phone}</strong></span>
      <span>${cfg.tagline}</span>
    </div>
    <header>
      <div class="logo">
        <div class="logo-mark">${cfg.mark}</div>
        <div class="logo-text">
          <strong>${cfg.brand}</strong>
          <small>Website mẫu ngành · Bứt Phá Marketing</small>
        </div>
      </div>
      <nav>${nav}</nav>
      <a class="btn btn-primary" href="#">${cfg.cta}</a>
    </header>
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="eyebrow">${cfg.tagline}</div>
        <h1>${cfg.brand}<br/>Giải pháp số cho doanh nghiệp</h1>
        <ul>${bullets}</ul>
        <div class="hero-actions">
          <a class="btn btn-accent" href="#">${cfg.cta}</a>
          <a class="btn btn-outline" href="#" style="border-color:#fff;color:#fff;background:transparent">Xem dịch vụ</a>
        </div>
      </div>
      <div class="stats">${stats}</div>
    </div>
    <section>
      <h2 class="sec-title">Dịch vụ nổi bật</h2>
      <p class="sec-sub">Layout mẫu ngành — CTA rõ, mobile-first, chuẩn SEO on-page</p>
      <div class="svc-grid">${services}</div>
    </section>
    <section style="background:var(--soft)">
      <h2 class="sec-title">Vì sao chọn ${cfg.brand}?</h2>
      <p class="sec-sub">Khối lợi ích — tăng niềm tin trước khi form</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px">
          <strong style="color:var(--p);font-size:13px">Chuyên môn ngành</strong>
          <p style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5">Nội dung &amp; UI đúng hành trình khách hàng trong lĩnh vực của bạn.</p>
        </div>
        <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px">
          <strong style="color:var(--p);font-size:13px">Chuyển đổi rõ</strong>
          <p style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5">CTA đặt lịch / Zalo / gọi — đo được trên GA4 &amp; pixel.</p>
        </div>
        <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px">
          <strong style="color:var(--p);font-size:13px">SEO &amp; tốc độ</strong>
          <p style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5">On-page, mobile-first, sẵn sàng chạy ads và organic.</p>
        </div>
      </div>
    </section>
    <section>
      <h2 class="sec-title">Quy trình làm việc</h2>
      <p class="sec-sub">4 bước — minh bạch tiến độ</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        ${["Khảo sát", "Thiết kế UI", "Lập trình", "Bàn giao"]
          .map(
            (t, i) =>
              `<div style="text-align:center;padding:16px;border:1px solid var(--line);border-radius:14px">
            <div style="width:36px;height:36px;margin:0 auto 10px;border-radius:50%;background:var(--p);color:#fff;display:grid;place-items:center;font-weight:800;font-size:13px">${i + 1}</div>
            <strong style="font-size:13px;color:var(--p)">${t}</strong>
          </div>`,
          )
          .join("")}
      </div>
    </section>
    <section class="band">
      <div>
        <h3>Sẵn sàng chuyển đổi khách hàng</h3>
        <p>Form / Zalo / hotline trên mọi trang. Thiết kế bởi Bứt Phá Marketing — đồng bộ brand, tốc độ và SEO local.</p>
        <a class="btn btn-primary" href="#">${cfg.cta}</a>
      </div>
      <div class="band-card">
        <strong style="color:var(--p);font-size:14px">Form tư vấn nhanh</strong>
        <label>Họ tên</label><div class="field"></div>
        <label>Số điện thoại</label><div class="field"></div>
        <label>Nhu cầu</label><div class="field" style="height:64px"></div>
        <a class="btn btn-primary" href="#" style="width:100%;margin-top:14px">Gửi yêu cầu</a>
      </div>
    </section>
    <div class="footer">
      <div>
        <strong>${cfg.brand}</strong><br/>
        <span>Mockup UI ngành · butphamarketing.com</span>
      </div>
      <span>${cfg.phone}</span>
    </div>
  </div>
</body>
</html>`;
}
