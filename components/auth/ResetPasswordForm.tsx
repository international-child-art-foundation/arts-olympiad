import React, {useState} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextInput} from "../common/form_inputs/TextInput";
import {ButtonStd} from "../common/ui/ButtonStd";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import Image from "next/image";
import OpenEye from "../../public/auth/eye_open.svg";
import ClosedEye from "../../public/auth/eye_closed.svg";
import {NewPasswordInput} from "../common/form_inputs/NewPasswordInput";

interface IProps {
  onSubmitResetForm: () => void
}

interface IResetPasswordFormValues {
  password: string,
  confirmPassword: string
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Your passwords do not match. They must be the same."),
});

const initialValues: IResetPasswordFormValues = {
  password: "",
  confirmPassword: ""
};

export const ResetPasswordForm = ({ onSubmitResetForm }: IProps) => {

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    onSubmitResetForm();
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
          <Form className=""> {/*pointer-events-none opacity-50  Disabled until contest begins*/}
            <div className="relative">
              <NewPasswordInput inputType={`${!showPassword && "password" }`} className="mb-4" placeholder="Squk1*Bn" error={errors.password}  touched={touched.password} value={values.password} labelText="New Password*" id="password" />
              <Image
                className="absolute top-14 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                width={30} height={30}
                src={showPassword ? OpenEye : ClosedEye }
                alt="Show password button." />
            </div>
            <div className="relative">
              <TextInput inputType={`${!showPassword && "password" }`} className="mb-4" placeholder="Squk1*Bn" error={errors.confirmPassword}  touched={touched.confirmPassword} value={values.confirmPassword} labelText="Confirm New Password*" id="confirmPassword" />
              <Image
                className="absolute top-14 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                width={30} height={30}
                src={showPassword ? OpenEye : ClosedEye }
                alt="Show password button." />
            </div>
            <ButtonStd type="submit" className="w-full my-2">Submit</ButtonStd>
          </Form>
        )}
      </Formik>
    </>
  );
};