import { NextResponse } from "next/server";
import { revalidateBlogCache } from "@/lib/blog-revalidate";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = searchParams.get("slug") || undefined;
  revalidateBlogCache(slug);
  return NextResponse.json({ revalidated: true, slug: slug || "all" });
}
