// app/api/v1/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Laptop", price: 1500 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Headphones", price: 200 },
  ];

  return NextResponse.json({
    data: products,
    message: "Danh sách sản phẩm",
  });
}
