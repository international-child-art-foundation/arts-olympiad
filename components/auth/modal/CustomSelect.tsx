import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

export const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return(
    <>
      <label className={`mt-6 text-sm mb-1 ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>{label}</label>
      <select 
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