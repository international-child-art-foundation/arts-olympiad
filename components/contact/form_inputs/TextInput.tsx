import React from "react";
import {ErrorMessage, Field} from "formik";
import Image from "next/image";

interface IProps {
  labelText: string
  id: string
  placeholder?: string
  inputType?: string
  error: string | undefined
  touched: boolean | undefined
  value: string | undefined
}
export const TextInput = ({labelText, id, placeholder, inputType, error, touched, value}: IProps) => {

  return (
    <div className="flex flex-row md:flex-col" >
      <label htmlFor={id}>{`${labelText}${error && touched ? "*" : "" }`}</label>
      <Field
        className={`my-2 p-3 border-1 rounded-lg ${error && touched ? "border-accent-red placeholder:text-accent-red"  : "border-black"}`}
        placeholder={ placeholder || "Start typing here..."}
        type={inputType || "text" }
        id={id}
        name={id}
      />
      {
        error && touched &&
        <div className="flex flex-row">
          <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
          <ErrorMessage className="block text-accent-red" name={id} component="div" />
        </div>
      }
      {
        !error && touched && value &&
        <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
      }
    </div>
  );
};