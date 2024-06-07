"use client";
import "../../../src/styles/wisdom-carousel.css";
import Image from "next/image";
import LeftIcon from "../../../public/impact/left-icon.svg";
import RightIcon from "../../../public/impact/right-icon.svg";
import {wisdomList} from "./wisdomItems";
import React, {useEffect, createRef, useRef, useState} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { WisdomCard } from "./WisdomCard";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import { gsap } from "gsap";
import { Position, centerPosition, rightPosition, leftPosition, leftMain, LeftUpper, LeftLower, RightUpper, RightLower} from "../../../mock/positionsForImpact"; 
import useWindowDimensions from "@/hooks/useWindowDimensions";

export const WisdomCarousel = () => {
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const wisdomTextRef = useRef<HTMLDivElement | null>(null);
  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });
  const [currentWisdom, setCurrentWisdom] = useState(0);
  const wisdomCardRefs = useRef(wisdomList.map(() => createRef<HTMLDivElement>()));

  const [wisdomText, setWisdomText] = useState(wisdomList[currentWisdom].wisdomText);
  const [authorName, setAuthorName] = useState(wisdomList[currentWisdom].author);

  const { windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 1024;
  const calculateWidth = () => {
    if (windowWidth >= 1024) {
      return "calc(50% - 16px)";
    } else {
      return "100%";
    }
  };

  useEffect(() => {
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

  const animateCards = () => {
    wisdomList.forEach((wisdom, i) => {
      const cardRef = wisdomCardRefs.current[i];
      let position: Position;
      
      if(isMobile) {
        if (i === currentWisdom) {
          position = centerPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "2";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 0, duration: 0.4 });
          }
        } else if (i === (currentWisdom - 1 + wisdomList.length) % wisdomList.length) {
          position = leftPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else if (i === (currentWisdom + 1) % wisdomList.length) {
          position = rightPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else {
          position = { left: 0, top: 0, width: 0, height: 0 };
          if (cardRef.current) {
            cardRef.current.style.zIndex = "-1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 0, duration: 0.4 });
          }
        }
      } else {
        if (i === currentWisdom) {
          position = leftMain;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "2";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 0, duration: 0.4 });
          }
        } else if (i === (currentWisdom - 1 + wisdomList.length) % wisdomList.length) {
          position = LeftLower;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else if (i === (currentWisdom - 2 + wisdomList.length) % wisdomList.length) {
          position = RightLower;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "0";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else if (i === (currentWisdom + 1) % wisdomList.length) {
          position = LeftUpper;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else if (i === (currentWisdom + 2) % wisdomList.length) {
          position = RightUpper;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "0";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else {
          position = { left: 0, top: 0, width: 0, height: 0 }; 
          if (cardRef.current) {
            cardRef.current.style.zIndex = "-1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 0, duration: 0.4 });
          }
        }
      }

      gsap.to(cardRef.current, {
        x: position.left,
        y: position.top,
        width: position.width,
        height: position.height,      
        duration: 0.7,
        ease: "slow(0.3,0.7,false)",
      });
    });

    const textContainer = wisdomTextRef.current;
    if (textContainer) {
      gsap.to(textContainer, {
        height: 0,
        opacity: 0,
        duration: 0.15,
        ease: "power1.inOut",
        onComplete: () => {
          setWisdomText(wisdomList[currentWisdom].wisdomText);
          setAuthorName(wisdomList[currentWisdom].author);
        }
      });
    }
  };

  useEffect(() => {
    animateCards();
  }, [windowWidth, currentWisdom, isMobile]);

  useEffect(() => {
    const textContainer = wisdomTextRef.current;
    if (textContainer) {
      textContainer.style.height = "auto";
      const newHeight = textContainer.scrollHeight + "px";
      textContainer.style.height = "0";
  
      gsap.to(textContainer, {
        height: newHeight,
        opacity: 0.9,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => {
          textContainer.style.height = "auto";
        }
      });
    }
  }, [wisdomText, authorName]);

  return (
    <figure className="z-40 flex flex-col justify-center items-center bg-transparent h-visionary-thinkers-md overflow-hidden" ref={intersectionTarget}>
      {
        <div className="z-40 relative w-full h-full">
          {
            wisdomList.map((wisdom, i) =>
              <WisdomCard
                ref={wisdomCardRefs.current[i]}
                key={wisdom.author}
                wisdom={wisdom}
                onClick={() => handleIndicatorClick(i)}
              />
            )
          }
          <div
            ref={wisdomTextRef}
            className="flex flex-col space-y-3 py-5 lg:py-4 backdrop-blur-[30px] absolute top-1/2 -translate-y-[96px] sm:-translate-y-[100px] lg:-translate-y-[108px] lg:translate-x-[8px] xl:-translate-y-[112px] z-50 bg-white bg-opacity-25 overflow-hidden max-w-full rounded-b-xl"
            style={{ width: calculateWidth() }}
          >
            <H3m className="pl-4 z-20 mb-0 font-semibold row-span-1 xl:text-2xl lg:text-xl overflow-hidden whitespace-nowrap text-overflow-ellipsis font-montserrat">{authorName}</H3m>
            <Pm className="pl-4 text-sm font-openSans font-normal z-20 row-span-1 overflow-hidden text-overflow-ellipsis">{wisdomText}</Pm>
          </div>
        </div>
      }

      <div className="relative -mt-24 lg:-mt-96 z-50">
        <button
          ref={leftButtonRef}
          className="mr-6"
          aria-label="scroll left button."
          onClick={handleGoLeft}
        >
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
            <Image src={LeftIcon} alt="" className="w-6 h-6"></Image>
          </div>
        </button>
        <button
          ref={rightButtonRef}
          aria-label="scroll right button."
          onClick={handleGoRight}
        >
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
            <Image src={RightIcon} alt="" className="w-6 h-6"></Image>
          </div>
        </button>
      </div>
    </figure>
  );
};