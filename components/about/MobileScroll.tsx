import Image from "next/image";
import Photo1 from "../../public/about/photo1.webp";
import Photo2 from "../../public/about/photo2.webp";
import Photo3 from "../../public/about/photo3.webp";
import Square from "../../public/about/Square.webp";
import YellowBlob from "../../public/about/YellowBlob.webp";
import YellowLine from "../../public/about/YellowLine.png";
import snowFlakeLeft from "../../public/about/snowFlakeLeft.png";
import snowFlakeRight from "../../public/about/snowFlakeRight.png";

const ImageCarousel = () => {
  return (
    <>
      <Image src={YellowLine} alt="" className="absolute z-40 w-8 select-none pointer-events-none"></Image>
      <Image src={snowFlakeLeft} alt="" className="absolute mt-40 z-10 w-8 select-none pointer-events-none"></Image>
      <Image src={snowFlakeRight} alt="" className="absolute right-0 mt-20 z-10 w-8 select-none pointer-events-none"></Image>
      <Image src={YellowBlob} alt="" className="absolute z-0 w-full h-60 mb-20 object-fill select-none pointer-events-none"></Image>
      <div className="z-20 flex flex-row overflow-x-auto max-w-[800px] m-auto whitespace-nowrap px-4 mt-10">
        <Image src={Square} alt="" className="px-2 w-42 h-40 z-20 object-scale-down"/>
        <Image src={Photo1} alt="" className="px-2 w-42 h-40 z-20 object-scale-down"/>
        <Image src={Photo2} alt="" className="px-2 w-42 h-40 z-20 object-scale-down"/>
        <Image src={Photo3} alt="" className="px-2 w-42 h-40 z-20 object-scale-down"/>
      </div>
    </>

  );
};
export default ImageCarousel;

