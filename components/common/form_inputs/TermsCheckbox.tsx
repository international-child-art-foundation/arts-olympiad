import React from "react";
import { Field } from "formik";
import { ErrorSuccessPopUp } from "./ErrorSuccessPopUp";

interface IProps {
  className?: string;
  id: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: boolean | undefined;
  required?: boolean;
  over18: boolean;
}

export const TermsCheckbox = ({
  className,
  id,
  error,
  touched,
  value,
  required = true,
  over18,
}: IProps) => {
  const labelClass = `font-semibold ${
    required && error && touched
      ? "text-accent-red"
      : required && !error && touched && value
        ? ""
        : ""
  }`;

  const linkClass = "text-blue-600 hover:underline cursor-pointer visited:text-purple-600";

  return (
    <div className="my-4">
      <div className={`${className} my-1 flex items-start`}>
        <Field
          className={`mr-2 h-6 w-6 mt-1 ${
            required && error && touched
              ? "border-accent-red"
              : required && !error && touched && value
                ? "border-accent-green"
                : "border-black"
          }`}
          type="checkbox"
          id={id}
          name={id}
        />
        <div className={labelClass}>
          {over18 ? (
            <>
              I agree to the{" "}
              <a className={linkClass} target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/ICAF.website.-.Terms.of.Use.pdf" onClick={(e) => e.stopPropagation()}>
                Terms of Use
              </a>{" "}
              and{" "}
              <a className={linkClass} target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/ICAF.website.-.Privacy.Policy.pdf" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>
            </>
          ) : (
            <>
              As the parent or guardian of this user, I agree to the{" "}
              <a className={linkClass} target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/ICAF.website.-.Terms.of.Use.pdf" onClick={(e) => e.stopPropagation()}>
                Terms of Use
              </a>{" "}
              and{" "}
              <a className={linkClass} target="_blank" rel="noopener noreferrer" href="https://icaf.org/resource/documents/ICAF.website.-.Privacy.Policy.pdf" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>
            </>
          )}
        </div>

      </div>
      <ErrorSuccessPopUp
        required={required}
        id={id}
        error={error}
        touched={touched}
      />
    </div>
  );
};