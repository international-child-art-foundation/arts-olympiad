import Image, {StaticImageData} from "next/image";
import React, {useState, useEffect} from "react";
import {LazyImage} from "../../common/images/LazyImage";

interface IProps {
  imageUrl: string | StaticImageData
  alt: string
}
export const CarouselImageItem = ({imageUrl, alt}: IProps) => {

  return (
    <figure className=" mx-1 min-w-[150px] md:min-w-[250px] min-h-[110px] md:min-h-[180px] max-h-[110px] md:max-h-[180px]">
      <LazyImage imageUrl={imageUrl} alt={alt} width={150} height={110} />
    </figure>
  );
};