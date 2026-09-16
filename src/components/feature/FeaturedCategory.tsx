import Image from "next/image";
import Link from "next/link";

const listCategories = [
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Vitamin & Khoáng chất",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Sinh lý - Nội tiết tố",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Tim mạch - Huyết áp",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Miễn dịch - Đề kháng",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Tiêu hóa",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Chăm sóc da mặt",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Hỗ trợ làm đẹp",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Hỗ trợ sinh lý",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Sữa",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Theo dõi sức khoẻ",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Chăm sóc mẹ và bé",
    slug: "/danh-muc/thuoc",
  },
];

const FeaturedCategory = () => {
  return (
    <div className="mt-5">
      <div className="flex flex-row gap-2">
        <div className="flex">
          <div className="relative m-auto h-8 w-8 shrink-0">
            <Image
              src="/img/icon/danh_muc_noi_bat.webp"
              fill
              className="object-contain "
              alt="image"
            />
          </div>
        </div>
        <h1 className="my-5 text-xl font-medium">Danh mục nổi bật</h1>
      </div>
      <div className="grid gap-4 lg:gap-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {listCategories.map((item: any, index) => {
          return (
            <Link
              key={index}
              href="/danh-muc/thuoc"
              className="bg-white flex flex-col justify-center w-full h-24 sm:h-32 xl:h-36 p-3 items-center m-auto rounded-2xl"
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
    </div>
  );
};

export default FeaturedCategory;
