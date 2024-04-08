import * as yup from "yup";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { CustomInputOptional } from "./CustomInputOptional";
import { CustomCheckboxOptional } from "./CustomCheckboxOptional";
import React, {useEffect} from "react";
// import { StepsContext } from "./StepsContext";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";
import Select from "react-select";
import { useStepsContext } from "./StepsContext";

const SUPPORTED_FORMATS = ["image/jpg", "image/png"];
const FILE_SIZE = 3 * 1024 * 1024;
const categories = [
  "Archery", "Artistic Gymnastics", "Athletics", "Badminton", "Basketball", "Boxing", "Cycling Track", "Equestrian", "Fencing", "Football", "Golf", "High jump", "Hockey", "Judo", "Rowing", "Rugby", "Sailing", "Shooting", "Table Tennis", "Taekwondo", "Tennis", "Volleyball", "Wallball", "Weightlifting", "Yoga", "Zumba"
];
  
const validationSchema = yup.object().shape({
  image: yup.mixed()
    .required("Oops! Unsupported file format. Please upload as PNG or JPG, max size 3 MB.")
    .test("format", "Please upload as PNG or JPG", value => value && SUPPORTED_FORMATS.includes(value.type))
    .test("size", "Max size 3 MB", value => value && value.size <= FILE_SIZE )
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

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #1F1F23", // Assuming this is your border style
    boxShadow: "none", // No shadow for a flat design
    "&:hover": {
      borderColor: "#1F1F23", // Custom hover border color
    },  
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#495057"
  }),
  container: (provided) => ({
    ...provided,
    width: "100%", 
    color: "#495057"
  }),
  menu: (provided) => ({
    ...provided,
  }),
};

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

function useUploadFormikLogic(props, uploadFormData, setUploadFormData, setHasError) {
  useEffect(() => {
    const requiredFields = ["image", "location", "city", "category"];
    const hasPreviousData = requiredFields.every(field => uploadFormData[field]);
    const hasSpecificFieldErrors = requiredFields.some(field => props.errors[field]);
    const requiredFieldsTouched = requiredFields.some(field => props.touched[field]);
    const noErrorsAtAll = Object.keys(props.errors).length === 0;
    const nothingTouchedYet = Object.keys(props.touched).length === 0 && Object.keys(props.values).length !== 0;
    const shouldSetError = hasSpecificFieldErrors || (!hasPreviousData && nothingTouchedYet);
    setHasError(shouldSetError);
    if (noErrorsAtAll && requiredFieldsTouched) {
      setUploadFormData(Object.assign({}, uploadFormData, props.values));
    }
  }, [props, uploadFormData, setUploadFormData, setHasError]);
};

export const Upload = () => {
  // const { uploadFormData, setUploadFormData, setHasError } = useContext(StepsContext);
  const { uploadFormData, setUploadFormData, setHasError } = useStepsContext();
  
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
        <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
          <p>Now for the exciting part!</p>
          <p>Please fill in the details below and upload your masterpiece.</p>
        </div>
        <Formik 
          initialValues={{ 
            image: uploadFormData.image || "", 
            location: uploadFormData.location || "", 
            city: uploadFormData.city || "", 
            usingAI: uploadFormData.usingAI|| false, 
            source: uploadFormData.source || "", 
            prompt: uploadFormData.prompt || "", 
            category: uploadFormData.category || [], 
            description: uploadFormData.description || ""
          }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {props => {
            // useUploadFormikLogic(props, uploadFormData, setUploadFormData, setHasError);
            return (
              <Form className="grid grid-cols-1">
                <div className="items-center justify-center w-full">
                  <label htmlFor="image" className="w-full h-64 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-6 text-md font-light text-neutral-black">Drag and drop files to upload</p>
                      <div className="mb-6 h-fit w-fit rounded text-center py-4 px-6 text-base font-normal bg-new-blue text-neutral-white">
                        <UploadIcon />
                        <span className="ml-4">Upload Artwork</span>
                      </div>
                      <p className="text-sm font-light text-neutral-black">PNG or JPG</p>
                    </div>
                    <Field 
                      id="image" 
                      type="file" 
                      name= "image"
                      accept="image/*"
                      onChange={(event) => {
                        props.setFieldValue("image", event.currentTarget.files[0]);
                        // setFile(event.target.files[0])
                      }}
                      onBlur={props.handleBlur}
                      value={undefined}
                      className="hidden" 
                    />
                  </label>
                  {props.errors.image &&
                    <div className="inline-flex mt-1 bg-[#FBF4F3] w-full rounded border-l-8 border-[#EE2F4D]"> 
                      <p className="my-5 mx-10 text-base font-normal text-[#C4384E] ml-2">{props.errors.image}</p>
                    </div>
                  }
                </div> 

                <div className="mt-6">
                  <label htmlFor="location" className={`text-sm mb-1 ${props.errors.location && props.touched.location ? "text-[#C4384E] font-semibold" : !props.errors.location && props.touched.location ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Location</label>
                  <Select
                    label= "Location"
                    name= "location"
                    options={countryOptions}
                    onChange={(value) => props.setFieldValue("location", value.value)}
                    value={countryOptions.find(option => option.value === props.values.location)}
                    styles={customStyles}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onBlur={() => props.setFieldTouched("location", true)}
                    placeholder="Country"
                  />
                  {props.errors.location &&
                  <div className="inline-flex mt-1">
                    <HintIcon /> 
                    <p className="text-xs font-normal text-[#C4384E] ml-2">{props.errors.location}</p>
                  </div>
                  }
                  {!props.errors.location && props.touched.location &&
                  <div className="inline-flex mt-1">
                    <CorrectIcon /> 
                  </div>
                  }
                </div> 

                <CustomInput 
                  label= "City"
                  name= "city"
                  type= "text"
                  placeholder= "Type city here"
                />

                <CustomCheckboxOptional 
                  label= "Is this image created using AI?"
                  sentence="Yes, I used AI."
                  type="checkbox"
                  name="usingAI"
                />

                <CustomInputOptional 
                  label= "AI Source"
                  name= "source"
                  type= "text"
                  placeholder= "Type link here"
                />

                <CustomInputOptional 
                  label= "AI Prompt"
                  name= "prompt"
                  type= "text"
                  placeholder= "Type link here"
                />
              
                <div className="mt-6">
                  <label htmlFor="category" className={`text-sm mb-1 ${props.errors.category && props.touched.category ? "text-[#C4384E] font-semibold" : !props.errors.category && props.touched.category ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Category</label>
                  <Select
                    label= "Category"
                    name= "category"
                    options={options}
                    isMulti
                    onChange={(selectedOptions) => {
                      const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                      props.setFieldValue("category", values);
                    }}
                    value={options.filter(option => props.values.category.includes(option.value))}
                    onBlur={() => props.setFieldTouched("category", true)}
                    styles={customStyles}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder=" "
                  />
                  {props.errors.category &&
                  <div className="inline-flex mt-1">
                    <HintIcon /> 
                    <p className="text-xs font-normal text-[#C4384E] ml-2">{props.errors.category}</p>
                  </div>
                  }
                  {!props.errors.category && props.touched.category &&
                  <div className="inline-flex mt-1">
                    <CorrectIcon /> 
                  </div>
                  }
                </div> 

                <div className="mt-6 text-sm font-light text-neutral-black">Description* (Optional)</div>
                <textarea
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  name= "description" 
                  className= "w-full h-36 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2"
                />
              </Form>
            );
          }}

        </Formik>

      </section>
    </>
  );
};