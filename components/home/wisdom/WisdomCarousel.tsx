"use client";
import Image from "next/image";
import scrollLeft from "../../../public/svgs/scroll-left.svg";
import scrollRight from "../../../public/svgs/scroll-right.svg";
import {wisdomList} from "../../../mock/wisdomItems";
import React, {useEffect, useRef, useState} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {WisdomCard} from "./WisdomCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {WisdomThumbnail} from "./WisdomThumbnail";
import bigBlob from "../../../public/home/wisdom/wisdom-cloud-blob.svg";
import mobileBlob from "../../../public/home/wisdom/wisdom-cloud-blob-mobile.svg";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";

export const WisdomCarousel = () => {

  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });
  const {width} = useWindowDimensions();
  const [currentWisdom, setCurrentWisdom] = useState(0);


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

  const handleGoLeft = () => {
    if ( currentWisdom > 0 ) {
      setCurrentWisdom(currentWisdom - 1);
    } else {
      setCurrentWisdom(wisdomList.length - 1);
    }
  };

  const handleIndicatorClick = (i: number) => {
    setCurrentWisdom(i);
  };

  const handleGoRight = () => {
    if ( currentWisdom < wisdomList.length - 1) {
      setCurrentWisdom(currentWisdom + 1 );
    } else {
      setCurrentWisdom(0);
    }
  };

  return (
    <figure className="z-40 flex flex-col justify-center items-center bg-transparent" ref={intersectionTarget}>

      {
        width < 768 &&
        <WisdomCard wisdom={wisdomList[currentWisdom]}/>
      }

      {
        width >= 768 &&
        <div className="z-40 relative w-full h-full grid grid-rows-2 grid-cols-10 gap-4">
          <WisdomCard wisdom={wisdomList[currentWisdom]}/>
          <div className="row-span-1 col-span-2" />
          <div className="z-10 absolute w-[400px] lg:w-[500px] xl:w-[600px] bottom-0 -right-16 xl:-right-24">
            <div className="relative">
              <Image className="h-fullw-full" src={bigBlob} alt=""/>
              <div className="h-full absolute inset-0 py-10 pl-16 pr-6 grid grid-rows-3 ">
                <H3m className="z-20 my-4 text-white text-center row-span-1" >{wisdomList[currentWisdom].author}</H3m>
                <Pm className=" text-sm z-20 text-white row-span-1">{wisdomList[currentWisdom].wisdomText}</Pm>
              </div>
            </div>
          </div>
          {
            wisdomList
              .map((wisdom, i) =>
                <WisdomThumbnail
                  key={wisdom.author}
                  wisdom={wisdom}
                  onClick={() => setCurrentWisdom(i)}
                />
              )
              .filter((wisdom) => wisdom.key !== wisdomList[currentWisdom].author )

          }
        </div>
      }

      <div className="w-full flex flex-col md:flex-row justify-start items-center ">
        {/* Current item indicators */}
        <div className="my-6 flex flex-row mx-[10%]">
          {
            wisdomList.map((wisdom, i) => {
              return (
                <div
                  key={i}
                  className={`
                mx-2 rounded-full w-5 h-5 border-0.5 border-main-blue 
                ${currentWisdom === i && "bg-dark-blue"}
                ` }
                  onClick={() => handleIndicatorClick(i)}
                >
                </div>
              );
            })
          }
        </div>

        {/* Scroll arrow buttons */}

        <div className="" >
          <button
            ref={leftButtonRef}
            className="mr-2"
            aria-label="scroll left button."
            onClick={handleGoLeft}
          >
            <Image src={scrollLeft} width={40} height={40} alt=""/>
          </button>
          <button
            ref={rightButtonRef}
            aria-label="scroll right button."
            onClick={handleGoRight}
          >
            <Image src={scrollRight} width={40} height={40} alt=""/>
          </button>
        </div>
      </div>

    </figure>
  );
};