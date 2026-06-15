/**
 * CMS hub: Khách Hàng lives at /cms/khachhang (Next.js), not legacy ERP list.
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

function patch(label, anchor, replacement, already) {
  if (already && s.includes(already)) {
    console.log(`${label}: already applied`);
    return;
  }
  if (!s.includes(anchor)) {
    console.error(`${label}: anchor not found`);
    process.exit(1);
  }
  s = s.replace(anchor, replacement);
  console.log(`${label}: applied`);
}

// 1) Menu → /cms/khachhang
patch(
  "Menu Khách Hàng → CMS hub",
  '{href:"/customers",label:"Khách Hàng",icon:J1}',
  '{href:"/cms/khachhang",label:"Khách Hàng",icon:J1}',
  'href:"/cms/khachhang",label:"Khách Hàng"',
);

// 2) Redirect legacy /customers SPA route to Next page
const redirectComp = `function CustHubRedirect(){return j.useEffect(()=>{window.location.replace("/cms/khachhang")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở Quản lý Khách Hàng…"}),c.jsx("a",{href:"/cms/khachhang",className:"text-violet-600 underline",children:"Mở /cms/khachhang"})]})}`;

if (!s.includes("function CustHubRedirect")) {
  const insertBefore = "function BillPerPg(){";
  if (!s.includes(insertBefore)) {
    console.error("CustHubRedirect insert anchor not found");
    process.exit(1);
  }
  s = s.replace(insertBefore, `${redirectComp}function BillPerPg(){`);
  console.log("CustHubRedirect component: applied");
} else {
  console.log("CustHubRedirect component: already applied");
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

// 3) Customer 360 link → /cms/khachhang
if (s.includes('marketingAdminUrl||"/adminbp/khachhang"')) {
  s = s.replace(
    'marketingAdminUrl||"/adminbp/khachhang"',
    'marketingAdminUrl||"/cms/khachhang"',
  );
  console.log("Cust360 default admin URL: applied");
} else if (s.includes('marketingAdminUrl||"/cms/khachhang"')) {
  console.log("Cust360 default admin URL: already applied");
} else if (s.includes('href:"/adminbp",target:"_blank"')) {
  s = s.replace(
    'href:"/adminbp",target:"_blank",rel:"noopener noreferrer",className:"text-xs font-medium underline text-violet-600",children:"Mở admin KH"',
    'href:r?.sync?.marketingAdminUrl||"/cms/khachhang",target:"_blank",rel:"noopener noreferrer",className:"text-xs font-medium underline text-violet-600",children:"Sửa KH"',
  );
  console.log("Cust360 admin link: applied");
}

// 4) Dashboard quick link widget (if present in bundle — optional, skip if missing)
if (s.includes('href:"/adminbp/khachhang"')) {
  s = s.replaceAll('href:"/adminbp/khachhang"', 'href:"/cms/khachhang"');
  console.log("Replaced adminbp/khachhang hrefs");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
