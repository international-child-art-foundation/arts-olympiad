"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Down } from "../../public/svgs/contest-svg/Down";
import { Up } from "../../public/svgs/contest-svg/Up";

export const AccordionCard = (props) => {
  const [isExpanded, SetIsExpanded] = useState(false);
  const [item] = useState(props.datas);
 
  return (
    <>
      <div onClick={() => SetIsExpanded(!isExpanded)} className="col-span-1 h-fit py-6 px-4 relative rounded-2xl cursor-pointer" style={{backgroundColor: item.color}}>
        <Image src={item.backgroud} width = {390} height = {271} className="relative -top-6 -left-4 z-0 h-[340px] xl:h-[300px]" alt="" />
        <div className="absolute top-2 z-30"> {item.icon} </div>
        <button className={`transition-all ease-in-out duration-500 grid grid-cols-5 absolute z-30 group w-5/6 text-xl lg:text-2xl font-semibold text-neutral-black ${isExpanded ?  "top-[60px] lg:top-[100px] xl:top-[120px]" : "top-[200px]"}`}>
          <div className="col-span-4">{item.header}</div>
          <div className={`col-span-1 ${isExpanded ? "hidden" : ""}`}><Down /> </div>
          <div className={`col-span-1 ${isExpanded ? "" : "hidden"}`}><Up /> </div>
        </button>
        <div className={`transition-all Z-30 ${isExpanded ? "visible -translate-y-[330px] ease-in-out duration-500" : "invisible"}`}>
          <hr className="absolute top-[120px] lg:top-[170px] xl:top-[200px] z-30 border-new-black border-t-0.5 w-11/12"></hr>
          <p className="absolute top-[130px] lg:top-[180px] xl:top-[210px] z-30 font-light text-base leading-loose w-11/12">
            {item.element}
          </p>
        </div>
      </div>
    </>
  );
};