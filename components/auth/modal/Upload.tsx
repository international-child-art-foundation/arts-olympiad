import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { CustomCheckboxOptional } from "./CustomCheckboxOptional";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
import { CustomUploadImage } from "./CustomUploadImage";
import { CustomSingleSelect } from "./CustomSingleSelect";
import { CustomMultiSelect } from "./CustomMultiSelect";
import { CustomTextArea } from "./CustomTextArea";

const SUPPORTED_FORMATS = ["image/jpg", "image/png"];
const FILE_SIZE = 3 * 1024 * 1024;
const categories = [
  "Archery", "Artistic Gymnastics", "Athletics", "Badminton", "Basketball", "Boxing", "Cycling Track", "Equestrian", "Fencing", "Football", "Golf", "High jump", "Hockey", "Judo", "Rowing", "Rugby", "Sailing", "Shooting", "Table Tennis", "Taekwondo", "Tennis", "Volleyball", "Wallball", "Weightlifting", "Yoga", "Zumba"
];

const validationSchema = yup.object().shape({
  image: yup.mixed()
    .required("Oops! Unsupported file format. Please upload as PNG or JPG, max size 3 MB.")
    .test("format", "Please upload as PNG or JPG", (value) => {
      if (!value) return false; 
      const file = value as File; 
      return SUPPORTED_FORMATS.includes(file.type);
    }
    )
    .test(
      "size",
      "Max size 3 MB",
      (value) => {
        if (!value) return false; 
        const file = value as File; 
        return file.size <= FILE_SIZE;
      }
    )
  ,
  location: yup.string()
    .oneOf([
      "Australia", "Belgium", "China", "Denmark", "Egypt", "France", "Germany", "Italy", "Japan", "Korea", "Malaysia", "New Zealand", "Pakistan", "Russia", "Singapore", "Thailand", "United States of America", "Vietnam"
    ])
    .required("Please select a continent and country for your artwork's location."),
  city: yup.string().required("Please type in your city"),
  usingAI: yup.bool().optional(),
  source: yup.string().optional(),
  prompt: yup.string().optional(),
  category: yup.array()
    .of(yup.string().oneOf(categories))
    .min(1, "Please select the Sports category that best represents your artwork.")
    .required("Please select the Sports category that best represents your artwork."),
  description: yup.string().optional()
});

const options = [
  {label: "Archery", value: "Archery"},
  {label: "Artistic Gymnastics", value: "Artistic Gymnastics"},
  {label: "Athletics", value: "Athletics"},
  {label: "Badminton", value: "Badminton"},
  {label: "Basketball", value: "Basketball"},
  {label: "Boxing", value: "Boxing"},
  {label: "Cycling Track", value: "Cycling Track"},
  {label: "Equestrian", value: "Equestrian"},
  {label: "Fencing", value: "Fencing"},
  {label: "Football", value: "Football"},
  {label: "Golf", value: "Golf"},
  {label: "High jump", value: "High jump"},
  {label: "Hockey", value: "Hockey"},
  {label: "Judo", value: "Judo"},
  {label: "Rowing", value: "Rowing"},
  {label: "Rugby", value: "Rugby"},
  {label: "Sailing", value: "Sailing"},
  {label: "Shooting", value: "Shooting"},
  {label: "Table Tennis", value: "Table Tennis"},
  {label: "Taekwondo", value: "Taekwondo"},
  {label: "Tennis", value: "Tennis"},
  {label: "Volleyball", value: "Volleyball"},
  {label: "Wallball", value: "Wallball"},
  {label: "Weightlifting", value: "Weightlifting"},
  {label: "Yoga", value: "Yoga"},
  {label: "Zumba", value: "Zumba"}
];

const countryOptions = [
  { label: "Australia", value: "Australia" },
  { label: "Belgium", value: "Belgium" },
  { label: "China", value: "China" },
  { label: "Denmark", value: "Denmark" },
  { label: "Egypt", value: "Egypt" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Korea", value: "Korea" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Russia", value: "Russia" },
  { label: "Singapore", value: "Singapore" },
  { label: "Thailand", value: "Thailand" },
  { label: "United States of America", value: "United States of America" },
  { label: "Vietnam", value: "Vietnam" },
];

export const Upload = () => {
  const { uploadFormData, setUploadFormData, handleNavigation } = useStepsContext();
  
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
        <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
          <p>Now for the exciting part!</p>
          <p>Please fill in the details below and upload your masterpiece.</p>
        </div>
        <Formik 
          initialValues={uploadFormData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // On submit: Set our global context data according to form values and move to next page
            setUploadFormData(prevState => ({
              ...prevState,
              image: values.image,
              location: values.location,
              city: values.city,
              usingAI: values.usingAI,
              source: values.source,
              prompt: values.prompt,
              category: values.category,
              description: values.description
            }));
            handleNavigation("next");
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="grid grid-cols-1">
                <div className="items-center justify-center w-full">
                  <CustomUploadImage
                    label= "Drag and drop files to upload"
                    name= "image"
                    type= "file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.currentTarget.files) {
                        const file = event.currentTarget.files[0];
                        setFieldValue("image", file);
                      }
                    }}
                  />
                </div> 

                <div className="mt-6">
                  <CustomSingleSelect
                    label="Location"
                    name="location"
                    options={countryOptions}
                    placeholder="Country"
                  />
                </div> 

                <CustomInput 
                  label= "City"
                  name= "city"
                  type= "text"
                  placeholder= "Type city here"
                />

                <CustomCheckboxOptional
                  label= "Is this image created using AI?"
                  type="checkbox"
                  name="usingAI"
                />

                <CustomInput
                  label= "AI Source"
                  name= "source"
                  type= "text"
                  placeholder= "Type link here"
                />

                <CustomInput
                  label= "AI Prompt"
                  name= "prompt"
                  type= "text"
                  placeholder= "Type link here"
                />

                <CustomMultiSelect
                  label="Category"
                  name="category"
                  options={options}
                  placeholder=""
                />

                <CustomTextArea
                  label= "Description* (Optional)"
                  name= "description"
                  type= "text"
                />

                <FormikValidatedStepsControl/>
              
              </Form>
            );
          }}
        </Formik>

      </section>
    </>
  );
};