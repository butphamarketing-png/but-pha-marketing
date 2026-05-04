import path from "path";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "media";

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
      return NextResponse.json({ error: "Thiếu file ảnh để tải lên." }, { status: 400 });
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
    const supabase = createServerClient();
    const storagePath = `uploads/media/${fileName}`;
    const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, buffer, {
      contentType: file.type || "image/png",
      upsert: false,
    });

    if (uploadError) {
      console.error("POST /api/media/upload Storage error", uploadError);
      return NextResponse.json({ error: `Không thể lưu ảnh vào Supabase Storage bucket "${STORAGE_BUCKET}".` }, { status: 500 });
    }

    const { data: publicData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
    const publicUrl = publicData.publicUrl;

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
      return NextResponse.json({ error: "Đã tải file lên nhưng chưa ghi được vào media." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      item: data,
      url: publicUrl,
      path: storagePath,
    });
  } catch (error) {
    console.error("POST /api/media/upload failed", error);
    return NextResponse.json({ error: "Không thể tải ảnh lên lúc này." }, { status: 500 });
  }
}
