import React from "react";
import {FormikErrors} from "formik";
import Image from "next/image";
import {IContactFormValues, Query} from "../../contact/ContactForm";
import {Pm} from "../texts/Pm";

interface IProps {
  children: React.ReactNode
  labelText: string
  id: string
  error: string | undefined
  value: Query
  required?: boolean
  touched: boolean | undefined
  setFieldValue:  (field: string, value: string, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<IContactFormValues>>
}
export const RadioButtonsContainer = ({labelText, touched , id, error, value, required = true, children}: IProps) => {

  return (
    <div className="my-1 col-span-2 row-span-2 flex flex-col" >
      <label className="mb-2" htmlFor="radioContainer">{labelText}</label>
      <div id="radioContainer" className="col-span-2 row-span-2 grid md:grid-cols-2 grid-cols-1">
        {children}
      </div>

      <div className="flex flex-row h-6 items-center ">
        {
          required && error && touched &&
          <>
            <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
            <Pm className="lg:text-base xl:text-base block text-accent-red" name={id}>Choice is required</Pm>
          </>
        }

        {
          required &&!error && value &&
          <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
        }
      </div>
    </div>
  );
};