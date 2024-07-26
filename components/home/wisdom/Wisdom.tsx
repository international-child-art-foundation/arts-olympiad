"use client";
import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import YellowLine from "../../../public/home/wisdom/YellowLine.svg";
import BlueBlob from "../../../public/home/wisdom/BlueBlob.svg";
import { Pm } from "../../common/texts/Pm";
import { HeartIcon } from "../../svgs/HeartIcon";

export const Wisdom = () => {

  useIntersectionObserver({}, "draw-line-bottom", "animate-drawing-bottom");

  return (
    <section className="px-8 md:px-12 lg:px-16 xl:px-20 mt-16 md:mt-36 mb-6 flex flex-col max-w-screen-2xl m-auto">
      <div className="self-center flex items-center justify-center relative">
        <H2m className="z-5 text-center inline-block relative mb-6 font-montserrat whitespace-nowrap">
        The Power of  <span className="z-5 inline-block font-bold text-dark-blue">Art and <Image src={YellowLine} alt="" width={120} className="z-0 inline absolute  xsm: -right-8 sm:-right-8 lg:-right-4"></Image>Sports</span>
          {/* <Image
            width={80}
            src={arrow}
            alt="Arrow pointing down."
            className="hidden md:block z-20 absolute top-10 -right-48 lg:-right-60 mxl:-right-60 2xl:-right-60 select-none"
          /> */}
        </H2m>
        <Image width={30} src={arrow} alt=" Arrow pointing down." className="block md:hidden ml-2" />
        <div className="draw-line-bottom md:hidden z-5 bg-neutral-white w-[50px] h-[100px] absolute top-0 right-0" />
      </div>
      <WisdomCarousel />
      <div className="relative mt-20 mb-36 z-0 flex flex-col">
        <Image src={BlueBlob} alt="" className="absolute z-0 right-1/2 -bottom-24 "></Image>
        <Pm className="relative font-semibold z-5 font-montserrat">Your donation will bring the benefits of art and sport to young and older people alike.</Pm>
        <a href="https://icaf.org/donate" target="_blank" rel="noopener noreferrer" className=" items-center gap-1 font-open-sans flex flex-row z-10 group text-2xl bg-new-blue rounded-[10px] text-center text-sm cursor-pointer tracking-wide text-neutral-white px-6 py-4 mt-10 mx-auto">
          <HeartIcon stroke="#EE2F4D" />
          <p>Donate</p>
        </a>
      </div>
    </section>
  );
};