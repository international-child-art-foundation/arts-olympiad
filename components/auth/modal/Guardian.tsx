import { useFormik } from "formik";
import * as yup from "yup";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

export const Guardian = () => {
  const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    guardianFirstName: yup.string().required("Required"),
    guardianLastName: yup.string().required("Required"),
    guardianEmail: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
    guardianPhone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional("Not a valid phone number"),
    termsCheck: yup.bool().oneOf([true], "Agreement to the Terms and Conditions is required")
  });

  const {values, errors, touched, handleBlur, handleChange} = useFormik({
    initialValues: {
      guardianFirstName: "",
      guardianLastName: "",
      guardianEmail: "",
      guardianPhone: "",
      termsCheck: false
    },
    validationSchema: validationSchema,
  });

  
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-3/5">
        <div className="mt-16 mb-9 text-center text-2xl text-neutral-black font-bold">
          Great, now we need your parent or guardian's OK
        </div>
        <div className="mb-4 text-base text-neutral-black font-normal"> 
          We need a little help from a parent or guardian before you proceed. 
        </div>
        <div className="mb-10 text-base text-neutral-black font-normal"> 
          They'll need to agree to our terms and understand that by submitting your artwork, it's being generously donated to ICAF for charitable objectives. 
        </div>

        <form autoComplete="off" className="grid grid-cols-1 w-full">
          <label htmlFor="guardianFirstName" className={`text-sm mb-1 ${errors.guardianFirstName && touched.guardianFirstName ? "text-[#C4384E] font-semibold" : !errors.guardianFirstName && touched.guardianFirstName ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's First Name</label>
          <input
            value = {values.guardianFirstName}
            onChange={handleChange}
            id="guardianFirstName"
            type="text"
            placeholder="First name"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.guardianFirstName && touched.guardianFirstName ? "border-[#C4384E]" : !errors.guardianFirstName && touched.guardianFirstName ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.guardianFirstName && touched.guardianFirstName &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.guardianFirstName}</p>
          </div>
          }
          {!errors.guardianFirstName && touched.guardianFirstName &&
          <div className="inline-flex mt-1">
            <CorrectIcon /> 
          </div>
          }
        </form>

        <form autoComplete="off" className="mt-6 grid grid-cols-1 w-full">
          <label htmlFor="guardianLastName" className={`text-sm mb-1 ${errors.guardianLastName && touched.guardianLastName ? "text-[#C4384E] font-semibold" : !errors.guardianLastName && touched.guardianLastName ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's Last Name</label>
          <input
            value = {values.guardianLastName}
            onChange={handleChange}
            id="guardianLastName"
            type="text"
            placeholder="Last name"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.guardianLastName && touched.guardianLastName ? "border-[#C4384E]" : !errors.guardianLastName && touched.guardianLastName ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.guardianLastName && touched.guardianLastName &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.guardianLastName}</p>
          </div>
          }
          {!errors.guardianLastName && touched.guardianLastName &&
          <div className="inline-flex mt-1">
            <CorrectIcon /> 
          </div>
          }
        </form>

        <form autoComplete="off" className="mt-6 grid grid-cols-1 w-full">
          <label htmlFor="guardianEmail" className={`text-sm mb-1 ${errors.guardianEmail && touched.guardianEmail ? "text-[#C4384E] font-semibold" : !errors.guardianEmail && touched.guardianEmail ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's Email</label>
          <input
            value = {values.guardianEmail}
            onChange={handleChange}
            id="guardianEmail"
            type="email"
            placeholder="example@example.com"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.guardianEmail && touched.guardianEmail ? "border-[#C4384E]" : !errors.guardianEmail && touched.guardianEmail ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.guardianEmail && touched.guardianEmail &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.guardianEmail}</p>
          </div>
          }
          {!errors.guardianEmail && touched.guardianEmail &&
          <div className="inline-flex mt-1">
            <CorrectIcon /> 
          </div>
          }
        </form>

        <form autoComplete="off" className="mt-6 grid grid-cols-1 w-full">
          <label htmlFor="guardianPhone" className={`text-sm mb-1 ${errors.guardianPhone && touched.guardianPhone ? "text-[#C4384E] font-semibold" : !errors.guardianPhone && values.guardianPhone !== "" ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Parent or Guardian's phone number* (optional)</label>
          <input
            value = {values.guardianPhone}
            onChange={handleChange}
            id="guardianPhone"
            type="tel"
            placeholder="(country code) 123-123-1234"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.guardianPhone && touched.guardianPhone ? "border-[#C4384E]" : !errors.guardianPhone && values.guardianPhone ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.guardianPhone && touched.guardianPhone &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.guardianPhone}</p>
          </div>
          }
        </form>

        <div className="mt-6 items-center w-full">
          <input 
            value={values.termsCheck}
            onChange={handleChange}
            id="termsCheck" 
            type="checkbox" 
            className="w-6 h-6 rounded" 
            onBlur={handleBlur}
          />
          <label for="termsCheck" className="ml-2 text-base font-light">I agree to ICAF's <span className="font-normal underline">Terms of use</span> and <span className="font-normal underline">Privacy Policy</span></label>
        </div>
        {values.termsCheck === false && touched.termsCheck &&
          <div className="inline-flex mt-1 ml-8">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.termsCheck}</p>
          </div>
        }

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