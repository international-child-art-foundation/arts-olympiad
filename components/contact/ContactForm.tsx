import { Formik, Form } from "formik";
import * as Yup from "yup";
import {TextInput} from "./form_inputs/TextInput";
import {TextArea} from "./form_inputs/TextArea";
import {RadioButtons} from "./form_inputs/RadioButtons";

export type Query = "Issue submitting artwork" | "Someone uploaded my work" | "Trouble sharing artwork" |
  "Voting assistance" | "Account issues" | "Other" | null

export interface IContactFormValues {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  query: Query
  message: string
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  query: Yup.mixed().oneOf(
    ["Issue submitting artwork", "Someone uploaded my work", "Trouble sharing artwork", "Voting assistance", "Account issues", "Other"],
    "Choice is required"
  ),
  message: Yup.string().required("Message is required").min(20, "Message must be at least 20 Characters long")
});

const initialValues: IContactFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  query: null,
  message: ""
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
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="grid grid-rows-6 grid-cols-2">
          <TextInput error={errors.firstName} touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
          <TextInput error={errors.lastName} touched={touched.lastName} value={values.lastName} labelText="Last Name" id="lastName" />
          <TextInput error={errors.email} touched={touched.email} value={values.email} labelText="Email" id="email" />
          <TextInput required={false} error={errors.phone} touched={touched.phone} value={values.phone} labelText="Phone" id="phone" />
          <RadioButtons labelText="Which best describes your query?" id="query" error={errors.query} value={values.query} setFieldValue={setFieldValue} />
          <TextArea labelText="Message" id="message" error={errors.message} touched={touched.message} value={values.message} />
        </Form>
      )}
    </Formik>
  );
};