import React from "react";
import { Field } from "formik";
import { ErrorSuccessPopUp } from "../common/form_inputs/ErrorSuccessPopUp";
import { useEffect } from "react";

interface RegisterDateOfBirthProps {
  name: string;
  errors: {
    day?: string | undefined;
    month?: string | undefined;
    year?: string | undefined;
  };
  touched: {
    day?: boolean | undefined;
    month?: boolean | undefined;
    year?: boolean | undefined;
  };
  values: {
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;
  };
}


const RegisterDateOfBirth: React.FC<RegisterDateOfBirthProps> = ({
  name,
  errors,
  touched,
  values
}) => {
  const fieldClassName = (fieldName: "day" | "month" | "year") => `
    w-full my-2 p-3 border-1 rounded-lg
    ${
  touched[fieldName] && errors[fieldName]
    ? "border-accent-red placeholder:text-accent-red"
    : touched[fieldName] && !errors[fieldName] && values[fieldName]
      ? "border-accent-green"
      : "border-black"
}
  `;

  useEffect(() => {

    console.log(errors);
    console.log(touched);
    console.log(values);
  }, [errors, touched, values]);

  const labelClass = () => {
    const errorExists = Object.values(errors).some(error => error);
    const allTouched = Object.values(touched).every(t => t);
    const allValid = allTouched && !errorExists;
  
    if (allValid) {
      return "text-accent-green";
    } else if (errorExists) {
      return "text-accent-red";
    } else {
      return "text-black";
    }
  };
  

  return (
    <div>
      <label className={`font-semibold ${labelClass()}`}>Date of Birth</label>
      <div className="mt-1 flex space-x-3">
        <Field
          type="number"
          name={`${name}.month`}
          placeholder="MM"
          value={values.month || ""}
          className={fieldClassName("month")}
        />
        <Field
          type="number"
          name={`${name}.day`}
          placeholder="DD"
          value={values.day || ""}
          className={fieldClassName("day")}
        />
        <Field
          type="number"
          name={`${name}.year`}
          placeholder="YYYY"
          value={values.year || ""}
          className={fieldClassName("year")}
        />
      </div>
      <ErrorSuccessPopUp
        id={`${name}.day`}
        required={true}
        error={errors.day}
        touched={touched.day}
      />
      <ErrorSuccessPopUp
        id={`${name}.month`}
        required={true}
        error={errors.month}
        touched={touched.month}
      />
      <ErrorSuccessPopUp
        id={`${name}.year`}
        required={true}
        error={errors.year}
        touched={touched.year}
      />

      {
        typeof errors === "string" && touched && (
          <ErrorSuccessPopUp
            id={`${name}`}
            required={true}
            error={errors}
            touched={true}
          />
        )
      }
    </div>
  );
};

export default RegisterDateOfBirth;
