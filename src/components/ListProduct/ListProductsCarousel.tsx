"use client";
import { CatalogProductCard } from "@/components/CatalogProductCard";
import { Product } from "@/types";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../EmblaCarouselArrowButtons";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
// import "@/app/styles/carousel.css";

export default function ListProductsCarousel({
  listProducts,
  isBestSelling = false,
  isPromotion = false,
}: {
  listProducts: Product[];
  isBestSelling?: boolean;
  isPromotion?: boolean;
}) {
  const router = useRouter();
  const options: EmblaOptionsType = { slidesToScroll: "auto" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div>
      <div
        className={`space-y-12 ${isBestSelling ? "bg-primary p-3 rounded-2xl rounded-tl-none" : ""}`}
      >
        <section id="catolag" className="scroll-mt-24">
          <div className="embla">
            <div
              className="embla__viewport overflow-x-auto scrollbar-hide"
              ref={emblaRef}
            >
              <div className="embla__container">
                {listProducts.map((p) => (
                  <div
                    className="embla__slide grow-0 shrink-0  basis-1/6 min-w-[160] sm:min-w-[220]"
                    key={p.id}
                  >
                    <CatalogProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>

            <div className="embla__controls">
              <div className="embla__buttons">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {(isBestSelling || isPromotion) && (
        <div className="flex justify-between items-center">
          <button
            className="flex flex-row cursor-pointer p-3 btn-ghost m-auto text-primary"
            onClick={() => {
              isBestSelling
                ? router.push("/ban-chay")
                : router.push("/khuyen-mai");
            }}
          >
            <span className="text-md">Xem tất cả</span>
            {/* <ChevronRight className="size-5 items-center" /> */}
          </button>
        </div>
      )}
    </div>
  );
}
