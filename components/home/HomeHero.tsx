"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import bicycleHero from "../../public/home/MFS_Bicycle_Hero.webp";

export const Intro = () => {

  return (
    <section aria-label="introduction." className=" gap-8 mb-36 md:mb-28 mt-6 md:mt-20 relative bg-neutral-white lg:grid lg:grid-rows-1 col-span-8 lg:col-span-12 lg:grid-cols-12 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0 ">

      <article role="banner" className=" z-20 relative flex-col align-middle col-span-8 lg:col-span-7 xl:col-span-6 lg:place-self-center">
        <div className=" z-20 flex flex-row align-center mb-8 place-content-center lg:place-content-start">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className=" z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl font-montserrat">
              MyFavoriteSport<span className="sr-only">.</span>
          </h1>
        </div>
        <div className="font-normal text-base mb-6 md:mb-12 z-20">
          <p className=" z-20 mb-4 leading-8 lg:mb8">
            Any <b>14- to 20-year-old</b> anywhere can create art on his or her most favorite sport, upload it, and share it with family and friends to get their votes.
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8">
            The gold, silver, and bronze winners selected through public votes will get to attend the <b>Paris Olympics</b> with our sponsors' support.
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8 flex flex-wrap"> {/* Use &nbsp to allow grid layout to work properly */}
            The competition begins on&nbsp;<b> May 20th </b>&nbsp;and ends on&nbsp;<b> June 15th, 2024.</b>
          </p>

        </div>
      </article>

      <figure
        role="region"
        aria-label="Bicycle art"
        className="relative z-10 md:grid col-span-8 md:col-start-2 md:col-span-6 lg:col-span-5 xl:col-span-6 "
      >
        <div className="z-10">
          <Image className="m-auto" src={bicycleHero} alt=""/>
        </div>
      </figure>
    </section>
  );
};