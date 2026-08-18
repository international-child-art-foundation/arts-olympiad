"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import rainbowLine from "../../public/home/rainbowLineWebp.webp";
// import RainbowLine from "../../public/home/new-hero/RainbowLine.svg";
import HeroCarousel from "./carousel/HeroCarousel";
import dates from "../../mock/dates";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { IHeroArray } from "./carousel/HeroItem";

export const Intro = () => {
  const midnight = format(dates.competitionEnd, "bbbb");
  const midnightCapitalized =
    midnight.charAt(0).toUpperCase() + midnight.slice(1);

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [transitioning, setTransitioning] = useState(true);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex(
          (prevIndex) =>
            // prevIndex + 1
            (prevIndex + 1) % IHeroArray.length,
        ),
      5000,
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  useEffect(() => {
    if (index > IHeroArray.length) {
      setTimeout(() => {
        setTransitioning(false);
        setIndex(0);
      }, 0);
    } else {
      setTransitioning(true);
    }
  }, [index, transitioning]);

  function handleDotOnClick(i: number) {
    setIndex(i);
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1 grid-col relative">
      <Image
        src={rainbowLine}
        alt=""
        className="relative mt-auto 
      mb-32 md:mb-40 lg:mb-20 xl:mb-20
      col-start-1 col-span-1 row-start-1 z-[5] inset-x-0 object-cover object-center w-full max-w-[1920px] mx-auto pointer-events-none select-none"
      ></Image>
      <div className="col-start-1 row-start-1 relative">
        <section
          aria-label="introduction."
          className="gap-8 mb-24 md:mb-28 sm:mb-20 mt-6 md:mt-20 relative bg-neutral-white lg:grid lg:grid-rows-1 col-span-8 lg:col-span-12 lg:grid-cols-12 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto "
        >
          <article
            role="banner"
            className=" relative flex-col align-middle col-span-8 lg:col-span-7 xl:col-span-6 lg:place-self-center z-10"
          >
            <div className=" flex flex-row align-center mb-8 place-content-center lg:place-content-start">
              <Image src={hashtag} alt="" width={32} height={32} />
              <h1 className="break-words font-semibold text-3xl xsm:text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-montserrat">
                MyFavoriteSport<span className="sr-only">.</span>
              </h1>
            </div>
            <div className="font-normal text-base mb-6 md:mb-12 z-10">
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                Individuals aged <span className="font-bold">8 to 20</span> from
                around the globe are invited to create artwork inspired by their
                favorite sport, upload it, and share it with family and friends
                to get their votes.
              </p>
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                The registration fee is three U.S. dollars. The artist with the
                most votes will receive a cash prize of{" "}
                <span className="font-bold">US $1,000</span>. Additionally, the
                top 100 artists who receive the most votes will be awarded the
                Certificate of Exceptional Artistry.
              </p>
              <p className=" z-10 mb-4 leading-8 lg:mb8">
                Anyone with a passion for art or sports can participate in the
                voting process, and registration is free for all voters.
              </p>
              <p className="z-10 mb-4 leading-8 lg:mb8">
                The contest begins on{" "}
                <span className="font-bold">
                  {format(dates.competitionBegin, "MMMM d, yyyy")}
                </span>
                , at {format(dates.competitionBegin, "h:mm a")} EDT. The contest
                ends with the Closing Ceremony of the LA 2028 Olympics on{" "}
                <span className="font-bold">
                  {format(dates.competitionEnd, "MMMM d, yyyy")}
                </span>
                . The International Child Art Foundation will announce the
                contest winners on{" "}
                {format(dates.winnerAnnounced, "MMMM d, yyyy")}, at a press
                conference in Washington, D.C.
              </p>{" "}
            </div>
          </article>
          <div className="relative z-10 px-10 md:px-24 lg:px-0 md:grid col-span-8 md:col-start-2 md:col-span-6 lg:col-span-5 xl:col-span-6 items-center">
            <HeroCarousel transitioning={transitioning} index={index} />
            <div className="flex z-20 flex-row space-x-3 justify-self-center shadow-sm p-3 rounded-[20px] mx-auto bg-[#fdfffd]">
              {Array(IHeroArray.length)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className={`w-[15px] h-[15px] rounded-full cursor-pointer ${
                      i == index % IHeroArray.length
                        ? "bg-new-blue"
                        : "bg-main-silver"
                    }`}
                    onClick={() => handleDotOnClick(i)}
                  ></div>
                ))}
            </div>
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
