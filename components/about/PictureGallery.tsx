import Image from "next/image";
import Rectangle from "../../public/about/Rectangle.webp";
import Photo1 from "../../public/about/photo1.webp";
import Photo2 from "../../public/about/photo2.webp";
import Photo3 from "../../public/about/photo3.webp";
import YellowBlob from "../../public/about/YellowBlob.png";
import YellowLine from "../../public/about/YellowLine.png";
import snowFlakeLeft from "../../public/about/snowFlakeLeft.png";
import snowFlakeRight from "../../public/about/snowFlakeRight.png";

export const PictureGallery = () => {
  return (
    <>          
      <section className="mx-auto max-w-screen-2xl ">
        <Image src={YellowBlob} alt="" className="absolute z-0 mt-20 select-none pointer-events-none object-fill"></Image>
        <div className="grid grid-cols-3 z-20 mt-20 w-full px-20">
          <div className="col-span-3 py-5 px-5 z-20">
            <Image src={Rectangle} alt="" className="z-20"></Image>
          </div>     
          <div className="z-20 py-5 px-5 relative">
            <Image src={YellowLine} alt="" className="absolute z-10 w-20 -left-10 -top-5 pointer-events-none"></Image>
            <Image src={snowFlakeLeft} alt="" className="absolute z-10 w-10 -left-10 bottom-0 pointer-events-none"></Image>
            <Image src={Photo1} alt="" width={500} height={500} className="object-contain"></Image>
          </div>
          <div className="z-20 py-5 px-5">
            <Image src={Photo2} alt="" className=""></Image>
          </div>
          <div className="z-20 py-5 px-5 relative">
            <Image src={snowFlakeRight} alt="" className="absolute right-0 mt-20 z-10 w-10 -right-10 bottom-0 pointer-events-none"></Image>
            <Image src={Photo3} alt="" className=""></Image>
          </div>
        </div>
      </section>    
    </>
  );
};