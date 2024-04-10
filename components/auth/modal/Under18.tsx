import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { DateInput } from "./DateInput";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";

const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
  phone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional(),
  date: yup.object().shape({
    // Test that each date number is valid
    day: yup.number().min(1).max(31).required(),
    month: yup.number().min(1).max(12).required(),
    year: yup.number().required()
    // Test that the date is valid in its entirety
  }).test("is-valid-date", "The date is invalid", (date) => {
    const { day, month, year } = date || {};
    const isValidDate = Date.parse(`${year}-${month}-${day}`);
    return !isNaN(isValidDate);
  }),
});

export const Under18 = () => {
  const { personalFormData, setPersonalFormData, handleNavigation } = useStepsContext();
  
  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
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
                  label="Date of Birth"
                  name="date"
                  colStart="col-start-1"
                  colSpan="col-span-6"
                />
                <CustomInput 
                  label= "Phone"
                  name= "phone"
                  type= "phone"
                  placeholder="(country code) 123-123-1234"
                  colStart="col-start-7"
                  colSpan="col-span-6"
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

