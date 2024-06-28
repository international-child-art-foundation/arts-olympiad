import { useDashboardContext } from "./DashboardContext";
import { useState, useEffect } from "react";
import information from "../../public/svgs/information.svg";
import Image from "next/image";
import deleteIcon from "../../public/svgs/delete.svg";
import editIcon from "../../public/svgs/edit.svg";
import placeholderImage from "../../public/dashboard/placeholder-image.png";
import SocialShare from "../SocialShare";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { CustomInput } from "./modal/CustomInput";
import { FormControlButtons } from "./FormControlButtons";
import { simulateDelay } from "../SimulateDelay";
import LoadingAnimation from "../../components/svgs/LoadingAnimation";
import { buildLgImageUrl, buildMdImageUrl } from "@/utils/url-builders";

export const ActiveArtDisplay = () => {
  const [editMode, setEditMode] = useState(false);
  const [formSubmissionLoading, setFormSubmissionLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const validationSchema = yup.object().shape({ 
    source: yup.string().max(100, "Source must be no more than 100 characters long"),
    prompt: yup.string().max(200, "Prompt must be no more than 200 characters long"),
    description: yup.string().max(200, "Description must be no more than 200 characters long")
  });
  const {apiUserData, apiArtworkData, dashboardMainTabSubmissionData, setDashboardMainTabSubmissionData, setDisplayModal } = useDashboardContext();

  useEffect(() => {
    if (apiArtworkData && apiArtworkData.id && apiArtworkData.is_approved == true) {
      setImageUrl(buildMdImageUrl(apiArtworkData.id));
    }
    if (apiArtworkData && apiArtworkData.id) {
      setImageUrl(buildLgImageUrl(apiArtworkData.id, apiArtworkData.file_type) ?? placeholderImage);
    }
  }, [apiArtworkData]);
  

  return (
    <div>
      <div className="my-2 p-6 outline outline-1 rounded-3xl max-h-full max-w-full font-light">
        {apiUserData && apiArtworkData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-6">
            <div className="flex flex-col overflow-hidden gap-4">
              <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-grow ">
                <Image
                  src={imageUrl ?? placeholderImage}
                  alt="Your submitted image"
                  width={400}
                  height={400}
                  className="z-10 max-h-full max-w-full object-contain"
                />
                <Image
                  src={imageUrl ?? placeholderImage}
                  alt="Background"
                  width={400}
                  height={400}
                  className="absolute z-0 rounded-xl blur-3xl opacity-50"
                />
              </div>
              <div className="bg-main-orange flex rounded-[30px] w-[180px] p-2.5 gap-8 m-auto text-center h-auto flex-none">
                <p className="m-auto font-semibold">{apiArtworkData?.votes} Votes</p>
              </div>
            </div>
            <div className="flex flex-col pl-4 justify-between gap-4">
              <p className="text-xl font-semibold">{apiUserData?.f_name} {apiUserData?.l_name}</p>
              <div>
                <p>{apiArtworkData?.age} | {apiArtworkData?.location}</p>
                <p>{apiArtworkData.sport}</p>
              </div>
              {apiArtworkData.is_ai_gen && !editMode && (
                <div>
                  <p>* This image was created using AI</p>
                  <p>Source: {apiArtworkData.model}</p>
                  <p>AI Prompt: "{apiArtworkData.prompt}"</p>
                </div>
              )}
              {editMode && (
                <div className="relative grid">
                  {formSubmissionLoading && 
                  <div className="col-start-1 row-start-1">
                    <LoadingAnimation scale={100} stroke={2}/>
                  </div>}
                  <Formik
                    initialValues={dashboardMainTabSubmissionData}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      setFormSubmissionLoading(true);
                      setDashboardMainTabSubmissionData(prevState => ({
                        ...prevState,
                        source: values.source,
                        prompt: values.prompt,
                        description: values.description
                      }));
                      try {
                        // await apiPostCall(values);
                        // await apiGetCall();
                        await simulateDelay(1000);
                        console.log(dashboardMainTabSubmissionData);
                        setFormSubmissionLoading(false);
                        setEditMode(false);
                      } catch (error) {
                        console.error("Error during form submission:", error);
                        setFormSubmissionLoading(false);
                      }
                      console.log(dashboardMainTabSubmissionData);
                    }}>
                    <Form
                      className={`${formSubmissionLoading && "blur-sm opacity-80"} col-start-1 row-start-1`}
                    >
                      <CustomInput
                        label="AI Source"
                        name="source"
                        type="text"
                        placeholder="Type here..."
                      />
                      <CustomInput
                        label="AI Prompt"
                        name="prompt"
                        type="text"
                        placeholder="Type here..."
                      />
                      <CustomInput
                        label="Description"
                        name="description"
                        type="text"
                        placeholder="Type here..."
                      />
                      <FormControlButtons setEditMode={setEditMode}/>
                    </Form>
                  </Formik>
                </div>
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
            <a href="https://icaf.org/contact-us" className="text-blue-500">Contact Us</a>
          </div>
        )}
      </div>
      {apiUserData && apiArtworkData && 
      <div className="flex gap-4 justify-end">
        <button onClick={() => setEditMode(!editMode)}>
          <Image src={editIcon} alt={"Pencil icon: Click to edit artwork"} width={16} height={16}/>
        </button>
        <button onClick={() => setDisplayModal("deleteModal")}>
          <Image src={deleteIcon} alt={"Trash icon: Click to delete artwork"} width={16} height={16}/>
        </button>
      </div>
      }
      <div className="flex gap-2 py-3">
        <Image src={information} alt="info" width={16} height={16} />
        <p>Please upload as PNG or JPG, max size 3 MB.</p>
      </div>
    </div>
  );
};