/**
 * CMS menu: Trách nhiệm thuế + sub-pages (TNCN, TNDN, HĐĐT).
 * SPA basename is /cms — menu hrefs must be /tax/* (not /cms/tax/*) with redirect routes.
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

const billingAnchor =
  '{href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng",icon:xq}';

const taxMenuOld =
  '{href:"/cms/tax",label:"Trách Nhiệm Thuế",icon:jq},{href:"/cms/tax/ctv",label:"TNCN CTV",icon:J1},{href:"/cms/tax/tndn",label:"TNDN Tạm Nộp",icon:tm},{href:"/cms/tax/hddt",label:"Hóa Đơn ĐT",icon:fG}';
const taxMenuNew =
  '{href:"/tax",label:"Trách Nhiệm Thuế",icon:jq},{href:"/tax/ctv",label:"TNCN CTV",icon:J1},{href:"/tax/tndn",label:"TNDN Tạm Nộp",icon:tm},{href:"/tax/hddt",label:"Hóa Đơn ĐT",icon:fG}';

const taxRedirects = `function TaxHubRedirect(){return j.useEffect(()=>{window.location.replace("/cms/tax")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở Trách nhiệm thuế…"}),c.jsx("a",{href:"/cms/tax",className:"text-violet-600 underline",children:"Mở /cms/tax"})]})}function TaxCtvRedirect(){return j.useEffect(()=>{window.location.replace("/cms/tax/ctv")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở TNCN CTV…"}),c.jsx("a",{href:"/cms/tax/ctv",className:"text-violet-600 underline",children:"Mở /cms/tax/ctv"})]})}function TaxTndnRedirect(){return j.useEffect(()=>{window.location.replace("/cms/tax/tndn")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở TNDN tạm nộp…"}),c.jsx("a",{href:"/cms/tax/tndn",className:"text-violet-600 underline",children:"Mở /cms/tax/tndn"})]})}function TaxHddtRedirect(){return j.useEffect(()=>{window.location.replace("/cms/tax/hddt")},[]),c.jsxs("div",{className:"p-8 text-center text-muted-foreground",children:[c.jsx("p",{children:"Đang mở Hóa đơn điện tử…"}),c.jsx("a",{href:"/cms/tax/hddt",className:"text-violet-600 underline",children:"Mở /cms/tax/hddt"})]})}`;

const taxRoutes =
  'c.jsx(Re,{path:"/tax",component:()=>c.jsx(Le,{comp:TaxHubRedirect,title:"Trách Nhiệm Thuế"})}),c.jsx(Re,{path:"/tax/ctv",component:()=>c.jsx(Le,{comp:TaxCtvRedirect,title:"TNCN CTV"})}),c.jsx(Re,{path:"/tax/tndn",component:()=>c.jsx(Le,{comp:TaxTndnRedirect,title:"TNDN Tạm Nộp"})}),c.jsx(Re,{path:"/tax/hddt",component:()=>c.jsx(Le,{comp:TaxHddtRedirect,title:"Hóa Đơn ĐT"})}),c.jsx(Re,{path:"/cms/tax",component:()=>c.jsx(Le,{comp:TaxHubRedirect,title:"Trách Nhiệm Thuế"})}),c.jsx(Re,{path:"/cms/tax/ctv",component:()=>c.jsx(Le,{comp:TaxCtvRedirect,title:"TNCN CTV"})}),c.jsx(Re,{path:"/cms/tax/tndn",component:()=>c.jsx(Le,{comp:TaxTndnRedirect,title:"TNDN Tạm Nộp"})}),c.jsx(Re,{path:"/cms/tax/hddt",component:()=>c.jsx(Le,{comp:TaxHddtRedirect,title:"Hóa Đơn ĐT"})}),';

// 1) Redirect components
if (!s.includes("function TaxHubRedirect")) {
  const insertBefore = "function CustHubRedirect(){";
  if (!s.includes(insertBefore)) {
    console.error("Tax redirects: CustHubRedirect anchor not found");
    process.exit(1);
  }
  s = s.replace(insertBefore, `${taxRedirects}${insertBefore}`);
  console.log("Tax redirect components: applied");
} else {
  console.log("Tax redirect components: already applied");
}

// 2) SPA routes (incl. legacy /cms/tax/* double-prefix paths)
if (!s.includes('path:"/tax/tndn",component:()=>c.jsx(Le,{comp:TaxTndnRedirect')) {
  const routeAnchor = 'c.jsx(Re,{path:"/billing-periods",component:()=>c.jsx(Le,{comp:BillPerPg,title:"Quản Lý Kỳ Thu"})})';
  if (!s.includes(routeAnchor)) {
    console.error("Tax routes: billing-periods anchor not found");
    process.exit(1);
  }
  s = s.replace(routeAnchor, `${taxRoutes}${routeAnchor}`);
  console.log("Tax SPA routes: applied");
} else {
  console.log("Tax SPA routes: already applied");
}

// 3) Sidebar menu hrefs
if (s.includes(taxMenuOld)) {
  s = s.replace(taxMenuOld, taxMenuNew);
  console.log("Tax menu hrefs: fixed /cms/tax → /tax");
} else if (s.includes('href:"/tax/hddt"')) {
  console.log("Tax menu hrefs: already correct");
} else if (s.includes(billingAnchor)) {
  s = s.replace(billingAnchor, `${billingAnchor},${taxMenuNew}`);
  console.log("Tax menu block: applied");
} else {
  console.log("Tax menu: skipped (anchor not found)");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
