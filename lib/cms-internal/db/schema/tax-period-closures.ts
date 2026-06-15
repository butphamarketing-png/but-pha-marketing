import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const taxPeriodClosuresTable = erpSchema.table("tax_period_closures", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  quarter: integer("quarter").notNull(),
  periodType: text("period_type").notNull().default("vat_quarterly"),
  status: text("status").notNull().default("open"),
  closedAt: timestamp("closed_at", { withTimezone: true }),
  closedBy: text("closed_by"),
  snapshot: jsonb("snapshot"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type TaxPeriodClosure = typeof taxPeriodClosuresTable.$inferSelect;
