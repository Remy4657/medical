import Image from "next/image";

const ListChildrenCategory = ({ listChildrenCategory }: any) => {
  return (
    <div className="my-5">
      <span className="font-bold text-lg">Danh mục sản phẩm</span>
      <div className="mt-3 flex flex-row gap-5 w-full overflow-x-auto scrollbar-hide">
        {listChildrenCategory.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-base-0 p-3 rounded-sm w-[250px] min-w-[200px]"
          >
            <Image
              src="/img/category/cate1.webp"
              width={70}
              height={70}
              alt="category"
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChildrenCategory;
