import { useField } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";
import Select from "react-select";
import { StylesConfig } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSingleSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

export const CustomSingleSelect = ({ label, options, placeholder, ...props } : CustomSingleSelectProps) => {
  const [field, meta, helpers] = useField(props);

  const customStyles: StylesConfig<Option, false> = {
    control: (styles) => ({
      ...styles,
      border: "1px solid #1F1F23", 
      boxShadow: "none", 
      "&:hover": {
        borderColor: "#1F1F23", 
      },  
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#495057"
    }),
    container: (provided) => ({
      ...provided,
      width: "100%", 
      color: "#495057"
    }),
    menu: (provided) => ({
      ...provided,
    }),
  };

  return(
    <>
      <label htmlFor={props.name} className={`text-sm mb-1 ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>{label}</label>
      <Select
        {...field}
        {...props}
        options={options}
        placeholder={placeholder}
        styles={customStyles} 
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOption: Option | null) => {
          helpers.setValue(selectedOption ? selectedOption.value : "");
        }}
        onBlur={() => helpers.setTouched(true)}
        value={options.find((option: Option) => option.value === field.value)}
        // value={options ? options.find(option => option.value === field.value) : ""}
      />
      {meta.error &&
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