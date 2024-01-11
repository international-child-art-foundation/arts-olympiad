import {Field} from "formik";
import React from "react";

interface IProps {
  name: string
  value: string
}
export const CheckBox = ({name, value}: IProps) => {
  return (
    <div className="my-2">
      <label className="cursor-pointer">
        <Field className="cursor-pointer" type="checkbox" name={name} value={value} />
        {" " + value}
        <span className="sr-only">.</span>
      </label>
    </div>
  );
};