import { pgTable, text, serial, timestamp, numeric, integer, date } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const receiptsTable = erpSchema.table("receipts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  contractId: integer("contract_id"),
  billingPeriodId: integer("billing_period_id"),
  serviceId: integer("service_id"),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull().default("cash"),
  receiptDate: date("receipt_date", { mode: "string" }).notNull(),
  createdBy: text("created_by").notNull().default("Admin"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Receipt = typeof receiptsTable.$inferSelect;
