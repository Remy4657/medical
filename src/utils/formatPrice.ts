export function formatPrice(price: string | undefined): string {
  return `${new Intl.NumberFormat("vi-VN").format(Number(price))} đ`;
}
