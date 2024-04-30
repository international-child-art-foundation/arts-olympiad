import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {AnimatedScribble} from "../../common/decorations/AnimatedScribble";

export const LastTimePointHeading = () => {

  useIntersectionObserver({}, "grow-line", "animate-grow");

  return (
    <>
      The winner is  <span className="inline-block relative font-bold text-dark-blue"> announced!
        <AnimatedScribble
          smwidth={150}
          width={100}
          animationDelay={1500}
          className="stroke-new-blue md:absolute -right-8 top-6 z-10"
        />
      </span>
    </>
  );
};