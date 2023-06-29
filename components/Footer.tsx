import Image from "next/image";
import Icons from "./Icons";
import ICAF_logo from "../public/icaf-logo-transparent.svg";

const Footer = () => {
  return (
    <div className="grid py-20 grid-col-1 lg:grid-cols-2  justify-center px-2 bg-neutral-100">
      <div className="flex justify-center items-center">
        <div className="flex-initial w-fit pr-2 lg:pr-12">
          <Image src={ICAF_logo} alt="ICAF logo"></Image>
        </div>
        <div className="w-fit">
          <ul className="font-normal text-sm md:font-medium lg:text-lg">
            <li className="">International Child Art Foundation</li>
            <li>2549 Virginia Avenue NW,
              <span className="block lg:inline">Washington, DC 20038</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mt-9 lg:mt-0">
        <Icons />
      </div>
    </div>
  );
};

export default Footer;