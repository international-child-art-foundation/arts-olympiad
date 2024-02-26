import Image from "next/image";
import PastXL from "../../public/sponsor/PastXL.webp";
import PastLeft from "../../public/sponsor/PastLeft.webp";
import React from "react";
import { ArrowCTA } from "../../components/ArrowCTA";

export const PastSponsor = () => {
  return (
    <>
      <div className="relative mt-20 lg:mt-40 mb-24 md:mb-30 lg:mb-32 xl:mb-36 2xl:mb-38 grid grid-cols-2 z-20 m-auto  xsm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl" >
        <div className="relative xsm:col-span-2 lg:col-span-1 order-2 lg:order-1 rounded-lg overflow-hidden lg:h-[400px] xl:h-[500px] flex justify-center items-center mt-20 lg:mt-0">
          <Image src={PastLeft} alt="" className="h-full w-auto min-w-full object-cover rounded-lg" />
        </div>
        <div className="relative xsm:col-span-2 lg:col-span-1 lg:pl-16 mt-0 xl:pl-20 max-w-screen-2xl order-1 lg:order-2">
          <div className="relative z-20 m-auto ">
            <h2 className="font-medium text-3xl font-montserrat">Past Sponsors and supporters</h2>
            <h3 className="font-regular md:font-light text-lg mt-5">Some of the world’s leading companies have worked with ICAF. 
Please browse this 16-page pdf (3-minutes). </h3> 
            <ArrowCTA text="Download PDF" href="https://www.icaf.org/resource/pdfs/ICAF_Forging%20Iconic%20Brands.pdf"/>
          </div>
          <div>
            {/* <Image src={PastMobile} alt="" width={767} height={446} className="absolute z-0 hidden xsm:block w-full right-0 lg:hidden" /> */}
            <Image src={PastXL} alt="" width={718} height={535} className="absolute z-0 hidden select-none pointer-events-none lg:block top-20 md:top-20 lg:top-52 xl:bottom-12 xl:top-50 right-0 w-4/6 lg:w-full lg:-right-28 max-w-[718px]" />
          </div>
        </div> 
      </div>
    </>

  );
};