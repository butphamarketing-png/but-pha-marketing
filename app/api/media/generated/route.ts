import path from "path";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "media";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBase64Image(input: string) {
  const dataUrlMatch = input.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1],
      base64: dataUrlMatch[2],
    };
  }

  return {
    mimeType: "image/png",
    base64: input,
  };
}

function getExtension(mimeType: string) {
  if (mimeType.includes("jpeg")) return "jpg";
  if (mimeType.includes("webp")) return "webp";
  return "png";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const imageBase64 = cleanText(body?.imageBase64);
    const title = cleanText(body?.title) || "ai-image";
    const sectionLabel = cleanText(body?.sectionLabel) || "image";
    const suggestedName = cleanText(body?.suggestedName);

    if (!imageBase64) {
      return NextResponse.json({ error: "Thiếu dữ liệu ảnh để lưu." }, { status: 400 });
    }

    const { mimeType, base64 } = parseBase64Image(imageBase64);
    const extension = getExtension(mimeType);
    const safeBaseName = slugify(suggestedName || `${title}-${sectionLabel}`, {
      lower: true,
      strict: true,
      trim: true,
    }) || `ai-image-${Date.now()}`;
    const fileName = `${safeBaseName}-${Date.now()}.${extension}`;
    const supabase = createServerClient();
    const storagePath = `generated/ai/${fileName}`;
    const buffer = Buffer.from(base64, "base64");
    const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, buffer, {
      contentType: mimeType,
      upsert: false,
    });

    if (uploadError) {
      console.error("POST /api/media/generated Storage error", uploadError);
      return NextResponse.json({ error: `Không thể lưu ảnh vào Supabase Storage bucket "${STORAGE_BUCKET}".` }, { status: 500 });
    }

    const { data: publicData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
    const publicUrl = publicData.publicUrl;

    const { data, error } = await supabase
      .from("media")
      .insert({
        url: publicUrl,
        name: suggestedName || `${title} - ${sectionLabel}`,
        type: "image",
        timestamp: Date.now(),
      })
      .select()
      .single();

    if (error) {
      console.error("POST /api/media/generated Supabase error", error);
      return NextResponse.json({ error: "Đã lưu file nhưng chưa ghi được vào media." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      item: data,
      url: publicUrl,
      path: storagePath,
    });
  } catch (error) {
    console.error("POST /api/media/generated failed", error);
    return NextResponse.json({ error: "Không thể lưu ảnh vào media." }, { status: 500 });
  }
}
