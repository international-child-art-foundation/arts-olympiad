import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { useDashboardContext } from "./DashboardContext";
import information from "../../public/svgs/information.svg";
import uploadIcon from "../../public/svgs/upload.svg";
import Image from "next/image";
// import deleteIcon from "../../public/svgs/delete.svg";
import placeholderImage from "../../public/dashboard/placeholder-image.png";
import SocialShare from "../SocialShare";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState }) => {
  const {userData, userHasActiveSubmission, artworkData } = useDashboardContext();
  return (
    <>
      {dashboardLoadingState === DashboardLoadingStates.Loading && (
        <div>Loading...</div>
      )}
      {dashboardLoadingState === DashboardLoadingStates.Loaded && (
        <>
          <p className="font-montserrat text-2xl font-regular text-[32px]">Welcome to your dashboard, {userData?.f_name}!</p>
          <p className="font-light text-base py-2 pb-4">See your account information here.</p>
          <p className="py-2 pt-4 font-montserrat font-semibold text-2xl">Your Artwork</p>
          {userHasActiveSubmission ? (
            <div>
              <div className="my-2 p-6 outline outline-1 rounded-3xl lg:h-[440px] max-h-full max-w-full font-light">
                {userData && artworkData ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-6">
                    <div className="flex flex-col overflow-hidden gap-4">
                      <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
                        <Image
                          src={artworkData?.url ?? placeholderImage}
                          alt="Your submitted image"
                          width={200}
                          height={100}
                          className="z-10 max-h-full max-w-full object-contain"
                        />
                        <Image
                          src={artworkData?.url ?? placeholderImage}
                          alt="Background"
                          width={200}
                          height={100}
                          className="absolute z-0 rounded-xl blur-3xl opacity-50"
                        />
                      </div>
                      <div className="bg-main-orange rounded-[30px] w-[180px] p-2.5 gap-8 m-auto text-center">
                        <p className="m-auto font-semibold">{artworkData?.votes} Votes</p>
                      </div>
                    </div>
                    <div className="flex flex-col pl-4 justify-between gap-4">
                      <p className="text-xl font-semibold">{userData?.f_name} {userData?.l_name}</p>
                      <div>
                        <p>{userData?.age} | {userData?.location}</p>
                        <p>{artworkData.sport.join(" | ")}</p>
                      </div>
                      {artworkData.is_ai_gen && (
                        <div>
                          <p>* This image was created using AI</p>
                          <p>Source: {artworkData.model}</p>
                          <p>AI Prompt: "{artworkData.prompt}"</p>
                        </div>
                      )}
                      {artworkData.is_approved ? (
                        <div>
                          <p className="font-semibold">Share This Post</p>
                          <SocialShare shareUrl={"/gallery?id=" + artworkData.id} />
                        </div>
                      ) : (
                        <div>
                          <p>Your art is still being reviewed by our team. Check back later to share it!</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="my-2 w-full rounded-3xl max-h-full max-w-full content-center p-4 text-center">
                    <p>Loading user and artwork data...</p>
                    <a href="icaf.org/contact-us" className="text-blue-500">Contact Us</a>
                  </div>
                )}
              </div>
              <div className="flex gap-2 py-3">
                <Image src={information} alt="info" width={16} height={16} />
                <p>Please upload as PNG or JPG, max size 3 MB.</p>
              </div>
            </div>
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