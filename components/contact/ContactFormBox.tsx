import {Dispatch, SetStateAction} from "react";
import Image from "next/image";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {LazyImage} from "../common/images/LazyImage";
import {AnimatedScribble} from "../common/decorations/AnimatedScribble";
import React from "next/image";
import {ContactForm} from "./ContactForm";

interface IProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
}

export const ContactFormBox = ({ } : IProps) => {
  return (
    <div className="grid grid-cols-2 p-10 xl:p-20 flex flex-col lg:flex-row border-1 border-black rounded-xl z-10 bg-neutral-white">

      <div className="col-span-1 flex flex-col">
        <H2m><span className="relative">Contact us
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20" />
        </span>
        </H2m>
        <div className="flex flex-row mt-12 mb-24" >
          <Image src="/contact/geo-mark.svg" alt="" width={30} height={0} className="max-h-[30px] mr-4" />
          <Pm className="">
          International Children Art Foundation
          Post Office Box 58133, Washington, DC 20037
          </Pm>
        </div>
        <LazyImage imageUrl="/svgs/icaf-logo.svg" alt="ICAF Logo." className="mx-auto my-8" />
      </div>
      <ContactForm />

    </div>
  );
};