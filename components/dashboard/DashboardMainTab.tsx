import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { useDashboardContext } from "./DashboardContext";
import information from "../../public/svgs/information.svg";
import uploadIcon from "../../public/svgs/upload.svg";
import Image from "next/image";
import { ActiveArtDisplay } from "./ActiveArtDisplay";
import Popup from "./modal/Popup";
import { StepsProvider } from "./modal/StepsContext";
import { useEffect, useState } from "react";
import { DashboardModal } from "./DashboardModal";
import Link from "next/link";
import { DashboardAuthenticationStates } from "../../mock/DashboardTypes";
import { calculateAgeFromString } from "@/utils/helper-functions";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { ContestState } from "../../mock/contestState";
import { formatDate } from "../../mock/dates";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
  isAuthenticated: DashboardAuthenticationStates;
  contestState: ContestState;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState, isAuthenticated, contestState }) => {
  const [age, setAge] = useState(0);
  const [isSubmissionDisabled] = useState(true);
  const { apiUserData, displayModal, setDisplayModal, userHasPaid, setUserHasPaid } = useDashboardContext();
  
  useEffect(() => {
    if (apiUserData && apiUserData.birthdate) {
      setAge(calculateAgeFromString(apiUserData?.birthdate));
    }
    if (apiUserData && apiUserData.has_paid) {
      setUserHasPaid(true);
    }
  }, [apiUserData, setUserHasPaid]);

  useEffect(() => {
    if (displayModal === "mainTab") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [displayModal]);

  if (contestState == ContestState.Inactive) {
    return (
      <div className="w-full">
        <p className="font-montserrat text-2xl font-regular text-[32px]">Welcome to your dashboard!</p>
        <p className="text-xl my-4 mt-5">
          The contest has not yet begun. It begins on <span className="font-bold"> {formatDate("competitionBegin", "MMMM do")}</span>.
        </p>
        <p>
          Until then, <Link className="text-blue-600 visited:text-purple-600 underline" href="/past-entries">get inspired</Link> by viewing the work of our exceptional past artists!
        </p>
      </div>
    );
  } else if (contestState == ContestState.Active || contestState == ContestState.Complete) {

    // Contest is paused
    if (isSubmissionDisabled) {
      return (
        <div className="w-full">
          <p className="text-2xl">
            The competition is currently paused, and art submission has been disabled. Please <a className="text-main-blue" href="https://www.icaf.org/about/contact-us">Contact Us</a> for more information.
          </p>
        </div>
      );
    }

    return (
      <>
        {(isAuthenticated === "Loading" || isAuthenticated === "Authenticated" && dashboardLoadingState != "Loaded")  && (
          <div className="h-full">
            <LoadingAnimation scale={1} stroke={2}/>
          </div>
        )}
    
        {isAuthenticated === "Unauthenticated" && (
          <>
            <div>You're not logged in!</div>
            <Link href="/login">Returning to login page...</Link>
          </>
        )}
    
        {apiUserData && isAuthenticated === "Authenticated" && dashboardLoadingState === "Loaded" && (
          <>
            <p className="font-montserrat text-2xl font-regular text-[32px]">Welcome to your dashboard, {apiUserData.f_name}!</p>
            <p className="font-light text-base py-2 pb-4">See your account information here.</p>
            
            {age >= 14 && age <= 20 ? (
              <>
                {userHasPaid ? (
                  <>
                    <p className="py-2 pt-4 font-montserrat font-semibold text-2xl">Your Artwork</p>
                    {apiUserData.has_active_submission ? (
                      <ActiveArtDisplay />
                    ) : (
                      <div>
                        <div className="my-2 w-full outline outline-1 rounded-3xl h-[400px] max-w-full flex">
                          <button onClick={() => setDisplayModal("mainTab")} className="z-10 flex bg-new-blue rounded text-white p-4 m-auto items-center gap-8">
                            <p>Upload Artwork</p>
                            <Image src={uploadIcon} alt="upload" width={16} height={16} />
                          </button>
                          {displayModal === "mainTab" && (
                            <DashboardModal>
                              <StepsProvider>
                                <Popup />
                              </StepsProvider>
                            </DashboardModal>
                          )}
                        </div>
                        <div className="flex gap-2 py-3">
                          <Image src={information} alt="info" width={16} height={16} />
                          <p>Please upload as PNG or JPG, max size 5 MB.</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {contestState == ContestState.Complete ? (
                      <div>
                        <p>
                          The contest has ended. Thank you for participating!
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col my-6">
                        <p className="">In order to submit art, you must first pay a $3 administrative fee. </p>
                        <p className="">Once the fee is paid, we can go through the process of getting your artwork ready for the world. </p>
                        <a href={process.env.NEXT_PUBLIC_STRIPE_URL + "?client_reference_id=" + apiUserData.sk} className=" my-4 mx-auto text-center bg-new-blue text-white px-4 py-2 rounded active:scale-[97%]">
                          Pay Entry Fee
                        </a>
                      </div>

                    )
                    }
                  </>
                )
                }
              </>
            ) : (
              <div>
                <p>You don't meet the age requirements to enter this competition.</p>
                <p>Feel free to vote on the <Link href="/gallery" className="text-blue-600">Gallery page</Link>.</p>
              </div>
            )}
          </>
        )}
    
        {!apiUserData && isAuthenticated === "Authenticated" && dashboardLoadingState === "Loaded" && (
          <div>Unable to find your data.</div>
        )}
      </>
    );  
  }

};