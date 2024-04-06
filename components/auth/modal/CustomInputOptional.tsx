import { useField } from "formik";

interface CustomInputOptionalProps {
  label: string;
  sentence?: string;
  type : string;
  name : string;
}

export const CustomInputOptional = ({label, ...props} : CustomInputOptionalProps) => {
  const [field] = useField(props);
  return(
    <>
      <label className="mt-6 text-sm mb-1 font-light text-neutral-black">{label}</label>
      <input 
        {...field} 
        {...props} 
        className="border-neutral-black placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2"
      />
    </>
  );
};