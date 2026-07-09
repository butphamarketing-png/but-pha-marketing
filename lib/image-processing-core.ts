import { dataUrlToImageBitmap, fileNameWithoutExt, type LoadedImageMeta } from "@/lib/watermark-core";

export type ResizeMode = "cover" | "contain" | "exact";

export type ResizePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  mode: ResizeMode;
};

export const RESIZE_PRESETS: ResizePreset[] = [
  { id: "shopee-1", name: "Shopee 1:1", width: 1080, height: 1080, mode: "cover" },
  { id: "fb-45", name: "Facebook 4:5", width: 1080, height: 1350, mode: "cover" },
  { id: "story-916", name: "Story 9:16", width: 1080, height: 1920, mode: "cover" },
  { id: "banner-web", name: "Banner web", width: 1920, height: 600, mode: "cover" },
  { id: "fullhd-contain", name: "Full HD (vừa khung)", width: 1920, height: 1080, mode: "contain" },
  { id: "max-1920", name: "Cạnh dài max 1920px", width: 1920, height: 1920, mode: "contain" },
];

export type CompressFormat = "image/webp" | "image/jpeg" | "image/png";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function extForFormat(format: CompressFormat): string {
  if (format === "image/webp") return "webp";
  if (format === "image/jpeg") return "jpg";
  return "png";
}

/** Compute output dimensions for max-edge contain resize */
export function computeMaxEdgeSize(srcW: number, srcH: number, maxEdge: number): { width: number; height: number } {
  if (Math.max(srcW, srcH) <= maxEdge) return { width: srcW, height: srcH };
  const ratio = maxEdge / Math.max(srcW, srcH);
  return { width: Math.round(srcW * ratio), height: Math.round(srcH * ratio) };
}

export async function resizeImageBlob(
  image: LoadedImageMeta,
  preset: ResizePreset,
  background = "#ffffff",
): Promise<Blob> {
  const bitmap = await dataUrlToImageBitmap(image.dataUrl);
  try {
    return await resizeBitmapToBlob(bitmap, preset, background);
  } finally {
    bitmap.close();
  }
}

export async function resizeBitmapToBlob(
  bitmap: ImageBitmap,
  preset: ResizePreset,
  background = "#ffffff",
): Promise<Blob> {
  let outW = preset.width;
  let outH = preset.height;

  if (preset.id === "max-1920") {
    const sized = computeMaxEdgeSize(bitmap.width, bitmap.height, 1920);
    outW = sized.width;
    outH = sized.height;
  }

  const canvas = new OffscreenCanvas(outW, outH);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không hỗ trợ canvas");

  if (preset.mode === "exact" || preset.id === "max-1920") {
    ctx.drawImage(bitmap, 0, 0, outW, outH);
  } else if (preset.mode === "contain") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, outW, outH);
    const scale = Math.min(outW / bitmap.width, outH / bitmap.height);
    const dw = bitmap.width * scale;
    const dh = bitmap.height * scale;
    ctx.drawImage(bitmap, (outW - dw) / 2, (outH - dh) / 2, dw, dh);
  } else {
    const scale = Math.max(outW / bitmap.width, outH / bitmap.height);
    const sw = outW / scale;
    const sh = outH / scale;
    const sx = (bitmap.width - sw) / 2;
    const sy = (bitmap.height - sh) / 2;
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, outW, outH);
  }

  const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.92 });
  if (!blob) throw new Error("Không thể resize ảnh");
  return blob;
}

export async function compressImageBlob(image: LoadedImageMeta, format: CompressFormat, quality: number): Promise<Blob> {
  const bitmap = await dataUrlToImageBitmap(image.dataUrl);
  try {
    return await compressBitmapToBlob(bitmap, format, quality);
  } finally {
    bitmap.close();
  }
}

export async function compressBitmapToBlob(bitmap: ImageBitmap, format: CompressFormat, quality: number): Promise<Blob> {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không hỗ trợ canvas");
  ctx.drawImage(bitmap, 0, 0);
  const blob = await canvas.convertToBlob({ type: format, quality });
  if (!blob) throw new Error("Không thể nén ảnh");
  return blob;
}

export function outputNameForImage(image: LoadedImageMeta, suffix: string, ext: string): string {
  const base = image.relativePath ? fileNameWithoutExt(image.relativePath) : fileNameWithoutExt(image.fileName);
  return `${base}${suffix}.${ext}`;
}
