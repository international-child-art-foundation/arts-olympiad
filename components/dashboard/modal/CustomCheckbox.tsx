import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

interface CustomCheckboxProps {
  label: string;
  type : string;
  name: string;
  age?: number;
}

export const CustomCheckbox = ({label, age, ...props} : CustomCheckboxProps) => {
  const [field, meta] = useField(props);
  return(
    <>
      <div className="mt-6 text-base mb-1 font-light text-neutral-black">{label}</div>
      <div className="flex">
        <input 
          {...field} 
          {...props} 
          className="w-6 h-6 rounded placeholder-[#403F4C] border pl-4 pr-4 pt-2 pb-2"
        />
        {age && 
        (age < 14 ?         
          <span className="text-sm mb-1 ml-2 font-light text-neutral-black"><div className="ml-2 text-base font-light">I, the participant's parent or guardian, agree to ICAF's <a className="font-normal underline" target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Terms_of_Use.pdf">Terms of use</a> and <a className="font-normal underline" target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Privacy_Policy.pdf">Privacy Policy</a></div></span>
          :         
          <span className="text-sm mb-1 ml-2 font-light text-neutral-black"><div className="ml-2 text-base font-light">I agree to ICAF's <a className="font-normal underline" target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Terms_of_Use.pdf">Terms of use</a> and <a className="font-normal underline" target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Privacy_Policy.pdf">Privacy Policy</a></div></span>
        )
        }
      </div>
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