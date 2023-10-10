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
 * @description a lazy loaded server-side rendered image component, falling back to blue div while it's not fully loaded
 */
export const LazyImage = ({imageUrl, alt, classes, width, height}: IProps) => {

  return (
    <Image
      className={`rounded-lg object-fit w-full h-full ${classes}`}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRlACAABXRUJQVlA4WAoAAAAgAAAAagAAWwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggYgAAAHAFAJ0BKmsAXAA+7Xa3VimnJSOgyAEwHYlpANV8Anvo2pHzOeK98F4I3nYUfxVEkoTblAAA/uxJ38CStWbp/LM4V69igruuIzU/bw6qE4hTPSzQYBGssarhXTZFMLLAAAAA"
    />
  );
};