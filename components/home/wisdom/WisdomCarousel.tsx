"use client";
import Image from "next/image";
import scrollLeft from "../../../public/svgs/scroll-left.svg";
import scrollRight from "../../../public/svgs/scroll-right.svg";
import {wisdomList} from "../../../mock/wisdomItems";
import React, {useEffect, useRef} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {WisdomCard} from "./WisdomCard";

export const WisdomCarousel = () => {

  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });


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
  }, [isTargetIntersecting]);

  return (
    <figure className="flex flex-col justify-center items-center" ref={intersectionTarget}>
      {
        <WisdomCard wisdom={wisdomList[0]}/>
      }
      {/*{*/}
      {/*  wisdomList.map((item) => <WisdomCard key={item.author} wisdom={item}/>)*/}
      {/*}*/}
      <div className="" >
        <button
          ref={leftButtonRef}
          className="mr-2"
          aria-label="scroll left button"
        >
          <Image src={scrollLeft} width={40} height={40} alt=""/>
        </button>
        <button
          ref={rightButtonRef}
          aria-label="scroll right button"
        >
          <Image src={scrollRight} width={40} height={40} alt=""/>
        </button>
      </div>
    </figure>
  );
};