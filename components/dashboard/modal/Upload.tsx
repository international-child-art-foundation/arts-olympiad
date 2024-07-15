import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { CustomCheckboxOptional } from "./CustomCheckboxOptional";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
import { CustomUploadImage } from "./CustomUploadImage";
import { CustomSingleSelect } from "./CustomSingleSelect";
import { CustomTextArea } from "./CustomTextArea";
import { allCountries } from "../../../mock/filterableOptionsData";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 5 * 1024 * 1024;
const categories = [
  "Archery", "Artistic Gymnastics", "Athletics", "Badminton", "Basketball", "Boxing", "Cycling Track", "Equestrian", "Fencing", "Football", "Golf", "High jump", "Hockey", "Judo", "Rowing", "Rugby", "Sailing", "Shooting", "Table Tennis", "Taekwondo", "Tennis", "Volleyball", "Wallball", "Weightlifting", "Yoga", "Zumba"
];



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

export const Upload = () => {
  const countryOptions = allCountries.map(country => ({
    label: country.name,
    value: country.name
  }));
  const countryValues = countryOptions.map(option => option.value);
  const validationSchema = yup.object().shape({
    image: yup.mixed()
      .required("Oops! Unsupported file format. Please upload as PNG or JPG, max size 5 MB.")
      .test("format", "Please upload as PNG or JPG", (value) => {
        if (!value) return false; 
        const file = value as File; 
        return SUPPORTED_FORMATS.includes(file.type);
      }
      )
      .test(
        "size",
        "Max size 5 MB",
        (value) => {
          if (!value) return false; 
          const file = value as File; 
          return file.size <= FILE_SIZE;
        }
      )
    ,
    location: yup.string()
      .oneOf(countryValues)
      .required("Please select a continent and country for your artwork's location."),
    city: yup.string().required("Please type in your city"),
    usingAI: yup.bool().optional(),
    source: yup.string().optional(),
    prompt: yup.string().optional(),
    category: yup.string()
      .oneOf(categories)
      .required("Please select the Sports category that best represents your artwork."),
    description: yup.string().optional()
  });
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
          {({ values, setFieldValue }) => {
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

                {values.usingAI && 
                  <>
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
                    <br/>
                  </>
                }

                <CustomSingleSelect
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