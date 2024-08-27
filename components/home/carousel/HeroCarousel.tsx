import React from "react";
// import { IHeroList } from "../../impact/wisdom/wisdomItems";
import { IHeroList } from "./HeroItem";
import { useState, useEffect, useRef } from "react";
import { LazyImage } from "../../common/images/LazyImage";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [transitioning, setTransitioning] = useState(true);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          // prevIndex + 1
          (prevIndex + 1) % IHeroList.length
        ),
      3500
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  // useEffect(() => {
  //   if (index > IHeroList.length) {
  //     setTimeout(() => {
  //       setTransitioning(false)
  //       setIndex(0)
  //     }, 0)
  //   } else {
  //     setTransitioning(true)
  //   }
  // }, [index, transitioning])

  function handleDotOnClick (i: number) {
    setIndex(i);
  }

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <div
        className={`flex transition-transform duration-500 ${!transitioning ? "" : "ease-linear"}`}
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {
          IHeroList.map((wisdom, i) => {
            return (
              <div key={i} className="relative w-full flex-shrink-0 flex justify-center items-center rounded-2xl">
                <div
                  className="
                              thumbnail
                              cursor-pointer
                              relative
                              rounded-xl
                              font-montserrat
                              font-bold
                              w-full
                          "
                >
                  <div className="rounded-[20px] overflow-clip">
                    <LazyImage
                      className="thumbnail-image w-full object-cover select-none pointer-events-none"
                      imageUrl={wisdom.url}
                      alt={wisdom.alt}
                    />
                  </div>
                  <div 
                    className={`text-sm text-black italic font-medium font-montserrat text-right`}
                  >
                    {wisdom.name}, {wisdom.age}, {wisdom.country}
                  </div>
                </div>

              </div>
            );
          })
        }
      </div>
      <div className="flex flex-row space-x-3">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} 
            className={`w-[15px] h-[15px] rounded-full ${i == index % 3 ? "bg-new-blue" : "bg-main-silver"}`}
            onClick={() => handleDotOnClick(i)}
          >
          </div>
        ))}
      </div>
    </div>
  );
}

