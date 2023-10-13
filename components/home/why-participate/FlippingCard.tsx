import React, {useState} from "react";
import Image from "next/image";
import iteration from "../../../public/svgs/iteration-ccw.svg";
import {H2m} from "../../common/texts/H2m";
import {H3m} from "../../common/texts/H3m";
import {Pm} from "../../common/texts/Pm";
import {TinyStarIcon} from "./TinyStarIcon";

interface IProps {
  isFlippable: boolean
  icon: string,
  heading1: string
  heading2: string
  description: string
  color: string
  children?: React.ReactNode
}

export const FlippingCard = ({isFlippable, icon, heading1, heading2, description, color, children}: IProps) => {

  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className="cursor-pointer my-6 border-2 rounded-lg flex flex-col justify-center items-center p-6 "
      style={{borderColor: color}}
      onClick={() => setFlipped(!flipped)}
    >

      {
        isFlippable &&
        <Image src={iteration} alt="" width={36} height={36} className="self-end" />
      }

      <div className="relative" >
        <div className="absolute -top-3 -right-1"><TinyStarIcon fill={color} /></div>
        <div className="absolute -top-1 -right-5"><TinyStarIcon fill={color} /></div>
        <div className="absolute top-3 -right-4"><TinyStarIcon fill={color} /></div>
        <Image className="my-2" src={icon} alt="" width={56} height={56} />
        <div className="absolute -bottom-3 -left-1"><TinyStarIcon fill={color} /></div>
        <div className="absolute -bottom-1 -left-5"><TinyStarIcon fill={color} /></div>
        <div className="absolute bottom-3 -left-4"><TinyStarIcon fill={color} /></div>
      </div>
      <H2m className="my-2 text-dark-blue text-center" >{heading1}</H2m>
      <H3m className="my-2 text-dark-blue text-center" >{heading2}</H3m>

      {!isFlippable &&
        <>
          <Pm className="my-2 font-light text-sm " >{description}</Pm>
          {children}
        </>
      }

      {
        isFlippable && flipped &&
        <>
          <Pm className="my-2 font-light text-sm " >{description}</Pm>
          {children}
        </>
      }
    </article>
  );
};