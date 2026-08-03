"use client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import "@/app/styles/carousel.css";
import { Product } from "@/types";
import Link from "next/link";
import { usePrevNextButtons } from "@/components/EmblaCarouselArrowButtons";
import EmblaCarouselThumbs from "@/components/EmblaCarouselThumbs";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = 1;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const options: EmblaOptionsType = { slidesToScroll: "auto" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/products/${productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.log("error: ", err);
        setError("Error loading product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return notFound();

  return (
    <div className="mx-auto py-8">
      {/* Product Layout: Image Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div className="lg:pr-8">
          <EmblaCarouselThumbs />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {product.category}
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-baseline space-x-4 mb-6">
            <span className="text-2xl font-bold">
              {(product.price_cents / 100).toLocaleString()} ₫
            </span>
          </div>

          <div className="flex items-baseline space-x-4 mb-6">
            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
            <button className="btn btn-outline">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
}
