import {CalendarDayIcon} from "./CalendarDayIcon";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface IProps {
  date: string
  color: string
  isMobile?: boolean
  inversed?: boolean
}
export const TimePointDate = ({date, color, isMobile, inversed}: IProps) => {

  useIntersectionObserver({}, "time-point", "fade-into-focus");

  if (isMobile) {
    return (
      <div className="time-point z-10 my-8 flex flex-row h-full ">
        <CalendarDayIcon width={92} height={92} fill={color} />
        <p className="break-words text-2xl lg:text-3xl text-center my-auto font-montserrat font-regular">{date}</p>
      </div>
    );
  }

  return (
    <div className={`time-point z-10 flex flex-row ${inversed && "justify-end"} min-h-full w-[49.7%]`}>
      {
        inversed ?
          <>
            <div className="flex mx-4 items-center">
              <CalendarDayIcon width={92} height={92} fill={color} />
              <p className="break-words text-2xl lg:text-3xl text-center my-auto">{date}</p>
            </div>
            <hr className="w-[40%] border-[1px] border-black border-dashed my-auto flex-grow-0" />
          </>
          :
          <>
            <hr className="w-[40%] border-[1px] border-black border-dashed my-auto flex-grow-0" />
            <div className="flex mx-4 items-center">
              <CalendarDayIcon width={92} height={92} fill={color} />
              <p className="break-words text-2xl lg:text-3xl text-center my-auto">{date}</p>
            </div>
          </>
      }
    </div>
  );
};