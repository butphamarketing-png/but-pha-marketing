export type ExpenseVatInput = {
  amount: number;
  hasVatInvoice?: boolean;
  vatRate?: number;
};

export type ExpenseVatBreakdown = {
  hasVatInvoice: boolean;
  vatRate: number;
  subtotal: number;
  vatAmount: number;
  amount: number;
};

export function computeExpenseVat(input: ExpenseVatInput): ExpenseVatBreakdown {
  const amount = Math.max(0, input.amount);
  const hasVatInvoice = Boolean(input.hasVatInvoice);
  const vatRate = hasVatInvoice ? Math.max(0, input.vatRate ?? 8) : 0;

  if (!hasVatInvoice || amount <= 0) {
    return { hasVatInvoice: false, vatRate: 0, subtotal: amount, vatAmount: 0, amount };
  }

  const subtotal = Math.round((amount / (1 + vatRate / 100)) * 100) / 100;
  const vatAmount = Math.round((amount - subtotal) * 100) / 100;
  return { hasVatInvoice: true, vatRate, subtotal, vatAmount, amount };
}

export function resolveExpenseVatFromBody(
  body: Record<string, unknown>,
  amount: number,
): ExpenseVatBreakdown {
  return computeExpenseVat({
    amount,
    hasVatInvoice: Boolean(body.hasVatInvoice),
    vatRate: body.vatRate != null ? Number(body.vatRate) : undefined,
  });
}
