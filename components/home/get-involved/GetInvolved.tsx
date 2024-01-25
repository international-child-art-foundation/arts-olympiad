import tinyBlob from "../../../public/svgs/blobs/tiny-vertical-pink-blob.svg";
import bigBlob from "../../../public/svgs/blobs/vertical-big-pink-blob.svg";
import Image from "next/image";
import {FlippingCards} from "./FlippingCards";
import {SideImages} from "./SideImages";
import {H2m} from "../../common/texts/H2m";
import {AnimatedScribble} from "../../common/decorations/AnimatedScribble";

export const GetInvolved = () => {

  return (
    <section className="relative px-8 md:px-12 lg:px-16 xl:px-20 mt-8 max-w-screen-2xl m-auto w-full">
      <H2m className="z-10 font-medium text-3xl md:text-4xl" >Come on! Participate!</H2m>
      <AnimatedScribble width={280} smwidth={180} className="stroke-new-blue z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px] ml-20 " />

      <div className="z-10 lg:grid lg:grid-cols-2">
        <FlippingCards/>
        <SideImages />
      </div>


      {/*BLOBS */}

      <div className="absolute -z-10 inset-0">
        <Image
          src={tinyBlob} alt="" width={80} height={55}
          className=" absolute z-0 top-0 right-96 mxl:right-[800px] select-none pointer-events-none"
        />

        <Image
          src={bigBlob} alt="" width={600} height={443}
          className="absolute z-0 top-0 right-0 mxl:right-80 select-none pointer-events-none"
        />
      </div>

    </section>
  );
};