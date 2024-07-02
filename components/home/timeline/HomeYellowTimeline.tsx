"use client";
import Image from "next/image";
import scrollIcon from "../../../public/home/timeline/scroll-icon.svg";
import arrow from "../../../public/home/timeline/left-inclined-arrow.svg";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import tinyYellowBlob from "../../../public/svgs/blobs/tiny-yellow-blob.svg";
import tinyPinkBlob from "../../../public/svgs/blobs/tiny-vertical-pink-blob.svg";
import bigPinkBlob from "../../../public/svgs/blobs/vertical-big-pink-blob.svg";
import bigBlueBlob from "../../../public/svgs/blobs/blue-leg-down-blob.svg";
import timelineYellowEllipse from "../../../public/home/timeline-yellow-ellipse.svg";
import basketballPlayer from "../../../public/home/basketball-player.webp";
import badmintonPlayer from "../../../public/home/badminton-player.webp";
import secondSwimmer from "../../../public/home/swim2.webp";
import dive from "../../../public/home/dive.webp";
import { formatDate } from "../../../mock/dates";

export const HomeYellowTimeline = () => {

  const { windowWidth } = useWindowDimensions();
  useIntersectionObserver({}, "draw-line-left", "animate-drawing-left");
  const isMobile = windowWidth < 768;

  return (
    <>
      <div className="mt-72 md:mt-72 bg-[#fff5ad] absolute w-[100%] px-8 md:px-12 lg:px-16 xl:px-20 h-full -z-20"> </div>
      <div className="flex justify-center items-center relative">
        <Image src={timelineYellowEllipse} alt="" className="absolute -z-20 top-[950px] md:top-[950px] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none max-w-[unset]" />
      </div>
      <section className=" relative px-8 md:px-12 lg:px-16 xl:px-20 mt-32 md:mt-36 flex flex-col max-w-screen-2xl mx-auto mb-20 " aria-label="Timeline.">

        {/* <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-96 -left-12 select-none pointer-events-none" /> */}
        <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-[500px] left-24 select-none pointer-events-none" />
        <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[672px] right-44 select-none pointer-events-none" />
        <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-[576px] -right-12 md:-right-44 select-none pointer-events-none" />
        <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44 select-none pointer-events-none" />
        <Image src={basketballPlayer} alt="Basketball player" className="z-10 absolute md:-bottom-12 md:right-8 lg:-bottom-12 lg:right-14 xl:right-24 2xl:right-32 hidden md:block"/>
        <Image src={badmintonPlayer} alt="Badminton player" className="z-10 absolute md:left-8 md:bottom-64 lg:left-14 xl:left-24 2xl:left-32 hidden md:block"/>
        <Image src={dive} alt="" className="z-10 absolute md:left-8 md:bottom-[48rem] lg:left-14 xl:left-24 2xl:left-32 hidden md:block"/>
        <Image src={secondSwimmer} alt="" className="z-10 absolute md:right-8 md:top-60 lg:-right-4 xl:top-[17rem] xl:right-8 2xl:right-8 hidden md:block"/>

        <h3 className="m-auto font-montserrat text-[2rem] ">Timeline</h3>
        <figure className="relative mb-8 self-center flex flex-col items-center justify-center">
          <Image width={105} src={scrollIcon} alt="mouse scroller icon." className=" self-center" />
          <div className="z-10 bg-[fff5ad] w-[130px] h-[85px] draw-line-left absolute bottom-0 right-24 select-none" />
          <Image src={arrow} alt="arrow pointing downwards." className="select-none absolute bottom-0 right-24" />
          <Pm className="z-20 text-center font-light">Scroll Down</Pm>
        </figure>
        <div className="">
          <ul aria-label="participation timeline.">
            <TimePoint
              heading="When does it start?"
              description=""
              date={formatDate("competitionBegin", "MMMM do, yyyy")}
              color={"#0286C3"}
              isMobile={isMobile}
            />
            <TimePoint
              heading="Register to Enter and Vote"
              description={
                <>
              This is the time to engage your creative mind. Make your entry before 
                  <span className="font-bold text-dark-blue"> {formatDate("competitionEnd", "MMMM do, yyyy")}.</span>
                </>
              }
              date={`${formatDate("competitionBegin", "MMMM")} to ${formatDate("competitionEnd", "MMMM")}`}
              color={"#FBB22E"}
              isMobile={isMobile}
              inversed
            />
            <TimePoint
              heading={<>Public Choice <span className="font-bold text-dark-blue">Winners</span></>}
              description={
                <>
                  The gold, silver, and bronze winners, selected through public votes, will be announced on
                  <span className="font-bold text-dark-blue"> {formatDate("winnerAnnounced", "MMMM do, yyyy")}</span>
                </>}
              date={formatDate("winnerAnnounced", "do MMMM, yyyy")}
              color={"#168C39"}
              isMobile={isMobile}
            />
          </ul>
        </div>
      </section>
    </>
  );
};
