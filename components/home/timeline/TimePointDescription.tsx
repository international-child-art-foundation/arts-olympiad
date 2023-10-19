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
      self-end flex flex-col h-full 
      ${isMobile ? "w-full" : "w-[50%]"}
      ${inversed ? "pl-11 text-right " : "pr-11"}
      `}
    >
      <H2m className="font-semibold md:font-normal" >{heading}</H2m>
      <div className="relative border-1 my-4 border-black" >
        <div
          style={{ backgroundColor: color }}
          className={`
          ${inversed ? "-top-2 -left-14" : "-top-2 -right-14"}
          z-10 absolute rounded-full w-5 h-5
          `}
        />
      </div>
      <Pm className="font-light font-sans">{description}</Pm>
    </div>
  );
};
