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
      className={`relative lg:max-w-[30%] lg:min-h-[440px] flex flex-col justify-stretch items-center p-6 mb-6 rounded-xl border-1 ${restProps.className}`}
      style={{boxShadow: "5px 6px 25px 4px rgba(0, 0, 0, 0.18)", backgroundColor: color}}
      onMouseOver={() => !touchScreenPrimary && setRevealTexture(true)}
      onMouseOut={() => !touchScreenPrimary && setRevealTexture(false)}
      onTouchStart={() => touchScreenPrimary && setRevealTexture(!revealTexture)}
      {...restProps}
    >
      <div className="w-full mt-10 flex flex-row xsm:flex-col justify-start items-center">
        {/* <Image src={icon} alt="" width={isTablet ? 40 : 20} height={20} className={`${!isTablet && "mr-4"}`}/> */}
        <Image src={icon} alt="" width={isTablet ? 40 : 20} height={20} className="select-none pointer-events-none"/>
        <h3 className="font-medium lg:font-semibold text-3xl my-5 font-montserrat">{heading}</h3>
      </div>
      {typeof(description) == "string" ? <Pm className="font-sans font-light text-base mb-6">{description}</Pm> : description}
      {
        isTablet &&
        <div className={`${revealTexture ? "opacity-1" : "opacity-0" }`}>
          {texture}
        </div>
      }
    </article>
  );
};