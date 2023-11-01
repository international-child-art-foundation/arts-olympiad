import {StaticImageData} from "next/image";
import {LazyImage} from "../../common/images/LazyImage";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps {
  imageUrl: string | StaticImageData
  alt: string
  objectCover?: boolean
  width ?: number
  mdwidth?: number
}
export const CarouselImageItem = ({imageUrl, alt, objectCover, width, mdwidth}: IProps) => {

  const {windowWidth} = useWindowDimensions();
  const finalWidth = windowWidth >= 768 ? mdwidth : width;
  // mx-1 min-w-[150px] md:min-w-[250px] h-[110px] md:h-[180px]
  return (
    <div className={`mx-1 min-w-[${finalWidth}px] md:min-w-[${finalWidth}px] `}>
      <LazyImage className={`${objectCover && "object-cover"}`} imageUrl={imageUrl} alt={alt} width={finalWidth} height={110} />
    </div>
  );
};