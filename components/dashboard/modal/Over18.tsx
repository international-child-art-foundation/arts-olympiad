import * as yup from "yup";
import { Form, Formik } from "formik";
// import { CustomInput } from "./CustomInput";
import { CustomCheckbox } from "./CustomCheckbox";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
// import { DateInput } from "./DateInput";

// const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// const isLeapYear = (year: number) => {
//   return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
// };

// const calculateAge = (birthDate: Date) => {
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

const validationSchema = yup.object().shape({
  // firstName: yup.string().required("Required"),
  // lastName: yup.string().required("Required"),
  // email: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
  // phone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional(),
  // date: yup.object().shape({
  //   // Test that each date number is valid
  //   day: yup.number().min(1, "Please enter a valid day").max(31, "Please enter a valid day").required(),
  //   month: yup.number().min(1, "Please enter a valid month").max(12, "Please enter a valid month").required(),
  //   year: yup.number().min(1900, "Please enter a valid year").max(2024, "Please enter a valid year").required()
  // }).test("is-valid-date", "The date is invalid", (value) => {
  //   const { day, month, year } = value;
  //   if (month < 1 || month > 12) return false; 
  //   if (day < 1) return false; 
  //   const daysInMonth = isLeapYear(year) && month === 2 ? 29 : new Date(year, month, 0).getDate();
  //   if (day > daysInMonth) return false; 
  //   return true; 
  // }).test("is-old-enough", "You need to be over 14 to enter this competition", (value) => {
  //   const { day, month, year } = value;
  //   const birthDate = new Date(year, month - 1, day); 
  //   const age = calculateAge(birthDate);
  //   return age >= 14; 
  // }),
  termsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
});

// function useOver18FormikLogic(props, personalFormData, setPersonalFormData, setHasError, dateValidError, setDateValidError) {
//   useEffect(() => {
//     if( props.values.day && props.values.month && props.values.year){
//       if(2024 - props.values.year < 14){
//         setDateValidError("You need to be over 14 to enter this competition");
//         return;
//       }

//       if ((props.values.month === 4 || props.values.month === 6 || props.values.month == 9 || props.values.month == 11) && props.values.day == 31){
//         setDateValidError("This month doesn"t have the date you entered");
//         return;
//       }
//       if(props.values.month === 2){
//         const isLeap = (props.values.year % 4 == 0 && (props.values.year % 100 != 0 || props.values.year % 400 == 0));
//         if (props.values.day > 29 || (props.values.day == 29 && !isLeap)){
//           setDateValidError("This February doesn"t have the date you entered");
//           return;
//         }
//       }
//       setDateValidError("");
//     };
    
//     const requiredFields = ["firstName", "lastName", "email", "day", "month", "year", "termsCheck"];
//     const hasPreviousData = requiredFields.every(field => personalFormData[field]);
//     const hasSpecificFieldErrors = requiredFields.some(field => props.errors[field]);
//     const requiredFieldsTouched = requiredFields.some(field => props.touched[field]);
//     const noErrorsAtAll = Object.keys(props.errors).length === 0 && dateValidError === "";
//     const nothingTouchedYet = Object.keys(props.touched).length === 0;
//     const shouldSetError = hasSpecificFieldErrors || (!hasPreviousData && nothingTouchedYet);
//     setHasError(shouldSetError);
//     if (noErrorsAtAll && requiredFieldsTouched) {
//       setPersonalFormData(Object.assign({}, personalFormData, props.values));
//     }
//   }, [props, personalFormData, setPersonalFormData, setHasError, dateValidError, setDateValidError]);
// };

export const Over18 = () => {
  const { personalFormData, setPersonalFormData, handleNavigation, userAge } = useStepsContext();

  return (
    <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full">
      <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
        Terms & Donation Acknowledgment
      </div>
      <p className="text-red-600 text-xl mb-4 text-center">These terms of use must be reviewed by your parent or guardian.</p>
      <div className="mb-10 text-base text-neutral-black font-normal"> 
        Before we move forward, we need some details from you. Please review and agree to our <a className="underline text-blue-600" target="_blank" href="https://icaf.org/resource/documents/ICAF.website.-.Terms.of.Use.pdf">Terms of Use</a> and <a className="underline text-blue-600" target="_blank" href="https://icaf.org/resource/documents/ICAF.website.-.Privacy.Policy.pdf">Privacy Policy</a>. By submitting your artwork, you're also donating it to ICAF for charitable objectives. Thank you for your support!
      </div>

      <Formik 
        initialValues={personalFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // On submit: Set our global context data according to form values and move to next page
          setPersonalFormData(prevState => ({
            ...prevState,
            // firstName: values.firstName,
            // lastName: values.lastName,
            // email: values.email,
            // phone: values.phone,
            // date: { day: values.date.day, month: values.date.month, year: values.date.year },
            termsCheck: values.termsCheck
          }));
          handleNavigation("next");
        }}
      >
        {()=> { 
          return (
            <Form className="grid grid-cols-1">
              {/* <CustomInput 
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
              /> */}

              {/* <CustomInput 
                label= "Email"
                name= "email"
                type= "email"
                placeholder= "example@example.com"
              />

              <div className="grid grid-cols-12 gap-3">
                <DateInput
                  label="Date of Birth"
                  name="date"
                  colStart="col-start-1"
                  colSpan="col-span-6"
                />

                <CustomInput 
                  label= "Phone"
                  name= "phone"
                  type= "phone"
                  placeholder="(country code) 123-123-1234"
                  colStart="col-start-1 md:col-start-7"
                  colSpan="col-span-12 md:col-span-6"
                />
              </div> */}

              <CustomCheckbox
                label=""
                name="termsCheck" 
                type="checkbox"
                age={userAge}
              />

              <div className="my-6">
                <label className="text-sm font-light text-neutral-black">
                  Digital Signature
                </label>
                <div className="text-new-blue flex items-center justify-center border border-neutral-black w-full h-52 rounded-lg">
                  Sign here
                </div>
              </div>

              <FormikValidatedStepsControl/>
              
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

