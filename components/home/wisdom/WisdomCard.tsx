import {IWisdom} from "../../../mock/wisdomItems";
import {LazyImage} from "../../common/images/LazyImage";
import mobileBlob from "../../../public/home/wisdom/wisdom-cloud-blob-mobile.svg";
import bigBlob from "../../../public/home/wisdom/wisdom-cloud-blob.svg";
import Image from "next/image";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps {
  wisdom: IWisdom
}

export const WisdomCard = ({wisdom}: IProps) => {

  const {width} = useWindowDimensions();

  if (width < 768) {
    return (
      <figure className="w-full">
        <div className="w-full h-[250px]" >
          <LazyImage imageUrl={wisdom.url} alt={wisdom.alt} className="object-cover" />
        </div>
        <div className="w-full -mt-16 ml-6 md:ml-12 xl:ml-24 relative h-full">
          <Image className="h-full min-w-[300px] w-full" src={width < 430 ? bigBlob : mobileBlob} alt=""/>
          <div className="h-full absolute inset-0 py-10 pl-16 pr-6 grid grid-rows-3 ">
            <H3m className="z-20 my-4 text-white text-center row-span-1" >{wisdom.author}</H3m>
            <Pm className=" text-sm z-20 text-white row-span-1">{wisdom.wisdomText}</Pm>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <LazyImage
      imageUrl={wisdom.url} alt={wisdom.alt}
      className="object-cover w-full col-span-8 row-span-2  md:h-[400px] lg:h-[500px] rounded-xl"
    />
  );

};