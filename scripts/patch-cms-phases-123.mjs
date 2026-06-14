/**
 * CMS bundle patches: Phase 1–3 (customer 360, master data menu, expense customer link).
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

// 1) Quản Lý menu (KH, Dịch vụ, NCC)
patch(
  "Quản Lý menu",
  'trees:fj},{title:"Thu — Chi"',
  'trees:fj},{title:"Quản Lý",items:[{href:"/customers",label:"Khách Hàng",icon:J1},{href:"/services",label:"Dịch Vụ",icon:tm},{href:"/suppliers",label:"NCC",icon:bq}]},{title:"Thu — Chi"',
  'title:"Quản Lý",items:[{href:"/customers"',
);

// 2) Báo cáo theo dịch vụ trong menu
patch(
  "By-service menu",
  '{href:"/reports/by-customer",label:"Theo Khách Hàng",icon:J1}]}',
  '{href:"/reports/by-customer",label:"Theo Khách Hàng",icon:J1},{href:"/reports/by-service",label:"Theo Dịch Vụ",icon:tm}]}',
  'href:"/reports/by-service",label:"Theo Dịch Vụ"',
);

// 3) Customer 360 API hook
patch(
  "Customer 360 API",
  "function InvRecQ(){const n=InvRecOpts();return{...vn(n),queryKey:n.queryKey}}const MZ=e=>",
  `function InvRecQ(){const n=InvRecOpts();return{...vn(n),queryKey:n.queryKey}}const C360Url=e=>\`/api/customers/\${e}/overview\`,C360Fetch=async(e,t)=>it(C360Url(e),{...t,method:"GET"}),C360Key=e=>[\`/api/customers/\${e}/overview\`],C360Opts=e=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??C360Key(e),queryFn:({signal:o})=>C360Fetch(e,{signal:o,...r}),...n}};function Cust360Q(e){const n=C360Opts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>`,
  "function Cust360Q",
);

// 4) Customer 360 page
const cust360Page = `function Cust360Pg(){const id=Number(new URLSearchParams(window.location.search).get("id")||"0"),{data:r,isLoading:a}=Cust360Q(id),s=r?.summary;return!id||id<=0?c.jsx("div",{className:"p-6 text-muted-foreground",children:"Mở từ danh sách Khách Hàng hoặc thêm ?id= vào URL."}):c.jsxs("div",{children:[c.jsx(tr,{title:"Hồ Sơ Khách Hàng 360°",subtitle:r?.customer?.name??"…",children:c.jsxs("div",{className:"flex flex-wrap gap-2",children:[c.jsxs("div",{className:"rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-xs",children:["Thu: ",c.jsx("span",{className:"font-bold text-green-700",children:Be(s?.totalRevenue??0)})]}),c.jsxs("div",{className:"rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs",children:["Chi: ",c.jsx("span",{className:"font-bold text-red-700",children:Be(s?.totalExpenses??0)})]}),c.jsxs("div",{className:"rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs",children:["Lãi: ",c.jsx("span",{className:"font-bold text-emerald-700",children:Be(s?.profit??0)})]}),c.jsxs("div",{className:"rounded-lg bg-orange-50 border border-orange-200 px-3 py-2 text-xs",children:["Còn nợ: ",c.jsx("span",{className:"font-bold text-orange-700",children:Be(s?.totalReceivable??0)})]})]})}),r?.sync?.linkedToMarketing?c.jsx("p",{className:"text-xs text-green-600 mb-4",children:"Đã liên kết marketing CRM"}):c.jsx("p",{className:"text-xs text-amber-600 mb-4",children:"Chưa liên kết marketing CRM"}),a?c.jsx("div",{className:"py-8 text-center text-muted-foreground",children:"Đang tải..."}):c.jsxs(c.Fragment,{children:[c.jsx("h3",{className:"font-medium mb-2",children:"Hợp đồng"}),c.jsx("div",{className:"rounded-lg border overflow-hidden mb-6",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-4 py-2 text-left",children:"Mã HĐ"}),c.jsx("th",{className:"px-4 py-2 text-left",children:"Dịch vụ"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Giá trị"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Đã thu"})]})}),c.jsx("tbody",{children:(r?.contracts??[]).map((o,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-4 py-2",children:o.code}),c.jsx("td",{className:"px-4 py-2",children:o.serviceName??"—"}),c.jsx("td",{className:"px-4 py-2 text-right",children:Be(o.totalValue)}),c.jsx("td",{className:"px-4 py-2 text-right text-green-600",children:Be(o.paidAmount)})]},u))})]})}),c.jsx("h3",{className:"font-medium mb-2",children:"Kỳ thanh toán"}),c.jsx("div",{className:"rounded-lg border overflow-hidden mb-6",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-4 py-2 text-left",children:"Kỳ"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Phải thu"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Đã thu"}),c.jsx("th",{className:"px-4 py-2 text-left",children:"TT"})]})}),c.jsx("tbody",{children:(r?.billingPeriods??[]).map((o,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-4 py-2",children:o.label}),c.jsx("td",{className:"px-4 py-2 text-right",children:Be(o.amountDue)}),c.jsx("td",{className:"px-4 py-2 text-right",children:Be(o.amountPaid)}),c.jsx("td",{className:"px-4 py-2",children:c.jsx(ca,{status:o.status})})]},u))})]})}),c.jsx("h3",{className:"font-medium mb-2",children:"Phiếu thu & Hóa đơn"}),c.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[c.jsx("div",{className:"rounded-lg border overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-3 py-2 text-left",children:"PT"}),c.jsx("th",{className:"px-3 py-2 text-right",children:"Tiền"})]})}),c.jsx("tbody",{children:(r?.receipts??[]).slice(0,8).map((o,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-3 py-2",children:o.code}),c.jsx("td",{className:"px-3 py-2 text-right",children:Be(o.amount)})]},u))})]})}),c.jsx("div",{className:"rounded-lg border overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-3 py-2 text-left",children:"HĐ"}),c.jsx("th",{className:"px-3 py-2 text-right",children:"Tổng"})]})}),c.jsx("tbody",{children:(r?.invoices??[]).slice(0,8).map((o,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-3 py-2",children:o.code}),c.jsx("td",{className:"px-3 py-2 text-right",children:Be(o.totalAmount)})]},u))})]})})]})]})]})}function ArAgingPg(){`;

patch(
  "Customer 360 page",
  "function ArAgingPg(){",
  cust360Page,
  "function Cust360Pg",
);

// 5) Customer 360 route
patch(
  "Customer 360 route",
  'c.jsx(Re,{path:"/customers",component:()=>c.jsx(Le,{comp:jI,title:"Khách Hàng"})}),c.jsx(Re,{path:"/admin/customers"',
  'c.jsx(Re,{path:"/customers",component:()=>c.jsx(Le,{comp:jI,title:"Khách Hàng"})}),c.jsx(Re,{path:"/customer-360",component:()=>c.jsx(Le,{comp:Cust360Pg,title:"Hồ Sơ KH 360°"})}),c.jsx(Re,{path:"/admin/customer-360",component:()=>c.jsx(Le,{comp:Cust360Pg,title:"Hồ Sơ KH 360°"})}),c.jsx(Re,{path:"/admin/customers"',
  'path:"/customer-360"',
);

// 6) jI — nút Chi tiết 360
patch(
  "Customer list 360 button",
  'render:b=>c.jsxs("div",{className:"flex items-center gap-1",children:[c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>A(b),children:c.jsx(Fi,{className:"h-3.5 w-3.5"})})',
  'render:b=>c.jsxs("div",{className:"flex items-center gap-1",children:[c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>window.location.assign("/cms/customer-360?id="+b.id),children:"360"}),c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>A(b),children:c.jsx(Fi,{className:"h-3.5 w-3.5"})})',
  'onClick:()=>window.location.assign("/cms/customer-360?id="+b.id)',
);

// 7) Phiếu chi — customerId on form
patch(
  "Expense default state",
  '_1={supplierId:"",serviceId:"",expenseDate:new Date().toISOString().split("T")[0],amount:"",category:"other",description:"",status:"paid"}',
  '_1={supplierId:"",serviceId:"",customerId:"",expenseDate:new Date().toISOString().split("T")[0],amount:"",category:"other",description:"",status:"paid"}',
  'customerId:"",expenseDate:new Date().toISOString().split("T")[0],amount:"",category:"other",description:"",status:"paid"}',
);

patch(
  "Expense customers query",
  "{data:_}=By({limit:100}),x=$Q()",
  "{data:_}=By({limit:100}),{data:C}=qy({limit:100}),x=$Q()",
  "{data:C}=qy({limit:100}),x=$Q()",
);

patch(
  "Expense submit payload",
  "const R={supplierId:d.supplierId?Number(d.supplierId):void 0,serviceId:d.serviceId?Number(d.serviceId):void 0,expenseDate:d.expenseDate",
  "const R={supplierId:d.supplierId?Number(d.supplierId):void 0,serviceId:d.serviceId?Number(d.serviceId):void 0,customerId:d.customerId?Number(d.customerId):void 0,expenseDate:d.expenseDate",
  "customerId:d.customerId?Number(d.customerId):void 0,expenseDate:d.expenseDate",
);

patch(
  "Expense edit mapper",
  'm({supplierId:String(P.supplierId??""),serviceId:String(P.serviceId??""),expenseDate:String(P.expenseDate??"")',
  'm({supplierId:String(P.supplierId??""),serviceId:String(P.serviceId??""),customerId:String(P.customerId??""),expenseDate:String(P.expenseDate??"")',
  'customerId:String(P.customerId??""),expenseDate:String(P.expenseDate??"")',
);

patch(
  "Expense customer field",
  'children:"Nhà Cung Cấp"}),c.jsxs(vt,{value:d.supplierId,onValueChange:P=>m({...d,supplierId:P}),children:[c.jsx(mt,{children:c.jsx(gt,{placeholder:"Chọn NCC"})}),c.jsxs(yt,{children:[c.jsx(Ce,{value:"",children:"Không có"}),(w?.data??[]).map(P=>c.jsx(Ce,{value:String(P.id),children:String(P.name)},String(P.id)))]})]})]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"Dịch Vụ"})',
  'children:"Nhà Cung Cấp"}),c.jsxs(vt,{value:d.supplierId,onValueChange:P=>m({...d,supplierId:P}),children:[c.jsx(mt,{children:c.jsx(gt,{placeholder:"Chọn NCC"})}),c.jsxs(yt,{children:[c.jsx(Ce,{value:"",children:"Không có"}),(w?.data??[]).map(P=>c.jsx(Ce,{value:String(P.id),children:String(P.name)},String(P.id)))]})]})]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"Khách Hàng"}),c.jsxs(vt,{value:d.customerId,onValueChange:P=>m({...d,customerId:P}),children:[c.jsx(mt,{children:c.jsx(gt,{placeholder:"Chọn KH (P&L)"})}),c.jsxs(yt,{children:[c.jsx(Ce,{value:"",children:"Không có"}),(C?.data??[]).map(P=>c.jsx(Ce,{value:String(P.id),children:String(P.name)},String(P.id)))]})]})]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"Dịch Vụ"})',
  'placeholder:"Chọn KH (P&L)"',
);

if (s.includes("icon:cG")) {
  s = s.replaceAll("icon:cG", "icon:tm");
  console.log("Fixed missing cG icon references");
}
if (s.includes("icon:ZG")) {
  s = s.replaceAll("icon:ZG", "icon:bq");
  console.log("Fixed missing ZG icon references");
}

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
