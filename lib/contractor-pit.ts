export type ContractorPitInput = {
  grossAmount: number;
  pitRate?: number;
};

export type ContractorPitBreakdown = {
  grossAmount: number;
  pitRate: number;
  pitAmount: number;
  netAmount: number;
};

/** TNCN khấu trừ CTV dịch vụ: mặc định 10% trên tổng thanh toán. */
export function computeContractorPit(input: ContractorPitInput): ContractorPitBreakdown {
  const grossAmount = Math.max(0, input.grossAmount);
  const pitRate = Math.max(0, Math.min(100, input.pitRate ?? 10));
  const pitAmount = Math.round((grossAmount * pitRate) / 100 * 100) / 100;
  const netAmount = Math.round((grossAmount - pitAmount) * 100) / 100;
  return { grossAmount, pitRate, pitAmount, netAmount };
}

export function resolveContractorPitFromBody(
  body: Record<string, unknown>,
  grossAmount: number,
): ContractorPitBreakdown {
  return computeContractorPit({
    grossAmount,
    pitRate: body.pitRate != null ? Number(body.pitRate) : undefined,
  });
}
