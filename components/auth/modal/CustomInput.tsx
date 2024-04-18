import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  colStart?: string;
  colSpan?: string;
}


export const CustomInput = ({label, ...props} : CustomInputProps) => {
  const [field, meta] = useField(props);
  return(
    <div className={`grid mt-6 ${props.colSpan || props.colStart ? `${props.colSpan ? props.colSpan : ""} ${props.colStart ? props.colStart : ""}` : ""}`}>
      <label className={`text-sm mb-1 ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched && meta.value ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>{label}</label>
      <input 
        {...field} 
        {...props} 
        className={`w-full placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${meta.error && meta.touched ? "border-[#C4384E]" : !meta.error && meta.touched && meta.value ? "border-[#158737]": "border-neutral-black"}`}
      />
      {meta.error && meta.touched &&
      <div className="inline-flex mt-1">
        <HintIcon /> 
        <p className="text-xs font-normal text-[#C4384E] ml-2">{meta.error}</p>
      </div>
      }
      {!meta.error && meta.touched && meta.value && 
      <div className="inline-flex mt-1">
        <CorrectIcon /> 
      </div>
      }
    </div>
  );
};