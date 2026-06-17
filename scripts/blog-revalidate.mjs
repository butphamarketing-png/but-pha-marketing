/**
 * Gọi sau khi seed bài viết trực tiếp vào Supabase để xóa cache ISR trên production.
 * Cần REVALIDATE_SECRET trong .env.local (cùng giá trị trên Vercel).
 */
export async function revalidateBlogAfterSeed(slug) {
  const secret = process.env.REVALIDATE_SECRET;
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com").replace(/\/$/, "");
  if (!secret) {
    console.log("Skip revalidate: REVALIDATE_SECRET not set");
    return;
  }

  const url = `${base}/api/revalidate/blog?secret=${encodeURIComponent(secret)}${slug ? `&slug=${encodeURIComponent(slug)}` : ""}`;
  try {
    const res = await fetch(url, { method: "POST" });
    const body = await res.json().catch(() => ({}));
    console.log(res.ok ? "Revalidated blog cache" : "Revalidate failed", body);
  } catch (error) {
    console.warn("Revalidate request failed", error instanceof Error ? error.message : error);
  }
}
