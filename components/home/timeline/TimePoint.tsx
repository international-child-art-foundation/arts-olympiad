import {TimePointDescription} from "./TimePointDescription";
import {TimePointDate} from "./TimePointDate";

interface IProps {
  mobile?: boolean
  inversed?: boolean
}
export const TimePoint = ({inversed}: IProps) => {
  return (
    <li className="flex flex-row align-bottom h-full">
      {
        inversed ?
          <>
            <TimePointDate inversed />
            <div className="relative bg-black min-h-[250px] m-0 border-2 border-black">
              <div className="absolute bottom-5 -right-2 rounded-full w-4 h-4 bg-red-600" />
            </div>
            <TimePointDescription inversed />
          </>
          :
          <>
            <TimePointDescription />
            <div className="relative bg-black h-[250px] m-0 border-2 border-black">
              <div className="absolute bottom-5 -right-2 rounded-full w-4 h-4 bg-red-600" />
            </div>
            <TimePointDate />
          </>
      }
    </li>
  );
};