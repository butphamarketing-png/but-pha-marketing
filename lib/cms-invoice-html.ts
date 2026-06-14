import { SITE_CONTACT } from "@/lib/site-contact";

export const INVOICE_SELLER = {
  name: process.env.COMPANY_NAME?.trim() || "CÔNG TY TNHH BỨT PHÁ MARKETING",
  taxId: process.env.COMPANY_TAX_ID?.trim() || "",
  address: process.env.COMPANY_ADDRESS?.trim() || SITE_CONTACT.address,
  phone: SITE_CONTACT.hotline,
  email: SITE_CONTACT.email,
  bankAccount: process.env.COMPANY_BANK_ACCOUNT?.trim() || "",
  bankName: process.env.COMPANY_BANK_NAME?.trim() || "",
};

export type InvoicePrintLine = {
  lineNo: number;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type InvoicePrintData = {
  code: string;
  status: string;
  issueDate: string;
  buyerName: string;
  buyerTaxId: string | null;
  buyerAddress: string | null;
  buyerEmail: string | null;
  buyerPhone: string | null;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  notes: string | null;
  contractCode: string | null;
  receiptCodes: string[];
  lines: InvoicePrintLine[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(amount));
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

export function renderInvoiceHtml(data: InvoicePrintData): string {
  const statusLabel =
    data.status === "issued" ? "Đã xuất" : data.status === "cancelled" ? "Đã hủy" : "Nháp";

  const lineRows = data.lines
    .map(
      (line) => `
      <tr>
        <td class="center">${line.lineNo}</td>
        <td>${escapeHtml(line.description)}</td>
        <td class="center">${escapeHtml(line.unit)}</td>
        <td class="right">${formatMoney(line.quantity)}</td>
        <td class="right">${formatMoney(line.unitPrice)}</td>
        <td class="right">${formatMoney(line.amount)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hóa đơn ${escapeHtml(data.code)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Segoe UI", Arial, sans-serif; color: #111; margin: 0; padding: 24px; background: #f3f4f6; }
    .page { max-width: 880px; margin: 0 auto; background: #fff; border: 1px solid #d1d5db; padding: 32px; }
    .header { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
    .brand h1 { margin: 0 0 8px; font-size: 22px; text-transform: uppercase; color: #1e3a8a; }
    .brand p { margin: 2px 0; font-size: 13px; line-height: 1.5; }
    .title { text-align: center; margin: 8px 0 24px; }
    .title h2 { margin: 0; font-size: 24px; letter-spacing: 1px; }
    .title p { margin: 6px 0 0; color: #4b5563; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .box { border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; }
    .box h3 { margin: 0 0 8px; font-size: 14px; color: #1e3a8a; }
    .box p { margin: 4px 0; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { border: 1px solid #d1d5db; padding: 8px; font-size: 13px; vertical-align: top; }
    th { background: #eff6ff; text-align: left; }
    .center { text-align: center; }
    .right { text-align: right; }
    .totals { margin-top: 16px; margin-left: auto; width: 320px; }
    .totals table { border: none; }
    .totals td { border: none; padding: 6px 0; }
    .totals .label { text-align: right; padding-right: 12px; color: #374151; }
    .totals .value { text-align: right; font-weight: 600; }
    .totals .grand td { border-top: 1px solid #111; padding-top: 10px; font-size: 16px; }
    .footer { margin-top: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 13px; }
    .sign { text-align: center; }
    .sign p { margin: 4px 0; }
    .muted { color: #6b7280; font-size: 12px; margin-top: 20px; }
    @media print {
      body { background: #fff; padding: 0; }
      .page { border: none; max-width: none; padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="brand">
        <h1>${escapeHtml(INVOICE_SELLER.name)}</h1>
        ${INVOICE_SELLER.taxId ? `<p>MST: ${escapeHtml(INVOICE_SELLER.taxId)}</p>` : ""}
        <p>Địa chỉ: ${escapeHtml(INVOICE_SELLER.address)}</p>
        <p>ĐT: ${escapeHtml(INVOICE_SELLER.phone)} · Email: ${escapeHtml(INVOICE_SELLER.email)}</p>
        ${INVOICE_SELLER.bankAccount ? `<p>TK: ${escapeHtml(INVOICE_SELLER.bankAccount)} — ${escapeHtml(INVOICE_SELLER.bankName)}</p>` : ""}
      </div>
      <div class="box">
        <h3>Thông tin hóa đơn</h3>
        <p><strong>Số:</strong> ${escapeHtml(data.code)}</p>
        <p><strong>Ngày:</strong> ${formatDate(data.issueDate)}</p>
        <p><strong>Trạng thái:</strong> ${statusLabel}</p>
        ${data.contractCode ? `<p><strong>HĐ:</strong> ${escapeHtml(data.contractCode)}</p>` : ""}
        ${data.receiptCodes.length ? `<p><strong>Phiếu thu:</strong> ${escapeHtml(data.receiptCodes.join(", "))}</p>` : ""}
      </div>
    </div>

    <div class="title">
      <h2>HÓA ĐƠN DỊCH VỤ NỘI BỘ</h2>
      <p>Mẫu nội bộ Bứt Phá Marketing — in trình duyệt để lưu PDF</p>
    </div>

    <div class="meta">
      <div class="box">
        <h3>Đơn vị mua hàng</h3>
        <p><strong>${escapeHtml(data.buyerName)}</strong></p>
        ${data.buyerTaxId ? `<p>MST: ${escapeHtml(data.buyerTaxId)}</p>` : ""}
        ${data.buyerAddress ? `<p>Địa chỉ: ${escapeHtml(data.buyerAddress)}</p>` : ""}
        ${data.buyerPhone ? `<p>ĐT: ${escapeHtml(data.buyerPhone)}</p>` : ""}
        ${data.buyerEmail ? `<p>Email: ${escapeHtml(data.buyerEmail)}</p>` : ""}
      </div>
      <div class="box">
        <h3>Ghi chú</h3>
        <p>${data.notes ? escapeHtml(data.notes) : "—"}</p>
        <p class="muted">Hóa đơn GTGT điện tử (HĐĐT) sẽ được tích hợp ở Pha 4.</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width:48px" class="center">STT</th>
          <th>Tên hàng hóa, dịch vụ</th>
          <th style="width:72px" class="center">ĐVT</th>
          <th style="width:80px" class="right">SL</th>
          <th style="width:120px" class="right">Đơn giá</th>
          <th style="width:120px" class="right">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${lineRows}
      </tbody>
    </table>

    <div class="totals">
      <table>
        <tr><td class="label">Cộng tiền hàng (chưa VAT):</td><td class="value">${formatMoney(data.subtotal)} đ</td></tr>
        <tr><td class="label">Thuế GTGT (${formatMoney(data.vatRate)}%):</td><td class="value">${formatMoney(data.vatAmount)} đ</td></tr>
        <tr class="grand"><td class="label">Tổng thanh toán:</td><td class="value">${formatMoney(data.totalAmount)} đ</td></tr>
      </table>
    </div>

    <div class="footer">
      <div class="sign">
        <p><strong>Người mua hàng</strong></p>
        <p>(Ký, ghi rõ họ tên)</p>
        <br /><br /><br />
      </div>
      <div class="sign">
        <p><strong>Người bán hàng</strong></p>
        <p>(Ký, đóng dấu)</p>
        <br /><br /><br />
      </div>
    </div>

    <p class="muted no-print">Mẹo: Ctrl+P (hoặc Cmd+P) → "Lưu thành PDF".</p>
  </div>
</body>
</html>`;
}
