import Image from "next/image";
import {FlippingCardsStatic} from "./FlippingCardsStatic";
import {H2m} from "../../common/texts/H2m";
import swimmerBackground from "../../../public/home/MFS-Swimmer-Background.webp";
// import hashtag from "../../../public/home/hashtag.svg";
export const GetInvolvedStatic = () => {

  return (
    <div className="relative">
      <H2m className="z-10 font-medium text-3xl md:text-4xl text-center mb-16 font-montserrat leading-relaxed" >Join our <span className="italic">#MyFavoriteSport</span> campaign</H2m>
      <div className="absolute inset-x-0 mx-auto w-full h-full w-auto max-w-screen-2xl overflow-hidden">
        <Image src={swimmerBackground} alt="" className="w-full h-full object-center object-cover blur-sm md:blur-none" />
      </div>
      <section className="relative px-8 mt-12 sm:mt-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto w-full">
        <div className="z-10">
          <FlippingCardsStatic/>
        </div>
      </section>
    </div>
  );
};