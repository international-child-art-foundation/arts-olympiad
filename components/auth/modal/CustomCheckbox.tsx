import { useField } from "formik";

export const CustomCheckbox = ({label, sentence, ...props}) => {
  const [field] = useField(props);
  return(
    <>
      <div className="mt-6 text-base mb-1 font-light text-neutral-black">{label}</div>
      <div className="flex">
        <input 
          {...field} 
          {...props} 
          className="w-6 h-6 rounded placeholder-[#403F4C] border pl-4 pr-4 pt-2 pb-2"
        />
        <span className="text-sm mb-1 ml-2 font-light text-neutral-black">{sentence}</span>
      </div>
      
    </>
  );
};