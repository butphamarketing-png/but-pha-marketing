/**
 * Tự sinh thumbnail tin tức qua OpenAI Images API (không cần bấm duyệt UI).
 * Usage: node scripts/gen-news-thumbnails-openai.mjs
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

const STYLE =
  "Editorial Vietnamese marketing blog thumbnail, 16:9 landscape, dark navy-purple tech background, subtle grid glow, bold white-violet 3D title text matching the topic, clean corporate education style, no watermark, no tiny unreadable UI text.";

/** Mỗi bài 1 file riêng — khớp tiêu đề / từ khóa */
const JOBS = [
  {
    out: "public/tin-tuc/crm/hubspot-hay-zoho-crm.png",
    title: "HUBSPOT HAY ZOHO CRM?",
    prompt: `${STYLE} Split comparison: left HubSpot orange CRM dashboard, right Zoho CRM blue dashboard, glowing VS center. Title: "HUBSPOT HAY ZOHO CRM?".`,
  },
  {
    out: "public/tin-tuc/zalo/zalo-zns-la-gi-b17.png",
    title: "ZALO ZNS LÀ GÌ?",
    prompt: `${STYLE} Smartphone with Zalo Notification Service (ZNS) push bubbles and Zalo Z logo. Title: "ZALO ZNS LÀ GÌ?".`,
  },
  {
    out: "public/tin-tuc/zalo/zalo-zns-hay-sms-b17.png",
    title: "ZALO ZNS HAY SMS?",
    prompt: `${STYLE} Split: left Zalo ZNS cyan notification, right gray SMS bubble, VS center. Title: "ZALO ZNS HAY SMS?".`,
  },
  {
    out: "public/tin-tuc/zalo/zalo-zns-template-bi-tu-choi.png",
    title: "ZNS TEMPLATE BỊ TỪ CHỐI",
    prompt: `${STYLE} Zalo ZNS template form with red REJECTED stamp and pencil fixing content. Title: "ZNS TEMPLATE BỊ TỪ CHỐI".`,
  },
  {
    out: "public/tin-tuc/zalo/zalo-zns-bi-tu-choi-b17.png",
    title: "ZALO ZNS BỊ TỪ CHỐI",
    prompt: `${STYLE} Zalo OA admin screen showing template rejection error and fix checklist. Title: "ZALO ZNS BỊ TỪ CHỐI".`,
  },
  {
    out: "public/tin-tuc/zalo/zalo-zns-bi-chan.png",
    title: "ZALO ZNS BỊ CHẶN",
    prompt: `${STYLE} Zalo notification blocked by shield/ban icon, unlock key motif. Title: "ZALO ZNS BỊ CHẶN".`,
  },
  {
    out: "public/tin-tuc/logistics/logistics-2.png",
    title: "WEBSITE VẬN TẢI",
    prompt: `${STYLE} Freight truck and logistics tracking website mockup on laptop, blue industrial tones. Title: "WEBSITE VẬN TẢI".`,
  },
];

async function generateOne(job) {
  const abs = path.join(root, job.out);
  if (fs.existsSync(abs) && fs.statSync(abs).size > 50_000) {
    console.log(`Skip (exists): ${job.out}`);
    return;
  }

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  console.log(`Generating: ${job.title} → ${job.out}`);

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: job.prompt,
      size: "1536x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    // Fallback dall-e-3 nếu model không khả dụng
    if (res.status === 400 || res.status === 404) {
      console.warn(`gpt-image-1 failed (${res.status}), trying dall-e-3…`);
      const res2 = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: job.prompt,
          size: "1792x1024",
          quality: "hd",
          n: 1,
          response_format: "b64_json",
        }),
      });
      if (!res2.ok) {
        throw new Error(`OpenAI ${res2.status}: ${await res2.text()}\nPrev: ${errText}`);
      }
      const data2 = await res2.json();
      const b64 = data2.data?.[0]?.b64_json;
      if (!b64) throw new Error("No b64 from dall-e-3");
      await sharp(Buffer.from(b64, "base64")).png().toFile(abs);
      console.log(`OK (dall-e-3): ${job.out} (${fs.statSync(abs).size} bytes)`);
      return;
    }
    throw new Error(`OpenAI ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  const url = data.data?.[0]?.url;
  let buf;
  if (b64) {
    buf = Buffer.from(b64, "base64");
  } else if (url) {
    const imgRes = await fetch(url);
    buf = Buffer.from(await imgRes.arrayBuffer());
  } else {
    throw new Error("No image in response: " + JSON.stringify(data).slice(0, 400));
  }

  await sharp(buf).png().toFile(abs);
  console.log(`OK: ${job.out} (${fs.statSync(abs).size} bytes)`);
}

for (const job of JOBS) {
  try {
    await generateOne(job);
  } catch (e) {
    console.error(`FAIL ${job.out}:`, e.message || e);
    process.exitCode = 1;
  }
}

console.log("Done.");
