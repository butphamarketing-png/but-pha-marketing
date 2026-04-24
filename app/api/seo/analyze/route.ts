import { NextResponse } from "next/server";
import { evaluateSeoArticle } from "@/lib/seo-quality";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const metaDescription = typeof body?.metaDescription === "string" ? body.metaDescription.trim() : "";
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
    const keywords = Array.isArray(body?.keywords) ? body.keywords.filter((item: unknown) => typeof item === "string") as string[] : [];
    const html = typeof body?.content === "string" ? body.content : "";
    const serviceKeywords = Array.isArray(body?.serviceKeywords)
      ? body.serviceKeywords.filter((item: unknown) => typeof item === "string") as string[]
      : [];
    const evaluation = evaluateSeoArticle({
      title,
      metaDescription,
      slug,
      keywords,
      content: html,
      serviceKeywords,
    });

    return NextResponse.json({
      ...evaluation,
    });
  } catch (error) {
    console.error("POST /api/seo/analyze failed", error);
    return NextResponse.json({ error: "Khong the phan tich SEO luc nay." }, { status: 500 });
  }
}
