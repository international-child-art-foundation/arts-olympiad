"use client";
import Image from "next/image";
import arrow from "../../../public/contest/Arrow.png";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import yellow_blob from "../../../public/contest/yellow_blob.png"
import kid_ball from "../../../public/contest/kid_ball.png"
import kid_bending from "../../../public/contest/kid_bending.png"
import TorchBlue from "../../../public/contest/torch_blue.png";
import { H2m } from "../../common/texts/H2m";
import BlueBlob from "../../../public/contest/blue_blob.png";
import OrangeBlob from "../../../public/contest/orange_blob.svg";

export const Timeline = () => {

  const { windowWidth } = useWindowDimensions();
  useIntersectionObserver({}, "draw-line-left", "animate-drawing-left");
  const isMobile = windowWidth < 768;

  return (
    <>
    <div className="relative">
      <Image src={yellow_blob} width={1672} height={1672} alt="yellow blob" className="absolute object-cover w-screen h-[1672px] top-0 z-0 -top-8 "/>
    {/* <section className=" relative px-8 py-24 md:px-12 lg:px-16 xl:px-20 flex flex-col max-w-screen-2xl m-auto" aria-label="Timeline."> */}
    <section className=" relative py-48 flex flex-col max-w-screen-2xl m-auto" aria-label="Timeline.">

      
      <div className="xsm:px-6 md:w-full md:px-6 lg:w-[70%] flex flex-col self-center justify-center items-center z-20">
        <figure className="relative z-20 self-center flex flex-col items-center justify-center">
          <H2m className="relative z-20 font-montserrat font-semibold text-center" >Timeline</H2m> 
          <Image src={arrow} alt="arrow pointing downwards." className="select-none mr-48" />
        </figure>
        <div>
          <ul aria-label="participation timeline.">
            <TimePoint
              heading="Contest Begins"
              description=""
              date="14th April, 2024"
              color={"#0286C3"}
              src={kid_ball}
              alt=""
              isMobile={isMobile}
            />
            <TimePoint
              heading="Contest Ends"
              description=""
              date="15th June, 2024"
              color={"#FBB22E"}
              src={kid_bending}
              alt=""
              isMobile={isMobile}
              inversed
            />
            <TimePoint
              heading="Winners Announced!"
              description="Monday 1 July 2024 Press conference at The National Mall across the U.S. Capitol to announce the gold, silver, and bronze winners."
              date="1st July, 2024"
              color={"#168C39"}
              src={TorchBlue}
              alt=""
              isMobile={isMobile}
            />
          </ul>
        </div>
      </div>
      <Image src={BlueBlob} alt="" className="absolute z-10 w-[60%] xsm:top-[850px] xsm:-left-[50px] md:top-[900px] md:-left-[100px] lg:w-1/2 lg:top-[800px] lg:-left-[200px]"></Image>
      <Image src={OrangeBlob} alt="" className="absolute z-10 xsm:w-[60%] xsm:-right-[50px] xsm:top-[550px] md:top-[400px] md:-right-[100px] lg:w-1/2 lg:top-[300px] lg:-right-[200px]"></Image>

    </section>
    </div>
    </>
  );
};
