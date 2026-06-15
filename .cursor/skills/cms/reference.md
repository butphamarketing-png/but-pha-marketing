# CMS Reference

## Menu structure (source: `layout.tsx`)

- Tổng Quan, Khách Hàng
- Tài Sản Số (website / facebook / google trees)
- Quản Lý: Dịch Vụ, NCC
- Thu — Chi: Phiếu Thu/Chi, HĐ, Công Nợ, Phải Trả NCC, **Kỳ Thu**
- Báo Cáo: doanh thu, lợi nhuận, chênh lệch DT, tuổi nợ, đối soát HĐ, kỳ thu theo tháng, ghi nhận DT, …
- Thuế: redirect to Next.js `/cms/tax/*`

## Dual customer systems

| System | Storage | Edit UI |
|--------|---------|---------|
| Marketing CRM | Supabase / JSON backup | `/cms/khach-hang` |
| ERP customers | `erp.customers` | read-only list; sync via backup restore |

Mitigation: backup restore banner when `serverBackup.count > customers.length`.

## Patch script policy

Patches in `scripts/patch-cms-*.mjs` are **legacy**. New work goes in ERP source. Patches should `console.warn` and skip on missing anchors, never `process.exit(1)` (except missing bundle file).
