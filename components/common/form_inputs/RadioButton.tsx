import {Field} from "formik";
import React from "react";

interface IProps {
  name: string
  value: string
}
export const RadioButton = ({name, value}: IProps) => {
  return (
    <div className="my-2">
      <label>
        <Field type="radio" name={name} value={value} />
        {" " + value}
        <span className="sr-only">.</span>
      </label>
    </div>
  );
};