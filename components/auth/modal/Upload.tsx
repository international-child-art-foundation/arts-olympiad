import * as yup from "yup";
import { UploadIcon } from "../../svgs/UploadIcon";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { CustomInputOptional } from "./CustomInputOptional";
import { CustomSelect } from "./CustomSelect";
import { CustomCheckboxOptional } from "./CustomCheckboxOptional";
import { useContext } from "react";
import { StepsContext } from "./StepsContext";
// import Image from "next/image";
// import { ToDataString } from "./ToDataString";
// import { useEffect } from "react";

export const Upload = () => {
  const SUPPORTED_FORMATS = ["image/jpg", "image/png"];
  const FILE_SIZE = 3 * 1024 * 1024;

  const validationSchema = yup.object().shape({
    image: yup.mixed()
      .required("Oops! Unsupported file format. Please upload as PNG or JPG, max size 3 MB.")
      .test("format", "Please upload as PNG or JPG", value => value && SUPPORTED_FORMATS.includes(value.type))
      .test("size", "Max size 3 MB", value => value && value.size <= FILE_SIZE )
    ,
    location: yup.string().oneOf(["Australia", "Belgium", "China", "Denmark", "Egypt", "France", "Germany", "Italy", "Japan", "Korea", "Malaysia", "New Zealand", "Pakistan", "Russia", "Singapore", "Thailand", "United States of America", "Vietnam"]).required("Please select a continent and country for your artwork's location."),
    city: yup.string().required("Please type in your city"),
    usingAI: yup.bool().optional(),
    source: yup.string().optional(),
    prompt: yup.string().optional(),
    category: yup.string().oneOf(["Archery", "Artistic Gymnastics", "Athletics", "Badminton", "Basketball", "Boxing", "Cycling Track", "Equestrian", "Fencing", "Football", "Golf", "High jump", "Hockey", "Judo", "Rowing", "Rugby", "Sailing", "Shooting", "Table Tennis", "Taekwondo", "Tennis", "Volleyball", "Wallball", "Weightlifting", "Yoga", "Zumba"]).required("Please select the Sports category that best represents your artwork."),
    description: yup.string().optional()
  });

  const { userData, setUserData } = useContext(StepsContext);
  const { setHasError } = useContext(StepsContext);

  const handleData = (thisData) => {
    setUserData(Object.assign(userData, thisData));
  };
  // const [previewImageSrc, setPreviewImageSrc] = useState<string>();
  // const showingImage:ChangeEventHandler<HTMLInputElement> = async (event) => {
  //   const image = event.target.files[0];
  //   setPreviewImageSrc(await ToDataString(image));
  // }
  // const [file, setFile] = useState(null);
  // useEffect(() => {
  //   if (!file) {
  //     return
  //   }

  //   const reader = new FileReader()

  //   reader.onloadend = () => {
  //     setPreviewImageSrc(reader.result)
  //   }

  //   reader.readAsDataURL(file)
  // }, [file])
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-3/5">
        <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
          <p>Now for the exciting part!</p>
          <p>Please fill in the details below and upload your masterpiece.</p>
        </div>
        <Formik 
          initialValues={{ image:"", location:"", city: "", usingAI: false, source: "", prompt: "", category: "", description: ""}}
          validationSchema={validationSchema}
        >
          {props => (
            <Form className="grid grid-cols-1">
              {Object.keys(props.errors).length !== 0 && 
                <div onChange={setHasError(true)}></div>
              }
              {Object.keys(props.errors).length === 0 &&
                <div onChange={setHasError(false)}></div>
              }
              <div className="items-center justify-center w-full">
                <label for="image" className="w-full h-64 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2 flex flex-col items-center justify-center">
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
                {/* {console.log(props.values.image)} */}
                {props.errors.image &&
                  <div className="inline-flex mt-1 bg-[#FBF4F3] w-full rounded border-l-8 border-[#EE2F4D]"> 
                    <p className="my-5 mx-10 text-base font-normal text-[#C4384E] ml-2">{props.errors.image}</p>
                  </div>
                }
                {/* {!props.errors.image && props.values.image !== "" &&
                  <div className="h-64 w-full">
                    <Image scr={previewImageSrc} alt=""/>
                  </div>
                } */}
              </div> 


              <CustomSelect 
                label= "Location"
                name="location"
                placeholder= "Country"
              >
                <option value="">Country</option>
                <option value="Australia">Australia</option>
                <option value="Belgium">Belgium</option>
                <option value="China">China</option>
                <option value="Denmark">Denmark</option>
                <option value="Egypt">Egypt</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Korea">Korea</option>
                <option value="Malaysia">Malaysia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Russia">Russia</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
                <option value="United States of America">United States of America</option>
                <option value="Vietnam">Vietnam</option>
              </CustomSelect>

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

              <CustomSelect 
                label= "Category"
                name="category"
                placeholder= ""
              >
                <option value=""></option>
                <option value="Archery">Archery</option>
                <option value="Artistic Gymnastics">Artistic Gymnastics</option>
                <option value="Athletics">Athletics</option>
                <option value="Badminton">Badminton</option>
                <option value="Basketball">Basketball</option>
                <option value="Boxing">Boxing</option>
                <option value="Cycling Track">Cycling Track</option>
                <option value="Equestrian">Equestrian</option>
                <option value="Fencing">Fencing</option>
                <option value="Football">Football</option>
                <option value="Golf">Golf</option>
                <option value="High jump">High jump</option>
                <option value="Hockey">Hockey</option>
                <option value="Judo">Judo</option>
                <option value="Rowing">Rowing</option>
                <option value="Rugby">Rugby</option>
                <option value="Sailing">Sailing</option>
                <option value="Shooting">Shooting</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Taekwondo">Taekwondo</option>
                <option value="Tennis">Tennis</option>
                <option value="Volleybal">Volleybal</option>
                <option value="Wallball">Wallball</option>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Yoga">Yoga</option>
                <option value="Zumba">Zumba</option>
              </CustomSelect>

              <div className="mt-6 text-sm font-light text-neutral-black">Description* (Optional)</div>
              <textarea
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.description}
                name= "description" 
                className= "w-full h-36 mb-6 border border-neutral-black rounded pl-4 pr-4 pt-2 pb-2"
              />
              {Object.keys(props.errors).length === 0 && Object.keys(props.touched).length !== 0 &&
                <div onChange={handleData(props.values)}></div>
              }
            </Form>
          )}

        </Formik>

      </section>
    </>
  );
};