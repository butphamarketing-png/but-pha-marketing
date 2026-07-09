"use client";

import { useCallback, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import { Download, Wand2 } from "lucide-react";
import {
  BtnPrimary,
  ToolPageHeader,
  ToolPanel,
  ToolShell,
  WatermarkDropZone,
} from "@/components/tools/watermark-ui";
import { WatermarkLoginGate, useWatermarkSession } from "@/components/tools/WatermarkLoginGate";
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

function RemoveBgContent() {
  const session = useWatermarkSession();
  const [removeTarget, setRemoveTarget] = useState<"logo" | "image">("image");
  const [removeFile, setRemoveFile] = useState<File | null>(null);
  const [removeBeforeUrl, setRemoveBeforeUrl] = useState("");
  const [removeAfterUrl, setRemoveAfterUrl] = useState("");
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeProgressText, setRemoveProgressText] = useState("");
  const [resizeBeforeRemove, setResizeBeforeRemove] = useState(true);

  const runRemoveBackground = useCallback(async () => {
    if (!removeFile) return;
    setRemoveBusy(true);
    setRemoveProgressText("Đang tải model AI...");
    try {
      const source = resizeBeforeRemove ? await resizeImageForRemoval(removeFile, 1920) : removeFile;
      const resultBlob = await removeBackground(source, {
        progress: (phase, current, total) => {
          setRemoveProgressText(`${phase} ${Math.round((current / total) * 100)}%`);
        },
      });
      setRemoveAfterUrl(URL.createObjectURL(resultBlob));
      setRemoveProgressText("Hoàn tất");
    } catch (error) {
      setRemoveProgressText(error instanceof Error ? error.message : "Lỗi xóa nền");
    } finally {
      setRemoveBusy(false);
    }
  }, [removeFile, resizeBeforeRemove]);

  if (!session) return null;

  return (
    <ToolShell>
      <div className="space-y-5">
        <ToolPageHeader
          userName={session.fullName}
          title="Xóa nền AI"
          subtitle="Xóa nền bằng AI trên trình duyệt — offline sau lần tải model đầu."
          icon={<Wand2 size={26} />}
        />

        <ToolPanel className="lg:p-6">
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
                    <img
                      src={removeAfterUrl}
                      alt="Sau"
                      className="h-56 w-full rounded-xl object-contain bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%)] bg-[length:12px_12px]"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%)] bg-[length:12px_12px] text-xs text-slate-400">
                      Kết quả hiện ở đây
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ToolPanel>
      </div>
    </ToolShell>
  );
}

export function RemoveBgTool() {
  return (
    <WatermarkLoginGate>
      <RemoveBgContent />
    </WatermarkLoginGate>
  );
}
