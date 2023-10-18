"use client";
import Image from "next/image";
import scrollIcon from "../../../public/home/timeline/scroll-icon.svg";
import arrow from "../../../public/home/timeline/left-inclined-arrow.svg";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import {TimePointDescription} from "./TimePointDescription";
import {TimePointDate} from "./TimePointDate";

export const Timeline = () => {
  return (
    <section className="relative px-6 md:px-12 xl:px-24 mt-36 mb-36 flex flex-col" aria-label="timeline">
      <figure className="relative mb-8 self-center flex flex-col items-center justify-center">
        <Image width={105} src={scrollIcon} alt="mouse scroller icon" className=" self-center" />
        <Image width={150} src={arrow} alt="arrow pointing downwards" className="absolute bottom-0 right-24" />
        <Pm className="font-sans text-center ">Scroll Down</Pm>
      </figure>
      <div>
        <ul aria-label="participation timeline h-full">
          <TimePoint />
          <TimePoint inversed />
          <TimePoint />
          <TimePoint inversed />
        </ul>
      </div>
    </section>
  );
};
