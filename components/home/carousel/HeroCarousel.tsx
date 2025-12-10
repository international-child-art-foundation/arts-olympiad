import React from "react";
import { IHeroArray } from "./HeroItem";
import { LazyImage } from "../../common/images/LazyImage";

interface HeroCarouselProps {
  transitioning: boolean;
  index: number;
}

export default function HeroCarousel({
  transitioning,
  index,
}: HeroCarouselProps) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-4 items-center h-[500px]">
      <div
        className={`flex transition-transform h-full duration-500 ${
          !transitioning ? "" : "ease-in-out"
        }`}
        style={{
          transform: `translateX(${-index * 100}%)`,
        }}
      >
        {IHeroArray.map((wisdom, i) => {
          return (
            <div
              key={i}
              className="relative w-full min-w-full max-h-full overflow-hidden rounded-[20px] flex justify-center items-center bg-[#fdfffd] shadow-md"
            >
              <div
                className="
                              thumbnail
                              relative
                              rounded-xl
                              font-montserrat
                              font-bold
                              w-full
                              grid grid-rows-[0.8fr_0.2fr] grid-cols-1 gap-4
                              overflow-hidden
                              h-full
                          "
              >
                <div className="overflow-hidden cursor-pointer">
                  <LazyImage
                    className="thumbnail-image w-full object-cover select-none pointer-events-none rounded-none"
                    imageUrl={wisdom.url}
                    alt={wisdom.alt}
                  />
                </div>
                <div className="text-black font-montserrat text-right flex flex-col gap-1 items-end h-full mb-4">
                  <span className="text-3xl md:text-4xl font-semibold leading-none tracking-tight mr-4">
                    {wisdom.title && wisdom.title}
                  </span>

                  <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] underline underline-offset-4 opacity-70 mr-4">
                    {wisdom.name}
                    {wisdom.age && ` ⸱ ${wisdom.age}`}
                    {wisdom.country && ` ⸱ ${wisdom.country}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
