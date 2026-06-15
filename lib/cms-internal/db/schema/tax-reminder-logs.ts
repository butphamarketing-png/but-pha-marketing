import { pgTable, text, serial, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const taxReminderLogsTable = erpSchema.table(
  "tax_reminder_logs",
  {
    id: serial("id").primaryKey(),
    year: integer("year").notNull(),
    quarter: integer("quarter").notNull(),
    reminderKey: text("reminder_key").notNull(),
    recipient: text("recipient").notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("erp_tax_reminder_unique").on(table.year, table.quarter, table.reminderKey, table.recipient),
  ],
);

export type TaxReminderLog = typeof taxReminderLogsTable.$inferSelect;
