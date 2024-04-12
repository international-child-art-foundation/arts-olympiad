import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field } from "formik";

interface CustomUploadImageProps {
  label: string;
  name: string;
  type: string;
}

export const CustomUploadImage = ({label, ...props} : CustomUploadImageProps) => {
  const [field, meta] = useField(props);
  return(
    <>
      <label htmlFor="image" className="w-full h-64 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-6 text-md font-light text-neutral-black">{label}</p>
          <div className="mb-6 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white">
            <UploadIcon />
            <span className="ml-4">Upload Artwork</span>
          </div>
          <p className="text-sm font-light text-neutral-black">PNG or JPG</p>
        </div>
        <Field 
          {...field} 
          {...props} 
          id="image" 
          type="file" 
          name= "image"
          accept="image/*"
          onChange={(event) => {
            setFieldValue("image", event.currentTarget.files[0]);
          }}
          // onBlur={handleBlur}
          onBlur={field.onBlur}
          // value={undefined}
          className="hidden" 
        />
      </label>
      {meta.error &&
        <div className="inline-flex mt-1 bg-[#FBF4F3] w-full rounded border-l-8 border-[#EE2F4D]"> 
          <p className="my-5 mx-10 text-base font-normal text-[#C4384E] ml-2">{meta.error}</p>
        </div>
      }
    </>
  );
};