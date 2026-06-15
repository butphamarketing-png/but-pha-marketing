import fs from "node:fs";
const path = "public/cms/assets/index-Ceyco5BZ.js";
let s = fs.readFileSync(path, "utf8");

const bad =
  'onClick:()=>window.open("/adminbp","_blank")}}}),c.jsx("div",{className:"flex gap-3 mb-4"';
const good =
  'onClick:()=>window.open("/cms/khachhang","_blank")}}),c.jsx("div",{className:"flex gap-3 mb-4"';

if (!s.includes(bad)) {
  console.error("Broken jI tr anchor not found");
  process.exit(1);
}
s = s.replace(bad, good);
fs.writeFileSync(path, s);
console.log("Fixed jI tr extra brace + CMS link");
