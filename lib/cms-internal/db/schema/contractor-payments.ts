import { pgTable, text, serial, timestamp, numeric, date } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const contractorPaymentsTable = erpSchema.table("contractor_payments", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  contractorName: text("contractor_name").notNull(),
  contractorTaxId: text("contractor_tax_id"),
  serviceDescription: text("service_description").notNull(),
  grossAmount: numeric("gross_amount", { precision: 18, scale: 2 }).notNull(),
  pitRate: numeric("pit_rate", { precision: 5, scale: 2 }).notNull().default("10"),
  pitAmount: numeric("pit_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  netAmount: numeric("net_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  paymentDate: date("payment_date", { mode: "string" }).notNull(),
  paymentMethod: text("payment_method").notNull().default("transfer"),
  notes: text("notes"),
  createdBy: text("created_by").notNull().default("Admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type ContractorPayment = typeof contractorPaymentsTable.$inferSelect;
