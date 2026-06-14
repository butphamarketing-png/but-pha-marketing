/**
 * CMS improvements P2–P6: billing periods UI, revenue recognition, reports,
 * read-only customers, expense payment status.
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

// 1) API hooks — billing periods, revenue recognition, billing report
patch(
  "Improvements API hooks",
  "function BillPipeQ(e){const n=BPipeOpts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>",
  `function BillPipeQ(e){const n=BPipeOpts(e);return{...vn(n),queryKey:n.queryKey}}const BPerUrl=e=>{const t=new URLSearchParams;Object.entries(e||{}).forEach(([r,a])=>{a!=null&&a!==""&&t.append(r,a===null?"null":a.toString())});const n=t.toString();return n.length>0?\`/api/billing-periods?\${n}\`:"/api/billing-periods"},BPerFetch=async(e,t)=>it(BPerUrl(e),{...t,method:"GET"}),BPerKey=e=>["/api/billing-periods",e?.page,e?.limit,e?.status],BPerOpts=e=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??BPerKey(e),queryFn:({signal:o})=>BPerFetch(e,{signal:o,...r}),...n}};function BillPerQ(e){const n=BPerOpts(e);return{...vn(n),queryKey:n.queryKey}}const RevRecUrl=e=>{const t=new URLSearchParams;Object.entries(e||{}).forEach(([r,a])=>{a!=null&&t.append(r,a===null?"null":a.toString())});const n=t.toString();return n.length>0?\`/api/revenue-recognition?\${n}\`:"/api/revenue-recognition"},RevRecFetch=async(e,t)=>it(RevRecUrl(e),{...t,method:"GET"}),RevRecKey=e=>["/api/revenue-recognition",e?.year,e?.page],RevRecOpts=e=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??RevRecKey(e),queryFn:({signal:o})=>RevRecFetch(e,{signal:o,...r}),...n}};function RevRecQ(e){const n=RevRecOpts(e);return{...vn(n),queryKey:n.queryKey}}const BRepUrl=e=>{const t=new URLSearchParams;Object.entries(e||{}).forEach(([r,a])=>{a!=null&&t.append(r,a===null?"null":a.toString())});const n=t.toString();return n.length>0?\`/api/reports/billing-periods?\${n}\`:"/api/reports/billing-periods"},BRepFetch=async(e,t)=>it(BRepUrl(e),{...t,method:"GET"}),BRepKey=e=>["/api/reports/billing-periods",e?.year],BRepOpts=e=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??BRepKey(e),queryFn:({signal:o})=>BRepFetch(e,{signal:o,...r}),...n}};function BillRepQ(e){const n=BRepOpts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>`,
  "function BillPerQ",
);

// 2) Page components
const pages = `function BillPerPg(){const qc=ri(),[page,setPage]=j.useState(1),[status,setStatus]=j.useState(""),{data,isLoading}=BillPerQ({page,limit:20,status:status||void 0}),rows=data?.data??[],total=data?.pagination?.total??0,run=async(b,m)=>{try{const res=await fetch(b,{method:m,credentials:"include",headers:{"Content-Type":"application/json"}});if(!res.ok)throw 0;Nt({title:"Thành công"}),await qc.invalidateQueries({queryKey:["/api/billing-periods"]})}catch{Nt({title:"Lỗi",variant:"destructive"})}};return c.jsxs("div",{children:[c.jsx(tr,{title:"Quản Lý Kỳ Thu",subtitle:"Gia hạn, làm mới số đã thu — đồng bộ từ marketing hoặc thao tác thủ công"}),c.jsx("div",{className:"flex gap-2 mb-4",children:c.jsxs(vt,{value:status||"all",onValueChange:v=>{setStatus(v==="all"?"":v),setPage(1)},children:[c.jsx(mt,{className:"w-36",children:c.jsx(gt,{})}),c.jsxs(yt,{children:[c.jsx(Ce,{value:"all",children:"Tất cả"}),c.jsx(Ce,{value:"pending",children:"Chờ thu"}),c.jsx(Ce,{value:"partial",children:"Một phần"}),c.jsx(Ce,{value:"overdue",children:"Quá hạn"}),c.jsx(Ce,{value:"paid",children:"Đã thu"})]})]})}),c.jsx("div",{className:"rounded-lg border overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-3 py-2 text-left",children:"KH"}),c.jsx("th",{className:"px-3 py-2 text-left",children:"HĐ"}),c.jsx("th",{className:"px-3 py-2 text-left",children:"Kỳ"}),c.jsx("th",{className:"px-3 py-2 text-right",children:"Phải thu"}),c.jsx("th",{className:"px-3 py-2 text-right",children:"Đã thu"}),c.jsx("th",{className:"px-3 py-2 text-left",children:"Hạn"}),c.jsx("th",{className:"px-3 py-2 text-left",children:"TT"}),c.jsx("th",{className:"px-3 py-2 text-right",children:"Thao tác"})]})}),c.jsx("tbody",{children:isLoading?c.jsx("tr",{children:c.jsx("td",{colSpan:8,className:"px-4 py-6 text-center text-muted-foreground",children:"Đang tải..."})}):rows.length===0?c.jsx("tr",{children:c.jsx("td",{colSpan:8,className:"px-4 py-6 text-center text-muted-foreground",children:"Chưa có kỳ thu"})}):rows.map((r,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-3 py-2",children:r.customerName}),c.jsx("td",{className:"px-3 py-2",children:r.contractCode??"—"}),c.jsx("td",{className:"px-3 py-2",children:r.label}),c.jsx("td",{className:"px-3 py-2 text-right",children:Be(r.amountDue)}),c.jsx("td",{className:"px-3 py-2 text-right text-green-600",children:Be(r.amountPaid)}),c.jsx("td",{className:"px-3 py-2",children:tl(r.dueDate)}),c.jsx("td",{className:"px-3 py-2",children:c.jsx(ca,{status:r.status})}),c.jsx("td",{className:"px-3 py-2 text-right",children:c.jsxs("div",{className:"flex justify-end gap-1 flex-wrap",children:[c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>window.location.assign("/cms/customer-360?id="+r.customerId),children:"360"}),c.jsx(st,{variant:"outline",size:"sm",onClick:()=>run(\`/cms/api/billing-periods/\${r.id}/refresh\`,"POST"),children:"Refresh"}),c.jsx(st,{variant:"outline",size:"sm",onClick:()=>run(\`/cms/api/billing-periods/\${r.id}/renew\`,"POST"),children:"Gia hạn"})]})})]},u))})]})}),total>20&&c.jsxs("div",{className:"flex justify-center gap-2 mt-4",children:[c.jsx(st,{variant:"outline",size:"sm",disabled:page<=1,onClick:()=>setPage(p=>Math.max(1,p-1)),children:"Trước"}),c.jsxs("span",{className:"text-xs text-muted-foreground self-center",children:["Trang ",page," / ",Math.ceil(total/20)]}),c.jsx(st,{variant:"outline",size:"sm",disabled:page>=Math.ceil(total/20),onClick:()=>setPage(p=>p+1),children:"Sau"})]})]})}function RevRecPg(){const qc=ri(),[year,setYear]=j.useState(new Date().getFullYear()),[page,setPage]=j.useState(1),{data,isLoading}=RevRecQ({year,page,limit:20}),rows=data?.data??[],total=data?.pagination?.total??0,regen=async()=>{try{const res=await fetch("/cms/api/revenue-recognition/regenerate",{method:"POST",credentials:"include"});if(!res.ok)throw 0;Nt({title:"Đã tái tạo ghi nhận DT"}),await qc.invalidateQueries({queryKey:["/api/revenue-recognition"]})}catch{Nt({title:"Lỗi",variant:"destructive"})}};return c.jsxs("div",{children:[c.jsx(tr,{title:"Ghi Nhận Doanh Thu",subtitle:"Sổ ghi nhận DT theo kỳ (accrual)",action:{label:"Tái tạo tất cả",onClick:regen}}),c.jsx("div",{className:"flex gap-3 mb-4",children:c.jsxs(vt,{value:String(year),onValueChange:o=>setYear(Number(o)),children:[c.jsx(mt,{className:"w-28",children:c.jsx(gt,{})}),c.jsx(yt,{children:[2024,2025,2026,2027].map(o=>c.jsx(Ce,{value:String(o),children:o},o))})]})}),c.jsx("div",{className:"rounded-lg border overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-4 py-2 text-left",children:"Tháng"}),c.jsx("th",{className:"px-4 py-2 text-left",children:"KH"}),c.jsx("th",{className:"px-4 py-2 text-left",children:"HĐ"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Số tiền"}),c.jsx("th",{className:"px-4 py-2 text-left",children:"PP"})]})}),c.jsx("tbody",{children:isLoading?c.jsx("tr",{children:c.jsx("td",{colSpan:5,className:"px-4 py-6 text-center text-muted-foreground",children:"Đang tải..."})}):rows.map((r,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-4 py-2",children:(r.recognitionMonth??"")+"/"+(r.recognitionYear??"")}),c.jsx("td",{className:"px-4 py-2",children:r.customerName}),c.jsx("td",{className:"px-4 py-2",children:r.contractCode??"—"}),c.jsx("td",{className:"px-4 py-2 text-right text-emerald-600",children:Be(r.amount)}),c.jsx("td",{className:"px-4 py-2",children:r.method??"—"})]},u))})]})}),total>20&&c.jsxs("div",{className:"flex justify-center gap-2 mt-4",children:[c.jsx(st,{variant:"outline",size:"sm",disabled:page<=1,onClick:()=>setPage(p=>Math.max(1,p-1)),children:"Trước"}),c.jsx(st,{variant:"outline",size:"sm",disabled:page>=Math.ceil(total/20),onClick:()=>setPage(p=>p+1),children:"Sau"})]})]})}function BillRepPg(){const[e,t]=j.useState(new Date().getFullYear()),{data:n,isLoading:r}=BillRepQ({year:e}),a=n?.items??[];return c.jsxs("div",{children:[c.jsx(tr,{title:"Báo Cáo Kỳ Thu",subtitle:"Tổng hợp kỳ thanh toán theo tháng",children:c.jsxs("div",{className:"flex flex-wrap gap-2",children:[c.jsxs("div",{className:"rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs",children:["Phải thu: ",c.jsx("span",{className:"font-bold",children:Be(n?.totalDue??0)})]}),c.jsxs("div",{className:"rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-xs",children:["Đã thu: ",c.jsx("span",{className:"font-bold",children:Be(n?.totalPaid??0)})]}),c.jsxs("div",{className:"rounded-lg bg-orange-50 border border-orange-200 px-3 py-2 text-xs",children:["Còn lại: ",c.jsx("span",{className:"font-bold",children:Be(n?.totalRemaining??0)})]})]})}),c.jsx("div",{className:"flex gap-3 mb-4",children:c.jsxs(vt,{value:String(e),onValueChange:o=>t(Number(o)),children:[c.jsx(mt,{className:"w-28",children:c.jsx(gt,{})}),c.jsx(yt,{children:[2024,2025,2026,2027].map(o=>c.jsx(Ce,{value:String(o),children:o},o))})]})}),c.jsx("div",{className:"rounded-lg border overflow-hidden",children:c.jsxs("table",{className:"w-full text-sm",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-muted/40 border-b",children:[c.jsx("th",{className:"px-4 py-2 text-left",children:"Tháng"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Số kỳ"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Phải thu"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Đã thu"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Còn lại"}),c.jsx("th",{className:"px-4 py-2 text-right",children:"Quá hạn"})]})}),c.jsx("tbody",{children:r?c.jsx("tr",{children:c.jsx("td",{colSpan:6,className:"px-4 py-6 text-center text-muted-foreground",children:"Đang tải..."})}):a.map((o,u)=>c.jsxs("tr",{className:"border-b",children:[c.jsx("td",{className:"px-4 py-2",children:o.label}),c.jsx("td",{className:"px-4 py-2 text-right",children:o.periodCount}),c.jsx("td",{className:"px-4 py-2 text-right",children:Be(o.amountDue)}),c.jsx("td",{className:"px-4 py-2 text-right text-green-600",children:Be(o.amountPaid)}),c.jsx("td",{className:"px-4 py-2 text-right text-orange-600",children:Be(o.remaining)}),c.jsx("td",{className:"px-4 py-2 text-right",children:o.overdueCount})]},u))})]})})]})}function BillPipeW(){`;

patch(
  "Improvements pages",
  "function BillPipeW(){",
  pages,
  "function BillPerPg",
);

// 3) Thu—Chi menu: Kỳ Thu
patch(
  "Billing periods menu",
  '{href:"/accounts-payable",label:"Phải Trả NCC",icon:tm}',
  '{href:"/accounts-payable",label:"Phải Trả NCC",icon:tm},{href:"/billing-periods",label:"Kỳ Thu",icon:fG}',
  'href:"/billing-periods",label:"Kỳ Thu"',
);

// 4) Báo cáo menu: Kỳ Thu theo tháng + Ghi nhận DT
patch(
  "Reports menu extensions",
  '{href:"/reports/invoice-reconciliation",label:"Đối soát HĐ",icon:jq},{href:"/reports/expenses"',
  '{href:"/reports/invoice-reconciliation",label:"Đối soát HĐ",icon:jq},{href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng",icon:xq},{href:"/revenue-recognition",label:"Ghi Nhận DT",icon:fG},{href:"/reports/expenses"',
  'href:"/reports/billing-periods",label:"Kỳ Thu theo Tháng"',
);

// 5) Routes
patch(
  "Improvements routes",
  'c.jsx(Re,{path:"/customer-360",component:()=>c.jsx(Le,{comp:Cust360Pg,title:"Hồ Sơ KH 360°"})}),c.jsx(Re,{path:"/admin/customer-360"',
  'c.jsx(Re,{path:"/billing-periods",component:()=>c.jsx(Le,{comp:BillPerPg,title:"Quản Lý Kỳ Thu"})}),c.jsx(Re,{path:"/admin/billing-periods",component:()=>c.jsx(Le,{comp:BillPerPg,title:"Quản Lý Kỳ Thu"})}),c.jsx(Re,{path:"/revenue-recognition",component:()=>c.jsx(Le,{comp:RevRecPg,title:"Ghi Nhận DT"})}),c.jsx(Re,{path:"/admin/revenue-recognition",component:()=>c.jsx(Le,{comp:RevRecPg,title:"Ghi Nhận DT"})}),c.jsx(Re,{path:"/reports/billing-periods",component:()=>c.jsx(Le,{comp:BillRepPg,title:"Báo Cáo Kỳ Thu"})}),c.jsx(Re,{path:"/admin/reports/billing-periods",component:()=>c.jsx(Le,{comp:BillRepPg,title:"Báo Cáo Kỳ Thu"})}),c.jsx(Re,{path:"/customer-360",component:()=>c.jsx(Le,{comp:Cust360Pg,title:"Hồ Sơ KH 360°"})}),c.jsx(Re,{path:"/admin/customer-360"',
  'path:"/billing-periods",component:()=>c.jsx(Le,{comp:BillPerPg',
);

// 6) Customers read-only UI
patch(
  "Customers read-only subtitle",
  'subtitle:"Quản lý danh sách khách hàng",action:{label:"Thêm Khách Hàng",onClick:()=>{h(null),m(O1),o(!0)}}',
  'subtitle:"Chỉ xem — sửa từ Admin Marketing (/adminbp)",action:{label:"Mở Admin Marketing",onClick:()=>window.open("/adminbp","_blank")}}',
  'subtitle:"Chỉ xem — sửa từ Admin Marketing',
);

patch(
  "Customers read-only actions",
  'render:b=>c.jsxs("div",{className:"flex items-center gap-1",children:[c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>window.location.assign("/cms/customer-360?id="+b.id),children:"360"}),c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>A(b),children:c.jsx(Fi,{className:"h-3.5 w-3.5"})}),c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>N(b.id),className:"text-destructive hover:text-destructive",children:c.jsx(si,{className:"h-3.5 w-3.5"})})]})',
  'render:b=>c.jsx("div",{className:"flex items-center gap-1",children:c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>window.location.assign("/cms/customer-360?id="+b.id),children:"360"})})',
  'render:b=>c.jsx("div",{className:"flex items-center gap-1",children:c.jsx(st,{variant:"ghost",size:"sm",onClick:()=>window.location.assign("/cms/customer-360?id="+b.id),children:"360"})})',
);

// 7) Expense payment status sync to API
patch(
  "Expense paymentStatus payload",
  "customerId:d.customerId?Number(d.customerId):void 0,expenseDate:d.expenseDate",
  "customerId:d.customerId?Number(d.customerId):void 0,paymentStatus:d.status===\"paid\"?\"paid\":\"unpaid\",expenseDate:d.expenseDate",
  'paymentStatus:d.status==="paid"',
);

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
