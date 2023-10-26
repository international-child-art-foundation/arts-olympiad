import {ReactNode} from "react";
import {H2m} from "../../common/texts/H2m";
import {Pm} from "../../common/texts/Pm";

interface IProps {
  heading: string | ReactNode
  color: string
  description: string | ReactNode
  isMobile?: boolean
  inversed?: boolean
}
export const TimePointDescription = ({heading, color, description, isMobile, inversed}: IProps) => {
  return (
    <div
      className={`
      z-20
      flex flex-col h-full 
      ${isMobile ? "w-full" : "w-[49.7%]"}
      ${inversed ? "pl-11 text-right " : "pr-11"}
      `}
    >
      <H2m className="time-point font-semibold md:font-normal h-[50%]" >{heading}</H2m>
      <div className="relative border-1 my-4 border-black" >
        <div
          style={{ backgroundColor: color}}
          className={`
          z-50 absolute rounded-full w-7 h-7
          ${inversed ? "-top-4 -left-[60px]" : "-top-4 -right-[60px]"}
          `}
        />
      </div>
      <Pm className="time-point font-light font-sans h-[50%]">{description}</Pm>
    </div>
  );
};
