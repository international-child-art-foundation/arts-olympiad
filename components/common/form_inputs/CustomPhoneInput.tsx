import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Field } from "formik";
import { InputLabel } from "./InputLabel";
import { ErrorSuccessPopUp } from "./ErrorSuccessPopUp";
import { FormikProps } from "formik";
import { UserRegisterInterface } from "@/interfaces/user_auth";

interface IProps {
  className?: string;
  labelText: string;
  id: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  value?: string;
  required?: boolean;
  setFieldValue: FormikProps<UserRegisterInterface>["setFieldValue"];
  setFieldTouched: FormikProps<UserRegisterInterface>["setFieldTouched"];
}

export const CustomPhoneInput = ({ className, labelText, id, placeholder, error, touched, value, setFieldValue, setFieldTouched, required = true }: IProps) => {
  console.log(error);
  console.log(touched);
  console.log(value);
  return (
    <div className={`${className} my-1 flex flex-col`}>
      <InputLabel
        className={`font-semibold ${
          required && error && touched ? "text-accent-red" :
            required && !error && touched && value ? "text-accent-green" : ""
        }`}
        labelText={labelText}
        htmlFor={id}
        error={error}
        touched={touched}
      />
      <Field
        as={PhoneInput}
        international
        countryCallingCodeEditable={true}
        className={`my-2 p-3 border-1 rounded-lg bg-white ${
          required && error && touched ? "border-accent-red placeholder:text-accent-red" :
            required && !error && touched && value ? "border-accent-green" :
              "border-black"
        }`}
        placeholder={placeholder || "Start typing here..."}
        id={id}
        name={id}
        value={value}
        onChange={(value: string) => {
          if (!touched) setFieldTouched(id);
          setFieldValue(id, value);
        }}
      />
      <ErrorSuccessPopUp required={required} id={id} error={error} touched={touched} value={value} />
    </div>
  );
};
