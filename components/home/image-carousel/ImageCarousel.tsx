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
// eslint-disable-next-line react/display-name
export const ImageCarousel = React.memo(({ images, ...props }: IProps) => {

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const [haltInterval, setHaltInterval] = useState(false);
  const [continueConstantScroll, setContinueConstantScroll] = useState(true);
  const {windowWidth} = useWindowDimensions();
  const imageWidthWithMargin = windowWidth >= 768 ? (props.mdwidth + 8) : (props.width + 8);
  // distance to be passed every 10 ms
  const distanceToGo = 1; // Must be >= 1

  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });

  const scrollToStartSmoothly = useCallback(() => {
    setContinueConstantScroll(false);
    setTimeout(() => {
      carouselRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        setContinueConstantScroll(true);
      }, 1000); // Assume 1 second for the smooth scroll to complete
    }, 50); // Short timeout to ensure the constant scroll has stopped
  
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

  const handleScrollRight = useCallback(() => {
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
  }, [carouselRef, scrollToStartSmoothly, imageWidthWithMargin]);

  const handleScrollLeft = useCallback(() => {
    if (carouselRef.current) {
      const scrollLeftTo = carouselRef.current.scrollLeft - (imageWidthWithMargin);
      carouselRef.current.scrollTo({
        left: scrollLeftTo,
        behavior: "smooth",
      });
    }
  }, [carouselRef, imageWidthWithMargin]);

  // effect to set interval for autoscroll
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Only set the interval if there are more than 8 images
    if (images.length > 8 && !haltInterval) {
      interval = setInterval(() => {
        constantlyScrollCarousel();
      }, 20);
    }

    const cleanupInterval = () => {
      if (interval) {
        clearInterval(interval);
      }
    };

    setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupInterval]);

    return () => {
      cleanupInterval();
    };
  }, [haltInterval, isTargetIntersecting, constantlyScrollCarousel, setCleanupFunctions, images.length]);

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
          <CarouselImageItem key={image.id} imageUrl={image.url} artwork={image} alt={image.alt} width={props.width} mdwidth={props.mdwidth} height={props.height} objectCover={props.objectCover} />
        ))}
      </figure>
      <div className="px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto text-right mt-6" >
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
});