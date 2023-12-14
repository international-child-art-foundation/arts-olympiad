import Image from "next/image";
import {ErrorMessage} from "formik";
import React from "react";

interface IProps {
  className?: string
  id: string
  error: string | undefined
  touched: boolean | undefined
  value: string | undefined
  required: boolean
}

export const ErrorSuccessPopUp = ({required, error, touched, value, id, className}: IProps) => {
  return (
    <div className={`${className} flex flex-row h-6`}>
      {
        required && error && touched &&
        <div className="flex flex-row" aria-label="Error.">
          <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
          <ErrorMessage className="block text-accent-red" name={id} component="div" />
          <span className="sr-only">.</span>
        </div>
      }

      {
        required &&!error && touched && value &&
        <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
      }
    </div>
  );
};