"use client";
import React, {useState} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextInput} from "../common/form_inputs/TextInput";
import {ButtonStd} from "../common/ui/ButtonStd";
import Image from "next/image";
import OpenEye from "../../public/auth/eye_open.svg";
import ClosedEye from "../../public/auth/eye_closed.svg";
// import {useRouter} from "next/navigation";
import {NewPasswordInput} from "../common/form_inputs/NewPasswordInput";
import { BirthdateInterface, UserRegisterInterfaceOver18, UserRegisterInterface } from "@/interfaces/user_auth";
import { handleRegister } from "@/utils/auth";
import { validate as uuidValidate } from "uuid";
import "react-phone-number-input/style.css";
import { CustomPhoneInput } from "../common/form_inputs/CustomPhoneInput";
import { 
  firstNameValidation, 
  lastNameValidation, 
  // phoneValidation, 
  emailValidation, 
  passwordValidation 
} from "@/utils/yup-validators";

type RegisterOver18Props = {
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
  setUserUuid: React.Dispatch<React.SetStateAction<string>>
  userBirthdate: BirthdateInterface
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
  formSubmissionLoading: boolean;
  setFormSubmissionLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegisterOver18: React.FC<RegisterOver18Props> = ({setUserEmail, setUserUuid, userBirthdate, setRegisterSuccess, formSubmissionLoading, setFormSubmissionLoading}) => {

  const [showPassword, setShowPassword] = useState(false);
  const over18ValidationSchema = Yup.object().shape({
    ...firstNameValidation,
    ...lastNameValidation,
    // ...phoneValidation,
    ...emailValidation,
    ...passwordValidation,
  });

  const over18InitialValues: UserRegisterInterfaceOver18 = {
    firstName: "",
    lastName: "",
    email: "",
    phone: undefined,
    password: ""
  };

  const onSubmit = async (values: UserRegisterInterfaceOver18) => {
    setFormSubmissionLoading(true);
    const userRegisterValues: UserRegisterInterface = {
      ...values,
      guardianFirstName: undefined,
      guardianLastName: undefined,
      birthdate: userBirthdate
    };
  
    setUserEmail(values.email); // Set user email for use in verificationSubmit
    const result = await handleRegister(userRegisterValues);
    console.log(result);
    if (result?.success) {
      setRegisterSuccess(result.success);
      if (result?.message && uuidValidate(result.message)) {
        setUserUuid(result.message);
      }  
    }
    setFormSubmissionLoading(false);
  };

  return (
    <Formik
      initialValues={over18InitialValues}
      validationSchema={over18ValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
        <Form 
          className={`${formSubmissionLoading && "blur-sm opacity-80"} col-start-1 row-start-1`}
        > {/* Disabled until contest begins: className="pointer-events-none opacity-50"*/}
          <div className="grid grid-cols-2 gap-4">
            <TextInput inputType="string" className="mt-4" placeholder="John" error={errors.firstName}  touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
            <TextInput inputType="string" className="mt-4" placeholder="Doe" error={errors.lastName}  touched={touched.lastName} value={values.lastName} labelText="Last name" id="lastName" />
          </div>
          <CustomPhoneInput
            placeholder="+1 1234567890"
            error={errors.phone}
            touched={touched.phone}
            value={values.phone}
            labelText="Phone number"
            required={false}
            id="phone"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />

          <TextInput inputType="email" className="" placeholder="johndoe@gmail.com" autoComplete="username" error={errors.email}  touched={touched.email} value={values.email} labelText="Email" id="email" />
          <div className="relative">
            <NewPasswordInput inputType={`${!showPassword && "password" }`} className="mb-4" placeholder="Squk1*Bn" error={errors.password}  touched={touched.password} value={values.password} labelText="Password" id="password" />
            <Image
              className="absolute top-14 right-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              width={30} height={30}
              src={showPassword ? OpenEye : ClosedEye }
              alt="Show password button." />
          </div>
          <ButtonStd type="submit" className="w-full my-2">Sign up</ButtonStd>
        </Form>
      )}
    </Formik>
  );
};