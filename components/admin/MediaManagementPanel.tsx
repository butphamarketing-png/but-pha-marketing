"use client";

import { useAdmin } from "@/lib/AdminContext";
import { uploadMediaFile } from "@/lib/client-media-upload";
import { useState } from "react";

export function SolutionsMediaPanel() {
  const { settings, setSolutionImages } = useAdmin();
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const selectedPlatform = "home";
  const solutions = settings.media[selectedPlatform]?.solutions || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadError(null);
    setUploadingProgress(1);
    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    try {
      for (let index = 0; index < files.length; index += 1) {
        try {
          const file = files[index];
          const uploaded = await uploadMediaFile(file, {
            title: `Giải pháp marketing toàn diện`,
            sectionLabel: "solutions",
            suggestedName: `solution-${index + 1}`,
          });
          uploadedUrls.push(uploaded.url);
          setUploadingProgress(Math.round(((index + 1) / totalFiles) * 100));
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
          setUploadError(`File ${files[index].name}: ${errorMsg}`);
          console.error("[v0] Solution upload error:", err);
        }
      }

      if (uploadedUrls.length > 0) {
        setSolutionImages(selectedPlatform, [...solutions, ...uploadedUrls]);
        if (uploadedUrls.length === totalFiles) {
          setUploadError(null);
        }
      } else {
        setUploadError('Không có ảnh nào được tải lên thành công');
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Lỗi tải ảnh');
      console.error("[v0] Solution upload error:", err);
    } finally {
      setUploadingProgress(0);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
      <h3 className="font-bold text-white">Giải pháp Marketing Toàn Diện (3 ảnh)</h3>
      <p className="text-sm text-white/60">Tải 3 ảnh đại diện cho các giải pháp marketing</p>
      
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50" style={{ opacity: uploadingProgress > 0 ? 0.6 : 1, pointerEvents: uploadingProgress > 0 ? 'none' : 'auto' }}>
          {uploadingProgress > 0 ? `Đang tải... (${uploadingProgress}%)` : 'Tải ảnh'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploadingProgress > 0}
            onChange={handleUpload}
          />
        </label>
      </div>

      {uploadError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <p className="font-semibold">Lỗi tải ảnh:</p>
          <p className="break-words text-xs">{uploadError}</p>
        </div>
      )}

      {solutions.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video">
                <img src={url} alt={`Solution ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setSolutionImages(selectedPlatform, solutions.filter((_, idx) => idx !== i));
                  }}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <span className="text-white text-sm font-bold">Xóa</span>
                </button>
              </div>
            ))}
          </div>
          {solutions.length > 0 && (
            <button
              type="button"
              onClick={() => setSolutionImages(selectedPlatform, [])}
              className="w-full rounded-lg bg-red-600/20 border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-600/30 transition"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function ConsultationMediaPanel() {
  const { settings, setConsultationImages } = useAdmin();
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const selectedPlatform = "home";
  const consultationImages = settings.media[selectedPlatform]?.consultationImages || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadError(null);
    setUploadingProgress(1);
    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    try {
      for (let index = 0; index < files.length; index += 1) {
        try {
          const file = files[index];
          const uploaded = await uploadMediaFile(file, {
            title: `Đặt lịch tư vấn`,
            sectionLabel: "consultation",
            suggestedName: `consultation-${index + 1}`,
          });
          uploadedUrls.push(uploaded.url);
          setUploadingProgress(Math.round(((index + 1) / totalFiles) * 100));
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
          setUploadError(`File ${files[index].name}: ${errorMsg}`);
          console.error("[v0] Consultation upload error:", err);
        }
      }

      if (uploadedUrls.length > 0) {
        setConsultationImages(selectedPlatform, [...consultationImages, ...uploadedUrls]);
        if (uploadedUrls.length === totalFiles) {
          setUploadError(null);
        }
      } else {
        setUploadError('Không có ảnh nào được tải lên thành công');
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Lỗi tải ảnh');
      console.error("[v0] Consultation upload error:", err);
    } finally {
      setUploadingProgress(0);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
      <h3 className="font-bold text-white">Hình ảnh Đặt Lịch Tư Vấn</h3>
      <p className="text-sm text-white/60">Tải ảnh hiển thị cho phần đặt lịch tư vấn</p>
      
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50" style={{ opacity: uploadingProgress > 0 ? 0.6 : 1, pointerEvents: uploadingProgress > 0 ? 'none' : 'auto' }}>
          {uploadingProgress > 0 ? `Đang tải... (${uploadingProgress}%)` : 'Tải ảnh'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploadingProgress > 0}
            onChange={handleUpload}
          />
        </label>
      </div>

      {uploadError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <p className="font-semibold">Lỗi tải ảnh:</p>
          <p className="break-words text-xs">{uploadError}</p>
        </div>
      )}

      {consultationImages.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {consultationImages.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video">
                <img src={url} alt={`Consultation ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setConsultationImages(selectedPlatform, consultationImages.filter((_, idx) => idx !== i));
                  }}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <span className="text-white text-sm font-bold">Xóa</span>
                </button>
              </div>
            ))}
          </div>
          {consultationImages.length > 0 && (
            <button
              type="button"
              onClick={() => setConsultationImages(selectedPlatform, [])}
              className="w-full rounded-lg bg-red-600/20 border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-600/30 transition"
            >
              Xóa tất cả
            </button>
          )}
        </div>
      )}
    </div>
  );
}
