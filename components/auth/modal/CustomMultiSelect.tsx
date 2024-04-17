import Select from "react-select";
// import { useField, useFormikContext } from "formik";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";
import { StylesConfig } from "react-select";
import { useField } from "formik";

interface Option {
  label: string;
  value: string;
}

interface CustomMultiSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

export const CustomMultiSelect = ({ label, options, placeholder, ...props }: CustomMultiSelectProps) => {
  const [field, meta, helpers ] = useField(props);

  const customStyles: StylesConfig = {
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

  return (
    <div>
      <label htmlFor={props.name} className={`text-sm mb-1 ${meta.error && meta.touched ? "text-[#C4384E] font-semibold" : !meta.error && meta.touched ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>
        {label}
      </label>
      <Select
        {...field}
        {...props}

        options={options}
        isMulti
        onChange={(newValue) => {
          const selectedOptions = newValue as Option[];
          helpers.setValue(selectedOptions ? selectedOptions.map(option => option.value) : []);
        }}
        onBlur={() => helpers.setTouched(true)}
        value={options.filter(option => field.value?.includes(option.value))}
        styles={customStyles}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={placeholder}
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
    </div>
  );
};