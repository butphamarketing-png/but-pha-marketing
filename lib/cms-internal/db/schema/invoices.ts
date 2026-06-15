import { pgTable, text, serial, timestamp, numeric, integer, date, primaryKey } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const invoicesTable = erpSchema.table("invoices", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerId: integer("customer_id").notNull(),
  contractId: integer("contract_id"),
  billingPeriodId: integer("billing_period_id"),
  taxId: text("tax_id"),
  buyerName: text("buyer_name").notNull(),
  buyerAddress: text("buyer_address"),
  buyerEmail: text("buyer_email"),
  buyerPhone: text("buyer_phone"),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull().default("8"),
  vatAmount: numeric("vat_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  totalAmount: numeric("total_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("draft"),
  eInvoiceStatus: text("e_invoice_status").notNull().default("not_applicable"),
  eInvoiceSymbol: text("e_invoice_symbol"),
  eInvoiceNumber: text("e_invoice_number"),
  eInvoiceLookupCode: text("e_invoice_lookup_code"),
  eInvoiceLookupUrl: text("e_invoice_lookup_url"),
  eInvoiceRegisteredAt: timestamp("e_invoice_registered_at", { withTimezone: true }),
  issueDate: date("issue_date", { mode: "string" }).notNull(),
  notes: text("notes"),
  createdBy: text("created_by").notNull().default("Admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const invoiceLinesTable = erpSchema.table("invoice_lines", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  lineNo: integer("line_no").notNull().default(1),
  description: text("description").notNull(),
  unit: text("unit").notNull().default("Gói"),
  quantity: numeric("quantity", { precision: 18, scale: 2 }).notNull().default("1"),
  unitPrice: numeric("unit_price", { precision: 18, scale: 2 }).notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const invoiceReceiptsTable = erpSchema.table(
  "invoice_receipts",
  {
    invoiceId: integer("invoice_id").notNull(),
    receiptId: integer("receipt_id").notNull(),
    amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.invoiceId, table.receiptId] })],
);

export type Invoice = typeof invoicesTable.$inferSelect;
export type InvoiceLine = typeof invoiceLinesTable.$inferSelect;
