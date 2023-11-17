import Image from "next/image";
import {H2m} from "../../components/common/texts/H2m";
import {AnimatedScribble} from "../../components/common/decorations/AnimatedScribbleOrange";
import blueBG from "../../public/svgs/sponsor-blueblob.svg";
import blueBGmobile from "../../public/svgs/sponsor-blueblob-mobile.svg";

export const Advantage = () => {
  return (
    <>
      <Image src={blueBGmobile} alt="" width={685} height={737} className="absolute z-10 w-full h-max sm:hidden " />
      <Image src={blueBG} alt="" width={685} height={737} className="absolute z-10 hidden sm:block w-full h-max md:w-5/6 mxl:w-3/4 mb-10" />

      <section className="z-20 relative">                     
        <div className="mx-5% pt-28 xsm:block sm:hidden">
          <H2m className=" font-medium text-3xl" >The Sponsorship</H2m>
          <H2m className=" font-medium text-3xl mt-6" >Advantage</H2m>
          <AnimatedScribble width={280} smwidth={180} className="ml-6" />
        </div>

        <div className="pt-12 mx-5% xl:mx-10% sm:pt-32 md:pt-28 hidden sm:block">
          <H2m className="font-medium text-3xl" >The Sponsorship Advantage</H2m>
          <AnimatedScribble width={280} smwidth={180} className="ml-64 md:ml-64" />
        </div>

        <article className="ml-4 my-10 border-main-orange border-l-8">
          <p className="pt-20 w-2/3 sm:pt-0 mx-5% xl:mx-10% text-xl md:text-2xl font-semibold text-new-blue">
            People don’t just want to be spectators.
          </p>
          <p className="mt-6 pb-10 ml-36 sm:mt-2 sm:pb-0 sm:mx-5% xl:mx-10% text-base fond-light md:fond-thin text-new-blue">
            — Paris 2024 CEO Étienne Thobois
          </p>
        </article>

      </section>
    </>
  );
};

