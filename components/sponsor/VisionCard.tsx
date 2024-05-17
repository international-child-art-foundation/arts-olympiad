"use client";
import "../../src/styles/fade-in-out-texture.css";
import React, {StaticImageData} from "next/image";
import {ReactNode, useState} from "react";
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

  return (
    <article
      className={`relative lg:w-1/4 flex flex-col justify-stretch items-center p-6 mb-6 rounded-xl border-1 ${restProps.className}`}
      style={{backgroundColor: color}}
      onMouseOver={() => !touchScreenPrimary && setRevealTexture(true)}
      onMouseOut={() => !touchScreenPrimary && setRevealTexture(false)}
      onTouchStart={() => touchScreenPrimary && setRevealTexture(!revealTexture)}
      {...restProps}
    >
      <div className="w-full mt-10 flex flex-row xsm:flex-col justify-start items-center">
        {/* <Image src={icon} alt="" width={isTablet ? 40 : 20} height={20} className={`${!isTablet && "mr-4"}`}/> */}
        <Image src={icon} alt="" width={isTablet ? 60 : 60} height={20} className="select-none pointer-events-none"/>
        <h3 className="font-semibold lg:font-semibold text-2xl my-5 font-montserrat text-center">{heading}</h3>
      </div>
      {typeof(description) == "string" ? <p className="font-sans font-light text-base mb-6 text-3xl w-full md:w-2/3 lg:w-full">{description}</p> : description}
      {
        isTablet &&
        <div className={`${revealTexture ? "opacity-50" : "opacity-0" }`}>
          {texture}
        </div>
      }
    </article>
  );
};