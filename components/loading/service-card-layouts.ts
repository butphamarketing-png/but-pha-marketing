export type ServiceCardLayout = {
  id: string;
  label: string;
  xVw: number;
  yVh: number;
  nx: number;
  ny: number;
  /** Facebook nổi bật hơn ở giữa */
  scale?: number;
};

/** Tam giác cân — chừa trung tâm cho logo hội tụ */
export const SERVICE_CARD_LAYOUTS: ServiceCardLayout[] = [
  { id: "website", label: "Website", xVw: -38, yVh: 10, nx: 11, ny: 54, scale: 1 },
  { id: "facebook", label: "Facebook", xVw: 0, yVh: -34, nx: 50, ny: 12, scale: 1.12 },
  { id: "maps", label: "Google Maps", xVw: 38, yVh: 10, nx: 89, ny: 54, scale: 1 },
];

export function layoutOffsetPx(layout: ServiceCardLayout, width: number, height: number) {
  return {
    x: (layout.xVw / 100) * width,
    y: (layout.yVh / 100) * height,
  };
}
