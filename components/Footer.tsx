import Image from "next/image";
import Icons from "./Icons";
import ICAF_logo from "../public/icaf-logo-transparent.svg";

// Custom box shadows added to apply the effects of "shadow-md" with a negative offset-y
const Footer = () => {
  return (
    <footer className="relative z-10 flex justify-center w-full shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)] shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="grid py-20 grid-col-1 lg:grid-cols-2 justify-center px-2 w-full max-w-7xl">
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
    </footer>
  );
};

export default Footer;