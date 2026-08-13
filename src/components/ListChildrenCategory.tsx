import Image from "next/image";
import Link from "next/link";

const ListChildrenCategory = ({ listChildrenCategory }: any) => {
  return (
    <div className="my-5">
      <span className="font-bold text-lg">Danh mục sản phẩm</span>
      <div className="mt-3 flex flex-row gap-5 w-full overflow-x-auto scrollbar-hide">
        {listChildrenCategory.map((item: any) => (
          <Link key={item.id} href={`${item.slug}`}>
            <div className="flex flex-col items-center bg-base-0 p-3 rounded-2xl w-[250] min-w-[200]">
              <Image
                src="/img/category/cate1.webp"
                width={70}
                height={70}
                alt="category"
              />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListChildrenCategory;
