import { mkdir, writeFile } from "fs/promises";
import path from "path";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getExtension(fileName: string, mimeType: string) {
  const ext = path.extname(fileName).replace(".", "").toLowerCase();
  if (ext) return ext;
  if (mimeType.includes("jpeg")) return "jpg";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("gif")) return "gif";
  return "png";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = cleanText(formData.get("title"));
    const sectionLabel = cleanText(formData.get("sectionLabel")) || "upload";
    const suggestedName = cleanText(formData.get("suggestedName"));

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thieu file anh de tai len." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = getExtension(file.name, file.type);
    const baseName =
      slugify(suggestedName || file.name.replace(/\.[^.]+$/, "") || `${title}-${sectionLabel}`, {
        lower: true,
        strict: true,
        trim: true,
      }) || `upload-${Date.now()}`;

    const fileName = `${baseName}-${Date.now()}.${extension}`;
    const relativeDir = path.join("uploads", "media");
    const absoluteDir = path.join(process.cwd(), "public", relativeDir);
    const absolutePath = path.join(absoluteDir, fileName);
    const publicUrl = `/${relativeDir.replace(/\\/g, "/")}/${fileName}`;

    await mkdir(absoluteDir, { recursive: true });
    await writeFile(absolutePath, buffer);

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("media")
      .insert({
        url: publicUrl,
        name: suggestedName || file.name || `${title || "Anh"} - ${sectionLabel}`,
        type: "image",
        timestamp: Date.now(),
      })
      .select()
      .single();

    if (error) {
      console.error("POST /api/media/upload Supabase error", error);
      return NextResponse.json({ error: "Da tai file len nhung chua ghi duoc vao media." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      item: data,
      url: publicUrl,
      path: absolutePath,
    });
  } catch (error) {
    console.error("POST /api/media/upload failed", error);
    return NextResponse.json({ error: "Khong the tai anh len luc nay." }, { status: 500 });
  }
}
