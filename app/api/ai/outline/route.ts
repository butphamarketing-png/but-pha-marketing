import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type OutlineItem = {
  level: number;
  text: string;
  summary: string;
  keyPoints: string[];
};

function normalizeTitle(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripCodeFences(raw: string) {
  return raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

function fallbackOutline(title: string) {
  const structure: OutlineItem[] = [
    { level: 2, text: `Gioi thieu ve ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Nhu cau thuc te cua khach hang", summary: "", keyPoints: [] },
    { level: 2, text: `Giai phap ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Quy trinh trien khai", summary: "", keyPoints: [] },
    { level: 2, text: "Kinh nghiem thuc chien", summary: "", keyPoints: [] },
    { level: 2, text: "Bang gia va luu y", summary: "", keyPoints: [] },
    { level: 2, text: "Cau hoi thuong gap", summary: "", keyPoints: [] },
    { level: 2, text: "Ket luan", summary: "", keyPoints: [] },
  ];

  return {
    h1: title,
    structure,
    keywords: [title, "dich vu marketing", "SEO", "chuyen doi"],
  };
}

function parseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(stripCodeFences(raw)) as T;
  } catch {
    return null;
  }
}

function normalizeKeywords(title: string, keywords: unknown) {
  const list = Array.isArray(keywords)
    ? keywords.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean)
    : [];
  return list.length > 0 ? list.slice(0, 8) : [title, "dich vu marketing", "SEO"];
}

function normalizeStructure(items: unknown, title: string): OutlineItem[] {
  const rows = Array.isArray(items) ? items : [];
  const normalized = rows
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Record<string, unknown>;
      const text = normalizeTitle(candidate.text ?? candidate.heading ?? candidate.title);
      if (!text) return null;
      const level = Number(candidate.level ?? 2);
      return {
        level: Number.isFinite(level) && level >= 2 && level <= 3 ? level : 2,
        text,
        summary: typeof candidate.summary === "string" ? candidate.summary.trim() : "",
        keyPoints: Array.isArray(candidate.keyPoints)
          ? candidate.keyPoints.map((point) => (typeof point === "string" ? point.trim() : "")).filter(Boolean)
          : [],
      } satisfies OutlineItem;
    })
    .filter((item): item is OutlineItem => Boolean(item));

  return normalized.length > 0 ? normalized : fallbackOutline(title).structure;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const title = normalizeTitle(body?.title);

    if (!title) {
      return NextResponse.json({ error: "Thieu tieu de de tao dan y AI." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(fallbackOutline(title));
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Ban la chuyen gia SEO content tieng Viet. Hay tra ve JSON hop le, khong markdown, khong giai thich them.",
        },
        {
          role: "user",
          content: [
            `Tieu de bai viet: ${title}`,
            "Hay phan tich search intent va de xuat dan y bai viet chuan SEO cho landing article dich vu marketing.",
            "Yeu cau:",
            "- Tao 6-8 muc chinh",
            "- level chi dung 2 hoac 3",
            "- text la tieu de hien thi ro rang bang tieng Viet",
            "- keywords la danh sach tu khoa muc tieu lien quan",
            "Schema JSON:",
            '{"keywords":["..."],"structure":[{"level":2,"text":"...","summary":"...","keyPoints":["..."]}]}',
          ].join("\n"),
        },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "";
    const parsed = parseJson<{ keywords?: unknown; structure?: unknown }>(raw);
    if (!parsed) {
      return NextResponse.json(fallbackOutline(title));
    }

    return NextResponse.json({
      h1: title,
      structure: normalizeStructure(parsed.structure, title),
      keywords: normalizeKeywords(title, parsed.keywords),
    });
  } catch (error) {
    console.error("POST /api/ai/outline failed", error);
    return NextResponse.json({ error: "Khong the tao dan y AI luc nay." }, { status: 500 });
  }
}
