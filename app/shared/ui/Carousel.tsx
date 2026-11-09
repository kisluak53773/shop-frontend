import { useState, type Key, type ReactNode } from "react";
import clsx from "clsx";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "./Button";
import { ArrowIcon } from "./icons";

type Props<T> = {
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  className?: string;
  slideClassName?: string;
};

const navButton = clsx(
  "absolute top-1/2 z-10 -translate-y-1/2 shadow-md",
  "[&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0",
  "[&.swiper-button-lock]:hidden",
);

export const Carousel = <T,>({
  items,
  getKey,
  renderItem,
  className,
  slideClassName,
}: Props<T>) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className={clsx("relative", className)}>
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        navigation={{ prevEl, nextEl }}
      >
        {items.map((item) => (
          <SwiperSlide
            key={getKey(item)}
            className={clsx("mr-4 w-auto!", slideClassName)}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        ref={setPrevEl}
        type="button"
        variant="secondary"
        size="icon"
        pill
        aria-label="Previous"
        className={clsx(navButton, "-left-6")}
      >
        <ArrowIcon className="size-6 rotate-180" />
      </Button>
      <Button
        ref={setNextEl}
        type="button"
        variant="secondary"
        size="icon"
        pill
        aria-label="Next"
        className={clsx(navButton, "-right-6")}
      >
        <ArrowIcon className="size-6" />
      </Button>
    </div>
  );
};
