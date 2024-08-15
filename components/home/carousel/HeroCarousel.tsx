import React from "react";
import { wisdomList } from "../../impact/wisdom/wisdomItems";
import { useState, useEffect, useRef, createRef } from "react";
import { LazyImage } from "../../common/images/LazyImage";
import { H3m } from "../../common/texts/H3m";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        // prevIndex === wisdomList.length - 1 ? 0 : prevIndex + 1
          (prevIndex + 1) % wisdomList.length
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {
          wisdomList.map((wisdom, i) => {
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
                  <LazyImage
                    className="thumbnail-image w-full h-[450px] object-cover select-none pointer-events-none"
                    imageUrl={wisdom.url}
                    alt={wisdom.alt}
                  />
                  <div
                    className="
                                            cardLabel
                                            thumbnail-textfield
                                            h-[20%]
                                            w-full
                                            absolute
                                            bottom-0
                                        "
                  >
                    <div
                      className="
                                            absolute
                                            w-full
                                            h-full
                                            bg-gray-700 bg-opacity-60
                                            rounded-b-xl
                                            backdrop-blur-[5px]
                                        "
                    ></div>
                    <div
                      className="
                                            cardLabel
                                            thumbnail-textfield
                                            absolute
                                            bottom-0
                                            w-full
                                            h-full
                                            text-gray-100
                                            rounded-b-xl
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                        "
                    >
                      <H3m className="select-none font-montserrat font-semibold z-10">
                        {wisdom.wisdomText}
                      </H3m>
                      <H3m className="select-none font-montserrat font-semibold z-10">
                        {wisdom.author}
                      </H3m>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

