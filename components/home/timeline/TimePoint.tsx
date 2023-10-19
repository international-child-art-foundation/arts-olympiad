import {TimePointDescription} from "./TimePointDescription";
import {TimePointDate} from "./TimePointDate";
import {ReactNode} from "react";

interface IProps {
  heading: string | ReactNode
  description: string | ReactNode
  date: string
  color: string
  isMobile?: boolean
  inversed?: boolean
}
export const TimePoint = ({heading, description, date, color, isMobile, inversed}: IProps) => {

  if (isMobile) {
    return (
      <li className="flex flex-row justify-between align-bottom h-full">
        <div className="flex flex-col align-bottom h-full">
          <TimePointDescription heading={heading} description={description} isMobile />
          <TimePointDate color={color} date={date} isMobile />
        </div>
        <div className="relative bg-black h-[300px] m-0 border-2 border-black">
          <div style={{ backgroundColor: color }} className="absolute top-7 -right-2 rounded-full w-4 h-4" />
        </div>
      </li>
    );
  }

  return (
    <li className="flex flex-row align-bottom h-full">
      {
        inversed ?
          <>
            <TimePointDate date={date} color={color} inversed />
            <div className="relative bg-black min-h-[250px] m-0 border-2 border-black">
              <div style={{ backgroundColor: color }} className={"absolute bottom-5 -right-2 rounded-full w-4 h-4"} />
            </div>
            <TimePointDescription heading={heading} description={description} inversed />
          </>
          :
          <>
            <TimePointDescription heading={heading} description={description} />
            <div className="relative bg-black h-[250px] m-0 border-2 border-black">
              <div style={{ backgroundColor: color }} className="absolute bottom-5 -right-2 rounded-full w-4 h-4" />
            </div>
            <TimePointDate date={date} color={color} />
          </>
      }
    </li>
  );
};