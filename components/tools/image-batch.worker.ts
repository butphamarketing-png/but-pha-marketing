/// <reference lib="webworker" />

import JSZip from "jszip";
import {
  compressBitmapToBlob,
  extForFormat,
  outputNameForImage,
  resizeBitmapToBlob,
  type CompressFormat,
  type ResizePreset,
} from "../../lib/image-processing-core";
import { dataUrlToImageBitmap, type LoadedImageMeta } from "../../lib/watermark-core";

type ResizePayload = {
  job: "resize";
  images: LoadedImageMeta[];
  preset: ResizePreset;
  background: string;
};

type CompressPayload = {
  job: "compress";
  images: LoadedImageMeta[];
  format: CompressFormat;
  quality: number;
};

type BatchPayload = ResizePayload | CompressPayload;

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
    const { images } = payload;

    for (let i = 0; i < images.length; i += 1) {
      while (paused && !cancelled) await sleep(120);
      if (cancelled) {
        self.postMessage({ type: "cancelled" });
        return;
      }

      const image = images[i];
      const bitmap = await dataUrlToImageBitmap(image.dataUrl);

      if (payload.job === "resize") {
        const blob = await resizeBitmapToBlob(bitmap, payload.preset, payload.background);
        zip.file(outputNameForImage(image, `-${payload.preset.id}`, "jpg"), blob);
      } else {
        const blob = await compressBitmapToBlob(bitmap, payload.format, payload.quality);
        zip.file(outputNameForImage(image, "-nen", extForFormat(payload.format)), blob);
      }

      bitmap.close();
      self.postMessage({ type: "progress", current: i + 1, total: images.length });
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const buffer = await zipBlob.arrayBuffer();
    self.postMessage({ type: "done", buffer }, [buffer]);
  } catch (error) {
    self.postMessage({ type: "error", message: error instanceof Error ? error.message : "Lỗi xử lý batch" });
  }
};

export {};
