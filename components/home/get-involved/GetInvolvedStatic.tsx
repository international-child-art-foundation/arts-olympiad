import Image from "next/image";
import {FlippingCardsStatic} from "./FlippingCardsStatic";
import {H2m} from "../../common/texts/H2m";
import swimmerBackground from "../../../public/home/MFS-Swimmer-Background-Small.webp";
// import hashtag from "../../../public/home/hashtag.svg";
export const GetInvolvedStatic = () => {

  return (
    <div className="relative">
      <H2m className="col-span-1 z-10 font-medium text-3xl md:text-4xl text-center font-montserrat leading-relaxed px-2" >Join the <span className="font-semibold">#MyFavoriteSport</span> campaign</H2m>
      <p className="col-span-1 z-10 font-medium text-xl md:text-2xl text-center mb-16 font-montserrat leading-relaxed px-2" >of the <a href="https://icaf.org/" className="italic underline" target="_blank" rel="noopener noreferrer" >International Child Art Foundation</a></p>
      <div className="relative grid grid-cols-1 grid-rows-1 w-full h-full">
        <Image src={swimmerBackground} alt="" className="col-start-1 col-span-1 row-start-1 row-span-1 w-full h-full object-center object-cover blur-sm md:blur-none max-w-[1920px] mx-auto 3xl:-mt-16  pointer-events-none select-none " />
        <section className="col-start-1 col-span-1 row-start-1 row-span-1 flex items-center justify-center px-8 mt-12 sm:mt-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto w-full 3xl:mt-16 ">
          <div className="z-10">
            <FlippingCardsStatic />
          </div>
        </section>
      </div>
    </div>
  );
};