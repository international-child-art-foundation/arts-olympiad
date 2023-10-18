import {CalendarDayIcon} from "./CalendarDayIcon";
import {Pm} from "../../common/texts/Pm";

interface IProps {
  mobile?: boolean
  inversed?: boolean
}
export const TimePointDate = ({mobile, inversed}: IProps) => {
  return (
    <div className="self-end flex flex-row justify-between align-middle h-full w-[50%]">
      {
        inversed ?
          <>
            <div className="flex">
              <CalendarDayIcon fill="#0286C3" />
              <p className="text-center my-auto">March 15th 2024</p>
            </div>
            <hr className="w-[40%] border-1 border-black border-dashed my-auto flex-grow-0" />
          </>
          :
          <>
            <hr className="w-[40%] border-1 border-black border-dashed my-auto flex-grow-0" />
            <div className="flex">
              <p className="text-center my-auto">March 15th 2024</p>
              <CalendarDayIcon fill="#0286C3" />
            </div>
          </>
      }
    </div>
  );
};