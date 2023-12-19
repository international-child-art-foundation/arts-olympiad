"use client";
import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export const Wisdom = () => {

  useIntersectionObserver({}, "draw-line-bottom", "animate-drawing-bottom");

  return (
    <section className=" px-8 md:px-12 lg:px-16 xl:px-20 mt-44 mb-24 flex flex-col max-w-screen-2xl m-auto">
      <div className="self-center flex items-center justify-center relative">
        <H2m className="z-40 text-center inline-block relative mb-6">
          The Art of Living: Wisdom from <span className="z-40 inline-block font-bold text-dark-blue">Visionary Thinkers</span>
          <div
            className="hidden md:block draw-line-bottom z-30 bg-neutral-white w-[145px] h-[200px] absolute top-0 -right-36 mxl:-right-36 2xl:-right-40"
          />
          <Image
            width={80}
            src={arrow}
            alt="Arrow pointing down."
            className="hidden md:block z-20 absolute top-10 -right-20 mxl:-right-36 2xl:-right-40"
          />
        </H2m>
        <Image width={30} src={arrow} alt=" Arrow pointing down." className="block md:hidden ml-2" />
        <div className="draw-line-bottom md:hidden z-30 bg-neutral-white w-[50px] h-[100px] absolute top-0 right-0" />
      </div>
      <WisdomCarousel />

    </section>
  );
};