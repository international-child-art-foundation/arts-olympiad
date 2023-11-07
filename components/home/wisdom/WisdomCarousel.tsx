"use client";
import "../../../src/styles/wisdom-carousel.css";
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
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";

export const WisdomCarousel = () => {

  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const cloudRef = useRef<HTMLImageElement | null>(null);
  const wisdomCardRef = useRef<HTMLImageElement | null>(null);
  const wisdomTextRef = useRef<HTMLDivElement | null>(null);
  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });
  const {windowWidth} = useWindowDimensions();
  const [currentWisdom, setCurrentWisdom] = useState(0);
  const [wasViewed, setWasViewed] = useState(false);

  // effect to listen to keyboard arrow buttons clicks and control the carousel
  useEffect(() => {
    isTargetIntersecting && setWasViewed(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && leftButtonRef.current) {
        leftButtonRef.current?.click();
      } else if (event.key === "ArrowRight" && rightButtonRef.current) {
        rightButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const cleanupEventListener = () => document.removeEventListener("keydown", handleKeyDown);
    setCleanupFunctions((prevCleanupFunctions) => [...prevCleanupFunctions, cleanupEventListener]);

    return () => {
      cleanupEventListener();
    };
  }, [isTargetIntersecting, setCleanupFunctions, intersectionTarget]);

  const checkVisibility = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };


  useEffect(() => {
    // Function to check if the element is in the viewport
  
    // Only proceed if intersectionTarget.current is not null
    if (intersectionTarget.current) {
      // Manually trigger animation if the component is already in view
      if (checkVisibility(intersectionTarget.current)) {
        addAnimationClasses();
      }
    }
        
    if (wasViewed) {
      const timeout = setTimeout(() => {
        addAnimationClasses();
      }, 50);

      return () => {
        clearTimeout(timeout);
      };
    }
    return;
  }, [currentWisdom, wasViewed, intersectionTarget]);

  useEffect(() => {
    const handleResize = debounce(() => {
      // Check if the window width crosses the threshold and if the element is in view
      if (window.innerWidth >= 768 && intersectionTarget.current) {
        // Check visibility in case the resize made the element visible
        if (checkVisibility(intersectionTarget.current)) {
          removeAnimationClasses(); // Reset animation state
          addAnimationClasses();    // Reapply animation classes
        }
      }
    }, 250); // Debounce by 250 milliseconds
  
    // Set up the event listener
    window.addEventListener("resize", handleResize);
  
    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [intersectionTarget]);
  
  // Debounce function to limit the rate at which a function can fire
  function debounce<Func extends (...args: unknown[]) => void>(func: Func, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function(this: ThisParameterType<Func>, ...args: Parameters<Func>) {
      const later = () => {
        timeout = null;
        func.apply(this, args);
      };
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  }
      

  const addAnimationClasses = () => {
    cloudRef.current?.classList.add("slide-left-cloud");
    wisdomCardRef.current?.classList.add("grow-thinker");
    wisdomTextRef.current?.classList.add("animate-wisdom-opacity");
  };

  /*
  use this to remove animation - triggering classes to trigger effect
  that will assign them back to start the animation once again
   */
  const removeAnimationClasses = () => {
    cloudRef.current?.classList.remove("slide-left-cloud");
    wisdomCardRef.current?.classList.remove("grow-thinker");
    wisdomTextRef.current?.classList.remove("animate-wisdom-opacity");
  };

  const handleGoLeft = () => {
    removeAnimationClasses();
    if ( currentWisdom > 0 ) {
      setCurrentWisdom(currentWisdom - 1);
    } else {
      setCurrentWisdom(wisdomList.length - 1);
    }
  };

  const handleIndicatorClick = (i: number) => {
    removeAnimationClasses();
    setCurrentWisdom(i);
  };

  const handleGoRight = () => {
    removeAnimationClasses();
    if ( currentWisdom < wisdomList.length - 1) {
      setCurrentWisdom(currentWisdom + 1 );
    } else {
      setCurrentWisdom(0);
    }
  };

  return (
    <figure className="z-40 flex flex-col justify-center items-center bg-transparent" ref={intersectionTarget}>

      {
        windowWidth < 768 &&
        <WisdomCard ref={wisdomCardRef} wisdom={wisdomList[currentWisdom]}/>
      }

      {
        windowWidth >= 768 &&
        <div className=" z-40 relative w-full h-full grid grid-rows-2 grid-cols-10 gap-4">
          <WisdomCard ref={wisdomCardRef} wisdom={wisdomList[currentWisdom]}/>
          <div className="row-span-1 col-span-2" />
          <div className="z-10 absolute w-[400px] lg:w-[500px] mxl:w-[600px] bottom-0 -right-36 md:-right-24 lg:-right-36">
            <div className="relative ">
              <Image ref={cloudRef} className="h-full cloud " src={bigBlob} alt=""/>
              <div
                ref={wisdomTextRef}
                className="wisdom-text h-full absolute inset-0 py-10 pl-16 pr-6 grid grid-rows-3 align-center"
              >
                <H3m className="z-20 my-4 text-white text-center row-span-1 xl:text-3xl lg:text-xl xl:mt-14" >{wisdomList[currentWisdom].author}</H3m>
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
                  onClick={() => handleIndicatorClick(i)}
                />
              )
              .filter((wisdom) => wisdom.key !== wisdomList[currentWisdom].author )

          }
        </div>
      }

      <div className="w-full flex flex-col md:flex-row justify-start items-center md:grid md:grid-rows-2 md:grid-cols-10 md:gap-4 justify-center">
        {/* Current item indicators */}
        <div className="my-6 flex flex-row mx-[10%] md:mx-[0%] md:row-start-1 md:row-end-3 md:col-start-3 md:col-end-5 justify-self-center">
          {
            wisdomList.map((wisdom, i) => {
              return (
                <div
                  key={i + Date.now()}
                  className={`
                mx-2 rounded-full w-5 h-5 border-0.5 border-main-blue cursor-pointer
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

        <div className="md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-7 md:flex md:justify-end" >
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