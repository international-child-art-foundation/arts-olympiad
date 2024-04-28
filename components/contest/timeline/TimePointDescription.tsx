import {ReactNode} from "react";
import {H2m} from "../../common/texts/H2m";
import {Pm} from "../../common/texts/Pm";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { TimePointDate } from "./TimePointDate";  

interface IProps {
  heading: string | ReactNode
  color: string
  description: string | ReactNode
  isMobile?: boolean
  inversed?: boolean
  date:string
  colorforDate:string
}
export const TimePointDescription = ({heading, color, description, isMobile, inversed, date, colorforDate}: IProps) => {

  useIntersectionObserver({}, "time-point", "fade-into-focus");

  return (
    <div
      className={`
      z-20
      flex flex-col min-h-full justify-center my-24
      ${isMobile ? "w-full" : "w-1/2"}
      ${inversed ? "pl-11 " : "pr-11"}
      `}
    >
      <>
        <div className=" flex flex-col justify-end">
          <H2m className="time-point font-semibold font-montserrat" >{heading}</H2m>
        </div>
        <div className="relative border-1 my-4 border-black" >
          <div
            style={{ backgroundColor: color}}
            className={`
            z-50 absolute rounded-full w-7 h-7
            ${inversed ? "-top-4 -left-[60px]" : "-top-4 -right-[60px]"}
            `}
          />
        </div>
        <TimePointDate date={date} color={colorforDate}/>
        <Pm className="font-openSans font-light xsm:w-full md:w-[80%] ">{description}</Pm>
      </>
    </div>
      
  );

};
