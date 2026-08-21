"use client";

import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { removeVietnameseTones } from "@/utils/removeVietnameseTones";
import { Trash2Icon, ChevronLeftIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Cart = ({ provinces }: { provinces: any }) => {
  const [isClickPovinceDropdown, setIsClickPrinceDropdown] = useState(false);
  const [isClickWardDropdown, setIsClickWardDropdown] = useState(false);

  const [selectedNameProvince, setSelectedNameProvince] = useState("");
  const [selectedCodeProvince, setSelectedCodeProvince] = useState("");

  const [searchKeyProvince, setSearchKeyProvince] = useState("");
  const [searchKeyWard, setSearchKeyWard] = useState("");

  const [selectedWard, setSelectedWard] = useState("");
  const [wards, setWards] = useState([]);

  const dropdownProvinceRef = useRef<HTMLDivElement>(null);
  const dropdownWardRef = useRef<HTMLDivElement>(null);

  const { items } = useCartStore();
  const { increase, decrease, remove } = useCart();

  // Click ra ngoài dropdown → đóng
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownProvinceRef.current &&
        !dropdownProvinceRef.current.contains(event.target)
      ) {
        setIsClickPrinceDropdown(false);
      }
      if (
        dropdownWardRef.current &&
        !dropdownWardRef.current.contains(event.target)
      ) {
        setIsClickWardDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!selectedCodeProvince) {
      setWards([]);
      return;
    }

    const fetchWards = async () => {
      try {
        const { communes } = await fetch(
          `https://production.cas.so/address-kit/2025-07-01/provinces/${selectedCodeProvince}/communes`,
        ).then((res) => res.json());

        setWards(communes);
      } catch (error) {
        console.error("Không thể lấy danh sách xã:", error);
        setWards([]);
      } finally {
      }
    };

    fetchWards();
  }, [selectedCodeProvince]);

  const isEmpty = items.length === 0;

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      return sum + Number(item.price.salePrice) * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500000 ? 0 : 30000; // Free shipping over 500k
  };

  const calculateTax = () => {
    // Assuming 8% VAT
    return Math.round(calculateSubtotal() * 0.08);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };
  const filteredProvinces = provinces.filter((province: any) =>
    removeVietnameseTones(province.name).includes(
      removeVietnameseTones(searchKeyProvince),
    ),
  );
  const filteredWards = wards.filter((ward: any) =>
    removeVietnameseTones(ward.name).includes(
      removeVietnameseTones(searchKeyWard),
    ),
  );
  const handleSelectProvince = (province: any) => {
    setSelectedNameProvince(province.name);
    setSelectedCodeProvince(province.code);
    setSearchKeyProvince("");
    setIsClickPrinceDropdown(false);
  };
  const handleSelectWard = (ward: any) => {
    setSelectedWard(ward.name);
    setSearchKeyWard("");
    setIsClickWardDropdown(false);
  };
  return (
    <div className="min-h-screen bg-base-50">
      <Link
        href="/"
        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="text-lg font-semibold">Trang chủ</span>
      </Link>

      {/* Main Content */}
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty Cart State */}
        {isEmpty && (
          <div className="bg-base-0 rounded-2xl text-center py-20">
            <h2 className="text-xl font-semibold text-base-content mb-3">
              Giỏ hàng hiện đang trống
            </h2>
            <p className="text-base-content/60 mb-6">
              Hãy khám phá và thêm sản phẩm vào giỏ hàng của bạn
            </p>
            <Link href="/" className="btn btn-primary btn-md">
              Mua sắm ngay
            </Link>
          </div>
        )}

        {!isEmpty && (
          <>
            <h2 className="text-lg font-semibold text-base-content">
              Sản phẩm trong giỏ hàng
            </h2>
            <div className="flex flex-row justify-between gap-5">
              {/* Cart Items */}
              <div className="flex flex-col gap-5  flex-5">
                {/* start overview cart */}

                <div className="bg-base-0 p-6 rounded-2xl">
                  <div className="divide-y divide-base-200">
                    {items.map((item) => (
                      <div
                        key={item.variantId}
                        className="flex items-start py-6"
                      >
                        {/* Product Image */}
                        <div className="shrink-0 w-24 h-24">
                          <img
                            src={item.image || undefined}
                            alt={item.productName}
                            className="h-full w-full object-cover rounded-lg border border-base-200"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="ml-4 flex-1 space-y-2">
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-base-content line-clamp-1 max-w-xs">
                              {item.productName}
                            </h3>
                            <button
                              onClick={() => {
                                remove(item.variantId);
                              }}
                              className="text-base-content/60 hover:text-base-content transition-colors p-1 rounded hover:bg-base-100"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                          </div>

                          {/* {item.packageDescription && (
                        <p className="text-sm text-base-content/60 line-clamp-2">
                          {item.packageDescription}
                        </p>
                      )} */}

                          <div className="flex items-baseline space-x-4">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-base font-semibold text-base-content">
                                {formatPrice(item.price.salePrice)}
                              </span>
                              {Number(item.price.originalPrice) >
                                Number(item.price.salePrice) && (
                                <>
                                  <span className="text-base-content/50 line-through">
                                    {formatPrice(item.price.originalPrice)}
                                  </span>
                                  <span className="ml-1 text-xs text-red-600">
                                    -
                                    {(
                                      ((Number(item.price.originalPrice) -
                                        Number(item.price.salePrice)) /
                                        Number(item.price.originalPrice)) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </span>
                                </>
                              )}
                            </div>
                            <span className="ml-4 text-base font-semibold text-base-content">
                              {formatPrice(
                                (
                                  Number(item.price.salePrice) * item.quantity
                                ).toString(),
                              )}
                            </span>
                            {/* Quantity Controls */}
                            <div className="flex items-baseline space-x-2 text-sm">
                              <button
                                onClick={() => decrease(item.variantId)}
                                disabled={item.quantity <= 1}
                                className={`btn btn-ghost btn-sm ${
                                  item.quantity <= 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                -
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increase(item.variantId)}
                                className="btn btn-ghost btn-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* end overview cart */}

                {/* start user info  */}
                <div className="bg-transparent">
                  <h2 className="text-lg font-semibold text-base-content">
                    Thông tin người đặt
                  </h2>
                  <div className="bg-base-0 p-6 rounded-2xl">
                    <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Họ và tên người đặt"
                          className="input input-xl flex-1 bg-base-0"
                        />
                        <input
                          type="text"
                          placeholder="Số điện thoại"
                          className="input input-xl flex-1 bg-base-0"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Email (không bắt buộc)"
                        className="mt-5 input input-xl w-full bg-base-0"
                      />
                    </div>
                    <h2 className="text-lg font-semibold mt-5">
                      Địa chỉ nhận hàng
                    </h2>

                    <div className="flex flex-row gap-3">
                      {/* start province */}
                      <div
                        ref={dropdownProvinceRef}
                        className="relative w-full flex-1"
                      >
                        {/* Ô dropdown */}
                        <button
                          type="button"
                          className="input input-bordered flex w-full items-center justify-between text-left bg-base-0"
                          onClick={() =>
                            setIsClickPrinceDropdown(!isClickPovinceDropdown)
                          }
                        >
                          <span
                            className={
                              selectedNameProvince ? "" : "text-gray-400"
                            }
                          >
                            {selectedNameProvince || "Chọn tỉnh/thành phố"}
                          </span>

                          <ChevronDown
                            className={`transition-transform ${isClickPovinceDropdown ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Dropdown */}
                        {isClickPovinceDropdown && (
                          <div className="bg-base-0 absolute z-50 mt-1 w-full rounded-box p-2 shadow-lg">
                            {/* Input tìm kiếm */}
                            <input
                              type="text"
                              placeholder="Tìm tỉnh/thành phố..."
                              className="bg-base-0 input input-bordered mb-2 w-full"
                              value={searchKeyProvince}
                              onChange={(e) =>
                                setSearchKeyProvince(e.target.value)
                              }
                              autoFocus
                            />

                            {/* Danh sách */}
                            <ul className=" max-h-60 w-full overflow-y-auto p-0">
                              {filteredProvinces.length > 0 ? (
                                filteredProvinces.map((province: any) => (
                                  <li key={province.code} className="mt-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleSelectProvince(province)
                                      }
                                    >
                                      {province.name}
                                    </button>
                                  </li>
                                ))
                              ) : (
                                <li>
                                  <span className="text-gray-400">
                                    Không tìm thấy tỉnh/thành phố với từ khóa
                                    trên
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* start Ward */}
                      <div
                        ref={dropdownWardRef}
                        className="bg-base-0 relative w-full flex-1"
                      >
                        {/* Ô dropdown */}
                        <button
                          type="button"
                          className="input input-bordered flex w-full items-center justify-between text-left bg-base-0"
                          onClick={() =>
                            setIsClickWardDropdown(!isClickWardDropdown)
                          }
                          disabled={wards.length > 0 ? false : true}
                        >
                          <span className={selectedWard ? "" : "text-gray-400"}>
                            {selectedWard || "Chọn phường/xã"}
                          </span>
                          <ChevronDown
                            className={`transition-transform ${isClickWardDropdown ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Dropdown */}
                        {isClickWardDropdown && (
                          <div className="absolute z-50 mt-1 w-full rounded-box p-2 shadow-lg bg-base-0">
                            {/* Input tìm kiếm */}
                            <input
                              type="text"
                              placeholder="Tìm phường/xã..."
                              className="input input-bordered mb-2 w-full bg-base-0"
                              value={searchKeyWard}
                              onChange={(e) => setSearchKeyWard(e.target.value)}
                              autoFocus
                            />

                            {/* Danh sách */}
                            <ul className=" max-h-60 w-full overflow-y-auto p-0">
                              {filteredWards.length > 0 ? (
                                filteredWards.map((ward: any) => (
                                  <li key={ward.code} className="mt-3">
                                    <button
                                      type="button"
                                      onClick={() => handleSelectWard(ward)}
                                    >
                                      {ward.name}
                                    </button>
                                  </li>
                                ))
                              ) : (
                                <li>
                                  <span className="text-gray-400">
                                    Không tìm thấy phường/xã với từ khóa trên
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col mt-5 gap-3">
                      <input
                        type="text"
                        placeholder="Nhập địa chỉ cụ thể"
                        className="input input-xl w-full bg-base-0"
                      />
                      <input
                        type="text"
                        placeholder="Ghi chú cho người bán (không bắt buộc)"
                        className="input input-xl w-full bg-base-0"
                      />
                    </div>
                  </div>
                </div>

                {/* end user info */}

                {/* start payment method */}
                <div className="bg-transparent">
                  <h2 className="text-lg font-semibold text-base-content">
                    Phương thức thanh toán
                  </h2>
                  <div className="bg-base-0 p-6 rounded-2xl flex flex-col gap-5">
                    <div className="flex flex-row gap-5 justify-start items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="checkbox checkbox-xl"
                      />
                      <span>Thanh toán khi nhận hàng</span>
                    </div>
                    <div className="flex flex-row gap-5 justify-start items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        className="checkbox checkbox-xl"
                      />
                      <span>Thanh toán bằng chuyển khoản (Qr code)</span>
                    </div>
                  </div>
                </div>

                {/* end payment method */}
              </div>

              {/* Order Summary */}
              <div className="flex-2 bg-base-0 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-base-content">
                  Tóm tắt đơn hàng
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Tạm tính:</span>
                    <span className="font-medium">
                      {formatPrice(calculateSubtotal().toString())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">
                      Phí vận chuyển:
                    </span>
                    <span className="font-medium">
                      {calculateShipping() > 0
                        ? formatPrice(calculateShipping().toString())
                        : "Miễn phí"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Thuế VAT (8%):</span>
                    <span className="font-medium">
                      {formatPrice(calculateTax().toString())}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-base-200">
                    <span className="text-xl font-bold text-base-content">
                      Tổng cộng:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(calculateTotal().toString())}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full btn btn-primary btn-lg mt-4"
                  onClick={() => {
                    // In real app, navigate to checkout
                    alert("Chức năng thanh toán đang được phát triển");
                  }}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
