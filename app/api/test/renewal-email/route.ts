export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { buildDomainExpiryEmail, type DomainAsset } from "@/lib/domain-assets";
import { buildHostingExpiryEmail, type HostingAsset } from "@/lib/hosting-assets";
import { buildWebsiteCareExpiryEmail, type WebsiteCareAsset } from "@/lib/website-care-assets";
import { buildWebsiteAdsExpiryEmail, type WebsiteAdsAsset } from "@/lib/website-ads-assets";
import nodemailer from "nodemailer";

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.CUSTOMER_RENEWAL_CRON_SECRET || process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  if (expectedSecret && bearerToken === expectedSecret) return true;
  return false;
}

function getMailConfig() {
  const user = (process.env.GMAIL_USER || process.env.ADMIN_EMAIL || "").trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
  return { user, pass };
}

async function sendSample(to: string, subject: string, text: string) {
  const { user, pass } = getMailConfig();
  if (!user || !pass) {
    return { sent: false, error: "Thiếu GMAIL_USER hoặc GMAIL_APP_PASSWORD trên server." };
  }
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: `"Bứt Phá Marketing" <${user}>`,
    to,
    subject: `[MẪU THỬ] ${subject}`,
    text: `${text}\n\n---\n(Email mẫu thử nghiệm từ hệ thống Bứt Phá Marketing)`,
  });
  return { sent: true };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const to = typeof body?.to === "string" ? body.to.trim() : "";
  const type = typeof body?.type === "string" ? body.type : "domain";
  if (!to) {
    return NextResponse.json({ ok: false, error: "Thiếu email đích (to)." }, { status: 400 });
  }

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 15);
  const expireStr = expireDate.toISOString().slice(0, 10);

  try {
    if (type === "domain") {
      const sample: DomainAsset = {
        id: "test",
        customerRecordId: "",
        contractCode: "100100D",
        customerName: "Khách hàng mẫu",
        customerEmail: to,
        domainName: "example.com",
        provider: "PA",
        buyPrice: 250000,
        sellPrice: 500000,
        registerDate: "2025-06-01",
        expireDate: expireStr,
        status: "active",
        lastExpiryEmailAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const { subject, text } = buildDomainExpiryEmail(sample);
      const outcome = await sendSample(to, subject, text);
      return NextResponse.json({ ok: outcome.sent, type, preview: { subject, text }, ...outcome });
    }

    if (type === "hosting") {
      const sample: HostingAsset = {
        id: "test",
        customerRecordId: "",
        contractCode: "100100H",
        customerName: "Khách hàng mẫu",
        customerEmail: to,
        hostingName: "example.com",
        packageLabel: "Hosting 2GB",
        provider: "PA",
        buyPrice: 600000,
        sellPrice: 1200000,
        registerDate: "2025-06-01",
        expireDate: expireStr,
        status: "active",
        lastExpiryEmailAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const { subject, text } = buildHostingExpiryEmail(sample);
      const outcome = await sendSample(to, subject, text);
      return NextResponse.json({ ok: outcome.sent, type, preview: { subject, text }, ...outcome });
    }

    if (type === "website-care") {
      const sample: WebsiteCareAsset = {
        id: "test",
        customerRecordId: "",
        contractCode: "100100C",
        customerName: "Khách hàng mẫu",
        customerEmail: to,
        siteUrl: "https://example.com",
        packageLabel: "CS Web 1",
        buyPrice: 0,
        sellPrice: 500000,
        registerDate: "2026-05-01",
        expireDate: expireStr,
        status: "active",
        lastExpiryEmailAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const { subject, text } = buildWebsiteCareExpiryEmail(sample);
      const outcome = await sendSample(to, subject, text);
      return NextResponse.json({ ok: outcome.sent, type, preview: { subject, text }, ...outcome });
    }

    const adsSample: WebsiteAdsAsset = {
      id: "test",
      customerRecordId: "",
      contractCode: "100100Q",
      customerName: "Khách hàng mẫu",
      customerEmail: to,
      campaignLink: "https://ads.google.com/example",
      packageLabel: "QC Web 1",
      sellPrice: 1000000,
      registerDate: "2026-05-01",
      expireDate: expireStr,
      status: "active",
      lastExpiryEmailAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const { subject, text } = buildWebsiteAdsExpiryEmail(adsSample);
    const outcome = await sendSample(to, subject, text);
    return NextResponse.json({ ok: outcome.sent, type: type === "website-ads" ? type : "website-ads", preview: { subject, text }, ...outcome });
  } catch (error) {
    console.error("[test/renewal-email] failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Gửi thất bại" },
      { status: 500 },
    );
  }
}
