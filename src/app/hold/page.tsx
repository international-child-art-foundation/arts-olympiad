import { Metadata } from "next";
import { sharedOpenGraph } from "@/app/shared-metadata";
import arrow from "../../../public/hold/right-inclined-arrow-lg.svg";
import Image from "next/image";
import hashtag from "../../../public/home/hashtag.svg";
import BGleft from "../../../public/hold/left-background.svg";
import BGmiddle from "../../../public/hold/middle-background.svg";
import BGright from "../../../public/hold/right-background.svg";
import BGleftMB from "../../../public/hold/left-background-mb.svg";
import BGmiddleMB from "../../../public/hold/middle-background-mb.svg";
import BGrightMB from "../../../public/hold/right-background-mb.svg";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Under Construction | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Under Construction | My Favorite Sport",
  }
};



export default function underConstructionPage() {
  return (
    <div className=" flex flex-col items-center xsm:min-w-[428px] xsm:h-[890px] sm:h-[740px] lg:h-[800px] xl:h-[880px] mxl:h-[1030px] selection:justify-normal h-screen text-center bg-green-100">
      <div className="flex flex-col items-center md:mt-[50px] mt-[99px] lg:mt-[180px] ">
        <div className="items-center z-20"><h1 className=" xsm:px-2  xsm:w-[372px] xsm:text-[40px] lg:text-5xl xl:text-6xl xsm:h-[112px] sm:w-[601.98px] xl:mt-[100px]  text-center text-neutral-900 sm:text-5xl font-semibold font-['Epilogue'] sm:mb-8 xsm:leading-[56.10px] sm:leading-[70.10px]  lg:mb-0 lg:w-full lg:h-[71px] ">Great Things Are On The Horizon!</h1></div>
        <div className="flex flex-row items-center text-center  mb-4 mxl:mt-4 ">
          <Image className="w-6 h-6 md:w-12 md:h-12 z-20" src={hashtag} alt="" width={32} height={32}  />
          <h2 className="lg:text-5xl xl:text-6xl text-center z-10 text-neutral-900 xsm:text-[32px] sm:text-5xl xsm:font-normal sm:font-semibold font-['Epilogue'] xsm:leading-[48px] sm:leading-[70.10px] ">MyFavoriteSport</h2>
        </div>
        <Image  src={arrow} alt=" Arrow pointing down." className="block z-10 absolute  xsm:right-[2rem] xsm:rotate-[-35deg]  xsm:top-[21rem] sm:right-[6rem] sm:top-[26rem] sm:rotate-[-55deg] lg:right-[8rem] lg:rotate-[-30deg] xl:right-[20rem] xl:top-[32rem] xl:rotate-[0deg] scale-125 mxl:top-[34rem]  mxl:right-[16rem]"  />
        <div className="justify-between mx-auto py-16 text-md">
          <div className="flex flex-col gap-8 items-left text-left md:mx-6 lg:mx-8">
            <p className="z-10 xsm:w-[380px] font-light font-['Open Sans'] leading-loose text-neutral-900 text-xl sm:w-[621.05px] lg:w-[814px] mxl:w-[860px]">We're busy at work creating something exciting! Our page is currently under construction, but we promise it will be worth the wait. Here's what you can look forward to:</p>
            <ul className="list-disc list-outside lg:px-6 z-10 w-[380px] text-neutral-900 xsm:text-xl font-light font-['Open Sans'] leading-loose sm:w-[621.05px] lg:w-[814px] ">
              <li className="my-1">A brand-new look that's as dynamic and engaging as our community.</li>
              <li  className="my-1">User-friendly features that make navigation a breeze.</li>
              <li  className="my-1">Fresh content that informs, delights, and inspires.</li>
            </ul>
            <div className=" rounded-full flex items-center justify-center flex-col">
              <Link href="/" className="z-10">
                <button className="bg-blue-900 hover:bg-blue-700 text-white py-3 px-2 rounded w-28 text-xs z-10">Take me home</button>
              </Link>
            </div>
            <div className="flex flex-row ">
              <Image   src={BGleftMB} alt="Background left block." className="block w-[503px] h-[732px] absolute -left-24 -bottom-80 ml-0.5  sm:hidden " />
              <Image   src={BGleft} alt="Background left block." className=" absolute -left-48 -bottom-40 ml-0.5 hidden sm:block lg:-bottom-28 xl:scale-125 mxl:-bottom-44 mxl:-left-40" />
              <Image   src={BGmiddleMB} alt="Background middle block." className="block  w-[958px] h-[739px] absolute -bottom-80 ml-0.5  sm:hidden "  />
              <Image   src={BGmiddle} alt="Background middle block." className=" w-[958px] h-[739px] absolute sm:-bottom-20 sm:-left-8 hidden sm:block lg:-bottom-0 xl:left-[18rem] xl:scale-125"  />
              <Image   src={BGrightMB} alt="Background right block." className="block w-[934px] h-[870px] absolute -right-40 -bottom-[24rem] ml-0.5  z-0  sm:hidden" />
              <Image   src={BGright} alt="Background right block." className=" w-[934px] h-[870px] absolute -right-[24rem] -bottom-[10rem] ml-0.5 lg:-bottom-[2rem] lg:-right-[23rem] hidden sm:block xl:-right-[14rem] xl:-bottom-[8rem] xl:scale-100 mxl:-right-[4rem]" />
            </div>
          </div>
          
        </div>
      </div>

      

     
      
    </div>
  );
  
  
};

