"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";

export default function Slider() {
  const options: EmblaOptionsType = { slidesToScroll: "auto" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className=" mt-3 bg-transparent">
      <section className="flex flex-row gap-5">
        <div className="relative  max-w-[1045] m-0 rounded-2xl">
          <div
            className="overflow-hidden  overflow-x-auto scrollbar-hide rounded-2xl"
            ref={emblaRef}
          >
            <div className="flex  max-h-[422]">
              {[1, 2, 3].map((p, index) => (
                <div
                  className="embla__slide grow-0 shrink-0 basis-1"
                  key={index}
                >
                  <Image
                    src={`/img/slider/slider${p}.webp`}
                    alt="dd"
                    width={1050}
                    height={422}
                    loading="eager"
                  />
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
        <div className="flex flex-col gap-5 grow">
          <div className="flex-1 bg-amber-200 rounded-2xl">sec1</div>
          <div className="flex-1  bg-amber-100 rounded-2xl">sec2</div>
        </div>
      </section>
    </div>
  );
}
