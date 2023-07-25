import Image from "next/image";
import Icons from "./Icons";
import Link from "next/link";
import ICAF_logo from "../public/icaf-logo-transparent.svg";

// Custom box shadows added to apply the effects of "shadow-md" with a negative offset-y
const Footer = () => {
  return (
    <footer className="relative z-10 flex justify-center w-full shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)] shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="grid py-20 grid-col-1 lg:grid-cols-2 justify-center w-full max-w-7xl">
        <div className="flex justify-center items-center">
          <div className="flex-initial w-fit pr-2 lg:pr-12">
            <Image src={ICAF_logo} alt="ICAF logo"></Image>
          </div>
          <div className="w-fit">
            <address className="font-normal text-sm md:font-medium lg:text-lg not-italic">
              <Link href="http://www.icaf.org/" target="_blank" className="underline"> International Child Art Foundation </Link> <br />
              2548 Virginia Avenue, NW <br />
              Washington, DC 20037
            </address>
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