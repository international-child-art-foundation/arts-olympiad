import LeftIcon from "../../../public/impact/left-icon.svg";
import RightIcon from "../../../public/impact/right-icon.svg";
import Image from "next/image";
import { artistShowcaseList } from "../../../mock/artistShowcaseItems";

interface ArtistShowcaseControlsInterface {
  activeIndex: number
  setActiveIndex: (i: number) => void;
}


export const ArtistShowcaseControls: React.FC<ArtistShowcaseControlsInterface> = ({activeIndex, setActiveIndex}) => {
  const totalItems = artistShowcaseList.length;
  const handleNext = () => {
    const newIndex = (activeIndex + 1) % totalItems;
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + totalItems) % totalItems;
    setActiveIndex(newIndex);
  };

  return (
    <div className="mt-4 mx-auto w-auto flex justify-center">
      <a className="prev my-auto cursor-pointer select-none" onClick={handleNext}>
        <div className="mr-6 w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
          <Image src={LeftIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
        </div>
      </a>
      <a className="next my-auto cursor-pointer select-none " onClick={handlePrev}>
        <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
          <Image src={RightIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
        </div>
      </a>
    </div>       
  );
};