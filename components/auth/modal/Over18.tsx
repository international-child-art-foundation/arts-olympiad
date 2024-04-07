import * as yup from "yup";
import { Form, Formik } from "formik";
import { CustomInput } from "./CustomInput";
import React, { useEffect, useState } from "react";
// import { StepsContext } from "./StepsContext";
import { HintIcon } from "../../svgs/HintIcon";
import { useStepsContext } from "./StepsContext";

const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
  phone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional(),
  day: yup.number().min(1).max(31).required("Not a valid Day"),
  month: yup.number().min(1).max(12).required("Not a valid Month"),
  year: yup.number().min(1900).max(2024).required("Not a valid Date"),
  termsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
});

function useOver18FormikLogic(props, personalFormData, setPersonalFormData, setHasError, dateValidError, setDateValidError) {
  useEffect(() => {
    if( props.values.day && props.values.month && props.values.year){
      if(2024 - props.values.year < 14){
        setDateValidError("You need to be over 14 to enter this competition");
        return;
      }

      if ((props.values.month === 4 || props.values.month === 6 || props.values.month == 9 || props.values.month == 11) && props.values.day == 31){
        setDateValidError("This month doesn't have the date you entered");
        return;
      }
      if(props.values.month === 2){
        const isLeap = (props.values.year % 4 == 0 && (props.values.year % 100 != 0 || props.values.year % 400 == 0));
        if (props.values.day > 29 || (props.values.day == 29 && !isLeap)){
          setDateValidError("This February doesn't have the date you entered");
          return;
        }
      }
      setDateValidError("");
    };
    
    const requiredFields = ["firstName", "lastName", "email", "day", "month", "year", "termsCheck"];
    const hasPreviousData = requiredFields.every(field => personalFormData[field]);
    const hasSpecificFieldErrors = requiredFields.some(field => props.errors[field]);
    const requiredFieldsTouched = requiredFields.some(field => props.touched[field]);
    const noErrorsAtAll = Object.keys(props.errors).length === 0 && dateValidError === "";
    const nothingTouchedYet = Object.keys(props.touched).length === 0;
    const shouldSetError = hasSpecificFieldErrors || (!hasPreviousData && nothingTouchedYet);
    setHasError(shouldSetError);
    if (noErrorsAtAll && requiredFieldsTouched) {
      setPersonalFormData(Object.assign({}, personalFormData, props.values));
    }
  }, [props, personalFormData, setPersonalFormData, setHasError, dateValidError, setDateValidError]);
};

export const Over18 = () => {
  // const { personalFormData, setPersonalFormData, setHasError } = useContext(StepsContext);
  const [ dateValidError, setDateValidError ] = useState("");
  const { personalFormData, setPersonalFormData, setHasError } = useStepsContext();

  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
      <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
        Terms & Donation Acknowledgment (For Users 18 and Over)
      </div>
      <div className="mb-10 text-base text-neutral-black font-normal"> 
        Before we move forward, we need some details from you. Please review and agree to our <span className="underline">Terms of Use</span> and <span className="underline">Privacy Policy</span>. By submitting your artwork, you're also donating it to ICAF for charitable objectives. Thank you for your support!
      </div>

      <Formik 
        initialValues={{ 
          firstName: personalFormData.firstName || "", 
          lastName: personalFormData.lastName || "",
          email: personalFormData.email || "",
          phone: personalFormData.phone || "",
          day: personalFormData.day || "",
          month: personalFormData.month || "",
          year: personalFormData.year || "",
          termsCheck: personalFormData.termsCheck || false
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {props => { 
          useOver18FormikLogic(props, personalFormData, setPersonalFormData, setHasError, dateValidError, setDateValidError);

          return (
            <Form className="grid grid-cols-1">
              <CustomInput 
                label= "First Name"
                name= "firstName"
                type= "text"
                placeholder= "First name"
              />

              <CustomInput 
                label= "Last Name"
                name= "lastName"
                type= "text"
                placeholder= "Last name"
              />

              <CustomInput 
                label= "Email"
                name= "email"
                type= "email"
                placeholder= "example@example.com"
              />

              <div className="mt-6 grid md:grid-cols-2 w-full">
                <div className="grid">
                  <div className="inline-flex">
                    <form autoComplete="off" className="grid grid-cols-1 w-16 mr-4">
                      <label htmlFor="day" className="text-sm mb-1 font-light text-neutral-black">Day</label>
                      <input
                        value = {props.values.day}
                        onChange={props.handleChange}
                        id="day"
                        type="number"
                        placeholder="DD"
                        className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                        onBlur={props.handleBlur}
                      />
                    </form>

                    <form autoComplete="off" className="grid grid-cols-1 w-16 mr-4">
                      <label htmlFor="month" className="text-sm mb-1 font-light text-neutral-black">Month</label>
                      <input
                        value = {props.values.month}
                        onChange={props.handleChange}
                        id="month"
                        type="number"
                        placeholder="MM"
                        className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                        onBlur={props.handleBlur}
                      />
                    </form>

                    <form autoComplete="off" className="grid grid-cols-1 w-20 mr-20">
                      <label htmlFor="Year" className="text-sm mb-1 font-light text-neutral-black">Year</label>
                      <input
                        value = {props.values.year}
                        onChange={props.handleChange}
                        id="year"
                        type="number"
                        placeholder="YYYY"
                        className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                        onBlur={props.handleBlur}
                      />
                    </form>
                  </div>
                  {((props.errors.year && props.touched.year) || (props.errors.month && props.touched.month)|| (props.errors.day && props.touched.day)) &&
                  <div className="inline-flex mt-1">
                    <HintIcon /> 
                    <p className="text-xs font-normal text-[#C4384E] ml-2">Please enter a valid date.</p>
                  </div>
                  }
                  {dateValidError.trim().length !== 0 &&
                    <div className="inline-flex mt-1">
                      <HintIcon /> 
                      <p className="text-xs font-normal text-[#C4384E] ml-2">{dateValidError}</p>
                    </div>
                  }
                </div>

                <div className="grid mt-6 md:mt-0">
                  <div className="inline-flex">
                    <form autoComplete="off" className="grid grid-cols-1 w-full">
                      <label htmlFor="phone" className={`text-sm mb-1 ${props.errors.phone && props.touched.phone ? "text-[#C4384E] font-semibold" : !props.errors.phone && props.values.phone !== "" && props.touched.phone ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's phone number* (optional)</label>
                      <input 
                        value={props.values.phone}
                        onChange={props.handleChange}
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        className={`placeholder-[#403F4C] border rounded w-full pl-4 pr-4 pt-2 pb-2 ${props.errors.phone && props.touched.phone ? "border-[#C4384E]" : !props.errors.phone && props.values.phone && props.touched.phone ? "border-[#158737]": "border-neutral-black"}`}
                        onBlur={props.handleBlur}
                        placeholder="(country code) 123-123-1234"
                      />
                    </form>
                  </div>
                  {props.errors.phone && props.touched.phone && 
                    <div className="inline-flex mt-1 ml-8">
                      <HintIcon /> 
                      <p className="text-xs font-normal text-[#C4384E] ml-2">{props.errors.phone}</p>
                    </div>
                  }
                </div>
              </div>

              <div className="mt-6 items-center w-full">
                <input 
                  checked={props.values.termsCheck}
                  onChange={props.handleChange}
                  id="termsCheck" 
                  name="termsCheck" 
                  type="checkbox" 
                  className="w-6 h-6 rounded" 
                  onBlur={props.handleBlur}
                />
                <label for="termsCheck" className="ml-2 text-base font-light">I agree to ICAF's <span className="font-normal underline">Terms of use</span> and <span className="font-normal underline">Privacy Policy</span></label>
              </div>
              {props.values.termsCheck === false && props.touched.termsCheck &&
                <div className="inline-flex mt-1 ml-8">
                  <HintIcon /> 
                  <p className="text-xs font-normal text-[#C4384E] ml-2">Agreement to the Terms and Conditions is required</p>
                </div>
              }
            </Form>
          );
        }}
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
  );
};

