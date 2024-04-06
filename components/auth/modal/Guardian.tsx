import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import { useContext } from "react";
import { StepsContext } from "./StepsContext";
import { HintIcon } from "../../svgs/HintIcon";

export const Guardian = () => {
  const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    guardianFirstName: yup.string().required("Required"),
    guardianLastName: yup.string().required("Required"),
    guardianEmail: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
    guardianPhone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional(),
    guardianTermsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
  });

  const { userData, setUserData } = useContext(StepsContext);
  const { setHasError } = useContext(StepsContext);

  const handleData = (thisData) => {
    setUserData(Object.assign(userData, thisData));
  };

  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
        <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
          Great, now we need your parent or guardian's OK
        </div>
        <div className="mb-4 text-base text-neutral-black font-normal"> 
          We need a little help from a parent or guardian before you proceed. 
        </div>
        <div className="mb-4 text-base text-neutral-black font-normal"> 
          They'll need to agree to our terms and understand that by submitting your artwork, it's being generously donated to ICAF for charitable objectives. 
        </div>
        <Formik 
          initialValues={{
            guardianFirstName: userData.guardianFirstName || "",
            guardianLastName: userData.guardianLastName || "", 
            guardianEmail: userData.guardianEmail || "", 
            guardianPhone: userData.guardianPhone || "", 
            guardianTermsCheck: userData.guardianTermsCheck || false
          }}
          validationSchema={validationSchema}
        >

          {props => (
            <Form className="grid grid-cols-1">
              {Object.keys(props.errors).length !== 0 && 
                <div onChange={setHasError(true)}></div>
              }
              {Object.keys(props.errors).length === 0 && props.values.guardianTermsCheck && 
                <div onChange={setHasError(false)}></div>
              }

              <CustomInput 
                label= "Parent or Guardian's First Name"
                name= "guardianFirstName"
                type= "text"
                placeholder= "First name"
              />

              <CustomInput 
                label= "Parent or Guardian's Last Name"
                name= "guardianLastName"
                type= "text"
                placeholder= "Last name"
              />

              <CustomInput 
                label= "Parent or Guardian's Email"
                name= "guardianEmail"
                type= "email"
                placeholder= "example@example.com"
              />

              <div className="mt-6 items-center w-full">
                <label htmlFor="guardianPhone" className={`text-sm mb-1 ${props.errors.guardianPhone && props.touched.guardianPhone ? "text-[#C4384E] font-semibold" : !props.errors.guardianPhone && props.values.guardianPhone !== "" && props.touched.phone ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's phone number* (optional)</label>
                <input 
                  value={props.values.guardianPhone}
                  onChange={props.handleChange}
                  id="guardianPhone" 
                  name="guardianPhone" 
                  type="tel" 
                  className={`placeholder-[#403F4C] border rounded w-full pl-4 pr-4 pt-2 pb-2 ${props.errors.guardianPhone && props.touched.guardianPhone ? "border-[#C4384E]" : !props.errors.guardianPhone && props.values.guardianPhone !== "" && props.touched.phone ? "border-[#158737]": "border-neutral-black"}`}
                  onBlur={props.handleBlur}
                  placeholder="(country code) 123-123-1234"
                />
              </div>
              {props.errors.guardianPhone && props.touched.guardianPhone && 
                <div className="inline-flex mt-1 ml-8">
                  <HintIcon /> 
                  <p className="text-xs font-normal text-[#C4384E] ml-2">{props.errors.guardianPhone}</p>
                </div>
              }
              
              <div className="mt-6 items-center w-full">
                <input 
                  checked={props.values.guardianTermsCheck}
                  onChange={props.handleChange}
                  id="guardianTermsCheck" 
                  name="guardianTermsCheck" 
                  type="checkbox" 
                  className="w-6 h-6 rounded" 
                  onBlur={props.handleBlur}
                />
                <label for="guardianTermsCheck" className="ml-2 text-base font-light">I agree to ICAF's <span className="font-normal underline">Terms of use</span> and <span className="font-normal underline">Privacy Policy</span></label>
              </div>
              {props.values.guardianTermsCheck === false && 
                <div className="inline-flex mt-1 ml-8">
                  <HintIcon /> 
                  <p className="text-xs font-normal text-[#C4384E] ml-2">Agreement to the Terms and Conditions is required</p>
                </div>
              }

              {Object.keys(props.errors).length === 0 && Object.keys(props.touched).length !== 0 &&
                <div onChange={handleData(props.values)}></div>
              }
            </Form>
          )}

        </Formik>
        <div className="my-6">
          <label className="text-sm font-light text-neutral-black">
            Parent or Guardian's Digital Signature
          </label>
          <div className="text-new-blue flex items-center justify-center border border-neutral-black w-full h-52 rounded-lg">
            Sign here
          </div>
        </div>
      </section>
    </>
  );
};