import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ButtonStd } from "../common/ui/ButtonStd";
import { H2m } from "../common/texts/H2m";
import { Pm } from "../common/texts/Pm";
import Image from "next/image";
import OpenEye from "../../public/auth/eye_open.svg";
import ClosedEye from "../../public/auth/eye_closed.svg";
import { NewPasswordInput } from "../common/form_inputs/NewPasswordInput";
import { passwordValidation } from "@/utils/yup-validators";
import { ConfirmForgotPasswordInterface } from "@/interfaces/user_auth";

interface IProps {
  isLoading: boolean;
  onSubmitResetForm: (values: ConfirmForgotPasswordInterface) => void;
  email: string;
  resetCode: string;
}

interface IResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  ...passwordValidation,
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Your passwords do not match. They must be the same."),
});

const initialValues: IResetPasswordFormValues = {
  password: "",
  confirmPassword: ""
};

export const ResetPasswordForm = ({ onSubmitResetForm, email, resetCode, isLoading }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: IResetPasswordFormValues) => {
    const forgotPasswordValues = {
      newPassword: values.confirmPassword,
      email: email,
      confirmationCode: resetCode,
    } as ConfirmForgotPasswordInterface;
    console.log("Resetting password for:", email, "with code:", resetCode);
    onSubmitResetForm(forgotPasswordValues);
  };

  return (
    <>
      <H2m className="font-bold text-3xl ">Change Password</H2m>
      <Pm className="my-2" >Setting up your new password is easy! Just enter it twice below to confirm.</Pm>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="relative">
              <NewPasswordInput 
                inputType={showPassword ? "text" : "password"}
                className="mb-4" 
                placeholder="Enter password..." 
                error={errors.password}  
                touched={touched.password} 
                value={values.password} 
                labelText="New Password*" 
                id="password" 
              />
              <Image
                className="absolute top-14 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                width={30} height={30}
                src={showPassword ? OpenEye : ClosedEye }
                alt="Show password button." 
              />
            </div>
            <div className="relative">
              <NewPasswordInput 
                inputType={showPassword ? "text" : "password"}
                className="mb-4" 
                placeholder="Enter password..." 
                error={errors.confirmPassword}  
                touched={touched.confirmPassword} 
                value={values.confirmPassword} 
                labelText="Confirm New Password*" 
                id="confirmPassword" 
              />
            </div>
            <ButtonStd type="submit" className={`${isLoading && "pointer-events-none opacity-60"} w-full my-2`}>Submit</ButtonStd>
          </Form>
        )}
      </Formik>
    </>
  );
};