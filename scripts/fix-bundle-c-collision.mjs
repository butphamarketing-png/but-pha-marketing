import fs from "node:fs";
const path = "public/cms/assets/index-Ceyco5BZ.js";
let s = fs.readFileSync(path, "utf8");
const before = s.length;
const from =
  '{title:"Quản Lý",items:[{href:"/cms/khachhang",label:"Khách Hàng",icon:J1},{href:"/services"';
const to = '{title:"Quản Lý",items:[{href:"/services"';
if (!s.includes(from)) {
  console.error("Quản Lý KH block not found");
  process.exit(1);
}
s = s.replace(from, to);
fs.writeFileSync(path, s);
console.log(`Removed Quản Lý Khách Hàng (${before} -> ${s.length})`);
