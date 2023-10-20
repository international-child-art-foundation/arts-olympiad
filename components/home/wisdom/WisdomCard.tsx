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
    <figure className="relative">
      <LazyImage imageUrl={wisdom.url} alt={wisdom.alt} className="w-full max-h-[200px] object-cover" />
      <div className="relative">
        <Image className="absolute top-52" src={mobileBlob} alt=""/>
        <H3m className="absolute top-5" >{wisdom.author}</H3m>
        <Pm className="absolute top-10">{wisdom.wisdomText}</Pm>
      </div>
    </figure>
  );
};