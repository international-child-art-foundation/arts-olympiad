"use client";
import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import YellowLine from "../../../public/home/wisdom/YellowLine.svg";
import BlueBlob from "../../../public/home/wisdom/BlueBlob.svg";
import { Pm } from "../../common/texts/Pm";

export const Wisdom = () => {

  useIntersectionObserver({}, "draw-line-bottom", "animate-drawing-bottom");

  return (
    <section className="px-8 md:px-12 lg:px-16 xl:px-20 mt-16 md:mt-36 mb-6 flex flex-col max-w-screen-2xl m-auto">
      <div className="self-center flex items-center justify-center relative">
        <H2m className="z-40 text-center inline-block relative mb-6 font-montserrat">
        The Power of  <span className="z-40 inline-block font-bold text-dark-blue">Art and <Image src={YellowLine} alt="" width={120} className="z-0 inline absolute -right-8"></Image>Sports</span>
          <div
            className="hidden md:block draw-line-bottom z-30 bg-neutral-white w-[145px] h-[200px] absolute top-0 -right-36 mxl:-right-36 2xl:-right-40"
          />
          <Image
            width={80}
            src={arrow}
            alt="Arrow pointing down."
            className="hidden md:block z-20 absolute top-10 -right-20 mxl:-right-36 2xl:-right-40 select-none"
          />
        </H2m>
        <Image width={30} src={arrow} alt=" Arrow pointing down." className="block md:hidden ml-2" />
        <div className="draw-line-bottom md:hidden z-30 bg-neutral-white w-[50px] h-[100px] absolute top-0 right-0" />
      </div>
      <WisdomCarousel />
      <div className="relative z-100 mt-20 mb-36 z-20 flex flex-col">
        <Image src={BlueBlob} alt="" className="absolute z-0 right-1/2 -bottom-24 "></Image>
        <Pm className="relative font-semibold z-20 font-montserrat">Your donation will bring the benefits of art and sport to young and older people alike.</Pm>
        <button className="relative z-20 bg-amber-300 mt-20 px-4 py-2 rounded-3xl self-center">Donate</button>
      </div>
    </section>
  );
};