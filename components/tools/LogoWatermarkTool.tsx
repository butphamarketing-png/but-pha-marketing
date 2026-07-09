"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { Download, ImagePlus, Layers, Stamp } from "lucide-react";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";
import {
  BtnPrimary,
  BtnSecondary,
  CanvasToolbar,
  CompareSlider,
  ImageThumbStrip,
  PresetGrid,
  PreviewFrame,
  RangeField,
  StepProgress,
  ToolPageHeader,
  ToolPanel,
  ToolSection,
  ToolShell,
  UploadActionRow,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";
import { usePresetHistory } from "@/hooks/usePresetHistory";
import { useWatermarkBatch } from "@/hooks/useWatermarkBatch";
import {
  PRESET_KEY,
  LOGO_KEY,
  defaultPresets,
  clamp,
  computePlacement,
  canExportWatermark,
  drawWatermarkBlob,
  extensionForMime,
  fileNameWithoutExt,
  isImageFile,
  loadImageFromFile,
  dataUrlToImageBitmap,
  renderWatermarkOnContext,
  type Preset,
  type TextWatermarkSettings,
  type LoadedImageMeta,
} from "@/lib/watermark-core";

type LoadedImage = LoadedImageMeta & { file: File };

function LogoWatermarkContent() {
  const session = useWatermarkSession();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [images, setImages] = useState<LoadedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = images[selectedImageIndex] ?? null;

  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [logoNaturalSize, setLogoNaturalSize] = useState({ width: 1, height: 1 });
  const [presets, setPresets] = useState<Preset[]>(defaultPresets);
  const [activePresetId, setActivePresetId] = useState(defaultPresets[3].id);
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

  const { progress: batchProgress, isPaused, runBatch, pause, resume, cancel } = useWatermarkBatch();

  const activePreset = useMemo(() => presets.find((p) => p.id === activePresetId) ?? presets[0], [presets, activePresetId]);

  const restorePreset = useCallback((preset: Preset) => {
    setPresets((prev) => prev.map((p) => (p.id === preset.id ? preset : p)));
  }, []);

  const { canUndo, canRedo, undo, redo, beginDrag, endDrag, recordChange } = usePresetHistory(activePreset, restorePreset);

  useEffect(() => {
    const rawPresets = localStorage.getItem(PRESET_KEY);
    if (rawPresets) setPresets(JSON.parse(rawPresets) as Preset[]);
    const rawLogo = localStorage.getItem(LOGO_KEY);
    if (rawLogo) {
      setLogoDataUrl(rawLogo);
      dataUrlToImageBitmap(rawLogo)
        .then((bmp) => {
          setLogoNaturalSize({ width: bmp.width, height: bmp.height });
          bmp.close();
        })
        .catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
  }, [presets]);

  const updateActivePreset = useCallback(
    (partial: Partial<Preset>, trackHistory = true) => {
      if (trackHistory && activePreset) recordChange(activePreset);
      setPresets((prev) => prev.map((preset) => (preset.id !== activePresetId ? preset : { ...preset, ...partial })));
    },
    [activePreset, activePresetId, recordChange],
  );

  const drawPreview = useCallback(async () => {
    if (!canvasRef.current || !selectedImage || !activePreset) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseBitmap = await dataUrlToImageBitmap(selectedImage.dataUrl);
    canvas.width = baseBitmap.width;
    canvas.height = baseBitmap.height;
    const maxPreviewWidth = 880;
    const ratio = baseBitmap.width > maxPreviewWidth ? maxPreviewWidth / baseBitmap.width : 1;
    canvas.style.width = `${Math.round(baseBitmap.width * ratio)}px`;
    canvas.style.height = `${Math.round(baseBitmap.height * ratio)}px`;

    await renderWatermarkOnContext(ctx, baseBitmap.width, baseBitmap.height, baseBitmap, logoDataUrl || null, activePreset, textWatermark);

    if (logoDataUrl) {
      const logoWidth = (baseBitmap.width * activePreset.logoWidthPercent) / 100;
      const logoHeight = logoWidth * (logoNaturalSize.height / logoNaturalSize.width);
      const placement = computePlacement(baseBitmap.width, baseBitmap.height, logoWidth, logoHeight, activePreset);
      ctx.save();
      ctx.strokeStyle = "rgba(124,58,237,0.9)";
      ctx.lineWidth = 3;
      ctx.strokeRect(placement.x, placement.y, placement.logoWidth, placement.logoHeight);
      ctx.fillStyle = "rgba(124,58,237,1)";
      ctx.fillRect(placement.x + placement.logoWidth - 12, placement.y + placement.logoHeight - 12, 12, 12);
      ctx.restore();
    }

    baseBitmap.close();
    setPreviewOutputUrl(canvas.toDataURL("image/png"));
  }, [selectedImage, logoDataUrl, activePreset, textWatermark, logoNaturalSize]);

  useEffect(() => {
    drawPreview().catch(() => undefined);
  }, [drawPreview]);

  useEffect(() => {
    if (!selectedImage) setPreviewOutputUrl("");
  }, [selectedImage]);

  const onPickImages = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    const loaded = await Promise.all(Array.from(fileList).filter(isImageFile).map(loadImageFromFile));
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
    setPresets((prev) => [...prev, { ...activePreset, id, name }]);
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
    saveAs(new Blob([JSON.stringify(presets, null, 2)], { type: "application/json" }), "butpha-watermark-presets.json");
  }, [presets]);

  const importPresetJson = useCallback(async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    const parsed = JSON.parse(await file.text()) as Preset[];
    if (!Array.isArray(parsed)) return;
    setPresets(parsed);
    setActivePresetId(parsed[0]?.id ?? defaultPresets[0].id);
  }, []);

  const handleCanvasPointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !selectedImage || !logoDataUrl || !activePreset) return;
      beginDrag();
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
        pointerX >= place.x && pointerX <= place.x + place.logoWidth && pointerY >= place.y && pointerY <= place.y + place.logoHeight;
      if (!hitLogo && !hitResize) {
        endDrag();
        return;
      }
      setDragMode(hitResize ? "resize" : "move");
      dragStartRef.current = {
        x: pointerX,
        y: pointerY,
        startXP: activePreset.xPercent ?? (place.x / selectedImage.width) * 100,
        startYP: activePreset.yPercent ?? (place.y / selectedImage.height) * 100,
        startWidth: activePreset.logoWidthPercent,
      };
      canvas.setPointerCapture(event.pointerId);
    },
    [selectedImage, logoDataUrl, activePreset, logoNaturalSize, beginDrag, endDrag],
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
        updateActivePreset(
          {
            anchor: "custom",
            xPercent: clamp(dragStartRef.current.startXP + (deltaX / selectedImage.width) * 100, 0, 100),
            yPercent: clamp(dragStartRef.current.startYP + (deltaY / selectedImage.height) * 100, 0, 100),
          },
          false,
        );
      } else {
        updateActivePreset({ logoWidthPercent: clamp(dragStartRef.current.startWidth + (deltaX / selectedImage.width) * 100, 3, 90) }, false);
      }
    },
    [dragMode, selectedImage, activePreset, updateActivePreset],
  );

  const handleCanvasPointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;
      canvasRef.current.releasePointerCapture(event.pointerId);
      setDragMode(null);
      endDrag();
    },
    [endDrag],
  );

  const handleExportSingle = useCallback(async () => {
    if (!selectedImage || !activePreset || !canExportWatermark(logoDataUrl, textWatermark)) return;
    const blob = await drawWatermarkBlob(selectedImage, logoDataUrl || null, activePreset, textWatermark, exportType);
    saveAs(blob, `${fileNameWithoutExt(selectedImage.file.name)}-watermark.${extensionForMime(exportType)}`);
  }, [selectedImage, logoDataUrl, activePreset, textWatermark, exportType]);

  const handleExportBatch = useCallback(async () => {
    if (!images.length || !activePreset || !canExportWatermark(logoDataUrl, textWatermark)) return;
    try {
      await runBatch({
        images,
        logoDataUrl: logoDataUrl || null,
        presets,
        activePreset,
        textSettings: textWatermark,
        exportType,
      });
    } catch (error) {
      console.error(error);
    }
  }, [images, logoDataUrl, activePreset, textWatermark, exportType, presets, runBatch]);

  const exportReady = canExportWatermark(logoDataUrl, textWatermark);

  if (!session) return null;

  return (
    <ToolShell>
      <div className="space-y-5">
        <ToolPageHeader
          userName={session.fullName}
          title="Đóng dấu logo"
          subtitle="Xử lý 100% trên trình duyệt — không upload ảnh lên server."
          icon={<Stamp size={26} />}
        />

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
              <PresetGrid
                presets={defaultPresets}
                activeId={activePresetId}
                onSelect={(id) => {
                  if (activePreset) recordChange(activePreset);
                  setActivePresetId(id);
                }}
              />
              <select
                value={activePreset?.id}
                onChange={(e) => {
                  if (activePreset) recordChange(activePreset);
                  setActivePresetId(e.target.value);
                }}
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
                <button type="button" className="rounded-xl bg-violet-600 px-3 py-2 text-xs font-bold text-white" onClick={saveCurrentAsPreset}>
                  Lưu
                </button>
                <button type="button" className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600" onClick={() => deletePreset(activePreset?.id ?? "")}>
                  Xóa
                </button>
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50" onClick={exportPresetJson}>
                  Export
                </button>
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
              {!exportReady ? <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">Tải logo hoặc bật watermark chữ để xuất.</p> : null}
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
                  <p className="text-center text-xs font-medium text-slate-600">
                    {batchProgress.current} / {batchProgress.total} ảnh
                  </p>
                  <div className="flex gap-2">
                    <button type="button" onClick={isPaused ? resume : pause} disabled={!batchProgress.running} className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold disabled:opacity-40">
                      {isPaused ? "Tiếp tục" : "Tạm dừng"}
                    </button>
                    <button type="button" onClick={cancel} disabled={!batchProgress.running} className="flex-1 rounded-xl border border-rose-200 py-2 text-xs font-semibold text-rose-600 disabled:opacity-40">
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
              <div className="flex items-center gap-2">
                {logoDataUrl ? <CanvasToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} /> : null}
                {images.length > 1 ? (
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-800 px-3 py-1 text-xs font-bold text-white">{images.length} ảnh</span>
                ) : null}
              </div>
            </div>

            {selectedImage ? (
              <div className="space-y-4">
                {images.length > 1 ? <ImageThumbStrip images={images} selectedIndex={selectedImageIndex} onSelect={setSelectedImageIndex} /> : null}

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
                  <p className="text-center text-xs text-slate-500">Kéo logo để đổi vị trí · kéo góc phải dưới để resize · Ctrl+Z hoàn tác</p>
                )}

                {previewOutputUrl ? <CompareSlider beforeUrl={selectedImage.dataUrl} afterUrl={previewOutputUrl} split={compareSplit} onSplitChange={setCompareSplit} /> : null}
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
      </div>
    </ToolShell>
  );
}

export function LogoWatermarkTool() {
  return (
    <WatermarkLoginGate>
      <LogoWatermarkContent />
    </WatermarkLoginGate>
  );
}
