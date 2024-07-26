import React from "react";
import {H2m} from "../../common/texts/H2m";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import {TinyStarIcon} from "./TinyStarIcon";
import "../../../src/styles/flipping-card.css";
import {LazyImage} from "../../common/images/LazyImage";

interface IProps extends React.HTMLProps<HTMLDivElement>{
  icon: string,
  heading1: string
  heading2?: string
  description: React.ReactNode | string;
  color: string
}

export const FlippingCardStatic = ({icon, heading1, heading2, description, color, children}: IProps) => {
  let heading2WithBreaks;
  if (heading2) {
    heading2WithBreaks = heading2.split(":").map((part, index, array) => (
      <React.Fragment key={index}>
        {part}{index < array.length - 1 && <><span></span><br /></>}
      </React.Fragment>
    ));  
  } else {
    heading2WithBreaks = "";
  }
  return (
    <div
      style={{boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.07)"}}
      className={`
        my-4 md:my-0 relative md:min-h-[330px] lg:min-h-[430px] xl:min-h-[398px] 2xl:min-h-[398px]
        z-10 bg-neutral-white rounded-xl
      `}
    >
      <article
        role="region"
        aria-live="polite"
        className={`
        w-full h-full
        z-10 rounded-lg flex flex-col items-center p-6 border-2
          `}
        style={{borderColor: color}}
      >
        <div className="front flex flex-col justify-start items-center h-auto">
          <div className="relative my-5" >
            <div className="absolute -top-3 -right-1"><TinyStarIcon fill={color} /></div>
            <div className="absolute -top-1 -right-5"><TinyStarIcon fill={color} /></div>
            <div className="absolute top-3 -right-4"><TinyStarIcon fill={color} /></div>
            <LazyImage className="my-2" imageUrl={icon} alt="" width={56} height={56} />
            <div className="absolute -bottom-5 -left-2"><TinyStarIcon fill={color} /></div>
            <div className="absolute -bottom-1 -left-5"><TinyStarIcon fill={color} /></div>
            <div className="absolute bottom-3 -left-4"><TinyStarIcon fill={color} /></div>
          </div>
          <H2m className="my-2 text-dark-blue font-semibold text-center font-montserrat" >{heading1}</H2m>
          <H3m className="my-2 text-dark-blue font-semibold text-center" >{heading2WithBreaks ? heading2WithBreaks : heading2}</H3m>
        </div>
        <>
          <div className="flex-grow min-h-[20px]"></div> {/* Spacer element */}
          {
            typeof description === "string"
              ?  <Pm className="my-12 font-light text-sm " > {description} </Pm>
              : description
          }
          {children}
        </>
      </article>
    </div>
  );
};