"use client";

import React, {useEffect, useRef, useState} from "react";
import {CarouselImageItem} from "./CarouselImageItem";
import Image, {StaticImageData} from "next/image";
import scrollRight from "../../../public/svgs/scroll-right.svg";
import scrollLeft from "../../../public/svgs/scroll-left.svg";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps extends React.HTMLProps<HTMLDivElement>{
  images: {
    id?: number,
    name?: string,
    votes?: number
    url: string | StaticImageData,
    country?: string,
    age?: number
    alt: string
  }[];
  height?: number
  mdheight?: number
  mdwidth: number
  width: number
  objectCover?: boolean
}
export const ImageCarousel = ({ images, ...props }: IProps) => {

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const [haltInterval, setHaltInterval] = useState(false);
  const {windowWidth} = useWindowDimensions();

  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const epsilon = 1; // to improve precision for edge cases
      const scrollWidthWithMargin = windowWidth >= 768 ? props.mdwidth + 8 : props.width + 8;
      const scrollRightTo = carouselRef.current.scrollLeft + (scrollWidthWithMargin);
      if ((carouselRef.current.clientWidth - scrollWidthWithMargin) + scrollRightTo + epsilon  >= carouselRef.current.scrollWidth) {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        return;
      }
      carouselRef.current.scrollTo({
        left: scrollRightTo,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const scrollWidthWithMargin = props.width ? props.width + 8 : 150 + 8;
      const scrollLeftTo = carouselRef.current.scrollLeft - (scrollWidthWithMargin);
      carouselRef.current.scrollTo({
        left: scrollLeftTo,
        behavior: "smooth",
      });
    }
  };

  // effect to set interval for autoscroll
  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollRight();
    }, 3000);
    const cleanupInterval = () => clearInterval(interval);
    setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupInterval]);

    if(haltInterval) {
      cleanupInterval();
      return;
    }

    return () => {
      cleanupInterval();
    };
  }, [haltInterval, isTargetIntersecting]);

  // effect to listen to keyboard arrow buttons clicks and control the carousel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && leftButtonRef.current) {
        // focusing on it will prevent autoscroll
        leftButtonRef.current?.focus();
        leftButtonRef.current?.click();
      } else if (event.key === "ArrowRight" && rightButtonRef.current) {
        rightButtonRef.current?.focus();
        rightButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const cleanupEventListener = () => document.removeEventListener("keydown", handleKeyDown);
    setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupEventListener]);

    return () => {
      cleanupEventListener();
    };
  }, []);

  return (
    <section
      // implementing autoscroll lock on hover and on touch
      onMouseOver={() => setHaltInterval(true)}
      onMouseLeave={() => setHaltInterval(false)}
      onTouchStart={() => setHaltInterval(true)}
      onTouchEnd={() => setHaltInterval(false)}
      className="relative"
      ref={intersectionTarget}
    >
      <figure
        role="region"
        aria-live="polite"
        aria-label={props["aria-label"]}
        className={`
        h-[${props.height || 110}px] md:h-[${props.mdheight || 180}px]
        no-scrollbar flex flex-row flex-nowrap overflow-x-auto
        `}
        ref={carouselRef}
      >
        {images.map((image) => (
          <CarouselImageItem key={image.id} imageUrl={image.url} alt={image.alt} width={props.width} mdwidth={props.mdwidth} objectCover={props.objectCover} />
        ))}
      </figure>
      <div className="absolute right-[5%] -bottom-16" >
        <button
          ref={leftButtonRef}
          className="mr-2"
          onClick={handleScrollLeft}
          aria-label="scroll left button."
          onFocus={() => setHaltInterval(true)}
          onBlur={() => setHaltInterval(false)}
        >
          <Image src={scrollLeft} width={40} height={40} alt=""/>
        </button>
        <button
          ref={rightButtonRef}
          onClick={handleScrollRight}
          aria-label="scroll right button."
          onFocus={() => setHaltInterval(true)}
          onBlur={() => setHaltInterval(false)}
        >
          <Image src={scrollRight} width={40} height={40} alt=""/>
        </button>
      </div>
    </section>
  );
};