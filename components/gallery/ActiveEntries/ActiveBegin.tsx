"use client";
import Image from "next/image";
import hashtag from "../../../public/home/hashtag.svg";
import Paris from "../../../public/svgs/gallery-svg/Paris.svg";
import {Countdown} from "./Countdown";
import CountdownContainerMobile from "../CountdownContainerMobile";
import CountdownContainer from "../CountdownContainer";
import colorfulScribble from "../../../public/svgs/colorful-scribble.svg";

export const ActiveBegin= () => {

  return (
    <section className="flex justify-start xsm:justify-center mb-8 md:mb-36 mt-6 md:mt-20 max-h-[760px] relative bg-neutral-white md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0">
      <article className="z-20 relative px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="z-20 mb-1 lg:mb-4 flex justify-start xsm:justify-center">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport<span className="sr-only">.</span>
          </h1>
        </div>

        <div className="z-20">
          <h1 className="xsm:text-center z-20 font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl mb-7 sm:mb-6">
            Gallery of Active Entries
          </h1>
          <h3 className="mb-14 xsm:text-center z-20 text-base font-light lg:text-xl 2xl:font-semibold" >
            Discover Unique Artworks, Vote for Your Favorites, and Find Your Inspiration.
          </h3>
          
          <div className="flex justify-center items-center">
            <Image src={Paris} width = {78} height = {78} alt="" className="z-50 lg:absolute hidden lg:block lg:mr-[480px]" />
            <div className="z-50 absolute mb-20 lg:mb-0 lg:mr-56 font-semibold text-xl">
              Contest ends in
            </div>
            <div className="z-50 absolute mb-0 lg:mb-6 lg:ml-64">
              <Countdown />
            </div>
            <div className="z-50 absolute -mb-20 lg:-mb-6 lg:ml-64 font-light text-base">
              DAYS<span className="mr-4"></span>HOURS<span className="mr-4"></span>MINS<span className="mr-5"></span>SEC
            </div>
            <div className="lg:hidden"><CountdownContainerMobile /></div>
            <div className="hidden lg:block "><CountdownContainer /></div>
          </div>

          <div className="mt-10 mb-44 flex justify-center items-center">
            <div className="text-base font-semibold lg:text-xl mr-3">
              Total votes:
            </div>
            <div className="text-3xl font-semibold lg:text-4xl lg:font-bold">
              170
              <Image src={colorfulScribble} alt="" width={160} height={20} className="-ml-8"/>
            </div>
          </div>
        </div>
      </article>
    </section>

  );
};