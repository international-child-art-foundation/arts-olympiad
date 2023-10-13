import underline from "../../../public/svgs/underline.svg";
import Image from "next/image";
import {FlippingCards} from "./FlippingCards";

export const WhyParticipate = () => {

  return (
    <section className="relative px-6 md:px-12 xl:px-24 mt-44 mb-36">
      <h2 className=" font-medium text-3xl md:text-4xl" >Why Participate?</h2>
      {
        <Image src={underline} alt="" width={180} height={16} className=" md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px] ml-16 md:ml-20 " />
      }
      <FlippingCards/>
    </section>
  );
};