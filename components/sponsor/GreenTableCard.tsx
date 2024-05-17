import React, { ReactNode } from "react";
import { Pm } from "../common/texts/Pm";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    heading?: string | ReactNode;
    money: string;
}

function GreenTableCard({heading, money}:IProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-light-green rounded-2xl p-6 pt-12 w-[200px] md:w-full h-[236px] ">
      <article className="flex flex-col text-center">
        <Pm className="font-normal font-openSans">{heading}</Pm>
        <Pm className="font-normal font-openSans">{money}</Pm>
      </article> 
      <button className="border-2 border-black my-12 px-4 py-2 rounded-lg">Sponsor Now</button>
    </div>
  );
}

export default GreenTableCard;
