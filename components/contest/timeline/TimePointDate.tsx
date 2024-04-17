import {CalendarDayIcon} from "./CalendarDayIcon";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface IProps {
  date: string
  color: string
  isMobile?: boolean
  inversed?: boolean
}
export const TimePointDate = ({date, color}: IProps) => {

  useIntersectionObserver({}, "time-point", "fade-into-focus");

  return (
    <div className="time-point z-10 my-0 flex flex-row h-full ">
      <CalendarDayIcon width={92} height={92} fill={color} />
      <p className="break-words text-xl lg:text-2xl text-center my-auto font-montserrat font-normal">{date}</p>
    </div>
  );
};