import React, { useState } from "react";
import { H2m } from "../common/texts/H2m";
import { Pm } from "../common/texts/Pm";
import { Form, Formik } from "formik";
import { TextInput } from "../common/form_inputs/TextInput";
import { ButtonStd } from "../common/ui/ButtonStd";
import * as Yup from "yup";
import { TFormStatus } from "./ResetPassword";
import { emailValidation } from "@/utils/yup-validators";

interface IProps {
  formStatus: TFormStatus;
  onSendResetCode: (email: string) => void;
  onCodeVerified: (code: string) => void;
  email: string;
  isLoading: boolean;
}

interface IResetCodeFormValues {
  email: string;
  code: string;
}

const validationSchema = Yup.object().shape({
  ...emailValidation,
  code: Yup.string().length(6, "Code must be 6 characters long")
});

export const SendResetCodeForm = ({ onSendResetCode, onCodeVerified, email, isLoading }: IProps) => {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const initialValues: IResetCodeFormValues = {
    email: email,
    code: "",
  };

  const onSubmit = (values: IResetCodeFormValues) => {
    if (!isCodeSent) {
      onSendResetCode(values.email);
      setIsCodeSent(true);
    } else {
      onCodeVerified(values.code);
    }
  };

  return (
    <>
      <H2m className="font-bold text-3xl ">Forgot password?</H2m>
      <Pm className="my-8">
        {!isCodeSent
          ? "No problem! Just enter your email address below, and we'll send you a code to reset your password."
          : "We've sent a reset code to your email. Please enter it below."}
      </Pm>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, values }) => (
          <Form>
            <TextInput
              inputType="email"
              placeholder="johndoe@gmail.com"
              error={errors.email}
              touched={touched.email}
              value={values.email}
              labelText="Enter email"
              id="email"
              className={`${isCodeSent && "disabled"} mt-4`}
            />
            {isCodeSent && (
              <TextInput
                inputType="text"
                className="mt-4"
                placeholder="Enter 6-digit code"
                error={errors.code}
                touched={touched.code}
                value={values.code}
                labelText="Reset Code"
                id="code"
              />
            )}
            <ButtonStd type="submit" className={`${isLoading && "pointer-events-none opacity-60"} w-full my-2`}>
              {isCodeSent ? "Verify Code" : "Send reset code"}
            </ButtonStd>
          </Form>
        )}
      </Formik>
      {isCodeSent && (
        <Pm className="text-end text-sm lg:text-sm xl:text-sm my-4">
          Didn't receive the code?{" "}
          <button className="underline font-semibold" onClick={() => setIsCodeSent(false)}>
            Go back
          </button>
        </Pm>
      )}
    </>
  );
};