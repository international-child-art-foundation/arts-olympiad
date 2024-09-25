import * as yup from "yup";
import { Form, Formik } from "formik";
// import { CustomInput } from "./CustomInput";
import { CustomCheckbox } from "./CustomCheckbox";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";

const validationSchema = yup.object().shape({
  termsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
});

export const Over14 = () => {
  const { personalFormData, setPersonalFormData, handleNavigation, userAge } = useStepsContext();

  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full">
      <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
        Terms & Donation Acknowledgment
      </div>
      {userAge < 14 && <p className="text-red-600 text-xl mb-4 text-center">These terms of use must be reviewed by your parent or guardian.</p>}
      <div className="mb-10 text-base text-neutral-black font-normal"> 
        Before we move forward, we need some details from you. Please review and agree to our <a className="underline text-blue-600" target="_blank" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Terms_of_Use.pdf">Terms of Use</a> and <a className="underline text-blue-600" target="_blank" href="https://icaf.org/resource/documents/myfavoritesport/MyFavoriteSport_Privacy_Policy.pdf">Privacy Policy</a>. By submitting your artwork, you're also donating it to ICAF for charitable objectives. Thank you for your support!
      </div>

      <Formik 
        initialValues={personalFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // On submit: Set our global context data according to form values and move to next page
          setPersonalFormData(prevState => ({
            ...prevState,
            termsCheck: values.termsCheck
          }));
          handleNavigation("next");
        }}
      >
        {()=> { 
          return (
            <Form className="grid grid-cols-1">
              <CustomCheckbox
                label=""
                name="termsCheck" 
                type="checkbox"
                age={userAge}
              />
              <FormikValidatedStepsControl/>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

