import React, {useEffect, useState} from "react";
import {ErrorSuccessPopUp} from "./ErrorSuccessPopUp";
import zxcvbn from "zxcvbn";
import Image from "next/image";
import {PasswordRequirement} from "./PasswordRequirement";

interface IProps {
  required: boolean
  error: string | undefined
  touched: boolean | undefined
  value: string
  className?: string
  id: string
}

type ScoresDictionary = {
  [key: number]: string;
};

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
  const passwordStrength = zxcvbn(value);
  const scores: ScoresDictionary = {
    0: "Weakest",
    1: "Weak",
    2: "Average",
    3: "Good",
    4: "Strong",
  };

  const scoreColors: ScoresDictionary = {
    0: "#F72214", // Weakest
    1: "#FF5733", // Weak
    2: "#FFA500", // Average
    3: "#4CAF50", // Good
    4: "#158737", // Strong
  };

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

      {showScore && (
        <div className="flex flex-row" role="region" aria-live="assertive" aria-atomic="true">
          {!error && touched && 
          <>
            <Image style={{color: scoreColors[passwordStrength.score]}} className="self-center" src="/auth/check.svg" alt="" width={20} height={20} />
          
            <p aria-live="assertive" aria-atomic="true" style={{color: scoreColors[passwordStrength.score]}}>
            Password Strength: {scores[passwordStrength.score]}
              <span className="sr-only">.</span>
            </p>
          </>
          }
        </div>
      )}

    </>
  );
};