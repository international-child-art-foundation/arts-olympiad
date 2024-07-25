"use client";
import "../../../src/styles/wisdom-carousel.css";
import Image from "next/image";
import scrollLeft from "../../../public/svgs/scroll-left.svg";
import scrollRight from "../../../public/svgs/scroll-right.svg";
import {wisdomList} from "../../../mock/wisdomItems";
import React, {useEffect, createRef, useRef, useState} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { WisdomCard } from "./WisdomCard";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import { gsap } from "gsap";
import { Position, centerPosition, rightPosition, leftPosition } from "../../../mock/positions"; 


export const WisdomCarousel = () => {
  const leftButtonRef = useRef<HTMLButtonElement | null>(null);
  const rightButtonRef = useRef<HTMLButtonElement | null>(null);
  const wisdomTextRef = useRef<HTMLDivElement | null>(null);
  const [intersectionTarget, isTargetIntersecting, setCleanupFunctions] = useIntersectionObserver({ threshold: 0.2 });
  const [currentWisdom, setCurrentWisdom] = useState(0);
  const wisdomCardRefs = useRef(wisdomList.map(() => createRef<HTMLDivElement>()));

  const [wisdomText, setWisdomText] = useState(wisdomList[currentWisdom].wisdomText);
  const [authorName, setAuthorName] = useState(wisdomList[currentWisdom].author);

  // effect to listen to keyboard arrow buttons clicks and control the carousel
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

  useEffect(() => {
    const textContainer = wisdomTextRef.current;
    if (textContainer) {
      // Measure the required height
      textContainer.style.height = "auto";
      const newHeight = textContainer.scrollHeight + "px";
      textContainer.style.height = "0";
  
      // Expand the container to fit new content
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
  
  useEffect(() => {
    const animateCards = () => {
      wisdomList.forEach((wisdom, i) => {
        const cardRef = wisdomCardRefs.current[i];
        let position: Position;
    
        if (i === currentWisdom) {
          position = centerPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "2";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 0, duration: 0.4 });
          }
        } else if (i === currentWisdom - 1 || (currentWisdom === 0 && i === wisdomList.length - 1)) {
          position = leftPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        } else {
          position = rightPosition;
          if (cardRef.current) {
            cardRef.current.style.zIndex = "1";
            gsap.to(cardRef.current.querySelector(".cardLabel"), { opacity: 1, duration: 0.4 });
          }
        }
    
        gsap.to(cardRef.current, {
          x: position.left,
          y: position.top,
          width: position.width,
          height: position.height,      
          duration: 0.7,
          ease: "slow(0.3,0.7,false)",});
      });

      // Animate Pm and H3m text
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
    
    animateCards();
  }, [currentWisdom]);
  
  return (
    <figure className="z-5 flex flex-col justify-center items-center bg-transparent h-visionary-thinkers-md overflow-hidden" ref={intersectionTarget}>
      {
        <div className=" z-5 relative w-full h-full">
          <div
            ref={wisdomTextRef}
            className="flex flex-col md:flex-col text-white p-5 absolute right-0 bottom-[-1px] z-10 bg-gray-700 -translate-y-48 mb-1 md:-translate-y-52 opacity-90 rounded-xl w-full md:w-60 w-96 overflow-hidden max-w-full"
          >
            <Pm className="text-sm z-10 row-span-1 text-end overflow-hidden  text-overflow-ellipsis">{wisdomText}</Pm>
            <H3m className="z-10 mt-4 text-right font-semibold overline row-span-1 xl:text-2xl lg:text-xl overflow-hidden whitespace-nowrap text-overflow-ellipsis font-montserrat pt-2">{authorName}</H3m>
          </div>
          {
            wisdomList
              .map((wisdom, i) =>
                <WisdomCard
                  ref={wisdomCardRefs.current[i]}
                  key={wisdom.author}
                  wisdom={wisdom}
                  onClick={() => handleIndicatorClick(i)}
                />
              )
          }
        </div>
      }

      <div className="w-full flex flex-col md:flex-row justify-start items-center md:grid md:grid-rows-2 md:grid-cols-6 md:gap-4 justify-center mt-8">
        {/* Current item indicators */}
        <div className="my-6 flex flex-row mx-[10%] md:mx-[0%] md:row-start-1 md:row-end-3 md:col-start-3 md:col-end-5 justify-self-center opacity-0 pointer-events-none ">
          {
            wisdomList.map((wisdom, i) => {
              return (
                <div
                  key={wisdom.author}
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

        <div className="md:row-start-1 md:row-end-3 md:col-start-5 md:col-end-7 md:flex md:justify-end pointer-events-none opacity-0" >
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