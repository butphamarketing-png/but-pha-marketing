type UploadMediaOptions = {
  title?: string;
  sectionLabel?: string;
  suggestedName?: string;
};

export type UploadedMediaResult = {
  url: string;
  item?: {
    id?: number | string;
    name?: string;
  };
};

export async function uploadMediaFile(file: File, options: UploadMediaOptions = {}): Promise<UploadedMediaResult> {
  // Validate file before upload
  if (!file || !file.size) {
    throw new Error("File không hợp lệ hoặc rỗng");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Chỉ hỗ trợ file ảnh (JPG, PNG, WebP, GIF)");
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error(`File quá lớn. Tối đa ${MAX_SIZE / 1024 / 1024}MB`);
  }

  const formData = new FormData();
  formData.append("file", file);

  if (options.title) formData.append("title", options.title);
  if (options.sectionLabel) formData.append("sectionLabel", options.sectionLabel);
  if (options.suggestedName) formData.append("suggestedName", options.suggestedName);

  try {
    const response = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json().catch(() => null);
        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // Ignore JSON parse errors, use status-based message
      }
      throw new Error(errorMessage);
    }

    const payload = (await response.json().catch(() => null)) as UploadedMediaResult & { error?: string } | null;

    if (!payload?.url) {
      throw new Error(payload?.error || "Server không trả về URL ảnh");
    }

    return payload;
  } catch (error) {
    if (error instanceof Error) {
      console.error("[v0] Media upload error:", error.message);
      throw error;
    }
    throw new Error("Không thể tải ảnh lên lúc này (lỗi mạng hoặc server)");
  }
}
