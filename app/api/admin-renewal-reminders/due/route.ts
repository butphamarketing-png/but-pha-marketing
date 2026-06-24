import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import {
  ADMIN_RENEWAL_REMINDER_DAYS,
  collectAdminRenewalDueItems,
  filterItemsForAdminBanner,
} from "@/lib/admin-renewal-reminders";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const allItems = await collectAdminRenewalDueItems();
    const items = filterItemsForAdminBanner(allItems);

    return NextResponse.json({
      ok: true,
      reminderDays: ADMIN_RENEWAL_REMINDER_DAYS,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("GET /api/admin-renewal-reminders/due failed", error);
    return NextResponse.json({ ok: false, error: "Không tải được danh sách nhắc gia hạn." }, { status: 500 });
  }
}
