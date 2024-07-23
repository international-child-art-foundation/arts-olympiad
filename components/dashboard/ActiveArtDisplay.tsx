import { useDashboardContext } from "./DashboardContext";
import { useState, useEffect } from "react";
import information from "../../public/svgs/information.svg";
import Image from "next/image";
import deleteIcon from "../../public/svgs/delete.svg";
import SocialShare from "../SocialShare";
import { buildMdImageUrl } from "@/utils/url-builders";
import { calculateAgeFromString } from "@/utils/helper-functions";
import Link from "next/link";

export const ActiveArtDisplay = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [userAge, setUserAge] = useState(0);
  const {apiUserData, apiArtworkData, setDisplayModal } = useDashboardContext();

  useEffect(() => {
    if (apiArtworkData && apiArtworkData.sk) {
      console.log(apiArtworkData);
      setImageUrl(buildMdImageUrl(apiArtworkData.sk));
    }
  }, [apiArtworkData]);
  
  useEffect(() => {
    if (apiUserData) {
      setUserAge(calculateAgeFromString(apiUserData.birthdate));
    }
  }, [apiUserData]);

  return (
    <div>
      <div className="my-2 p-6 outline outline-1 rounded-3xl max-h-full max-w-full font-light">
        {apiUserData && apiArtworkData ? (
          (!apiArtworkData && (userAge > 20 || userAge < 14)  ? (
            <div className="text-center">
              <p>In order to submit art, you must be between the ages of 14 and 20.</p>
              <Link href="/gallery" className="mx-auto text-blue-600">Visit the gallery</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-6 overflow-hidden">
              <div className="flex flex-col overflow-hidden gap-4">
                <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-grow ">
                  {imageUrl && (
                    <>
                      <Image
                        src={imageUrl}
                        alt="Your submitted image"
                        width={400}
                        height={400}
                        className="z-10 max-h-full max-w-full object-contain"
                      />
                      <Image
                        src={imageUrl}
                        alt="Background"
                        width={400}
                        height={400}
                        className="absolute z-0 rounded-xl blur-3xl opacity-50"
                      />
                    </>
                  )}
                </div>
                <div className="bg-main-orange flex rounded-[30px] w-[180px] p-2.5 gap-8 m-auto text-center h-auto flex-none">
                  <p className="m-auto font-semibold">
                    {apiArtworkData.votes} {apiArtworkData.votes == 1 ? "Vote" : "Votes"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col pl-4 justify-between gap-4">
                <p className="text-xl font-semibold">{apiUserData?.f_name} {apiUserData?.l_name}</p>
                <div>
                  <p>{apiArtworkData?.age} | {apiArtworkData?.location}</p>
                  <p>{apiArtworkData.sport}</p>
                </div>
                <div>
                  <p>{apiArtworkData.description}</p>
                </div>
                {apiArtworkData.is_ai_gen && (
                  <div>
                    <p>* This image was created using AI</p>
                    <p>Source: {apiArtworkData.model}</p>
                    <p>AI Prompt: "{apiArtworkData.prompt}"</p>
                  </div>
                )}
                <div>
                  <p className="font-semibold">Share This Post</p>
                  <SocialShare shareId={apiArtworkData.sk} />
                </div>
                <div className="bg-white rounded-xl p-4 opacity-95">
                  <p>Your art is still being reviewed by our team and will not yet appear in the gallery.</p>
                  <p className={"italic"}>You can still share it with your friends and receive votes!</p>
                </div>
              </div>
            </div>
          )
          ) 
        ) : (
          <div className="my-2 w-full rounded-3xl max-h-full max-w-full content-center p-4 text-center">
            <p>Loading user and artwork data...</p>
            <a href="https://icaf.org/contact-us" className="text-blue-500">Contact Us</a>
          </div>
        )}
      </div>
      {apiUserData && apiArtworkData && 
      <div className="flex gap-4 justify-end">
        <button onClick={() => setDisplayModal("deleteModal")}>
          <Image src={deleteIcon} alt={"Trash icon: Click to delete artwork"} width={16} height={16}/>
        </button>
      </div>
      }
      {!apiArtworkData && 
        <div className="flex gap-2 py-3">
          <Image src={information} alt="info" width={16} height={16} />
          <p>Please upload as PNG or JPG, max size 5 MB.</p>
        </div>
      }
    </div>
  );
};