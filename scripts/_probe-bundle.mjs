import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const s = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "cms", "assets", "index-Ceyco5BZ.js"), "utf8");
const start = s.indexOf("function cI(");
console.log(s.slice(start, start + 4500));
