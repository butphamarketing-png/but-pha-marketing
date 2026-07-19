import fs from "node:fs";

const p = "app/lien-he/ContactPageClient.tsx";
let t = fs.readFileSync(p, "utf8");
if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
fs.writeFileSync(p, t, "utf8");
const out = fs.readFileSync(p, "utf8");
console.log({
  startsOk: out.startsWith('"use client"'),
  brand: out.includes("Bứt Phá"),
  lienHe: out.includes("Liên hệ"),
});
