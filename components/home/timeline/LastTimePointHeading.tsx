import Image from "next/image";
import underline from "../../../public/svgs/underline.svg";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export const LastTimePointHeading = () => {

  useIntersectionObserver({}, "grow-line", "animate-grow");

  return (
    <>
      Winner goes to the <span className="inline-block relative font-bold text-dark-blue"> Olympics!
        <Image src={underline} alt="" className="grow-line md:absolute -right-8 z-10 " />
      </span>
    </>
  );
};