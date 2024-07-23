import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { CustomCheckbox } from "./CustomCheckbox";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";

// const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  // guardianEmail: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
  // guardianPhone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional(),
  guardianTermsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
});

export const Guardian = () => {
  const { guardianFormData, setGuardianFormData, handleNavigation } = useStepsContext();

  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full">
      <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
        Great, now we need your parent or guardian's OK 
      </div>
      <div className="mb-4 text-base text-neutral-black font-normal"> 
        We need a little help from a parent or guardian before you proceed. 
      </div>
      <div className="mb-4 text-base text-neutral-black font-normal"> 
        They'll need to agree to our terms and understand that by submitting your artwork, it's being generously donated to ICAF for charitable objectives. 
      </div>
      <Formik
        initialValues={guardianFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // On submit: Set our global context data according to form values and move to next page
          setGuardianFormData(prevState => ({
            ...prevState,
            guardianFirstName: values.guardianFirstName,
            guardianLastName: values.guardianLastName,
            // guardianEmail: values.guardianEmail,
            // guardianPhone: values.guardianPhone,
            guardianTermsCheck: values.guardianTermsCheck
          }));
          handleNavigation("next");
        }}
      >
        {() => {
          return (
            <Form className="grid grid-cols-1">
              <CustomInput 
                label="Parent or Guardian's First Name"
                name="guardianFirstName"
                type="text"
                placeholder="First name"
              />
              
              <CustomInput 
                label="Parent or Guardian's Last Name"
                name="guardianLastName"
                type="text"
                placeholder="Last name"
              />
              {/* <CustomInput 
                label="Parent or Guardian's Email"
                name="guardianEmail"
                type="email"
                placeholder="example@example.com"
              />
              <CustomInput 
                label= "Phone"
                name= "guardianPhone"
                type= "phone"
                placeholder="(country code) 123-123-1234"
              />
 */}
              <CustomCheckbox
                label=""
                name="guardianTermsCheck" 
                type="checkbox" 
              />

              {/* <div className="my-6">
                <label className="text-sm font-light text-neutral-black">
                  Parent or Guardian's Digital Signature
                </label>
                <div className="text-new-blue flex items-center justify-center border border-neutral-black w-full h-52 rounded-lg">
                  Sign here
                </div>
              </div> */}

              <FormikValidatedStepsControl />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};