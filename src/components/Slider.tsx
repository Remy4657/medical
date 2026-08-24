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
      <section className="flex flex-col md:flex-row gap-5">
        {/* start slide */}
        <div className="relative rounded-2xl flex-3 order-2 md:order-1">
          <div
            className="overflow-hidden overflow-x-auto scrollbar-hide rounded-2xl"
            ref={emblaRef}
          >
            <div className="flex flex-row w-full h-full">
              {[1, 2, 3].map((p, index) => (
                <div
                  className="embla__slide grow-0 shrink-0 basis-1 w-full h-full"
                  key={index}
                >
                  <Image
                    src={`/img/slider/slider${p}.webp`}
                    alt="dd"
                    width={1050}
                    height={440}
                    loading="eager"

                    className="w-full h-[220] sm:h-[260] md:h-[300] lg:h-[440]"
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
        {/* end slide */}
        <div className="flex flex-row min-h-[150] md:flex-col flex-1 gap-5 grow order-1 md:order-2">
          {/* sec 1 */}
          <div className="flex-1 relative h-auto overflow-hidden rounded-2xl">
            {/* Text */}
            <div className="relative z-20 px-[11] pt-[13]">
              <h2 className="max-w-[245] text-[25px] font-medium leading-[1.25] text-[#f90083]">
                Dược sĩ tư vấn
                <br />
                miễn phí 24/7
              </h2>
            </div>

            {/* Doctor */}
            <div className="absolute bottom-0 w-full h-full z-10">
              <Image
                src="/img/slider/silde-extra1.webp"
                fill
                alt=""
                className="object-fill"
              />
            </div>

            {/* Button */}
            <div className="absolute bottom-[10] left-[10] right-[10] z-20">
              <button
                type="button"
                className="flex h-[40] w-full items-center justify-center rounded-full bg-[#f90083] text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#df0074]"
              >
                Đặt Thuốc Nhanh
              </button>
            </div>
          </div>

          {/* sec 2 */}

          <div className="flex-1 relative h-auto overflow-hidden rounded-2xl bg-linear-to-br from-[#ffe5f2] via-[#ffd1e9] to-[#ffb8db]">
            {/* Text */}
            <div className="relative z-20 px-[11] pt-[13]">
              <h2 className="max-w-[245] text-[18px] lg:text-[25px] font-medium leading-[1.25] text-[#f90083]">
                Dược sĩ tư vấn
                <br />
                miễn phí 24/7
              </h2>
            </div>

            {/* Doctor */}
            <div className="absolute bottom-0 w-full h-full z-10">
              <Image
                src="/img/slider/silde-extra1.webp"
                fill
                alt=""
                className="object-fill"
              />
            </div>

            {/* Button */}
            <div className="absolute bottom-[10] left-[10] right-[10] z-20">
              <button
                type="button"
                className="flex h-[40] w-full items-center justify-center rounded-full bg-[#f90083] text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#df0074]"
              >
                Đặt Thuốc Nhanh
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
