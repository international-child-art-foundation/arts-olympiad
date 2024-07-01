import Image from "next/image";
import {FlippingCardsStatic} from "./FlippingCardsStatic";
import {H2m} from "../../common/texts/H2m";
import swimmerBackground from "../../../public/home/MFS-Swimmer-Background.webp";

export const GetInvolvedStatic = () => {

  return (
    <div className="relative">
      <H2m className="z-10 font-medium text-3xl md:text-4xl text-center mb-16 font-montserrat" >Join our #MyFavoriteSport campaign</H2m>
      <div className="absolute inset-x-0 mx-auto h-full w-auto md:max-w-[1536px] overflow-hidden">
        <Image src={swimmerBackground} alt="" className="w-full h-full object-cover object-center blur-sm md:blur-none" />
      </div>
      <section className="relative px-8 mt-12 sm:mt-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto w-full">
        <div className="z-10">
          <FlippingCardsStatic/>
        </div>
      </section>
    </div>
  );
};