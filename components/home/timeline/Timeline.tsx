"use client";
import Image from "next/image";
import scrollIcon from "../../../public/home/timeline/scroll-icon.svg";
import arrow from "../../../public/home/timeline/left-inclined-arrow.svg";
import {Pm} from "../../common/texts/Pm";
import {TimePoint} from "./TimePoint";
import {TimePointDescription} from "./TimePointDescription";
import {TimePointDate} from "./TimePointDate";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export const Timeline = () => {

  const { width } = useWindowDimensions();
  useIntersectionObserver({}, "time-point", "fade-into-focus");
  const isMobile = width <= 768;

  return (
    <section className="relative px-6 md:px-12 xl:px-24 mt-36 mb-36 flex flex-col" aria-label="timeline">
      <figure className="relative mb-8 self-center flex flex-col items-center justify-center">
        <Image width={105} src={scrollIcon} alt="mouse scroller icon" className=" self-center" />
        <Image width={150} src={arrow} alt="arrow pointing downwards" className="absolute bottom-0 right-24" />
        <Pm className="font-sans text-center ">Scroll Down</Pm>
      </figure>
      <div>
        <ul aria-label="participation timeline h-full">
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
            heading={<>Winner goes to the<span className="font-bold text-dark-blue"> Olympics!</span></>}
            description="These winners will be on their way to the Paris Olympics, thanks to generous sponsors!"
            date="July 26, 2024"
            color={"#EE2F4D"}
            isMobile={isMobile}
            inversed
          />
        </ul>
      </div>
    </section>
  );
};
