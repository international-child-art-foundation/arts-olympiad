import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {AnimatedScribble} from "../../common/decorations/AnimatedScribble";

export const LastTimePointHeading = () => {

  useIntersectionObserver({}, "grow-line", "animate-grow");

  return (
    <>
      Winner goes to the <span className="inline-block relative font-bold text-dark-blue"> Olympics!
        <AnimatedScribble
          smwidth={150}
          width={100}
          className="md:absolute -right-8 top-6 z-10"
        />
      </span>
    </>
  );
};