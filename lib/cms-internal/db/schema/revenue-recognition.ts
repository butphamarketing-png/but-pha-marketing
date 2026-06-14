import { pgTable, text, serial, timestamp, numeric, integer } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const revenueRecognitionTable = erpSchema.table("revenue_recognition", {
  id: serial("id").primaryKey(),
  billingPeriodId: integer("billing_period_id").notNull(),
  contractId: integer("contract_id").notNull(),
  customerId: integer("customer_id").notNull(),
  recognitionYear: integer("recognition_year").notNull(),
  recognitionMonth: integer("recognition_month").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  method: text("method").notNull().default("monthly"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type RevenueRecognition = typeof revenueRecognitionTable.$inferSelect;
