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

export const ContactFormBox = ({ setIsSubmitted } : IProps) => {
  return (
    <div className=" lg:grid grid-cols-2 gap-20 p-10 xl:p-20 border-1 border-black rounded-xl z-10 bg-neutral-white">

      <div className="col-span-1 flex flex-row lg:flex-col">
        <div className="flex flex-col" >
          <H2m><span className="relative">Contact us
            <AnimatedScribble width={180} className="absolute -bottom-6 -right-20" />
          </span>
          </H2m>
          <div className="flex flex-row mt-12 mb-6" >
            <Image src="/contact/geo-mark.svg" alt="" width={30} height={0} className="max-h-[30px] mr-4 mt-0" />
            <div className="flex flex-col" >
              <Pm className="">
              International Child Art Foundation
              </Pm>
              <Pm className="">
              2549 Virginia Avenue, NW
              </Pm>
              <Pm className="">
              Washington, DC 20037
              </Pm>
              <Pm className="">
              USA
              </Pm>
            </div>
          </div>
        </div>
        <LazyImage imageUrl="icaf-logo.webp" alt="ICAF Logo." className="hidden md:block mx-auto my-8" />
      </div>
      <ContactForm setIsSubmitted={setIsSubmitted} />

    </div>
  );
};