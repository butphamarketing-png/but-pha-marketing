import fs from "node:fs";
const s = fs.readFileSync("public/cms/assets/index-Ceyco5BZ.js", "utf8");
const anchors = [
  "paymentStatus:d.status",
  'customerId:String(P.customerId??""),expenseDate:String(P.expenseDate??"")',
];
for (const a of anchors) {
  const i = s.indexOf(a);
  console.log("---", a);
  console.log(s.slice(i - 80, i + 200));
}
