import React from "react";
import { Field} from "formik";
import {InputLabel} from "./InputLabel";
import {DynamicPasswordGuidelines} from "./DynamicPasswordGuidelines";

interface IProps {
  className?: string
  labelText: string
  id: string
  placeholder?: string
  inputType?: string
  error: string | undefined
  touched: boolean | undefined
  value: string
  required?: boolean
}
export const NewPasswordInput = ({className, labelText, id, placeholder, inputType, error, touched, value, required = true}: IProps) => {

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
        autoComplete="new-password"
      >
      </Field>

      <DynamicPasswordGuidelines required={required} error={error} touched={touched} value={value} id={id} />
    </div>
  );
};