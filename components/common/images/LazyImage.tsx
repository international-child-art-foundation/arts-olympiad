import Image, {StaticImageData} from "next/image";
import React, {CSSProperties, forwardRef, HTMLProps} from "react";

interface IProps extends HTMLProps<HTMLImageElement>{
  imageUrl: string | StaticImageData
  alt: string
  width?: number
  height?: number
  style?: CSSProperties | undefined
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
// eslint-disable-next-line react/display-name
export const LazyImage = forwardRef(({imageUrl, alt, className, width, height, style}: IProps, forwardedRef: React.Ref<HTMLImageElement>) => {

  return (
    <Image
      ref={forwardedRef}
      className={`rounded-xl w-full h-full ${className}`}
      src={imageUrl}
      alt={alt}
      width={width || 0}
      height={height || 0}
      style={style}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/webp;base64,UklGRlACAABXRUJQVlA4WAoAAAAgAAAAagAAWwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggYgAAAHAFAJ0BKmsAXAA+7Xa3VimnJSOgyAEwHYlpANV8Anvo2pHzOeK98F4I3nYUfxVEkoTblAAA/uxJ38CStWbp/LM4V69igruuIzU/bw6qE4hTPSzQYBGssarhXTZFMLLAAAAA"
    />
  );
});