import React from "react";
import Image from "next/image";
import ArrowRight from "../public/sponsor/ArrowRight.svg";
import Link from "next/link";

// Define an interface for the component props
interface ArrowCTADirectLinkProps {
  text: string;
  href: string;
}

export const ArrowCTADirectLink: React.FC<ArrowCTADirectLinkProps> = ({ text, href }) => {
  return (
    <Link href={href} className="inline-flex items-center group text-dark-blue font-bold underline py-2 my-2 pl-0 rounded z-10 font-normal hover:font-bold">
      <span>{text}</span>
      {/* Arrow animates when the group (the <a> tag) is hovered */}
      <Image src={ArrowRight} alt="" width={24} height={24} className="ml-2 transform transition-transform duration-200 group-hover:translate-x-2.5" />
    </Link>
  );
};
