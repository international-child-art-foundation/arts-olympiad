import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { useDashboardContext } from "./DashboardContext";
import information from "../../public/svgs/information.svg";
import uploadIcon from "../../public/svgs/upload.svg";
import Image from "next/image";
import { ActiveArtDisplay } from "./ActiveArtDisplay";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState }) => {
  const { apiUserData, userHasActiveSubmission } = useDashboardContext();

  return (
    <>
      {dashboardLoadingState === "Loading" && (
        <div>Loading...</div>
      )}
      {dashboardLoadingState === "Loaded" && (
        <>
          <p className="font-montserrat text-2xl font-regular text-[32px]">Welcome to your dashboard, {apiUserData?.f_name}!</p>
          <p className="font-light text-base py-2 pb-4">See your account information here.</p>
          <p className="py-2 pt-4 font-montserrat font-semibold text-2xl">Your Artwork</p>
          {userHasActiveSubmission ? (
            <ActiveArtDisplay/>
          ) : (
            <div>
              <div className="my-2 w-full outline outline-1 rounded-3xl h-[400px] w-[81%] max-h-full max-w-full content-center">
                <button className="flex bg-new-blue rounded text-white p-4 m-auto items-center gap-8">
                  <p>Upload Artwork</p>
                  <Image src={uploadIcon} alt="upload" width={16} height={16} />
                </button>
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