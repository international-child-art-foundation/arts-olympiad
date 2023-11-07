import React, { useState, useEffect } from "react";
import {StaticImageData} from "next/image";
import {LazyImage} from "../../common/images/LazyImage";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps {
  imageUrl: string | StaticImageData
  alt: string
  objectCover?: boolean
  width ?: number
  mdwidth?: number
  height?: number
}
export const CarouselImageItem = ({ imageUrl, alt, objectCover, width, mdwidth, height }: IProps) => {
  const { windowWidth } = useWindowDimensions();
  const [finalWidth, setFinalWidth] = useState(width);

  useEffect(() => {
    // This effect will run after the component mounts, ensuring window dimensions are available
    const updateWidth = windowWidth >= 768 ? mdwidth : width;
    setFinalWidth(updateWidth);
  }, [windowWidth, width, mdwidth]);

  return (
    <div className={`mx-1 ${finalWidth ? `min-w-[${finalWidth}px]` : ""} md:min-w-[250px] `}>
      <LazyImage className={`${objectCover ? "object-cover" : ""}`} imageUrl={imageUrl} alt={alt} width={finalWidth} height={height || 110} />
    </div>
  );
};
