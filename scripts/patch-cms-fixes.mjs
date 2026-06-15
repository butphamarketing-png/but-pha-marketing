/**
 * CMS bundle fixes: Radix Select empty value crashes, asset search null-safety, visible action buttons.
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

function patch(label, fn) {
  const next = fn(s);
  if (next === s) console.log(`${label}: skipped`);
  else {
    s = next;
    console.log(`${label}: applied`);
  }
}

// 1) Radix Select: empty value crashes the app (white screen)
patch("Select Tất cả → all", (src) =>
  src.replaceAll('c.jsx(Ce,{value:"",children:"Tất cả"})', 'c.jsx(Ce,{value:"all",children:"Tất cả"})'),
);

patch("AR/AP status default all", (src) => {
  let out = src;
  out = out.replace(
    "function pI(){const[e,t]=j.useState(1),[n,r]=j.useState(\"\")",
    "function pI(){const[e,t]=j.useState(1),[n,r]=j.useState(\"all\")",
  );
  out = out.replace(
    "function mI(){const[e,t]=j.useState(1),[n,r]=j.useState(\"\")",
    "function mI(){const[e,t]=j.useState(1),[n,r]=j.useState(\"all\")",
  );
  return out;
});

patch("AR/AP status filter all", (src) =>
  src
    .replaceAll("QQ({status:n||void 0", "QQ({status:n===\"all\"||!n?void 0:n")
    .replaceAll("nZ({status:n||void 0", "nZ({status:n===\"all\"||!n?void 0:n"),
);

// 2) Radix Select: Không có option
patch("Select Không có → _none", (src) =>
  src.replaceAll('c.jsx(Ce,{value:"",children:"Không có"})', 'c.jsx(Ce,{value:"_none",children:"Không có"})'),
);

patch("Form selects map _none to empty", (src) => {
  let out = src;
  const pairs = [
    ["contractId:D", "contractId:D===\"_none\"?\"\":D"],
    ["serviceId:D", "serviceId:D===\"_none\"?\"\":D"],
    ["customerId:D", "customerId:D===\"_none\"?\"\":D"],
    ["supplierId:D", "supplierId:D===\"_none\"?\"\":D"],
  ];
  for (const [from, to] of pairs) {
    out = out.replaceAll(`{...y,${from}}`, `{...y,${to}}`);
    out = out.replaceAll(`{...o,${from}}`, `{...o,${to}}`);
  }
  return out;
});

// 3) Asset pages: undefined fields crash .toLowerCase() in search filter
patch("Asset search null-safe", (src) => {
  const fields = ["contractCode", "customerName", "campaignLink", "packageLabel", "domainName", "hostingName", "websiteLink", "fanpageLink", "profileLink"];
  let out = src;
  for (const f of fields) {
    out = out.replaceAll(`${f}.toLowerCase()`, `(${f}||"").toLowerCase()`);
  }
  return out;
});

// 4) Invoices "Xem / In" ghost button → visible outline
patch("Invoice print button visible", (src) => {
  const anchor = 'c.jsxs(st,{variant:"ghost",size:"sm",onClick:()=>';
  const replacement =
    'c.jsxs(st,{variant:"outline",size:"sm",className:"text-violet-800 border-violet-300 bg-white hover:bg-violet-50",onClick:()=>';
  if (!src.includes(anchor)) return src;
  if (src.includes('className:"text-violet-800 border-violet-300 bg-white hover:bg-violet-50",onClick:()=>')) return src;
  return src.replace(anchor, replacement);
});

// 5) Audit logs filters: match "all" option
patch("Audit logs filter default all", (src) => {
  let out = src;
  // entityType + action filters on audit page
  out = out.replace(
    "entityType:a||void 0,action:i||void 0",
    'entityType:a==="all"||!a?void 0:a,action:i==="all"||!i?void 0:i',
  );
  return out;
});

// 6) Sidebar: Công Nợ → accounts-receivable + Phải Trả NCC
patch("Thu-Chi menu AR/AP", (src) => {
  const anchor = '{href:"/debts",label:"Công Nợ",icon:xq}';
  const replacement =
    '{href:"/accounts-receivable",label:"Công Nợ",icon:xq},{href:"/accounts-payable",label:"Phải Trả NCC",icon:tm}';
  if (!src.includes(anchor)) return src;
  if (src.includes('href:"/accounts-receivable",label:"Công Nợ"')) return src;
  return src.replace(anchor, replacement);
});

fs.writeFileSync(bundlePath, s);
console.log(`Patched ${path.basename(bundlePath)} (${originalLen} -> ${s.length} bytes)`);
