import React, { ReactNode } from "react";
import { Pm } from "../common/texts/Pm";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    heading?: string | ReactNode;
    money: string;
}

function GreenTableCard({heading, money}:IProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-light-green rounded-2xl p-6 pt-12 shadow-xl">
      <article className="flex flex-col text-center">
        <Pm className="font-normal font-openSans">{heading}</Pm>
        <Pm className="font-normal font-openSans">{money}</Pm>
      </article> 
      <a className="border-2 border-black my-12 px-4 py-2 rounded-lg" href="https://icaf.org/about/contact-us">Sponsor Now</a>
    </div>
  );
}

export default GreenTableCard;
