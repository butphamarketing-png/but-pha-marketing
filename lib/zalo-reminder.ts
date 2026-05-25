import {
  buildRenewalMessage,
  buildZaloRenewalUrl,
  type CustomerRecord,
} from "@/lib/customer-records";

export async function sendZaloRenewalReminder(customer: CustomerRecord) {
  const message = buildRenewalMessage(customer);
  const accessToken = (process.env.ZALO_OA_ACCESS_TOKEN || "").trim();
  const templateId = (process.env.ZALO_OA_TEMPLATE_ID || "").trim();

  if (accessToken && templateId && customer.phone.trim()) {
    try {
      const res = await fetch("https://business.openapi.zalo.me/message/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
        body: JSON.stringify({
          phone: customer.phone.replace(/\D/g, ""),
          template_id: templateId,
          template_data: {
            customer_name: customer.fullName || "Khách hàng",
            service_name: customer.service || "Dịch vụ",
            expire_date: customer.expiresAt
              ? new Date(customer.expiresAt).toLocaleDateString("vi-VN")
              : "",
          },
        }),
      });
      if (res.ok) {
        return { sent: true, channel: "zalo_oa" as const };
      }
      console.warn("[zalo-reminder] OA API failed", await res.text());
    } catch (error) {
      console.warn("[zalo-reminder] OA API error", error);
    }
  }

  const webhook = (process.env.ZALO_REMINDER_WEBHOOK_URL || "").trim();
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: customer.phone,
          fullName: customer.fullName,
          service: customer.service,
          expiresAt: customer.expiresAt,
          message,
          zaloUrl: buildZaloRenewalUrl(customer.phone, message),
        }),
      });
      return { sent: true, channel: "webhook" as const };
    } catch (error) {
      console.warn("[zalo-reminder] webhook error", error);
    }
  }

  return {
    sent: false,
    channel: "manual" as const,
    zaloUrl: buildZaloRenewalUrl(customer.phone, message),
    message,
  };
}
