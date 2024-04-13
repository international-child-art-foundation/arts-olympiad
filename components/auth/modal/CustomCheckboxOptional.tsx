import { useField } from "formik";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomCheckboxOptionalProps {
  label: string;
  type : string;
  name: string;
}

export const CustomCheckboxOptional = ({label, ...props} : CustomCheckboxOptionalProps) => {
  const [field, meta] = useField(props);
  return(
    <>
      <div className="mt-6 text-sm mb-1 font-light text-neutral-black">{label}</div>
      <div className="flex">
        <input 
          {...field} 
          {...props} 
          className="w-6 h-6 rounded placeholder-[#403F4C] border pl-4 pr-4 pt-2 pb-2"
        />
        <span className="text-base mb-1 ml-2 font-light text-neutral-black">Yes, I used AI.</span>
      </div>
      {meta.value && meta.touched &&
      <div className="inline-flex mt-1">
        <CorrectIcon /> 
      </div>
      }
    </>
  );
};