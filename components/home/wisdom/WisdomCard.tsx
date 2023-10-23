import {IWisdom} from "../../../mock/wisdomItems";
import {LazyImage} from "../../common/images/LazyImage";
import mobileBlob from "../../../public/home/wisdom/wisdom-cloud-blob-mobile.svg";
import bigBlob from "../../../public/home/wisdom/wisdom-cloud-blob.svg.svg";
import Image from "next/image";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";

interface IProps {
  wisdom: IWisdom
}

export const WisdomCard = ({wisdom}: IProps) => {
  return (
    <figure className="w-full">
      <LazyImage imageUrl={wisdom.url} alt={wisdom.alt} className="object-cover" />
      <div className="-mt-16 relative h-full">
        <Image className="h-full" src={mobileBlob} alt=""/>
        <div className="h-full absolute inset-0 p-10 flex flex-col ">
          <H3m className="z-20 my-4 text-white text-center" >{wisdom.author}</H3m>
          <Pm className="z-20 text-white">{wisdom.wisdomText}</Pm>
        </div>
      </div>
    </figure>
  );
};