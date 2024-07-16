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

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
  isAuthenticated: DashboardAuthenticationStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState, isAuthenticated }) => {
  const [age, setAge] = useState(0);
  const { apiUserData, displayModal, setDisplayModal, userHasPaid } = useDashboardContext();
  
  useEffect(() => {
    if (apiUserData && apiUserData.birthdate) {
      setAge(calculateAgeFromString(apiUserData?.birthdate));
    }
  }, [apiUserData]);

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

  return (
    <>
      {isAuthenticated === "Loading" && (
        <div>Loading...</div>
      )}
  
      {isAuthenticated === "Unauthenticated" && (
        <>
          <div>You're not logged in!</div>
          <Link href="/auth/login">Returning to login page...</Link>
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
                      <div className="my-2 w-full outline outline-1 rounded-3xl h-[400px] max-w-full content-center">
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
                <div>
                  <p>You must pay to submit art for the competition.</p>
                  <a href={process.env.NEXT_PUBLIC_STRIPE_URL + "?client_reference_id=" + apiUserData.sk} className="bg-new-blue text-white px-4 py-2 rounded">
                    Pay Now
                  </a>
                </div>
              )}
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
};