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

    // Validate file
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Không có file ảnh được gửi lên" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Chỉ hỗ trợ file ảnh (JPG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File quá lớn. Tối đa ${MAX_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
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
        name: suggestedName || file.name || `${title || "Ảnh"} - ${sectionLabel}`,
        type: "image",
        timestamp: Date.now(),
      })
      .select()
      .single();

    if (error) {
      console.error("[v0] POST /api/media/upload - Supabase insert error", error);
      // Still return success with the local URL if Supabase fails
      // This allows local uploads to work even if database is unavailable
      return NextResponse.json({
        ok: true,
        item: {
          id: `local-${Date.now()}`,
          name: suggestedName || file.name,
        },
        url: publicUrl,
        path: absolutePath,
        warning: "Ảnh đã tải lên nhưng chưa được lưu vào cơ sở dữ liệu",
      });
    }

    return NextResponse.json({
      ok: true,
      item: data,
      url: publicUrl,
      path: absolutePath,
    });
  } catch (error) {
    console.error("[v0] POST /api/media/upload - Error", error);
    const errorMsg = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json(
      { error: `Lỗi tải ảnh: ${errorMsg}` },
      { status: 500 }
    );
  }
}
