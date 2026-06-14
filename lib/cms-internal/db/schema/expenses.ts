import { pgTable, text, serial, timestamp, numeric, integer, date } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const expensesTable = erpSchema.table("expenses", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  supplierId: integer("supplier_id"),
  customerId: integer("customer_id"),
  serviceId: integer("service_id"),
  category: text("category").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  expenseDate: date("expense_date", { mode: "string" }).notNull(),
  createdBy: text("created_by").notNull().default("Admin"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Expense = typeof expensesTable.$inferSelect;
