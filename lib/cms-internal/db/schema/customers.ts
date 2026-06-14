import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const customersTable = erpSchema.table("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  taxId: text("tax_id"),
  externalId: text("external_id"),
  customerType: text("customer_type").default("individual"),
  contactPerson: text("contact_person"),
  invoiceAddress: text("invoice_address"),
  needsVatInvoice: boolean("needs_vat_invoice").notNull().default(false),
  customerStatus: text("customer_status").default("active"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Customer = typeof customersTable.$inferSelect;
