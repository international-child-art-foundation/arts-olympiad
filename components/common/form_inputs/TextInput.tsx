import React from "react";
import {ErrorMessage, Field} from "formik";
import Image from "next/image";

interface IProps {
  className?: string
  labelText: string
  id: string
  placeholder?: string
  inputType?: string
  error: string | undefined
  touched: boolean | undefined
  value: string | undefined
  required?: boolean
}
export const TextInput = ({className, labelText, id, placeholder, inputType, error, touched, value, required = true}: IProps) => {

  return (
    <div className={`${className} my-1 flex flex-col`} >
      <label htmlFor={id}>{`${labelText}${required && error && touched ? "*" : "" }`}</label>
      <Field
        className={`
          my-2 p-3 border-1 rounded-lg 
          ${
    required && error && touched ? "border-accent-red placeholder:text-accent-red"  
      :
      required &&!error && touched && value ? "border-accent-green text-accent-green" 
        :
        "border-black"
    }

        `}
        placeholder={ placeholder || "Start typing here..."}
        type={inputType || "text" }
        id={id}
        name={id}
      />

      <div className="flex flex-row h-6">
        {
          required && error && touched &&
          <>
            <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
            <ErrorMessage className="block text-accent-red" name={id} component="div" />
          </>
        }

        {
          required &&!error && touched && value &&
          <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
        }
      </div>
    </div>
  );
};