"use client";
import Image, {StaticImageData} from "next/image";
import React, {useState} from "react";

interface IProps {
  imageUrl: string | StaticImageData
  alt: string
  classes?: string
  width?: number
  height?: number
}

/**
 *
 * @param imageUrl
 * @param alt
 * @param classes - tailwind classnames
 * @param width
 * @param height
 * @description a lazy loaded image component, falling back to blue div while it's not fully loaded
 * @note it's pretty slow and intended for client-side use only
 */
export const LazyClientImage = ({imageUrl, alt, classes, width, height}: IProps) => {

  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full rounded-lg bg-secondary-blue">
      <Image
        className={`rounded-lg object-fit w-full h-full ${loading && "invisible"} ${classes}`}
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        placeholder="blur"
        blurDataURL=""
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};