import { Metadata } from "next";
import { sharedOpenGraph } from "@/app/shared-metadata";
import arrow from "../../../public/hold/right-inclined-arrow.svg";
import Image from "next/image";
import hashtag from "../../../public/home/hashtag.svg";

export const metadata: Metadata = {
  title: "Under Construction | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Under Construction | My Favorite Sport",
  }
};



export default function underConstructionPage() {
  return (
    <div className=" flex flex-col items-center min-w-[380px] justify-normal h-screen text-center  bg-neutral-white">
      <div className="flex flex-col items-center md:mt-[50px] mt-[99px] lg:mt-[180px]">
        <div className="items-center"><h1 className=" lg:w-[823px] lg:h-[468] text-3xl xsm:text-4xl lg:text-4xl xl:text-6xl font-bold text-center xsm:px-10% px-8 sm:px-18 lg:px-0">Great Things Are On The Horizon!</h1></div>
        <div className="flex flex-row items-center text-center sm:px-5 xsm:px-10%  mt-1 md:mt-4 mb-8">
          <Image className="w-6 h-6 md:w-12 md:h-12" src={hashtag} alt="" width={32} height={32}  />
          <h2 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl md:font-bold text-center">MyFavoriteSport</h2>
          <Image  width={30} src={arrow} alt=" Arrow pointing down." className="block  ml-0.5 w-6 h-6" />
        </div>
        <div className="justify-between mx-auto py-10 w-10/12 md:w-9/12 text-md">
          <div className="flex flex-col gap-8 items-left text-left md:mx-6 lg:mx-8">
            <p className="">We're busy at work creating something exciting! Our page is currently under construction, but we promise it will be worth the wait. Here's what you can look forward to:</p>
            <ul className="list-disc list-outside px-8 lg:px-6 ">
              <li>A brand-new look that's as dynamic and engaging as our community.</li>
              <li>User-friendly features that make navigation a breeze.</li>
              <li>Fresh content that informs, delights, and inspires.</li>
            </ul>
            <div className=" rounded-full flex items-center justify-center flex-col">
              <button className="bg-blue-900 hover:bg-blue-700 text-white py-3 px-2 rounded w-28 text-xs">Take me home</button>
            </div>
          </div>
          
        </div>
      </div>

      

     
      
    </div>
  );
  
  
};

