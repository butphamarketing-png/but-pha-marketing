import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function getEnv(name: string) {
  return (process.env[name] || "").trim();
}

export function isR2Configured() {
  return Boolean(
    getEnv("R2_ACCOUNT_ID") &&
      getEnv("R2_ACCESS_KEY_ID") &&
      getEnv("R2_SECRET_ACCESS_KEY") &&
      getEnv("R2_BUCKET_NAME") &&
      getEnv("R2_PUBLIC_BASE_URL"),
  );
}

function getR2Client() {
  const accountId = getEnv("R2_ACCOUNT_ID");
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: getEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: getEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
}

export function getR2PublicUrl(storagePath: string) {
  const base = getEnv("R2_PUBLIC_BASE_URL").replace(/\/+$/, "");
  const path = storagePath.replace(/^\/+/, "");
  return `${base}/${path}`;
}

export async function uploadToR2(storagePath: string, body: Buffer, contentType: string) {
  const bucket = getEnv("R2_BUCKET_NAME");
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storagePath,
      Body: body,
      ContentType: contentType || "application/octet-stream",
    }),
  );

  return getR2PublicUrl(storagePath);
}

export function getR2StoragePathFromUrl(url: string): string | null {
  if (!isR2Configured()) return null;
  const base = getEnv("R2_PUBLIC_BASE_URL").replace(/\/+$/, "");
  if (!url.startsWith(`${base}/`)) return null;
  return url.slice(base.length + 1);
}

export async function deleteFromR2(storagePath: string) {
  const bucket = getEnv("R2_BUCKET_NAME");
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: storagePath,
    }),
  );
}
