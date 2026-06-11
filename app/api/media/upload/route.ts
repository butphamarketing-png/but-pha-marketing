import path from "path";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isR2Configured, uploadToR2 } from "@/lib/r2-storage";

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

async function uploadImage(buffer: Buffer, storagePath: string, contentType: string) {
  if (!isR2Configured()) {
    throw new Error(
      "Chưa cấu hình Cloudflare R2. Ảnh được lưu trên R2; Supabase chỉ lưu metadata trong bảng media.",
    );
  }

  const publicUrl = await uploadToR2(storagePath, buffer, contentType);
  return { publicUrl, storage: "r2" as const };
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
    const storagePath = `uploads/media/${fileName}`;
    const { publicUrl, storage } = await uploadImage(buffer, storagePath, file.type || "image/png");

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
      return NextResponse.json({ error: "Đã tải file lên nhưng chưa ghi được vào media." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      item: data,
      url: publicUrl,
      path: storagePath,
      storage,
    });
  } catch (error) {
    console.error("POST /api/media/upload failed", error);
    const message = error instanceof Error ? error.message : "Không thể tải ảnh lên lúc này.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
