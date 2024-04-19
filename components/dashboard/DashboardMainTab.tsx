import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { useDashboardContext } from "./DashboardContext";
import { useState } from "react";
import information from "../../public/svgs/information.svg";
import uploadIcon from "../../public/svgs/upload.svg";
import Image from "next/image";
import deleteIcon from "../../public/svgs/delete.svg";
import editIcon from "../../public/svgs/edit.svg";
import placeholderImage from "../../public/dashboard/placeholder-image.png";
import SocialShare from "../SocialShare";
import * as yup from "yup";
import { Formik } from "formik";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState }) => {
  const {apiUserData, userHasActiveSubmission, apiArtworkData, dashboardMainTabSubmissionData, setDashboardMainTabSubmissionData } = useDashboardContext();
  const [editMode, setEditMode] = useState(false);
  const validationSchema = yup.object().shape({ 
    source: yup.string().max(100, "Source must be no more than 100 characters long"),
    prompt: yup.string().max(200, "Prompt must be no more than 200 characters long"),
    description: yup.string().max(200, "Description must be no more than 200 characters long")
  });

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
            <div>
              <div className="my-2 p-6 outline outline-1 rounded-3xl lg:h-[440px] max-h-full max-w-full font-light">
                {apiUserData && apiArtworkData ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-6">
                    <div className="flex flex-col overflow-hidden gap-4">
                      <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
                        <Image
                          src={apiArtworkData?.url ?? placeholderImage}
                          alt="Your submitted image"
                          width={200}
                          height={100}
                          className="z-10 max-h-full max-w-full object-contain"
                        />
                        <Image
                          src={apiArtworkData?.url ?? placeholderImage}
                          alt="Background"
                          width={200}
                          height={100}
                          className="absolute z-0 rounded-xl blur-3xl opacity-50"
                        />
                      </div>
                      <div className="bg-main-orange rounded-[30px] w-[180px] p-2.5 gap-8 m-auto text-center">
                        <p className="m-auto font-semibold">{apiArtworkData?.votes} Votes</p>
                      </div>
                    </div>
                    <div className="flex flex-col pl-4 justify-between gap-4">
                      <p className="text-xl font-semibold">{apiUserData?.f_name} {apiUserData?.l_name}</p>
                      <div>
                        <p>{apiUserData?.age} | {apiUserData?.location}</p>
                        <p>{apiArtworkData.sport.join(" | ")}</p>
                      </div>
                      {apiArtworkData.is_ai_gen && !editMode && (
                        <div>
                          <p>* This image was created using AI</p>
                          <p>Source: {apiArtworkData.model}</p>
                          <p>AI Prompt: "{apiArtworkData.prompt}"</p>
                        </div>
                      )}
                      {editMode && (
                        <Formik
                          initialValues={dashboardMainTabSubmissionData}
                          validationSchema={validationSchema}
                          onSubmit={(values) => {
                            setDashboardMainTabSubmissionData(prevState => ({
                              ...prevState,
                              source: values.source,
                              prompt: values.prompt,
                              description: values.description
                            }));
                          }}>
                          {/* CustomInput forms go here */}
                        </Formik>
                      )}
                      {apiArtworkData.is_approved ? (
                        <div>
                          <p className="font-semibold">Share This Post</p>
                          <SocialShare shareUrl={"/gallery?id=" + apiArtworkData.id} />
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
              {apiUserData && apiArtworkData && 
              <div className="flex gap-4 justify-end">
                <button onClick={() => setEditMode(!editMode)}>
                  <Image src={editIcon} alt={"Pencil icon: Click to edit artwork"} width={16} height={16}/>
                </button>
                <Image src={deleteIcon} alt={"Trash icon: Click to delete artwork"} width={16} height={16}/>
              </div>
              }
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