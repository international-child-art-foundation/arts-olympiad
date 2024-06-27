import { useDashboardContext } from "./DashboardContext";
import Image from "next/image";
import placeholderImage from "../../public/dashboard/placeholder-image.png";
import SocialShare from "../SocialShare";
import { useEffect } from "react";
import { fakeUserArtworkData } from "../../mock/fakeUserArtworkData";

export const VotedArtDisplay = () => {
  const {apiUserData, apiArtworkVoteData, setApiArtworkVoteData } = useDashboardContext();
  // On page load, get and set voted artwork data once
  useEffect(() => { 
    setTimeout(() => { // Simulate API call wait time
      setApiArtworkVoteData(fakeUserArtworkData);
    }, 1000);
  });

  return (
    <div>
      <div className="my-2 p-6 outline outline-1 rounded-3xl max-h-full max-w-full font-light">
        {apiArtworkVoteData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-6">
            <div className="flex flex-col overflow-hidden gap-4">
              <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-grow ">
                <Image
                  src={apiArtworkVoteData?.url ?? placeholderImage}
                  alt="Your submitted image"
                  width={400}
                  height={400}
                  className="z-10 max-h-full max-w-full object-contain"
                />
                <Image
                  src={apiArtworkVoteData?.url ?? placeholderImage}
                  alt="Background"
                  width={400}
                  height={400}
                  className="absolute z-0 rounded-xl blur-3xl opacity-50"
                />
              </div>
              <div className="bg-main-orange flex rounded-[30px] w-[180px] p-2.5 gap-8 m-auto text-center h-auto flex-none">
                <p className="m-auto font-semibold">{apiArtworkVoteData?.votes} Votes</p>
              </div>
            </div>
            <div className="flex flex-col pl-4 justify-between gap-4">
              <p className="text-xl font-semibold">{apiUserData?.f_name} {apiUserData?.l_name}</p>
              <div>
                <p>{apiUserData?.age} | {apiUserData?.location}</p>
                <p>{apiArtworkVoteData.sport}</p>
              </div>
              {apiArtworkVoteData.is_ai_gen && (
                <div>
                  <p>* This image was created using AI</p>
                  <p>Source: {apiArtworkVoteData.model}</p>
                  <p>AI Prompt: "{apiArtworkVoteData.prompt}"</p>
                </div>
              )}
              <div>
                <p className="font-semibold">Share This Post</p>
                <SocialShare shareUrl={"/gallery?id=" + apiArtworkVoteData.id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="my-2 w-full rounded-3xl max-h-full max-w-full content-center p-4 text-center">
            <p>Loading your voted-upon artwork...</p>
            <a href="https://icaf.org/contact-us" className="text-blue-500">Contact Us</a>
          </div>
        )}
      </div>
    </div>
  );
};