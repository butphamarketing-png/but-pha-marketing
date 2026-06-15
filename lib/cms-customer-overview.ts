import {
  db,
  customersTable,
  contractsTable,
  billingPeriodsTable,
  receiptsTable,
  invoicesTable,
  expensesTable,
  servicesTable,
} from "@/lib/cms-internal/db";
import { eq, desc, sql, inArray } from "drizzle-orm";
import { serializeBillingPeriod } from "@/lib/cms-billing-periods";
import { loadMarketingCustomerByExternalId } from "@/lib/cms-resync-from-marketing";

export async function getCustomerOverview(customerId: number) {
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, customerId))
    .limit(1);

  if (!customer) return null;

  const [contracts, billingPeriods, receipts, invoices, expenses] = await Promise.all([
    db.select().from(contractsTable).where(eq(contractsTable.customerId, customerId)).orderBy(desc(contractsTable.startDate)),
    db.select().from(billingPeriodsTable).where(eq(billingPeriodsTable.customerId, customerId)).orderBy(desc(billingPeriodsTable.dueDate)),
    db.select().from(receiptsTable).where(eq(receiptsTable.customerId, customerId)).orderBy(desc(receiptsTable.receiptDate)).limit(50),
    db.select().from(invoicesTable).where(eq(invoicesTable.customerId, customerId)).orderBy(desc(invoicesTable.issueDate)).limit(50),
    db.select().from(expensesTable).where(eq(expensesTable.customerId, customerId)).orderBy(desc(expensesTable.expenseDate)).limit(50),
  ]);

  const totalRevenue = receipts.reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);
  const totalExpenses = expenses.reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);
  const totalReceivable = billingPeriods.reduce((sum, row) => {
    const due = parseFloat(row.amountDue ?? "0");
    const paid = parseFloat(row.amountPaid ?? "0");
    return sum + Math.max(0, due - paid);
  }, 0);

  const serviceIds = contracts.map((c) => c.serviceId).filter((id): id is number => id != null);
  let services: { id: number; name: string; type: string }[] = [];
  if (serviceIds.length > 0) {
    services = await db
      .select({ id: servicesTable.id, name: servicesTable.name, type: servicesTable.type })
      .from(servicesTable)
      .where(inArray(servicesTable.id, serviceIds));
  }

  const serviceById = new Map(services.map((s) => [s.id, s]));

  let marketingFound = false;
  if (customer.externalId) {
    try {
      const marketingRow = await loadMarketingCustomerByExternalId(customer.externalId);
      marketingFound = Boolean(marketingRow);
    } catch {
      marketingFound = false;
    }
  }

  return {
    customer,
    contracts: contracts.map((contract) => ({
      ...contract,
      totalValue: parseFloat(contract.totalValue ?? "0"),
      paidAmount: parseFloat(contract.paidAmount ?? "0"),
      serviceName: contract.serviceId ? serviceById.get(contract.serviceId)?.name ?? null : null,
      serviceType: contract.serviceId ? serviceById.get(contract.serviceId)?.type ?? null : null,
    })),
    billingPeriods: billingPeriods.map(serializeBillingPeriod),
    receipts: receipts.map((row) => ({
      ...row,
      amount: parseFloat(row.amount ?? "0"),
    })),
    invoices: invoices.map((row) => ({
      ...row,
      subtotal: parseFloat(row.subtotal ?? "0"),
      vatAmount: parseFloat(row.vatAmount ?? "0"),
      totalAmount: parseFloat(row.totalAmount ?? "0"),
    })),
    expenses: expenses.map((row) => ({
      ...row,
      amount: parseFloat(row.amount ?? "0"),
    })),
    summary: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      profit: Math.round((totalRevenue - totalExpenses) * 100) / 100,
      totalReceivable: Math.round(totalReceivable * 100) / 100,
      contractCount: contracts.length,
      periodCount: billingPeriods.length,
      receiptCount: receipts.length,
      invoiceCount: invoices.length,
    },
    sync: {
      externalId: customer.externalId,
      linkedToMarketing: marketingFound,
      marketingAdminUrl: customer.externalId
        ? `/cms/khach-hang?highlight=${encodeURIComponent(customer.externalId)}`
        : null,
    },
  };
}
