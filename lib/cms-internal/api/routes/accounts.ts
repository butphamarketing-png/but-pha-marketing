import { Router } from "express";
import {
  db,
  billingPeriodsTable,
  contractsTable,
  customersTable,
  expensesTable,
  suppliersTable,
} from "@/lib/cms-internal/db";
import { eq, sql, inArray } from "drizzle-orm";
import { ListAccountsReceivableQueryParams, ListAccountsPayableQueryParams } from "@/lib/cms-internal/api-zod";

const router = Router();

function mapReceivableStatus(
  periodStatus: string,
  remainingAmount: number,
): "paid" | "unpaid" | "overdue" {
  if (remainingAmount <= 0 || periodStatus === "paid") return "paid";
  if (periodStatus === "overdue") return "overdue";
  return "unpaid";
}

router.get("/accounts-receivable", async (req, res) => {
  const query = ListAccountsReceivableQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { status, customerId, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  const rows = await db
    .select({
      id: billingPeriodsTable.id,
      contractId: billingPeriodsTable.contractId,
      contractCode: contractsTable.code,
      customerId: billingPeriodsTable.customerId,
      customerName: customersTable.name,
      amountDue: billingPeriodsTable.amountDue,
      amountPaid: billingPeriodsTable.amountPaid,
      dueDate: billingPeriodsTable.dueDate,
      periodStatus: billingPeriodsTable.status,
      label: billingPeriodsTable.label,
    })
    .from(billingPeriodsTable)
    .leftJoin(customersTable, eq(billingPeriodsTable.customerId, customersTable.id))
    .leftJoin(contractsTable, eq(billingPeriodsTable.contractId, contractsTable.id))
    .where(inArray(billingPeriodsTable.status, ["pending", "partial", "overdue", "paid"]))
    .orderBy(billingPeriodsTable.dueDate);

  const items = rows
    .map((row) => {
      const totalContractValue = parseFloat(row.amountDue ?? "0");
      const paidAmount = parseFloat(row.amountPaid ?? "0");
      const remainingAmount = Math.max(0, totalContractValue - paidAmount);
      const arStatus = mapReceivableStatus(row.periodStatus ?? "pending", remainingAmount);
      return {
        billingPeriodId: row.id,
        customerId: row.customerId,
        customerName: row.customerName ?? "Unknown",
        contractId: row.contractId,
        contractCode: row.contractCode ?? "—",
        periodLabel: row.label,
        totalContractValue,
        paidAmount,
        remainingAmount,
        dueDate: row.dueDate,
        status: arStatus,
      };
    })
    .filter((item) => {
      if (item.remainingAmount <= 0 && item.status === "paid") {
        return status === "paid";
      }
      if (status && item.status !== status) return false;
      if (customerId && item.customerId !== customerId) return false;
      if (!status && item.status === "paid") return false;
      return item.remainingAmount > 0 || status === "paid";
    });

  const total = items.length;
  const paginated = items.slice(offset, offset + limit);
  const totalReceivable = items
    .filter((item) => item.status !== "paid")
    .reduce((sum, item) => sum + item.remainingAmount, 0);

  return res.json({
    data: paginated,
    total,
    page,
    limit,
    totalReceivable: Math.round(totalReceivable * 100) / 100,
  });
});

router.get("/accounts-payable", async (req, res) => {
  const query = ListAccountsPayableQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { status, supplierId, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  const rows = await db
    .select({
      supplierId: expensesTable.supplierId,
      supplierName: suppliersTable.name,
      category: expensesTable.category,
      total: sql<string>`sum(${expensesTable.amount}::numeric)`,
    })
    .from(expensesTable)
    .leftJoin(suppliersTable, eq(expensesTable.supplierId, suppliersTable.id))
    .groupBy(expensesTable.supplierId, suppliersTable.name, expensesTable.category);

  const items = rows
    .filter((r) => r.supplierId !== null)
    .map((r) => {
      const totalAmount = parseFloat(r.total ?? "0");
      const paidAmount = 0;
      const remainingAmount = totalAmount - paidAmount;
      const arStatus = remainingAmount <= 0 ? "paid" : "unpaid";
      return {
        supplierId: r.supplierId!,
        supplierName: r.supplierName ?? "Unknown",
        category: r.category,
        totalAmount,
        paidAmount,
        remainingAmount,
        status: arStatus,
      };
    })
    .filter((item) => {
      if (status && item.status !== status) return false;
      if (supplierId && item.supplierId !== supplierId) return false;
      return true;
    });

  const total = items.length;
  const paginated = items.slice(offset, offset + limit);
  const totalPayable = items
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.remainingAmount, 0);

  return res.json({
    data: paginated,
    total,
    page,
    limit,
    totalPayable: Math.round(totalPayable * 100) / 100,
  });
});

export default router;
