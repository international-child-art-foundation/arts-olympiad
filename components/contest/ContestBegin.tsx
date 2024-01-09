import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import orangeBGmobile from "../../public/svgs/contest-svg/orangeBG-mobile.svg";
import orangeBGipad from "../../public/svgs/contest-svg/orangeBG-ipad.svg";
import orangeBGtablet from "../../public/svgs/contest-svg/orangeBG-tablet.svg";
import orangeBGsmall from "../../public/svgs/contest-svg/orangeBG-small.svg";
import orangeBGlarge from "../../public/svgs/contest-svg/orangeBG-large.svg";

export const ContestBegin = () => {
  return (
    <>
      <Image src={orangeBGmobile} alt="" width={767} height={446} className="absolute -z-10 sm:hidden -top-32 w-full h-full" />
      <Image src={orangeBGipad} alt="" width={1023} height={333} className="absolute -z-10 hidden sm:block lg:hidden -top-32 w-full h-full" />
      <Image src={orangeBGtablet} alt="" width={1279} height={377} className="absolute -z-10 hidden lg:block xl:hidden -top-48 w-full h-full" />
      <Image src={orangeBGsmall} alt="" width={1536} height={432} className="absolute -z-10 hidden xl:block 2xl:hidden -top-32 w-full h-[1000px]" />
      <Image src={orangeBGlarge} alt="" width={1536} height={432} className="absolute -z-10 hidden 2xl:block -top-32 right-0 w-full h-full mxl:h-[1000px]" />

      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">

        <div className="col-span-2 sm:col-span-1 md:mt-8">
          {/* <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl"> */}
          <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
            Contest Guidelines
          </h1>
          <div className="z-20 flex flex-row align-center mb-8">
            <Image src={hashtag} alt="" width={32} height={32}  />
            <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
              MyFavoriteSport<span className="sr-only">.</span>
            </h1>
          </div>
        </div>

        <div className="col-span-2 z-20 sm:col-span-1">            
          <Image src="/contest_header_image.webp" width = {390} height = {271} className="sm:ml-10 lg:ml-0 w-full rounded-[225px] lg:rounded-[300px]" alt="photo" />
        </div>

      </section>

    </>
  );
};