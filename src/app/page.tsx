import ListProducts from "@/components/product/ListProducts";
import { getAllProducts } from "@/services/categoryService";
import { Product } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = await getAllProducts();
  // const products: Product[] = [
  //   {
  //     id: 1,
  //     slug: "may-do-huyet-ap",
  //     name: "Máy đo huyết áp điện tử",
  //     category: "Thuốc",
  //     description: "Máy đo huyết áp tự động, màn hình lớn",
  //     price_cents: 450000,
  //     currency: "usd",
  //     image_url: null,
  //     image_kit_file_id: null,
  //     active: true,
  //     created_at: "2026-07-23T22:24:47.301Z",
  //   },
  //   {
  //     id: 2,
  //     slug: "khau-trang-y-te",
  //     name: "Khẩu trang y tế 4 lớp",
  //     category: "Thực phẩm chức năng",
  //     description: "Khẩu trang dùng một lần, hộp 50 cái",
  //     price_cents: 120000,
  //     currency: "usd",
  //     image_url: null,
  //     image_kit_file_id: null,
  //     active: true,
  //     created_at: "2026-07-23T22:24:47.301Z",
  //   },
  //   {
  //     id: 3,
  //     slug: "nhiet-ke-hong-ngoai",
  //     name: "Nhiệt kế hồng ngoại",
  //     category: "Thuốc",
  //     description: "Đo nhiệt độ nhanh, không tiếp xúc",
  //     price_cents: 350000,
  //     currency: "usd",
  //     image_url: null,
  //     image_kit_file_id: null,
  //     active: true,
  //     created_at: "2026-07-23T22:24:47.301Z",
  //   },
  //   {
  //     id: 4,
  //     slug: "bang-gac-tiet-trung",
  //     name: "Băng gạc tiệt trùng",
  //     category: "Thực phẩm chức năng",
  //     description: "Gạc bông y tế, hộp 100 miếng",
  //     price_cents: 75000,
  //     currency: "usd",
  //     image_url: null,
  //     image_kit_file_id: null,
  //     active: true,
  //     created_at: "2026-07-23T22:24:47.301Z",
  //   },
  //   {
  //     id: 5,
  //     slug: "paracetamol-500mg",
  //     name: "Paracetamol 500mg",
  //     category: "Thuốc",
  //     description: "Hộp 20 viên, giảm đau hạ sốt",
  //     price_cents: 45000,
  //     currency: "usd",
  //     image_url: null,
  //     image_kit_file_id: null,
  //     active: true,
  //     created_at: "2026-07-23T22:24:47.301Z",
  //   },
  // ];
  return <ListProducts listProducts={products} />;
}
