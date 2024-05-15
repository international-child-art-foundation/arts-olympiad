import React from "react";
import { Field } from "formik";
import {InputLabel} from "./InputLabel";
import {ErrorSuccessPopUp} from "./ErrorSuccessPopUp";

interface IProps {
  className?: string
  labelText: string
  id: string
  placeholder?: string
  inputType?: string
  error: string | undefined
  autoComplete?: string | undefined;
  touched: boolean | undefined
  value: string | undefined
  required?: boolean
}
export const TextInput = ({className, labelText, id, placeholder, inputType, error, autoComplete, touched, value, required = true}: IProps) => {

  return (
    <div className={`${className} my-1 flex flex-col`} >
      <InputLabel
        className={`font-semibold ${
          required && error && touched ? "text-accent-red"
            :
            required &&!error && touched && value ?  "text-accent-green"
              :
              ""
        }`}
        labelText={labelText} htmlFor={id} error={error} touched={touched}
      />
      <Field
        className={`
          my-2 p-3 border-1 rounded-lg 
          ${
    required && error && touched ? "border-accent-red placeholder:text-accent-red"  
      :
      required &&!error && touched && value ? "border-accent-green" 
        :
        "border-black"
    }

        `}
        placeholder={ placeholder || "Start typing here..."}
        type={inputType || "text" }
        id={id}
        name={id}
        autoComplete={autoComplete}
      >
      </Field>

      <ErrorSuccessPopUp required={required} id={id} error={error} touched={touched} value={value} />
    </div>
  );
};