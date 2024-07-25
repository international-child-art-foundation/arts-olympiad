import React, {useEffect, useState} from "react";
import {ErrorSuccessPopUp} from "./ErrorSuccessPopUp";
import {PasswordRequirement} from "./PasswordRequirement";

interface IProps {
  required: boolean
  error: string | undefined
  touched: boolean | undefined
  value: string
  className?: string
  id: string
}

export const DynamicPasswordGuidelines = ({
  required,
  error,
  touched,
  value,
  id
}: IProps) => {

  const [showScore, setShowScore] = useState(false);

  const hasMinLength = value && value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value || "");
  const hasLowerCase = /[a-z]/.test(value || "");
  const hasNumber = /\d/.test(value || "");
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value || "");

  useEffect(() => {
    if (hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      setShowScore(true);
    } else {
      setShowScore(false);
    }
  }, [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]);

  return (
    <>
      {required && error && touched && (
        <ErrorSuccessPopUp id={id} error={error} touched={touched} value={value} required={required} />
      )}

      {required && value && !showScore && (
        <div className="flex flex-col" role="region" aria-live="assertive" aria-atomic="true">

          <h3 className="font-semibold">Your password must contain:</h3>

          <PasswordRequirement
            isValid={hasMinLength as boolean}
            id={id}
            text="Minimum of 8 characters"
          />

          <PasswordRequirement
            isValid={hasUpperCase}
            id={id}
            text="One uppercase letter"
          />

          <PasswordRequirement
            isValid={hasLowerCase}
            id={id}
            text="One lowercase letter"
          />

          <PasswordRequirement
            isValid={hasNumber}
            id={id}
            text="One number"
          />

          <PasswordRequirement
            isValid={hasSpecialChar}
            id={id}
            text="One special character"
          />
        </div>
      )}

    </>
  );
};