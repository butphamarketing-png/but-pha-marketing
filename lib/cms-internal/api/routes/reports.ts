import { Router } from "express";
import { db, receiptsTable, expensesTable, contractsTable, customersTable, servicesTable, billingPeriodsTable } from "@/lib/cms-internal/db";
import { sql, gte, lte, and, eq, inArray } from "drizzle-orm";
import { GetRevenueReportQueryParams, GetExpenseReportQueryParams, GetProfitReportQueryParams, GetCashFlowReportQueryParams, GetCustomerReportQueryParams, GetServiceReportQueryParams } from "@/lib/cms-internal/api-zod";
import {
  AGING_BUCKET_LABELS,
  computeAgingBucket,
  getRecognizedRevenueForMonth,
  type AgingBucketKey,
} from "@/lib/cms-revenue-recognition";
import { getInvoiceReconciliationReport } from "@/lib/cms-invoices";

const router = Router();

const MONTH_LABELS = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

function periodBounds(period: string, index: number, year: number): { fromDate: string; toDate: string; label: string } {
  if (period === "monthly") {
    const fromDate = `${year}-${String(index + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, index + 1, 0).getDate();
    const toDate = `${year}-${String(index + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return { fromDate, toDate, label: `${MONTH_LABELS[index]}/${year}` };
  }
  if (period === "quarterly") {
    const startMonth = index * 3 + 1;
    const endMonth = startMonth + 2;
    const fromDate = `${year}-${String(startMonth).padStart(2, "0")}-01`;
    const lastDay = new Date(year, endMonth, 0).getDate();
    const toDate = `${year}-${String(endMonth).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return { fromDate, toDate, label: `Q${index + 1}/${year}` };
  }
  const y = year - 4 + index;
  return { fromDate: `${y}-01-01`, toDate: `${y}-12-31`, label: String(y) };
}

router.get("/reports/revenue", async (req, res) => {
  const query = GetRevenueReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { period = "monthly", year = new Date().getFullYear() } = query.data;
  const count = period === "monthly" ? 12 : period === "quarterly" ? 4 : 5;

  const items = [];
  for (let i = 0; i < count; i++) {
    const { fromDate, toDate, label } = periodBounds(period, i, year);
    const [result] = await db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` })
      .from(receiptsTable).where(and(gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate)));
    items.push({ label, amount: parseFloat(result.total), breakdown: [] });
  }
  return res.json({ period, year, total: items.reduce((s, i) => s + i.amount, 0), items });
});

router.get("/reports/expenses", async (req, res) => {
  const query = GetExpenseReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { period = "monthly", year = new Date().getFullYear() } = query.data;
  const count = period === "monthly" ? 12 : period === "quarterly" ? 4 : 5;

  const items = [];
  for (let i = 0; i < count; i++) {
    const { fromDate, toDate, label } = periodBounds(period, i, year);
    const [result] = await db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` })
      .from(expensesTable).where(and(gte(expensesTable.expenseDate, fromDate), lte(expensesTable.expenseDate, toDate)));
    items.push({ label, amount: parseFloat(result.total), breakdown: [] });
  }
  return res.json({ period, year, total: items.reduce((s, i) => s + i.amount, 0), items });
});

router.get("/reports/profit", async (req, res) => {
  const query = GetProfitReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { period = "monthly", year = new Date().getFullYear() } = query.data;
  const count = period === "monthly" ? 12 : period === "quarterly" ? 4 : 5;

  const items = [];
  for (let i = 0; i < count; i++) {
    const { fromDate, toDate, label } = periodBounds(period, i, year);
    const [rev, exp] = await Promise.all([
      db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` }).from(receiptsTable)
        .where(and(gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))),
      db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` }).from(expensesTable)
        .where(and(gte(expensesTable.expenseDate, fromDate), lte(expensesTable.expenseDate, toDate))),
    ]);
    const revenue = parseFloat(rev[0].total);
    const expenses = parseFloat(exp[0].total);
    items.push({ label, revenue, expenses, profit: revenue - expenses });
  }

  const totalRevenue = items.reduce((s, i) => s + i.revenue, 0);
  const totalExpenses = items.reduce((s, i) => s + i.expenses, 0);
  return res.json({ period, year, totalRevenue, totalExpenses, totalProfit: totalRevenue - totalExpenses, items });
});

router.get("/reports/cash-flow", async (req, res) => {
  const query = GetCashFlowReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });

  const now = new Date();
  const fromDate = query.data.fromDate ? String(query.data.fromDate) : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const toDate = query.data.toDate ? String(query.data.toDate) : now.toISOString().split("T")[0];

  const [receipts, expenses] = await Promise.all([
    db.select().from(receiptsTable).where(and(gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))).orderBy(receiptsTable.receiptDate),
    db.select().from(expensesTable).where(and(gte(expensesTable.expenseDate, fromDate), lte(expensesTable.expenseDate, toDate))).orderBy(expensesTable.expenseDate),
  ]);

  const allItems = [
    ...receipts.map((r) => ({ date: r.receiptDate, type: "inflow", description: `Thu - ${r.code}`, amount: parseFloat(r.amount) })),
    ...expenses.map((e) => ({ date: e.expenseDate, type: "outflow", description: `Chi - ${e.code} (${e.category})`, amount: parseFloat(e.amount) })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const totalInflow = receipts.reduce((s, r) => s + parseFloat(r.amount), 0);
  const totalOutflow = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);

  let balance = 0;
  const itemsWithBalance = allItems.map((item) => {
    if (item.type === "inflow") balance += item.amount;
    else balance -= item.amount;
    return { ...item, balance };
  });

  return res.json({
    totalInflow, totalOutflow, netCashFlow: totalInflow - totalOutflow,
    openingBalance: 0, closingBalance: balance, items: itemsWithBalance,
  });
});

router.get("/reports/by-customer", async (req, res) => {
  const query = GetCustomerReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { year = new Date().getFullYear(), month } = query.data;

  const fromDate = month ? `${year}-${String(month).padStart(2, "0")}-01` : `${year}-01-01`;
  const toDate = month
    ? `${year}-${String(month).padStart(2, "0")}-${String(new Date(year, month, 0).getDate()).padStart(2, "0")}`
    : `${year}-12-31`;

  const customers = await db.select().from(customersTable);
  const results = [];

  for (const customer of customers) {
    const [rev, contracts] = await Promise.all([
      db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` }).from(receiptsTable)
        .where(and(eq(receiptsTable.customerId, customer.id), gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))),
      db.select({ totalValue: contractsTable.totalValue, paidAmount: contractsTable.paidAmount })
        .from(contractsTable).where(eq(contractsTable.customerId, customer.id)),
    ]);

    const revenue = parseFloat(rev[0].total);
    const receivable = contracts.reduce((s, c) => s + Math.max(0, parseFloat(c.totalValue ?? "0") - parseFloat(c.paidAmount ?? "0")), 0);

    if (revenue > 0 || receivable > 0) {
      results.push({ customerId: customer.id, customerName: customer.name, revenue, expenses: 0, profit: revenue, receivable });
    }
  }

  return res.json(results);
});

router.get("/reports/by-service", async (req, res) => {
  const query = GetServiceReportQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { year = new Date().getFullYear(), month } = query.data;

  const fromDate = month ? `${year}-${String(month).padStart(2, "0")}-01` : `${year}-01-01`;
  const toDate = month
    ? `${year}-${String(month).padStart(2, "0")}-${String(new Date(year, month, 0).getDate()).padStart(2, "0")}`
    : `${year}-12-31`;

  const services = await db.select().from(servicesTable);
  const serviceTypes = [...new Set(services.map((s) => s.type))];

  const results = [];
  for (const type of serviceTypes) {
    const typeServices = services.filter((s) => s.type === type);
    let revenue = 0;
    let expenses = 0;
    for (const svc of typeServices) {
      const [rev, exp] = await Promise.all([
        db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` }).from(receiptsTable)
          .where(and(eq(receiptsTable.serviceId, svc.id), gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))),
        db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` }).from(expensesTable)
          .where(and(eq(expensesTable.serviceId, svc.id), gte(expensesTable.expenseDate, fromDate), lte(expensesTable.expenseDate, toDate))),
      ]);
      revenue += parseFloat(rev[0].total);
      expenses += parseFloat(exp[0].total);
    }
    results.push({ serviceType: type, revenue, expenses, profit: revenue - expenses });
  }

  return res.json(results);
});

router.get("/reports/billing-periods", async (req, res) => {
  const year = req.query.year ? parseInt(String(req.query.year)) : new Date().getFullYear();
  const items = [];

  for (let month = 1; month <= 12; month += 1) {
    const fromDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const toDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const rows = await db.select().from(billingPeriodsTable).where(
      and(gte(billingPeriodsTable.dueDate, fromDate), lte(billingPeriodsTable.dueDate, toDate)),
    );

    const amountDue = rows.reduce((sum, row) => sum + parseFloat(row.amountDue ?? "0"), 0);
    const amountPaid = rows.reduce((sum, row) => sum + parseFloat(row.amountPaid ?? "0"), 0);
    const remaining = rows.reduce((sum, row) => {
      const due = parseFloat(row.amountDue ?? "0");
      const paid = parseFloat(row.amountPaid ?? "0");
      return sum + Math.max(0, due - paid);
    }, 0);

    items.push({
      month,
      label: `${MONTH_LABELS[month - 1]}/${year}`,
      periodCount: rows.length,
      amountDue,
      amountPaid,
      remaining,
      paidCount: rows.filter((row) => row.status === "paid").length,
      overdueCount: rows.filter((row) => row.status === "overdue").length,
    });
  }

  return res.json({
    year,
    totalDue: items.reduce((sum, item) => sum + item.amountDue, 0),
    totalPaid: items.reduce((sum, item) => sum + item.amountPaid, 0),
    totalRemaining: items.reduce((sum, item) => sum + item.remaining, 0),
    items,
  });
});

router.get("/reports/revenue-comparison", async (req, res) => {
  const year = req.query.year ? parseInt(String(req.query.year)) : new Date().getFullYear();
  const items = [];

  for (let month = 1; month <= 12; month += 1) {
    const fromDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const toDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const [cashResult, recognizedRevenue] = await Promise.all([
      db.select({ total: sql<string>`COALESCE(sum(amount::numeric), 0)` })
        .from(receiptsTable)
        .where(and(gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))),
      getRecognizedRevenueForMonth(year, month),
    ]);

    const cashRevenue = parseFloat(cashResult[0]?.total ?? "0");
    items.push({
      month,
      label: `${MONTH_LABELS[month - 1]}/${year}`,
      cashRevenue,
      recognizedRevenue,
      gap: Math.round((recognizedRevenue - cashRevenue) * 100) / 100,
    });
  }

  return res.json({
    year,
    totalCashRevenue: items.reduce((sum, item) => sum + item.cashRevenue, 0),
    totalRecognizedRevenue: items.reduce((sum, item) => sum + item.recognizedRevenue, 0),
    totalGap: items.reduce((sum, item) => sum + item.gap, 0),
    items,
  });
});

router.get("/reports/ar-aging", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const rows = await db
    .select({
      id: billingPeriodsTable.id,
      customerId: billingPeriodsTable.customerId,
      customerName: customersTable.name,
      contractId: billingPeriodsTable.contractId,
      contractCode: contractsTable.code,
      dueDate: billingPeriodsTable.dueDate,
      amountDue: billingPeriodsTable.amountDue,
      amountPaid: billingPeriodsTable.amountPaid,
      status: billingPeriodsTable.status,
      label: billingPeriodsTable.label,
    })
    .from(billingPeriodsTable)
    .leftJoin(customersTable, eq(billingPeriodsTable.customerId, customersTable.id))
    .leftJoin(contractsTable, eq(billingPeriodsTable.contractId, contractsTable.id))
    .where(inArray(billingPeriodsTable.status, ["pending", "partial", "overdue"]))
    .orderBy(billingPeriodsTable.dueDate);

  type Bucket = {
    key: AgingBucketKey;
    label: string;
    count: number;
    amount: number;
    items: Array<{
      id: number;
      customerId: number;
      customerName: string;
      contractCode: string | null;
      dueDate: string;
      remainingAmount: number;
      status: string;
      label: string | null;
      daysPastDue: number;
    }>;
  };

  const bucketKeys: AgingBucketKey[] = ["current", "days1_30", "days31_60", "days61_90", "over90"];
  const buckets: Record<AgingBucketKey, Bucket> = {
    current: { key: "current", label: AGING_BUCKET_LABELS.current, count: 0, amount: 0, items: [] },
    days1_30: { key: "days1_30", label: AGING_BUCKET_LABELS.days1_30, count: 0, amount: 0, items: [] },
    days31_60: { key: "days31_60", label: AGING_BUCKET_LABELS.days31_60, count: 0, amount: 0, items: [] },
    days61_90: { key: "days61_90", label: AGING_BUCKET_LABELS.days61_90, count: 0, amount: 0, items: [] },
    over90: { key: "over90", label: AGING_BUCKET_LABELS.over90, count: 0, amount: 0, items: [] },
  };

  for (const row of rows) {
    const amountDue = parseFloat(row.amountDue ?? "0");
    const amountPaid = parseFloat(row.amountPaid ?? "0");
    const remainingAmount = Math.max(0, amountDue - amountPaid);
    if (remainingAmount <= 0) continue;

    const due = new Date(`${row.dueDate}T12:00:00`);
    const now = new Date(`${today}T12:00:00`);
    const daysPastDue = Math.floor((now.getTime() - due.getTime()) / 86_400_000);
    const bucketKey = computeAgingBucket(row.dueDate, today);
    const bucket = buckets[bucketKey];

    bucket.count += 1;
    bucket.amount += remainingAmount;
    bucket.items.push({
      id: row.id,
      customerId: row.customerId,
      customerName: row.customerName ?? "Unknown",
      contractCode: row.contractCode ?? null,
      dueDate: row.dueDate,
      remainingAmount,
      status: row.status,
      label: row.label,
      daysPastDue,
    });
  }

  const bucketList = bucketKeys.map((key) => ({
    ...buckets[key],
    amount: Math.round(buckets[key].amount * 100) / 100,
  }));

  return res.json({
    asOf: today,
    totalOutstanding: Math.round(bucketList.reduce((sum, bucket) => sum + bucket.amount, 0) * 100) / 100,
    totalCount: bucketList.reduce((sum, bucket) => sum + bucket.count, 0),
    buckets: bucketList,
  });
});

router.get("/reports/invoice-reconciliation", async (_req, res) => {
  try {
    return res.json(await getInvoiceReconciliationReport());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
