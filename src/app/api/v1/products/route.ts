// app/api/v1/products/route.ts
import { NextResponse } from "next/server";
import type { Product } from "@/types";

export async function GET() {
  const products: Product[] = [
    {
      id: 1,
      slug: "ao-thun-nam",
      name: "Áo thun nam cao cấp",
      category: "Áo thun",
      description: "Áo thun nam làm từ cotton égyptien 100%, Thở mát, thấm hút tốt, giữ formen даже sau nhiều lần giặt. Thiết kế đơn giản nhưng thanh lịch, phù hợp với mọi gelegenheit.",
      price_cents: 299000,
      currency: "VND",
      image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
      image_kit_file_id: null,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-893c56b7fa16?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596755094513-f4c0578cf56d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1602810318363-e382d269ac20?w=800&h=600&fit=crop",
      ],
      active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      slug: "quan-jeans-nu",
      name: "Quần jeans nữ формы кожаный",
      category: "Quần jeans",
      description: "Quần jeans nữ đường jean все-прямой кроя, damage effect tinh tế, độ co giãn tốt. Thiết kế 5 túi classis, phù hợp với mọi dáng dáng và phong cách.",
      price_cents: 599000,
      currency: "VND",
      image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
      image_kit_file_id: null,
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551048983-41f501d3772?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1573330113989-134f211004e0?w=800&h=600&fit=crop",
      ],
      active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      slug: "giay-the-thao-nam",
      name: "Giày thể thao nam stylish",
      category: "Giày dép",
      description: "Giày thể thao nam với thiết kế hiện đại, đế EVA mềm mại, bền đapas. Phù hợp cho cả chạy bộ và đi bộ hàng ngày, thoải máiMAX.",
      price_cents: 799000,
      currency: "VND",
      image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop",
      image_kit_file_id: null,
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542603293733-efd7b6e0d16b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560768832-650cd161d3fc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586433547754-d3c6b3c3a76b?w=800&h=600&fit=crop",
      ],
      active: true,
      created_at: new Date().toISOString(),
    },
  ];

  return NextResponse.json({
    data: products,
    message: "Danh sách sản phẩm",
  });
}
