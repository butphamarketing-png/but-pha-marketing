import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const servicesTable = erpSchema.table("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Service = typeof servicesTable.$inferSelect;
