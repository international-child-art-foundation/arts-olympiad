"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
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
  const [continueConstantScroll, setContinueConstantScroll] = useState(true);
  const {windowWidth} = useWindowDimensions();
  const imageWidthWithMargin = windowWidth >= 768 ? (props.mdwidth + 8) : (props.width + 8);
  // distance to be passed every 10 ms
  const distanceToGo = imageWidthWithMargin / 300;

  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });

  const scrollToStartSmoothly = useCallback(() => {
    setContinueConstantScroll(false);
    carouselRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
    return;
  }, [carouselRef, setContinueConstantScroll]);

  const constantlyScrollCarousel = useCallback(() => {
    if (carouselRef.current) {
      const epsilon = 1; // to improve precision for edge cases
      const scrollRightTo = carouselRef.current.scrollLeft + (distanceToGo);
      if ( (carouselRef.current.clientWidth + scrollRightTo + epsilon)  >= carouselRef.current.scrollWidth) {
        scrollToStartSmoothly();
      }
      if (continueConstantScroll) {
        carouselRef.current.scrollTo({
          left: carouselRef.current?.scrollLeft + distanceToGo,
          behavior: "instant",
        });
      }
    }
  }, [distanceToGo, continueConstantScroll, scrollToStartSmoothly]);

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const epsilon = 1; // to improve precision for edge cases
      const scrollRightTo = carouselRef.current.scrollLeft + (imageWidthWithMargin);
      if ((carouselRef.current.clientWidth - imageWidthWithMargin) + scrollRightTo + epsilon  >= carouselRef.current.scrollWidth) {
        scrollToStartSmoothly();
      }
      carouselRef.current.scrollTo({
        left: scrollRightTo,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const scrollLeftTo = carouselRef.current.scrollLeft - (imageWidthWithMargin);
      carouselRef.current.scrollTo({
        left: scrollLeftTo,
        behavior: "smooth",
      });
    }
  };

  // effect to set interval for autoscroll
  useEffect(() => {

    const interval = setInterval(() => {
      constantlyScrollCarousel();
    }, 10);
    const cleanupInterval = () => clearInterval(interval);
    setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupInterval]);

    if(haltInterval) {
      cleanupInterval();
      return;
    }

    return () => {
      cleanupInterval();
    };
  }, [haltInterval, isTargetIntersecting, constantlyScrollCarousel, setCleanupFunctions]);

  // effect to set timeout for smooth scroll back to start
  useEffect(() => {
    if (!continueConstantScroll) {
      const timeout = setTimeout(() => {
        setContinueConstantScroll(true);
      }, 1000);

      const cleanupTimeout = () => {
        clearTimeout(timeout);
      };
      setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupTimeout]);

      return () => {
        cleanupTimeout(); // Call the cleanup function when the effect is cleaned up
      };
    }
  }, [continueConstantScroll, setCleanupFunctions]);

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
  }, [setCleanupFunctions]);

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
          <CarouselImageItem key={image.id} imageUrl={image.url} alt={image.alt} width={props.width} mdwidth={props.mdwidth} height={props.height} objectCover={props.objectCover} />
        ))}
      </figure>
      <div className="absolute right-[5%] -bottom-16" >
        <button
          ref={leftButtonRef}
          className="mr-2"
          onClick={handleScrollLeft}
          aria-label="scroll left button."
          onMouseOver={() => setHaltInterval(true)}
          onMouseLeave={() => setHaltInterval(false)}
          onFocus={() => setHaltInterval(true)}
          onBlur={() => setHaltInterval(false)}
        >
          <Image src={scrollLeft} width={40} height={40} alt=""/>
        </button>
        <button
          ref={rightButtonRef}
          onClick={handleScrollRight}
          aria-label="scroll right button."
          onMouseOver={() => setHaltInterval(true)}
          onMouseLeave={() => setHaltInterval(false)}
          onFocus={() => setHaltInterval(true)}
          onBlur={() => setHaltInterval(false)}
        >
          <Image src={scrollRight} width={40} height={40} alt=""/>
        </button>
      </div>
    </section>
  );
};