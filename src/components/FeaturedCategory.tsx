import Image from "next/image";
import Link from "next/link";

const listCategories = [
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
  {
    name: "Thần kinh não",
    slug: "/danh-muc/thuoc",
  },
];

const FeaturedCategory = () => {
  return (
    <div>
      <h1 className="my-5 text-xl font-medium">Danh mục nổi bật</h1>
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
              <span className="text-center">Thần kinh não</span>
            </Link>
          );
        })}
      </div>
      <div>hi</div>
    </div>
  );
};

export default FeaturedCategory;
