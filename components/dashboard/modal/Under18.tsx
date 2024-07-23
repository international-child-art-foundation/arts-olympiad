import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { DateInput } from "./DateInput";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
import { emailValidation, firstNameValidation, lastNameValidation, phoneValidation } from "@/utils/yup-validators";

const isLeapYear = (year: number) => {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
};

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const validationSchema = yup.object().shape({
  ...firstNameValidation,
  ...lastNameValidation,
  ...emailValidation,
  ...phoneValidation,
  date: yup.object().shape({
    // Test that each date number is valid
    day: yup.number().min(1, "Please enter a valid day").max(31, "Please enter a valid day").required(),
    month: yup.number().min(1, "Please enter a valid month").max(12, "Please enter a valid month").required(),
    year: yup.number().min(1900, "Please enter a valid year").max(2024, "Please enter a valid year").required()
  }).test("is-valid-date", "The date is invalid", (value) => {
    const { day, month, year } = value;
    if (month < 1 || month > 12) return false; 
    if (day < 1) return false; 
    const daysInMonth = isLeapYear(year) && month === 2 ? 29 : new Date(year, month, 0).getDate();
    if (day > daysInMonth) return false; 
    return true; 
  }).test("is-old-enough", "You need to be over 14 to enter this competition", (value) => {
    const { day, month, year } = value;
    const birthDate = new Date(year, month - 1, day); 
    const age = calculateAge(birthDate);
    return age >= 14; 
  }),
});

export const Under18 = () => {
  const { personalFormData, setPersonalFormData, handleNavigation } = useStepsContext();
  
  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full">
      <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
        Terms & Donation Acknowledgment (For Users 18 and Under)
      </div>
      <div className="mb-4 text-base text-neutral-black font-normal"> 
        Before we move forward, we need some details from you. Please review and agree to our <span className="underline">Terms of Use</span> and <span className="underline">Privacy Policy</span>. By submitting your artwork, you're also donating it to ICAF for charitable objectives. Thank you for your support!
      </div>

      <Formik 
        initialValues={personalFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // On submit: Set our global context data according to form values and move to next page
          setPersonalFormData(prevState => ({
            ...prevState,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            date: { day: values.date.day, month: values.date.month, year: values.date.year }
          }));
          handleNavigation("next");
        }}
      >
        {() => {
          return (
            <Form className="grid grid-cols-1">
              <CustomInput 
                label= "First Name"
                name= "firstName"
                type= "text"
                placeholder= "First name"
              />

              <CustomInput 
                label= "Last Name"
                name= "lastName"
                type= "text"
                placeholder= "Last name"
              />

              <CustomInput 
                label= "Email"
                name= "email"
                type= "email"
                placeholder= "example@example.com"
              />

              <div className="grid grid-cols-12 gap-3">
                <DateInput
                  label=""
                  name="date"
                  colStart="col-start-1"
                  colSpan="col-span-6"
                />

                <CustomInput 
                  label= "Phone"
                  name= "phone"
                  type= "phone"
                  placeholder="(country code) 123-123-1234"
                  colStart="col-start-1 md:col-start-7"
                  colSpan="col-span-12 md:col-span-6"
                />
              </div>

              <FormikValidatedStepsControl />

            </Form>
          );
        }}
      </Formik>        
    </section>
  );
};

