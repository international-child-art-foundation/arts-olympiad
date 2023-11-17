"use client";
import "../../src/styles/fade-in-out-texture.css";
import React, {StaticImageData} from "next/image";
import {ReactNode, useState} from "react";
import {H3m} from "../common/texts/H3m";
import {Pm} from "../common/texts/Pm";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  icon: string | StaticImageData
  heading: string
  description: string | ReactNode
  color: string
  texture?: ReactNode
}

export const VisionCard = ({ icon, heading, description, color, texture, ...restProps } : IProps) => {

  const {windowWidth, touchScreenPrimary} = useWindowDimensions();
  const isTablet = windowWidth >= 1024;
  const [revealTexture, setRevealTexture] = useState(false);

  // const noop = () => {
  //   return;
  // };

  return (
    <article
      className={`relative lg:max-w-[30%] lg:min-h-[440px] flex flex-col justify-stretch items-center p-6 mb-6 rounded-xl border-1 ${restProps.className}`}
      style={{boxShadow: "5px 6px 25px 4px rgba(0, 0, 0, 0.18)", backgroundColor: color}}
      onMouseOver={() => !touchScreenPrimary && setRevealTexture(true)}
      onMouseOut={() => !touchScreenPrimary && setRevealTexture(false)}
      onTouchStart={() => touchScreenPrimary && setRevealTexture(!revealTexture)}
      {...restProps}
    >
      <div className="w-full flex flex-row lg:flex-col justify-start items-center">
        <Image src={icon} alt="" width={isTablet ? 50 : 30} height={30} className={`${!isTablet && "mr-4"}`}/>
        <H3m className="font-semibold my-5">{heading}</H3m>
      </div>
      <Pm className="font-sans font-light">{description}</Pm>
      {
        isTablet &&
        <div className={`opacity-0 ${revealTexture ? "fade-in" : "fade-out"}`}>
          {texture}
        </div>
      }
    </article>
  );
};