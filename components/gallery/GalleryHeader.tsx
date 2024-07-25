"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import hashtag from "../../public/home/hashtag.svg";
import Paris from "../../public/svgs/gallery-svg/Paris.svg";
import {Countdown} from "./Countdown";
import CountdownContainerMobile from "./CountdownContainerMobile";
import CountdownContainer from "./CountdownContainer";
import colorfulScribble from "../../public/svgs/colorful-scribble.svg";
import Link from "next/link";
import { ContestState } from "../../mock/contestState";
import { getTotalVotes } from "@/utils/api-artworks";
// import { artworks } from "../../mock/artworks";
import { limiter } from "@/utils/api-rate-limit";
import { formatDate } from "../../mock/dates";

interface GalleryHeaderProps {
  contestState: ContestState;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ contestState }) => {  
  const [totalVotes, setTotalVotes] = useState<number | undefined>(undefined);

  const fetchTotalVotes = useCallback(async () => {
    try {
      const votesResponse = await limiter.schedule(() => getTotalVotes());
      if (votesResponse.success) {
        setTotalVotes(votesResponse.total_votes);
      } else {
        setTotalVotes(undefined);
      }
    } catch {
      setTotalVotes(undefined);
    }
  }, []);

  useEffect(() => {
    fetchTotalVotes();
  }, [fetchTotalVotes]);

  return (
    <>
      <section className="relative flex scale-x-80 xsm:scale-x-100 justify-start xsm:justify-center mt-6 md:mt-20 max-h-[760px] bg-neutral-white m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <article className="relative z-20">
          <div className="z-20 mb-1 lg:mb-4 flex justify-start xsm:justify-center">
            <Image src={hashtag} alt="" width={32} height={32}  />
            <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
                MyFavoriteSport<span className="sr-only">.</span>
            </h1>
          </div>

          <div className="z-20 relative">
            <h1 className="xsm:text-center z-20 font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl mb-7 sm:mb-6">
              Gallery of Active Entries
            </h1>
            <h3 className="mb-14 xsm:text-center z-20 text-base font-light lg:text-xl 2xl:font-semibold" >
              Discover Unique Artworks, Vote for Your Favorites, and Find Your Inspiration.
            </h3>
          </div>
        </article>
      </section>

      <section className="relative z-0 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">  
        <div className="scale-[80%] xsm:scale-100 flex justify-center items-center">
          <Image src={Paris} width = {78} height = {78} alt="" className="z-50 lg:absolute hidden lg:block lg:mr-[480px]" />
          <div className="z-50 mt-4 lg:mb-4">
            <Countdown />
          </div>
          <div className="lg:hidden"><CountdownContainerMobile /></div>
          <div className="hidden lg:block "><CountdownContainer /></div>
        </div>


        {/* Total votes section - to be activated upon contest start and populated via API */}
        <div className="mb-10 mt-10 flex justify-center items-center">
          { contestState != ContestState.Inactive && totalVotes &&  
        <>
          <div className="text-base font-semibold lg:text-xl mr-3">
            Total votes:
          </div>
          <div className="text-3xl font-semibold lg:text-4xl lg:font-bold">
            {totalVotes > 0 && totalVotes}
            <Image src={colorfulScribble} alt="" width={160} height={20} className="-ml-12"/>
          </div>
        </>
          }
        </div>

        <div className="my-10"></div>
        {contestState == ContestState.Inactive && 
          <div className="flex justify-center items-center text-base lg:text-xl mr-3 mb-20 lg:mb-36 font-normal">
            <p>
              This contest has not yet begun. It begins on <span className="font-bold"> {formatDate("competitionBegin", "MMMM do, yyyy")}</span>. Feel free to
              {" "}<Link href="/past-entries" className="text-blue-500 visited:text-purple-600">
                explore previously submitted art
              </Link>{" "}
              in the meantime.
            </p>
          </div>
        }

      </section>  
    </>
  );
};