"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import rainbowLine from "../../public/home/rainbowLineWebp.webp";
// import RainbowLine from "../../public/home/new-hero/RainbowLine.svg";
import HeroCarousel from "./carousel/HeroCarousel";

export const Intro = () => {

  return (
    <div className="grid grid-cols-1 grid-rows-1 grid-col relative">
      <Image src={rainbowLine} alt="" className="relative mt-auto 
      mb-32 md:mb-40 lg:mb-20 xl:mb-28
      col-start-1 col-span-1 row-start-1 z-[5] inset-x-0 object-cover object-center w-full max-w-[1920px] mx-auto pointer-events-none select-none"></Image>
      <div className="col-start-1 row-start-1 relative">
        <section aria-label="introduction." className="gap-8 mb-24 md:mb-28 sm:mb-20 mt-6 md:mt-20 relative bg-neutral-white lg:grid lg:grid-rows-1 col-span-8 lg:col-span-12 lg:grid-cols-12 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto ">

          <article role="banner" className=" relative flex-col align-middle col-span-8 lg:col-span-7 xl:col-span-6 lg:place-self-center z-10">
            <div className=" flex flex-row align-center mb-8 place-content-center lg:place-content-start">
              <Image src={hashtag} alt="" width={32} height={32} />
              <h1 className="break-words font-semibold text-3xl xsm:text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-montserrat">
                MyFavoriteSport<span className="sr-only">.</span>
              </h1>
            </div>
            <div className="font-normal text-base mb-6 md:mb-12 z-10">
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                Anyone <b>aged 8 to 20</b> in the U.S. or another country can create art about their favorite sport, upload it, and share it with family and friends to get their votes before December 24, 2024.
              </p>
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                Any art lover or sports fan can vote for their favorite artwork to select the 13 winners (one per birth year) who will be awarded Certificates of Exceptional Artistry.
              </p>

            </div>
          </article>
          <div
            className="relative z-10 px-10 md:px-24 lg:px-0 md:grid col-span-8 md:col-start-2 md:col-span-6 lg:col-span-5 xl:col-span-6 "
          >
            <HeroCarousel />
          </div>
          {/* <figure
            role="region"
            aria-label="Bicycle art"
            className="relative z-10 px-10 md:px-24 lg:px-0 md:grid col-span-8 md:col-start-2 md:col-span-6 lg:col-span-5 xl:col-span-6 "
          >
            <div className="z-10 image-container">

              <Image className="relative m-auto rounded-2xl z-10 pointer-events-none select-none" src={HeroHeader} alt="" />
              <div className="text-sm text-black italic font-medium font-montserrat text-right">
                * Eric Liang, age 11, Illinois
              </div>
            </div>
          </figure> */}
        </section>
      </div>

    </div>
  );
};