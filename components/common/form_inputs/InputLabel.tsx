import {HTMLProps} from "react";

interface IProps extends HTMLProps<HTMLLabelElement>{
  labelText: string
  htmlFor: string
  error: string | undefined
  touched: boolean | undefined
  required?: boolean
}

export const InputLabel = ({htmlFor, labelText, required, error, touched, ...restProps}: IProps) => {
  return (
    <label
      {...restProps}
      htmlFor={htmlFor}
    >
      {labelText}
      {required && error && touched ? <span aria-hidden="true">*</span> : null}
      <span className="sr-only">.</span>
    </label>
  );
};