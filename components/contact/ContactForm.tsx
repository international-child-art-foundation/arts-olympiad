import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type Query = "Issue submitting artwork" | "Someone uploaded my work" | "Trouble sharing artwork" |
  "Voting assistance" | "Account issues" | "Other" | null

interface IFormValues {
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

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  query: null
};

const onSubmit = (values: IFormValues) => {
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
      <Form className="grid grid-rows-6 grid-cols-2">
        <div className="row-span-2 col-span-2">
          <div className="col-span-1 row-span-1" >
            <div className="w-full">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
          </div>

          <div className="col-span-1 row-span-1" >
            <div>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="phone">Phone Number</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
          </div>
        </div>

      </Form>
    </Formik>
  );
};