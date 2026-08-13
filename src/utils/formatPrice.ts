export function formatPrice(price: string | undefined): string {
  return `${new Intl.NumberFormat("vi-VN").format(Number(price))}đ`;
}
export function calculateDiscountPercent(
  oldPrice: string | undefined,
  newPrice: string | undefined,
): number {
  if (!oldPrice || !newPrice) return 0;

  const oldValue = Number(oldPrice);
  const newValue = Number(newPrice);

  if (oldValue <= 0 || newValue >= oldValue) return 0;

  return Math.round(((oldValue - newValue) / oldValue) * 100);
}
