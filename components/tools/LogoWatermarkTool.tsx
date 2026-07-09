"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { removeBackground } from "@imgly/background-removal";

type Orientation = "any" | "landscape" | "portrait";
type Anchor = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "custom";

type Preset = {
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

type LoginSession = {
  fullName: string;
  email: string;
  phone: string;
  acceptedAt: string;
};

type LoadedImage = {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
};

type TextWatermarkSettings = {
  enabled: boolean;
  content: string;
  fontSizePercent: number;
  color: string;
  opacity: number;
};

const PRESET_KEY = "bp-watermark-presets-v1";
const LOGO_KEY = "bp-watermark-logo-v1";
const SESSION_KEY = "bp-watermark-session-v1";
const USED_IDENTITIES_KEY = "bp-watermark-used-identities-v1";

const defaultPresets: Preset[] = [
  {
    id: "top-left",
    name: "Góc trái trên",
    anchor: "top-left",
    marginXPercent: 3,
    marginYPercent: 3,
    logoWidthPercent: 16,
    opacity: 85,
    rotation: 0,
    orientation: "any",
  },
  {
    id: "top-right",
    name: "Góc phải trên",
    anchor: "top-right",
    marginXPercent: 3,
    marginYPercent: 3,
    logoWidthPercent: 16,
    opacity: 85,
    rotation: 0,
    orientation: "any",
  },
  {
    id: "bottom-left",
    name: "Góc trái dưới",
    anchor: "bottom-left",
    marginXPercent: 3,
    marginYPercent: 3,
    logoWidthPercent: 16,
    opacity: 85,
    rotation: 0,
    orientation: "any",
  },
  {
    id: "bottom-right",
    name: "Góc phải dưới",
    anchor: "bottom-right",
    marginXPercent: 3,
    marginYPercent: 3,
    logoWidthPercent: 16,
    opacity: 85,
    rotation: 0,
    orientation: "any",
  },
  {
    id: "center",
    name: "Giữa ảnh",
    anchor: "center",
    marginXPercent: 0,
    marginYPercent: 0,
    logoWidthPercent: 28,
    opacity: 60,
    rotation: 0,
    orientation: "any",
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function fileNameWithoutExt(name: string): string {
  const index = name.lastIndexOf(".");
  return index > 0 ? name.slice(0, index) : name;
}

function extensionForMime(mime: "image/png" | "image/jpeg"): string {
  return mime === "image/png" ? "png" : "jpg";
}

function detectOrientation(width: number, height: number): Orientation {
  return width >= height ? "landscape" : "portrait";
}

function computePlacement(
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

  return {
    x: clamp(x, 0, maxX),
    y: clamp(y, 0, maxY),
    logoWidth: safeLogoWidth,
    logoHeight: safeLogoHeight,
  };
}

function imageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Không tải được ảnh"));
    img.src = dataUrl;
  });
}

async function loadImageFromFile(file: File): Promise<LoadedImage> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Không đọc được file ảnh"));
    reader.readAsDataURL(file);
  });
  const img = await imageFromDataUrl(dataUrl);
  return { file, dataUrl, width: img.width, height: img.height };
}

async function drawWatermarkBlob(
  image: LoadedImage,
  logoDataUrl: string,
  preset: Preset,
  textSettings: TextWatermarkSettings,
  exportType: "image/png" | "image/jpeg",
  quality = 0.95,
): Promise<Blob> {
  const baseImg = await imageFromDataUrl(image.dataUrl);
  const logoImg = await imageFromDataUrl(logoDataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = baseImg.width;
  canvas.height = baseImg.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Trình duyệt không hỗ trợ Canvas");
  ctx.drawImage(baseImg, 0, 0);

  const logoWidth = (baseImg.width * preset.logoWidthPercent) / 100;
  const logoHeight = logoWidth * (logoImg.height / logoImg.width);
  const placement = computePlacement(baseImg.width, baseImg.height, logoWidth, logoHeight, preset);
  const opacity = clamp(preset.opacity, 0, 100) / 100;
  const rotationRadians = (preset.rotation * Math.PI) / 180;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(placement.x + placement.logoWidth / 2, placement.y + placement.logoHeight / 2);
  ctx.rotate(rotationRadians);
  ctx.drawImage(logoImg, -placement.logoWidth / 2, -placement.logoHeight / 2, placement.logoWidth, placement.logoHeight);
  ctx.restore();

  if (textSettings.enabled && textSettings.content.trim()) {
    const textSize = Math.max(14, (baseImg.width * textSettings.fontSizePercent) / 100);
    const textY = clamp(baseImg.height - (baseImg.height * 3) / 100, textSize + 4, baseImg.height - 4);
    ctx.save();
    ctx.globalAlpha = clamp(textSettings.opacity, 0, 100) / 100;
    ctx.font = `700 ${textSize}px Inter, Arial, sans-serif`;
    ctx.fillStyle = textSettings.color;
    ctx.textAlign = "center";
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = Math.max(1, textSize * 0.08);
    ctx.strokeText(textSettings.content, baseImg.width / 2, textY);
    ctx.fillText(textSettings.content, baseImg.width / 2, textY);
    ctx.restore();
  }

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, exportType, quality));
  if (!blob) throw new Error("Không thể xuất ảnh");
  return blob;
}

function resizeImageForRemoval(file: File, maxEdge: number): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const loaded = await loadImageFromFile(file);
      if (Math.max(loaded.width, loaded.height) <= maxEdge) {
        resolve(file);
        return;
      }
      const ratio = maxEdge / Math.max(loaded.width, loaded.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(loaded.width * ratio);
      canvas.height = Math.round(loaded.height * ratio);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Trình duyệt không hỗ trợ resize canvas"));
        return;
      }
      const img = await imageFromDataUrl(loaded.dataUrl);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) reject(new Error("Không thể resize ảnh"));
        else resolve(blob);
      }, "image/png");
    } catch (error) {
      reject(error);
    }
  });
}

function isImageFile(file: File): boolean {
  return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
}

export function LogoWatermarkTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<"watermark" | "remove-bg">("watermark");

  const [session, setSession] = useState<LoginSession | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loginError, setLoginError] = useState("");

  const [images, setImages] = useState<LoadedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = images[selectedImageIndex] ?? null;

  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [logoNaturalSize, setLogoNaturalSize] = useState({ width: 1, height: 1 });
  const [presets, setPresets] = useState<Preset[]>(defaultPresets);
  const [activePresetId, setActivePresetId] = useState(defaultPresets[3].id);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, running: false });
  const [exportType, setExportType] = useState<"image/png" | "image/jpeg">("image/png");
  const [newPresetName, setNewPresetName] = useState("");
  const [previewOutputUrl, setPreviewOutputUrl] = useState("");
  const [compareSplit, setCompareSplit] = useState(55);
  const [textWatermark, setTextWatermark] = useState<TextWatermarkSettings>({
    enabled: false,
    content: "Bứt Phá Marketing",
    fontSizePercent: 3.2,
    color: "#FFFFFF",
    opacity: 80,
  });

  const [dragMode, setDragMode] = useState<"move" | "resize" | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, startXP: 0, startYP: 0, startWidth: 0 });
  const batchControlRef = useRef({ paused: false, cancelled: false });

  const [removeFile, setRemoveFile] = useState<File | null>(null);
  const [removeBeforeUrl, setRemoveBeforeUrl] = useState("");
  const [removeAfterUrl, setRemoveAfterUrl] = useState("");
  const [removeTarget, setRemoveTarget] = useState<"logo" | "image">("image");
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeProgressText, setRemoveProgressText] = useState("");
  const [resizeBeforeRemove, setResizeBeforeRemove] = useState(true);

  const activePreset = useMemo(() => {
    return presets.find((preset) => preset.id === activePresetId) ?? presets[0];
  }, [presets, activePresetId]);

  useEffect(() => {
    const rawSession = localStorage.getItem(SESSION_KEY);
    if (rawSession) setSession(JSON.parse(rawSession));
    const rawPresets = localStorage.getItem(PRESET_KEY);
    if (rawPresets) setPresets(JSON.parse(rawPresets) as Preset[]);
    const rawLogo = localStorage.getItem(LOGO_KEY);
    if (rawLogo) {
      setLogoDataUrl(rawLogo);
      imageFromDataUrl(rawLogo).then((img) => setLogoNaturalSize({ width: img.width, height: img.height })).catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
  }, [presets]);

  const updateActivePreset = useCallback(
    (partial: Partial<Preset>) => {
      setPresets((prev) =>
        prev.map((preset) => {
          if (preset.id !== activePresetId) return preset;
          return { ...preset, ...partial };
        }),
      );
    },
    [activePresetId],
  );

  const drawPreview = useCallback(async () => {
    if (!canvasRef.current || !selectedImage || !logoDataUrl || !activePreset) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const base = await imageFromDataUrl(selectedImage.dataUrl);
    const logo = await imageFromDataUrl(logoDataUrl);
    canvas.width = base.width;
    canvas.height = base.height;
    const maxPreviewWidth = 880;
    const ratio = base.width > maxPreviewWidth ? maxPreviewWidth / base.width : 1;
    canvas.style.width = `${Math.round(base.width * ratio)}px`;
    canvas.style.height = `${Math.round(base.height * ratio)}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(base, 0, 0);
    const logoWidth = (base.width * activePreset.logoWidthPercent) / 100;
    const logoHeight = logoWidth * (logo.height / logo.width);
    const placement = computePlacement(base.width, base.height, logoWidth, logoHeight, activePreset);
    ctx.save();
    ctx.globalAlpha = clamp(activePreset.opacity, 0, 100) / 100;
    ctx.translate(placement.x + placement.logoWidth / 2, placement.y + placement.logoHeight / 2);
    ctx.rotate((activePreset.rotation * Math.PI) / 180);
    ctx.drawImage(logo, -placement.logoWidth / 2, -placement.logoHeight / 2, placement.logoWidth, placement.logoHeight);
    ctx.restore();

    if (textWatermark.enabled && textWatermark.content.trim()) {
      const textSize = Math.max(14, (base.width * textWatermark.fontSizePercent) / 100);
      const textY = clamp(base.height - (base.height * 3) / 100, textSize + 4, base.height - 4);
      ctx.save();
      ctx.globalAlpha = clamp(textWatermark.opacity, 0, 100) / 100;
      ctx.font = `700 ${textSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = textWatermark.color;
      ctx.textAlign = "center";
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = Math.max(1, textSize * 0.08);
      ctx.strokeText(textWatermark.content, base.width / 2, textY);
      ctx.fillText(textWatermark.content, base.width / 2, textY);
      ctx.restore();
    }

    setPreviewOutputUrl(canvas.toDataURL("image/png"));

    ctx.save();
    ctx.strokeStyle = "rgba(124,58,237,0.9)";
    ctx.lineWidth = 3;
    ctx.strokeRect(placement.x, placement.y, placement.logoWidth, placement.logoHeight);
    ctx.fillStyle = "rgba(124,58,237,1)";
    ctx.fillRect(placement.x + placement.logoWidth - 12, placement.y + placement.logoHeight - 12, 12, 12);
    ctx.restore();
  }, [selectedImage, logoDataUrl, activePreset, textWatermark]);

  useEffect(() => {
    drawPreview().catch(() => undefined);
  }, [drawPreview]);

  useEffect(() => {
    if (!selectedImage || !logoDataUrl) {
      setPreviewOutputUrl("");
    }
  }, [selectedImage, logoDataUrl]);

  const handleLogin = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const emailValid = /^[^\s@]+@gmail\.com$/i.test(email.trim());
      const phoneDigits = phone.replace(/\D/g, "");
      const phoneValid = /^0\d{9,10}$/.test(phoneDigits);
      if (!fullName.trim()) {
        setLoginError("Vui lòng nhập họ và tên.");
        return;
      }
      if (!emailValid) {
        setLoginError("Vui lòng dùng Gmail hợp lệ.");
        return;
      }
      if (!phoneValid) {
        setLoginError("Số điện thoại cần đúng định dạng Việt Nam.");
        return;
      }
      const usedRaw = localStorage.getItem(USED_IDENTITIES_KEY);
      const used: { emails: string[]; phones: string[] } = usedRaw
        ? JSON.parse(usedRaw)
        : { emails: [], phones: [] };
      const normalizedEmail = email.trim().toLowerCase();
      if (used.emails.includes(normalizedEmail)) {
        setLoginError("Gmail này đã đăng nhập trước đó trên thiết bị này.");
        return;
      }
      if (used.phones.includes(phoneDigits)) {
        setLoginError("Số điện thoại này đã đăng nhập trước đó trên thiết bị này.");
        return;
      }
      used.emails.push(normalizedEmail);
      used.phones.push(phoneDigits);
      localStorage.setItem(USED_IDENTITIES_KEY, JSON.stringify(used));
      const nextSession: LoginSession = {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phoneDigits,
        acceptedAt: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      setLoginError("");
    },
    [fullName, email, phone],
  );

  const onPickImages = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    const fileArray = Array.from(fileList).filter(isImageFile);
    const loaded = await Promise.all(fileArray.map(loadImageFromFile));
    if (!loaded.length) return;
    setImages(loaded);
    setSelectedImageIndex(0);
  }, []);

  const onPickLogo = useCallback(async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file || !isImageFile(file)) return;
    const loaded = await loadImageFromFile(file);
    setLogoDataUrl(loaded.dataUrl);
    setLogoNaturalSize({ width: loaded.width, height: loaded.height });
    localStorage.setItem(LOGO_KEY, loaded.dataUrl);
  }, []);

  const saveCurrentAsPreset = useCallback(() => {
    if (!activePreset) return;
    const name = newPresetName.trim();
    if (!name) return;
    const id = `custom-${Date.now()}`;
    const clone: Preset = { ...activePreset, id, name };
    setPresets((prev) => [...prev, clone]);
    setActivePresetId(id);
    setNewPresetName("");
  }, [activePreset, newPresetName]);

  const deletePreset = useCallback(
    (id: string) => {
      if (defaultPresets.some((preset) => preset.id === id)) return;
      setPresets((prev) => prev.filter((preset) => preset.id !== id));
      if (activePresetId === id) setActivePresetId(defaultPresets[0].id);
    },
    [activePresetId],
  );

  const exportPresetJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(presets, null, 2)], { type: "application/json" });
    saveAs(blob, "butpha-watermark-presets.json");
  }, [presets]);

  const importPresetJson = useCallback(async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text) as Preset[];
    if (!Array.isArray(parsed)) return;
    setPresets(parsed);
    setActivePresetId(parsed[0]?.id ?? defaultPresets[0].id);
  }, []);

  const handleCanvasPointerDown = useCallback(
    async (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !selectedImage || !logoDataUrl || !activePreset) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const pointerX = (event.clientX - rect.left) * scaleX;
      const pointerY = (event.clientY - rect.top) * scaleY;
      const logoHeight = (activePreset.logoWidthPercent * selectedImage.width * logoNaturalSize.height) / (100 * logoNaturalSize.width);
      const logoWidth = (selectedImage.width * activePreset.logoWidthPercent) / 100;
      const place = computePlacement(selectedImage.width, selectedImage.height, logoWidth, logoHeight, activePreset);
      const hitResize =
        pointerX >= place.x + place.logoWidth - 20 &&
        pointerX <= place.x + place.logoWidth + 2 &&
        pointerY >= place.y + place.logoHeight - 20 &&
        pointerY <= place.y + place.logoHeight + 2;
      const hitLogo =
        pointerX >= place.x &&
        pointerX <= place.x + place.logoWidth &&
        pointerY >= place.y &&
        pointerY <= place.y + place.logoHeight;
      if (!hitLogo && !hitResize) return;
      const mode = hitResize ? "resize" : "move";
      setDragMode(mode);
      dragStartRef.current = {
        x: pointerX,
        y: pointerY,
        startXP: activePreset.xPercent ?? (place.x / selectedImage.width) * 100,
        startYP: activePreset.yPercent ?? (place.y / selectedImage.height) * 100,
        startWidth: activePreset.logoWidthPercent,
      };
      canvas.setPointerCapture(event.pointerId);
    },
    [selectedImage, logoDataUrl, activePreset, logoNaturalSize],
  );

  const handleCanvasPointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!dragMode || !canvasRef.current || !selectedImage || !activePreset) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const pointerX = (event.clientX - rect.left) * scaleX;
      const pointerY = (event.clientY - rect.top) * scaleY;
      const deltaX = pointerX - dragStartRef.current.x;
      const deltaY = pointerY - dragStartRef.current.y;

      if (dragMode === "move") {
        const nextXPercent = clamp(dragStartRef.current.startXP + (deltaX / selectedImage.width) * 100, 0, 100);
        const nextYPercent = clamp(dragStartRef.current.startYP + (deltaY / selectedImage.height) * 100, 0, 100);
        updateActivePreset({ anchor: "custom", xPercent: nextXPercent, yPercent: nextYPercent });
      } else {
        const maxWidthPercent = 90;
        const nextWidth = clamp(dragStartRef.current.startWidth + (deltaX / selectedImage.width) * 100, 3, maxWidthPercent);
        updateActivePreset({ logoWidthPercent: nextWidth });
      }
    },
    [dragMode, selectedImage, activePreset, updateActivePreset],
  );

  const handleCanvasPointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    canvasRef.current.releasePointerCapture(event.pointerId);
    setDragMode(null);
  }, []);

  const handleExportSingle = useCallback(async () => {
    if (!selectedImage || !logoDataUrl || !activePreset) return;
    const blob = await drawWatermarkBlob(selectedImage, logoDataUrl, activePreset, textWatermark, exportType);
    const ext = extensionForMime(exportType);
    saveAs(blob, `${fileNameWithoutExt(selectedImage.file.name)}-watermark.${ext}`);
  }, [selectedImage, logoDataUrl, activePreset, textWatermark, exportType]);

  const handleExportBatch = useCallback(async () => {
    if (!images.length || !logoDataUrl || !activePreset) return;
    const zip = new JSZip();
    batchControlRef.current = { paused: false, cancelled: false };
    setBatchProgress({ current: 0, total: images.length, running: true });
    for (let i = 0; i < images.length; i += 1) {
      if (batchControlRef.current.cancelled) break;
      // Allow user to pause long batch jobs without blocking UI.
      while (batchControlRef.current.paused && !batchControlRef.current.cancelled) {
        await new Promise((resolve) => setTimeout(resolve, 160));
      }
      if (batchControlRef.current.cancelled) break;
      const image = images[i];
      const imageOrientation = detectOrientation(image.width, image.height);
      const matchedPreset =
        presets.find((preset) => preset.id === activePreset.id && (preset.orientation === "any" || preset.orientation === imageOrientation)) ??
        presets.find((preset) => preset.orientation === imageOrientation) ??
        activePreset;
      const blob = await drawWatermarkBlob(image, logoDataUrl, matchedPreset, textWatermark, exportType);
      const ext = extensionForMime(exportType);
      const relativePath = image.file.webkitRelativePath?.trim();
      const fallbackName = `${fileNameWithoutExt(image.file.name)}-watermark.${ext}`;
      const outputName = relativePath
        ? `${fileNameWithoutExt(relativePath)}-watermark.${ext}`
        : fallbackName;
      zip.file(outputName, blob);
      setBatchProgress({ current: i + 1, total: images.length, running: true });
    }
    if (batchControlRef.current.cancelled) {
      setBatchProgress((prev) => ({ ...prev, running: false }));
      return;
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "butpha-watermark-batch.zip");
    setBatchProgress((prev) => ({ ...prev, running: false }));
  }, [images, logoDataUrl, activePreset, textWatermark, exportType, presets]);

  const runRemoveBackground = useCallback(async () => {
    if (!removeFile) return;
    setRemoveBusy(true);
    setRemoveProgressText("Đang tải model AI...");
    try {
      const source = resizeBeforeRemove ? await resizeImageForRemoval(removeFile, 1920) : removeFile;
      const resultBlob = await removeBackground(source, {
        progress: (phase, current, total) => {
          const done = Math.round((current / total) * 100);
          setRemoveProgressText(`${phase} ${done}%`);
        },
      });
      const url = URL.createObjectURL(resultBlob);
      setRemoveAfterUrl(url);
      setRemoveProgressText("Hoàn tất");
    } catch (error) {
      setRemoveProgressText(error instanceof Error ? error.message : "Lỗi xóa nền");
    } finally {
      setRemoveBusy(false);
    }
  }, [removeFile, resizeBeforeRemove]);

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-3xl border border-violet-100 bg-white p-8 shadow-brand">
          <h1 className="text-3xl font-bold text-indigo-950">Bứt Phá Marketing</h1>
          <p className="mt-2 text-sm text-slate-600">Đăng nhập để dùng công cụ Đóng dấu logo (client-side).</p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Họ và tên</span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Gmail</span>
              <input
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
                placeholder="example@gmail.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Số điện thoại</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500"
                placeholder="09xxxxxxxx"
              />
            </label>
            {loginError ? <p className="text-sm text-rose-600">{loginError}</p> : null}
            <button type="submit" className="w-full rounded-xl bg-violet-600 px-4 py-2.5 font-semibold text-white hover:bg-violet-700">
              Đăng nhập
            </button>
            <p className="text-xs text-slate-500">Mỗi Gmail + số điện thoại chỉ được đăng nhập một lần trên thiết bị hiện tại.</p>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border border-violet-100 bg-white p-6 shadow-brand">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-indigo-950">Bứt Phá Marketing - Đóng dấu logo</h1>
              <p className="mt-1 text-sm text-slate-600">
                Xin chào {session.fullName}. Toàn bộ xử lý ảnh chạy trên trình duyệt, không upload lên server.
              </p>
            </div>
            <div className="inline-flex rounded-xl bg-violet-100 p-1 text-sm font-semibold text-violet-900">
              <button
                type="button"
                onClick={() => setActiveTab("watermark")}
                className={`rounded-lg px-4 py-2 ${activeTab === "watermark" ? "bg-violet-600 text-white" : ""}`}
              >
                Đóng dấu logo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("remove-bg")}
                className={`rounded-lg px-4 py-2 ${activeTab === "remove-bg" ? "bg-violet-600 text-white" : ""}`}
              >
                Xóa nền
              </button>
            </div>
          </div>
        </header>

        {activeTab === "watermark" ? (
          <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
            <aside className="space-y-4 rounded-3xl border border-violet-100 bg-white p-4 shadow-brand">
              <h2 className="text-lg font-bold text-indigo-950">Thiết lập</h2>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Ảnh đầu vào (single/batch/folder)</p>
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(e) => onPickImages(e.target.files)} />
                <input
                  type="file"
                  multiple
                  // @ts-expect-error webkitdirectory only exists on Chromium
                  webkitdirectory=""
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => onPickImages(e.target.files)}
                />
                <p className="text-xs text-slate-500">Hỗ trợ JPG/PNG/WebP, bao gồm chọn cả folder.</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Logo</p>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => onPickLogo(e.target.files)} />
                <p className="text-xs text-slate-500">Logo sẽ lưu localStorage làm mặc định cho lần sau.</p>
              </div>
              <div className="space-y-2 rounded-2xl border border-violet-100 bg-violet-50/40 p-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={textWatermark.enabled}
                    onChange={(e) => setTextWatermark((prev) => ({ ...prev, enabled: e.target.checked }))}
                  />
                  Watermark chữ
                </label>
                <input
                  value={textWatermark.content}
                  onChange={(e) => setTextWatermark((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Nhập watermark text"
                  className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                />
                <label className="block text-xs text-slate-600">Cỡ chữ: {textWatermark.fontSizePercent.toFixed(1)}% theo chiều ngang ảnh</label>
                <input
                  type="range"
                  min={1.2}
                  max={8}
                  step={0.1}
                  value={textWatermark.fontSizePercent}
                  onChange={(e) => setTextWatermark((prev) => ({ ...prev, fontSizePercent: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-600">Màu</label>
                  <input
                    type="color"
                    value={textWatermark.color}
                    onChange={(e) => setTextWatermark((prev) => ({ ...prev, color: e.target.value }))}
                    className="h-8 w-11 rounded border border-slate-200"
                  />
                  <span className="text-xs text-slate-500">{textWatermark.color}</span>
                </div>
                <label className="block text-xs text-slate-600">Opacity chữ: {textWatermark.opacity}%</label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={textWatermark.opacity}
                  onChange={(e) => setTextWatermark((prev) => ({ ...prev, opacity: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2 rounded-2xl border border-violet-100 bg-violet-50/40 p-3">
                <label className="text-sm font-semibold text-slate-700">Preset</label>
                <select
                  value={activePreset?.id}
                  onChange={(e) => setActivePresetId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                >
                  {presets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name} ({preset.orientation})
                    </option>
                  ))}
                </select>

                <label className="block text-xs text-slate-600">Anchor</label>
                <select
                  value={activePreset?.anchor}
                  onChange={(e) => updateActivePreset({ anchor: e.target.value as Anchor })}
                  className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                >
                  <option value="top-left">top-left</option>
                  <option value="top-right">top-right</option>
                  <option value="bottom-left">bottom-left</option>
                  <option value="bottom-right">bottom-right</option>
                  <option value="center">center</option>
                  <option value="custom">custom</option>
                </select>

                <label className="block text-xs text-slate-600">Orientation</label>
                <select
                  value={activePreset?.orientation}
                  onChange={(e) => updateActivePreset({ orientation: e.target.value as Orientation })}
                  className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                >
                  <option value="any">any</option>
                  <option value="landscape">landscape</option>
                  <option value="portrait">portrait</option>
                </select>

                <label className="block text-xs text-slate-600">logoWidthPercent: {activePreset?.logoWidthPercent.toFixed(1)}%</label>
                <input
                  type="range"
                  min={3}
                  max={90}
                  step={0.2}
                  value={activePreset?.logoWidthPercent}
                  onChange={(e) => updateActivePreset({ logoWidthPercent: Number(e.target.value) })}
                  className="w-full"
                />

                <label className="block text-xs text-slate-600">marginXPercent: {activePreset?.marginXPercent.toFixed(1)}%</label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={0.2}
                  value={activePreset?.marginXPercent}
                  onChange={(e) => updateActivePreset({ marginXPercent: Number(e.target.value) })}
                  className="w-full"
                />

                <label className="block text-xs text-slate-600">marginYPercent: {activePreset?.marginYPercent.toFixed(1)}%</label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={0.2}
                  value={activePreset?.marginYPercent}
                  onChange={(e) => updateActivePreset({ marginYPercent: Number(e.target.value) })}
                  className="w-full"
                />

                <label className="block text-xs text-slate-600">opacity: {activePreset?.opacity.toFixed(0)}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={activePreset?.opacity}
                  onChange={(e) => updateActivePreset({ opacity: Number(e.target.value) })}
                  className="w-full"
                />

                <label className="block text-xs text-slate-600">rotation: {activePreset?.rotation.toFixed(0)}°</label>
                <input
                  type="range"
                  min={-45}
                  max={45}
                  step={1}
                  value={activePreset?.rotation}
                  onChange={(e) => updateActivePreset({ rotation: Number(e.target.value) })}
                  className="w-full"
                />

                {activePreset?.anchor === "custom" ? (
                  <>
                    <label className="block text-xs text-slate-600">xPercent: {(activePreset?.xPercent ?? 0).toFixed(1)}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.2}
                      value={activePreset?.xPercent ?? 0}
                      onChange={(e) => updateActivePreset({ xPercent: Number(e.target.value) })}
                      className="w-full"
                    />
                    <label className="block text-xs text-slate-600">yPercent: {(activePreset?.yPercent ?? 0).toFixed(1)}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.2}
                      value={activePreset?.yPercent ?? 0}
                      onChange={(e) => updateActivePreset({ yPercent: Number(e.target.value) })}
                      className="w-full"
                    />
                  </>
                ) : null}

                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                    placeholder="Tên preset custom"
                  />
                  <button type="button" className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white" onClick={saveCurrentAsPreset}>
                    Lưu preset
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white"
                    onClick={() => deletePreset(activePreset?.id ?? "")}
                  >
                    Xóa preset
                  </button>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm" onClick={exportPresetJson}>
                    Export JSON
                  </button>
                  <label className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">
                    Import JSON
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => importPresetJson(e.target.files)} />
                  </label>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-slate-200 p-3">
                <p className="text-sm font-semibold text-slate-700">Export</p>
                <select value={exportType} onChange={(e) => setExportType(e.target.value as "image/png" | "image/jpeg")} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm">
                  <option value="image/png">PNG chất lượng cao</option>
                  <option value="image/jpeg">JPG chất lượng cao</option>
                </select>
                <button
                  type="button"
                  onClick={handleExportSingle}
                  disabled={!selectedImage || !logoDataUrl}
                  className="w-full rounded-lg bg-indigo-900 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Tải ảnh hiện tại
                </button>
                <button
                  type="button"
                  onClick={handleExportBatch}
                  disabled={!images.length || !logoDataUrl || batchProgress.running}
                  className="w-full rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Xuất batch ZIP
                </button>
                {batchProgress.total > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">
                      Tiến trình batch: {batchProgress.current}/{batchProgress.total}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          batchControlRef.current.paused = !batchControlRef.current.paused;
                          setBatchProgress((prev) => ({ ...prev }));
                        }}
                        disabled={!batchProgress.running}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                      >
                        {batchControlRef.current.paused ? "Tiếp tục" : "Tạm dừng"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          batchControlRef.current.cancelled = true;
                        }}
                        disabled={!batchProgress.running}
                        className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 disabled:opacity-50"
                      >
                        Hủy batch
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>

            <section className="rounded-3xl border border-violet-100 bg-white p-4 shadow-brand">
              <h2 className="mb-3 text-lg font-bold text-indigo-950">Preview canvas</h2>
              {selectedImage ? (
                <>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {images.map((img, index) => (
                      <button
                        key={`${img.file.name}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`rounded-lg border px-3 py-1.5 text-xs ${
                          selectedImageIndex === index ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200"
                        }`}
                      >
                        {img.file.name}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-auto rounded-2xl border border-dashed border-violet-200 bg-slate-50 p-2">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full cursor-move rounded-xl"
                      onPointerDown={handleCanvasPointerDown}
                      onPointerMove={handleCanvasPointerMove}
                      onPointerUp={handleCanvasPointerUp}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Kéo logo để đổi vị trí; kéo ô vuông góc phải dưới để resize trực tiếp trên canvas.</p>
                  {previewOutputUrl ? (
                    <div className="mt-4 rounded-2xl border border-slate-200 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">So sánh trước/sau</p>
                        <span className="text-xs text-slate-500">{compareSplit}%</span>
                      </div>
                      <div className="relative overflow-hidden rounded-xl bg-slate-100">
                        <img src={selectedImage.dataUrl} alt="Ảnh gốc" className="block w-full" />
                        <img
                          src={previewOutputUrl}
                          alt="Ảnh sau khi đóng dấu"
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{ clipPath: `inset(0 ${100 - compareSplit}% 0 0)` }}
                        />
                        <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-[11px] text-white">Kéo thanh để so sánh</div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={compareSplit}
                        onChange={(e) => setCompareSplit(Number(e.target.value))}
                        className="mt-2 w-full"
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-16 text-center text-slate-500">
                  Chưa có ảnh đầu vào. Hãy upload ảnh ở panel bên trái.
                </p>
              )}
            </section>
          </section>
        ) : (
          <section className="rounded-3xl border border-violet-100 bg-white p-5 shadow-brand">
            <h2 className="text-xl font-bold text-indigo-950">Xóa nền bằng AI (trên trình duyệt)</h2>
            <p className="mt-1 text-sm text-slate-600">
              Hỗ trợ xóa nền logo hoặc ảnh khách. Sau lần tải model đầu tiên, trình duyệt có thể dùng lại cache để chạy offline.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-violet-100 p-4">
                <label className="text-sm font-semibold text-slate-700">Loại ảnh</label>
                <div className="flex gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => setRemoveTarget("logo")}
                    className={`rounded-lg px-3 py-1.5 ${removeTarget === "logo" ? "bg-violet-600 text-white" : "bg-slate-100"}`}
                  >
                    Logo
                  </button>
                  <button
                    type="button"
                    onClick={() => setRemoveTarget("image")}
                    className={`rounded-lg px-3 py-1.5 ${removeTarget === "image" ? "bg-violet-600 text-white" : "bg-slate-100"}`}
                  >
                    Ảnh khách
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setRemoveFile(file);
                    setRemoveAfterUrl("");
                    if (file) setRemoveBeforeUrl(URL.createObjectURL(file));
                  }}
                />
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={resizeBeforeRemove} onChange={(e) => setResizeBeforeRemove(e.target.checked)} />
                  Resize trước khi xóa nền (max cạnh 1920)
                </label>
                <button
                  type="button"
                  onClick={runRemoveBackground}
                  disabled={!removeFile || removeBusy}
                  className="w-full rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
                >
                  {removeBusy ? "Đang xử lý..." : `Xóa nền ${removeTarget === "logo" ? "logo" : "ảnh"}`}
                </button>
                {removeProgressText ? <p className="text-xs text-slate-500">{removeProgressText}</p> : null}
                {removeAfterUrl ? (
                  <a href={removeAfterUrl} download={`butpha-remove-bg-${Date.now()}.png`} className="inline-block rounded-lg border border-violet-300 px-3 py-2 text-sm font-semibold text-violet-700">
                    Tải PNG trong suốt
                  </a>
                ) : null}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-2">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Trước</p>
                  {removeBeforeUrl ? <img src={removeBeforeUrl} alt="Trước xóa nền" className="h-60 w-full rounded-lg object-contain bg-slate-50" /> : <div className="h-60 rounded-lg bg-slate-50" />}
                </div>
                <div className="rounded-2xl border border-slate-200 p-2">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Sau</p>
                  {removeAfterUrl ? <img src={removeAfterUrl} alt="Sau xóa nền" className="h-60 w-full rounded-lg object-contain bg-[url('/1.png')] bg-cover" /> : <div className="h-60 rounded-lg bg-slate-50" />}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
