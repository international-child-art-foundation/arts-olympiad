import {Formik, Form} from "formik";
import * as Yup from "yup";
import {TextInput} from "../common/form_inputs/TextInput";
import {TextArea} from "../common/form_inputs/TextArea";
import {RadioButtonsContainer} from "../common/form_inputs/RadioButtonsContainer";
import {ButtonStd} from "../common/ui/ButtonStd";
import React, {Dispatch, SetStateAction} from "react";
import {RadioButton} from "../common/form_inputs/RadioButton";

export type Query = "Question about artwork submission" | "Someone uploaded my work" | "Trouble sharing artwork" |
  "Voting assistance" | "Account issues" | "Other" | null

interface IProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
}

export interface IContactFormValues {
  firstName: string,
  lastName: string,
  email: string,
  query: Query
  message: string
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Not a recognized email address").required("Email is required"),
  query: Yup.mixed().oneOf(
    ["Question about artwork submission", "Someone uploaded my work", "Trouble sharing artwork", "Voting assistance", "Account issues", "Other"],
    "You must select one to submit a query"
  ).required("You must select one to submit a query"),
  message: Yup.string().required("Message is required").min(20, "Message must be at least 20 Characters long")
});

const initialValues: IContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  query: null,
  message: ""
};



export const ContactForm = ({ setIsSubmitted }: IProps) => {

  const onSubmit = (values: IContactFormValues) => {
    console.log(values);
    setIsSubmitted(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="grid grid-rows-8 grid-cols-2">
          <TextInput className="xl:mr-3 col-span-2 xl:col-span-1" placeholder="John" error={errors.firstName} touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
          <TextInput className="xl:ml-3 col-span-2 xl:col-span-1" placeholder="Doe" error={errors.lastName} touched={touched.lastName} value={values.lastName} labelText="Last Name" id="lastName" />
          <TextInput className="col-span-2" placeholder="johndoe@gmail.com" error={errors.email}  touched={touched.email} value={values.email} labelText="Email" id="email" />
          <RadioButtonsContainer touched={touched.message} labelText="Which best describes your query?" id="query" error={errors.query} value={values.query} setFieldValue={setFieldValue}>
            <div className="mr-4">
              <RadioButton name="query" value="Question about artwork submission" />
              <RadioButton name="query" value="Someone uploaded my work" />
              <RadioButton name="query" value="Trouble sharing artwork" />
            </div>
            <div>
              <RadioButton name="query" value="Voting assistance" />
              <RadioButton name="query" value="Account issues" />
              <RadioButton name="query" value="Other" />
            </div>
          </RadioButtonsContainer>
          <TextArea className="min-h-[200px] col-span-2 my-4 row-span-2 flex flex-col" placeholder="Type your message..." labelText="Message" id="message" error={errors.message} touched={touched.message} value={values.message} />
          <ButtonStd type="submit" className="max-w-[100px]">Submit</ButtonStd>
        </Form>
      )}
    </Formik>
  );
};