/**
 * CMS: Khách Hàng lives in ERP SPA at /khach-hang (/cms/khach-hang).
 * Legacy /customers redirects there — NOT the removed Next.js /cms/khachhang page.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "public", "cms", "assets");
const bundlePath = fs
  .readdirSync(assetsDir)
  .filter((f) => f.startsWith("index-") && f.endsWith(".js"))
  .map((f) => path.join(assetsDir, f))[0];

if (!bundlePath) {
  console.error("No CMS bundle found");
  process.exit(1);
}

let s = fs.readFileSync(bundlePath, "utf8");
const originalLen = s.length;

const KH_URL = "/cms/khach-hang";

// 0) Undo any prior redirect to removed /cms/khachhang
if (s.includes("/cms/khachhang")) {
  s = s.replaceAll("/cms/khachhang", KH_URL);
  console.log("Replaced /cms/khachhang → /cms/khach-hang in bundle");
}

// 1) Bỏ Khách Hàng trùng trong menu Quản Lý (giữ mục KH ở Tổng quan)
const quanLyKh =
  '{title:"Quản Lý",items:[{href:"/cms/khach-hang",label:"Khách Hàng",icon:J1},{href:"/services"';
const quanLyNoKh = '{title:"Quản Lý",items:[{href:"/services"';
if (s.includes(quanLyKh)) {
  s = s.replace(quanLyKh, quanLyNoKh);
  console.log("Removed Khách Hàng from Quản Lý menu: applied");
} else if (s.includes('{title:"Quản Lý",items:[{href:"/services"')) {
  console.log("Removed Khách Hàng from Quản Lý menu: already applied");
}

// 2) Redirect legacy /customers SPA route → ERP Khách Hàng
const redirectComp = `function CustHubRedirect(){return j.useEffect(()=>{window.location.replace("${KH_URL}")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở Quản lý Khách Hàng…"}),c.jsx("a",{href:"${KH_URL}",className:"text-violet-600 underline",children:"Mở Khách Hàng"})]})}`;

if (s.includes("function CustHubRedirect")) {
  s = s.replace(/function CustHubRedirect\(\)\{[^}]+replace\("[^"]+"\)[^}]+\}[^}]+\}[^}]+\}[^}]+\}/, redirectComp);
  console.log("CustHubRedirect: updated to /cms/khach-hang");
} else {
  const insertBefore = "function BillPerPg(){";
  if (s.includes(insertBefore)) {
    s = s.replace(insertBefore, `${redirectComp}function BillPerPg(){`);
    console.log("CustHubRedirect component: applied");
  }
}

function patch(label, anchor, replacement, already) {
  if (already && s.includes(already)) {
    console.log(`${label}: already applied`);
    return;
  }
  if (!s.includes(anchor)) {
    console.log(`${label}: skipped (anchor not found)`);
    return;
  }
  s = s.replace(anchor, replacement);
  console.log(`${label}: applied`);
}

patch(
  "Customers route redirect",
  'c.jsx(Re,{path:"/customers",component:()=>c.jsx(Le,{comp:jI,title:"Khách Hàng"})})',
  'c.jsx(Re,{path:"/customers",component:()=>c.jsx(Le,{comp:CustHubRedirect,title:"Khách Hàng"})})',
  'comp:CustHubRedirect,title:"Khách Hàng"',
);

patch(
  "Admin customers route redirect",
  'c.jsx(Re,{path:"/admin/customers",component:()=>c.jsx(Le,{comp:jI,title:"Khách Hàng"})})',
  'c.jsx(Re,{path:"/admin/customers",component:()=>c.jsx(Le,{comp:CustHubRedirect,title:"Khách Hàng"})})',
  'path:"/admin/customers",component:()=>c.jsx(Le,{comp:CustHubRedirect',
);

// 3) Customer 360 / sync links → ERP Khách Hàng
if (s.includes('marketingAdminUrl||"/adminbp/khachhang"')) {
  s = s.replace('marketingAdminUrl||"/adminbp/khachhang"', `marketingAdminUrl||"${KH_URL}"`);
  console.log("Cust360 default admin URL: applied");
}

if (s.includes('href:"/adminbp/khachhang"')) {
  s = s.replaceAll('href:"/adminbp/khachhang"', `href:"${KH_URL}"`);
  console.log("Replaced adminbp/khachhang hrefs");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
