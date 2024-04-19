import {H3m} from "../common/texts/H3m";
// import {H2m} from "../common/texts/H2m";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import "../../src/styles/accordion.css";
import React, {Dispatch, SetStateAction, useState, useEffect, useRef, useLayoutEffect} from "react";
import {ReactNode} from "react";


interface IProps {
  className?: string
  isOpen: boolean
  setIsOpen: (i: number) => void
  color: string
  number: number
  header: string
  paragraph: ReactNode
  images: ReactNode
  minimalContentWidth: number | undefined
  setMinimalContentWidth: Dispatch<SetStateAction<number | undefined>>
  contentWidthWasSet: boolean
  setContentWidthWasSet: Dispatch<SetStateAction<boolean>>
}

export const AccordionCard = (
  {className, isOpen, setIsOpen, color, number, header, paragraph, images, minimalContentWidth, setMinimalContentWidth, contentWidthWasSet, setContentWidthWasSet}
    : IProps
) => {

  const minimalContentWidthWithPadding = minimalContentWidth && minimalContentWidth - 48;
  const {windowWidth} = useWindowDimensions();
  const displayhorizontally = windowWidth >= 1024;
  // State to control the visibility and class of the content
  const [contentVisible, setContentVisible] = useState(isOpen);
  const [transitionClass, setTransitionClass] = useState("content-out");
  const cardRef = useRef< HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContentVisible(true);
      // Delay setting the transition class slightly to ensure the element is rendered
      const timer = setTimeout(() => {
        setTransitionClass("content-in");
      }, 10); // Short delay

      return () => clearTimeout(timer);
    } else {
      setTransitionClass("content-out");
      // Start the "content-out" transition
      const timer = setTimeout(() => {
        setContentVisible(false); // Remove the element after the transition
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // an effect to scroll into view of the card once all transitions are over
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!displayhorizontally && isOpen) {
        cardRef.current?.scrollIntoView({behavior: "smooth"});
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [isOpen, displayhorizontally]);

  // an effect that sets minimal content width to avoid content wrapping
  useLayoutEffect(() => {
    if (displayhorizontally && isOpen && !contentWidthWasSet) {
      setContentWidthWasSet(true);
      setMinimalContentWidth(cardRef.current?.clientWidth);
    }
  }, [displayhorizontally, isOpen, contentWidthWasSet, setContentWidthWasSet, setMinimalContentWidth]);
  
  return (
    <article
      style={{backgroundColor: color}}
      ref={cardRef}
      className={`
      ${isOpen ? "cursor-default" : "cursor-pointer"}
      ${
    isOpen && displayhorizontally ? "slide-in" : !isOpen && displayhorizontally ? "slide-out" :
      isOpen && !displayhorizontally ? "slide-up" : !isOpen && !displayhorizontally && "slide-down"
    }
      ${className} flex flex-col 
      min-h-[85px]
      lg:flex-row lg:min-w-[85px] 
      cursor-pointer
      `}
      onClick={() => setIsOpen(number)}
    >
      <div
        className="flex flex-row lg:flex-col lg:justify-between min-w-[80px] p-6 items-center"
      >
        <H3m useBreakNormal={true} className="font-bold text-center mr-6 lg:mr-0">0{number}</H3m>
        <h3
          className={`text-2xl ${!displayhorizontally ? "font-montserrat" : ""}`}
          style={{writingMode: displayhorizontally ? "vertical-lr": "horizontal-tb", transform: displayhorizontally ? "rotate(180deg)" : ""}}
        >
          {header}
        </h3>
      </div>

      { contentVisible &&
        <div
          className={`${transitionClass} flex flex-col p-12 pt-8 overflow-hidden`}
          style={{minWidth: displayhorizontally ? minimalContentWidthWithPadding + "px" : "" }}
        >
          {
            displayhorizontally &&
            <h2 className="font-light font-montserrat text-2xl lg:text-3xl">{header}</h2>
          }
          {paragraph}
          {images}
        </div>
      }

    </article>
  );
};