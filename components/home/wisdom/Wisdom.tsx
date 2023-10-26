"use client";
import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export const Wisdom = () => {

  useIntersectionObserver({}, "draw-line-right", "animate-drawing-right");

  return (
    <section className="overflow-hidden px-6 md:px-12 xl:px-24 mt-44 flex flex-col">
      <div className="self-center flex items-center justify-center relative">
        <H2m className="z-40 text-center inline-block relative mb-6">
          The Art of Living: Wisdom from <span className="z-40 inline-block font-bold text-dark-blue">Visionary Thinkers</span>
          <div className="hidden md:block draw-line-right z-30 bg-neutral-white w-[145px] h-[200px] absolute top-0 -right-36" />
          <Image
            width={80}
            src={arrow}
            alt="Arrow pointing down."
            className="hidden md:block z-20 absolute top-10 -right-20"
          />
        </H2m>
        <Image width={30} src={arrow} alt=" Arrow pointing down." className="block md:hidden ml-2" />
        <div className="draw-line-right md:hidden z-30 bg-neutral-white w-[50px] h-[100px] absolute top-0 right-0" />
      </div>
      <WisdomCarousel />

    </section>
  );
};