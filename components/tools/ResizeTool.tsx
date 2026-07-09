"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";
import { Download, ImageIcon } from "lucide-react";
import { useToolToast } from "@/components/tools/ToolToast";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";
import {
  BatchProgressBar,
  BtnPrimary,
  BtnSecondary,
  ImageThumbStrip,
  PreviewFrame,
  ToolPageHeader,
  ToolPanel,
  ToolShell,
  UploadActionRow,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";
import { useImageBatchWorker } from "@/hooks/useImageBatchWorker";
import { RESIZE_PRESETS, formatBytes, outputNameForImage, resizeImageBlob, type ResizePreset } from "@/lib/image-processing-core";
import { isImageFile, loadImageFromFile, type LoadedImageMeta } from "@/lib/watermark-core";

type LoadedImage = LoadedImageMeta & { file: File };

function ResizeToolContent() {
  const session = useWatermarkSession();
  const { toast } = useToolToast();
  const [images, setImages] = useState<LoadedImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [presetId, setPresetId] = useState(RESIZE_PRESETS[0].id);
  const [previewUrl, setPreviewUrl] = useState("");
  const { progress, isPaused, runBatch, pause, resume, cancel } = useImageBatchWorker("butpha-resize-batch.zip");

  const preset = useMemo(() => RESIZE_PRESETS.find((p) => p.id === presetId) ?? RESIZE_PRESETS[0], [presetId]);
  const selected = images[selectedIndex] ?? null;
  const imagesMeta = useMemo(() => {
    const total = images.reduce((s, i) => s + i.file.size, 0);
    return images.length ? `${images.length} ảnh · ${formatBytes(total)}` : undefined;
  }, [images]);

  useEffect(() => {
    if (!selected || !preset) {
      setPreviewUrl("");
      return;
    }
    let cancelled = false;
    resizeImageBlob(selected, preset)
      .then((blob) => {
        if (!cancelled) setPreviewUrl(URL.createObjectURL(blob));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [selected, preset]);

  const onPickImages = useCallback(
    async (files: FileList | null) => {
      if (!files) return;
      const loaded = await Promise.all(Array.from(files).filter(isImageFile).map(loadImageFromFile));
      if (!loaded.length) return;
      setImages(loaded);
      setSelectedIndex(0);
      toast(`Đã tải ${loaded.length} ảnh`);
    },
    [toast],
  );

  const removeAt = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex((prev) => Math.max(0, prev >= index ? prev - 1 : prev));
  }, []);

  const exportOne = useCallback(async () => {
    if (!selected) return;
    const blob = await resizeImageBlob(selected, preset);
    saveAs(blob, outputNameForImage(selected, `-${preset.id}`, "jpg"));
    toast("Đã tải ảnh resize");
  }, [selected, preset, toast]);

  const exportZip = useCallback(async () => {
    if (!images.length) return;
    try {
      await runBatch({ job: "resize", images, preset, background: "#ffffff" });
      toast("Đã xuất ZIP resize");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Lỗi ZIP", "error");
    }
  }, [images, preset, runBatch, toast]);

  if (!session) return null;

  return (
    <ToolShell userName={session.fullName}>
      <div className="space-y-5">
        <ToolPageHeader userName={session.fullName} title="Resize hàng loạt" subtitle="Đổi kích thước theo chuẩn Shopee, Facebook, Story — xuất ZIP trên trình duyệt." icon={<ImageIcon size={26} />} />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <ToolPanel>
              <WatermarkDropZone label="Ảnh cần resize" hint="JPG, PNG, WebP — nhiều ảnh hoặc thư mục" accept="image/png,image/jpeg,image/webp" multiple onFiles={onPickImages} previewUrl={selected?.dataUrl} fileName={selected?.fileName} fileMeta={imagesMeta} />
              <div className="mt-3">
                <UploadActionRow onPickImages={onPickImages} onPickFolder={onPickImages} />
              </div>
            </ToolPanel>

            <ToolPanel>
              <p className="mb-3 text-sm font-bold text-indigo-950 dark:text-white">Kích thước đích</p>
              <div className="grid grid-cols-2 gap-2">
                {RESIZE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPresetId(p.id)}
                    className={`rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
                      presetId === p.id ? "bg-gradient-to-r from-indigo-900 to-violet-600 text-white shadow-brand-accent" : "border border-violet-100 bg-violet-50/60 text-violet-900 dark:border-slate-600 dark:bg-slate-800"
                    }`}
                  >
                    <span className="block font-bold">{p.name}</span>
                    <span className={`mt-0.5 block text-[10px] ${presetId === p.id ? "text-violet-100" : "text-slate-500"}`}>
                      {p.id === "max-1920" ? "Cạnh dài ≤ 1920px" : `${p.width}×${p.height}px · ${p.mode}`}
                    </span>
                  </button>
                ))}
              </div>
            </ToolPanel>

            <ToolPanel className="space-y-2">
              <BtnPrimary onClick={exportOne} disabled={!selected || progress.running} icon={<Download size={16} />}>
                Tải ảnh hiện tại
              </BtnPrimary>
              <BtnSecondary onClick={exportZip} disabled={!images.length || progress.running} icon={<Download size={16} />}>
                Xuất ZIP ({images.length})
              </BtnSecondary>
              <BatchProgressBar current={progress.current} total={progress.total} running={progress.running} isPaused={isPaused} onPause={pause} onResume={resume} onCancel={cancel} />
            </ToolPanel>
          </div>

          <ToolPanel className="lg:p-6">
            {images.length > 1 ? <ImageThumbStrip images={images} selectedIndex={selectedIndex} onSelect={setSelectedIndex} onRemove={removeAt} /> : null}
            <p className="mb-3 text-sm font-bold text-indigo-950 dark:text-white">Xem trước</p>
            {selected && previewUrl ? (
              <div className="space-y-3">
                <PreviewFrame>
                  <img src={previewUrl} alt="Preview" className="max-h-[420px] max-w-full rounded-xl shadow-lg" />
                </PreviewFrame>
                <p className="text-center text-xs text-slate-500">
                  {selected.width}×{selected.height} → {preset.name}
                </p>
              </div>
            ) : (
              <PreviewFrame empty={<p className="text-sm text-slate-500">Tải ảnh để xem trước kích thước mới</p>} />
            )}
          </ToolPanel>
        </div>
      </div>
    </ToolShell>
  );
}

export function ResizeTool() {
  return (
    <WatermarkLoginGate>
      <ResizeToolContent />
    </WatermarkLoginGate>
  );
}
