import React, {useEffect, useState} from "react";
import {ErrorSuccessPopUp} from "./ErrorSuccessPopUp";
import zxcvbn from "zxcvbn";
import Image from "next/image";

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
      {required && error && touched && error === "Password is required" && (
        <ErrorSuccessPopUp id={id} error={error} touched={touched} value={value} required={required} />
      )}

      {required && value && !showScore && (
        <div className="flex flex-col">

          <p className="font-semibold">Your password must contain:</p>

          <p className={hasMinLength ? "text-accent-green" : "text-accent-red"}>
            Minimum of 8 characters
          </p>

          <p className={hasUpperCase ? "text-accent-green" : "text-accent-red"}>
            One uppercase letter
          </p>

          <p className={hasLowerCase ? "text-accent-green" : "text-accent-red"}>
            One lowercase letter
          </p>

          <p className={hasNumber ? "text-accent-green" : "text-accent-red"}>
            One number
          </p>

          <p
            className={hasSpecialChar ? "text-accent-green" : "text-accent-red"}
          >
            One special character
          </p>
        </div>
      )}

      {showScore && (
        <div className="flex flex-row">
          <Image style={{color: scoreColors[passwordStrength.score]}} className="self-center" src="/auth/check.svg" alt="" width={20} height={20} />
          <p style={{color: scoreColors[passwordStrength.score]}}>
          Password Strength: {scores[passwordStrength.score]}
          </p>
        </div>
      )}

    </>
  );
};