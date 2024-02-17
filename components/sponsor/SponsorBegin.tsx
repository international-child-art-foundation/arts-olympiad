import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import yellowBGmobile from "../../public/svgs/sponsor-svg/yellowBG-mobile.svg";
import yellowBGipad from "../../public/svgs/sponsor-svg/yellowBG-ipad.svg";
import yellowBGtablet from "../../public/svgs/sponsor-svg/yellowBG-tablet.svg";
import yellowBGsmall from "../../public/svgs/sponsor-svg/yellowBG-small.svg";
import yellowBGlarge from "../../public/svgs/sponsor-svg/yellowBG-large.svg";

export const SponsorBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="col-span-2 sm:col-span-1 md:mt-8">
          <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
            Sponsor
          </h1>
          <div className="w-auto mb-8 z-20">
            <h2 className="z-20 font-light text-lg lg:w-4/5 md:w-1/2">
              A global emotional branding opportunity to win over young hearts and minds and grow lifelong customers or audiences.
            </h2>
          </div>
        </div>
        <div className="col-span-2 z-20 sm:col-span-1 flex justify-center item-center">            
          <Image src="/sponsor/heart_earth_combination.svg" width = {380} height = {323} className="sm:ml-10 lg:ml-0 w-2/3" alt=""/>
        </div>
      </section>
    </>
  );
};