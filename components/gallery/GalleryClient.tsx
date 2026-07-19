"use client";

import { Suspense, useEffect, useState } from "react";
import { ContestState } from "../../mock/contestState";
import {
  getContestEndTime,
  getContestStartTime,
  getContestState,
} from "@/utils/contest-state";
import { GalleryHeader } from "./GalleryHeader";
import { FilterProvider } from "./FilterContext";
import { Arts } from "./Arts";
import { BannerImgOverflow } from "../BannerImgOverflow";
import multiPic from "../../public/svgs/gallery-svg/multiPic.webp";

interface GalleryClientProps {
  initialContestState: ContestState;
}

const MAX_TIMEOUT_MS = 2_147_483_647;

export function GalleryClient({ initialContestState }: GalleryClientProps) {
  const [contestState, setContestState] =
    useState<ContestState>(initialContestState);

  useEffect(() => {
    let timeoutId: number | undefined;

    const updateContestState = () => {
      setContestState(getContestState());

      const now = Date.now();
      const nextTransition = [
        getContestStartTime().getTime(),
        getContestEndTime().getTime(),
      ].find((transitionTime) => transitionTime > now);

      if (nextTransition) {
        timeoutId = window.setTimeout(
          updateContestState,
          Math.min(nextTransition - now + 1000, MAX_TIMEOUT_MS),
        );
      }
    };

    updateContestState();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <GalleryHeader contestState={contestState} />
      <FilterProvider>
        <Suspense>
          <Arts contestState={contestState} />
        </Suspense>
      </FilterProvider>

      <BannerImgOverflow
        backgroundColor="light-blue"
        title={
          contestState === ContestState.Active
            ? "Submit Your Artwork Today!"
            : contestState === ContestState.Inactive
              ? "Start creating your masterpiece!"
              : "The contest has ended"
        }
        description={
          contestState === ContestState.Active
            ? "Join the Art Competition and Showcase Your Talent in Anticipation of the 2026 World Cup."
            : contestState === ContestState.Inactive
              ? "Our competition will begin very soon. Now is the best time to get creative."
              : "Thank you to everyone for participating!"
        }
        img={[multiPic]}
        alt={["Artwork of Olympic sports", "Artwork of Olympic sports"]}
        buttons={
          contestState === ContestState.Active ||
          contestState === ContestState.Inactive
            ? [
                {
                  href: "/dashboard",
                  localLink: true,
                  text: "Submit",
                  icon: <></>,
                  className:
                    "w-full bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white",
                },
                {
                  href: "/contest",
                  localLink: true,
                  text: "Learn More",
                  icon: <></>,
                  className:
                    "w-full ml-4 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36",
                },
              ]
            : []
        }
      />
    </>
  );
}
