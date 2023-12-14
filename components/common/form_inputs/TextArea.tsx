import React from "react";
import {Field} from "formik";
import {InputLabel} from "./InputLabel";
import {ErrorSuccessPopUp} from "./ErrorSuccessPopUp";

interface IProps {
  className?: string
  labelText: string
  id: string
  placeholder?: string
  error: string | undefined
  touched: boolean | undefined
  value: string | undefined
  required?: boolean
}
export const TextArea = ({className, labelText, id, placeholder, error, touched, value, required = true}: IProps) => {

  return (
    <div className={`${className} flex flex-col`} >
      <InputLabel labelText={labelText} htmlFor={id} error={error} touched={touched} />
      <Field
        style={{resize: "none"}}
        className={`w-full h-full my-2 p-3 border-1 rounded-lg ${required && error && touched ? "border-accent-red placeholder:text-accent-red"  : "border-black"}`}
        placeholder={ placeholder  || "Start typing here..."}
        as="textarea"
        type="text"
        id={id}
        name={id}
      />

      <ErrorSuccessPopUp required={required} id={id} error={error} touched={touched} value={value} />
    </div>
  );
};