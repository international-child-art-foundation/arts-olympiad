"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import HeroHeader from "../../public/home/Hero_Header_Small.jpg";
import { formatDate } from "../../mock/dates";
import rainbowLine from "../../public/home/rainbowLineWebp.webp";
// import RainbowLine from "../../public/home/new-hero/RainbowLine.svg";

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
                14- to 20-year-olds in the U.S. or any other country can create art about their favorite sport, upload it, and share it with family and friends to get their vote. For this historic global art contest ({formatDate("competitionBegin", "MMMM d")} to {formatDate("competitionEnd", "MMMM d, yyyy")}), upload your art early to get more public votes.
              </p>
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                Any sports fan or art lover can vote for the artwork you like the most for it to win the Gold (US$3,000), Silver ($2,000), or Bronze ($1,000). The winners will be announced on {formatDate("winnerAnnounced", "MMMM d, yyyy")}.
              </p>
              <p className="z-10 mb-4 leading-8 lg:mb8">
                This #MyFavoriteSport campaign is launched by ICAF.org, a Washington DC-based charity. The entry fee to upload art is US$10 but voters register for free.
              </p>
              {/* <p className="z-20 mb-4 leading-8 lg:mb8">
                Your donation helps unite artists and athletes by reassuring them that their chaotic and divided world has hope.
              </p> */}

            </div>
          </article>

          <figure
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
          </figure>
        </section>
      </div>

    </div>
  );
};