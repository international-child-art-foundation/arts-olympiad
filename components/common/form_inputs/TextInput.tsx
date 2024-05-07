import React from "react";
import { Field } from "formik";
import { InputLabel } from "./InputLabel";
import { ErrorSuccessPopUp } from "./ErrorSuccessPopUp";

interface IProps {
  className?: string;
  labelText: string;
  id: string;
  placeholder?: string;
  inputType?: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: string | undefined;
  required?: boolean;
}
export const TextInput = ({
  className,
  labelText,
  id,
  placeholder,
  inputType,
  error,
  touched,
  value,
  required = true,
}: IProps) => {
  // test change to format staged file
  return (
    <div className={`${className} my-1 flex flex-col`}>
      <InputLabel
        className={`font-semibold ${
          required && error && touched
            ? "text-accent-red"
            : required && !error && touched && value
              ? "text-accent-green"
              : ""
        }`}
        labelText={labelText}
        htmlFor={id}
        error={error}
        touched={touched}
      />
      <Field
        className={`
          my-2 p-3 border-1 rounded-lg 
          ${
            required && error && touched
              ? "border-accent-red placeholder:text-accent-red"
              : required && !error && touched && value
                ? "border-accent-green"
                : "border-black"
          }

        `}
        placeholder={placeholder || "Start typing here..."}
        type={inputType || "text"}
        id={id}
        name={id}
      ></Field>

      <ErrorSuccessPopUp
        required={required}
        id={id}
        error={error}
        touched={touched}
        value={value}
      />
    </div>
  );
};
