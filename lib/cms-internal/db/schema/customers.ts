import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const customersTable = erpSchema.table("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Customer = typeof customersTable.$inferSelect;
