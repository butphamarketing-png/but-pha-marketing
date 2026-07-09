export type Orientation = "any" | "landscape" | "portrait";
export type Anchor = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "custom";

export type Preset = {
  id: string;
  name: string;
  anchor: Anchor;
  marginXPercent: number;
  marginYPercent: number;
  logoWidthPercent: number;
  opacity: number;
  rotation: number;
  xPercent?: number;
  yPercent?: number;
  orientation: Orientation;
};

export type TextWatermarkSettings = {
  enabled: boolean;
  content: string;
  fontSizePercent: number;
  color: string;
  opacity: number;
};

export type LoadedImageMeta = {
  dataUrl: string;
  width: number;
  height: number;
  fileName: string;
  relativePath?: string;
};

export const PRESET_KEY = "bp-watermark-presets-v1";
export const LOGO_KEY = "bp-watermark-logo-v1";
export const SESSION_KEY = "bp-watermark-session-v1";
export const USED_IDENTITIES_KEY = "bp-watermark-used-identities-v1";

export const defaultPresets: Preset[] = [
  { id: "top-left", name: "Góc trái trên", anchor: "top-left", marginXPercent: 3, marginYPercent: 3, logoWidthPercent: 16, opacity: 85, rotation: 0, orientation: "any" },
  { id: "top-right", name: "Góc phải trên", anchor: "top-right", marginXPercent: 3, marginYPercent: 3, logoWidthPercent: 16, opacity: 85, rotation: 0, orientation: "any" },
  { id: "bottom-left", name: "Góc trái dưới", anchor: "bottom-left", marginXPercent: 3, marginYPercent: 3, logoWidthPercent: 16, opacity: 85, rotation: 0, orientation: "any" },
  { id: "bottom-right", name: "Góc phải dưới", anchor: "bottom-right", marginXPercent: 3, marginYPercent: 3, logoWidthPercent: 16, opacity: 85, rotation: 0, orientation: "any" },
  { id: "center", name: "Giữa ảnh", anchor: "center", marginXPercent: 0, marginYPercent: 0, logoWidthPercent: 28, opacity: 60, rotation: 0, orientation: "any" },
];

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function fileNameWithoutExt(name: string): string {
  const index = name.lastIndexOf(".");
  return index > 0 ? name.slice(0, index) : name;
}

export function extensionForMime(mime: "image/png" | "image/jpeg"): string {
  return mime === "image/png" ? "png" : "jpg";
}

export function detectOrientation(width: number, height: number): Orientation {
  return width >= height ? "landscape" : "portrait";
}

export function computePlacement(
  imageWidth: number,
  imageHeight: number,
  logoWidth: number,
  logoHeight: number,
  preset: Preset,
): { x: number; y: number; logoWidth: number; logoHeight: number } {
  const safeLogoWidth = clamp(logoWidth, 1, imageWidth);
  const safeLogoHeight = clamp(logoHeight, 1, imageHeight);
  const marginX = (imageWidth * preset.marginXPercent) / 100;
  const marginY = (imageHeight * preset.marginYPercent) / 100;
  const maxX = Math.max(0, imageWidth - safeLogoWidth);
  const maxY = Math.max(0, imageHeight - safeLogoHeight);
  let x = 0;
  let y = 0;

  if (preset.anchor === "top-left") {
    x = marginX;
    y = marginY;
  } else if (preset.anchor === "top-right") {
    x = imageWidth - safeLogoWidth - marginX;
    y = marginY;
  } else if (preset.anchor === "bottom-left") {
    x = marginX;
    y = imageHeight - safeLogoHeight - marginY;
  } else if (preset.anchor === "bottom-right") {
    x = imageWidth - safeLogoWidth - marginX;
    y = imageHeight - safeLogoHeight - marginY;
  } else if (preset.anchor === "center") {
    x = (imageWidth - safeLogoWidth) / 2;
    y = (imageHeight - safeLogoHeight) / 2;
  } else {
    x = ((preset.xPercent ?? 0) / 100) * imageWidth;
    y = ((preset.yPercent ?? 0) / 100) * imageHeight;
  }

  return { x: clamp(x, 0, maxX), y: clamp(y, 0, maxY), logoWidth: safeLogoWidth, logoHeight: safeLogoHeight };
}

export function matchPresetForImage(presets: Preset[], activePreset: Preset, width: number, height: number): Preset {
  const imageOrientation = detectOrientation(width, height);
  return (
    presets.find((preset) => preset.id === activePreset.id && (preset.orientation === "any" || preset.orientation === imageOrientation)) ??
    presets.find((preset) => preset.orientation === imageOrientation) ??
    activePreset
  );
}

export function canExportWatermark(logoDataUrl: string, textSettings: TextWatermarkSettings): boolean {
  return Boolean(logoDataUrl) || (textSettings.enabled && textSettings.content.trim().length > 0);
}

export function isImageFile(file: File): boolean {
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
}

export async function dataUrlToImageBitmap(dataUrl: string): Promise<ImageBitmap> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return createImageBitmap(blob);
}

/** Draw watermark onto a 2D context (Canvas or OffscreenCanvas). */
export async function renderWatermarkOnContext(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  baseWidth: number,
  baseHeight: number,
  baseSource: CanvasImageSource,
  logoDataUrl: string | null,
  preset: Preset,
  textSettings: TextWatermarkSettings,
): Promise<void> {
  ctx.clearRect(0, 0, baseWidth, baseHeight);
  ctx.drawImage(baseSource, 0, 0, baseWidth, baseHeight);

  if (logoDataUrl) {
    const logoBitmap = await dataUrlToImageBitmap(logoDataUrl);
    const logoWidth = (baseWidth * preset.logoWidthPercent) / 100;
    const logoHeight = logoWidth * (logoBitmap.height / logoBitmap.width);
    const placement = computePlacement(baseWidth, baseHeight, logoWidth, logoHeight, preset);
    const opacity = clamp(preset.opacity, 0, 100) / 100;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(placement.x + placement.logoWidth / 2, placement.y + placement.logoHeight / 2);
    ctx.rotate((preset.rotation * Math.PI) / 180);
    ctx.drawImage(logoBitmap, -placement.logoWidth / 2, -placement.logoHeight / 2, placement.logoWidth, placement.logoHeight);
    ctx.restore();
    logoBitmap.close();
  }

  if (textSettings.enabled && textSettings.content.trim()) {
    const textSize = Math.max(14, (baseWidth * textSettings.fontSizePercent) / 100);
    const textY = clamp(baseHeight - (baseHeight * 3) / 100, textSize + 4, baseHeight - 4);
    ctx.save();
    ctx.globalAlpha = clamp(textSettings.opacity, 0, 100) / 100;
    ctx.font = `700 ${textSize}px Inter, Arial, sans-serif`;
    ctx.fillStyle = textSettings.color;
    ctx.textAlign = "center";
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = Math.max(1, textSize * 0.08);
    ctx.strokeText(textSettings.content, baseWidth / 2, textY);
    ctx.fillText(textSettings.content, baseWidth / 2, textY);
    ctx.restore();
  }
}

export async function drawWatermarkBlob(
  image: LoadedImageMeta,
  logoDataUrl: string | null,
  preset: Preset,
  textSettings: TextWatermarkSettings,
  exportType: "image/png" | "image/jpeg",
  quality = 0.95,
): Promise<Blob> {
  const baseBitmap = await dataUrlToImageBitmap(image.dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = baseBitmap.width;
  canvas.height = baseBitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Trình duyệt không hỗ trợ Canvas");
  await renderWatermarkOnContext(ctx, baseBitmap.width, baseBitmap.height, baseBitmap, logoDataUrl, preset, textSettings);
  baseBitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, exportType, quality));
  if (!blob) throw new Error("Không thể xuất ảnh");
  return blob;
}

export async function loadImageFromFile(file: File): Promise<LoadedImageMeta & { file: File }> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Không đọc được file ảnh"));
    reader.readAsDataURL(file);
  });
  const bitmap = await dataUrlToImageBitmap(dataUrl);
  const meta = { file, dataUrl, width: bitmap.width, height: bitmap.height, fileName: file.name, relativePath: file.webkitRelativePath?.trim() || undefined };
  bitmap.close();
  return meta;
}
