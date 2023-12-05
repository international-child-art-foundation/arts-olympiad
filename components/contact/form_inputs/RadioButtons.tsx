import React from "react";
import {ErrorMessage, Field, FormikErrors} from "formik";
import Image from "next/image";
import {IContactFormValues, Query} from "../ContactForm";

interface IProps {
  labelText: string
  id: string
  error: string | undefined
  value: Query
  required?: boolean
  setFieldValue:  (field: string, value: string, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<IContactFormValues>>
}
export const RadioButtons = ({labelText, id, error, value, required = true}: IProps) => {

  return (
    <div className="col-span-2 row-span-2 flex flex-row md:flex-col" >
      <label htmlFor="radioContainer">{labelText}</label>
      <div id="radioContainer" className="col-span-2 row-span-2 flex flex-row md:flex-col">

        <div>
          <label>
            <Field type="radio" name="query" value="Issue submitting artwork" />
            Issue submitting artwork
          </label>
        </div>

        <div>
          <label>
            <Field type="radio" name="query" value="option1" />
            Option 1
          </label>
        </div>

      </div>
      {
        required && error &&
        <div className="flex flex-row">
          <Image src="/contact/bx_error-circle.svg" alt="" width={20} height={20} />
          <ErrorMessage className="block text-accent-red" name={id} component="div" />
        </div>
      }
      {
        required &&!error && value &&
        <Image src="/contact/bx_check-circle.svg" alt="" width={20} height={20} />
      }
    </div>
  );
};