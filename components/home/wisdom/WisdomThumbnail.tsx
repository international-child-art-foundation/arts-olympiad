import {IWisdom} from "../../../mock/wisdomItems";
import {LazyImage} from "../../common/images/LazyImage";
import {H3m} from "../../common/texts/H3m";

interface IProps {
  wisdom: IWisdom
  onClick: () => void
}

export const WisdomThumbnail = ({wisdom, onClick}: IProps) => {
  return (
    <div className="relative col-span-1 row-span-1 border-1 border-black rounded-xl" onClick={onClick}>
      <LazyImage className="w-full h-full object-cover" imageUrl={wisdom.url} alt={wisdom.alt} />
      <div className="absolute bottom-0 w-full h-[20%] bg-[#D9D9D9] opacity-80 rounded-b-xl flex items-center justify-center font-semibold">
        <H3m>{wisdom.author}</H3m>
      </div>
    </div>
  );
};