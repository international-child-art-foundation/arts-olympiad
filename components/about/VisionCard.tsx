"use client";
import React, {StaticImageData} from "next/image";
import {ReactNode} from "react";
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

  const {windowWidth} = useWindowDimensions();

  return (
    <article
      className={`relative md:max-w-[30%] flex flex-col justify-stretch items-center p-6 mb-6 rounded-xl border-1 ${restProps.className}`}
      style={{boxShadow: "5px 6px 25px 4px rgba(0, 0, 0, 0.18)", backgroundColor: color}}
      {...restProps}
    >
      <Image src={icon} alt="" width={50} height={30} />
      <H3m className="font-semibold my-10 text-center">{heading}<span className="sr-only">.</span></H3m>
      <Pm className="font-sans font-light">{description}<span className="sr-only">.</span></Pm>
      {
        windowWidth >= 768 &&
        texture
      }
    </article>
  );
};