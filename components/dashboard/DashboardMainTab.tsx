import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { useDashboardContext } from "./DashboardContext";
import information from "../../public/svgs/information.svg";
import uploadIcon from "../../public/svgs/upload.svg";
import Image from "next/image";
import { ActiveArtDisplay } from "./ActiveArtDisplay";
import Popup from "./modal/Popup";
import { StepsProvider } from "./modal/StepsContext";
import { useEffect } from "react";
import { DashboardModal } from "./DashboardModal";
import Link from "next/link";
import { DashboardAuthenticationStates } from "../../mock/DashboardTypes";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
  isAuthenticated: DashboardAuthenticationStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState, isAuthenticated }) => {
  const { apiUserData } = useDashboardContext();

  const {displayModal, setDisplayModal} = useDashboardContext();
  {/* If modal is open, prevent page scrolling */}
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

      {isAuthenticated == "Loading" && 
      <div>
        <div>Loading...</div>
      </div>
      }

      {isAuthenticated == "Unauthenticated" &&
          <>
            <div>You're not logged in!</div>
            <Link href="/auth/login">Return to login page</Link>
          </>
      }
      {dashboardLoadingState === "Loaded" && isAuthenticated == "Authenticated" && (
        <>
          <p className="font-montserrat text-2xl font-regular text-[32px]">Welcome to your dashboard, {apiUserData?.f_name}!</p>
          <p className="font-light text-base py-2 pb-4">See your account information here.</p>
          <p className="py-2 pt-4 font-montserrat font-semibold text-2xl">Your Artwork</p>
          {apiUserData?.has_active_submission == true ? (
            <ActiveArtDisplay/>
          ) : (
            <div>
              <div className="my-2 w-full outline outline-1 rounded-3xl h-[400px] max-w-full content-center">
                <button onClick={() => setDisplayModal("mainTab")} className="z-10 flex bg-new-blue rounded text-white p-4 m-auto items-center gap-8">
                  <p>Upload Artwork</p>
                  <Image src={uploadIcon} alt="upload" width={16} height={16} />
                </button>
                {displayModal === "mainTab" && 
                  <DashboardModal> 
                    <StepsProvider>
                      <Popup></Popup>
                    </StepsProvider>
                  </DashboardModal>            
                }
              </div>
              <div className="flex gap-2 py-3">
                <Image src={information} alt="info" width={16} height={16} />
                <p>Please upload as PNG or JPG, max size 3 MB.</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};