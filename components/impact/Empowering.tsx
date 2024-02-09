import Image from "next/image";
import yellowBGmobile from "../../public/svgs/impact-svg/yellowBG-mobile.svg";
import yellowBGipad from "../../public/svgs/impact-svg/yellowBG-ipad.svg";
import yellowBGtablet from "../../public/svgs/impact-svg/yellowBG-tablet.svg";
import yellowBGsmall from "../../public/svgs/impact-svg/yellowBG-small.svg";
import yellowBGlarge from "../../public/svgs/impact-svg/yellowBG-large.svg";
import yellowTiny from "../../public/svgs/impact-svg/yellowBlobTiny.svg";
import icafLogo from "../../public/svgs/Icaf-logo.svg";
import headsLarge from "../../public/impact/heads-large.webp";
import headsSmall from "../../public/impact/heads-small.webp";
import colorfulScribble from "../../public/svgs/colorful-scribble.svg";
import { BodyLayout, TitleLayout } from "@/app/ClientComponent";

export const Empowering = () => {
  return (
    <>
      <Image src={yellowBGmobile} alt="" width={767} height={446} className="absolute -z-10 sm:hidden w-full h-full" />
      <Image src={yellowBGipad} alt="" width={1023} height={333} className="absolute -z-10 hidden sm:block lg:hidden w-full h-full mt-32" />
      <Image src={yellowBGtablet} alt="" width={1279} height={377} className="absolute -z-10 hidden lg:block xl:hidden w-full h-full mt-24" />
      <Image src={yellowBGsmall} alt="" width={1536} height={432} className="absolute -z-10 hidden xl:block 2xl:hidden w-full mt-48" />
      <Image src={yellowBGlarge} alt="" width={1536} height={432} className="absolute -z-10 right-0 hidden 2xl:block w-full 2xl:w-[1536px] h-full mt-32" />
      <Image src={yellowTiny} alt="" width={1536} height={432} className="absolute -z-10 w-fit h-fit mt-12 ml-40 xsm:-mt-8 sm:mt-36 sm:ml-96 md:mt-32 md:ml-[600px] lg:mt-24 lg:ml-[700px] xl:mt-52 xl:ml-[650px] 2xl:mt-36 2xl:right-0 2xl:mr-[600px]" />

      <section className="relative grid grid-cols-3 z-20 mt-32 sm:mt-80 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">

        <Image src={icafLogo} alt="ICAF Logo" className="col-span-3 sm:col-span-1 mx-auto my-auto w-full h-full lg:order-2" />

        <div className="mt-6 col-span-3 lg:col-span-2 lg:order-1">
          <TitleLayout>
            <h2 className="text-3xl font-normal ">
              Empowering the Next <span className="inline-block">
                Generation
                <Image src={colorfulScribble} alt="" width={250} height={20} />
              </span>
            </h2>
          </TitleLayout>
          <BodyLayout>
            <p className="mt-6 text-xl font-light">
              ICAF has enhanced the self-esteem of over five million young people children by providing them opportunities to create original works and showcasing their art globally. Our initiatives foster bonds of friendship and understanding, empowering children to become globally competent citizens.
            </p>
          </BodyLayout>
        </div>

        <Image src={headsSmall} alt="" width={390} height={271} className="mt-10 col-span-3 mx-auto my-auto w-full h-fit lg:hidden" />
        <Image src={headsLarge} alt="" width={390} height={271} className="mt-11 col-span-3 mx-auto my-auto w-full h-fit hidden lg:block lg:order-3" />
        
      </section>

    </>
  );
};