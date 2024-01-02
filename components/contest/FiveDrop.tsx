"use client";

import Image from "next/image";
import pinkBlob from "../../public/svgs/contest-svg/pinkblobDrop.svg";
import { DownIcon } from "../svgs/DownIcon2";
import { UpIcon } from "../svgs/UpIcon2";
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
        <Image src={pinkBlob} alt="" width={442} height={417} className="absolute hidden -z-10 right-0 w-2/3 lg:block sm:w-1/2 lg:w-1/3 mb-10 top-20" />
      </div>

      <div className="mt-40 z-30 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <p className="font-medium text-4xl mb-6">Submission</p>
        <p className="font-light text-xl mb-12">Find answers to frequently asked questions about submitting your artwork for the art competition.</p>
      </div>

      <div className="z-30 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded1(!isExpanded1)} className="bg-light-green py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            What file formats are allowed?
            {!isExpanded1 &&
              <DownIcon />
            }
          </button>
          {isExpanded1 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon className="-mt-6"/>
            <p className="mt-4 font-light text-base leading-loose">
              We accept submissions in JPEG, and PNG formats.
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded2(!isExpanded2)} className="bg-light-green py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            What is the maximum file size?
            {!isExpanded2 &&
              <DownIcon />
            }
          </button>
          {isExpanded2 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon className="-mt-6"/>
            <p className="mt-4 font-light text-base leading-loose">
              The maximum file size should not exceed 10MB.
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded3(!isExpanded3)} className="bg-light-green py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            Are there any fees?
            {!isExpanded3 &&
              <DownIcon />
            }
          </button>
          {isExpanded3 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon className="-mt-6"/>
            <p className="mt-4 font-light text-base leading-loose">
              No, there are no fees associated with submitting an entry to the art competition.  
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-30 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded4(!isExpanded4)} className="bg-light-green py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            When can I submit?
            {!isExpanded4 &&
              <DownIcon />
            }
          </button>
          {isExpanded4 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon className="-mt-6"/>
            <p className="mt-4 font-light text-base leading-loose">
              Art submission can start on March 15th, 2024.  This will coincide with our kickoff in Paris during our art exhibition! 
            </p>
          </nav>
          }
        </div>
      </div>

      <div className="z-40 relative mt-6 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div onClick={() => SetIsExpanded5(!isExpanded5)} className="bg-light-green py-6 px-4 relative rounded-2xl cursor-pointer">
          <button className="group w-full text-xl font-semibold text-neutral-black inline-flex">
            How will winners be chosen?
            {!isExpanded5 &&
              <DownIcon />
            }
          </button>
          {isExpanded5 &&
          <nav tabIndex={0} className="w-full">
            <UpIcon className="-mt-6"/>
            <p className="mt-4 font-light text-base leading-loose">
              The top 20 artworks will be selected based on public votes on this site, so be sure to share your submission on social media.  These 20 finalists will make it to the next round where our sponsors will determine the top 3 winners. 
            </p>
          </nav>
          }
        </div>
      </div>


    </>
  );
};

