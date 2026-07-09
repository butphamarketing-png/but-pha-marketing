/// <reference lib="webworker" />

import JSZip from "jszip";
import {
  dataUrlToImageBitmap,
  extensionForMime,
  fileNameWithoutExt,
  matchPresetForImage,
  renderWatermarkOnContext,
  type LoadedImageMeta,
  type Preset,
  type TextWatermarkSettings,
} from "../../lib/watermark-core";

type BatchPayload = {
  images: LoadedImageMeta[];
  logoDataUrl: string | null;
  presets: Preset[];
  activePreset: Preset;
  textSettings: TextWatermarkSettings;
  exportType: "image/png" | "image/jpeg";
  quality: number;
};

let paused = false;
let cancelled = false;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

self.onmessage = async (event: MessageEvent<{ type: string; payload?: BatchPayload }>) => {
  const { type, payload } = event.data;

  if (type === "pause") {
    paused = true;
    return;
  }
  if (type === "resume") {
    paused = false;
    return;
  }
  if (type === "cancel") {
    cancelled = true;
    return;
  }

  if (type !== "start" || !payload) return;

  paused = false;
  cancelled = false;

  try {
    const zip = new JSZip();
    const { images, logoDataUrl, presets, activePreset, textSettings, exportType, quality } = payload;

    for (let i = 0; i < images.length; i += 1) {
      while (paused && !cancelled) {
        await sleep(120);
      }
      if (cancelled) {
        self.postMessage({ type: "cancelled" });
        return;
      }

      const image = images[i];
      const preset = matchPresetForImage(presets, activePreset, image.width, image.height);
      const baseBitmap = await dataUrlToImageBitmap(image.dataUrl);
      const canvas = new OffscreenCanvas(baseBitmap.width, baseBitmap.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        baseBitmap.close();
        continue;
      }

      await renderWatermarkOnContext(ctx, baseBitmap.width, baseBitmap.height, baseBitmap, logoDataUrl, preset, textSettings);
      baseBitmap.close();

      const blob = await canvas.convertToBlob({ type: exportType, quality });
      const ext = extensionForMime(exportType);
      const outputName = image.relativePath
        ? `${fileNameWithoutExt(image.relativePath)}-watermark.${ext}`
        : `${fileNameWithoutExt(image.fileName)}-watermark.${ext}`;
      zip.file(outputName, blob);

      self.postMessage({ type: "progress", current: i + 1, total: images.length });
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const buffer = await zipBlob.arrayBuffer();
    self.postMessage({ type: "done", buffer }, [buffer]);
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "Lỗi xử lý batch",
    });
  }
};

export {};
