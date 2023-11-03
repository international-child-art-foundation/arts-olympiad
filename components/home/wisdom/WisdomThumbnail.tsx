import {IWisdom} from "../../../mock/wisdomItems";
import {LazyImage} from "../../common/images/LazyImage";
import {H3m} from "../../common/texts/H3m";

interface IProps {
  wisdom: IWisdom
  onClick: () => void
}

export const WisdomThumbnail = ({wisdom, onClick}: IProps) => {

  return (
    <div
      className="
      thumbnail
      overflow-hidden;
      cursor-pointer relative col-span-3 row-span-1 border-1 border-black rounded-xl h-[300px]
      "
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <LazyImage className="thumbnail-image w-full h-full object-cover" imageUrl={wisdom.url} alt={wisdom.alt} />
        <div
          className="
        thumbnail-textfield
        absolute bottom-0 w-full h-[20%] bg-[#D9D9D9]
        rounded-b-xl flex items-center justify-center font-semibold"
        >
          <H3m>{wisdom.author}</H3m>
        </div>
      </div>
    </div>
  );
};