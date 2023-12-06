import Image from "next/image";
import blueBlob from "../../public/svgs/contest-svg/blueBlob.svg";
import {AnimatedScribble} from "../../components/common/decorations/AnimatedScribble";
import { VoteIcon } from "../../public/svgs/contest-svg/VoteIcon";
import { ThreeDot } from "../../public/svgs/contest-svg/ThreeDot";
import { ThreePerson } from "../../public/svgs/contest-svg/ThreePerson";
import { ThreeMedal } from "../../public/svgs/contest-svg/ThreeMedal";

export const Voting = () => {
  return (
    <>
      <Image src={blueBlob} alt="" width={442} height={417} className="absolute -z-10 left-0 w-full sm:w-2/3 lg:w-1/2 mb-10 top mt-[460px] sm:mt-60" />

      <div className="relative z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <p className="hidden sm:block text-3xl font-bold 2xl:text-5xl" >Judging Criteria & Voting Process</p>
        <p className="sm:hidden text-3xl font-bold 2xl:text-5xl pb-3" >Judging Criteria</p>
        <p className="sm:hidden text-3xl font-bold 2xl:text-5xl mb-8" >& Voting Processa</p>
        <AnimatedScribble width={150} smwidth={100} className="stroke-new-blue hidden ml-[430px] 2xl:ml-[710px] sm:block" />
        <p className="font-light text-base mb-8"> 
          Artwork will be judged based on originality, creativity, and relevance to the theme. The public will have the opportunity to vote for their favorite submissions.
        </p>
      </div>
      
      <div className="grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="z-50 col-span-2 lg:col-span-1 bg-light-yellow w-full lg:w-[460px] xl:w-[636px] 2xl:w-[816px] h-fix rounded-xl">
          <Image src="/hands.png" width = {509} height = {432} className="mx-auto w-3/4 sm:w-2/5 lg:w-1/2 xl:w-4/5 2xl:w-2/3 my-7" alt="hands" />
          <div className="grid grid-cols-3">
            <h2 className="text-2xl sm:text-xl lg:text-2xl lg:font-semibold col-span-3 lg:col-span-1 ml-7 sm:ml-16 lg:ml-7 xl:ml-9 2xl:ml-11">One-Vote Rule:</h2>
            <p className="mx-7 sm:mx-16 col-span-3 lg:col-span-2 mt-4 font-extralight text-base mb-7">Remember, your voice matters! Each participant is allowed a single vote to ensure a fair and balanced competition. Cast your vote carefully — once it's submitted, it's final!</p>
          </div>
        </div>

        <div className="mt-10 col-span-2 lg:col-span-1 lg:mt-0 lg:ml-16 xl:ml-32 2xl:ml-48">
          <h3 className="group w-full text-2xl font-semibold inline-flex">
            <span className="lg:hidden"><ThreeDot /></span>
            <span className="hidden lg:block"><VoteIcon /></span>
            <span className="ml-3">Public Voting</span>
          </h3>
          <p className="mt-4 font-extralight text-base leading-loose">
            The top 20 submissions with the most public votes will proceed to the final round.
          </p>

          <h3 className="group w-full text-2xl font-semibold mt-10 inline-flex">
            <ThreePerson />
            <span className="ml-3">ICAF Panel of Judges</span>
          </h3>
          <p className="mt-4 font-extralight text-base leading-loose">
            The panel will review the top 20 submissions and select the top three winners.
          </p>

          <h3 className="group w-full text-2xl font-semibold mt-10 inline-flex">
            <ThreeMedal />
            <span className="ml-3">Winner Announcement</span>
          </h3>
          <p className="mt-4 font-extralight text-base leading-loose">
            Gold, Silver, and Bronze winners will be announced in Washington DC on July 1st.
          </p>

          <div className="flex justify-center lg:justify-start mt-10">              
            <a href="#" className="w-fit h-fit border-new-blue border rounded text-center py-3 px-5 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue">
              Register to vote
            </a>
            <a href="#" className="ml-5 w-fit h-fit border-new-blue border rounded text-center py-3 px-5 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue">
              Enter competition
            </a>
          </div>
        </div>
      </div>

    </>
  );
};