"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { removeBackground } from "@imgly/background-removal";
import { Download, Stamp, Wand2 } from "lucide-react";
import { useToolToast } from "@/components/tools/ToolToast";
import {
  BtnPrimary,
  BtnSecondary,
  CompareSlider,
  ProgressRing,
  ShimmerBox,
  ToolPageHeader,
  ToolPanel,
  ToolShell,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";
import { REMOVE_BG_IMAGES_TRANSFER_KEY, REMOVE_BG_LOGO_TRANSFER_KEY } from "@/lib/tool-design-tokens";
import { loadImageFromFile } from "@/lib/watermark-core";

function resizeImageForRemoval(file: File, maxEdge: number): Promise<Blob> {
  return loadImageFromFile(file).then(async (loaded) => {
    if (Math.max(loaded.width, loaded.height) <= maxEdge) return file;
    const ratio = maxEdge / Math.max(loaded.width, loaded.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(loaded.width * ratio);
    canvas.height = Math.round(loaded.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Không hỗ trợ canvas");
    const response = await fetch(loaded.dataUrl);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Resize thất bại"))), "image/png");
    });
  });
}

function parseProgressPercent(text: string): number {
  const match = text.match(/(\d+)%/);
  return match ? Number(match[1]) : 0;
}

function RemoveBgContent() {
  const session = useWatermarkSession();
  const router = useRouter();
  const { toast } = useToolToast();
  const [removeTarget, setRemoveTarget] = useState<"logo" | "image">("image");
  const [removeFile, setRemoveFile] = useState<File | null>(null);
  const [removeBeforeUrl, setRemoveBeforeUrl] = useState("");
  const [removeAfterUrl, setRemoveAfterUrl] = useState("");
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeProgressText, setRemoveProgressText] = useState("");
  const [removeProgressPct, setRemoveProgressPct] = useState(0);
  const [resizeBeforeRemove, setResizeBeforeRemove] = useState(true);
  const [compareSplit, setCompareSplit] = useState(50);

  const runRemoveBackground = useCallback(async () => {
    if (!removeFile) return;
    setRemoveBusy(true);
    setRemoveProgressPct(5);
    setRemoveProgressText("Đang tải model AI...");
    try {
      const source = resizeBeforeRemove ? await resizeImageForRemoval(removeFile, 1920) : removeFile;
      const resultBlob = await removeBackground(source, {
        progress: (phase, current, total) => {
          const pct = Math.round((current / total) * 100);
          setRemoveProgressPct(pct);
          setRemoveProgressText(`${phase} ${pct}%`);
        },
      });
      setRemoveAfterUrl(URL.createObjectURL(resultBlob));
      setRemoveProgressPct(100);
      setRemoveProgressText("Hoàn tất");
      toast("Xóa nền thành công");
    } catch (error) {
      setRemoveProgressText(error instanceof Error ? error.message : "Lỗi xóa nền");
      toast(error instanceof Error ? error.message : "Lỗi xóa nền", "error");
    } finally {
      setRemoveBusy(false);
    }
  }, [removeFile, resizeBeforeRemove, toast]);

  const useAsLogo = useCallback(async () => {
    if (!removeAfterUrl) return;
    const response = await fetch(removeAfterUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      sessionStorage.setItem(REMOVE_BG_LOGO_TRANSFER_KEY, dataUrl);
      toast("Chuyển sang công cụ đóng dấu...");
      router.push("/cong-cu/dong-dau-logo");
    };
    reader.readAsDataURL(blob);
  }, [removeAfterUrl, router, toast]);

  const stampOnOriginal = useCallback(async () => {
    if (!removeAfterUrl || !removeBeforeUrl) return;
    const [logoBlob, beforeBlob] = await Promise.all([fetch(removeAfterUrl).then((r) => r.blob()), fetch(removeBeforeUrl).then((r) => r.blob())]);
    const logoDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(logoBlob);
    });
    const beforeDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(beforeBlob);
    });
    const bitmap = await createImageBitmap(beforeBlob);
    const meta = {
      dataUrl: beforeDataUrl,
      fileName: removeFile?.name || "anh-goc.jpg",
      width: bitmap.width,
      height: bitmap.height,
    };
    bitmap.close();
    sessionStorage.setItem(REMOVE_BG_LOGO_TRANSFER_KEY, logoDataUrl);
    sessionStorage.setItem(REMOVE_BG_IMAGES_TRANSFER_KEY, JSON.stringify([meta]));
    toast("Mở đóng dấu với logo + ảnh gốc...");
    router.push("/cong-cu/dong-dau-logo");
  }, [removeAfterUrl, removeBeforeUrl, removeFile, router, toast]);

  if (!session) return null;

  return (
    <ToolShell userName={session.fullName}>
      <div className="space-y-5">
        <ToolPageHeader userName={session.fullName} title="Xóa nền AI" subtitle="Xóa nền bằng AI trên trình duyệt — offline sau lần tải model đầu." icon={<Wand2 size={26} />} />

        <div className="grid gap-5 lg:grid-cols-2">
          <ToolPanel className="space-y-4 lg:p-6">
            <div className="inline-flex rounded-xl border border-violet-100 bg-violet-50/60 p-1 dark:border-slate-600 dark:bg-slate-800/60">
              <button type="button" onClick={() => setRemoveTarget("logo")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${removeTarget === "logo" ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600"}`}>
                Logo
              </button>
              <button type="button" onClick={() => setRemoveTarget("image")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${removeTarget === "image" ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600"}`}>
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
                setRemoveProgressPct(0);
                if (file) {
                  setRemoveBeforeUrl(URL.createObjectURL(file));
                  setRemoveProgressText("");
                }
              }}
              previewUrl={removeBeforeUrl || undefined}
              fileName={removeFile?.name}
              fileMeta={removeFile ? formatBytes(removeFile.size) : undefined}
            />
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2.5 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-200">
              <input type="checkbox" checked={resizeBeforeRemove} onChange={(e) => setResizeBeforeRemove(e.target.checked)} className="h-4 w-4 accent-violet-600" />
              Resize trước khi xóa (max 1920px)
            </label>
            <BtnPrimary onClick={runRemoveBackground} disabled={!removeFile || removeBusy} icon={<Wand2 size={16} />}>
              {removeBusy ? "Đang xử lý..." : "Xóa nền ngay"}
            </BtnPrimary>
            {removeBusy ? (
              <div className="flex justify-center py-2">
                <ProgressRing percent={removeProgressPct || parseProgressPercent(removeProgressText)} label={removeProgressText || "Đang xử lý..."} />
              </div>
            ) : removeProgressText ? (
              <p className="rounded-xl bg-violet-50 px-3 py-2 text-center text-xs font-medium text-violet-800 dark:bg-violet-950/40 dark:text-violet-200">{removeProgressText}</p>
            ) : null}
            {removeAfterUrl ? (
              <div className="space-y-2">
                <a href={removeAfterUrl} download={`butpha-remove-bg-${Date.now()}.png`} className="flex items-center justify-center gap-2 rounded-xl border-2 border-violet-200 bg-white py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200">
                  <Download size={16} />
                  Tải PNG trong suốt
                </a>
                <BtnSecondary onClick={useAsLogo} icon={<Stamp size={16} />}>
                  Dùng làm logo đóng dấu
                </BtnSecondary>
                {removeTarget === "logo" && removeBeforeUrl ? (
                  <BtnSecondary onClick={stampOnOriginal} icon={<Stamp size={16} />}>
                    Đóng dấu thử trên ảnh gốc
                  </BtnSecondary>
                ) : null}
              </div>
            ) : null}
          </ToolPanel>

          <ToolPanel className="lg:p-6">
            {removeBusy && !removeAfterUrl ? (
              <div className="space-y-3">
                <ShimmerBox className="h-56 w-full" />
                <ShimmerBox className="h-4 w-2/3" />
              </div>
            ) : removeBeforeUrl && removeAfterUrl ? (
              <CompareSlider beforeUrl={removeBeforeUrl} afterUrl={removeAfterUrl} split={compareSplit} onSplitChange={setCompareSplit} />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white dark:border-slate-600 dark:bg-slate-800">
                  <p className="border-b border-violet-50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Trước</p>
                  <div className="p-2">
                    {removeBeforeUrl ? (
                      <img src={removeBeforeUrl} alt="Trước" className="h-56 w-full rounded-xl object-contain bg-slate-50" />
                    ) : (
                      <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-400">Chưa có ảnh</div>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white dark:border-slate-600 dark:bg-slate-800">
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
            )}
          </ToolPanel>
        </div>
      </div>
    </ToolShell>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function RemoveBgTool() {
  return (
    <WatermarkLoginGate>
      <RemoveBgContent />
    </WatermarkLoginGate>
  );
}
