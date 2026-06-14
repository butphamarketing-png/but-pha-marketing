/**
 * CMS UX: billing pipeline dashboard + customer 360 resync/marketing link.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = path.join(root, "public", "cms", "assets", "index-Ceyco5BZ.js");
let s = fs.readFileSync(bundlePath, "utf8");
const originalLen = s.length;

function mustReplace(label, anchor, insert, already) {
  if (already && s.includes(already)) {
    console.log(`${label}: already applied`);
    return;
  }
  if (!s.includes(anchor)) {
    console.error(`${label}: anchor not found`);
    process.exit(1);
  }
  s = s.replace(anchor, insert);
  console.log(`${label}: applied`);
}

// 1) Billing pipeline API hook
mustReplace(
  "Billing pipeline API",
  "function Cust360Q(e){const n=C360Opts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>",
  `function Cust360Q(e){const n=C360Opts(e);return{...vn(n),queryKey:n.queryKey}}const BPipeUrl=e=>{const t=new URLSearchParams;Object.entries(e||{}).forEach(([r,a])=>{a!==void 0&&t.append(r,a===null?"null":a.toString())});const n=t.toString();return n.length>0?\`/api/dashboard/billing-pipeline?\${n}\`:"/api/dashboard/billing-pipeline"},BPipeFetch=async(e,t)=>it(BPipeUrl(e),{...t,method:"GET"}),BPipeKey=e=>["/api/dashboard/billing-pipeline",...e?[e]:[]],BPipeOpts=(e,t)=>{const{query:n,request:r}={};return{queryKey:n?.queryKey??BPipeKey(e),queryFn:({signal:o})=>BPipeFetch(e,{signal:o,...r}),...n}};function BillPipeQ(e){const n=BPipeOpts(e);return{...vn(n),queryKey:n.queryKey}}const MZ=e=>`,
  "function BillPipeQ",
);

// 2) Billing pipeline widget
mustReplace(
  "BillPipeW component",
  "function cI(){const e=new Date",
  `function BillPipeW(){const e=new Date,{data:t,isLoading:n}=BillPipeQ({month:e.getMonth()+1,year:e.getFullYear()}),r=t?.overdue??[],a=t?.dueThisMonth??[];return c.jsxs("div",{className:"rounded-xl border bg-card p-5",children:[c.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 mb-3",children:[c.jsx("h3",{className:"font-semibold",children:"Kỳ Thu — Sắp hạn & Quá hạn"}),c.jsxs("span",{className:"text-xs text-muted-foreground",children:["Tổng phải thu: ",c.jsx("strong",{className:"text-orange-600",children:Be(t?.totals?.totalReceivable??0)})]})]}),n?c.jsx("div",{className:"text-sm text-muted-foreground py-4 text-center",children:"Đang tải..."}):c.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[c.jsxs("div",{children:[c.jsxs("p",{className:"text-xs font-semibold text-red-600 mb-2",children:["Quá hạn (",r.length,") — ",Be(t?.totals?.overdueAmount??0)]}),c.jsx("div",{className:"space-y-1 max-h-36 overflow-y-auto",children:r.length===0?c.jsx("p",{className:"text-xs text-muted-foreground",children:"Không có"}):r.slice(0,10).map((o,u)=>c.jsxs("div",{className:"text-xs flex justify-between gap-2 border-b py-1",children:[c.jsx("span",{className:"truncate",children:o.customerName}),c.jsx("span",{className:"text-orange-600 font-medium shrink-0",children:Be(o.remainingAmount??0)})]},u))})]}),c.jsxs("div",{children:[c.jsxs("p",{className:"text-xs font-semibold text-blue-600 mb-2",children:["Trong tháng (",a.length,") — ",Be(t?.totals?.dueThisMonthAmount??0)]}),c.jsx("div",{className:"space-y-1 max-h-36 overflow-y-auto",children:a.length===0?c.jsx("p",{className:"text-xs text-muted-foreground",children:"Không có"}):a.slice(0,10).map((o,u)=>c.jsxs("div",{className:"text-xs flex justify-between gap-2 border-b py-1",children:[c.jsx("span",{className:"truncate",children:o.customerName}),c.jsx("span",{className:"shrink-0",children:tl(o.dueDate)})]},u))})]})]})]})}function cI(){const e=new Date`,
  "function BillPipeW",
);

// 3) Dashboard insert widget
mustReplace(
  "Dashboard BillPipe",
  'c.jsx(jo,{title:"Chênh lệch DT",value:Be(n?.recognitionGap),icon:bq,color:"bg-slate-100 text-slate-700"})]}),(n?.draftInvoiceCount??0)>0&&c.jsx(aO,',
  'c.jsx(jo,{title:"Chênh lệch DT",value:Be(n?.recognitionGap),icon:bq,color:"bg-slate-100 text-slate-700"})]}),c.jsx(BillPipeW,{}),(n?.draftInvoiceCount??0)>0&&c.jsx(aO,',
  "c.jsx(BillPipeW,{})",
);

// 4) Customer 360 — resync + marketing link
mustReplace(
  "Cust360 resync state",
  "function Cust360Pg(){const id=Number(new URLSearchParams(window.location.search).get(\"id\")||\"0\"),{data:r,isLoading:a}=Cust360Q(id)",
  "function Cust360Pg(){const qc=ri(),[syncMsg,setSyncMsg]=j.useState(\"\"),[syncing,setSyncing]=j.useState(!1),id=Number(new URLSearchParams(window.location.search).get(\"id\")||\"0\"),{data:r,isLoading:a}=Cust360Q(id)",
  "const qc=ri(),[syncMsg,setSyncMsg]",
);

const syncBarOld =
  'r?.sync?.linkedToMarketing?c.jsx("p",{className:"text-xs text-green-600 mb-4",children:"Đã liên kết marketing CRM"}):c.jsx("p",{className:"text-xs text-amber-600 mb-4",children:"Chưa liên kết marketing CRM"})';
const syncBarNew = `c.jsxs("div",{className:"flex flex-wrap items-center gap-2 mb-4",children:[r?.sync?.linkedToMarketing?c.jsx("span",{className:"text-xs text-green-600",children:"Đã liên kết marketing CRM"}):c.jsx("span",{className:"text-xs text-amber-600",children:"Chưa liên kết marketing CRM"}),c.jsx("a",{href:"/adminbp",target:"_blank",rel:"noopener noreferrer",className:"text-xs font-medium underline text-violet-600",children:"Mở admin KH"}),c.jsx(st,{type:"button",size:"sm",variant:"outline",disabled:syncing||!id,onClick:async()=>{setSyncing(!0),setSyncMsg("");try{const res=await fetch(\`/cms/api/customers/\${id}/resync-marketing\`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"}});const d=await res.json().catch(()=>({}));if(!res.ok||d.status==="error"){setSyncMsg(d.error||"Đồng bộ thất bại");return}setSyncMsg("Đồng bộ OK — PT +"+(d.result?.receiptsCreated??0));await qc.invalidateQueries({queryKey:["/api/customers/"+id+"/overview"]})}catch{setSyncMsg("Lỗi kết nối")}finally{setSyncing(!1)}},children:syncing?"Đang sync…":"Đồng bộ lại"}),syncMsg?c.jsx("span",{className:"text-xs text-muted-foreground",children:syncMsg}):null]})`;

mustReplace("Cust360 sync bar", syncBarOld, syncBarNew, 'onClick:async()=>{setSyncing(!0)');

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
