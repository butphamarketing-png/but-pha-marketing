"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";
import { Download, Zap } from "lucide-react";
import { useToolToast } from "@/components/tools/ToolToast";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";
import {
  BatchProgressBar,
  BtnPrimary,
  BtnSecondary,
  CompareSlider,
  ImageThumbStrip,
  PreviewFrame,
  RangeField,
  ToolPageHeader,
  ToolPanel,
  ToolShell,
  UploadActionRow,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";
import { useImageBatchWorker } from "@/hooks/useImageBatchWorker";
import { compressImageBlob, extForFormat, formatBytes, outputNameForImage, type CompressFormat } from "@/lib/image-processing-core";
import { isImageFile, loadImageFromFile, type LoadedImageMeta } from "@/lib/watermark-core";

type LoadedImage = LoadedImageMeta & { file: File };

function CompressToolContent() {
  const session = useWatermarkSession();
  const { toast } = useToolToast();
  const [images, setImages] = useState<LoadedImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [format, setFormat] = useState<CompressFormat>("image/webp");
  const [quality, setQuality] = useState(0.82);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [compareSplit, setCompareSplit] = useState(50);
  const { progress, isPaused, runBatch, pause, resume, cancel } = useImageBatchWorker("butpha-compress-batch.zip");

  const selected = images[selectedIndex] ?? null;
  const imagesMeta = useMemo(() => {
    const total = images.reduce((s, i) => s + i.file.size, 0);
    return images.length ? `${images.length} ảnh · ${formatBytes(total)}` : undefined;
  }, [images]);

  const savings = useMemo(() => {
    if (!selected || !compressedSize) return null;
    const pct = Math.round((1 - compressedSize / selected.file.size) * 100);
    return { pct, saved: formatBytes(selected.file.size - compressedSize) };
  }, [selected, compressedSize]);

  useEffect(() => {
    if (!selected) {
      setCompressedUrl("");
      setCompressedSize(0);
      return;
    }
    let cancelled = false;
    compressImageBlob(selected, format, quality)
      .then((blob) => {
        if (cancelled) return;
        setCompressedUrl(URL.createObjectURL(blob));
        setCompressedSize(blob.size);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [selected, format, quality]);

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
    const blob = await compressImageBlob(selected, format, quality);
    saveAs(blob, outputNameForImage(selected, "-nen", extForFormat(format)));
    toast("Đã tải ảnh nén");
  }, [selected, format, quality, toast]);

  const exportZip = useCallback(async () => {
    if (!images.length) return;
    try {
      await runBatch({ job: "compress", images, format, quality });
      toast("Đã xuất ZIP nén ảnh");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Lỗi ZIP", "error");
    }
  }, [images, format, quality, runBatch, toast]);

  if (!session) return null;

  return (
    <ToolShell userName={session.fullName}>
      <div className="space-y-5">
        <ToolPageHeader userName={session.fullName} title="Nén ảnh WebP / JPG" subtitle="Giảm dung lượng ảnh sản phẩm — so sánh trước/sau ngay trên trình duyệt." icon={<Zap size={26} />} />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <ToolPanel>
              <WatermarkDropZone label="Ảnh cần nén" hint="JPG, PNG, WebP" accept="image/png,image/jpeg,image/webp" multiple onFiles={onPickImages} previewUrl={selected?.dataUrl} fileName={selected?.fileName} fileMeta={imagesMeta} />
              <div className="mt-3">
                <UploadActionRow onPickImages={onPickImages} onPickFolder={onPickImages} />
              </div>
            </ToolPanel>

            <ToolPanel className="space-y-3">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Định dạng xuất</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as CompressFormat)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800">
                <option value="image/webp">WebP (khuyến nghị)</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>
              <RangeField label="Chất lượng" value={quality * 100} min={40} max={100} step={1} suffix="%" onChange={(v) => setQuality(v / 100)} />
              {selected && compressedSize ? (
                <div className="rounded-xl bg-violet-50 px-3 py-2 text-xs text-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
                  Gốc: <strong>{formatBytes(selected.file.size)}</strong> → Sau nén: <strong>{formatBytes(compressedSize)}</strong>
                  {savings && savings.pct > 0 ? <span className="ml-1 text-emerald-700">(giảm {savings.pct}%)</span> : null}
                </div>
              ) : null}
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
            {selected && compressedUrl ? (
              <CompareSlider beforeUrl={selected.dataUrl} afterUrl={compressedUrl} split={compareSplit} onSplitChange={setCompareSplit} />
            ) : (
              <PreviewFrame empty={<p className="text-sm text-slate-500">Tải ảnh để so sánh dung lượng trước / sau nén</p>} />
            )}
          </ToolPanel>
        </div>
      </div>
    </ToolShell>
  );
}

export function CompressTool() {
  return (
    <WatermarkLoginGate>
      <CompressToolContent />
    </WatermarkLoginGate>
  );
}
