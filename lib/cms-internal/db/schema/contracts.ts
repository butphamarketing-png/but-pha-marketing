import { pgTable, text, serial, timestamp, numeric, integer, date } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const contractsTable = erpSchema.table("contracts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  serviceId: integer("service_id"),
  totalValue: numeric("total_value", { precision: 18, scale: 2 }).notNull().default("0"),
  paidAmount: numeric("paid_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("active"),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }),
  dueDate: date("due_date", { mode: "string" }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Contract = typeof contractsTable.$inferSelect;
