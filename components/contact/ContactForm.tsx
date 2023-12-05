import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TextInput} from "./form_inputs/TextInput";

type Query = "Issue submitting artwork" | "Someone uploaded my work" | "Trouble sharing artwork" |
  "Voting assistance" | "Account issues" | "Other" | null

interface IContactFormValues {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  query: Query
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
});

const initialValues: IContactFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  query: null
};

const onSubmit = (values: IContactFormValues) => {
  // Handle form submission logic here
  console.log(values);
};

export const ContactForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => (
        <Form className="grid grid-rows-6 grid-cols-2">
          <TextInput error={errors.firstName} touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
          <TextInput error={errors.lastName} touched={touched.lastName} value={values.lastName} labelText="Last Name" id="lastName" />
        </Form>
      )}
    </Formik>
  );
};