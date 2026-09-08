"use client";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const listFeatures = [
  {
    name: "Đơn hàng",
    slug: "/ca-nhan/don-hang-cua-toi",
  },
  {
    name: "Tra thuốc chính hãng",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Tìm nhà thuốc",
    slug: "https://maps.app.goo.gl/zHP3b7U58u5kyfWn8",
    isNewBlank: true,
  },
  {
    name: "Sản phẩm",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Tư vấn với dược sĩ",
    slug: "https://zalo.me/812843995673624521",
    isNewBlank: true,
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
    <div className="grid gap-5 grid-cols-5 mt-7">
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
              src="/img/icon/category/than_kinh_nao.webp"
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
