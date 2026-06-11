import { pgTable, text, serial, timestamp, integer, date, numeric } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";
import { customersTable } from "./customers";

export const fanpageServicesTable = erpSchema.table("fanpage_services", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
  packageName: text("package_name").notNull(),
  postsPerMonth: integer("posts_per_month").notNull().default(0),
  reelsPerMonth: integer("reels_per_month").notNull().default(0),
  monthlyFee: numeric("monthly_fee", { precision: 18, scale: 2 }),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }).notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type FanpageService = typeof fanpageServicesTable.$inferSelect;
