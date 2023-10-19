import {ReactNode} from "react";

interface IProps {
  heading: string | ReactNode
  description: string | ReactNode
  isMobile?: boolean
  inversed?: boolean
}
export const TimePointDescription = ({heading, description, isMobile, inversed}: IProps) => {
  return (
    <div
      className={`
      self-end flex flex-col h-full 
      ${isMobile ? "w-full" : "w-[50%]"}
      ${inversed ? "pl-12 text-right " : "pr-12"}
      `}
    >
      <p>{heading}</p>
      <hr className=" border-1 my-4 border-black" />
      <p>{description}</p>
    </div>
  );
};
