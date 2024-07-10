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
import { BirthdateInterface, UserRegisterInterfaceUnder18, UserRegisterInterface } from "@/interfaces/user_auth";
import { handleRegister } from "@/utils/api-user";
import { validate as uuidValidate } from "uuid";
import "react-phone-number-input/style.css";
import { CustomPhoneInput } from "../common/form_inputs/CustomPhoneInput";
import { 
  firstNameValidation, 
  lastNameValidation, 
  guardianFirstNameValidation,
  guardianLastNameValidation,
  // phoneValidation, 
  emailValidation, 
  passwordValidation 
} from "@/utils/yup-validators";

type RegisterUnder18Props = {
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
  setUserUuid: React.Dispatch<React.SetStateAction<string>>
  userBirthdate: BirthdateInterface
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
  formSubmissionLoading: boolean
  setFormSubmissionLoading: React.Dispatch<React.SetStateAction<boolean>>
}
import Bottleneck from "bottleneck";
import { limiter } from "@/utils/api-rate-limit";

export const RegisterUnder18: React.FC<RegisterUnder18Props> = ({setUserEmail, setUserUuid, userBirthdate, setRegisterSuccess, formSubmissionLoading, setFormSubmissionLoading}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const under18ValidationSchema = Yup.object().shape({
    ...firstNameValidation,
    ...lastNameValidation,
    ...guardianFirstNameValidation,
    ...guardianLastNameValidation,
    // ...phoneValidation,
    ...emailValidation,
    ...passwordValidation,
  });

  const under18InitialValues: UserRegisterInterfaceUnder18 = {
    firstName: "",
    lastName: "",
    guardianFirstName: "",
    guardianLastName: "",
    email: "",
    phone: undefined,
    password: ""
  };

  const onSubmit = async (values: UserRegisterInterfaceUnder18) => {
    setFormSubmissionLoading(true);
    const userRegisterValues: UserRegisterInterface = {
      ...values,
      birthdate: userBirthdate
    };
    setUserEmail(values.email); // Set user email for use in verificationSubmit
    try {
      const result = await limiter.schedule(() => handleRegister(userRegisterValues));
      console.log(result);
      if (result.success) {
        setRegisterSuccess(result.success);
        if (result.message && uuidValidate(result.message)) {
          setUserUuid(result.message);
        }  
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
    setFormSubmissionLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={under18InitialValues}
        validationSchema={under18ValidationSchema}
        onSubmit={onSubmit}
      >

        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          
          <Form 
            className={`${formSubmissionLoading && "blur-sm opacity-80"} col-start-1 row-start-1`}
          > {/* Disabled until contest begins: className="pointer-events-none opacity-50"*/}
            <p className="rounded-3xl p-4 bg-white italic">Since you're under the age of 18, please ask a parent or guardian to help you fill out the rest of this form.</p>
            <div className="grid grid-cols-2 gap-4">
              <TextInput inputType="string" className="mt-4" placeholder="John" error={errors.firstName}  touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
              <TextInput inputType="string" className="mt-4" placeholder="Doe" error={errors.lastName}  touched={touched.lastName} value={values.lastName} labelText="Last name" id="lastName" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput inputType="string" className="mt-4" placeholder="John" error={errors.guardianFirstName}  touched={touched.guardianFirstName} value={values.guardianFirstName} labelText="Guardian's First Name" id="guardianFirstName" />
              <TextInput inputType="string" className="mt-4" placeholder="Doe" error={errors.guardianLastName}  touched={touched.guardianLastName} value={values.guardianLastName} labelText="Guardian's Last Name" id="guardianLastName" />
            </div>
            <CustomPhoneInput
              placeholder="+1 1234567890"
              error={errors.phone}
              touched={touched.phone}
              value={values.phone}
              labelText="Guardian Phone Number"
              required={false}
              id="phone"
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />

            <TextInput inputType="email" className="" placeholder="johndoe@gmail.com" autoComplete="username" error={errors.email}  touched={touched.email} value={values.email} labelText="Guardian Email" id="email" />
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
            {apiError && <p className="text-red-500">{apiError}</p>}
          </Form>
        )}
      </Formik>
    </>
  );


};