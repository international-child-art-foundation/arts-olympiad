import Image from "next/image";
import BenefitsMobile from "../../public/sponsor/BenefitsMobile.png";
import BenefitsIpadMini from "../../public/sponsor/BenefitsIpadMini.png";
import BenefitsTablet from "../../public/sponsor/BenefitsTablet.png";
import BenefitsLaptop from "../../public/sponsor/BenefitsLaptop.png";
import yellowBlob from "../../public/sponsor/yellowBlob.svg";
import BenefitsRight from "../../public/sponsor/BenefitsRight.webp";
import React from "react";
import { ArrowCTA } from "../../components/ArrowCTA";

export const Benefits = () => {
  return (
    <>
      <div className="relative mt-20">
        <Image src={BenefitsMobile} alt="" width={767} height={446} className="absolute z-10 sm:hidden -top-8 w-full " />
        <Image src={BenefitsIpadMini} alt="" width={1023} height={333} className="absolute -z-10 hidden sm:block lg:hidden w-full h-[400px] pb-10 -top-12" />
        <Image src={BenefitsTablet} alt="" width={1279} height={377} className="absolute z-10 hidden lg:block xl:hidden left-0 -top-4 w-2/3 h-[400px]" />
        <Image src={BenefitsLaptop} alt="" width={1536} height={432} className="absolute z-10 hidden xl:block 2xl:hidden left-0 -top-8 w-2/3 h-[500px]" />

        <section className=" relative grid grid-cols-2 z-20 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="col-span-2 xsm:col-span-2 lg:col-span-1 xsm:mt-8 md:mt-8 2xl:mt-20">
            <Image src={yellowBlob} alt="" width={1536} height={432} className="absolute hidden 2xl:block -top-4 -left-20 -z-10 w-2/3 max-w-[1061px]" />

            <h3 className="relative flex-col z-20 font-semibold mb-4 text-2xl xsm:text-2xl lg:text-3xl xl:text-4xl">
              Sponsorship benefits
            </h3>
            <div className="relative w-auto mb-8 z-20">
              <h2 className="z-20 font-light text-lg lg:w-4/5 mxl:w-4/5">
              Employees and stakeholders participate while the company makes it mark on The National Mall across the U.S. Capitol. Please browse this 10-page pdf (2-minutes) 
              </h2>
            </div>
            <ArrowCTA text="Download PDF" href="#"/>
          </div>
          <Image src={BenefitsRight} className="xsm:col-span-2 lg:col-span-1 z-20 w-full xl:w-full mt-10" alt=""></Image>
        </section>
      </div>
      
    
    
    </>
  );
};
