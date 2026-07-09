import { loadImageFromFile } from "@/lib/watermark-core";

export const SAMPLE_IMAGE_PATH = "/cong-cu/sample-photo.svg";

export async function loadSampleImage() {
  const response = await fetch(SAMPLE_IMAGE_PATH);
  const blob = await response.blob();
  const file = new File([blob], "sample-photo.svg", { type: blob.type || "image/svg+xml" });
  return loadImageFromFile(file);
}
