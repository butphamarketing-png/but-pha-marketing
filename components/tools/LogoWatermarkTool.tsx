"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { removeBackground } from "@imgly/background-removal";
import { Download, ImagePlus, Layers, Wand2 } from "lucide-react";
import {
  BtnPrimary,
  BtnSecondary,
  CompareSlider,
  ImageThumbStrip,
  LoginCard,
  PresetGrid,
  PreviewFrame,
  RangeField,
  StepProgress,
  ToolHero,
  ToolPanel,
  ToolSection,
  ToolShell,
  UploadActionRow,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";

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
  logoDataUrl: string | null,
  preset: Preset,
  textSettings: TextWatermarkSettings,
  exportType: "image/png" | "image/jpeg",
  quality = 0.95,
): Promise<Blob> {
  const baseImg = await imageFromDataUrl(image.dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = baseImg.width;
  canvas.height = baseImg.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Trình duyệt không hỗ trợ Canvas");
  ctx.drawImage(baseImg, 0, 0);

  if (logoDataUrl) {
    const logoImg = await imageFromDataUrl(logoDataUrl);
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
  }

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
  if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
}

function canExportWatermark(logoDataUrl: string, textSettings: TextWatermarkSettings): boolean {
  return Boolean(logoDataUrl) || (textSettings.enabled && textSettings.content.trim().length > 0);
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
    if (!canvasRef.current || !selectedImage || !activePreset) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const base = await imageFromDataUrl(selectedImage.dataUrl);
    canvas.width = base.width;
    canvas.height = base.height;
    const maxPreviewWidth = 880;
    const ratio = base.width > maxPreviewWidth ? maxPreviewWidth / base.width : 1;
    canvas.style.width = `${Math.round(base.width * ratio)}px`;
    canvas.style.height = `${Math.round(base.height * ratio)}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(base, 0, 0);

    if (logoDataUrl) {
      const logo = await imageFromDataUrl(logoDataUrl);
      const logoWidth = (base.width * activePreset.logoWidthPercent) / 100;
      const logoHeight = logoWidth * (logo.height / logo.width);
      const placement = computePlacement(base.width, base.height, logoWidth, logoHeight, activePreset);
      ctx.save();
      ctx.globalAlpha = clamp(activePreset.opacity, 0, 100) / 100;
      ctx.translate(placement.x + placement.logoWidth / 2, placement.y + placement.logoHeight / 2);
      ctx.rotate((activePreset.rotation * Math.PI) / 180);
      ctx.drawImage(logo, -placement.logoWidth / 2, -placement.logoHeight / 2, placement.logoWidth, placement.logoHeight);
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = "rgba(124,58,237,0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(placement.x, placement.y, placement.logoWidth, placement.logoHeight);
      ctx.fillStyle = "rgba(124,58,237,1)";
      ctx.fillRect(placement.x + placement.logoWidth - 12, placement.y + placement.logoHeight - 12, 12, 12);
      ctx.restore();
    }

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
  }, [selectedImage, logoDataUrl, activePreset, textWatermark]);

  useEffect(() => {
    drawPreview().catch(() => undefined);
  }, [drawPreview]);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewOutputUrl("");
    }
  }, [selectedImage]);

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
    if (!selectedImage || !activePreset || !canExportWatermark(logoDataUrl, textWatermark)) return;
    const blob = await drawWatermarkBlob(selectedImage, logoDataUrl || null, activePreset, textWatermark, exportType);
    const ext = extensionForMime(exportType);
    saveAs(blob, `${fileNameWithoutExt(selectedImage.file.name)}-watermark.${ext}`);
  }, [selectedImage, logoDataUrl, activePreset, textWatermark, exportType]);

  const handleExportBatch = useCallback(async () => {
    if (!images.length || !activePreset || !canExportWatermark(logoDataUrl, textWatermark)) return;
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
      const blob = await drawWatermarkBlob(image, logoDataUrl || null, matchedPreset, textWatermark, exportType);
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

  const applyPresetById = useCallback((id: string) => {
    setActivePresetId(id);
  }, []);

  const exportReady = canExportWatermark(logoDataUrl, textWatermark);

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
      <LoginCard>
        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Họ và tên</span>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Gmail</span>
            <input
              value={email}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="example@gmail.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Số điện thoại</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="09xxxxxxxx"
            />
          </label>
          {loginError ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{loginError}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-900 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-brand-accent transition hover:opacity-95"
          >
            Đăng nhập
          </button>
          <p className="text-center text-xs leading-relaxed text-slate-500">
            Mỗi Gmail + số điện thoại chỉ được đăng nhập một lần trên thiết bị hiện tại.
          </p>
        </form>
      </LoginCard>
    );
  }

  return (
    <ToolShell>
      <div className="space-y-5">
        <ToolHero userName={session.fullName} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "watermark" ? (
          <section className="grid gap-5 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
            <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
              <StepProgress
                steps={[
                  { label: "Tải ảnh", done: images.length > 0 },
                  { label: "Thêm logo", done: Boolean(logoDataUrl) },
                  { label: "Xuất file", done: exportReady },
                ]}
              />

              <ToolPanel>
                <WatermarkDropZone
                  step={1}
                  label="Ảnh cần đóng dấu"
                  hint="JPG, PNG, WebP — 1 ảnh hoặc nhiều ảnh"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onFiles={onPickImages}
                  previewUrl={selectedImage?.dataUrl}
                  fileName={selectedImage ? `${selectedImage.file.name}${images.length > 1 ? ` (+${images.length - 1})` : ""}` : undefined}
                />
                <div className="mt-3">
                  <UploadActionRow onPickImages={onPickImages} onPickFolder={onPickImages} />
                </div>
              </ToolPanel>

              <ToolPanel>
                <WatermarkDropZone
                  step={2}
                  label="Logo watermark"
                  hint="PNG trong suốt khuyến nghị · tự lưu cho lần sau"
                  accept="image/png,image/jpeg,image/webp"
                  onFiles={onPickLogo}
                  previewUrl={logoDataUrl || undefined}
                  fileName={logoDataUrl ? "Logo đã tải" : undefined}
                />
              </ToolPanel>

              <ToolSection title="Vị trí logo nhanh" icon={<Layers size={16} className="text-violet-600" />}>
                <PresetGrid presets={defaultPresets} activeId={activePresetId} onSelect={applyPresetById} />
                <select
                  value={activePreset?.id}
                  onChange={(e) => setActivePresetId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                  {presets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </ToolSection>

              <ToolSection title="Tuỳ chỉnh chi tiết" defaultOpen={false}>
                <RangeField label="Kích thước logo" value={activePreset?.logoWidthPercent ?? 16} min={3} max={90} step={0.2} suffix="%" onChange={(v) => updateActivePreset({ logoWidthPercent: v })} />
                <RangeField label="Lề ngang" value={activePreset?.marginXPercent ?? 3} min={0} max={25} step={0.2} suffix="%" onChange={(v) => updateActivePreset({ marginXPercent: v })} />
                <RangeField label="Lề dọc" value={activePreset?.marginYPercent ?? 3} min={0} max={25} step={0.2} suffix="%" onChange={(v) => updateActivePreset({ marginYPercent: v })} />
                <RangeField label="Độ mờ logo" value={activePreset?.opacity ?? 85} min={0} max={100} step={1} suffix="%" onChange={(v) => updateActivePreset({ opacity: v })} />
                <RangeField label="Xoay logo" value={activePreset?.rotation ?? 0} min={-45} max={45} step={1} suffix="°" onChange={(v) => updateActivePreset({ rotation: v })} />
                <div className="flex flex-wrap gap-2 pt-1">
                  <input value={newPresetName} onChange={(e) => setNewPresetName(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Tên preset" />
                  <button type="button" className="rounded-xl bg-violet-600 px-3 py-2 text-xs font-bold text-white" onClick={saveCurrentAsPreset}>Lưu</button>
                  <button type="button" className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600" onClick={() => deletePreset(activePreset?.id ?? "")}>Xóa</button>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50" onClick={exportPresetJson}>Export</button>
                  <label className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                    Import
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => importPresetJson(e.target.files)} />
                  </label>
                </div>
              </ToolSection>

              <ToolSection title="Watermark chữ" defaultOpen={false}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/50 px-3 py-2.5">
                  <input type="checkbox" checked={textWatermark.enabled} onChange={(e) => setTextWatermark((prev) => ({ ...prev, enabled: e.target.checked }))} className="h-4 w-4 accent-violet-600" />
                  <span className="text-sm font-medium text-slate-700">Bật watermark chữ</span>
                </label>
                <input value={textWatermark.content} onChange={(e) => setTextWatermark((prev) => ({ ...prev, content: e.target.value }))} placeholder="Nội dung chữ" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
                <RangeField label="Cỡ chữ" value={textWatermark.fontSizePercent} min={1.2} max={8} step={0.1} suffix="%" onChange={(v) => setTextWatermark((prev) => ({ ...prev, fontSizePercent: v }))} />
              </ToolSection>

              <ToolPanel>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-950">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600 text-[11px] font-bold text-white">3</span>
                  Xuất ảnh
                </p>
                <select value={exportType} onChange={(e) => setExportType(e.target.value as "image/png" | "image/jpeg")} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
                  <option value="image/png">PNG chất lượng cao</option>
                  <option value="image/jpeg">JPG chất lượng cao</option>
                </select>
                {!exportReady ? (
                  <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">Tải logo hoặc bật watermark chữ để xuất.</p>
                ) : null}
                <div className="mt-3 space-y-2">
                  <BtnPrimary onClick={handleExportSingle} disabled={!selectedImage || !exportReady} icon={<Download size={16} />}>
                    Tải ảnh hiện tại
                  </BtnPrimary>
                  <BtnSecondary onClick={handleExportBatch} disabled={!images.length || !exportReady || batchProgress.running} icon={<Download size={16} />}>
                    Xuất ZIP ({images.length || 0} ảnh)
                  </BtnSecondary>
                </div>
                {batchProgress.total > 0 ? (
                  <div className="mt-4 space-y-2">
                    <div className="h-2 overflow-hidden rounded-full bg-violet-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-700 transition-all" style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }} />
                    </div>
                    <p className="text-center text-xs font-medium text-slate-600">{batchProgress.current} / {batchProgress.total} ảnh</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { batchControlRef.current.paused = !batchControlRef.current.paused; setBatchProgress((prev) => ({ ...prev })); }} disabled={!batchProgress.running} className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold disabled:opacity-40">
                        {batchControlRef.current.paused ? "Tiếp tục" : "Tạm dừng"}
                      </button>
                      <button type="button" onClick={() => { batchControlRef.current.cancelled = true; }} disabled={!batchProgress.running} className="flex-1 rounded-xl border border-rose-200 py-2 text-xs font-semibold text-rose-600 disabled:opacity-40">
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : null}
              </ToolPanel>
            </aside>

            <ToolPanel className="lg:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-indigo-950">Xem trước</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {selectedImage ? `${selectedImage.width} × ${selectedImage.height}px` : "Chưa có ảnh"}
                    {logoDataUrl ? " · Kéo logo để chỉnh vị trí" : ""}
                  </p>
                </div>
                {images.length > 1 ? (
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-800 px-3 py-1 text-xs font-bold text-white">
                    {images.length} ảnh
                  </span>
                ) : null}
              </div>

              {selectedImage ? (
                <div className="space-y-4">
                  {images.length > 1 ? (
                    <ImageThumbStrip images={images} selectedIndex={selectedImageIndex} onSelect={setSelectedImageIndex} />
                  ) : null}

                  <PreviewFrame>
                    <canvas
                      ref={canvasRef}
                      className={`max-w-full rounded-xl shadow-lg ring-1 ring-black/5 ${logoDataUrl ? "cursor-move" : "cursor-default"}`}
                      onPointerDown={handleCanvasPointerDown}
                      onPointerMove={handleCanvasPointerMove}
                      onPointerUp={handleCanvasPointerUp}
                    />
                  </PreviewFrame>

                  {!logoDataUrl ? (
                    <p className="rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-2.5 text-xs leading-relaxed text-amber-900">
                      Ảnh đã hiển thị. Tải logo để đóng dấu hình ảnh, hoặc bật watermark chữ để xuất ngay.
                    </p>
                  ) : (
                    <p className="text-center text-xs text-slate-500">Kéo logo để đổi vị trí · kéo góc phải dưới để resize</p>
                  )}

                  {previewOutputUrl ? (
                    <CompareSlider beforeUrl={selectedImage.dataUrl} afterUrl={previewOutputUrl} split={compareSplit} onSplitChange={setCompareSplit} />
                  ) : null}
                </div>
              ) : (
                <PreviewFrame
                  empty={
                    <div className="px-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700">
                        <ImagePlus size={28} />
                      </div>
                      <p className="text-sm font-bold text-indigo-950">Chưa có ảnh</p>
                      <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">Kéo thả ảnh vào khung bên trái để bắt đầu chỉnh sửa.</p>
                    </div>
                  }
                />
              )}
            </ToolPanel>
          </section>
        ) : (
          <ToolPanel className="lg:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-indigo-950">Xóa nền bằng AI</h2>
              <p className="mt-1 text-sm text-slate-600">
                Chạy 100% trên trình duyệt. Sau lần tải model đầu, có thể dùng offline.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-flex rounded-xl border border-violet-100 bg-violet-50/60 p-1">
                  <button
                    type="button"
                    onClick={() => setRemoveTarget("logo")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${removeTarget === "logo" ? "bg-white text-violet-700 shadow-sm" : "text-slate-600"}`}
                  >
                    Logo
                  </button>
                  <button
                    type="button"
                    onClick={() => setRemoveTarget("image")}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${removeTarget === "image" ? "bg-white text-violet-700 shadow-sm" : "text-slate-600"}`}
                  >
                    Ảnh khách
                  </button>
                </div>
                <WatermarkDropZone
                  label={`Tải ${removeTarget === "logo" ? "logo" : "ảnh"} cần xóa nền`}
                  hint="JPG, PNG, WebP"
                  accept="image/png,image/jpeg,image/webp"
                  onFiles={(files) => {
                    const file = files?.[0] ?? null;
                    setRemoveFile(file);
                    setRemoveAfterUrl("");
                    if (file) setRemoveBeforeUrl(URL.createObjectURL(file));
                  }}
                  previewUrl={removeBeforeUrl || undefined}
                  fileName={removeFile?.name}
                />
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2.5 text-sm text-slate-700">
                  <input type="checkbox" checked={resizeBeforeRemove} onChange={(e) => setResizeBeforeRemove(e.target.checked)} className="h-4 w-4 accent-violet-600" />
                  Resize trước khi xóa (max 1920px)
                </label>
                <BtnPrimary onClick={runRemoveBackground} disabled={!removeFile || removeBusy} icon={<Wand2 size={16} />}>
                  {removeBusy ? "Đang xử lý..." : "Xóa nền ngay"}
                </BtnPrimary>
                {removeProgressText ? (
                  <p className="rounded-xl bg-violet-50 px-3 py-2 text-center text-xs font-medium text-violet-800">{removeProgressText}</p>
                ) : null}
                {removeAfterUrl ? (
                  <a
                    href={removeAfterUrl}
                    download={`butpha-remove-bg-${Date.now()}.png`}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-violet-200 bg-white py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                  >
                    <Download size={16} />
                    Tải PNG trong suốt
                  </a>
                ) : null}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white">
                  <p className="border-b border-violet-50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Trước</p>
                  <div className="p-2">
                    {removeBeforeUrl ? (
                      <img src={removeBeforeUrl} alt="Trước" className="h-56 w-full rounded-xl object-contain bg-slate-50" />
                    ) : (
                      <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-400">Chưa có ảnh</div>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white">
                  <p className="border-b border-violet-50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Sau</p>
                  <div className="p-2">
                    {removeAfterUrl ? (
                      <img src={removeAfterUrl} alt="Sau" className="h-56 w-full rounded-xl object-contain bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%)] bg-[length:12px_12px]" />
                    ) : (
                      <div className="flex h-56 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%)] bg-[length:12px_12px] text-xs text-slate-400">Kết quả hiện ở đây</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ToolPanel>
        )}
      </div>
    </ToolShell>
  );
}
