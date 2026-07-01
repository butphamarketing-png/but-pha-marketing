import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import {
  BANGGIA_SPAM_WINDOW_MS,
  buildBanggiaNote,
  mergeBanggiaNote,
  parseBanggiaNote,
} from "@/lib/banggia-access";
import { sendBanggiaLeadNotification } from "@/lib/banggia-email";
import { isValidBanggiaName, isValidBanggiaPhone, normalizeBanggiaPhone } from "@/lib/banggia-validation";

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || null;
}

function pickString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseDeviceFromUserAgent(userAgent: string | null, clientDevice: string | null): string | null {
  if (clientDevice) return clientDevice;
  if (!userAgent) return null;
  if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function parseBrowserFromUserAgent(userAgent: string | null, clientBrowser: string | null): string | null {
  if (clientBrowser) return clientBrowser;
  if (!userAgent) return null;
  if (/Edg\//i.test(userAgent)) return "Edge";
  if (/Chrome\//i.test(userAgent) && !/Edg\//i.test(userAgent)) return "Chrome";
  if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent)) return "Safari";
  if (/Firefox\//i.test(userAgent)) return "Firefox";
  if (/OPR\//i.test(userAgent)) return "Opera";
  return "Unknown";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = normalizeBanggiaPhone(typeof body.phone === "string" ? body.phone : "");

    if (!isValidBanggiaName(name)) {
      return NextResponse.json({ error: "Họ và tên không hợp lệ." }, { status: 400 });
    }
    if (!isValidBanggiaPhone(phone)) {
      return NextResponse.json({ error: "Số điện thoại không hợp lệ." }, { status: 400 });
    }

    const accessedAt = new Date().toISOString();
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || null;
    const referrer = pickString(body.referrer) || request.headers.get("referer") || null;

    const metadata = {
      accessedAt,
      ip,
      userAgent,
      referrer,
      device: parseDeviceFromUserAgent(userAgent, pickString(body.device)),
      browser: parseBrowserFromUserAgent(userAgent, pickString(body.browser)),
      utmSource: pickString(body.utmSource),
      utmMedium: pickString(body.utmMedium),
      utmCampaign: pickString(body.utmCampaign),
      gclid: pickString(body.gclid),
      fbclid: pickString(body.fbclid),
    };

    const supabase = createServerClient();
    const spamSince = new Date(Date.now() - BANGGIA_SPAM_WINDOW_MS).toISOString();

    const { data: recentLeads, error: lookupError } = await supabase
      .from("leads")
      .select("id, name, note, created_at")
      .eq("phone", phone)
      .eq("platform", "banggia")
      .gte("created_at", spamSince)
      .order("created_at", { ascending: false })
      .limit(1);

    if (lookupError) {
      console.error("POST /api/banggia-access lookup error", lookupError);
      return NextResponse.json({ error: "Không lưu được thông tin." }, { status: 500 });
    }

    const recentLead = recentLeads?.[0] ?? null;

    if (recentLead) {
      const note = mergeBanggiaNote(recentLead.note, metadata);
      const { data, error } = await supabase
        .from("leads")
        .update({
          name,
          note,
          service: "Nguồn: Banggia",
          url: "/banggia",
        })
        .eq("id", recentLead.id)
        .select()
        .single();

      if (error) {
        console.error("POST /api/banggia-access update error", error);
        return NextResponse.json({ error: "Không lưu được thông tin." }, { status: 500 });
      }

      const parsed = parseBanggiaNote(note);
      return NextResponse.json({
        ok: true,
        id: data?.id ?? recentLead.id,
        accessedAt: parsed?.lastAccessedAt ?? accessedAt,
        updated: true,
      });
    }

    const note = buildBanggiaNote(metadata);
    const { data, error } = await supabase
      .from("leads")
      .insert({
        type: "contact",
        name,
        phone,
        service: "Nguồn: Banggia",
        platform: "banggia",
        url: "/banggia",
        note,
      })
      .select()
      .single();

    if (error) {
      console.error("POST /api/banggia-access Supabase error", error);
      return NextResponse.json({ error: "Không lưu được thông tin." }, { status: 500 });
    }

    void sendBanggiaLeadNotification({
      name,
      phone,
      accessedAt,
      sourceUrl: "/banggia",
    }).catch((mailError) => {
      console.error("POST /api/banggia-access email notify failed", mailError);
    });

    return NextResponse.json({
      ok: true,
      id: data?.id ?? null,
      accessedAt,
      updated: false,
    });
  } catch (error) {
    console.error("POST /api/banggia-access failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
