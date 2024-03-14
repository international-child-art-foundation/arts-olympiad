import { useFormik } from "formik";
import * as yup from "yup";
import { HintIcon } from "../../svgs/HintIcon";
import { CorrectIcon } from "../../svgs/CorrectIcon";

export const Under18 = () => {
  const phonevalid= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Not a recognized email address").required("Not a recognized email address"),
    phone: yup.string().matches(phonevalid, "Not a valid phone number").max(10, "longer than 10 digit").optional("Not a valid phone number"),
    year: yup.string().min(4, "4 digit").max(4, "4 digit").required("Not a valid Year")
  });

  const {values, errors, touched, handleBlur, handleChange} = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      day:"",
      month:"",
      year:""
    },
    validationSchema: validationSchema,
  });

  
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-3/5">
        <div className="mt-16 mb-9 text-center text-2xl text-neutral-black font-bold">
          Terms & Donation Acknowledgment (For Users 18 and Under)
        </div>
        <div className="mb-10 text-base text-neutral-black font-normal"> 
          Before we move forward, we need some details from you. Please review and agree to our <span className="underline">Terms of Use</span> and <span className="underline">Privacy Policy</span>. By submitting your artwork, you're also donating it to ICAF for charitable objectives. Thank you for your support!
        </div>

        <form autoComplete="off" className="grid grid-cols-1 w-full">
          <label htmlFor="firstName" className={`text-sm mb-1 ${errors.firstName && touched.firstName ? "text-[#C4384E] font-semibold" : !errors.firstName && touched.firstName ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>First Name</label>
          <input
            value = {values.firstName}
            onChange={handleChange}
            id="firstName"
            type="text"
            placeholder="First name"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.firstName && touched.firstName ? "border-[#C4384E]" : !errors.firstName && touched.firstName ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.firstName}</p>
          </div>
          }
          {!errors.firstName && touched.firstName &&
          <div className="inline-flex mt-1">
            <CorrectIcon /> 
          </div>
          }
        </form>

        <form autoComplete="off" className="mt-6 grid grid-cols-1 w-full">
          <label htmlFor="lastName" className={`text-sm mb-1 ${errors.lastName && touched.lastName ? "text-[#C4384E] font-semibold" : !errors.lastName && touched.lastName ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Last Name</label>
          <input
            value = {values.lastName}
            onChange={handleChange}
            id="lastName"
            type="text"
            placeholder="Last name"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.lastName && touched.lastName ? "border-[#C4384E]" : !errors.lastName && touched.lastName ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.lastName && touched.lastName &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.lastName}</p>
          </div>
          }
          {!errors.lastName && touched.lastName &&
          <div className="inline-flex mt-1">
            <CorrectIcon />  
          </div>
          }
        </form>

        <form autoComplete="off" className="mt-6 grid grid-cols-1 w-full">
          <label htmlFor="email" className={`text-sm mb-1 ${errors.email && touched.email ? "text-[#C4384E] font-semibold" : !errors.email && touched.email ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Email</label>
          <input
            value = {values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.email && touched.email ? "border-[#C4384E]" : !errors.email && touched.email ? "border-[#158737]": "border-neutral-black"}`}
            onBlur={handleBlur}
          />
          {errors.email && touched.email &&
          <div className="inline-flex mt-1">
            <HintIcon /> 
            <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.email}</p>
          </div>
          }
          {!errors.email && touched.email &&
          <div className="inline-flex mt-1">
            <CorrectIcon /> 
          </div>
          }
        </form>

        <div className="my-6 grid grid-cols-2 w-full">
          <div className="inline-flex">
            <form autoComplete="off" className="grid grid-cols-1 w-12 mr-4 ">
              <label htmlFor="day" className="text-sm mb-1 font-light text-neutral-black">Day</label>
              <input
                value = {values.day}
                onChange={handleChange}
                id="day"
                type="tel"
                placeholder="DD"
                className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                onBlur={handleBlur}
              />
            </form>

            <form autoComplete="off" className="grid grid-cols-1 w-12 mr-4">
              <label htmlFor="month" className="text-sm mb-1 font-light text-neutral-black">Month</label>
              <input
                value = {values.month}
                onChange={handleChange}
                id="month"
                type="tel"
                placeholder="MM"
                className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                onBlur={handleBlur}
              />
            </form>

            <form autoComplete="off" className="grid grid-cols-1 w-14 mr-20">
              <label htmlFor="Yead" className="text-sm mb-1 font-light text-neutral-black">Year</label>
              <input
                value = {values.year}
                onChange={handleChange}
                id="year"
                type="tel"
                placeholder="YYYY"
                className="placeholder-[#403F4C] border border-neutral-black rounded pl-2 pr-2 pt-3 pb-3"
                onBlur={handleBlur}
              />
            </form>
          </div>


          <form autoComplete="off" className="grid grid-cols-1 w-full">
            <label htmlFor="phone" className={`text-sm mb-1 ${errors.phone && touched.phone ? "text-[#C4384E] font-semibold" : !errors.phone && values.phone !== "" ? "text-[#158737] font-semibold" : "font-light text-neutral-black"}`}>Phone number* (optional)</label>
            <input
              value = {values.phone}
              onChange={handleChange}
              id="phone"
              type="tel"
              placeholder="(country code) 123-123-1234"
              className={`placeholder-[#403F4C] border rounded pl-4 pr-4 pt-2 pb-2 ${errors.phone && touched.phone ? "border-[#C4384E]" : !errors.phone && values.phone ? "border-[#158737]": "border-neutral-black"}`}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone &&
            <div className="inline-flex mt-1">
              <HintIcon /> 
              <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.phone}</p>
            </div>
            }
          </form>
          {errors.year && touched.year &&
            <div className="inline-flex mt-1">
              <HintIcon /> 
              <p className="text-xs font-normal text-[#C4384E] ml-2">{errors.year}</p>
            </div>
          }
        </div>
        
      </section>
    </>
  );
};

