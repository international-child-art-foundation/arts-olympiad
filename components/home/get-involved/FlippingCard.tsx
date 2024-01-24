import React, {useEffect, useState} from "react";
import Image from "next/image";
import iteration from "../../../public/svgs/iteration-ccw.svg";
import {H2m} from "../../common/texts/H2m";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import {TinyStarIcon} from "./TinyStarIcon";
import "../../../src/styles/flipping-card.css";
import {LazyImage} from "../../common/images/LazyImage";

interface IProps extends React.HTMLProps<HTMLDivElement>{
  isFlippable: boolean
  touchScreenPrimary: boolean
  icon: string,
  heading1: string
  heading2: string
  description: React.ReactNode | string;
  color: string
}

export const FlippingCard = ({touchScreenPrimary, isFlippable, icon, heading1, heading2, description, color, children}: IProps) => {

  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleTouchStart = () => {
    if (isFlippable && !hovered) {
      setFlipped(!flipped);
    }
  };

  const handleMouseOver = () => {
    if (isFlippable) {
      setFlipped(true);
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isFlippable) {
      setFlipped(false);
      setHovered(false);
    }
  };

  const noop = () => {
    return;
  };

  useEffect(() => {
    if (!isFlippable) {
      setFlipped(false);
      setHovered(false);
    }
  }, [isFlippable]);

  return (
    <div
      style={{boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.07)"}}
      className={`
        ${isFlippable && flipped && "flip"}
        my-4 md:my-0 relative md:min-h-[280px] lg:min-h-[430px] xl:min-h-[468px] 2xl:min-h-[398px]
        z-10 bg-neutral-white cursor-pointer rounded-xl
      `}
      onTouchStart={touchScreenPrimary ? handleTouchStart : noop}
      onMouseOver={touchScreenPrimary ? noop : handleMouseOver}
      onMouseLeave={touchScreenPrimary ? noop : handleMouseLeave}
    >
      <article
        role="region"
        aria-live="polite"
        className={`
        ${isFlippable && flipped && "flip"}
        ${!isFlippable && "border-2"}
        card
        w-full h-full
        z-10 rounded-lg flex flex-col items-center p-6
          `}
        style={{borderColor: color}}
      >

        { // only displayed on md screens and bigger
          isFlippable &&
        <Image src={iteration} alt="" width={36} height={36} className="absolute top-4 right-4" />
        }

        { // front of the card on md screens and bigger
          !flipped &&
        <div className="front flex flex-col justify-start items-center h-full">
          <div className="relative my-5" >
            <div className="absolute -top-3 -right-1"><TinyStarIcon fill={color} /></div>
            <div className="absolute -top-1 -right-5"><TinyStarIcon fill={color} /></div>
            <div className="absolute top-3 -right-4"><TinyStarIcon fill={color} /></div>
            <LazyImage className="my-2" imageUrl={icon} alt="" width={56} height={56} />
            <div className="absolute -bottom-5 -left-2"><TinyStarIcon fill={color} /></div>
            <div className="absolute -bottom-1 -left-5"><TinyStarIcon fill={color} /></div>
            <div className="absolute bottom-3 -left-4"><TinyStarIcon fill={color} /></div>
          </div>
          <H2m className="my-2 text-dark-blue text-center" >{heading1}</H2m>
          <H3m className="my-2 text-dark-blue text-center" >{heading2}</H3m>
        </div>
        }

        { // back of the card on md screens and bigger
          isFlippable && flipped &&
        <div className="back h-full flex flex-col justify-between">
          {
            typeof description === "string"
              ?  <Pm className="my-12 font-light text-sm " > {description} </Pm>
              : description
          }
          {children}
        </div>
        }

        { // for small screen
          !isFlippable &&
        <>
          {
            typeof description === "string"
              ?  <Pm className="my-12 font-light text-sm " > {description} </Pm>
              : description
          }
          {children}
        </>
        }
      </article>
    </div>
  );
};