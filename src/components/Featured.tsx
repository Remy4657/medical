"use client";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const listFeatures = [
  {
    name: "Đơn hàng",
    slug: "/don-hang-cua-toi",
  },
  {
    name: "Tra thuốc chính hãng",
    slug: "/thuoc",
  },
  {
    name: "Tìm nhà thuốc",
    slug: "/thuoc",
  },
  {
    name: "Sản phẩm",
    slug: "/thuoc",
  },
  {
    name: "Tư vấn với dược sĩ",
    slug: "/thuoc",
  },
];

const Features = () => {
  const router = useRouter();
  const isLoggedIn = useCartStore((state) => state.isLoggedIn);

  const handleClick = (e: any, slug: string) => {
    if (slug === "/don-hang-cua-toi") {
      e.preventDefault();
      if (isLoggedIn) {
        router.push(slug);
      } else {
        (
          document.getElementById("modal_login") as HTMLDialogElement
        ).showModal();
      }
      console.log("click");
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
