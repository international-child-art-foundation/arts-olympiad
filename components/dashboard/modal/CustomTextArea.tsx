import { useField } from "formik";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomTextAreaProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

export const CustomTextArea = ({label, ...props} : CustomTextAreaProps) => {
  const [field, meta] = useField(props);
  return(
    <>
      <label className="mt-6 text-sm font-light text-neutral-black">{label}</label>
      <textarea 
        {...field} 
        {...props} 
        className="w-full h-36 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2"
      />
      {meta.value && meta.touched &&
      <div className="inline-flex mt-1">
        <CorrectIcon /> 
      </div>
      }
    </>
  );
};