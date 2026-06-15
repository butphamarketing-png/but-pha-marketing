import { pgTable, text, serial, timestamp, numeric, integer } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const taxSettingsTable = erpSchema.table("tax_settings", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull().default("TNHH"),
  companyName: text("company_name"),
  companyTaxId: text("company_tax_id"),
  companyAddress: text("company_address"),
  vatFilingPeriod: text("vat_filing_period").notNull().default("quarterly"),
  vatDefaultRate: numeric("vat_default_rate", { precision: 5, scale: 2 }).notNull().default("8"),
  citRate: numeric("cit_rate", { precision: 5, scale: 2 }).notNull().default("20"),
  quarterlyVatDueDay: integer("quarterly_vat_due_day").notNull().default(30),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type TaxSettings = typeof taxSettingsTable.$inferSelect;
