import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
}


export const CustomInput = ({label, ...props} : CustomInputProps) => {
  const [field, meta] = useField(props);
  // console.log(field);
  return(
    <>
      <label className={`mt-6 text-sm mb-1 ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>{label}</label>
      <input 
        {...field} 
        {...props} 
        className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${meta.error && meta.touched ? "border-[#C4384E]" : !meta.error && meta.touched ? "border-[#158737]": "border-neutral-black"}`}
      />
      {meta.error && meta.touched &&
      <div className="inline-flex mt-1">
        <HintIcon /> 
        <p className="text-xs font-normal text-[#C4384E] ml-2">{meta.error}</p>
      </div>
      }
      {!meta.error && meta.touched &&
      <div className="inline-flex mt-1">
        <CorrectIcon /> 
      </div>
      }
    </>
  );
};