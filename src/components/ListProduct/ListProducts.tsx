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
// import "@/app/styles/carousel.css";

export default function ListProducts({
  listProducts,
}: {
  listProducts: Product[];
}) {
  const options: EmblaOptionsType = { slidesToScroll: "auto" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="space-y-12">
      <section id="catolag" className="scroll-mt-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content md:text-2xl uppercase font-mono">
              Catalog
            </h2>
          </div>
        </div>

        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {listProducts.map((p) => (
                <div className="embla__slide" key={p.id}>
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
  );
}
