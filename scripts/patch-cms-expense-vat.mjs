/**
 * CMS bundle: VAT đầu vào on expense form (P2).
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
    console.log(`${label}: skipped (anchor not found)`);
    return;
  }
  s = s.replace(anchor, replacement);
  console.log(`${label}: applied`);
}

patch(
  "Expense VAT default state",
  'category:"other",description:"",status:"paid"}',
  'category:"other",description:"",status:"paid",hasVatInvoice:!1,vatRate:"8"}',
  'hasVatInvoice:!1,vatRate:"8"',
);

patch(
  "Expense VAT submit payload",
  'paymentStatus:d.status==="paid"?"paid":"unpaid",expenseDate:d.expenseDate',
  'paymentStatus:d.status==="paid"?"paid":"unpaid",hasVatInvoice:!!d.hasVatInvoice,vatRate:d.hasVatInvoice?Number(d.vatRate||8):0,expenseDate:d.expenseDate',
  "hasVatInvoice:!!d.hasVatInvoice",
);

patch(
  "Expense VAT edit mapper",
  'category:String(P.category??"other"),description:String(P.description??""),status:String(P.status?',
  'category:String(P.category??"other"),description:String(P.description??""),hasVatInvoice:!!P.hasVatInvoice,vatRate:String(P.vatRate??8),status:String(P.status?',
  "hasVatInvoice:!!P.hasVatInvoice",
);

const vatUi =
  '}),c.jsxs("div",{className:"space-y-2 rounded-lg border border-violet-200/60 bg-violet-50/50 p-3 dark:border-violet-500/30 dark:bg-violet-500/10",children:[c.jsxs("label",{className:"flex items-center gap-2 text-sm font-medium",children:[c.jsx("input",{type:"checkbox",checked:!!d.hasVatInvoice,onChange:P=>m({...d,hasVatInvoice:P.target.checked})}),"Có HĐ GTGT (khấu trừ đầu vào)"]}),d.hasVatInvoice?c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"VAT %"}),c.jsx(et,{type:"number",value:d.vatRate,onChange:P=>m({...d,vatRate:P.target.value}),min:0,max:100,step:1})]}):null]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"Loại Chi Phí"})';

patch(
  "Expense VAT form UI",
  '}),c.jsxs("div",{className:"space-y-1",children:[c.jsx(We,{children:"Loại Chi Phí"})',
  vatUi,
  "Có HĐ GTGT (khấu trừ đầu vào)",
);

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
