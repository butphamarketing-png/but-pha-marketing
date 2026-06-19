import { Router } from "express";
import {
  db,
  billingPeriodsTable,
  contractsTable,
  customersTable,
  expensesTable,
  suppliersTable,
} from "@/lib/cms-internal/db";
import { eq, sql, inArray, desc } from "drizzle-orm";
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

  const contractRows = await db
    .select({
      contractId: contractsTable.id,
      contractCode: contractsTable.code,
      customerId: contractsTable.customerId,
      customerName: customersTable.name,
      totalValue: contractsTable.totalValue,
      paidAmount: contractsTable.paidAmount,
      dueDate: contractsTable.dueDate,
    })
    .from(contractsTable)
    .leftJoin(customersTable, eq(contractsTable.customerId, customersTable.id))
    .where(eq(contractsTable.status, "active"))
    .orderBy(contractsTable.dueDate);

  const contractIds = contractRows.map((row) => row.contractId);
  const periodRows =
    contractIds.length > 0
      ? await db
          .select({
            id: billingPeriodsTable.id,
            contractId: billingPeriodsTable.contractId,
            periodStatus: billingPeriodsTable.status,
            label: billingPeriodsTable.label,
          })
          .from(billingPeriodsTable)
          .where(inArray(billingPeriodsTable.contractId, contractIds))
          .orderBy(desc(billingPeriodsTable.id))
      : [];

  const latestPeriodByContract = new Map<number, (typeof periodRows)[number]>();
  for (const period of periodRows) {
    if (!latestPeriodByContract.has(period.contractId)) {
      latestPeriodByContract.set(period.contractId, period);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  const items = contractRows
    .map((row) => {
      const totalContractValue = parseFloat(row.totalValue ?? "0");
      const paidAmount = parseFloat(row.paidAmount ?? "0");
      const remainingAmount = Math.max(0, Math.round((totalContractValue - paidAmount) * 100) / 100);
      const period = latestPeriodByContract.get(row.contractId);
      const dueDate = row.dueDate ?? today;
      const periodStatus =
        remainingAmount <= 0
          ? "paid"
          : dueDate < today
            ? "overdue"
            : paidAmount > 0
              ? "partial"
              : "pending";
      const arStatus = mapReceivableStatus(periodStatus, remainingAmount);
      return {
        billingPeriodId: period?.id ?? null,
        customerId: row.customerId,
        customerName: row.customerName ?? "Unknown",
        contractId: row.contractId,
        contractCode: row.contractCode ?? "—",
        periodLabel: period?.label ?? null,
        totalContractValue,
        paidAmount,
        remainingAmount,
        dueDate,
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
      totalAmount: sql<string>`COALESCE(sum(${expensesTable.amount}::numeric), 0)`,
      paidAmount: sql<string>`COALESCE(sum(case when ${expensesTable.paymentStatus} = 'paid' then ${expensesTable.amount}::numeric else 0 end), 0)`,
      unpaidAmount: sql<string>`COALESCE(sum(case when ${expensesTable.paymentStatus} != 'paid' then ${expensesTable.amount}::numeric else 0 end), 0)`,
    })
    .from(expensesTable)
    .leftJoin(suppliersTable, eq(expensesTable.supplierId, suppliersTable.id))
    .where(sql`${expensesTable.supplierId} is not null`)
    .groupBy(expensesTable.supplierId, suppliersTable.name);

  const items = rows
    .filter((r) => r.supplierId !== null)
    .map((r) => {
      const totalAmount = parseFloat(r.totalAmount ?? "0");
      const paidAmount = parseFloat(r.paidAmount ?? "0");
      const remainingAmount = parseFloat(r.unpaidAmount ?? "0");
      const arStatus =
        remainingAmount <= 0 ? "paid" : paidAmount > 0 ? "partial" : "unpaid";
      return {
        supplierId: r.supplierId!,
        supplierName: r.supplierName ?? "Unknown",
        category: null,
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
