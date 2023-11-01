"use client";
import Image from "next/image";
import scrollIcon from "../../../public/home/timeline/scroll-icon.svg";
import arrow from "../../../public/home/timeline/left-inclined-arrow.svg";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import underline from "../../../public/svgs/underline.svg";
import littleYellowBlob from "../../../public/svgs/little-yellow-blob.svg";
import tinyYellowBlob from "../../../public/svgs/tiny-yellow-blob.svg";
import tinyPinkBlob from "../../../public/svgs/tiny-vertical-pink-blob.svg";
import bigPinkBlob from "../../../public/svgs/vertical-big-pink-blob.svg";
import bigBlueBlob from "../../../public/svgs/blue-leg-down-blob.svg";
import {LastTimePointHeading} from "./LastTimePointHeading";

export const Timeline = () => {

  const { windowWidth } = useWindowDimensions();
  useIntersectionObserver({}, "draw-line-left", "animate-drawing-left");
  const isMobile = windowWidth < 768;

  return (
    <section className="overflow-hidden relative px-6 md:px-12 xl:px-24 mt-36 flex flex-col" aria-label="Timeline.">
      <figure className="relative mb-8 self-center flex flex-col items-center justify-center">
        <Image width={105} src={scrollIcon} alt="mouse scroller icon." className=" self-center" />
        <div className="z-10 bg-neutral-white w-[130px] h-[85px] draw-line-left absolute bottom-0 right-24" />
        <Image src={arrow} alt="arrow pointing downwards." className="absolute bottom-0 right-24" />
        <Pm className="z-20 font-sans text-center ">Scroll Down</Pm>
      </figure>
      <div>
        <ul aria-label="participation timeline.">
          <TimePoint
            heading="When does it start?"
            description="#MyFavoriteSport event kicks off at an interactive exhibition in Paris."
            date="March 15th, 2024"
            color={"#0286C3"}
            isMobile={isMobile}
          />
          <TimePoint
            heading="Register to Enter and Vote"
            description={
              <>
            This is the time to create, and engage your creative mind. Make your entry before
                <span className="font-bold text-dark-blue"> June 15th 2024</span>
              </>
            }
            date="March to June"
            color={"#FBB22E"}
            isMobile={isMobile}
            inversed
          />
          <TimePoint
            heading={<>Public Choice <span className="font-bold text-dark-blue">Winners</span></>}
            description={
              <>
                The gold, silver, and bronze winners, selected through public votes, will be announced at a press conference on
                <span className="font-bold text-dark-blue"> July 1, 2024 </span>
                at the National Mall at the U.S. Capitol.
              </>}
            date="1st July, 2024"
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

      <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-48 left-0 " />
      <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-44 left-24 " />
      <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[480px] right-44 " />
      <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-96 -right-12 md:-right-44" />
      <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44" />

    </section>
  );
};
