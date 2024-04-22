import { useField } from "formik";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field } from "formik";
import { useState } from "react";
import { Loader0 } from "../../../public/auth/modal/Loader0";
import { Loader9 } from "../../../public/auth/modal/Loader9";
import { Loader33 } from "../../../public/auth/modal/Loader33";
import { Loader63 } from "../../../public/auth/modal/Loader63";
import { Loader87 } from "../../../public/auth/modal/Loader87";
import { Loader100 } from "../../../public/auth/modal/Loader100";

interface CustomUploadImageProps {
  label: string;
  name: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

export const CustomUploadImage = ({label, ...props} : CustomUploadImageProps) => {
  const [field, meta, helpers] = useField(props);
  const [uploadProgress, setUploadProgress] = useState(-1);

  const simulateUploadProgress = () => {
    const progressValues = [0, 9, 33, 63, 87, 100];
    let currentProgressIndex = 0;

    const updateProgress = () => {
      setUploadProgress(progressValues[currentProgressIndex]);
      currentProgressIndex++;

      if (currentProgressIndex < progressValues.length) {
        setTimeout(updateProgress, 500); 
      }
    };

    updateProgress();
  };

  return(
    <>
      <label htmlFor="image" className="w-full h-64 mb-6 border border-neutral-black rounded-lg pl-4 pr-4 pt-2 pb-2 flex flex-col items-center justify-center">
        {uploadProgress === -1 &&        
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-6 text-md font-light text-neutral-black">{label}</p>
          <div className="mb-6 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white">
            <UploadIcon />
            <span className="ml-4">Upload Artwork</span>
          </div>
          <p className="text-sm font-light text-neutral-black">PNG or JPG</p>
        </div>}
        <Field 
          {...field} 
          {...props} 
          id="image" 
          type="file" 
          name= "image"
          accept="image/*"
          value={undefined}
          className="hidden" 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files && event.currentTarget.files[0];
            if (file) {
              helpers.setValue(file);
              if(!meta.error){
                simulateUploadProgress();
              }
            };
          }}
        />
        <div className="flex ">
          <div className="w-full m-auto">
            {uploadProgress === 0 && <Loader0 />}
            {uploadProgress === 9 && <Loader9 />}
            {uploadProgress === 33 && <Loader33 />}
            {uploadProgress === 63 && <Loader63 />}
            {uploadProgress === 87 && <Loader87 />}
            {uploadProgress === 100 && <Loader100 />}
            {uploadProgress !== -1 && uploadProgress !== 100 && <p className="text-sm font-light mt-4">Your artwork is uploading...</p>}
            {uploadProgress === 100 && <p className="text-sm font-light mt-4">Your artwork is uploaded!</p>}
          </div>
        </div>
      </label>
      {meta.error &&
        <div className="inline-flex mt-1 bg-[#FBF4F3] w-full rounded border-l-8 border-[#EE2F4D]"> 
          <p className="my-5 mx-10 text-base font-normal text-[#C4384E] ml-2">{meta.error}</p>
        </div>
      }
    </>
  );
};