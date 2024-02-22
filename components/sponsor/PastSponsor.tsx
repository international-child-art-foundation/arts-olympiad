import Image from "next/image";
import PastXL from "../../public/sponsor/PastXL.png";
import PastLeft from "../../public/sponsor/PastLeft.png";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export const PastSponsor = () => {
  return (
    <>
      <div className="relative mt-20 lg:mt-40 mb-36 grid grid-cols-2 z-20 m-auto  xsm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl" >
        <div className="relative xsm:col-span-2 lg:col-span-1 order-2 lg:order-1 rounded-lg overflow-hidden lg:h-[500px] flex justify-center items-center mt-20 lg:mt-0">
          <Image src={PastLeft} alt="" className="h-full w-auto min-w-full object-cover rounded-lg" />
        </div>
        <div className="relative xsm:col-span-2 lg:col-span-1 xsm:px-8 lg:mt-20 md:px-12 lg:px-16 mt-0 xl:px-20 max-w-screen-2xl order-1 lg:order-2">
          <div className="relative z-20 m-auto ">
            <h2 className="font-medium text-3xl ">Past Sponsors and supporters</h2>
            <h3 className="font-light text-lg leading-loose mt-5">Some of the world’s leading companies have worked with ICAF. 
Please browse this 16-page pdf (3-minutes). </h3> 
            <a href="#" className="text-blue-600 hover:text-blue-700 font-bold underline hover:underline hover:bg-gray-300 p-2 rounded inline-block">Download PDF <FaArrowRight className="inline-block"/></a>
          </div>
          <div>
            {/* <Image src={PastMobile} alt="" width={767} height={446} className="absolute z-0 hidden xsm:block w-full right-0 lg:hidden" /> */}
            <Image src={PastXL} alt="" width={718} height={535} className="absolute z-0 hidden select-none pointer-events-none lg:block top-20 md:top-20 lg:top-52 xl:bottom-12 xl:top-56 right-0 w-4/6 lg:w-full lg:-right-28 max-w-[718px]" />
          </div>
        </div> 
      </div>
    </>

  );
};