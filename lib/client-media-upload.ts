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
  const formData = new FormData();
  formData.append("file", file);

  if (options.title) formData.append("title", options.title);
  if (options.sectionLabel) formData.append("sectionLabel", options.sectionLabel);
  if (options.suggestedName) formData.append("suggestedName", options.suggestedName);

  const response = await fetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json().catch(() => null)) as UploadedMediaResult & { error?: string } | null;

  if (!response.ok || !payload?.url) {
    throw new Error(payload?.error || "Khong the tai anh len luc nay.");
  }

  return payload;
}
