import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";

export const auditLogsTable = erpSchema.table("audit_logs", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  action: text("action").notNull(),
  performedBy: text("performed_by").notNull().default("Admin"),
  oldData: jsonb("old_data"),
  newData: jsonb("new_data"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AuditLog = typeof auditLogsTable.$inferSelect;
