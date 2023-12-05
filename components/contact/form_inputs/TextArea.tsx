import React from "react";
import {ErrorMessage, Field} from "formik";
import Image from "next/image";

interface IProps {
  labelText: string
  id: string
  placeholder?: string
  error: string | undefined
  touched: boolean | undefined
  value: string | undefined
  required?: boolean
}
export const TextArea = ({labelText, id, placeholder, error, touched, value, required = true}: IProps) => {

  return (
    <div className="col-span-2 row-span-2 flex flex-row md:flex-col" >
      <label htmlFor={id}>{`${labelText}${required && error && touched ? "*" : "" }`}</label>
      <Field
        style={{resize: "none"}}
        className={`w-full h-full my-2 p-3 border-1 rounded-lg ${required && error && touched ? "border-accent-red placeholder:text-accent-red"  : "border-black"}`}
        placeholder={ placeholder || "Start typing here..."}
        as="textarea"
        type="text"
        id={id}
        name={id}
      />
      {
        required && error && touched &&
        <div className="flex flex-row">
          <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
          <ErrorMessage className="block text-accent-red" name={id} component="div" />
        </div>
      }
      {
        required &&!error && touched && value &&
        <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
      }
    </div>
  );
};