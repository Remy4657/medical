import { ArrowLeftRight, ShieldCheck, ThumbsUp, Truck } from "lucide-react";

const listFeatures = [
  {
    name: "Thuốc chính hãng",
    extraName: "đa dạng và chuyên sâu",
    image: (
      <ShieldCheck
        size={40}
        strokeWidth={2.5}
        className="text-blue-800 font-bold"
      />
    ),
  },
  {
    name: "Đổi trả trong 30 ngày",
    extraName: "kể từ ngày mua hàng",
    image: (
      <ArrowLeftRight
        size={40}
        strokeWidth={2.5}
        className="text-blue-800 font-bold"
      />
    ),
  },
  {
    name: "Cam kết 100%",
    extraName: "chất lượng sản phẩm",
    image: (
      <ThumbsUp
        size={40}
        strokeWidth={2.5}
        className="text-blue-800 font-bold"
      />
    ),
  },
  {
    name: "Miễn phí vận chuyển",
    extraName: "theo chính sách giao hàng",
    image: (
      <Truck size={40} strokeWidth={2.5} className="text-blue-800 font-bold" />
    ),
  },
];

const FeaturePrivacy = () => {
  return (
    <div className="flex bg-primary/10 py-5 mt-20">
      <div className="mx-auto w-full max-w-7xl grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {listFeatures.map((item: any, index) => {
          return (
            <div
              key={index}
              className="bg-transparent  flex flex-row justify-start w-full h-24 sm:28 items-center m-auto rounded-2xl gap-5"
            >
              <div>{item.image}</div>
              <div className="flex flex-col">
                <span className="text-left font-bold text-xl text-gray-600">
                  {item.name}
                </span>
                <span className="text-left text-gray-500 text-md">
                  {item.extraName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturePrivacy;
