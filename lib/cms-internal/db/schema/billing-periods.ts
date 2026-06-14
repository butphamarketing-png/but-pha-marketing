import { pgTable, text, serial, timestamp, numeric, integer, date } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const billingPeriodsTable = erpSchema.table("billing_periods", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").notNull(),
  customerId: integer("customer_id").notNull(),
  periodStart: date("period_start", { mode: "string" }).notNull(),
  periodEnd: date("period_end", { mode: "string" }).notNull(),
  dueDate: date("due_date", { mode: "string" }).notNull(),
  amountDue: numeric("amount_due", { precision: 18, scale: 2 }).notNull().default("0"),
  amountPaid: numeric("amount_paid", { precision: 18, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  label: text("label"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type BillingPeriod = typeof billingPeriodsTable.$inferSelect;
