"use client";

import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { removeVietnameseTones } from "@/utils/removeVietnameseTones";

import {
  Trash2Icon,
  ChevronLeftIcon,
  ChevronDown,
  Loader2,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/services/orderService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPayment } from "@/services/paymentService";
import PaymentModal from "./PaymentModal";
import { getWards } from "@/services/thirdPartyService";

/* =========================================================
 * ZOD SCHEMA
 * =======================================================*/

const vietnamesePhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const orderFormSchema = z.object({
  receiverName: z
    .string()
    .trim()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự"),

  receiverPhone: z
    .string()
    .trim()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(vietnamesePhoneRegex, "Số điện thoại không hợp lệ"),

  email: z
    .string()
    .trim()
    .max(255, "Email không được vượt quá 255 ký tự")
    .refine(
      (value) => {
        if (!value) return true;
        return z.string().email().safeParse(value).success;
      },
      {
        message: "Email không hợp lệ",
      },
    ),

  province: z.string().trim().min(1, "Vui lòng chọn tỉnh/thành phố"),
  provinceCode: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  ward: z.string().trim().min(1, "Vui lòng chọn phường/xã"),
  wardCode: z.string().min(1, "Vui lòng chọn phường/xã"),
  detailedAddress: z
    .string()
    .trim()
    .min(5, "Địa chỉ cụ thể phải có ít nhất 5 ký tự")
    .max(255, "Địa chỉ cụ thể không được vượt quá 255 ký tự"),

  note: z.string().trim().max(500, "Ghi chú không được vượt quá 500 ký tự"),
  paymentMethod: z.enum(["COD", "BANK"], {
    message: "Vui lòng chọn phương thức thanh toán",
  }),
});

const orderItemsSchema = z
  .array(
    z.object({
      variantId: z.number().int().positive(),
      quantity: z.number().int().min(1).max(999),
      price: z.object({
        originalPrice: z.string(),
        salePrice: z.string(),
      }),
    }),
  )
  .min(1, "Giỏ hàng không được trống");

type OrderFormValues = z.infer<typeof orderFormSchema>;

type CartProps = {
  provinces: any[];
};

const Cart = ({ provinces }: CartProps) => {
  const router = useRouter();

  const [payment, setPayment] = useState<any>(null);

  const [isClickProvinceDropdown, setIsClickProvinceDropdown] = useState(false);

  const [isClickWardDropdown, setIsClickWardDropdown] = useState(false);

  const [searchKeyProvince, setSearchKeyProvince] = useState("");
  const [searchKeyWard, setSearchKeyWard] = useState("");

  const [wards, setWards] = useState<any[]>([]);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  const [mounted, setMounted] = useState(false);

  const dropdownProvinceRef = useRef<HTMLDivElement>(null);
  const dropdownWardRef = useRef<HTMLDivElement>(null);

  const { items } = useCartStore();
  const { increase, decrease, remove } = useCart();

  /* =========================================================
   * REACT HOOK FORM
   * =======================================================*/

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),

    mode: "onBlur",

    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      email: "",

      province: "",
      provinceCode: "",

      ward: "",
      wardCode: "",

      detailedAddress: "",
      note: "",
    },
  });

  const selectedProvince = watch("province");
  const selectedProvinceCode = watch("provinceCode");
  const selectedWard = watch("ward");
  const selectedPaymentMethod = watch("paymentMethod");

  /* =========================================================
   * FETCH WARDS
   * =======================================================*/
  useEffect(() => {
    if (!selectedProvinceCode) {
      setWards([]);
      setValue("ward", "");
      setValue("wardCode", "");
      return;
    }
    const fetchWards = async () => {
      try {
        setIsLoadingWards(true);

        // const response = await fetch(
        //   `https://production.cas.so/address-kit/2025-07-01/provinces/${selectedProvinceCode}/communes`,
        //   { credentials: "include" },
        // );

        // if (!response.ok) {
        //   throw new Error("Không thể lấy danh sách phường/xã");
        // }

        const response = await fetch(
          `/api/communes?provinceCode=${selectedProvinceCode}`,
        );

        if (!response.ok) {
          throw new Error("Không thể lấy danh sách phường/xã");
        }
        const data = await response.json();
        //const response = await fetch("/api/provinces", selectedProvinceCode);
        // const data = await getWards(selectedProvinceCode);
        setWards(data.communes ?? []);

        // Province thay đổi thì phải reset ward
        setValue("ward", "");
        setValue("wardCode", "");
      } catch (error) {
        console.error("Không thể lấy danh sách xã:", error);

        setWards([]);

        setValue("ward", "");
        setValue("wardCode", "");
      } finally {
        setIsLoadingWards(false);
      }
    };
    fetchWards();
  }, [selectedProvinceCode]);

  /* =========================================================
   * CLICK OUTSIDE DROPDOWN
   * =======================================================*/

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownProvinceRef.current &&
        !dropdownProvinceRef.current.contains(target)
      ) {
        setIsClickProvinceDropdown(false);
      }
      if (
        dropdownWardRef.current &&
        !dropdownWardRef.current.contains(target)
      ) {
        setIsClickWardDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
   * FILTER PROVINCES / WARDS
   * =======================================================*/

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

  /* =========================================================
   * SELECT PROVINCE
   * =======================================================*/

  const handleSelectProvince = (province: any) => {
    setValue("province", province.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("provinceCode", String(province.code), {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Reset ward khi đổi tỉnh
    setValue("ward", "");
    setValue("wardCode", "");

    setSearchKeyProvince("");
    setIsClickProvinceDropdown(false);
  };

  /* =========================================================
   * SELECT WARD
   * =======================================================*/

  const handleSelectWard = (ward: any) => {
    setValue("ward", ward.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("wardCode", String(ward.code), {
      shouldValidate: true,
      shouldDirty: true,
    });

    setSearchKeyWard("");
    setIsClickWardDropdown(false);
  };

  /* =========================================================
   * CALCULATE CART
   * =======================================================*/

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      return sum + Number(item.price.salePrice) * Number(item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500000 ? 0 : 30000;
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.08);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const onSubmit = async (data: OrderFormValues) => {
    /* ---------------------------------------------
     * Validate items bằng Zod
     * -------------------------------------------*/

    const itemsResult = orderItemsSchema.safeParse(items);

    if (!itemsResult.success) {
      toast.error("Giỏ hàng không hợp lệ");
      return;
    }

    const shippingAddress = [
      data.detailedAddress.trim(),
      data.ward.trim(),
      data.province.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    const orderData = {
      receiverName: data.receiverName.trim(),
      receiverPhone: data.receiverPhone.trim(),
      shippingAddress,
      paymentMethod: data.paymentMethod,
      note: data.note.trim() || null,
      items: itemsResult.data.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        clientSalePrice: item.price.salePrice,
      })),
    };

    try {
      const { data, statusCode } = await createOrder(orderData);

      if (statusCode === 201) {
        if (data.paymentMethod === "COD") {
          router.push(`dat-hang/success?orderCode=${data.orderCode}`);
        } else {
          const res = await createPayment(data.payosOrderCode);
          //console.log("res: ", res);
          //setPayment(res);
          router.push(res.checkoutUrl);
        }
      }
    } catch (error: any) {
      console.error("Lỗi khi tạo đơn hàng:", error.response);

      if (error.response.data?.statusCode === 409) {
        const changedItems = error.response.data.items;
        useCartStore.getState().setItems(changedItems);
        toast.info(
          "Giá một số sản phẩm đã thay đổi. Giỏ hàng đã được cập nhật.",
        );
        return;
      }
    }
  };

  const isEmpty = items.length === 0;

  /* =========================================================
   * RENDER
   * =======================================================*/
  if (!mounted) {
    return <>Loading</>;
  }
  return (
    <div className="min-h-screen bg-base-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Back */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
        >
          <ChevronLeftIcon className="h-5 w-5" />

          <span className="text-lg font-semibold">Tiếp tục mua sắm</span>
        </Link>

        {/* Empty cart */}
        {isEmpty && (
          <div className="mt-8 rounded-2xl bg-base-0 py-20 text-center">
            <h2 className="mb-3 text-xl font-semibold text-base-content">
              Giỏ hàng hiện đang trống
            </h2>

            <p className="mb-6 text-base-content/60">
              Hãy khám phá và thêm sản phẩm vào giỏ hàng của bạn
            </p>

            <Link href="/" className="btn btn-primary btn-md">
              Mua sắm ngay
            </Link>
          </div>
        )}

        {!isEmpty && (
          <>
            <h2 className="mt-8 text-lg font-semibold text-base-content">
              Sản phẩm trong giỏ hàng
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-4 flex flex-col gap-5 lg:flex-row"
            >
              {/* =================================================
               * LEFT
               * ===============================================*/}

              <div className="flex min-w-0 flex-1 flex-col gap-5">
                {/* Cart items */}
                <div className="rounded-2xl bg-base-0 p-6">
                  <div className="divide-y divide-base-200">
                    {items.map((item) => (
                      <div
                        key={item.variantId}
                        className="flex items-start py-6 first:pt-0 last:pb-0"
                      >
                        {/* Image */}
                        <div className="h-24 w-24 shrink-0">
                          <img
                            src={item.image || undefined}
                            alt={item.productName}
                            className="h-full w-full rounded-lg border border-base-200 object-cover"
                          />
                        </div>

                        {/* Detail */}
                        <div className="ml-4 min-w-0 flex-1 space-y-2">
                          <div className="flex justify-between gap-3">
                            <h3 className="line-clamp-2 max-w-xs text-base font-medium text-base-content">
                              {item.productName}
                            </h3>
                          </div>

                          {item.packageDescription && (
                            <p className="line-clamp-2 text-sm text-base-content/60">
                              {item.packageDescription}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {formatPrice(item.price.salePrice)}
                              </span>

                              {Number(item.price.originalPrice) >
                                Number(item.price.salePrice) && (
                                <span className="text-sm text-base-content/50 line-through">
                                  {formatPrice(item.price.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center rounded-lg border border-base-300">
                              <button
                                type="button"
                                onClick={() => decrease(item.variantId)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-1 text-lg disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                −
                              </button>

                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => increase(item.variantId)}
                                className="px-3 py-1 text-lg"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-semibold">
                              {formatPrice(
                                (
                                  Number(item.price.salePrice) *
                                  Number(item.quantity)
                                ).toString(),
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex m-auto ">
                          <button
                            type="button"
                            onClick={() => remove(item.variantId)}
                            className="bg-gray rounded p-1 text-base-content/60 transition-colors hover:bg-base-100 hover:text-error"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* =================================================
                 * CUSTOMER INFORMATION
                 * ===============================================*/}

                <div>
                  <h2 className="mb-3 text-lg font-semibold text-base-content">
                    Thông tin người đặt
                  </h2>

                  <div className="rounded-2xl bg-base-0 p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Thông tin cá nhân
                    </h3>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {/* Receiver name */}
                      <div>
                        <input
                          {...register("receiverName")}
                          type="text"
                          maxLength={100}
                          placeholder="Họ và tên người đặt"
                          className={`input input-xl w-full bg-base-0 ${
                            errors.receiverName ? "input-error" : ""
                          }`}
                        />

                        {errors.receiverName && (
                          <p className="mt-1 text-sm text-error">
                            {errors.receiverName.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <input
                          {...register("receiverPhone")}
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="Số điện thoại"
                          className={`input input-xl w-full bg-base-0 ${
                            errors.receiverPhone ? "input-error" : ""
                          }`}
                        />

                        {errors.receiverPhone && (
                          <p className="mt-1 text-sm text-error">
                            {errors.receiverPhone.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <input
                          {...register("email")}
                          type="email"
                          maxLength={255}
                          placeholder="Email (không bắt buộc)"
                          className={`input input-xl w-full bg-base-0 ${
                            errors.email ? "input-error" : ""
                          }`}
                        />

                        {errors.email && (
                          <p className="mt-1 text-sm text-error">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <h3 className="mb-4 mt-6 text-lg font-semibold">
                      Địa chỉ nhận hàng
                    </h3>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {/* Province */}
                      <div ref={dropdownProvinceRef} className="relative">
                        <button
                          type="button"
                          className={`input input-xl input-bordered flex w-full items-center justify-between bg-base-0 text-left ${
                            errors.province ? "input-error" : ""
                          }`}
                          onClick={() =>
                            setIsClickProvinceDropdown((prev) => !prev)
                          }
                        >
                          <span
                            className={
                              selectedProvince
                                ? "text-base-content"
                                : "text-gray-400"
                            }
                          >
                            {selectedProvince || "Chọn tỉnh/thành phố"}
                          </span>

                          <ChevronDown
                            className={`transition-transform ${
                              isClickProvinceDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {errors.province && (
                          <p className="mt-1 text-sm text-error">
                            {errors.province.message}
                          </p>
                        )}

                        {isClickProvinceDropdown && (
                          <div className="absolute z-50 mt-1 w-full rounded-box bg-base-0 p-2 shadow-xl">
                            <input
                              type="text"
                              placeholder="Tìm tỉnh/thành phố..."
                              className="input input-bordered mb-2 w-full bg-base-0"
                              value={searchKeyProvince}
                              onChange={(e) =>
                                setSearchKeyProvince(e.target.value)
                              }
                              autoFocus
                            />

                            <ul className="max-h-60 overflow-y-auto">
                              {filteredProvinces.length > 0 ? (
                                filteredProvinces.map((province: any) => (
                                  <li key={province.code}>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleSelectProvince(province)
                                      }
                                      className="w-full rounded-lg px-3 py-2 text-left hover:bg-base-200"
                                    >
                                      {province.name}
                                    </button>
                                  </li>
                                ))
                              ) : (
                                <li className="p-3 text-sm text-gray-400">
                                  Không tìm thấy tỉnh/thành phố
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Ward */}
                      <div ref={dropdownWardRef} className="relative">
                        <button
                          type="button"
                          disabled={!selectedProvinceCode || isLoadingWards}
                          className={`input input-xl input-bordered flex w-full items-center justify-between bg-base-0 text-left disabled:opacity-60 ${
                            errors.ward ? "input-error" : ""
                          }`}
                          onClick={() =>
                            setIsClickWardDropdown((prev) => !prev)
                          }
                        >
                          <span
                            className={
                              selectedWard
                                ? "text-base-content"
                                : "text-gray-400"
                            }
                          >
                            {isLoadingWards
                              ? "Đang tải..."
                              : selectedWard || "Chọn phường/xã"}
                          </span>

                          {isLoadingWards ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <ChevronDown
                              className={`transition-transform ${
                                isClickWardDropdown ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {errors.ward && (
                          <p className="mt-1 text-sm text-error">
                            {errors.ward.message}
                          </p>
                        )}

                        {isClickWardDropdown && (
                          <div className="absolute z-50 mt-1 w-full rounded-box bg-base-0 p-2 shadow-xl">
                            <input
                              type="text"
                              placeholder="Tìm phường/xã..."
                              className="input input-bordered mb-2 w-full bg-base-0"
                              value={searchKeyWard}
                              onChange={(e) => setSearchKeyWard(e.target.value)}
                              autoFocus
                            />

                            <ul className="max-h-60 overflow-y-auto">
                              {filteredWards.length > 0 ? (
                                filteredWards.map((ward: any) => (
                                  <li key={ward.code}>
                                    <button
                                      type="button"
                                      onClick={() => handleSelectWard(ward)}
                                      className="w-full rounded-lg px-3 py-2 text-left hover:bg-base-200"
                                    >
                                      {ward.name}
                                    </button>
                                  </li>
                                ))
                              ) : (
                                <li className="p-3 text-sm text-gray-400">
                                  Không tìm thấy phường/xã
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detailed address */}
                    <div className="mt-4">
                      <input
                        {...register("detailedAddress")}
                        type="text"
                        maxLength={255}
                        placeholder="Nhập địa chỉ cụ thể"
                        className={`input input-xl font- w-full bg-base-0 ${
                          errors.detailedAddress ? "input-error" : ""
                        }`}
                      />

                      {errors.detailedAddress && (
                        <p className="mt-1 text-sm text-error">
                          {errors.detailedAddress.message}
                        </p>
                      )}
                    </div>

                    {/* Note */}
                    <div className="mt-4">
                      <textarea
                        {...register("note")}
                        maxLength={500}
                        placeholder="Ghi chú cho người bán (không bắt buộc)"
                        className={`textarea textarea-lg min-h-[110] w-full resize-none bg-base-0 ${
                          errors.note ? "textarea-error" : ""
                        }`}
                      />

                      {errors.note && (
                        <p className="mt-1 text-sm text-error">
                          {errors.note.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* =================================================
                 * PAYMENT
                 * ===============================================*/}

                <div>
                  <h2 className="mb-3 text-lg font-semibold text-base-content">
                    Phương thức thanh toán
                  </h2>

                  <div className="rounded-2xl bg-base-0 p-6">
                    <div className="flex flex-col gap-4">
                      {/* COD */}
                      <label
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                          selectedPaymentMethod === "COD"
                            ? "border-primary bg-primary/5"
                            : "border-base-300"
                        }`}
                      >
                        <input
                          {...register("paymentMethod")}
                          type="radio"
                          value="COD"
                          className="checkbox checkbox-lg checkbox-primary"
                        />

                        <span>Thanh toán khi nhận hàng</span>
                      </label>

                      {/* BANK */}
                      <label
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                          selectedPaymentMethod === "BANK"
                            ? "border-primary bg-primary/5"
                            : "border-base-300"
                        }`}
                      >
                        <input
                          {...register("paymentMethod")}
                          type="radio"
                          value="BANK"
                          className="checkbox checkbox-lg checkbox-primary"
                        />

                        <span>Thanh toán bằng chuyển khoản (QR Code)</span>
                      </label>
                    </div>

                    {errors.paymentMethod && (
                      <p className="mt-2 text-sm text-error">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
               * RIGHT - ORDER SUMMARY
               * ===============================================*/}

              <div className="h-fit w-full rounded-2xl bg-base-0 p-6 lg:sticky lg:top-5 lg:w-[360] lg:shrink-0">
                <h2 className="mb-4 text-lg font-semibold text-base-content">
                  Tóm tắt đơn hàng
                </h2>
                <div className="space-y-5">
                  <div>
                    <label>Mã giảm giá:</label>
                    <div className="flex flex-row gap-2 ">
                      <input
                        type="text"
                        maxLength={255}
                        placeholder="Mã giảm giá"
                        className={`input input-md w-full bg-base-0`}
                      />
                      <button className="btn btn-primary">Áp dụng</button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm border-t border-base-200 pt-5">
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

                  {/* <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Thuế VAT (8%):</span>

                    <span className="font-medium">
                      {formatPrice(calculateTax().toString())}
                    </span>
                  </div> */}

                  <div className="flex justify-between border-t border-base-200 pt-3">
                    <span className="text-xl font-bold">Tổng cộng:</span>

                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(calculateTotal().toString())}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg mt-5 w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Đặt hàng"
                  )}
                </button>
              </div>
            </form>
            {/* <button
              onClick={() => {
                setPayment({
                  isOpenModal: true,
                  checkoutUrl:
                    "https://pay.payos.vn/web/4a77e563f9684f7f8d14c13fd8e48c0d/",
                  expiredAt: Math.floor(Date.now() / 1000) + 10,
                });
              }}
            >
              click
            </button> */}
            {/* {payment && (
              <PaymentModal
                isOpenModal={true}
                checkoutUrl={payment.checkoutUrl}
                expiredAt={payment.expiredAt}
                onClose={() => {
                  setPayment(null);
                }}
                onSuccess={() => {
                  console.log("PayOS báo thanh toán thành công");
                }}
              />
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
