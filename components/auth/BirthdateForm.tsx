import React, {useState} from "react";
import { BirthdateInterface, BirthdateFormInterface } from "@/interfaces/user_auth";
import { Formik, Form } from "formik";
import RegisterDateOfBirth from "./RegisterDateOfBirth";
import * as Yup from "yup";
import { ButtonStd } from "../common/ui/ButtonStd";


type BirthdateFormProps = {
  setUserBirthdate: React.Dispatch<React.SetStateAction<BirthdateInterface>>
}

export const BirthdateForm: React.FC<BirthdateFormProps> = ({setUserBirthdate}) => {

  const [birthdateSubmissionLoading, setBirthdateSubmissionLoading] = useState(false);

  const birthdateFormInitialValues: BirthdateFormInterface = {
    birthdate: {day: undefined, month: undefined, year: undefined}
  };

  const birthdateValidationSchema = Yup.object().shape({
    birthdate: Yup.object().shape({
      // Test that each date number is valid
      day: Yup.number().min(1, "Please enter a valid day").max(31, "Please enter a valid day").required("Day is required"),
      month: Yup.number().min(1, "Please enter a valid month").max(12, "Please enter a valid month").required("Month is required"),
      year: Yup.number().min(1900, "Please enter a valid year").max(2024, "Please enter a valid year").required("Year is required")
    }).test("is-valid-date", "The date is invalid", value => {
      if (!value) return true;
      const { day, month, year } = value;
      if (month < 1 || month > 12) return false;
      if (day < 1) return false;
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) return false;
      return true;
    }),
  });

  function birthdateSubmit(values: BirthdateFormInterface) {
    setBirthdateSubmissionLoading(true);
    setUserBirthdate(values.birthdate);
    setBirthdateSubmissionLoading(false);
  }

  return (
    <>
      {/* <p>First, we need to get your date of birth: </p> */}
      <Formik
        initialValues={birthdateFormInitialValues}
        validationSchema={birthdateValidationSchema}
        onSubmit={birthdateSubmit}
      >
        {({ errors, touched, values }) => (
          <Form
            className={`${birthdateSubmissionLoading && "blur-sm opacity-80"} col-start-1 row-start-1 py-4`}
          >
            <RegisterDateOfBirth
              name="birthdate"
              errors={errors.birthdate ?? { day: undefined, month: undefined, year: undefined }}
              touched={touched.birthdate ?? { day: false, month: false, year: false }}
              values={values.birthdate}
            />
            <ButtonStd type="submit" className="w-full my-2">Continue</ButtonStd>

          </Form>
        )}
      </Formik>
    </>

  );
};