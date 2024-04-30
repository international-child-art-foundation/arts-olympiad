"use client";
import Image from "next/image";
import scrollIcon from "../../../public/home/timeline/scroll-icon.svg";
import arrow from "../../../public/home/timeline/left-inclined-arrow.svg";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import littleYellowBlob from "../../../public/svgs/blobs/little-yellow-blob.svg";
import tinyYellowBlob from "../../../public/svgs/blobs/tiny-yellow-blob.svg";
import tinyPinkBlob from "../../../public/svgs/blobs/tiny-vertical-pink-blob.svg";
import bigPinkBlob from "../../../public/svgs/blobs/vertical-big-pink-blob.svg";
import bigBlueBlob from "../../../public/svgs/blobs/blue-leg-down-blob.svg";
import {LastTimePointHeading} from "./LastTimePointHeading";

export const Timeline = () => {

  const { windowWidth } = useWindowDimensions();
  useIntersectionObserver({}, "draw-line-left", "animate-drawing-left");
  const isMobile = windowWidth < 768;

  return (
    <section className=" relative px-8 md:px-12 lg:px-16 xl:px-20 mt-16 md:mt-36 flex flex-col max-w-screen-2xl m-auto" aria-label="Timeline.">
      <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-96 -left-12 select-none pointer-events-none" />
      <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-[368px] left-24 select-none pointer-events-none" />
      <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[672px] right-44 select-none pointer-events-none" />
      <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-[576px] -right-12 md:-right-44 select-none pointer-events-none" />
      <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44 select-none pointer-events-none" />

      <figure className="relative mb-8 self-center flex flex-col items-center justify-center">
        <Image width={105} src={scrollIcon} alt="mouse scroller icon." className=" self-center" />
        <div className="z-10 bg-neutral-white w-[130px] h-[85px] draw-line-left absolute bottom-0 right-24 select-none" />
        <Image src={arrow} alt="arrow pointing downwards." className="select-none absolute bottom-0 right-24" />
        <Pm className="z-20 font-sans text-center ">Scroll Down</Pm>
      </figure>
      <div>
        <ul aria-label="participation timeline.">
          <TimePoint
            heading="When does it start?"
            description="#MyFavoriteSport event kicks off at an interactive exhibition in Paris."
            date="June 15th, 2024"
            color={"#0286C3"}
            isMobile={isMobile}
          />
          <TimePoint
            heading="Register to Enter and Vote"
            description={
              <>
            This is the time to create, and engage your creative mind. Make your entry before
                <span className="font-bold text-dark-blue"> August 15th 2024</span>
              </>
            }
            date="June to August"
            color={"#FBB22E"}
            isMobile={isMobile}
            inversed
          />
          <TimePoint
            heading={<>Public Choice <span className="font-bold text-dark-blue">Winners</span></>}
            description={
              <>
                The gold, silver, and bronze winners, selected through public votes, will be announced on
                <span className="font-bold text-dark-blue"> August 20th, 2024 </span>
              </>}
            date="20th August, 2024"
            color={"#168C39"}
            isMobile={isMobile}
          />
          <TimePoint
            heading={
              <LastTimePointHeading />
            }
            description="These winners will be on their way to the Paris Olympics, thanks to generous sponsors!"
            date="July 26, 2024"
            color={"#EE2F4D"}
            isMobile={isMobile}
            inversed
          />
        </ul>
      </div>

      {/* BLOBS */}

      {/* <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-48 -left-12 " />
      <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-44 left-24 " />
      <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[480px] right-44 " />
      <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-96 -right-12 md:-right-44" />
      <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44" /> */}

    </section>
  );
};
