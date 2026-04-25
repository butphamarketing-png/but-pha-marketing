import { NextResponse } from "next/server";
import { autoFixSeoDraft } from "@/lib/seo-autofix";

export const runtime = "nodejs";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const result = autoFixSeoDraft({
      title: cleanText(body?.title),
      metaTitle: cleanText(body?.metaTitle),
      metaDescription: cleanText(body?.metaDescription),
      description: cleanText(body?.description),
      slug: cleanText(body?.slug),
      content: cleanText(body?.content),
      keywords: Array.isArray(body?.keywords) ? body.keywords.map(cleanText).filter(Boolean) : [],
      imageUrls: Array.isArray(body?.imageUrls) ? body.imageUrls.map(cleanText).filter(Boolean) : [],
      internalLinks: Array.isArray(body?.internalLinks)
        ? body.internalLinks
            .map((item: any) => ({
              slug: cleanText(item?.slug),
              title: cleanText(item?.title),
              anchorText: cleanText(item?.anchorText),
            }))
            .filter((item: { slug: string; title: string; anchorText?: string }) => item.slug && item.title)
        : [],
      serviceKeywords: Array.isArray(body?.serviceKeywords) ? body.serviceKeywords.map(cleanText).filter(Boolean) : [],
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("POST /api/seo/autofix failed", error);
    return NextResponse.json({ ok: false, error: "Khong the tu sua SEO luc nay." }, { status: 500 });
  }
}
