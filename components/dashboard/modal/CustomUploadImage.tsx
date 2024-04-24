import { useField } from "formik";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field } from "formik";
import { useEffect, useState } from "react";
import { Loader0 } from "../../../public/auth/modal/Loader0";
import { Loader9 } from "../../../public/auth/modal/Loader9";
import { Loader33 } from "../../../public/auth/modal/Loader33";
import { Loader63 } from "../../../public/auth/modal/Loader63";
import { Loader87 } from "../../../public/auth/modal/Loader87";
import { Loader100 } from "../../../public/auth/modal/Loader100";
import Image from "next/image";
import { useStepsContext } from "./StepsContext";

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
    const progressValues = [0, 9, 33, 63, 87, 100, 101];
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [validImage, setValidImage] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const { uploadFormData } = useStepsContext();
  useEffect(() => {
    if(uploadFormData.image){
      setImageFile(uploadFormData.image);
      setHasImage(true);   
      setValidImage(true);   
    }
  }, [uploadFormData.image]);


  let imageUrl: string | null = null;
  if (imageFile instanceof Blob) {
    imageUrl = URL.createObjectURL(imageFile);
  } else {
    console.error("uploadFormData.image is not a Blob or File.");
  }

  function validateFile(file: File | null): string | null {
    if (!file) {
      return "Oops! Unsupported file format. Please upload as PNG or JPG, max size 3 MB.";
    }
    const validTypes = ["image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      return "Please upload as PNG or JPG";
    }
  
    if (file.size > 3 * 1024 * 1024) { 
      return "Max size 3 MB.";
    }
    return null;
  }

  return(
    <>
      <label htmlFor="image" className={`w-full h-64 mb-6 rounded-lg pl-4 pr-4 pt-2 pb-2 flex flex-col items-center justify-center ${(validImage === true) ? "" : "border border-neutral-black"}`}>
        {((uploadProgress === -1 && validImage === false) || meta.error) &&
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
            const error = validateFile(file);
            if (!error) {
              helpers.setValue(file);  
              setImageFile(file);
              setValidImage(true);
              setHasImage(false);
              simulateUploadProgress();
            } else {
              helpers.setError(error);  
              setImageFile(null);
              setValidImage(false);
              setHasImage(false);
            }
          }}
        />
        <div className="flex w-full">
          <div className="w-full">
            <div className="flex justify-center">
              {validImage === true && uploadProgress === 0 && <Loader0 />}
              {validImage === true && uploadProgress === 9 && <Loader9 />}
              {validImage === true && uploadProgress === 33 && <Loader33 />}
              {validImage === true && uploadProgress === 63 && <Loader63 />}
              {validImage === true && uploadProgress === 87 && <Loader87 />}
              {validImage === true && uploadProgress === 100 && <Loader100 />}
            </div>
            {validImage === true && uploadProgress !== -1 && uploadProgress !== 100 && uploadProgress !== 101 && <p className="text-sm font-light mt-4 text-center">Your artwork is uploading...</p>}
            {validImage === true && uploadProgress === 100 && <p className="text-sm font-light mt-4 text-center">Your artwork is uploaded!</p>}
            {validImage === true && uploadProgress === 101 && 
              <div className="w-3/4 mx-auto">
                {imageUrl && 
                  <Image
                    src={imageUrl}
                    alt=""
                    width={800} 
                    height={600}
                    layout="responsive"
                    className="rounded-xl"
                  />
                }
              </div>
            }
            {hasImage === true && 
              <div className="w-3/4 mx-auto">
                {imageUrl && 
                <Image
                  src={imageUrl}
                  alt=""
                  width={800} 
                  height={600}
                  layout="responsive"
                  className="rounded-xl"
                />
                }
              </div>
            }
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