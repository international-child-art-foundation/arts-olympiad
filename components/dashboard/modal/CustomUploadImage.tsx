import { useField } from "formik";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStepsContext } from "./StepsContext";
import LoadingAnimation from "../../../components/svgs/LoadingAnimation";

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
      <label htmlFor="image" className="w-full aspect-video mb-6 rounded-lg flex flex-col items-center justify-center border border-neutral-black">
        {((uploadProgress === -1 && validImage === false) || meta.error) &&
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-6 text-md font-light text-neutral-black">{label}</p>
          <div className="mb-6 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white">
            <UploadIcon />
            <span className="ml-4">Upload Artwork</span>
          </div>
          <p className="text-sm font-light text-neutral-black">PNG or JPG</p>
        </div>}
        {/* <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${((uploadProgress === -1 && validImage === false) || meta.error) ? "opacity-100" : ""}`}>
          <p className="mb-6 text-md font-light text-neutral-black">{label}</p>
          <div className="mb-6 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white">
            <UploadIcon />
            <span className="ml-4">Upload Artwork</span>
          </div>
          <p className="text-sm font-light text-neutral-black">PNG or JPG</p>
        </div> */}
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
            } 
            else if (error === "Oops! Unsupported file format. Please upload as PNG or JPG, max size 3 MB."){
              return;
            }
            else {
              helpers.setError(error);  
              setImageFile(null);
              setValidImage(false);
              setHasImage(false);
            }
          }}
        />

        {validImage === true && uploadProgress <= 100 && uploadProgress !== -1 &&
          <div className="relative ">
            <LoadingAnimation scale={100} stroke={2}/>
            <p className="absolute w-full py-20 bottom-0 inset-x-0 flex items-center justify-center text-new-blue text-2xl font-normal">{uploadProgress}%</p>
          </div>
        }
        {validImage === true && uploadProgress !== -1 && uploadProgress !== 100 && uploadProgress !== 101 && <p className="text-sm font-light mt-4 text-center">Your artwork is uploading...</p>}
        {validImage === true && uploadProgress === 100 && <p className="text-sm font-light mt-4 text-center">Your artwork is uploaded!</p>}
        {validImage === true && uploadProgress === 101 && 
          <div className="relative group w-full h-full overflow-hidden rounded-lg">
            <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit w-fit rounded text-center py-4 px-6 2xl:px-4 text-base font-normal bg-new-blue text-neutral-white z-50">
              <UploadIcon />
              <span className="ml-4">Replace Artwork</span>
            </div>
            {imageUrl && 
              <Image
                src={imageUrl}
                alt=""
                width={800} 
                height={600}
                layout="responsive"
                className="object-contain rounded-lg group-hover:opacity-50"
              />
            }
          </div>
        }
        {hasImage === true && 
          <div className="relative group w-full h-full overflow-hidden rounded-lg">
            <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white z-50">
              <UploadIcon />
              <span className="ml-2">Replace Artwork</span>
            </div>
            {imageUrl && 
            <Image
              src={imageUrl}
              alt=""
              width={800} 
              height={600}
              layout="responsive"
              className="object-contain rounded-lg group-hover:opacity-50"
            />
            }
          </div>
        }
      </label>
      {meta.error &&
        <div className="inline-flex mt-1 bg-[#FBF4F3] w-full rounded border-l-8 border-[#EE2F4D]"> 
          <p className="my-5 mx-10 text-base font-normal text-[#C4384E] ml-2">{meta.error}</p>
        </div>
      }
    </>
  );
};