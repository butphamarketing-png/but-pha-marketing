/**
 * Phase 3 DNA round-2: khối unique sâu hơn cho 7 ngành Jaccard ≥0.75.
 * Chạy: node scripts/seed-phase3-dna-r2.mjs
 *       node scripts/seed-phase3-dna-r2.mjs --dry-run
 *       npm run seed:phase3-dna-r2
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

/**
 * Round-2 DNA — từ vựng / angle khác hẳn khối dna-nganh (round 1)
 * để kéo Jaccard xuống khi so cặp soft-duplicate.
 */
const DNA_R2 = {
  "thiet-ke-website-bao-bi": {
    title: "Góc nhìn sản xuất bao bì — không phải website catalog generic",
    facts: [
      "Workflow: brief → dieline → mockup 3D → duyệt prepress → đặt máy",
      "Bảng thuât ngữ: kraft, duplex, PE, OPP, hotstamp, UV, soft-touch",
      "CTA báo giá theo GSM / kích thước / số màu — không chỉ «liên hệ»",
      "Case angle: rút ngắn thời gian chốt báo giá từ 3 ngày xuống <24h bằng form thông số",
    ],
    compares: [
      "Khác website in ấn: bao bì nhấn dieline & vật liệu, không phải deadline POSM sự kiện",
      "Khác nội thất: không portfolio căn hộ — mà nhà máy, MOQ, chứng nhận xuất khẩu",
    ],
    faq: [
      ["Có cần gallery máy in/ép không?", "Có — ảnh line sản xuất tăng trust B2B hơn ảnh sản phẩm stock."],
      ["Từ khóa nào ưu tiên?", "«thiết kế bao bì», «bao bì carton», «túi giấy in», «tem nhãn» theo cụm dịch vụ thật."],
    ],
  },
  "thiet-ke-website-in-an-quang-cao": {
    title: "In ấn quảng cáo = deadline sự kiện + prepress, không phải xưởng bao bì",
    facts: [
      "Checklist giao file: bleed 3mm, CMYK, 300dpi, font outline, safe zone",
      "Bảng sản phẩm: standee roll-up, backdrop, decal xe, hộp đèn, namecard NFC",
      "Module đếm ngược / slot gia công theo lịch hội thảo",
      "Case angle: agency sự kiện cắt vòng email — upload file + ETA sản xuất trên web",
    ],
    compares: [
      "Khác bao bì: vòng đời dự án ngắn (ngày/tuần), không MOQ hàng loạt tháng",
      "Khác gara/nội thất: không đặt lịch kỹ thuật viên — mà slot máy in & giao hàng",
    ],
    faq: [
      ["Có bán thiết kế luôn không?", "Có thể gói design + in; hoặc chỉ gia công khi khách có file sẵn."],
      ["SEO sản phẩm POSM?", "Trang riêng standee/backdrop tốt hơn nhồi hết vào 1 trang dịch vụ."],
    ],
  },
  "thiet-ke-website-thiet-bi-ve-sinh": {
    title: "Showroom sen vòi — so thông số kỹ thuật, không copy template giáo dục",
    facts: [
      "Filter: thương hiệu, loại (sen cây, bồn cầu 1 khối), công nghệ (cảm ứng, tiết kiệm nước)",
      "Bảng bảo hành + hướng dẫn lắp theo loại nhà (căn hộ / biệt thự)",
      "Feed ảnh chuẩn Shopping Ads — tránh ảnh mờ dẫn CPL cao",
      "Case angle: giảm lead «hỏi giá rẻ Shopee» bằng bảng khoảng giá + tư vấn kỹ thuật",
    ],
    compares: [
      "Khác nội thất: SKU thiết bị + thông số thủy lực, không concept phòng",
      "Khác gara: không lịch đồng sơn — mà tư vấn chọn model & vận chuyển showroom",
    ],
    faq: [
      ["Có cần Local SEO showroom?", "Có — schema LocalBusiness + NAP từng cửa hàng quận."],
      ["Giá công khai hết không?", "Nên khoảng giá theo dòng; model VIP để form."],
    ],
  },
  "thiet-ke-website-gara-o-to": {
    title: "Gara: đặt lịch bay + gói bảo dưỡng — intent khác hẳn học ngoại ngữ",
    facts: [
      "Booking theo khung giờ / loại dịch vụ (đồng sơn, bảo dưỡng, chăm sóc nội thất xe)",
      "Bảng giá gói kilomet / theo hạng xe",
      "Gallery trước-sau + review thợ có tên",
      "Case angle: lấp slot trống sáng sớm bằng booking online + nhắc Zalo",
    ],
    compares: [
      "Khác trung tâm Anh ngữ: không lộ trình khóa học — mà slot sửa chữa vật lý",
      "Khác thiết bị vệ sinh: dịch vụ theo lịch, không catalog sản phẩm gắn tường",
    ],
    faq: [
      ["Có cần app đặt lịch?", "Website + Zalo OA đủ cho SME; app chỉ khi chuỗi nhiều chi nhánh."],
      ["Maps quan trọng thế nào?", "Local pack quyết định gọi điện — GBP + ảnh gara thật là bắt buộc."],
    ],
  },
  "thiet-ke-website-trung-tam-anh-ngu": {
    title: "Edtech Anh ngữ: lộ trình + lịch khai giảng — không phải site dịch vụ kỹ thuật",
    facts: [
      "Trang khóa: IELTS / giao tiếp / trẻ em + đầu ra cam kết (band/score)",
      "Lịch khai giảng + form test đầu vào online",
      "Teacher profile + chứng chỉ — E-E-A-T giáo dục",
      "Case angle: giảm CPL ads bằng landing theo khóa (không dùng 1 homepage chung)",
    ],
    compares: [
      "Khác trường mầm non: phụ huynh chọn khóa theo mục tiêu điểm, không lịch đưa đón trẻ",
      "Khác gara: conversion qua test/trial class, không đặt lịch sửa chữa",
    ],
    faq: [
      ["Có cần LMS trên web?", "Nên link LMS; web public để SEO + lead, LMS để học viên."],
      ["Schema Course?", "Có — Course + FAQ giúp rich result khóa học."],
    ],
  },
  "thiet-ke-website-truong-mam-non": {
    title: "Mầm non: tin tưởng phụ huynh — ảnh trẻ/lớp + quy trình đón trả",
    facts: [
      "Tour ảo cơ sở + thực đơn tuần + hoạt động theo lứa tuổi",
      "Form đăng ký tham quan + checklist giấy tờ nhập học",
      "Nhấn mạnh an toàn: camera, y tế học đường, tỷ lệ giáo viên/trẻ",
      "Case angle: mùa tuyển sinh — landing «tuyển sinh 2026» tách khỏi trang giới thiệu chung",
    ],
    compares: [
      "Khác Anh ngữ: đối tượng phụ huynh, không learner tự thân",
      "Khác nội thất: không gallery căn hộ — mà không gian lớp, sân chơi, bếp ăn",
    ],
    faq: [
      ["Có blog dinh dưỡng/giáo dục?", "Có — topical authority + chia sẻ phụ huynh."],
      ["Local SEO quận?", "Bắt buộc — «trường mầm non + quận» và GBP."],
    ],
  },
  "thiet-ke-website-noi-that": {
    title: "Nội thất: portfolio concept theo phong cách — không phải catalog phụ kiện WC",
    facts: [
      "Filter dự án: chung cư / biệt thự / văn phòng + style (Japandi, Indochine…)",
      "Quy trình: khảo sát → 3D → thi công → bàn giao",
      "Bảng khoảng ngân sách / m²",
      "Case angle: tăng tỷ lệ chốt bằng 3D walkthrough nhúng trên từng dự án",
    ],
    compares: [
      "Khác thiết bị vệ sinh: bán giải pháp không gian, không SKU từng vòi sen",
      "Khác bao bì: không dieline — mà moodboard + bản vẽ thi công",
    ],
    faq: [
      ["Website có thay portfolio Behance?", "Web owned-media + SEO local; Behance chỉ referral."],
      ["Có cần blog xu hướng?", "Có — «phong cách Japandi 2026» kéo long-tail."],
    ],
  },
};

function buildR2Section(slug, dna) {
  const facts = dna.facts.map((f) => `<li>${f}</li>`).join("\n");
  const compares = dna.compares.map((c) => `<li>${c}</li>`).join("\n");
  const faqs = dna.faq
    .map(
      ([q, a]) =>
        `<div class="mt-3"><p class="font-semibold text-indigo-950">${q}</p><p class="text-sm text-slate-600">${a}</p></div>`,
    )
    .join("\n");
  return `
<section id="dna-nganh-r2" class="my-8 rounded-2xl border border-violet-100 bg-violet-50/40 p-5">
<h2 class="text-xl font-bold text-indigo-950">${dna.title}</h2>
<p class="mt-2 text-sm text-slate-600">Khối DNA vòng 2 — giảm soft-duplicate so với ngành gần (Phase 3).</p>
<h3 class="mt-4 font-bold text-indigo-900">Chi tiết vận hành &amp; chuyển đổi</h3>
<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
${facts}
</ul>
<h3 class="mt-4 font-bold text-indigo-900">Khác ngành hay bị nhầm</h3>
<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
${compares}
</ul>
<h3 class="mt-4 font-bold text-indigo-900">FAQ chuyên sâu</h3>
${faqs}
<p class="mt-4 text-sm">Silo: <a href="${SITE}/banggia">báo giá</a> · <a href="${SITE}/website">website</a> · <a href="${SITE}/blog/${slug}">canonical bài này</a> · <a href="${SITE}/lien-he">liên hệ</a>.</p>
</section>`;
}

function injectR2(content, slug, dna) {
  const block = buildR2Section(slug, dna);
  if (content.includes('id="dna-nganh-r2"')) {
    return content.replace(/<section id="dna-nganh-r2"[\s\S]*?<\/section>/, block.trim());
  }
  if (content.includes('id="dna-nganh"')) {
    return content.replace(
      /(<section id="dna-nganh"[\s\S]*?<\/section>)/,
      `$1\n${block}`,
    );
  }
  if (content.includes('id="silo-nganh"')) {
    return content.replace('<section id="silo-nganh"', `${block}\n<section id="silo-nganh"`);
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

const slugs = Object.keys(DNA_R2);
console.log(`=== Phase 3 DNA R2 ===`);
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
    const content = injectR2(row.content || "", slug, DNA_R2[slug]);
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
