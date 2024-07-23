import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomTextAreaProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

export const CustomTextArea = ({ label, ...props }: CustomTextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="mt-6 mb-2">
      <label className={`text-sm ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched && meta.value ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>
        {label}
      </label>
      <textarea 
        {...field} 
        {...props} 
        name={props.name}
        className={`w-full h-36 border rounded pl-4 pr-4 pt-2 pb-2 ${meta.error && meta.touched ? "border-[#C4384E]" : "border-neutral-black"}`}
        placeholder={props.placeholder}
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
