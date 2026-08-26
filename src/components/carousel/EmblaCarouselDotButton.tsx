import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    // embla-carousel v6+ exposes scrollSnapList()
    // fallback to [] if the method is not present to satisfy type checks
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setScrollSnaps(emblaApi.scrollSnapList ? emblaApi.scrollSnapList() : []);
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    // prefer selectedScrollSnap if available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const idx = emblaApi.selectedScrollSnap
      ? emblaApi.selectedScrollSnap()
      : undefined;

    setSelectedIndex(typeof idx === "number" ? idx : 0);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    (emblaApi as unknown as any)
      .on("reinit", onInit)
      .on("reinit", onSelect)
      .on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const DotButton = (props: PropType) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
