import webpush from "web-push";
import { createServerClient } from "@/lib/supabase";
import { SITE_URL } from "@/lib/seo";

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  icon?: string;
};

type PushSubscriptionRow = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

export function isPushConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() && process.env.VAPID_PRIVATE_KEY?.trim());
}

export function getVapidPublicKey() {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() || "";
}

function configureWebPush() {
  if (!isPushConfigured()) return false;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT?.trim() || `mailto:${process.env.ADMIN_EMAIL || "butphamarketing@gmail.com"}`,
    getVapidPublicKey(),
    process.env.VAPID_PRIVATE_KEY!.trim(),
  );
  return true;
}

function toWebPushSubscription(row: PushSubscriptionRow): webpush.PushSubscription {
  return {
    endpoint: row.endpoint,
    keys: {
      p256dh: row.p256dh,
      auth: row.auth,
    },
  };
}

export async function savePushSubscription(input: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userAgent?: string;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      endpoint: input.endpoint,
      p256dh: input.keys.p256dh,
      auth: input.keys.auth,
      user_agent: input.userAgent || "",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "endpoint" },
  );

  if (error) throw new Error(error.message);
}

export async function removePushSubscription(endpoint: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
  if (error) throw new Error(error.message);
}

export async function getPushSubscriptionCount() {
  const supabase = createServerClient();
  const { count, error } = await supabase.from("push_subscriptions").select("*", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count || 0;
}

export async function sendPushBroadcast(payload: PushPayload) {
  if (!configureWebPush()) {
    return { sent: 0, failed: 0, skipped: true, reason: "Push chưa cấu hình VAPID" };
  }

  const supabase = createServerClient();
  const { data, error } = await supabase.from("push_subscriptions").select("id,endpoint,p256dh,auth");
  if (error) throw new Error(error.message);

  const rows = (data || []) as PushSubscriptionRow[];
  if (!rows.length) {
    return { sent: 0, failed: 0, skipped: false, reason: "Chưa có subscriber" };
  }

  const body = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url || `${SITE_URL}/blog`,
    icon: payload.icon || `${SITE_URL}/tin-tuc/tin-tuc-marketing.png`,
  });

  let sent = 0;
  let failed = 0;
  const staleEndpoints: string[] = [];

  await Promise.all(
    rows.map(async (row) => {
      try {
        await webpush.sendNotification(toWebPushSubscription(row), body);
        sent += 1;
      } catch (err) {
        failed += 1;
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          staleEndpoints.push(row.endpoint);
        }
      }
    }),
  );

  if (staleEndpoints.length) {
    await supabase.from("push_subscriptions").delete().in("endpoint", staleEndpoints);
  }

  return { sent, failed, skipped: false };
}

export async function notifyBlogPublished(input: {
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}) {
  const url = `${SITE_URL}/blog/${input.slug}`;
  return sendPushBroadcast({
    title: "Bài viết mới | Bứt Phá Marketing",
    body: input.title,
    url,
    icon: input.imageUrl || `${SITE_URL}/tin-tuc/tin-tuc-marketing.png`,
  });
}
