import underline from "../../../public/svgs/underline.svg";
import tinyBlob from "../../../public/svgs/tiny-vertical-pink-blob.svg";
import bigBlob from "../../../public/svgs/vertical-big-pink-blob.svg";
import Image from "next/image";
import {FlippingCards} from "./FlippingCards";
import {SideImages} from "./SideImages";
import blueblob from "../../../public/svgs/blueblob.svg";
import {H2m} from "../../common/texts/H2m";

export const WhyParticipate = () => {

  return (
    <section className="relative px-6 md:px-12 xl:px-24 mt-44">
      <H2m className="z-10 font-medium" >Why Participate?</H2m>
      <Image src={underline} alt="" width={180} height={16} className="z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px] ml-16 md:ml-20 " />

      <div className="z-10 lg:grid lg:grid-cols-2">
        <FlippingCards/>
        <SideImages />
      </div>


      {/*BLOBS */}

      <div className="absolute -z-10 inset-0">
        <Image
          src={tinyBlob} alt="" width={80} height={55}
          className=" absolute z-0 top-0 right-96 mxl:right-[800px]"
        />

        <Image
          src={bigBlob} alt="" width={600} height={443}
          className="absolute z-0 top-0 right-0 mxl:right-80"
        />
      </div>

    </section>
  );
};