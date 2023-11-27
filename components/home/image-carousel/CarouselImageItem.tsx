import {StaticImageData} from "next/image";
import {LazyImage} from "../../common/images/LazyImage";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {Pm} from "../../common/texts/Pm";

interface IProps {
  imageUrl: string | StaticImageData
  alt: string
  artwork?: {
    id?: number,
    name?: string,
    votes?: number
    url: string | StaticImageData,
    country?: string,
    age?: number
    alt: string
  };
  objectCover?: boolean
  width ?: number
  mdwidth?: number
  height?: number
}
export const CarouselImageItem = ({imageUrl, alt, artwork, objectCover, width, mdwidth, height}: IProps) => {

  const {windowWidth} = useWindowDimensions();
  const finalWidth = windowWidth >= 768 ? mdwidth : width;

  return (
    <div className={"mx-1 min-w-[150px] md:min-w-[250px] h-[110px] md:h-[180px] relative"}>
      <LazyImage className={`${objectCover && "object-cover"}`} imageUrl={imageUrl} alt={alt} width={finalWidth} height={height || 110} />
      {
        windowWidth > 768 && artwork?.name &&
        <>
          <div
            style={{
              boxShadow: "0px 8px 9px 0px rgba(0, 0, 0, 0.06), 0px 20px 26px 0px rgba(0, 0, 0, 0.05)",
            }}
            className="flex items-center justify-center h-14 w-full absolute bottom-0 bg-[#ffffff] bg-opacity-60 backdrop-blur-[2px] rounded-b-xl"
          >
            <Pm className="text-center font-medium">{artwork?.name} - {artwork?.country}</Pm>
          </div>
        </>
      }
    </div>
  );
};