import React from "react";
import Image, { StaticImageData } from "next/image";

interface IProps {
  src:string | StaticImageData
  alt:string
  isMobile?: boolean
  inversed?: boolean
}

function TimelineImage({src, alt, inversed}: IProps) {
  return (
    <div className={`w-1/2 z-20 ${inversed ? "px-6" : "px-0"} `}>
      <Image src={src} alt={alt} className={`z-20 ${inversed ? "ml-auto" : "left-0" }`}/>
    </div>
  );
}

export default TimelineImage;
