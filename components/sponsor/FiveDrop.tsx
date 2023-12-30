"use client";

import Image from "next/image";
import yellowBlob from "../../public/svgs/sponsor-svg/yellowblob.svg";
import { DownIcon } from "../svgs/DownIcon2";
import { UpIcon } from "../svgs/UpIcon2";
import { HeartIcon } from "../svgs/HeartIcon";
import { useState } from "react";

export const FiveDrop = () => {
  const [isExpanded1, SetIsExpanded1] = useState(false);
  const [isExpanded2, SetIsExpanded2] = useState(false);
  const [isExpanded3, SetIsExpanded3] = useState(false);  
  const [isExpanded4, SetIsExpanded4] = useState(false);  
  const [isExpanded5, SetIsExpanded5] = useState(false);

  return (
    <>
      <div className="relative">
        <Image src={yellowBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-2/3 sm:w-1/2 lg:w-1/3 mb-10 -top-72" />
      </div>

      <div className="z-30 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded1(!isExpanded1)} className="bg-baby-blue py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            How can I be a sponsor?
            {!isExpanded1 &&
              <DownIcon />
            }
          </button>
          {isExpanded1 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon />
            <p className="mt-4 font-light text-lg leading-loose">
              To explore sponsorship opportunities and learn about the unique benefits, please contact us.
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded2(!isExpanded2)} className="bg-baby-blue py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            What are the benefits?
            {!isExpanded2 &&
              <DownIcon />
            }
          </button>
          {isExpanded2 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon />
            <p className="mt-4 font-light text-lg leading-loose">
              As a sponsor, you will gain visibility and recognition among our audience.  You will also have the opportunity to support young artists to contribute to a meaningful cause. 
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded3(!isExpanded3)} className="bg-baby-blue py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            Can I partner with you?
            {!isExpanded3 &&
              <DownIcon />
            }
          </button>
          {isExpanded3 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon />
            <p className="mt-4 font-light text-lg leading-loose">
              Please contact us to explore collaboration opportunities. 
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded4(!isExpanded4)} className="bg-baby-blue py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            How does sponsorship work?
            {!isExpanded4 &&
              <DownIcon />
            }
          </button>
          {isExpanded4 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon />
            <p className="mt-4 font-light text-lg leading-loose">
              Sponsorship involves providing financial support to our charity and the at competition.  In return, sponsors receive various benefits such as brand exposure and recognition.
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-40 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded5(!isExpanded5)} className="bg-baby-blue py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            Can I donate instead?
            {!isExpanded5 &&
              <DownIcon />
            }
          </button>
          {isExpanded5 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon />
            <p className="mt-4 mb-8 font-light text-lg leading-loose">
              Absolutely! If you prefer to make a donation instead of becoming a sponsor, we appreciate your support. Visit our donation page to contribute. 
            </p>
            <a href="https://icaf.org/donate" className="group w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm tracking-wide bg-new-blue text-neutral-white">
              <HeartIcon stroke="white" />
              Donate
            </a>
          </nav>
          }
        </div>
      </div>


    </>
  );
};

