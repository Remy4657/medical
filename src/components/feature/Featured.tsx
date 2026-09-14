"use client";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const listFeatures = [
  {
    name: "Đơn hàng",
    slug: "/ca-nhan/don-hang-cua-toi",
    image: "/img/icon/category/lichsudonhang.webp",
  },
  {
    name: "Tra thuốc chính hãng",
    slug: "https://dichvucong.dav.gov.vn/congbothuoc/index",
    image: "/img/icon/category/trathuoc.webp",
  },
  {
    name: "Tìm nhà thuốc",
    slug: "https://maps.app.goo.gl/zHP3b7U58u5kyfWn8",
    isNewBlank: true,
    image: "/img/icon/category/timnhathuoc.webp",
  },
  {
    name: "Sản phẩm",
    slug: "/danh-muc/thuoc",
    image: "/img/icon/category/sanpham.webp",
  },
  {
    name: "Tư vấn với dược sĩ",
    slug: "https://zalo.me/812843995673624521",
    isNewBlank: true,
    image: "/img/icon/category/tuvanvoiduocsi.webp",
  },
];

const Features = () => {
  const router = useRouter();
  const isLoggedIn = useCartStore((state) => state.isLoggedIn);

  const handleClick = (e: any, slug: string) => {
    if (slug === "/ca-nhan/don-hang-cua-toi") {
      e.preventDefault();
      if (isLoggedIn) {
        router.push(slug);
      } else {
        (
          document.getElementById("modal_login") as HTMLDialogElement
        ).showModal();
      }
    }
  };
  return (
    <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-7">
      {listFeatures.map((item: any, index) => {
        return (
          <Link
            key={index}
            href={item.slug}
            className="bg-white flex flex-row justify-center w-full h-24 sm:28 p-3 items-center m-auto rounded-2xl gap-2"
            onClick={(e) => {
              handleClick(e, item.slug);
            }}
            target={item.isNewBlank ? "_blank" : "_self"}
          >
            <Image
              src={item.image ?? "/img/placeholder.webp"}
              width={40}
              height={20}
              alt=""
              className=""
            />
            <span className="text-center">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Features;
