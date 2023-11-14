import {StaticImageData} from "next/image";
import {LazyImage} from "../common/images/LazyImage";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {Pm} from "../common/texts/Pm";

interface IProps {
  artwork: {
    id?: number,
    name?: string,
    votes?: number
    url: string | StaticImageData,
    country?: string,
    age?: number
    alt: string
  };
  width ?: number
  mdwidth?: number
  height?: number
}
export const AboutArtworkCard = ({artwork, width, mdwidth, height}: IProps) => {

  const {windowWidth} = useWindowDimensions();
  const finalWidth = windowWidth >= 768 ? mdwidth : width;

  return (
    <div className={"mx-1 min-w-[220px] xsm:w-[250px] max-w-[250px] h-[180px] relative"}>
      <LazyImage imageUrl={artwork.url} alt={artwork.alt} width={finalWidth} height={height || 110} />
      <div
        style={{
          boxShadow: "0px 8px 9px 0px rgba(0, 0, 0, 0.06), 0px 20px 26px 0px rgba(0, 0, 0, 0.05)",
        }}
        className="flex items-center justify-center h-14 w-full opacity-60 absolute bottom-0 bg-[#ffffff] backdrop-blur-[15px] rounded-b-xl"
      >
        <Pm className="text-center font-medium">{artwork?.name} - {artwork?.country}</Pm>
      </div>
    </div>
  );
};