import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import pinkBGmobile from "../../public/svgs/impact-svg/pinkBG-mobile.svg";
import pinkBGipad from "../../public/svgs/impact-svg/pinkBG-ipad.svg";
import pinkBGtablet from "../../public/svgs/impact-svg/pinkBG-tablet.svg";
import pinkBGsmall from "../../public/svgs/impact-svg/pinkBG-small.svg";
import pinkBGlarge from "../../public/svgs/impact-svg/pinkBG-large.svg";
import impactHeaderImage from "../../public/impact/impact_header_image.webp";
import { BodyLayout, TitleLayout } from "@/app/ClientComponent";

export const ImpactBegin = () => {
  return (
    <>
      <Image src={pinkBGmobile} alt="" width={767} height={446} className="absolute z-10 sm:hidden -top-32 w-full h-full" />
      <Image src={pinkBGipad} alt="" width={1023} height={333} className="absolute z-10 hidden sm:block lg:hidden -top-32 w-full h-full pb-10" />
      <Image src={pinkBGtablet} alt="" width={1279} height={377} className="absolute z-10 hidden lg:block xl:hidden -top-48 right-0 w-full h-full" />
      <Image src={pinkBGsmall} alt="" width={1536} height={432} className="absolute z-10 hidden xl:block 2xl:hidden -top-32 w-full h-[1000px]" />
      <Image src={pinkBGlarge} alt="" width={1536} height={432} className="absolute z-10 hidden 2xl:block -top-32 right-0 w-full h-full mxl:h-[1000px]" />

      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">

        <div className="col-span-2 sm:col-span-1 md:mt-8">
          <TitleLayout>
            <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
              Impact of ICAF and
            </h1>
            <div className="z-20 flex flex-row align-center mb-8">
              <Image src={hashtag} alt="" width={32} height={32}  />
              <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                MyFavoriteSport<span className="sr-only">.</span>
              </h1>
            </div>
          </TitleLayout>
          <BodyLayout>
            <div className="w-auto mb-8 z-20">
              <h2 className="z-20 font-light text-lg lg:w-4/5 mxl:w-1/2">
                Grow engagement in the Olympics through the art of sport.
              </h2>
            </div>
          </BodyLayout>
        </div>

        <div className="col-span-2 z-20 sm:col-span-1">            
          <Image src={impactHeaderImage} width = {390} height = {271} className="sm:ml-10 lg:ml-0 w-full rounded-[225px] lg:rounded-[300px]" alt="photo" />
        </div>

      </section>

    </>
  );
};