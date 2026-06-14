/**
 * Patches public/cms bundle: hide legacy menu sections + add revenue-comparison report.
 * Run after build:cms or directly on committed bundle: node scripts/patch-cms-menu-reports.mjs
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
  console.error("No CMS bundle found in public/cms/assets");
  process.exit(1);
}

let s = fs.readFileSync(bundlePath, "utf8");
const originalLen = s.length;

// 1) Hide Danh Mục + Hệ Thống sidebar sections
const legacyMenu =
  ',{title:"Danh Mục",items:[{href:"/customers",label:"Danh Mục KH",icon:J1},{href:"/suppliers",label:"Nhà Cung Cấp",icon:ZG},{href:"/services",label:"Dịch Vụ",icon:cG},{href:"/contracts",label:"Hợp Đồng",icon:dO},{href:"/employees",label:"Nhân Viên",icon:p7}]},{title:"Hệ Thống",items:[{href:"/audit-logs",label:"Nhật Ký Hoạt Động",icon:_G}]}';

if (s.includes(legacyMenu)) {
  s = s.replace(legacyMenu, "");
  console.log("Removed Danh Mục + Hệ Thống from sidebar");
} else if (!s.includes('title:"Danh Mục"')) {
  console.log("Sidebar legacy sections already removed");
} else {
  console.error("Could not find legacy menu block — bundle layout changed");
  process.exit(1);
}

// 2) Add Chênh lệch DT menu item (after Lợi Nhuận)
const menuAnchor =
  '{href:"/reports/profit",label:"Lợi Nhuận",icon:tm},{href:"/reports/expenses"';
const menuReplacement =
  '{href:"/reports/profit",label:"Lợi Nhuận",icon:tm},{href:"/reports/revenue-comparison",label:"Chênh lệch DT",icon:fG},{href:"/reports/expenses"';

if (s.includes(menuAnchor) && !s.includes("/reports/revenue-comparison")) {
  s = s.replace(menuAnchor, menuReplacement);
  console.log("Added Chênh lệch DT menu item");
} else if (s.includes("/reports/revenue-comparison")) {
  console.log("Menu item already present");
} else {
  console.error("Could not find Báo Cáo menu anchor");
  process.exit(1);
}

// 3) API client hook for /reports/revenue-comparison
const apiAnchor = "function PZ(e,t){const n=kZ(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>";
const apiInsert = `function PZ(e,t){const n=kZ(e);return{...vn(n),queryKey:n.queryKey}}const VCmpUrl=e=>{const t=new URLSearchParams;Object.entries(e||{}).forEach(([r,a])=>{a!==void 0&&t.append(r,a===null?"null":a.toString())});const n=t.toString();return n.length>0?\`/api/reports/revenue-comparison?\${n}\`:"/api/reports/revenue-comparison"},GCmpFetch=async(e,t)=>it(VCmpUrl(e),{...t,method:"GET"}),HCmpKey=e=>["/api/reports/revenue-comparison",...e?[e]:[]],KCmpOpts=(e,t)=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??HCmpKey(e),queryFn:({signal:o})=>GCmpFetch(e,{signal:o,...r}),...n}};function RCmpQ(e,t){const n=KCmpOpts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>`;

if (s.includes(apiAnchor) && !s.includes("RCmpQ")) {
  s = s.replace(apiAnchor, apiInsert);
  console.log("Added revenue-comparison API hook");
} else if (s.includes("RCmpQ")) {
  console.log("API hook already present");
} else {
  console.error("Could not find API insert anchor");
  process.exit(1);
}

// 4) Page component (before Báo Cáo Doanh Thu page)
const pageAnchor = 'const S0e=[2024,2025,2026,2027];function yI(){';
const pageInsert = `const CmpYrs=[2024,2025,2026,2027];function RCmpPg(){const[e,t]=j.useState(new Date().getFullYear()),{data:n,isLoading:r}=RCmpQ({year:e}),a=n?.items??[];return c.jsxs("div",{children:[c.jsx(tr,{title:"Chênh lệch Doanh Thu",subtitle:"Tiền mặt (phiếu thu) so với doanh thu ghi nhận theo tháng",children:c.jsxs("div",{className:"flex flex-wrap gap-2",children:[c.jsxs("div",{className:"rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-xs",children:[c.jsx("span",{className:"text-green-600",children:"Tiền mặt: "}),c.jsx("span",{className:"font-bold text-green-700",children:Be(n?.totalCashRevenue)})]}),c.jsxs("div",{className:"rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs",children:[c.jsx("span",{className:"text-emerald-600",children:"Ghi nhận: "}),c.jsx("span",{className:"font-bold text-emerald-700",children:Be(n?.totalRecognizedRevenue)})]}),c.jsxs("div",{className:"rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs",children:[c.jsx("span",{className:"text-amber-600",children:"Chênh lệch: "}),c.jsx("span",{className:"font-bold text-amber-700",children:Be(n?.totalGap)})]})]})}),c.jsx("div",{className:"flex gap-3 mb-6",children:c.jsxs(vt,{value:String(e),onValueChange:o=>t(Number(o)),children:[c.jsx(mt,{className:"w-28",children:c.jsx(gt,{})}),c.jsx(yt,{children:CmpYrs.map(o=>c.jsx(Ce,{value:String(o),children:o},o))})]})}),c.jsx("div",{className:"rounded-xl border bg-card p-5 mb-6",children:c.jsx(Qd,{width:"100%",height:300,children:c.jsxs(DU,{data:a,margin:{left:10,right:10},children:[c.jsx(ah,{strokeDasharray:"3 3",stroke:"hsl(var(--border))"}),c.jsx(Xi,{dataKey:"label",tick:{fontSize:12}}),c.jsx(Qi,{tickFormatter:o=>String((o/1e6).toFixed(0))+"M",tick:{fontSize:12},width:50}),c.jsx(vr,{formatter:o=>Be(o)}),c.jsx(Da,{dataKey:"cashRevenue",name:"Tiền mặt",fill:"#22c55e",radius:[4,4,0,0]}),c.jsx(Da,{dataKey:"recognizedRevenue",name:"Ghi nhận",fill:"#10b981",radius:[4,4,0,0]})]})})}),c.jsx("div",{className:"rounded-lg border bg-card overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-4 py-3 text-left",children:"Tháng"}),c.jsx("th",{className:"px-4 py-3 text-right",children:"Tiền mặt"}),c.jsx("th",{className:"px-4 py-3 text-right",children:"Ghi nhận"}),c.jsx("th",{className:"px-4 py-3 text-right",children:"Chênh lệch"})]})}),c.jsxs("tbody",{children:[r?c.jsx("tr",{children:c.jsx("td",{colSpan:4,className:"px-4 py-6 text-center text-muted-foreground",children:"Đang tải..."})}):a.map((o,u)=>c.jsxs("tr",{className:"border-b last:border-0",children:[c.jsx("td",{className:"px-4 py-3",children:o.label}),c.jsx("td",{className:"px-4 py-3 text-right text-green-600",children:Be(o.cashRevenue)}),c.jsx("td",{className:"px-4 py-3 text-right text-emerald-600",children:Be(o.recognizedRevenue)}),c.jsx("td",{className:"px-4 py-3 text-right font-medium text-amber-600",children:Be(o.gap)})]},u))]})]})})]})}const S0e=[2024,2025,2026,2027];function yI(){`;

if (s.includes(pageAnchor) && !s.includes("function RCmpPg")) {
  s = s.replace(pageAnchor, pageInsert);
  console.log("Added revenue-comparison page component");
} else if (s.includes("function RCmpPg")) {
  console.log("Page component already present");
} else {
  console.error("Could not find page insert anchor");
  process.exit(1);
}

// 5) Routes
const routeAnchor =
  'c.jsx(Re,{path:"/reports/profit",component:()=>c.jsx(Le,{comp:gI,title:"Báo Cáo Lợi Nhuận"})}),c.jsx(Re,{path:"/admin/reports/profit"';
const routeInsert =
  'c.jsx(Re,{path:"/reports/profit",component:()=>c.jsx(Le,{comp:gI,title:"Báo Cáo Lợi Nhuận"})}),c.jsx(Re,{path:"/reports/revenue-comparison",component:()=>c.jsx(Le,{comp:RCmpPg,title:"Chênh lệch Doanh Thu"})}),c.jsx(Re,{path:"/admin/reports/revenue-comparison",component:()=>c.jsx(Le,{comp:RCmpPg,title:"Chênh lệch Doanh Thu"})}),c.jsx(Re,{path:"/admin/reports/profit"';

if (s.includes(routeAnchor) && !s.includes('path:"/reports/revenue-comparison"')) {
  s = s.replace(routeAnchor, routeInsert);
  console.log("Added revenue-comparison routes");
} else if (s.includes('path:"/reports/revenue-comparison"')) {
  console.log("Routes already present");
} else {
  console.error("Could not find route insert anchor");
  process.exit(1);
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
