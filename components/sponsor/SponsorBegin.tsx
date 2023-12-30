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
      <Image src={yellowBGmobile} alt="" width={767} height={446} className="absolute z-10 sm:hidden -top-32 w-full h-full" />
      <Image src={yellowBGipad} alt="" width={1023} height={333} className="absolute z-10 hidden sm:block lg:hidden -top-32 w-full h-full" />
      <Image src={yellowBGtablet} alt="" width={1279} height={377} className="absolute z-10 hidden lg:block xl:hidden -top-48 w-full h-full" />
      <Image src={yellowBGsmall} alt="" width={1536} height={432} className="absolute z-10 hidden xl:block 2xl:hidden -top-32 w-full h-[1000px]" />
      <Image src={yellowBGlarge} alt="" width={1536} height={432} className="absolute z-10 hidden 2xl:block -top-32 right-0 w-full h-full mxl:h-[1000px]" />

      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">

        <div className="col-span-2 sm:col-span-1 md:mt-8">
          <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
            Sponsor
          </h1>
          <div className="z-20 flex flex-row align-center mb-8">
            <Image src={hashtag} alt="" width={32} height={32}  />
            <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
              MyFavoriteSport<span className="sr-only">.</span>
            </h1>
          </div>
          <div className="w-auto mb-8 z-20">
            <h2 className="z-20 font-light text-lg lg:w-4/5 mxl:w-1/2">
              Engage creative youth worldwide — a critical demographic for your company's global emotional branding and sustained growth.
            </h2>
          </div>
        </div>

        <div className="col-span-2 z-20 sm:col-span-1">            
          <Image src="/sponsor_header_image.webp" width = {390} height = {271} className="sm:ml-10 lg:ml-0 w-full rounded-[225px] lg:rounded-[300px]" alt="photo" />
          {/*<Image src="/photo-sponsor.webp" width = {390} height = {271} className="sm:ml-10 lg:ml-0 w-full rounded-[225px] lg:rounded-[300px] shadow-[8px_18px_0_-6px_rgba(251,178,46,1)]" alt="photo" />*/}
        </div>

      </section>

      <article className="relative z-20 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 font-light text-lg leading-loose pt-36 lg:pt-24">
        <h2>The global art contest <span className="font-semibold">#MyFavoriteSport</span> begins in <span className="font-semibold">March 2024</span> at an interactive exhibition in Paris, where young visitors produce and upload their artwork and share it with family and friends to get their votes.</h2>
        <h2>Over the next three months, this "Create & Share" activity will spread worldwide and can go viral, engaging millions. The winners selected by public votes will be announced on July 1st at a press conference at the National Mall across the U.S. Capitol during the 7th World Children's Festival. With your support, the gold, silver, and bronze winners will attend the Paris Olympics.</h2>
      </article>

    </>
  );
};