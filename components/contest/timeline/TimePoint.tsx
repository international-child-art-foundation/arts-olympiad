import "../../../src/styles/time-point.css";
import {TimePointDescription} from "./TimePointDescription";
import {TimePointDate} from "./TimePointDate";
import {ReactNode} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TimelineImage from "./TimelineImage";
import { StaticImageData } from "next/image";

interface IProps {
  heading: string | ReactNode
  description: string | ReactNode
  date: string
  color: string
  src:string | StaticImageData
  alt:string
  isMobile?: boolean
  inversed?: boolean
}
export const TimePoint = ({heading, description, date, color, src, alt, isMobile, inversed}: IProps) => {

  useIntersectionObserver({}, "time-point", "fade-into-focus");

  if (isMobile) {
    return (
      <li className="z-10 flex flex-row items-start h-full">
        <div className=" flex flex-col justify-end h-full w-full">
          <TimePointDescription heading={heading} color={color} colorforDate={color} date={date} description={description} isMobile />
        </div>
        <div className="z-10 relative bg-black h-[350px] m-0 border-2 border-black" />
      </li>
    );
  }

  return (
    <li className="z-10 flex flex-row h-full">
      {
        inversed ?
          <>
            <TimelineImage src={src} alt={alt} inversed/>
            <div className="z-10 relative bg-black min-h-[287px] m-0  border-2 border-black" />
            <TimePointDescription color={color} heading={heading} date={date} colorforDate={color} description={description} inversed/>
            
          </>
          :
          <>           
            <TimePointDescription color={color} heading={heading} date={date} colorforDate={color} description={description}/>
            <div className="z-10 relative bg-black h-[387px] m-0 border-2 border-black" />
            <TimelineImage src={src} alt={alt}/>
          </>
      }
    </li>
  );

};